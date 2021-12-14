export const arrNftCategories: string[] = ['Art', 'Video', 'Podcast', 'Sports', 'Tickets', 'Music', 'Gaming'];

export const truncateToDecimals = (num: number, dec = 6) => {
    if (!num) {
        return 0;
    }
    const calcDec = Math.pow(10, dec);
    return Math.trunc(num * calcDec) / calcDec;
}