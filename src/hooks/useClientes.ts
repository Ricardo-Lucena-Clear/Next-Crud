import { useEffect, useState } from "react"
import ColecaoCliente from "@/backend/db/ColecaoCliente"
import Cliente from "@/core/Cliente"
import ClienteRepositorio from "@/core/ClienteRepositorio"
import useTabelaOuForm from "./useTabelaOuForm"

export default function useClientes() {
    const repo: ClienteRepositorio = new ColecaoCliente()

    const { tabelaVisivel, formularioVisivel, exibirFormulario, exibirTabela } = useTabelaOuForm()

    const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
    const [clientes, setClientes] = useState<Cliente[]>([])

    useEffect(obterTodos, [])
    function obterTodos() {
        repo.obterTodos().then(clientes => {
            setClientes(clientes)
            exibirTabela()
        })
    }



    function clienteSelecionado(Cliente: Cliente) {
        setCliente(Cliente)
        exibirFormulario()
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
        exibirFormulario()
    }
    return {
        tabelaVisivel,
        exibirTabela,
        cliente,
        clientes,
        novoCliente,
        salvarCliente,
        clienteExcluido,
        clienteSelecionado,
        obterTodos,
    }
}