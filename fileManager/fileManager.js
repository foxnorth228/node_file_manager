import { argv } from "process";
import * as rl from "readline";
import * as setts from "./arguments/settings.js";

export function manageFiles() {
    const args = argv.slice(2);
    setts.checkArgs(args);

    console.log(`Welcome to the File Manager, ${setts.getConfig("username")}!`);
    console.log(`You are currently in ${setts.getConfig("location")}`);

    const readline = rl.createInterface({
        input: process.stdin,
        output: process.stdout,
    }); 
    readline.on('line', (input)=>{
        console.log(`You are currently in ${setts.getConfig("location")}`);
        readline.prompt();
    });
    readline.on('SIGINT', ()=>{
        readline.close();
    });
    readline.on('close', ()=>{
        console.log(`Thank you for using File Manager, ${setts.getConfig("username")}!`);
    });
}

function checkCommands() {
    
}