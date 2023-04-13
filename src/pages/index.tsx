import Botao from "@/components/Botao";
import Formulario from "@/components/Formulario";
import Layout from "@/components/Layout";
import Tabela from "@/components/Tabela";
import useClientes from "@/hooks/useClientes";


export default function Home() {

  const { cliente, clientes, novoCliente, salvarCliente, clienteExcluido, clienteSelecionado, tabelaVisivel, exibirTabela } = useClientes()




  return (
    <div className={`
    flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to bg-purple-500
    text-white
    `}>
      <Layout titulo="Cadastro simples">
        {tabelaVisivel ? (
          <>
            <div className="flex justify-end">
              <Botao className="mb-4" onClick={novoCliente}>Novo Cliente</Botao>
            </div>

            <Tabela clientes={clientes}
              clienteSelecionado={clienteSelecionado}
              clienteExcluido={clienteExcluido} />
          </>

        ) : (
          <Formulario cliente={cliente}
            clienteMudou={salvarCliente}
            cancelado={exibirTabela}
          ></Formulario>
        )}
      </Layout>
    </div>

  )
}

