import { checkAccess, makePathAbsolute, checkArgsNumber, 
    executeCommandFunction, checkDirAccess, checkIsFile } from "../supportiveFileFuncs.js";
import { constants} from "fs";
import { copyFile, rm } from "fs/promises";

export async function mv(nonProcessedInput) {
    const processedInput = await checkArgsNumber(nonProcessedInput, 2);
    const [isExistOldFile, errorOldFile] = await checkAccess(processedInput[0]);
    const [isExistNewFile, errorNewFile] = await checkAccess(processedInput[1]);

    await executeCommandFunction(
        [isExistOldFile, !isExistNewFile],
        [errorOldFile, new Error(`${processedInput[1]} file exists now`)],
        mvFile,
        processedInput
    )
}

async function mvFile(processedInput) {
    const oldName = await makePathAbsolute(processedInput[0]);
    const newName = await makePathAbsolute(processedInput[1]);
    await checkIsFile(oldName);
    await checkDirAccess(newName, constants.W_OK);
    await copyFile(oldName, newName);
    await rm(oldName);
    console.log("File successfully moved");
}