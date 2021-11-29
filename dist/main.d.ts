interface Global {
    canvas: HTMLCanvasElement;
    render: CanvasRenderingContext2D;
    imports: Record<string, undefined | Import>;
    variables: Record<string, number | string | (number | string)[]>;
}
interface Import {
    (global: Global, props: Record<string, any>): void;
}
declare type Render = CanvasRenderingContext2D;
declare class Engine {
    private global;
    private debugging;
    private lines;
    private currentPath;
    constructor(canvas: HTMLCanvasElement, debugging?: boolean);
    compile(path: string): Promise<void>;
    private readDirective;
    private importModule;
    private createVariable;
    private readCode;
    private draw;
    private showComment;
    private getFileName;
    private error;
}
declare function run(canvas: HTMLCanvasElement, path: string): Promise<void>;
declare function dev(canvas: HTMLCanvasElement, path: string): Promise<Engine>;
export { run, dev };
export type { Global, Render };
