import { FiltersTree } from "./FiltersTree"
import { useState } from "react"

export function FiltersItem({ array, item, selectedIds, toggleId }) {
  const [showMore, setShowMore] = useState(false)

  const hasChildren = array.some(elem => elem.parentId === item.id)

  function handleClick() {
    setShowMore(prev => !prev)
  }


  return (
    <li className="filter-item">
      <div className="filter-item-category">
        {hasChildren ?
          <button onClick={handleClick} className={showMore ? "child-category show" : "child-category"}></button> :
          <div className="without-child"></div>
        }
        <input
          type="checkbox"
          onChange={() => toggleId(item.id)}
          checked={selectedIds.has(item.id)}
        >
        </input>
        {item.name}
      </div>
      {showMore && hasChildren &&
        <FiltersTree array={array} parentId={item.id} selectedIds={selectedIds} toggleId={toggleId} />
      }
    </li>
  )
}