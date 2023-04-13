import Cliente from "@/core/Cliente"
import { IconeLixo, IconeEdicao } from "./Icones"

interface TabelaProps {
    clientes: Cliente[]
    clienteSelecionado?: (Cliente: Cliente) => void
    clienteExcluido?: (Cliente: Cliente) => void
}
export default function Tabela(props: TabelaProps) {
    const exibirAcoes = props.clienteExcluido || props.clienteSelecionado
    function renderizarCabecalho() {
        return (
            <tr>
                <th className="text-left p-4">Código</th>
                <th className="text-left p-4">Nome</th>
                <th className="text-left p-4">Idade</th>
                {exibirAcoes ? <th className=" p-4">Ações</th>: false}
            </tr>
        )
    }
    function renderizarDados() {
        return props.clientes?.map((Cliente, i) => {
            return (
                <tr key={Cliente.id}
                    className={`${i % 2 === 0 ? "bg-purple-200" : "bg-purple-100"}`}>

                    <td className="text-left p-4">{Cliente.id}</td>
                    <td className="text-left p-4">{Cliente.nome}</td>
                    <td className="text-left p-4">{Cliente.idade}</td>
                    {exibirAcoes ? renderizarAcoes(Cliente): false}


                </tr>
            )
        })
    }
    function renderizarAcoes(Cliente: Cliente) {
        return (
            <td className="flex justify-center">
                {props.clienteSelecionado ? (
                    <button onClick={()=> props.clienteSelecionado?.(Cliente)} className={`
                    flex justify-center items-center
                    text-green-600 rounded-full p-2 m-1
                    hover:bg-purple-50 
                    `}>
                        {IconeEdicao}
                    </button>
                ) : false}

                {props.clienteExcluido ? (
                     <button onClick={()=> props.clienteExcluido?.(Cliente)} className={`
                     flex justify-center items-center
                     text-red-600 rounded-full p-2 m-1
                     hover:bg-purple-50 
                     `}>
                         {IconeLixo}
                     </button>
                ) : false}


               
            </td>
        )
    }
    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className={`
            text-white
            bg-gradient-to-r from-blue-500 to-purple-800`}>
                {renderizarCabecalho()}
            </thead>
            <tbody>
                {renderizarDados()}
            </tbody>
        </table>

    )
}