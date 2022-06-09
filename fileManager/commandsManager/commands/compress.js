import { checkAccess, makePathAbsolute, checkArgsNumber,
    executeCommandFunction, checkIsFile, checkDirAccess } from "../supportiveFileFuncs.js";
import { createReadStream, createWriteStream, constants } from "fs";
import { pipeline } from "stream/promises";
import { createBrotliCompress } from "zlib";

export async function compress(nonProcessedInput) {
    const processedInput = await checkArgsNumber(nonProcessedInput, 2);
    const [isExistOldFile, errorOldFile] = await checkAccess(processedInput[0]);
    const [isExistNewFile, errorNewFile] = await checkAccess(processedInput[1] + '.br');

    await executeCommandFunction(
        [isExistOldFile, !isExistNewFile],
        [errorOldFile, new Error(`${processedInput[1] + '.br'} file exists now`)],
        compressFile,
        processedInput
    )
}

async function compressFile(processedInput) {
    const oldName = await makePathAbsolute(processedInput[0]);
    const newName = await makePathAbsolute(processedInput[1] + '.br');
    await checkIsFile(oldName);
    await checkDirAccess(newName, constants.W_OK);
    await pipeline(
        createReadStream(oldName),
        createBrotliCompress(),
        createWriteStream(newName),
    )
    console.log("File successfully compressed");
}