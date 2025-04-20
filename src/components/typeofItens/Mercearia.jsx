import { useState } from "react";
import MainList from "../MainList";
import { MdDeleteOutline } from "react-icons/md";

function ShoppingMercearia({ item, index, onDelete, onEdit, onToggle }) {
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

export default function Mercearia() {
  const [mercearia, setMercearia] = useState([
    { nome: "Feijão", marcado: false },
    { nome: "Óleo de soja", marcado: false },
    { nome: "Sal", marcado: false },
    { nome: "Açúcar", marcado: false },
    { nome: "Café", marcado: false },
    { nome: "Molho de tomate", marcado: false },
    { nome: "Macarrão", marcado: false },
    { nome: "Milho", marcado: false },
    { nome: "Farinha de trigo", marcado: false },
    { nome: "Farinha de mandioca", marcado: false },
    { nome: "Chá", marcado: false },
    { nome: "Fermento Químico", marcado: false },
    { nome: "Azeite", marcado: false },
    { nome: "Pães", marcado: false },
    { nome: "Bolos", marcado: false },
    { nome: "Pão de forma", marcado: false },
    { nome: "Granola", marcado: false },
    { nome: "Biscoito Doce", marcado: false },
    { nome: "Biscoito de Sal", marcado: false },
    { nome: "Adoçantes", marcado: false },
    { nome: "Ketchup", marcado: false },
    { nome: "Maionese", marcado: false },
  ]);

  const handleDelete = (index) => {
    const novaLista = mercearia.filter((_, i) => i !== index);
    setMercearia(novaLista);
  };

  const handleEdit = (index, novoNome) => {
    const novaLista = [...mercearia];
    novaLista[index].nome = novoNome;
    setMercearia(novaLista);
  };

  const handleToggle = (index) => {
    const novaLista = [...mercearia];
    novaLista[index].marcado = !novaLista[index].marcado;
    setMercearia(novaLista);
  };

  return (
    <div>
      <div className="max-w-82 flex flex-col bg-sky-200 p-1 justify-center rounded-sm mb-1 text-center">
        <h2 className="text-3xl mb-4 text-gray-800 border-b-1">Mercearia</h2>
        <MainList />
        {mercearia.map((item, index) => (
          <ShoppingMercearia
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
