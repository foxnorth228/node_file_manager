import { access } from "fs/promises";
import { getSetting } from "../settings.js";
import { join, isAbsolute } from "path";

export async function checkAccess(path) {
    const absolutePath = (isAbsolute(path)) ? path : join(getSetting("location"), path); 
    console.log(absolutePath);
    await access(absolutePath);
    return absolutePath;
}