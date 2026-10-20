import { Tarefa } from "@/src/models/tarefas";

import { StatusTarefa } from "@/src/enums/statusTarefa";
import { PrioridadeTarefa } from "@/src/enums/prioridadeTarefa";

interface ResumoProps {
    tarefas: Tarefa[];
}

export const Resumo: React.FC<ResumoProps> = ({ tarefas }) => {

    const tarefasPrioritarias = tarefas.filter(
        tarefa =>
            tarefa.prioridade === PrioridadeTarefa.Alta &&
            tarefa.status !== StatusTarefa.Concluida
    );

    return (
        <div className="columns mt-4">
            <div className="column is-12">
                <div className="box">

                    <h2 className="title is-5">
                        Tarefas que exigem atenção
                    </h2>

                    {tarefasPrioritarias.length === 0 ? (

                        <p className="has-text-grey">
                            Nenhuma tarefa de alta prioridade pendente.
                        </p>

                    ) : (

                        tarefasPrioritarias.map((tarefa) => (

                            <div
                                key={tarefa.id}
                                className="resumo-tarefa mb-3 p-3"
                            >

                                <div className="resumo-tarefa-conteudo">

                                    <div className="resumo-tarefa-info">

                                        <p className="has-text-weight-semibold">
                                            {tarefa.titulo}
                                        </p>

                                        <small className="has-text-grey">
                                            {tarefa.status}
                                        </small>

                                    </div>

                                    <span className="tag is-danger">
                                        {tarefa.prioridade}
                                    </span>

                                </div>

                            </div>

                        ))

                    )}

                </div>
            </div>
        </div>
    );
};