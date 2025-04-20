import { useState } from "react";
import MainList from "../MainList";
import { MdDeleteOutline } from "react-icons/md";

function ShoppingUtilidades({ item, index, onDelete, onEdit, onToggle }) {
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

export default function Utilidades() {
  const [utilidades, setUtilidades] = useState([
    { nome: "Fósforo", marcado: false },
    { nome: "Guardanapo", marcado: false },
    { nome: "Lâmpadas", marcado: false },
    { nome: "Papel Alumínio", marcado: false },
    { nome: "Papel Filme", marcado: false },
    { nome: "Papel toalha", marcado: false },
    { nome: "Protetor de fogão", marcado: false },
    { nome: "Vela", marcado: false },
  ]);

  const handleDelete = (index) => {
    const novaLista = utilidades.filter((_, i) => i !== index);
    setUtilidades(novaLista);
  };

  const handleEdit = (index, novoValor) => {
    const novaLista = [...utilidades];
    novaLista[index].nome = novoValor;
    setUtilidades(novaLista);
  };

  const handleToggle = (index) => {
    const novaLista = [...utilidades];
    novaLista[index].marcado = !novaLista[index].marcado;
    setUtilidades(novaLista);
  };

  return (
    <div>
      <div className="max-w-82 flex flex-col bg-sky-200 p-1 justify-center rounded-sm mb-1 text-center">
        <h2 className="text-3xl mb-4 text-gray-800 border-b-1">Utilidades</h2>
        <MainList />
        {utilidades.map((item, index) => (
          <ShoppingUtilidades
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
