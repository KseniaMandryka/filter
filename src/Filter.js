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
  const sibling = findSibling(array, id)
  const parentId = sibling[0]?.parentId

  if (sibling.length > 0) {
    let countOfSibling = 0

    for (const sib of sibling) {
      if (filteredIds.has(sib.id)) {
        countOfSibling++
      }
    }

    if (countOfSibling === sibling.length) {
      filteredIds.add(parentId)
      addAncestors(array, parentId, filteredIds)
    }
  }
}

function deleteAncestors(array, id, filteredIds) {
  const parentId = array.filter(item => item.id === id)[0]?.parentId

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

      for (let child of descendants) {
        copySelectedIds.delete(child)
      }

    } else {
      copySelectedIds.add(id)

      for (let child of descendants) {
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