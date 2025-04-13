import { useState } from "react";

function ShoppingLaticinios({ Laticinios, index, onDelete, onEdit }) {
  return (
    <div className="flex gap-2 mb-2">
      <input type="checkbox" className="check" />
      <input
        type="text"
        value={Laticinios}
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

export default function Laticinios() {
 
  const [laticinios,setLaticinios] = useState([
    "Leite",
    "Manteiga",
    "Iogurte",
    "Margarina",
    "Queijo",
    "Requeijão",
    "Creme de leite",
    "Leite Condensado",
  ]);

  const handleDelete = (index) => {
    const novaLista = laticinios.filter((_, i) => i !== index);
    setLaticinios(novaLista);
  };

  const handleEdit = (index, novoValor) => {
    const novaLista = [...laticinios];
    novaLista[index] = novoValor;
    setLaticinios(novaLista);
  };

  return (
    <div>
      <div className="bg-sky-50 rounded-2xl p-5">
        <h2 className="text-3xl mb-4">Laticinios</h2>

        {laticinios.map((Laticinios, index) => (
          <ShoppingLaticinios
            key={index}
            Laticinios={Laticinios}
            index={index}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
     
    </div>
  );
}
