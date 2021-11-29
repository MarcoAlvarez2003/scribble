import { Global } from "../main.js";

export default function (global: Global, props: Record<string, string>) {
    global.variables["red"] = "#f00";
    global.variables["green"] = "#0f0";
    global.variables["blue"] = "#00f";
    global.variables["darkblue"] = "#212";
    global.variables["whitesmoke"] = "#f5f5f5";
    global.variables["black"] = "#000";
    global.variables["white"] = "#fff";
}
