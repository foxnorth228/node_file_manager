import { add } from "./commands/add.js";
import { cat }from "./commands/cat.js";
import { cd } from "./commands/cd.js";
import { compress } from "./commands/compress.js";
import { cp } from "./commands/cp.js";
import { decompress } from "./commands/decompress.js";
import { hash } from "./commands/hash.js";
import { ls } from "./commands/ls.js";
import { mv } from "./commands/mv.js";
import { os } from "./commands/os.js";
import { rm } from "./commands/rm.js";
import { rn } from "./commands/rn.js";
import { up } from "./commands/up.js";

export const listOfCommands = {
    add: add,
    cat: cat,
    cd: cd,
    compress: compress,
    cp: cp,
    decompress: decompress,
    hash: hash,
    ls: ls,
    mv: mv,
    os: os,
    rm: rm,
    rn: rn,
    up: up,
};