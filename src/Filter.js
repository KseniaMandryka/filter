import { FiltersTree } from "./FiltersTree"


// function findDescendants(array, id) {
//     const descendants = new Set()
//     const children = array.filter(item => item.parentId === id)

//     for(const child of children) {
//         descendants.add(child.id)
//         let childDescendants = findDescendants(array, child.id)

//         for(const childDescendant of childDescendants) {
//             descendants.add(childDescendant)
//         }
//     }

//     return descendants
// }

// array
function findDescendants(array, id) {
    return array
      .filter(item => item.parentId === id)
      .flatMap(child => [child.id, ...findDescendants(array, child.id)]);
}


export function Filter({array, value, onChange}) {



    function toggleId(id) {
        let copyValue = new Set(value)
        if(value.has(id)) {
            copyValue.delete(id)
        } else {
            copyValue.add(id)
            const descendants = findDescendants(array, id)
            copyValue.add(...descendants)
        }

        onChange(copyValue)
    }

    return (
        <FiltersTree array={array} parentId={undefined} selectedIds={value} toggleId={toggleId}/>
    )

}