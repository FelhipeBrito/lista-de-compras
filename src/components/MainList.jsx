import { useEffect, useState } from "react";
import Item from "./Item";
import { GrAddCircle } from "react-icons/gr";

export default function Lista() {
  const [itens, setItens] = useState([]);
  const [novoTexto, setNovoTexto] = useState("");

  // Carregar do localStorage ao iniciar
  useEffect(() => {
    const salvos = localStorage.getItem("itens");
    if (salvos) {
      setItens(JSON.parse(salvos));
    }
  }, []);

  // Salvar no localStorage toda vez que mudar a lista
  useEffect(() => {
    localStorage.setItem("itens", JSON.stringify(itens));
  }, [itens]);

  function adicionarItem() {
    if (novoTexto.trim() === "") return;
    const novoItem = {
      id: Date.now(),
      texto: novoTexto,
      marcado: false,
    };
    setItens([novoItem, ...itens]);
    setNovoTexto("");
  }

  function toggleItem(id) {
    setItens(
      itens.map((item) =>
        item.id === id ? { ...item, marcado: !item.marcado } : item
      )
    );
  }

  function alterarTexto(id, novoTexto) {
    setItens(
      itens.map((item) =>
        item.id === id ? { ...item, texto: novoTexto } : item
      )
    );
  }

  function deletarItem(id) {
    setItens(itens.filter((item) => item.id !== id));
  }

  return (
    <>
      <div className="max-w-72 flex p-1 justify-center rounded-sm mb-1">
        <input
          type="text"
          placeholder="Novo item"
          value={novoTexto}
          onChange={(e) => setNovoTexto(e.target.value)}
          className="max-w-66 text-center border-1 rounded-2xl ml-4.5"
        />

        <button onClick={adicionarItem} className="cursor-pointer bg-green-500 text-white flex justify-center items-center w-3xl ml-2 rounded-sm">
          <GrAddCircle />
        </button>
      </div>
      {itens.length === 0 ? (
          <p></p>
        ) : (
          itens.map((item) => (
            <Item
              key={item.id}
              texto={item.texto}
              marcado={item.marcado}
              onToggle={() => toggleItem(item.id)}
              onChangeTexto={(txt) => alterarTexto(item.id, txt)}
              onDelete={() => deletarItem(item.id)}
            />
          ))
        )}

    </>
  );
}
