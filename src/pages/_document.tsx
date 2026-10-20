import {
    Html,
    Head,
    Main,
    NextScript
} from "next/document";

export default function Document() {
    return (
        <Html>
            <Head>
                {/* eslint-disable-next-line @next/next/no-css-tags */}
                <link
                    id="theme-link"
                    rel="stylesheet"
                    href="/themes/vela-blue/theme.css"
                />
            </Head>

            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}