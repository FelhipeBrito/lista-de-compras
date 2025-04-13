import Input from "./Input";
import Title from "./Title";
import Drinks from "./typeofItens/Drinks";
import Higiene from "./typeofItens/Higiene";
import Laticinios from "./typeofItens/Laticinios";
import Limpeza from "./typeofItens/Limpeza";
import Mercearia from "./typeofItens/Mercearia";
import Proteinas from "./typeofItens/Proteinas";
import Utilidades from "./typeofItens/Utilidades";

export default function MainList(){
    return(
        <div>
           <Title />
            <div className="flex flex-col gap-3">

                <div className="flex gap-1.5">
                    <Mercearia />
                    <Proteinas />
                    <Higiene />
                    <Limpeza />
                </div>

                <div className="flex gap-1.5"> 
                    <Laticinios />
                    <Utilidades />
                    <Drinks />
                    <Input />
                </div>
            </div>
        </div>
    )
}