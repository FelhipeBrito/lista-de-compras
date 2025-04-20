export default function Obs(){
    return(
        <div className="max-w-82 flex flex-col bg-sky-100 p-1 justify-center items-center rounded-sm mb-1 text-center">
            <h2 className="text-3xl mb-2 border-b-1 text-center" >Observações</h2>
            <textarea className="max-w-3xs h-50 resize-none p-1" placeholder="Observações">
            </textarea>
        </div>
    )
}