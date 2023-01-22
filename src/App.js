import { useState, useEffect } from "react";
import { Filter } from "./Filter";

export function App() {
  const [items, setItems] = useState(null)
  const [selectedIds, setSelectedIds] = useState(new Set([]))

  useEffect(() => {
    fetch("./categories.json").then(response => response.json()).then(response => setItems(response))
  }, [])

  if (items === null) {
    return null
  }


  return (
    <div className="filter">
      <Filter array={items} selectedIds={selectedIds} onChange={setSelectedIds} />
    </div>
  );
}
