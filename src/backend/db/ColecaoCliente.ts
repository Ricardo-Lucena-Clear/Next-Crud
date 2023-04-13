import firebase from "../config"
import Cliente from "@/core/Cliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";

export default class ColecaoCliente implements ClienteRepositorio {

    #conversor = {
        toFirestore(Cliente: Cliente) {
            return {
                nome: Cliente.nome,
                idade: Cliente.idade,
            }
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions) {
            const dados = snapshot.data(options)
            return new Cliente(dados.nome, dados.idade, snapshot.id)
        }
    }

    async salvar(Cliente: Cliente): Promise<Cliente> {
        if(Cliente?.id){
            await this.colecao().doc(Cliente.id).set(Cliente)
            return Cliente
        }else{
            const docRef = await this.colecao().add(Cliente)
            const doc = await docRef.get()
            return doc.data()
        }
    }
    async excluir(Cliente: Cliente): Promise<void> {
        return this.colecao().doc(Cliente.id).delete()
    }
    async obterTodos(): Promise<Cliente[]> {
        const query = await this.colecao().get()
        return query.docs.map(doc => doc.data())
    }
    private colecao(){
        return firebase
        .firestore().collection("Clientes").withConverter(this.#conversor)
    }
}