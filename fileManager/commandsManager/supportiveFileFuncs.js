import { access, stat } from "fs/promises";
import { getSetting } from "../settings.js";
import { join, isAbsolute } from "path";
import { constants } from "fs";

export async function checkArgsNumber(nonProcessedInput, number) {
    if (nonProcessedInput.length > number) {
        throw new SyntaxError("Number of arguments is too big")
    }
    return nonProcessedInput;
}

export async function checkAccess(path, typeOfAccess=constants.F_OK) {
    const absolutePath = await makePathAbsolute(path); 
    let isHaveAccess = true;
    let accessError = null;
    try {
        await access(absolutePath, typeOfAccess);
    } catch(err) {
        isHaveAccess = false;
        accessError = err;
    }
    return [isHaveAccess, accessError];
}

export async function makePathAbsolute(path) {
    return (isAbsolute(path)) ? path : join(getSetting("location"), path); 
}

export async function checkIsFile(path) {
    const objectInfo = await stat(path);
    return objectInfo.isFile();
}

export async function checkIsDir(path) {
    const objectInfo = await stat(path);
    return objectInfo.isDirectory();
}