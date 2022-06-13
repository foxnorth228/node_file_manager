import { argv } from "process";
import { createInterface } from "readline";

import { getSetting } from "./settings.js";
import { checkArgs } from "./argumentsCL/checkArguments.js"
import { processCommands } from "./commandsManager/processCommands.js";

export function startConsoleFileManager() {
    const args = argv.slice(2);
    checkArgs(args);

    console.log(`Welcome to the File Manager, ${getSetting("username")}!`);
    console.log(`You are currently in ${getSetting("location")}`);

    const readlineInterface = createInterface({
        input: process.stdin,
        output: process.stdout,
    }); 
    readlineInterface.setPrompt(`${getSetting("location")} >> `);

    readlineInterface.prompt();
    readlineInterface.on('line', async (input) => {
        const answer = await processCommands(input);
        if(answer === "exit") {
            readlineInterface.close();
            return;
        }
        readlineInterface.setPrompt(`${getSetting("location")} >> `);
        readlineInterface.prompt();
    });
    readlineInterface.on('SIGINT', ()=>{
        readlineInterface.close();
    });
    readlineInterface.on('close', ()=>{
        console.log(`Thank you for using File Manager, ${getSetting("username")}!`);
    });
}