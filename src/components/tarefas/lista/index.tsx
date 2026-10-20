import { useEffect, useRef, useState } from "react";

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";

import { FormularioTarefa } from "../formulario";
import { TarefasService } from "@/src/services/tarefas.service";
import { Tarefa } from "@/src/models/tarefas"

import { StatusTarefa } from "@/src/enums/statusTarefa";
import { PrioridadeTarefa } from "@/src/enums/prioridadeTarefa";

export const ListarTarefas: React.FC = () => {

    const [dialogVisivel, setDialogVisivel] = useState(false);
    const [tarefaSelecionada, setTarefaSelecionada] = useState<Tarefa | null>(null);
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const toast = useRef<Toast>(null);
    const [carregando, setCarregando] = useState(false);
    const [pesquisa, setPesquisa] = useState("");
    const [statusFiltro, setStatusFiltro] =
        useState<StatusTarefa | null>(null);

    const [prioridadeFiltro, setPrioridadeFiltro] =
        useState<PrioridadeTarefa | null>(null);



    const editarTarefa = (tarefa: Tarefa) => {
        setTarefaSelecionada(tarefa);
        setDialogVisivel(true);
    };

    const confirmarExclusao = (tarefa: Tarefa) => {
        confirmDialog({
            message: `Deseja realmente excluir a tarefa "${tarefa.titulo}"?`,
            header: "Confirmar exclusão",
            icon: "pi pi-exclamation-triangle",
            acceptLabel: "Sim",
            rejectLabel: "Não",
            acceptClassName: "p-button-danger",
            accept: () => excluirTarefa(tarefa)
        });
    };

    const excluirTarefa = async (tarefa: Tarefa) => {

        if (!tarefa.id) {
            return;
        }

        try {

            await TarefasService.excluir(tarefa.id);

            await buscarTarefas();

            toast.current?.show({
                severity: "success",
                summary: "Sucesso",
                detail: "Tarefa excluída com sucesso.",
                life: 3000
            });

        } catch (error) {

            console.error("Erro ao excluir tarefa:", error);

            toast.current?.show({
                severity: "error",
                summary: "Erro",
                detail: "Não foi possível excluir a tarefa.",
                life: 5000
            });

        }
    };

    const statusOptions = [
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

    const prioridadeOptions = [
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

    const fecharDialog = () => {
        setDialogVisivel(false);
        setTarefaSelecionada(null);
    };

    const novaTarefa = () => {
        setTarefaSelecionada(null);
        setDialogVisivel(true);
    };

    const acoesTemplate = (tarefa: Tarefa) => {
        return (
            <div className="buttons">

                <Button
                    icon="pi pi-pencil"
                    severity="info"
                    rounded
                    onClick={() => editarTarefa(tarefa)}
                />

                <Button
                    icon="pi pi-trash"
                    severity="danger"
                    rounded
                    onClick={() => confirmarExclusao(tarefa)}
                />

            </div>
        );
    };

    const buscarTarefas = async () => {

    try {

        setCarregando(true);

        const dados = await TarefasService.listar();

        setTarefas(dados);

    } catch {

        toast.current?.show({
            severity: "error",
            summary: "Erro",
            detail: "Não foi possível carregar as tarefas.",
            life: 5000
        });

    } finally {

        setCarregando(false);

    }
};


    const tarefaSalva = async () => {

        const editando = !!tarefaSelecionada?.id;

        await buscarTarefas();

        fecharDialog();

        toast.current?.show({
            severity: "success",
            summary: "Sucesso",
            detail: editando
                ? "Tarefa atualizada com sucesso."
                : "Tarefa cadastrada com sucesso.",
            life: 3000
        });
    };

    const erroAoSalvar = () => {

        toast.current?.show({
            severity: "error",
            summary: "Erro",
            detail: "Não foi possível salvar a tarefa.",
            life: 5000
        });

    };

    useEffect(() => {
        buscarTarefas();
    }, []);

    const limparFiltros = () => {
        setPesquisa("");
        setStatusFiltro(null);
        setPrioridadeFiltro(null);
    };

    const tarefasFiltradas = tarefas.filter((tarefa) => {

        const correspondeTitulo =
            tarefa.titulo
                .toLowerCase()
                .includes(pesquisa.toLowerCase());

        const correspondeStatus =
            !statusFiltro ||
            tarefa.status === statusFiltro;

        const correspondePrioridade =
            !prioridadeFiltro ||
            tarefa.prioridade === prioridadeFiltro;

        return (
            correspondeTitulo &&
            correspondeStatus &&
            correspondePrioridade
        );
    });
    return (
        <div>
            <Toast ref={toast} />
            <ConfirmDialog />
            <div className="content">
                <div className="mb-3 flex justify-content-between align-items-center">
                    <Button
                        label="Nova Tarefa"
                        icon="pi pi-plus"
                        text raised
                        rounded
                        onClick={novaTarefa}
                    />
                </div>

                <div className="tarefas-filtros mb-3">
                    <span className="p-input-icon-left tarefas-pesquisa">
                        <i className="pi pi-search" />

                        <InputText
                            value={pesquisa}
                            onChange={(e) => setPesquisa(e.target.value)}
                            placeholder="Pesquisar por título"
                        />
                    </span>

                    <Dropdown
                        value={statusFiltro}
                        options={statusOptions}
                        onChange={(e) => setStatusFiltro(e.value)}
                        placeholder="Todos os status"
                        showClear
                        className="tarefas-filtro-status"
                    />

                    <Dropdown
                        value={prioridadeFiltro}
                        options={prioridadeOptions}
                        onChange={(e) => setPrioridadeFiltro(e.value)}
                        placeholder="Todas as prioridades"
                        showClear
                        className="tarefas-filtro-prioridade"
                    />

                    <Button
                        label="Limpar"
                        icon="pi pi-filter-slash"
                        text
                        raised
                        outlined
                        onClick={limparFiltros}
                        className="tarefas-limpar"
                    />
                </div>
                <div className="tarefas-tabela-container">
                    <DataTable
                        value={tarefasFiltradas}
                        loading={carregando}
                        emptyMessage="Nenhuma tarefa encontrada."
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 20]}
                        paginatorTemplate="PrevPageLink PageLinks NextPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="{first} a {last} de {totalRecords}"
                        scrollable
                        className="tarefas-tabela"
                    >
                        <Column
                            field="id"
                            header="ID"
                            style={{ minWidth: "70px" }}
                        />

                        <Column
                            field="titulo"
                            header="Título"
                            style={{ minWidth: "220px" }}
                        />

                        <Column
                            field="status"
                            header="Status"
                            style={{ minWidth: "160px" }}
                        />

                        <Column
                            field="prioridade"
                            header="Prioridade"
                            style={{ minWidth: "140px" }}
                        />

                        <Column
                            header="Ações"
                            body={acoesTemplate}
                            style={{ minWidth: "120px" }}
                        />
                    </DataTable>
                </div>
            </div>

            <Dialog
                header={tarefaSelecionada ? "Editar Tarefa" : "Nova Tarefa"}
                visible={dialogVisivel}
                className="tarefa-dialog"
                modal
                onHide={fecharDialog}
            >
                <FormularioTarefa
                    tarefa={tarefaSelecionada ?? undefined}
                    onSalvar={tarefaSalva}
                    onErro={erroAoSalvar}
                />
            </Dialog>

        </div>
    );
};