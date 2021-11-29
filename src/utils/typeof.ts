import { Formatter } from "./formatter.js";

class Is {
    public static directive(query: string) {
        return Formatter.format(query).startsWith("@");
    }

    public static empty(query: string) {
        return Formatter.format(query) === "";
    }

    public static comment(query: string) {
        return Formatter.format(query).startsWith("#");
    }
}

export { Is };
