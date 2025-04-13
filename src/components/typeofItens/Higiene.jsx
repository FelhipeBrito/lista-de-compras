import { useState } from "react";

function Shoppinghigiene({ higiene, index, onDelete, onEdit }) {
  return (
    <div className="flex gap-2 mb-2">
      <input type="checkbox" className="check" />
      <input
        type="text"
        value={higiene}
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

export default function Higiene() {
  const [higiene, setHigiene] = useState([
    "Absorventes",
    "Água oxigenada",
    "Algodão",
    "Barbeador",
    "Curativos",
    "Creme dental",
    "Desodorante",
    "Escova de dente",
    "Esparadrapo",
    "Fio dental",
    "Gaze",
    "Hastes flexíveis",
    "Papel higiênico",
    "Sabonete",
    "Shampoo",
    "Condicionador",
  ]);

  const handleDelete = (index) => {
    const novaLista = higiene.filter((_, i) => i !== index);
    setHigiene(novaLista);
  };

  const handleEdit = (index, novoValor) => {
    const novaLista = [...higiene];
    novaLista[index] = novoValor;
    setHigiene(novaLista);
  };

  return (
    <div>
      <div className="bg-sky-50 rounded-2xl p-5">
        <h2 className="text-3xl mb-4">Higiene</h2>

        {higiene.map((higiene, index) => (
          <Shoppinghigiene
            key={index}
            higiene={higiene}
            index={index}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}
