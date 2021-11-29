import { Formatter } from "./utils/formatter.js";
import { Parser } from "./utils/parser.js";
import { Is } from "./utils/typeof.js";

interface Global {
    canvas: HTMLCanvasElement;
    render: CanvasRenderingContext2D;
    imports: Record<string, undefined | Import>;
    variables: Record<string, number | string | (number | string)[]>;
}

interface Import {
    (global: Global, props: Record<string, any>): void;
}

type Render = CanvasRenderingContext2D;

class Engine {
    private global: Global;
    private debugging: boolean;
    private lines: string[] = [];
    private currentPath: string = "";

    constructor(canvas: HTMLCanvasElement, debugging?: boolean) {
        this.debugging = !!debugging;

        this.global = {
            imports: {},
            variables: {},
            canvas: canvas,
            render: canvas.getContext("2d") as Render,
        };
    }

    public async compile(path: string) {
        const file = await (await fetch(path)).text();
        const text = Formatter.format(file);
        this.lines = file.split("\r\n");
        this.currentPath = path;

        for (const source of text.split(";")) {
            switch (true) {
                case Is.directive(source):
                    await this.readDirective(source, path);
                    break;

                case Is.comment(source):
                    this.showComment(source);
                    break;

                case !Is.empty(source):
                    this.readCode(source);
                    break;
            }
        }
    }

    private async readDirective(source: string, path: string) {
        const [keyword, ...args] = Formatter.format(source.replace("@", "")).split(" ");
        const value = args.map((arg) => Formatter.format(arg)).join(" ");

        switch (true) {
            case keyword.trim() === "import":
                await this.importModule(path, value);
                break;

            case keyword.trim() === "define":
                this.createVariable(value.split(":"));
                break;
        }
    }

    private async importModule(path: string, module: string) {
        const isStandardReference = module.startsWith("std:");

        if (isStandardReference) {
            const route = module.replace("std:", "./std/") + ".js";
            (await import(route)).default(this.global, {});
        } else {
            const route = path.substring(0, path.lastIndexOf("/")) + `/${module}.draw`;
            await this.compile(route);
        }
    }

    private createVariable([name, value]: string[]) {
        this.global.variables[name.trim()] = Parser.parse(value, this.global.variables);
    }

    private readCode(source: string) {
        const name = source.substring(source.indexOf("(") + 1, source.lastIndexOf(")"));
        let body = source.substring(source.indexOf("{") + 1, source.lastIndexOf("}"));
        const lines: Record<string, any> = {};

        while (body.includes("[") && body.includes("]")) {
            const line = body.substring(body.indexOf("[") + 1, body.indexOf("]"));
            const [name, value] = line.split(":").map((e) => e.trim());

            name in this.global.variables
                ? (lines[name] = this.global.variables[name])
                : (lines[name] = Parser.parse(value, this.global.variables));

            body = body.replace(`[${line}]`, "");
        }

        this.draw(name, lines);
    }

    private draw(name: string, props: Record<string, any>) {
        const shape = this.global.imports[name];
        shape ? shape(this.global, props) : this.error(name);
    }

    private showComment(source: string) {
        if (this.debugging) {
            let index = this.lines.findIndex((line) => line.includes(source.trim())) + 1;
            const msg = source.replace("#", "").trim();
            const filename = this.getFileName();

            console.log(`[${filename}: ${index}] ${msg}`);
        }
    }

    private getFileName() {
        return this.currentPath.substring(this.currentPath.lastIndexOf("/") + 1);
    }

    private error(name: string) {
        alert(`Reference Error: ${name} isn´t a shape`);
    }
}

async function run(canvas: HTMLCanvasElement, path: string) {
    await new Engine(canvas).compile(path);
}

async function dev(canvas: HTMLCanvasElement, path: string) {
    const engine = new Engine(canvas, true);
    await engine.compile(path);
    return engine;
}

export { run, dev };
export type { Global, Render };
