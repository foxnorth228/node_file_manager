import { env } from "process";

export const getSetting = (name) => settings[name];
export const setSetting = (name, value) => { 
    settings[name] = (isNaN(settings[name])) ? value : settings[name]; 
};
export const changeSetting = (name, value) => { settings[name] = value; };

const settings = {
    username: "noname",
    location: env.HOME,
}