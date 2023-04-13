import Layout from "@/components/Layout";
import Tabela from "@/components/Tabela";
import Cliente from "@/core/Cliente";

export default function Home() {

  const clientes = [
    new Cliente("Pedro", 23, "1"),
    new Cliente("Bia", 52, "2"),
    new Cliente("João", 43, "3"),
    new Cliente("Henrique", 33, "4")

  ]

  return (
    <div className={`
    flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to bg-purple-500
    text-white
    `}>
    <Layout titulo="Cadastro simples">
      <Tabela clientes={clientes}> </Tabela>
    </Layout>
    </div>
  )
}
