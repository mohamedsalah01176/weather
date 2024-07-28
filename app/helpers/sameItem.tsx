export function getUniqueItems(arr:any, key:any) {
    const seen = new Set();
    return arr.filter((item:any) => {
        const keyValue = item[key].slice(0,10);
        if (seen.has(keyValue)) {
            return false;
        } else {
            seen.add(keyValue);
            return true;
        }
    });
}