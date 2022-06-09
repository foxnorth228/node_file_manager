import { checkAccess, makePathAbsolute, checkArgsNumber } from "../supportiveFileFuncs.js";
import { constants } from "fs";
import { createReadStream } from "fs";

export async function cat(nonProcessedInput) {
    const processedInput = await checkArgsNumber(nonProcessedInput, 1);
    const [isFileExist, error] = await checkAccess(processedInput[0], constants.R_OK);

    if (isFileExist) {
        const path = await makePathAbsolute(processedInput[0]);
        await print(createReadStream(path));
    } else {
        throw error;
    }
}

async function print(readable) {
    readable.setEncoding('utf8');
    let data = '';
    for await (const chunk of readable) {
      data += chunk;
    }
    console.log(data);
}