import { FiltersTree } from "./FiltersTree"
import { useState } from "react"

export function FiltersItem ({array, item, selectedIds, toggleId}) {
    const [showMore, setShowMore] = useState(true)

    const hasChildren = array.some(elem => elem.parentId === item.id)

    function handleClick() {
        setShowMore(prev => !prev)
    }


    return (
        <li>
            <div>
                {hasChildren && 
                <button onClick={handleClick}>
                    {showMore ? "+" : "-"}
                </button>
                }
                <input 
                type="checkbox"
                onChange={() => toggleId(item.id)}
                checked={selectedIds.has(item.id)}
                >
                </input>
                {item.name}

                {!showMore && hasChildren &&
                    <FiltersTree array={array} parentId={item.id} selectedIds={selectedIds} toggleId={toggleId}/>
                }
            </div>
        </li>

    )
}