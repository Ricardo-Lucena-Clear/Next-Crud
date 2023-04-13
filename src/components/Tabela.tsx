import Cliente from "@/core/Cliente"
import { func } from "prop-types"

interface TabelaProps {
    clientes: Cliente[]
}
export default function Tabela(props: TabelaProps) {
    function renderizarCabecalho() {
        return (
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Idade</th>
            </tr>
        )
    }
    function rendereizarDados() {
        return props.clientes?.map((Cliente, i) => {
            return(
            <tr key={Cliente.id}>

                <td>{Cliente.id}</td>
                <td>{Cliente.nome}</td>
                <td>{Cliente.idade}</td>

            </tr>
            )
        })
    }
    return (
        <table>
            <thead>
                {renderizarCabecalho()}
            </thead>
            <tbody>
               {rendereizarDados()}
            </tbody>
        </table>

    )
}