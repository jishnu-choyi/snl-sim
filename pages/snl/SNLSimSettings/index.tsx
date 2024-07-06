import { Button, Checkbox, FormControlLabel } from "@mui/material";
import styles from "./simSettings.module.scss";
import commonStyles from "../common.module.scss";
import { checkboxSx } from "@/lib/forms/form-control-utils";
import { useContext } from "react";
import clsx from "clsx";
import ConfigSlider from "@/components/ui/ConfigSlider";
import { getSNLSimInput } from "../snlData/snlData";
import { T_snlSimInput } from "../snlTypes";
import SNLSimContext from "../snlSimContext";
import { startSimulation, stopSimulation } from "../sim-utils";

export default function SNLSimSettings() {
    const simContext = useContext(SNLSimContext);
    const { isSimRunning, input, setInput } = simContext;

    const simInput: T_snlSimInput = input || getSNLSimInput();

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        fieldName: string
    ) => {
        console.log("fieldName ", fieldName, event.target.checked);
        const updatedInput: T_snlSimInput = {
            ...simInput,
            [fieldName]: event.target.checked,
        };
        setInput(updatedInput);
    };
    const resetToDefault = () => {
        setInput(getSNLSimInput());
    };
    const handleRadioBtnChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        fieldName: string
    ) => {
        console.log("fieldName=", fieldName, event.target.value);
    };
    const handleSliderChange = (e: Event, value: number, fieldName: string) => {
        console.log("fieldName", fieldName, value);
        const updatedInput: T_snlSimInput = {
            ...simInput,
            [fieldName]: value,
        };
        setInput(updatedInput);
    };
    const handleStartSim = () => {
        // console.log("start simulation", isSimRunning);
        if (!isSimRunning) startSimulation({ simContext });
        else stopSimulation({ simContext });
    };

    return (
        <>
            <div className={commonStyles.title}>
                <span className={commonStyles["title-text"]}>
                    SNL Sim Settings
                </span>
            </div>
            <div className={styles["form-container"]}>
                <FormControlLabel
                    className={styles["form-control-checkbox"]}
                    label="Needs 6 to start"
                    control={
                        <Checkbox
                            color="secondary"
                            size="small"
                            checked={simInput.needs6ToStart}
                            onChange={(e) =>
                                handleCheckboxChange(e, "needs6ToStart")
                            }
                        />
                    }
                    sx={checkboxSx}
                />
                <FormControlLabel
                    className={styles["form-control-checkbox"]}
                    label="Players can cut on the dark side"
                    control={
                        <Checkbox
                            color="secondary"
                            size="small"
                            checked={simInput.cuttingEnabledOnDarkSide}
                            onChange={(e) =>
                                handleCheckboxChange(
                                    e,
                                    "cuttingEnabledOnDarkSide"
                                )
                            }
                        />
                    }
                    sx={checkboxSx}
                />
                <FormControlLabel
                    className={styles["form-control-checkbox"]}
                    label="Players can cut on the light side"
                    control={
                        <Checkbox
                            color="secondary"
                            size="small"
                            checked={simInput.cuttingEnabledOnLightSide}
                            onChange={(e) =>
                                handleCheckboxChange(
                                    e,
                                    "cuttingEnabledOnLightSide"
                                )
                            }
                        />
                    }
                    sx={checkboxSx}
                />

                <div
                    className={commonStyles["divider-line"]}
                    style={{ marginTop: "8px", marginBottom: "0px" }}
                ></div>
                <ConfigSlider
                    label={`No. of games`}
                    value={simInput.numGames}
                    unit={``}
                    min={1}
                    max={1001}
                    step={100}
                    precision={1}
                    fieldValue="numGames"
                    onChange={handleSliderChange}
                    showButtons={true}
                    hideValue={false}
                    size="medium"
                />
                <ConfigSlider
                    label={`Max throws per game`}
                    value={simInput.maxThrowsPerGame}
                    unit={``}
                    min={1}
                    max={1001}
                    step={100}
                    precision={1}
                    fieldValue="maxThrowsPerGame"
                    onChange={handleSliderChange}
                    showButtons={true}
                    hideValue={false}
                    size="medium"
                />

                <div className={commonStyles["btn-container"]}>
                    <Button
                        className={clsx([commonStyles["reset-btn"]])}
                        onClick={resetToDefault}
                    >
                        <span className={commonStyles["btn-text"]}>
                            Reset to default
                        </span>
                    </Button>
                    <Button
                        className={clsx([commonStyles["start-btn"]])}
                        onClick={handleStartSim}
                    >
                        {isSimRunning && (
                            <span className={commonStyles["btn-text"]}>
                                Stop sim
                            </span>
                        )}
                        {!isSimRunning && (
                            <span className={commonStyles["btn-text"]}>
                                Start sim
                            </span>
                        )}
                    </Button>
                </div>
            </div>
        </>
    );
}
