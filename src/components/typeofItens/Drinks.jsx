import { useState } from "react";
import MainList from "../MainList";
import { MdDeleteOutline } from "react-icons/md";

function ShoppingDrinks({ bebida, index, onDelete, onEdit, onToggle }) {
  return (
    <div className={bebida.marcado ? "checked" : "unchecked"}>
      <input
        type="checkbox"
        checked={bebida.marcado}
        onChange={() => onToggle(index)}
        className="check"
      />
      <input
        type="text"
        value={bebida.nome}
        onChange={(e) => onEdit(index, e.target.value)}
      />
      <button onClick={() => onDelete(index)}>
        <MdDeleteOutline />
      </button>
    </div>
  );
}

export default function Drinks() {
  const [bebidas, setBebidas] = useState([
    { nome: "Água", marcado: false },
    { nome: "Suco", marcado: false },
    { nome: "Refrigerante", marcado: false },
    { nome: "Cerveja", marcado: false },
  ]);

  const handleDelete = (index) => {
    const novaLista = bebidas.filter((_, i) => i !== index);
    setBebidas(novaLista);
  };

  const handleEdit = (index, novoValor) => {
    const novaLista = [...bebidas];
    novaLista[index].nome = novoValor;
    setBebidas(novaLista);
  };

  const handleToggle = (index) => {
    const novaLista = [...bebidas];
    novaLista[index].marcado = !novaLista[index].marcado;
    setBebidas(novaLista);
  };

  return (
    <div>
      <div className="max-w-82 flex flex-col bg-sky-200 p-1 justify-center rounded-sm mb-1 text-center">
        <h2 className="text-3xl mb-4 text-gray-800 border-b-1">Bebidas</h2>
        <MainList />
        {bebidas.map((bebida, index) => (
          <ShoppingDrinks
            key={index}
            bebida={bebida}
            index={index}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
}
