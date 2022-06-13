import { checkAccess, checkArgsNumber } from "../supportiveFileFuncs.js";
import { EOL, cpus, homedir, arch, userInfo } from "os";
import { env } from "process";

export async function os(nonProcessedInput) {
    const processedInput = await checkArgsNumber(nonProcessedInput, 1);
    if (!processedInput[0].startsWith("--")) {
        throw new Error(`${nonProcessedInput[0]} is not a flag`);
    }
    const flag = nonProcessedInput[0].slice(2);
    
    switch(flag) {
        case "EOL": 
            const eol = EOL.replace(/\n/g, "\\n").replace(/\r/g, "\\r");
            console.log(`${flag} is ${eol}`); 
            break;
        case "cpus": 
            const info = cpus().reduce((acc, curr) => acc + curr.model + "\n", "");
            console.log(`${flag} is \n${info}`);
            break;
        case "homedir": 
            console.log(`${flag} is ${homedir()}`); break;
        case "username": 
            console.log(`${flag} is ${userInfo().username}`); break;
        case "architecture": 
            console.log(`${flag} is ${arch()}`);break;
        default: 
            throw new Error(`${flag} flag dasn't exits`)
    }
}