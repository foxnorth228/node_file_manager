import { checkAccess, makePathAbsolute, checkArgsNumber } from "../supportiveFileFuncs.js";
import { rename } from "fs/promises";

export async function rn(nonProcessedInput) {
    const processedInput = await checkArgsNumber(nonProcessedInput, 2);
    const [isExistOldFile, errorOldFile] = await checkAccess(processedInput[0]);
    const [isExistNewFile, errorNewFile] = await checkAccess(processedInput[1]);

    if (isExistOldFile && !isExistNewFile) {
        const oldName = await makePathAbsolute(processedInput[0]);
        const newName = await makePathAbsolute(processedInput[1]);
        await rename(oldName, newName);
        console.log("File successfully renamed");
    } else if(!isExistOldFile){
        throw errorOldFile;
    } else {
        throw new Error(`${processedInput[1]} file exists now`); 
    }
}