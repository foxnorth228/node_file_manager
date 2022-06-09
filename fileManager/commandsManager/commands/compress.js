import { checkAccess, makePathAbsolute, checkArgsNumber } from "../supportiveFileFuncs.js";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { createBrotliCompress } from "zlib";

export async function compress(nonProcessedInput) {
    const processedInput = await checkArgsNumber(nonProcessedInput, 2);
    const [isExistOldFile, errorOldFile] = await checkAccess(processedInput[0]);
    const [isExistNewFile, errorNewFile] = await checkAccess(processedInput[1] + '.br');

    if (isExistOldFile && !isExistNewFile) {
        const oldName = await makePathAbsolute(processedInput[0]);
        const newName = await makePathAbsolute(processedInput[1] + '.br');
        await pipeline(
            createReadStream(oldName),
            createBrotliCompress(),
            createWriteStream(newName),
        )
        console.log("File successfully compressed");
    } else if (!isExistOldFile){
        throw errorOldFile;
    } else {
        throw new Error(`${processedInput[1] + '.br'} file exists now`); ;
    }
}