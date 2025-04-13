import { useState } from "react";

function ShoppingLimpeza({ Limpeza, index, onDelete, onEdit }) {
  return (
    <div className="flex gap-2 mb-2">
      <input type="checkbox" className="check" />
      <input
        type="text"
        value={Limpeza}
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

export default function Limpeza() {

  const[limpeza,setLimpeza] = useState([
    "Água Sanitária",
    "Álcool em gel",
    "Amaciante",
    "Desinfetante",
    "Detergente",
    "Esponja de aço",
    "Esponja de pia",
    "Flanelas",
    "Inseticida",
    "Lustra-móveis",
    "Luvas plásticas",
    "Sabão em barra",
    "Sabão em pó",
    "Sacos de lixo",
    "Álcool 90%",
  ]);

  const handleDelete = (index) => {
    const novaLista = limpeza.filter((_, i) => i !== index);
    setLimpeza(novaLista);
  };

  const handleEdit = (index, novoValor) => {
    const novaLista = [...limpeza];
    novaLista[index] = novoValor;
    setLimpeza(novaLista);
  };

  return (
    <div>
      <div className="bg-sky-50 rounded-2xl p-5">
        <h2 className="text-3xl mb-4">Limpeza</h2>

        {limpeza.map((Limpeza, index) => (
          <ShoppingLimpeza
            key={index}
            Limpeza={Limpeza}
            index={index}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
     
    </div>
  );
}
