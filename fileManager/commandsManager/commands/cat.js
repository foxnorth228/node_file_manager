import { checkAccess, makePathAbsolute, checkArgsNumber, executeCommandFunction } from "../supportiveFileFuncs.js";
import { constants } from "fs";
import { createReadStream } from "fs";

export async function cat(nonProcessedInput) {
    const processedInput = await checkArgsNumber(nonProcessedInput, 1);
    const [isFileExist, error] = await checkAccess(processedInput[0], constants.R_OK);
    await executeCommandFunction([isFileExist], [error], catFile, processedInput)
}

async function catFile(processedInput) {
    const path = await makePathAbsolute(processedInput[0]);
    const readable = createReadStream(path);
    readable.setEncoding('utf8');
    let data = '';
    for await (const chunk of readable) {
      data += chunk;
    }
    console.log(data);
}