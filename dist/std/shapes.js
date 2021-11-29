class Shape {
    constructor(global, props) {
        this.props = Shape.props(props);
    }
    static props(props = {}) {
        return {
            geometry: props.geometry ? props.geometry : [0, 0],
            coords: props.coords ? props.coords : [0, 0],
            background: props.background ? props.background : "#000",
            border: props.border ? props.border : [1, "#000"],
        };
    }
}
class Rect extends Shape {
    constructor(global, props) {
        var _a, _b;
        super(global, props);
        const __fillColor = global.render.fillStyle;
        const __lineWidth = global.render.lineWidth;
        global.render.fillStyle = (_a = this.props.background) !== null && _a !== void 0 ? _a : __fillColor;
        global.render.fillRect(...this.props.coords, ...this.props.geometry);
        global.render.fillStyle = __fillColor;
        if (props.border) {
            global.render.lineWidth = (_b = this.props.border[0]) !== null && _b !== void 0 ? _b : __lineWidth;
            new Stroke(global, {
                background: this.props.border[1],
                geometry: this.props.geometry,
                coords: this.props.coords,
            });
            global.render.lineWidth = __lineWidth;
        }
    }
}
class Stroke extends Shape {
    constructor(global, props) {
        var _a;
        super(global, props);
        const __strokeColor = global.render.strokeStyle;
        global.render.strokeStyle = (_a = this.props.background) !== null && _a !== void 0 ? _a : __strokeColor;
        global.render.strokeRect(...this.props.coords, ...this.props.geometry);
        global.render.strokeStyle = __strokeColor;
    }
}
class Square extends Shape {
    constructor(global, props) {
        super(global, props);
        new Rect(global, {
            geometry: [props.size, props.size],
            background: props.background,
            border: props.border,
            coords: props.coords,
        });
    }
}
function createShape(shape) {
    return (global, props) => {
        new shape(global, props);
    };
}
export default function (global, props) {
    global.imports["square"] = createShape(Square);
    global.imports["stroke"] = createShape(Stroke);
    global.imports["rect"] = createShape(Rect);
}
