import { checkAccess } from "../checkFileAccess.js";
import { getSetting } from "../../settings.js";
import { readdir } from "fs/promises";

export async function ls() {
    const path = await checkAccess(getSetting("location"));
    const dirContent = await readdir(path);
    for await (let file of dirContent) {
        if (file.startsWith(".")) {
            continue;
        }
        console.log(file);
    }
}