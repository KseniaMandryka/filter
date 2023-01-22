import { FiltersTree } from "./FiltersTree"

function findDescendants(array, id) {
  return array
    .filter(item => item.parentId === id)
    .flatMap(child => [child.id, ...findDescendants(array, child.id)]);
}

function findSibling(array, id) {
  if (!id) {
    return []
  }

  const sib = array.filter(item => item.id === id)
  return array.filter(item => item.parentId === sib[0]?.parentId)
}

function addAncestors(array, id, filteredIds) {
  if(!id) {
    return
  }

  const sibling = findSibling(array, id)
  const parentId = sibling[0]?.parentId

  if (sibling.every(item => filteredIds.has(item.id))) {
    filteredIds.add(parentId)
    addAncestors(array, parentId, filteredIds)
  }
}

function deleteAncestors(array, id, filteredIds) {
  const parentId = array.find(item => item.id === id)?.parentId

  if (filteredIds.has(id)) {
    filteredIds.delete(id)
    deleteAncestors(array, parentId, filteredIds)
  }
}


export function Filter({ array, selectedIds, onChange }) {

  function toggleId(id) {
    const copySelectedIds = new Set(selectedIds)
    const descendants = findDescendants(array, id)
    const sibling = findSibling(array, id)

    if (selectedIds.has(id)) {
      deleteAncestors(array, id, copySelectedIds)

      for (const child of descendants) {
        copySelectedIds.delete(child)
      }

    } else {
      copySelectedIds.add(id)

      for (const child of descendants) {
        copySelectedIds.add(child)
      }

      if (sibling) {
        addAncestors(array, id, copySelectedIds)
      }
    }

    onChange(copySelectedIds)
  }

  return (
    <FiltersTree array={array} parentId={undefined} selectedIds={selectedIds} toggleId={toggleId} />
  )

}