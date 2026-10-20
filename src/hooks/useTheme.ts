import { useEffect, useState } from "react";

export type Tema = "light" | "dark";

const obterTemaInicial = (): Tema => {

    if (typeof window === "undefined") {
        return "dark";
    }

    const temaSalvo = localStorage.getItem("tema");

    if (temaSalvo === "dark" || temaSalvo === "light") {
        return temaSalvo;
    }

    const prefereEscuro = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    return prefereEscuro
        ? "dark"
        : "light";
};

export const useTheme = () => {

    const [tema, setTema] = useState<Tema>(obterTemaInicial);

    useEffect(() => {

        localStorage.setItem("tema", tema);

        document.documentElement.setAttribute(
            "data-theme",
            tema
        );

        const themeLink = document.getElementById(
            "theme-link"
        ) as HTMLLinkElement | null;

        if (themeLink) {
            themeLink.href =
                tema === "dark"
                    ? "/themes/vela-blue/theme.css"
                    : "/themes/saga-blue/theme.css";
        }

    }, [tema]);

    const alternarTema = () => {

        setTema((temaAtual) =>
            temaAtual === "dark"
                ? "light"
                : "dark"
        );

    };

    return {
        tema,
        alternarTema
    };
};