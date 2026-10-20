import axios from "axios";

import { Tarefa } from "@/src/models/tarefas";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error(
        "A variável NEXT_PUBLIC_API_URL não foi configurada."
    );
}

export const TarefasService = {

    listar: async (): Promise<Tarefa[]> => {

        const response = await axios.get<Tarefa[]>(
            `${API_URL}/api/tarefas`
        );

        return response.data;
    },

    cadastrar: async (tarefa: Tarefa): Promise<void> => {

        await axios.post(
            `${API_URL}/api/tarefas`,
            tarefa
        );
    },

    atualizar: async (
        id: number,
        tarefa: Tarefa
    ): Promise<void> => {

        await axios.put(
            `${API_URL}/api/tarefas/${id}`,
            tarefa
        );
    },

    excluir: async (id: number): Promise<void> => {

        await axios.delete(
            `${API_URL}/api/tarefas/${id}`
        );
    }

};