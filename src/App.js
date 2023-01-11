import { useState, useEffect } from "react";
import { Filter } from "./Filter";

export function App() {
  const [items, setItems] = useState(null)
  const [selectedIds, setSelectedIds] = useState(new Set([12723, 12682]))
  
  useEffect(() => {
    fetch("./categories.json").then(response => response.json()).then(response => setItems(response.items))
  }, [])
  
  if(items === null) {
    return null
  }


  return (
    <div>
      <Filter array={items} value={selectedIds} onChange={setSelectedIds}/>
    </div>
  );
}
