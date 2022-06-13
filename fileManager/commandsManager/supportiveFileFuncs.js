import { access, stat } from "fs/promises";
import { getSetting } from "../settings.js";
import { join, isAbsolute, dirname } from "path";
import { constants } from "fs";

export async function checkArgsNumber(nonProcessedInput, number) {
    if (nonProcessedInput.length > number) {
        throw new SyntaxError("Number of arguments is too big");
    } else if (nonProcessedInput.length > number) {
        throw new SyntaxError("Number of arguments is not enough");
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
    if (!objectInfo.isFile()) {
        throw new Error(`${path} is not a file`);
    };
}

export async function checkIsDir(path) {
    const objectInfo = await stat(path);
    if (!objectInfo.isDirectory()) {
        throw new Error(`${path} is not a directory`);
    }
}

export async function executeCommandFunction(accessControllers, errors, func, args) {
    const errorIndex = accessControllers.findIndex((el) => el === false);
    if(errorIndex === -1) {
        return await func(args);
    } else {
        throw errors[errorIndex];
    }
}

export async function checkParentDirAccess(dir, typeOfAccess=constants.R_OK) {
    try {
        await access(dirname(dir), typeOfAccess);
    } catch(err) {
        throw new Error("You haven't required permissions to do this");
    }
}