import { useState } from "react";
import MainList from "../MainList";
import { MdDeleteOutline } from "react-icons/md";

function ShoppingHigiene({ item, index, onDelete, onEdit, onToggle }) {
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

export default function Higiene() {
  const [higiene, setHigiene] = useState([
    { nome: "Absorventes", marcado: false },
    { nome: "Água oxigenada", marcado: false },
    { nome: "Algodão", marcado: false },
    { nome: "Barbeador", marcado: false },
    { nome: "Curativos", marcado: false },
    { nome: "Creme dental", marcado: false },
    { nome: "Desodorante", marcado: false },
    { nome: "Escova de dente", marcado: false },
    { nome: "Esparadrapo", marcado: false },
    { nome: "Fio dental", marcado: false },
    { nome: "Gaze", marcado: false },
    { nome: "Hastes flexíveis", marcado: false },
    { nome: "Papel higiênico", marcado: false },
    { nome: "Sabonete", marcado: false },
    { nome: "Shampoo", marcado: false },
    { nome: "Condicionador", marcado: false },
  ]);

  const handleDelete = (index) => {
    const novaLista = higiene.filter((_, i) => i !== index);
    setHigiene(novaLista);
  };

  const handleEdit = (index, novoValor) => {
    const novaLista = [...higiene];
    novaLista[index].nome = novoValor;
    setHigiene(novaLista);
  };

  const handleToggle = (index) => {
    const novaLista = [...higiene];
    novaLista[index].marcado = !novaLista[index].marcado;
    setHigiene(novaLista);
  };

  return (
    <div>
      <div className="max-w-82 flex flex-col bg-sky-200 p-1 justify-center rounded-sm mb-1 text-center">
        <h2 className="text-3xl mb-4 text-gray-800 border-b-1">Higiene</h2>
        <MainList />
        {higiene.map((item, index) => (
          <ShoppingHigiene
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
