import Layout from "@/components/ui/Layout";
import WaitModal from "@/components/ui/WaitModal";
import WaitContext from "@/contexts/wait";
import { useContext, useEffect } from "react";
import styles from "./snl.module.scss";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import {
    initialiseCanvasBehaviour,
    initializeEditor,
} from "./snl-canvas-utils";
import SNLSimSettings from "./SNLSimSettings";
import SNLSimReport from "./SNLSimReport";
import { createGameBoards } from "./create-game-board";
import { getSNLSimInput } from "./snlData/snlData";
import SNLSimContext, { SNLSimProvider } from "./snlSimContext";

export default function SNLPage() {
    const { isPageLoading, isWaiting } = useContext(WaitContext);

    const title = "SNL simulation";
    const description = "";

    return (
        <>
            {isPageLoading && (
                <WaitModal
                    showSpinner
                    msg="Loading page. This could take a few seconds..."
                />
            )}
            {isWaiting && <WaitModal showSpinner msg="Running sim..." />}
            <Layout
                title={title}
                description={description}
                contentTitle={title}
                isTitleEditable={false}
                hideCenterHeader={false}
            >
                <SNLSimProvider>
                    <SimContent />
                </SNLSimProvider>
            </Layout>
        </>
    );
}

function SimContent() {
    const simContext = useContext(SNLSimContext);
    const { gamePrep, input } = simContext;
    const defaultSimInput = getSNLSimInput();
    const snlSimInput = input || defaultSimInput;

    /*---------------------fabricjs functions---------------* */
    const { editor, onReady, selectedObjects } = useFabricJSEditor();
    const canvas = editor?.canvas;
    useEffect(() => {
        // console.log("useEffect 1");
        initializeEditor(editor);
    }, [editor]);
    useEffect(() => {
        if (!canvas) return;
        initialiseCanvasBehaviour(canvas);
        if (!gamePrep) {
            createGameBoards({
                canvas,
                snlSimInput,
                simContext,
            });
        }
    }, [canvas, snlSimInput, gamePrep, simContext]);

    return (
        <div className={styles["container"]}>
            <div className={styles["settings-container"]}>
                <SNLSimSettings />
            </div>
            <div className={styles["canvas-container"]}>
                <FabricJSCanvas
                    className={styles["snl-canvas"]}
                    onReady={onReady}
                />
            </div>
            <div className={styles["report-container"]}>
                <SNLSimReport />
            </div>
        </div>
    );
}
