import ColecaoCliente from "@/backend/db/ColecaoCliente";
import Botao from "@/components/Botao";
import Formulario from "@/components/Formulario";
import Layout from "@/components/Layout";
import Tabela from "@/components/Tabela";
import Cliente from "@/core/Cliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import { useEffect, useState } from "react";

export default function Home() {
  const repo: ClienteRepositorio = new ColecaoCliente()

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [visivel, setVisivel] = useState<"tabela" | "form">("tabela")

  useEffect(obterTodos, [])
  function obterTodos() {
    repo.obterTodos().then(clientes =>{
      setClientes(clientes)
      setVisivel("tabela")
    })
  }



  function clienteSelecionado(Cliente: Cliente) {
    setCliente(Cliente)
    setVisivel("form")
  }
  async function clienteExcluido(Cliente: Cliente) {
    await repo.excluir(Cliente)
    obterTodos()
  }
  async function salvarCliente(Cliente: Cliente) {
    await repo.salvar(Cliente)
    obterTodos()
  }
  function novoCliente() {
    setCliente(Cliente.vazio())
    setVisivel("form")
  }



  return (
    <div className={`
    flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to bg-purple-500
    text-white
    `}>
      <Layout titulo="Cadastro simples">
        {visivel === "tabela" ? (
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
            cancelado={() => setVisivel("tabela")}
          ></Formulario>
        )}
      </Layout>
    </div>

  )
}

