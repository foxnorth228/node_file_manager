import { access } from "fs/promises";

export async function checkAccess(path) {
    await access(path)
    .catch(err => { throw err; });
}