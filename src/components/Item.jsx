import { useState } from "react";

function ShoppingItem({ item, index, onDelete, onEdit }) {
  return (
    <div className="flex gap-2 mb-2">
      <input type="checkbox" className="check" />
      <input
        type="text"
        value={item}
        onChange={(e) => onEdit(index, e.target.value)}
        className="border px-2 rounded"
      />
      <button
        onClick={() => onDelete(index)}
        className="bg-red-200 px-2 rounded"
      >
        Excluir
      </button>
    </div>
  );
}

export default function Item() {
  const [bebidas, setBebidas] = useState([
    "Água",
    "Suco",
    "Refrigerante",
    "Cerveja",
  ]);

  const handleDelete = (index) => {
    const novaLista = bebidas.filter((_, i) => i !== index);
    setBebidas(novaLista);
  };

  const handleEdit = (index, novoValor) => {
    const novaLista = [...bebidas];
    novaLista[index] = novoValor;
    setBebidas(novaLista);
  };

  return (
    <div>
      <div className="bg-sky-50 rounded-2xl p-5">
        <h2 className="text-3xl mb-4">Bebidas</h2>

        {bebidas.map((item, index) => (
          <ShoppingItem
            key={index}
            item={item}
            index={index}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
     
    </div>
  );
}
