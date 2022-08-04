export function paginate(items, pageNumber, PageSize) {
    const startIndex = (pageNumber - 1) * PageSize;
    return [...items].splice(startIndex, PageSize);
}
