export function buildTree(array) {
    const obj = array.reduce((obj, item) => {
        obj[item.id] = item
        return obj
    }, {})

    Object.values(obj).map(item => {
        if(item.parentId) {
            obj[item.parentId]?.childIds ? obj[item.parentId].childIds.push(item.id) : obj[item.parentId].childIds = [item.id]
        }
        return item
    })

    return obj
    
}