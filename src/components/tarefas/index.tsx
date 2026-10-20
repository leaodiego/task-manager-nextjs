import { ListarTarefas } from "./lista"
import { Layout } from "../common/Layout"

export const Tarefas:React.FC = () => {
    return (
        <Layout titulo="Tarefas">
            <ListarTarefas />
        </Layout>
    )
}