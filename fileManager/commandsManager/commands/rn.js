import { checkAccess, makePathAbsolute, checkArgsNumber, 
    executeCommandFunction, checkDirAccess, checkIsFile } from "../supportiveFileFuncs.js";
import { constants } from "fs";
import { rename } from "fs/promises";

export async function rn(nonProcessedInput) {
    const processedInput = await checkArgsNumber(nonProcessedInput, 2);
    const [isExistOldFile, errorOldFile] = await checkAccess(processedInput[0]);
    const [isExistNewFile, errorNewFile] = await checkAccess(processedInput[1]);

    await executeCommandFunction(
        [isExistOldFile, !isExistNewFile],
        [errorOldFile, new Error(`${processedInput[1]} file exists now`)],
        rnFile,
        processedInput
    )
}

async function rnFile(processedInput) {
    const oldName = await makePathAbsolute(processedInput[0]);
    const newName = await makePathAbsolute(processedInput[1]);
    await checkIsFile(oldName);
    await checkDirAccess(newName, constants.W_OK);
    await rename(oldName, newName);
    console.log("File successfully renamed");
}