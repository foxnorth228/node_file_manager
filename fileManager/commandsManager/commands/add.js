import { checkAccess, makePathAbsolute, checkArgsNumber } from "../supportiveFileFuncs.js";
import { open } from "fs/promises";

export async function add(nonProcessedInput) {
    const processedInput = await checkArgsNumber(nonProcessedInput, 1);
    const [isFileExist, error] = await checkAccess(processedInput[0]);
    if (isFileExist) {
        throw new Error("This file exists now");
    } else {
        const path = await makePathAbsolute(processedInput[0]);
        const fileCreater = await open(path, "w");
        fileCreater.close();
        console.log("File successfully created");
    }
}