import { checkAccess, makePathAbsolute, checkArgsNumber,
  executeCommandFunction, checkIsFile } from "../supportiveFileFuncs.js";
import { constants } from "fs";
import { createReadStream } from "fs";
import { platform } from "process";
import { EOL } from "os";

export async function cat(nonProcessedInput) {
    const processedInput = await checkArgsNumber(nonProcessedInput, 1);
    const [isFileExist, error] = await checkAccess(processedInput[0], constants.R_OK);
    await executeCommandFunction([isFileExist], [error], catFile, processedInput)
}

async function catFile(processedInput) {
    const path = await makePathAbsolute(processedInput[0]);
    await checkIsFile(path);
    const readable = createReadStream(path);
    readable.setEncoding("utf-8");
    for await (const chunk of readable) {
      console.log(chunk);
    }
}
//git commit -m "fix: fix os --username for windows and fix cat command"