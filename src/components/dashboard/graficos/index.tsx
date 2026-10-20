import { Chart } from "primereact/chart";
import { Tarefa } from "@/src/models/tarefas";

import { StatusTarefa } from "@/src/enums/statusTarefa";
import { PrioridadeTarefa } from "@/src/enums/prioridadeTarefa";

import { useTheme } from "@/src/hooks/useTheme";

interface GraficosProps {
    tarefas: Tarefa[];
}

export const Graficos: React.FC<GraficosProps> = ({ tarefas }) => {

    const { tema } = useTheme();

    // Status
    const pendentes = tarefas.filter(
        tarefa => tarefa.status === StatusTarefa.Pendente
    ).length;

    const andamento = tarefas.filter(
        tarefa => tarefa.status === StatusTarefa.EmAndamento
    ).length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.status === StatusTarefa.Concluida
    ).length;

    // Prioridade
    const baixa = tarefas.filter(
        tarefa => tarefa.prioridade === PrioridadeTarefa.Baixa
    ).length;

    const media = tarefas.filter(
        tarefa => tarefa.prioridade === PrioridadeTarefa.Media
    ).length;

    const alta = tarefas.filter(
        tarefa => tarefa.prioridade === PrioridadeTarefa.Alta
    ).length;

    const dadosStatus = {
        labels: [
            "Pendentes",
            "Em andamento",
            "Concluídas"
        ],
        datasets: [
            {
                data: [
                    pendentes,
                    andamento,
                    concluidas
                ],
                backgroundColor: [
                    "#fbbf24",
                    "#38bdf8",
                    "#34d399"
                ],
                hoverBackgroundColor: [
                    "#f59e0b",
                    "#0ea5e9",
                    "#10b981"
                ]
            }
        ]
    };

    const dadosPrioridade = {
        labels: [
            PrioridadeTarefa.Baixa,
            PrioridadeTarefa.Media,
            PrioridadeTarefa.Alta
        ],
        datasets: [
            {
                data: [
                    baixa,
                    media,
                    alta
                ],
                backgroundColor: [
                    "#34d399",
                    "#fbbf24",
                    "#ef4444"
                ],
                hoverBackgroundColor: [
                    "#10b981",
                    "#f59e0b",
                    "#dc2626"
                ]
            }
        ]
    };

    const opcoesGrafico = {
        maintainAspectRatio: false,

        plugins: {
            legend: {
                position: "bottom" as const,
                labels: {
                    color: tema === "dark" ? "#ffffff" : "#363636",
                    font: {
                        size: 12
                    },
                    boxWidth: 30,
                    padding: 10
                }
            }
        }
    };

    return (
        <div className="columns is-multiline mt-4">

            <div className="column is-12-mobile is-12-tablet is-6-desktop">
                <div className="box">

                    <h2 className="title is-5">
                        Tarefas por status
                    </h2>

                    <div className="dashboard-chart">
                        <Chart
                            type="doughnut"
                            data={dadosStatus}
                            options={opcoesGrafico}
                        />
                    </div>

                </div>
            </div>

            <div className="column is-12-mobile is-12-tablet is-6-desktop">
                <div className="box">

                    <h2 className="title is-5">
                        Tarefas por prioridade
                    </h2>

                    <div className="dashboard-chart">
                        <Chart
                            type="doughnut"
                            data={dadosPrioridade}
                            options={opcoesGrafico}
                        />
                    </div>

                </div>
            </div>

        </div>
    );
};
