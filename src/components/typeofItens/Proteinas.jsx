import { useState } from "react";
import MainList from "../MainList";
import { MdDeleteOutline } from "react-icons/md";

function ShoppingProteinas({ item, index, onDelete, onEdit, onToggle }) {
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

export default function Proteinas() {
  const [proteinas, setProteinas] = useState([
    { nome: "Carnes boi", marcado: false },
    { nome: "Linguiça", marcado: false },
    { nome: "Peixes", marcado: false },
    { nome: "Ovos", marcado: false },
    { nome: "Frango Peito", marcado: false },
    { nome: "Frango Coxa", marcado: false },
    { nome: "Frango Sobrecoxa", marcado: false },
    { nome: "Frango Tulipa", marcado: false },
    { nome: "Farinha de trigo", marcado: false },
    { nome: "Presunto", marcado: false },
    { nome: "Sardinha", marcado: false },
    { nome: "Salsicha", marcado: false },
    { nome: "Bacon", marcado: false },
    { nome: "Costelinha", marcado: false },
  ]);

  const handleDelete = (index) => {
    const novaLista = proteinas.filter((_, i) => i !== index);
    setProteinas(novaLista);
  };

  const handleEdit = (index, novoValor) => {
    const novaLista = [...proteinas];
    novaLista[index].nome = novoValor;
    setProteinas(novaLista);
  };

  const handleToggle = (index) => {
    const novaLista = [...proteinas];
    novaLista[index].marcado = !novaLista[index].marcado;
    setProteinas(novaLista);
  };

  return (
    <div>
      <div className="max-w-82 flex flex-col bg-sky-200 p-1 justify-center rounded-sm mb-1 text-center">
        <h2 className="text-3xl mb-4 text-gray-800 border-b-1">Proteínas</h2>
        <MainList />
        {proteinas.map((item, index) => (
          <ShoppingProteinas
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
