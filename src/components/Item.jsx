import { MdDeleteOutline } from "react-icons/md";

export default function Item({
  texto,
  marcado,
  onToggle,
  onChangeTexto,
  onDelete,
}){
  return(
    <div className={marcado ? "checked" : "unchecked"}>
      <label htmlFor="checkbox-item">
        <input
        type="checkbox"
        id="checkbox-item"
        onChange={onToggle}
        checked={marcado}
        />
      </label>
      <input 
      type="text"
      value={texto}
      onChange={(e) => onChangeTexto(e.target.value)}
      placeholder="item" 
      className="border-1 px-4 rounded-2xl mb-1"/>
      <button onClick={onDelete}
      className="bg-red-500 px-2 rounded cursor-pointer">
      <MdDeleteOutline />
      </button>
      
    </div>
  )
}