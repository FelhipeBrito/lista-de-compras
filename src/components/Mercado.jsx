import Mercearia from "./typeofItens/Mercearia";
import Drinks from "./typeofItens/Drinks";
import Higiene from "./typeofItens/Higiene";
import Laticinios from "./typeofItens/Laticinios";
import Limpeza from "./typeofItens/Limpeza";
import Proteinas from "./typeofItens/Proteinas";
import Utilidades from "./typeofItens/Utilidades";
import Obs from "./Obs";

export default function Mercado() {
  return (
    <div className="main-container2">

      <div className="sub-container1">
        <Mercearia />
        <Proteinas />
        <Drinks />
        <Utilidades />
      </div>

      <div className="sub-container2">
        <Limpeza />
        <Higiene />
        <Laticinios />
        <Obs />
      </div>
    </div>
  );
}
