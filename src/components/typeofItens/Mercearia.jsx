import { useState } from "react";

function ShoppingMercearia({ Mercearia, index, onDelete, onEdit }) {
  return (
    <div className="flex gap-2 mb-2">
      <input type="checkbox" className="check" />
      <input
        type="text"
        value={Mercearia}
        onChange={(e) => onEdit(index, e.target.value)}
        className="border px-2 rounded"
      />
      <button
        onClick={() => onDelete(index)}
        className="bg-red-200 px-2 rounded"
      >
        X
      </button>
    </div>
  );
}

export default function Mercearia() {

  const [mercearia, setMercearia] = useState([
    "Feijão",
    "Óleo de soja",
    "Sal",
    "Açúcar",
    "Café",
    "Molho de tomate",
    "Macarrão",
    "Milho",
    "Farinha de trigo",
    "Farinha de mandioca",
    "Chá",
    "Fermento Químico",
    "Azeite",
    "Pães",
    "Bolos",
    "Pão de forma",
    "Granola",
    "Biscoito Doce",
    "Biscoito de Sal",
    "Adoçantes",
    "Ketchup",
    "Maionese",
  ]);

  const handleDelete = (index) => {
    const novaLista = mercearia.filter((_, i) => i !== index);
    setMercearia(novaLista);
  };

  const handleEdit = (index, novoValor) => {
    const novaLista = [...mercearia];
    novaLista[index] = novoValor;
    setMercearia(novaLista);
  };

  return (
    <div>
      <div className="bg-sky-50 rounded-2xl p-5">
        <h2 className="text-3xl mb-4">Mercearia</h2>

        {mercearia.map((Mercearia, index) => (
          <ShoppingMercearia
            key={index}
            Mercearia={Mercearia}
            index={index}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}
