import { setConfig } from "../arguments/settings.js";
import * as comm from "./commandsList.js";
const listOfCommands = {
    add: comm.add.add,
    cat: comm.cat.cat,
    cd: comm.cd.cd,
    compress: comm.compress.compress,
    cp: comm.cp.cp,
    decompress: comm.decompress.decompress,
    hash: comm.hash.hash,
    ls: comm.ls.ls,
    mv: comm.mv.mv,
    os: comm.os.os,
    rm: comm.rm.rm,
    rn: comm.rn.rn,
    up: comm.up.up,
};

export function checkCommands(input) {
    const commands = input.trim().split(" ");
    if(!(commands[0] in listOfCommands)) {
        console.log("Invalid input")
        return;
    }
    console.log(commands);
}