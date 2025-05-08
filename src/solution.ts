function formatString(input: string, toUpper?: boolean): string {
    if (toUpper) {
        return input.toUpperCase();
    } else {
        return input.toLowerCase();
    }
}