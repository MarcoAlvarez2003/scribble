class Parser {
    static isNumber(query) {
        return !isNaN(parseFloat(query));
    }
    static isList(query) {
        return query.includes(",");
    }
    static isReference(query, scope) {
        return query.trim() in scope;
    }
    static parse(query, scope) {
        switch (true) {
            case this.isList(query):
                return query.split(",").map((e) => {
                    return this.parse(e, scope);
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
