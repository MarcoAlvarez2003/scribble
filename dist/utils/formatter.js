class Formatter {
    static format(text) {
        return this.removeWhiteSpaces(text.replace(this.regular, " ")).join(" ");
    }
    static removeWhiteSpaces(text) {
        return text.split(" ").filter((e) => e != "");
    }
}
Formatter.regular = /(\r|\n)/g;
export { Formatter };
