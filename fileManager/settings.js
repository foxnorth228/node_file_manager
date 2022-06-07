import { env } from "process";
import { parse } from "path";

export const getSetting = (name) => settings[name];
export const setSetting = (name, value) => { 
    settings[name] = (isNaN(settings[name])) ? value : settings[name]; 
};
export const changeSetting = (name, value) => { settings[name] = value; };
export const changeSettingLocation = (value) => { settings["location"] = value; }

const settings = {
    username: "noname",
    location: env.HOME,
    rootDirectory: parse(env.HOME).root,
}

console.log(settings);