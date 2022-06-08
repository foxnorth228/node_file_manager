import { argv } from "process";
import * as rl from "readline";
import * as setts from "./settings.js";
import * as checkArgs from "./argumentsCL/checkArguments.js"
import { checkCommands } from "./commandsManager/checkCommands.js";

export function manageFiles() {
    const args = argv.slice(2);
    checkArgs.checkArgs(args);

    console.log(`Welcome to the File Manager, ${setts.getSetting("username")}!`);
    console.log(`You are currently in ${setts.getSetting("location")}`);

    const readline = rl.createInterface({
        input: process.stdin,
        output: process.stdout,
    }); 
    readline.setPrompt(`${setts.getSetting("location")} >> `);
    readline.prompt();
    readline.on('line', async (input) => {
        const answer = await checkCommands(input);
        if(!answer) {
            readline.close();
            return;
        }
        readline.setPrompt(`${setts.getSetting("location")} >> `);
        readline.prompt();
    });
    readline.on('SIGINT', ()=>{
        readline.close();
    });
    readline.on('close', ()=>{
        console.log(`Thank you for using File Manager, ${setts.getSetting("username")}!`);
    });
}