import { argv } from "process";
import * as rl from "readline";
import * as setts from "./arguments/settings.js";
import * as checkArgs from "./arguments/checkArguments.js"
import { checkCommands } from "./commandsManager/checkCommands.js";

export function manageFiles() {
    const args = argv.slice(2);
    checkArgs.checkArgs(args);

    console.log(`Welcome to the File Manager, ${setts.getConfig("username")}!`);
    console.log(`You are currently in ${setts.getConfig("location")}`);

    const readline = rl.createInterface({
        input: process.stdin,
        output: process.stdout,
    }); 
    readline.setPrompt(`${setts.getConfig("location")} >> `);
    readline.prompt();
    readline.on('line', (input)=>{
        checkCommands(input);
        readline.setPrompt(`${setts.getConfig("location")} >> `);
        readline.prompt();
    });
    readline.on('SIGINT', ()=>{
        readline.close();
    });
    readline.on('close', ()=>{
        console.log(`Thank you for using File Manager, ${setts.getConfig("username")}!`);
    });
}