import { Global, Render } from "../main.js";

export default function (global: Global, props: Record<string, any>) {
    global.imports["canvas"] = (global: Global, props: Record<string, any>) => {
        global.canvas.height = props.geometry[1] ?? global.canvas.height;
        global.canvas.width = props.geometry[0] ?? global.canvas.width;

        global.render = global.canvas.getContext(props.context ?? "2d") as Render;
        global.render.lineWidth = props["line-width"] ?? global.render.lineWidth;
        global.render.fillStyle = props["fill-color"] ?? global.render.fillStyle;
        global.render.strokeStyle = props["stroke-color"] ?? global.render.strokeStyle;

        global.render.font = props.font ?? global.render.font;
        global.render.lineJoin = props["line-join"] ?? global.render.lineJoin;
    };
}
