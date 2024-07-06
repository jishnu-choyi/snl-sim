import { ThemeProvider, createTheme } from "@mui/material";
import styles from "./layout.module.scss";
import { Inter, DM_Sans, League_Spartan } from "next/font/google";
import Head from "next/head";
import clsx from "clsx";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });
const dmSans = DM_Sans({ weight: "700", subsets: ["latin"] });
const leagueSpartan = League_Spartan({ weight: "600", subsets: ["latin-ext"] });

//Create your Own theme:
const iconTheme = createTheme({
    palette: {
        primary: {
            main: "#d6e0ed", //gray
        },
        secondary: {
            main: "#ffaa1b", //gold
            dark: "#ffaa1b", //gold
        },
        info: {
            main: "#9e5aff", //purple
        },
        warning: {
            light: "#ff40bd", //pink
            main: "#ff40bd", //pink
            dark: "#ff40bd", //pink
        },
        error: {
            light: "#ff40bd", //pink
            main: "#ff40bd", //pink
            dark: "#ff40bd", //pink
        },
    },
});

type LayoutProps = React.ButtonHTMLAttributes<HTMLElement> & {
    description: string;
    contentTitle?: string;
    showBack?: boolean;
    isTitleEditable?: boolean;
    hideCenterHeader?: boolean;
};

function Layout({
    className,
    children,
    title,
    description,
    contentTitle,
    isTitleEditable,
}: LayoutProps) {
    return (
        <ThemeProvider theme={iconTheme}>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon2.ico" />
            </Head>
            <main className={clsx([styles.main, className])}>
                <div>{contentTitle}</div>
                <div className={styles["content"]}>{children}</div>
            </main>
        </ThemeProvider>
    );
}

export default Layout;
