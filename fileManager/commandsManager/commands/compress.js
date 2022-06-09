import { checkAccess, makePathAbsolute } from "../supportiveFileFuncs.js";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { createBrotliCompress } from "zlib";

export async function compress(nonProcessedInput) {
    if (nonProcessedInput.length > 2) {
        throw new SyntaxError("Number of arguments is too big")
    }
    let isExistNewNameFile = true;
    const oldName = await checkAccess(nonProcessedInput[0]);
    let newName;
    try {
        newName = await checkAccess(nonProcessedInput[1] + '.br');
    } catch(err) {
        isExistNewNameFile = false;
        newName = await makePathAbsolute(nonProcessedInput[1] + '.br');
    }

    if(isExistNewNameFile){
        throw new Error(`${newName} file exists now`); 
    } else {
        await pipeline(
            createReadStream(oldName),
            createBrotliCompress(),
            createWriteStream(newName),
        )
        console.log("File successfully compressed");
    }
}