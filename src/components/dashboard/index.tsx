import { useEffect, useState } from "react";

import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { Button } from "primereact/button";

import { Layout } from "../common/Layout";
import { Indicadores } from "./indicadores";
import { Graficos } from "./graficos";
import { Resumo } from "./resumo";

import { Tarefa } from "@/src/models/tarefas";
import { TarefasService } from "@/src/services/tarefas.service";

export const Dashboard: React.FC = () => {

    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    const carregarTarefas = async () => {

        try {

            setCarregando(true);
            setErro("");

            const dados = await TarefasService.listar();

            setTarefas(dados);

        } catch {

            setErro(
                "Não foi possível carregar os dados do Dashboard."
            );

        } finally {

            setCarregando(false);

        }
    };

    useEffect(() => {

        let componenteAtivo = true;

        TarefasService.listar()
            .then((dados) => {

                if (componenteAtivo) {
                    setTarefas(dados);
                }

            })
            .catch(() => {

                if (componenteAtivo) {
                    setErro(
                        "Não foi possível carregar os dados do Dashboard."
                    );
                }

            })
            .finally(() => {

                if (componenteAtivo) {
                    setCarregando(false);
                }

            });

        return () => {
            componenteAtivo = false;
        };

    }, []);

    return (
        <Layout titulo="Dashboard">

            {carregando && (
                <div
                    className="is-flex is-flex-direction-column is-align-items-center is-justify-content-center"
                    style={{ minHeight: "400px" }}
                >
                    <ProgressSpinner />

                    <p className="mt-4">
                        Carregando dados...
                    </p>
                </div>
            )}

            {!carregando && erro && (
                <div className="has-text-centered">

                    <Message
                        severity="error"
                        text={erro}
                    />

                    <div className="mt-4">

                        <Button
                            label="Tentar novamente"
                            icon="pi pi-refresh"
                            severity="danger"
                            outlined
                            onClick={carregarTarefas}
                        />

                    </div>

                </div>
            )}

            {!carregando && !erro && (
                <>
                    <Indicadores tarefas={tarefas} />

                    <Graficos tarefas={tarefas} />

                    <Resumo tarefas={tarefas} />
                </>
            )}

        </Layout>
    );
};