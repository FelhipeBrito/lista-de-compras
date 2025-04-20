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
      
        <Mercearia />
        <Drinks />
     
     
        <Proteinas />
        <Utilidades />
    
     
        <Laticinios />
        <Higiene />
   
     
        <Limpeza />
        <Obs />
      
    </div>
  );
}
