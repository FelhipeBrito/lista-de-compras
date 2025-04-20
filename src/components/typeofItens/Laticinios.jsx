import { useState } from "react";
import MainList from "../MainList";
import { MdDeleteOutline } from "react-icons/md";

function ShoppingLaticinios({ item, index, onDelete, onEdit, onToggle }) {
  return (
    <div className={item.marcado ? "checked" : "unchecked"}>
      <input
        type="checkbox"
        checked={item.marcado}
        onChange={() => onToggle(index)}
        className="check"
      />
      <input
        type="text"
        value={item.nome}
        onChange={(e) => onEdit(index, e.target.value)}
      />
      <button onClick={() => onDelete(index)}>
        <MdDeleteOutline />
      </button>
    </div>
  );
}

export default function Laticinios() {
  const [laticinios, setLaticinios] = useState([
    { nome: "Leite", marcado: false },
    { nome: "Manteiga", marcado: false },
    { nome: "Iogurte", marcado: false },
    { nome: "Margarina", marcado: false },
    { nome: "Queijo", marcado: false },
    { nome: "Requeijão", marcado: false },
    { nome: "Creme de leite", marcado: false },
    { nome: "Leite Condensado", marcado: false },
  ]);

  const handleDelete = (index) => {
    const novaLista = laticinios.filter((_, i) => i !== index);
    setLaticinios(novaLista);
  };

  const handleEdit = (index, novoValor) => {
    const novaLista = [...laticinios];
    novaLista[index].nome = novoValor;
    setLaticinios(novaLista);
  };

  const handleToggle = (index) => {
    const novaLista = [...laticinios];
    novaLista[index].marcado = !novaLista[index].marcado;
    setLaticinios(novaLista);
  };

  return (
    <div>
      <div className="max-w-82 flex flex-col bg-sky-200 p-1 justify-center rounded-sm mb-1 text-center">
        <h2 className="text-3xl mb-4 text-gray-800 border-b-1">Laticínios</h2>
        <MainList />
        {laticinios.map((item, index) => (
          <ShoppingLaticinios
            key={index}
            item={item}
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
