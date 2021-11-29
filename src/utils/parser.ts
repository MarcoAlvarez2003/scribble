class Parser {
    private static isNumber(query: string) {
        return !isNaN(parseFloat(query));
    }

    private static isList(query: string) {
        return query.includes(",");
    }

    private static isReference(query: string, scope: Record<string, any>) {
        return query.trim() in scope;
    }

    public static parse(
        query: string,
        scope: Record<string, any>
    ): string | number | (string | number)[] {
        switch (true) {
            case this.isList(query):
                return query.split(",").map((e) => {
                    return this.parse(e, scope) as string | number;
                });

            case this.isReference(query, scope):
                return scope[query.trim()];

            case this.isNumber(query):
                return parseFloat(query);

            default:
                return query.trim();
        }
    }
}

export { Parser };
