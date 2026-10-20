import { Tarefa } from "@/src/models/tarefas";

import { StatusTarefa } from "@/src/enums/statusTarefa";

interface IndicadoresProps {
    tarefas: Tarefa[];
}

export const Indicadores: React.FC<IndicadoresProps> = ({ tarefas }) => {

    const total = tarefas.length;

    const pendentes = tarefas.filter(
        tarefa => tarefa.status === StatusTarefa.Pendente
    ).length;

    const andamento = tarefas.filter(
        tarefa => tarefa.status === StatusTarefa.EmAndamento
    ).length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.status === StatusTarefa.Concluida
    ).length;

    return (
        <div className="columns is-multiline">

            <div className="column is-12-mobile is-6-tablet is-3-desktop">
                <div className="box">
                    <p className="heading">Total de tarefas</p>
                    <p className="title">{total}</p>
                </div>
            </div>

            <div className="column is-12-mobile is-6-tablet is-3-desktop">
                <div className="box">
                    <p className="heading">Pendentes</p>

                    <p className="title has-text-warning">
                        {pendentes}
                    </p>
                </div>
            </div>

            <div className="column is-12-mobile is-6-tablet is-3-desktop">
                <div className="box">
                    <p className="heading">
                        Em andamento
                    </p>

                    <p className="title has-text-info">
                        {andamento}
                    </p>
                </div>
            </div>

            <div className="column is-12-mobile is-6-tablet is-3-desktop">
                <div className="box">
                    <p className="heading">
                        Concluídas
                    </p>

                    <p className="title has-text-success">
                        {concluidas}
                    </p>
                </div>
            </div>

        </div>
    );
};