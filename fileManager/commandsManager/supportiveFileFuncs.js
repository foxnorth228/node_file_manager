import { access } from "fs/promises";
import { getSetting } from "../settings.js";
import { join, isAbsolute } from "path";
import { constants } from "fs";

export async function checkAccess(path, typeOfAccess=constants.F_OK) {
    const absolutePath = await makePathAbsolute(path); 
    console.log(absolutePath);
    await access(absolutePath, typeOfAccess);
    return absolutePath;
}

export async function makePathAbsolute(path) {
    console.log(path, isAbsolute(path));
    return (isAbsolute(path)) ? path : join(getSetting("location"), path); 
}

export async function checkArgsNumber(nonProcessedInput, number) {
    if (nonProcessedInput.length > number) {
        throw new SyntaxError("Number of arguments is too big")
    }
    return nonProcessedInput;
}