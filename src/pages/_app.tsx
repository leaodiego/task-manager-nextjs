import type { AppProps } from "next/app";

import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import "bulma/css/bulma.css";
import "@/src/styles/theme.css";

export default function App({
    Component,
    pageProps
}: AppProps) {

    return (
        <Component {...pageProps} />
    );
}