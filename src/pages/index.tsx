import Botao from "@/components/Botao";
import Formulario from "@/components/Formulario";
import Layout from "@/components/Layout";
import Tabela from "@/components/Tabela";
import Cliente from "@/core/Cliente";
import { useState } from "react";

export default function Home() {
  const [CLT, setCliente] = useState<Cliente>(Cliente.vazio())
  const [visivel, setVisivel] = useState<"tabela" | "form">("tabela")


  const clientes = [
    new Cliente("Pedro", 23, "1"),
    new Cliente("Bia", 52, "2"),
    new Cliente("João", 43, "3"),
    new Cliente("Henrique", 33, "4")

  ]
  function clienteSelecionado(Cliente: Cliente) {
    setCliente(Cliente)
    setVisivel("form")
  }
  function clienteExcluido(Cliente: Cliente) {
    console.log(Cliente.nome)
  }
  function salvarCliente(Cliente:Cliente) {
    console.log(Cliente)
    setVisivel("tabela")
  }
  function novoCliente() {
   setCliente(Cliente.vazio)
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
          <Formulario cliente={CLT}
          clienteMudou={salvarCliente}
          cancelado={()=> setVisivel("tabela")}
          ></Formulario>
        )}
      </Layout>
    </div>

  )
}

