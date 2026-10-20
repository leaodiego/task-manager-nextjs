import { useState } from "react";

import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

import { TarefasService } from "@/src/services/tarefas.service";
import { Tarefa } from "@/src/models/tarefas";
import { StatusTarefa } from "@/src/enums/statusTarefa";
import { PrioridadeTarefa } from "@/src/enums/prioridadeTarefa";

interface FormularioTarefaProps {
    tarefa?: Tarefa;
    onSalvar?: () => void;
    onErro?: () => void;
}

export const FormularioTarefa: React.FC<FormularioTarefaProps> = ({
    tarefa,
    onSalvar,
    onErro
}) => {

    const [titulo, setTitulo] = useState(tarefa?.titulo ?? "");

    const [statusSelecionado, setStatusSelecionado] =
        useState<StatusTarefa | null>(
            tarefa?.status ?? null
        );

    const [prioridadeSelecionada, setPrioridadeSelecionada] =
        useState<PrioridadeTarefa | null>(
            tarefa?.prioridade ?? null
        );

    const [erroTitulo, setErroTitulo] = useState("");
    const [erroStatus, setErroStatus] = useState("");
    const [erroPrioridade, setErroPrioridade] = useState("");
    const [salvando, setSalvando] = useState(false);

    const status = [
        {
            label: StatusTarefa.Pendente,
            value: StatusTarefa.Pendente
        },
        {
            label: StatusTarefa.EmAndamento,
            value: StatusTarefa.EmAndamento
        },
        {
            label: StatusTarefa.Concluida,
            value: StatusTarefa.Concluida
        }
    ];

    const prioridades = [
        {
            label: PrioridadeTarefa.Baixa,
            value: PrioridadeTarefa.Baixa
        },
        {
            label: PrioridadeTarefa.Media,
            value: PrioridadeTarefa.Media
        },
        {
            label: PrioridadeTarefa.Alta,
            value: PrioridadeTarefa.Alta
        }
    ];

    const validarFormulario = () => {

        let valido = true;

        setErroTitulo("");
        setErroStatus("");
        setErroPrioridade("");

        if (!titulo.trim()) {
            setErroTitulo("O título é obrigatório.");
            valido = false;
        }

        if (!statusSelecionado) {
            setErroStatus("O status é obrigatório.");
            valido = false;
        }

        if (!prioridadeSelecionada) {
            setErroPrioridade("A prioridade é obrigatória.");
            valido = false;
        }

        return valido;
    };

    const salvar = async () => {

        if (salvando) {
            return;
        }

        if (!validarFormulario()) {
            return;
        }

        const dadosTarefa: Tarefa = {
            id: tarefa?.id,
            titulo: titulo.trim(),
            status: statusSelecionado!,
            prioridade: prioridadeSelecionada!
        };

        try {

            setSalvando(true);

            if (tarefa?.id) {

                await TarefasService.atualizar(
                    tarefa.id,
                    dadosTarefa
                );

            } else {

                await TarefasService.cadastrar(
                    dadosTarefa
                );

            }

            onSalvar?.();

        } catch (error) {

            console.error("Erro ao salvar tarefa:", error);

            onErro?.();

        } finally {

            setSalvando(false);

        }
    };

    return (
        <div className="formulario-tarefa">

            {tarefa?.id && (
                <div className="field">

                    <label className="label">
                        ID
                    </label>

                    <div className="control">
                        <InputText
                            value={tarefa.id.toString()}
                            disabled
                            className="formulario-tarefa-campo"
                        />
                    </div>

                </div>
            )}

            <div className="field">

                <label className="label">
                    Título
                </label>

                <div className="control">

                    <InputText
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Digite o título da tarefa"
                        className={`formulario-tarefa-campo ${erroTitulo ? "p-invalid" : ""
                            }`}
                    />

                    {erroTitulo && (
                        <small className="p-error formulario-tarefa-erro">
                            {erroTitulo}
                        </small>
                    )}

                </div>

            </div>

            <div className="field">

                <label className="label">
                    Status
                </label>

                <div className="control">

                    <Dropdown
                        value={statusSelecionado}
                        options={status}
                        onChange={(e) =>
                            setStatusSelecionado(e.value)
                        }
                        placeholder="Selecione o status"
                        className={`formulario-tarefa-campo ${erroStatus ? "p-invalid" : ""
                            }`}
                    />

                    {erroStatus && (
                        <small className="p-error formulario-tarefa-erro">
                            {erroStatus}
                        </small>
                    )}

                </div>

            </div>

            <div className="field">

                <label className="label">
                    Prioridade
                </label>

                <div className="control">

                    <Dropdown
                        value={prioridadeSelecionada}
                        options={prioridades}
                        onChange={(e) =>
                            setPrioridadeSelecionada(e.value)
                        }
                        placeholder="Selecione a prioridade"
                        className={`formulario-tarefa-campo ${erroPrioridade ? "p-invalid" : ""
                            }`}
                    />

                    {erroPrioridade && (
                        <small className="p-error formulario-tarefa-erro">
                            {erroPrioridade}
                        </small>
                    )}

                </div>

            </div>

            <div className="field mt-4 formulario-tarefa-acoes">

                <Button
                    label={
                        salvando
                            ? "Salvando..."
                            : tarefa?.id
                                ? "Atualizar"
                                : "Cadastrar"
                    }
                    icon="pi pi-save"
                    onClick={salvar}
                    loading={salvando}
                    disabled={salvando}
                    className="formulario-tarefa-salvar"
                />

            </div>

        </div>
    );
};