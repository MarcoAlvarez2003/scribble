declare class Parser {
    private static isNumber;
    private static isList;
    private static isReference;
    static parse(query: string, scope: Record<string, any>): string | number | (string | number)[];
}
export { Parser };
