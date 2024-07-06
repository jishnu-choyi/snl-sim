import styles from "./simReport.module.scss";
import commonStyles from "../common.module.scss";
import { useContext } from "react";
import { getSNLSimInput } from "../snlData/snlData";
import { E_gameSide, T_snlSimInput, T_snlSimOutput } from "../snlTypes";
import { rnd4 } from "@/lib/utils";
import SNLSimContext from "../snlSimContext";

export default function SNLSimReport() {
    const simContext = useContext(SNLSimContext);
    const { output, input } = simContext;
    const simInput: T_snlSimInput = input || getSNLSimInput();

    const simOutput: T_snlSimOutput = output || {
        lightSideWins: 0,
        darkSideWins: 0,

        pLightWin: 0,
        pLightLast: 0,
        avgLightSideThrowsToFirstWin: 0,
        avgDarkSideThrowsToFirstWin: 0,
        avgDarkSideScore: 0,
        avgLightSideScore: 0,
        numGamesPlayed: 0,
        numGamesWithWin: 0,
        playerResults: [],
    };

    return (
        <>
            <div className={commonStyles.title}>
                <span className={commonStyles["title-text"]}>Game stats</span>
            </div>
            <div className={styles.container}>
                <ResultRow
                    title="No. of games played="
                    value={rnd4(simOutput.numGamesPlayed)}
                />
                <ResultRow
                    title="No. of games with win="
                    value={rnd4(simOutput.numGamesWithWin)}
                />
                <ResultRow
                    title="P(Light side win)="
                    value={rnd4(
                        simOutput.lightSideWins / simOutput.numGamesWithWin || 0
                    )}
                />
                <ResultRow
                    title="P(Dark side win)="
                    value={rnd4(
                        simOutput.darkSideWins / simOutput.numGamesWithWin || 0
                    )}
                />
                <div
                    className={commonStyles["divider-line"]}
                    style={{ marginTop: "8px", marginBottom: "0px" }}
                ></div>

                <ResultRow
                    title="Avg throws to win for light:"
                    value={simOutput.avgLightSideThrowsToFirstWin}
                />
                <ResultRow
                    title="Avg throws to win for dark:"
                    value={simOutput.avgDarkSideThrowsToFirstWin}
                />

                {/* <div
                    className={commonStyles["divider-line"]}
                    style={{ marginTop: "8px", marginBottom: "0px" }}
                ></div>

                <ResultRow
                    title="Avg light-side score:"
                    value={simOutput.avgLightSideScore}
                />
                <ResultRow
                    title="Avg dark-side score:"
                    value={simOutput.avgDarkSideScore}
                /> */}

                <div
                    className={commonStyles["divider-line"]}
                    style={{ marginTop: "8px", marginBottom: "0px" }}
                ></div>

                <ResultRow
                    title="Total no. of players:"
                    value={simInput.playerData.length}
                />
                <ResultRow
                    title="Light side players:"
                    value={
                        simInput.playerData.filter(
                            (x) => x.mode === E_gameSide.light
                        ).length
                    }
                />
                <ResultRow
                    title="Dark side players:"
                    value={
                        simInput.playerData.filter(
                            (x) => x.mode === E_gameSide.dark
                        ).length
                    }
                />
                <div
                    className={commonStyles["divider-line"]}
                    style={{ marginTop: "8px", marginBottom: "0px" }}
                ></div>
                <ResultRow
                    title="No. of light-side snakes:"
                    value={simInput.lightSideData.snakes.length}
                />
                <ResultRow
                    title="No. of light-side ladders:"
                    value={simInput.lightSideData.ladders.length}
                />
                <div
                    className={commonStyles["divider-line"]}
                    style={{ marginTop: "8px", marginBottom: "0px" }}
                ></div>
                <ResultRow
                    title="No. of dark-side snakes:"
                    value={simInput.darkSideData.snakes.length}
                />
                <ResultRow
                    title="No. of dark-side ladders:"
                    value={simInput.darkSideData.ladders.length}
                />
            </div>
        </>
    );
}

type ResultRowProps = {
    title: string;
    value: number;
};
function ResultRow({ title, value }: ResultRowProps) {
    return (
        <div className={styles.resultRow}>
            <div className={styles.resultRowField}>{title}</div>
            <div className={styles.resultRowValue}>{value}</div>
        </div>
    );
}
