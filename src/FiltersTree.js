import { FiltersItem } from "./FiltersItem"

export function FiltersTree({ array, parentId, selectedIds, toggleId }) {


  const listOfTopIds = array.filter(item => item.parentId === parentId)

  return (
    <ul>
      {listOfTopIds.map(item => <FiltersItem array={array} item={item} selectedIds={selectedIds} toggleId={toggleId} />)}
    </ul>
  )
}
