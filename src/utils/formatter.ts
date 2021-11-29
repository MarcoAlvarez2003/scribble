class Formatter {
    private static regular = /(\r|\n)/g;

    public static format(text: string) {
        return this.removeWhiteSpaces(text.replace(this.regular, " ")).join(" ");
    }

    private static removeWhiteSpaces(text: string) {
        return text.split(" ").filter((e) => e != "");
    }
}

export { Formatter };
