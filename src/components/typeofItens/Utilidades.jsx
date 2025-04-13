import { useState } from "react";

function ShoppingUtilidades({ Utilidades, index, onDelete, onEdit }) {
  return (
    <div className="flex gap-2 mb-2">
      <input type="checkbox" className="check" />
      <input
        type="text"
        value={Utilidades}
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

export default function Utilidades() {
//   const [utilidades, setUtilidades] = useState([
//     "Água",
//     "Suco",
//     "Refrigerante",
//     "Cerveja",
//   ]);
  const [utilidades,setUtilidades] = useState([
    "Fósforo",
    "Guardanapo",
    "Lâmpadas",
    "Papel Alumínio",
    "Papel Filme",
    "Papel toalha",
    "Protetor de fogão",
    "Vela",
  ]);


  const handleDelete = (index) => {
    const novaLista = utilidades.filter((_, i) => i !== index);
    setUtilidades(novaLista);
  };

  const handleEdit = (index, novoValor) => {
    const novaLista = [...utilidades];
    novaLista[index] = novoValor;
    setUtilidades(novaLista);
  };

  return (
    <div>
      <div className="bg-sky-50 rounded-2xl p-5">
        <h2 className="text-3xl mb-4">Utilidades</h2>

        {utilidades.map((Utilidades, index) => (
          <ShoppingUtilidades
            key={index}
            Utilidades={Utilidades}
            index={index}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
     
    </div>
  );
}
