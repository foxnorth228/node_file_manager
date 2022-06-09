import { checkAccess, checkArgsNumber, makePathAbsolute, executeCommandFunction } from "../supportiveFileFuncs.js";
import { constants } from "fs";
import { rm as remove } from "fs/promises";

export async function rm(nonProcessedInput) {
    const processedInput = await checkArgsNumber(nonProcessedInput, 1);
    const [isFileExist, error] = await checkAccess(processedInput[0], constants.W_OK);
    await executeCommandFunction([isFileExist], [error], rmFile, processedInput)
}

async function rmFile(processedInput) {
    const path = await makePathAbsolute(processedInput[0]);
    await remove(path);
    console.log("File successfully deleted");
}