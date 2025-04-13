import { useState } from "react";

function ShoppingProteinas({ Proteinas, index, onDelete, onEdit }) {
  return (
    <div className="flex gap-2 mb-2">
      <input type="checkbox" className="check" />
      <input
        type="text"
        value={Proteinas}
        onChange={(e) => onEdit(index, e.target.value)}
        className="border px-2 rounded"
      />
      <button
        onClick={() => onDelete(index)}
        className="bg-red-200 px-2 rounded"
      >X
      </button>
    </div>
  );
}

export default function Proteinas() {
  const [proteinas,setProteinas] = useState([
    "Carnes boi",
    "Linguiça",
    "Peixes",
    "Ovos",
    "Frango Peito",
    "Frango Coxa",
    "Frango Sobrecoxa",
    "Frango Tulipa",
    "Farinha de trigo",
    "Presunto",
    "Sardinha",
    "Salsicha",
    "Bacon",
    "Costelinha",
  ]);
  

  const handleDelete = (index) => {
    const novaLista = proteinas.filter((_, i) => i !== index);
    setProteinas(novaLista);
  };

  const handleEdit = (index, novoValor) => {
    const novaLista = [...proteinas];
    novaLista[index] = novoValor;
    setProteinas(novaLista);
  };

  return (
    <div>
      <div className="bg-sky-50 rounded-2xl p-5">
        <h2 className="text-3xl mb-4">Proteinas</h2>

        {proteinas.map((Proteinas, index) => (
          <ShoppingProteinas
            key={index}
            Proteinas={Proteinas}
            index={index}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
     
    </div>
  );
}
