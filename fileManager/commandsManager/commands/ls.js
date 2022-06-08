import { checkAccess } from "../checkFileAccess.js";
import { getSetting } from "../../settings.js";
import { readdir } from "fs/promises";
import { constants } from "fs";

export async function ls() {
    const path = await checkAccess(getSetting("location"), constants.R_OK);
    const dirContent = await readdir(path);
    for await (let file of dirContent) {
        if (file.startsWith(".")) {
            continue;
        }
        console.log(file);
    }
}