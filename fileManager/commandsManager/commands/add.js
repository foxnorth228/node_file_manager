import { checkAccess, makePathAbsolute, checkArgsNumber } from "../supportiveFileFuncs.js";
import { open } from "fs/promises";

export async function add(nonProcessedInput) {
    const processedInput = checkArgsNumber(nonProcessedInput, 1);
    let isExist = true;
    let path;
    try {
        path = await checkAccess(processedInput[0]);
    } catch(err) {
        path = await makePathAbsolute(processedInput[0]);
        isExist = false;
    }

    if(isExist) {
        throw new Error("This file exists now"); 
    } else {
        const fileCreater = await open(path, "w");
        fileCreater.close();
        console.log("File successfully created");
    }
}