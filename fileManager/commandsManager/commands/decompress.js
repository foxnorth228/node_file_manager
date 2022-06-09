import { checkAccess, makePathAbsolute, checkArgsNumber, executeCommandFunction } from "../supportiveFileFuncs.js";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { createBrotliDecompress } from "zlib";

export async function decompress(nonProcessedInput) {
    const processedInput = await checkArgsNumber(nonProcessedInput, 2);
    const [isExistOldFile, errorOldFile] = await checkAccess(processedInput[0]);
    const [isExistNewFile, errorNewFile] = await checkAccess(processedInput[1]);

    await executeCommandFunction(
        [isExistOldFile, !isExistNewFile],
        [errorOldFile, new Error(`${processedInput[1]} file exists now`)],
        decompressFile,
        processedInput
    )
}

async function decompressFile(processedInput) {
    const oldName = await makePathAbsolute(processedInput[0]);
    const newName = await makePathAbsolute(processedInput[1]);
    await pipeline(
        createReadStream(oldName),
        createBrotliDecompress(),
        createWriteStream(newName),
    )
    console.log("File successfully decompressed");
}