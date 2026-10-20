import { ReactNode, useState } from "react";

import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";

import { useTheme } from "@/src/hooks/useTheme";

import { Menu } from "./menu";
import { Alert } from "../menssagens";

interface LayoutProps {
    titulo?: string;
    children?: ReactNode;
    mensagens?: Array<Alert>;
}

export const Layout: React.FC<LayoutProps> = (props) => {

    const [visibleLeft, setVisibleLeft] = useState(false);

    const { tema, alternarTema } = useTheme();

    return (
        <section className="app-layout">

            <Sidebar
                visible={visibleLeft}
                position="left"
                onHide={() => setVisibleLeft(false)}
            >
                <Menu />
            </Sidebar>

            <div className="app-header">

                <Button
                    icon="pi pi-bars"
                    onClick={() => setVisibleLeft(true)}
                    aria-label="Abrir menu"
                />

                <Button
                    icon={
                        tema === "dark"
                            ? "pi pi-sun"
                            : "pi pi-moon"
                    }
                    rounded
                    text
                    onClick={alternarTema}
                    tooltip={
                        tema === "dark"
                            ? "Ativar modo claro"
                            : "Ativar modo escuro"
                    }
                    tooltipOptions={{
                        position: "left"
                    }}
                    aria-label="Alternar tema"
                />

            </div>

            <div className="card app-content">

                <header className="card-header">
                    <p className="card-header-title">
                        {props.titulo}
                    </p>
                </header>

                <div className="card-content">
                    {props.children}
                </div>

            </div>

        </section>
    );
};