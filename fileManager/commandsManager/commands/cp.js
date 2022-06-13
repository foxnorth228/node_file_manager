import { checkAccess, makePathAbsolute, checkArgsNumber, 
    executeCommandFunction, checkParentDirAccess, checkIsFile } from "../supportiveFileFuncs.js";
import { constants} from "fs";
import { copyFile } from "fs/promises";
import { join, basename } from "path";

export async function cp(nonProcessedInput) {
    const processedInput = await checkArgsNumber(nonProcessedInput, 2);
    const [isExistOldFile, errorOldFile] = await checkAccess(processedInput[0]);
    processedInput[1] = join(processedInput[1], basename(processedInput[0]));
    const [isExistNewFile, errorNewFile] = await checkAccess(processedInput[1]);

    await executeCommandFunction(
        [isExistOldFile, !isExistNewFile],
        [errorOldFile, new Error(`${processedInput[1]} file exists now`)],
        cpFile,
        processedInput
    )
}

async function cpFile(processedInput) {
    const oldName = await makePathAbsolute(processedInput[0]);
    const newName = await makePathAbsolute(processedInput[1]);
    await checkIsFile(oldName);
    await checkParentDirAccess(newName, constants.W_OK);
    await copyFile(oldName, newName);
    console.log("File successfully copied");
}