import * as add from "./commands/add.js";
import * as cat from "./commands/cat.js";
import * as cd from "./commands/cd.js";
import * as compress from "./commands/compress.js";
import * as cp from "./commands/cp.js";
import * as decompress from "./commands/decompress.js";
import * as hash from "./commands/hash.js";
import * as ls from "./commands/ls.js";
import * as mv from "./commands/mv.js";
import * as os from "./commands/os.js";
import * as rm from "./commands/rm.js";
import * as rn from "./commands/rn.js";
import * as up from "./commands/up.js";

export const listOfCommands = {
    add: add.add,
    cat: cat.cat,
    cd: cd.cd,
    compress: compress.compress,
    cp: cp.cp,
    decompress: decompress.decompress,
    hash: hash.hash,
    ls: ls.ls,
    mv: mv.mv,
    os: os.os,
    rm: rm.rm,
    rn: rn.rn,
    up: up.up,
};