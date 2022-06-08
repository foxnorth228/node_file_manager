import { checkAccess } from "../checkFileAccess.js";
import { constants } from "fs";
import { createReadStream } from "fs";
import { createHash } from "crypto";

export async function hash(nonProcessedInput) {
    if (nonProcessedInput.length > 1) {
        throw new SyntaxError("Number of arguments is too big")
    }
    const path = await checkAccess(nonProcessedInput[0], constants.R_OK);
    await print(createReadStream(path));
}

async function print(readable) {
    readable.setEncoding('utf8');
    let data = '';
    for await (const chunk of readable) {
      data += chunk;
    }
    const hashSum = createHash("sha256");
    hashSum.update(data);
    console.log(hashSum.digest("hex"));
}