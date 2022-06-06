import { argv } from "process";
import * as rl from "readline";
import * as setts from "./arguments/settings.js";

export function manageFiles() {
    const args = argv.slice(2);
    setts.checkArgs(args);

    console.log(`Welcome to the File Manager, ${setts.getConfig("username")}!`);
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