import { checkAccess, makePathAbsolute } from "../checkFileAccess.js";
import { open } from "fs/promises";

export async function add(nonProcessedInput) {
    if (nonProcessedInput.length > 1) {
        throw new SyntaxError("Number of arguments is too big")
    }
    let isExist = true;
    let path;
    try {
        path = await checkAccess(nonProcessedInput[0]);
    } catch(err) {
        path = await makePathAbsolute(nonProcessedInput[0]);
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