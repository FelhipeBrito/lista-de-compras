import { useState } from "react";
import MainList from "../MainList";
import { MdDeleteOutline } from "react-icons/md";

function ShoppingLimpeza({ item, index, onDelete, onEdit, onToggle }) {
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

export default function Limpeza() {
  const [limpeza, setLimpeza] = useState([
    { nome: "Água Sanitária", marcado: false },
    { nome: "Álcool em gel", marcado: false },
    { nome: "Amaciante", marcado: false },
    { nome: "Desinfetante", marcado: false },
    { nome: "Detergente", marcado: false },
    { nome: "Esponja de aço", marcado: false },
    { nome: "Esponja de pia", marcado: false },
    { nome: "Flanelas", marcado: false },
    { nome: "Inseticida", marcado: false },
    { nome: "Lustra-móveis", marcado: false },
    { nome: "Luvas plásticas", marcado: false },
    { nome: "Sabão em barra", marcado: false },
    { nome: "Sabão em pó", marcado: false },
    { nome: "Sacos de lixo", marcado: false },
    { nome: "Álcool 90%", marcado: false },
  ]);

  const handleDelete = (index) => {
    const novaLista = limpeza.filter((_, i) => i !== index);
    setLimpeza(novaLista);
  };

  const handleEdit = (index, novoValor) => {
    const novaLista = [...limpeza];
    novaLista[index].nome = novoValor;
    setLimpeza(novaLista);
  };

  const handleToggle = (index) => {
    const novaLista = [...limpeza];
    novaLista[index].marcado = !novaLista[index].marcado;
    setLimpeza(novaLista);
  };

  return (
    <div>
      <div className="max-w-82 flex flex-col bg-sky-200 p-1 justify-center rounded-sm mb-1 text-center">
        <h2 className="text-3xl mb-4 text-gray-800 border-b-1">Limpeza</h2>
        <MainList />
        {limpeza.map((item, index) => (
          <ShoppingLimpeza
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
