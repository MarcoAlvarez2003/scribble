import { Global } from "../main.js";

interface ShapeProps {
    geometry: [number, number];
    coords: [number, number];
    background: string;
    border: [number, string];
}

class Shape {
    protected static props(props: Partial<ShapeProps> = {}): ShapeProps {
        return {
            geometry: props.geometry ? props.geometry : [0, 0],
            coords: props.coords ? props.coords : [0, 0],
            background: props.background ? props.background : "#000",
            border: props.border ? props.border : [1, "#000"],
        };
    }

    protected props: ShapeProps;

    constructor(global: Global, props: Partial<ShapeProps>) {
        this.props = Shape.props(props);
    }
}

class Rect extends Shape {
    constructor(global: Global, props: Partial<ShapeProps>) {
        super(global, props);

        const __fillColor = global.render.fillStyle;
        const __lineWidth = global.render.lineWidth;
        global.render.fillStyle = this.props.background ?? __fillColor;
        global.render.fillRect(...this.props.coords, ...this.props.geometry);
        global.render.fillStyle = __fillColor;

        if (props.border) {
            global.render.lineWidth = this.props.border[0] ?? __lineWidth;

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
    constructor(global: Global, props: Partial<ShapeProps>) {
        super(global, props);

        const __strokeColor = global.render.strokeStyle;
        global.render.strokeStyle = this.props.background ?? __strokeColor;
        global.render.strokeRect(...this.props.coords, ...this.props.geometry);
        global.render.strokeStyle = __strokeColor;
    }
}

class Square extends Shape {
    constructor(global: Global, props: Record<string, any>) {
        super(global, props);

        new Rect(global, {
            geometry: [props.size, props.size],
            background: props.background,
            border: props.border,
            coords: props.coords,
        });
    }
}

function createShape(shape: any) {
    return (global: Global, props: Record<string, any>) => {
        new shape(global, props);
    };
}

export default function (global: Global, props: Record<string, any>) {
    global.imports["square"] = createShape(Square);
    global.imports["stroke"] = createShape(Stroke);
    global.imports["rect"] = createShape(Rect);
}
