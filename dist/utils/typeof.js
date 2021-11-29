import { Formatter } from "./formatter.js";
class Is {
    static directive(query) {
        return Formatter.format(query).startsWith("@");
    }
    static empty(query) {
        return Formatter.format(query) === "";
    }
    static comment(query) {
        return Formatter.format(query).startsWith("#");
    }
}
export { Is };
