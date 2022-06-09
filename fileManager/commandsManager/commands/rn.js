import { checkAccess, makePathAbsolute } from "../supportiveFileFuncs.js";
import { rename } from "fs/promises";

export async function rn(nonProcessedInput) {
    if (nonProcessedInput.length > 2) {
        throw new SyntaxError("Number of arguments is too big")
    }
    let isExistNewNameFile = true;
    const oldName = await checkAccess(nonProcessedInput[0]);
    let newName;
    try {
        newName = await checkAccess(nonProcessedInput[1]);
    } catch(err) {
        isExistNewNameFile = false;
        newName = await makePathAbsolute(nonProcessedInput[1]);
    }

    if(isExistNewNameFile){
        throw new Error(`${newName} file exists now`); 
    } else {
        await rename(oldName, newName);
        console.log("File successfully renamed");
    }
}