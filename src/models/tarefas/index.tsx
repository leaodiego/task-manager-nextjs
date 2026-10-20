import { StatusTarefa } from "@/src/enums/statusTarefa";
import { PrioridadeTarefa } from "@/src/enums/prioridadeTarefa";

export interface Tarefa {
    id?: number;
    titulo: string;
    status: StatusTarefa;
    prioridade: PrioridadeTarefa;
}