function formatString(input: string, toUpper: boolean = true): string {
    if (toUpper) {
        return input.toUpperCase();
    } else {
        return input.toLowerCase();
    }
}

function filterByRating(items: 
    { title: string; rating: number }[])
    : { title: string; rating: number }[] {
    return items.filter(item => item.rating >= 4);
}

