import { access } from "fs";

export async function checkAccess(path) {
    console.log("1")
    return access(path, (err) => { throw err; });
}