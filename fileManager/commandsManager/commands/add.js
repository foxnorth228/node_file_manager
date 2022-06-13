import { checkAccess, makePathAbsolute, checkArgsNumber,
  executeCommandFunction, checkParentDirAccess } from "../supportiveFileFuncs.js";
import { open } from "fs/promises";
import { constants } from "fs";

export async function add(nonProcessedInput) {
    const processedInput = await checkArgsNumber(nonProcessedInput, 1);
    let [isFileExist, error] = await checkAccess(processedInput[0]);
    error = (error === null) ? new Error("This file exists now") : error;
    await executeCommandFunction([!isFileExist], [error], addFile, processedInput);
}

async function addFile(processedInput) {
    const path = await makePathAbsolute(processedInput[0]);
    await checkParentDirAccess(path, constants.W_OK);
    const fileCreater = await open(path, "w");
    fileCreater.close();
    console.log("File successfully created");
}