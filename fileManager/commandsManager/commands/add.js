import { checkAccess, makePathAbsolute, checkArgsNumber, executeCommandFunction } from "../supportiveFileFuncs.js";
import { open } from "fs/promises";

export async function add(nonProcessedInput) {
    const processedInput = await checkArgsNumber(nonProcessedInput, 1);
    let [isFileExist, error] = await checkAccess(processedInput[0]);
    error = (error === null) ? new Error("This file exists now") : error;
    await executeCommandFunction([!isFileExist], [error], addFile, processedInput);
}

async function addFile(processedInput) {
    const path = await makePathAbsolute(processedInput[0]);
    const fileCreater = await open(path, "w");
    fileCreater.close();
    console.log("File successfully created");
}