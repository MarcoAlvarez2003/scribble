export default function (global, props) {
    global.imports["canvas"] = (global, props) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        global.canvas.height = (_a = props.geometry[1]) !== null && _a !== void 0 ? _a : global.canvas.height;
        global.canvas.width = (_b = props.geometry[0]) !== null && _b !== void 0 ? _b : global.canvas.width;
        global.render = global.canvas.getContext((_c = props.context) !== null && _c !== void 0 ? _c : "2d");
        global.render.lineWidth = (_d = props["line-width"]) !== null && _d !== void 0 ? _d : global.render.lineWidth;
        global.render.fillStyle = (_e = props["fill-color"]) !== null && _e !== void 0 ? _e : global.render.fillStyle;
        global.render.strokeStyle = (_f = props["stroke-color"]) !== null && _f !== void 0 ? _f : global.render.strokeStyle;
        global.render.font = (_g = props.font) !== null && _g !== void 0 ? _g : global.render.font;
        global.render.lineJoin = (_h = props["line-join"]) !== null && _h !== void 0 ? _h : global.render.lineJoin;
    };
}
