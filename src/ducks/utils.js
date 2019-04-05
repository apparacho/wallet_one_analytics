export function addIdByIndex(arr) {
    return arr.map(function(item, index) {
        return Object.assign({}, item, {key: index})
    })
}