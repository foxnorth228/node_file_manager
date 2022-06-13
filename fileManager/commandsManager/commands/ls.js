import { checkAccess, checkArgsNumber, executeCommandFunction } from "../supportiveFileFuncs.js";
import { getSetting } from "../../settings.js";
import { readdir } from "fs/promises";
import { constants } from "fs";

export async function ls(nonProcessedInput) {
    const processedInput = await checkArgsNumber(nonProcessedInput, 0);
    const [isDirExist, error] = await checkAccess(getSetting("location"), constants.R_OK);
    await executeCommandFunction([isDirExist], [error], lsDir, nonProcessedInput);
}

async function lsDir(processedInput) {
    const dirContent = await readdir(getSetting("location"), { withFileTypes: true });
        for await (let file of dirContent) {
            if ((file.name).startsWith(".") && !file.isFile()) {
                continue;
            }
            console.log(file.name);
        }
}