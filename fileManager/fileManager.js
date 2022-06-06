import { argv } from "process";
import * as rl from "readline";
import * as checkArgs from "./arguments/checkArgs.js";

export function manageFiles() {
    const args = argv.slice(2);
    checkArgs.checkArgs(args);

    const readline = rl.createInterface({
        input: process.stdin,
        output: process.stdout,
    }); 
    
    readline.on('line', ()=>{
        readline.close();
    });
    readline.prompt();
    if(true) {

    } else {

    }
}