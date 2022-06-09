import { checkAccess, checkArgsNumber } from "../supportiveFileFuncs.js";
import { getSetting } from "../../settings.js";
import { readdir } from "fs/promises";
import { constants } from "fs";

export async function ls(nonProcessedInput) {
    const processedInput = await checkArgsNumber(nonProcessedInput, 0);
    const [isDirExist, error] = await checkAccess(getSetting("location"), constants.R_OK);

    if (isDirExist) {
        const dirContent = await readdir(getSetting("location"));
        for await (let file of dirContent) {
            if (file.startsWith(".")) {
                continue;
            }
            console.log(file);
        }
    } else {
        throw error;
    }
}