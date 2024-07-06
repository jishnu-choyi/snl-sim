import { FormControl, Slider } from "@mui/material";
import styles from "./configSlider.module.scss";
import { clampMax, clampMin, roundForDisplay } from "@/lib/utils";
import { sliderSx } from "@/lib/forms/form-control-utils";
import { PiPlusCircleDuotone } from "react-icons/pi";
import { PiMinusCircleDuotone } from "react-icons/pi";
import { CommonProps } from "@mui/material/OverridableComponent";
import clsx from "clsx";

type ConfigSliderProps = CommonProps & {
    label: string;
    value: number;
    unit: string;
    precision: number;
    min: number;
    max: number;
    disabled?: boolean;
    step: number;
    fieldValue: string;
    onChange: (e: Event, value: number, fieldValue: string) => void;
    marks?: any[];
    showButtons?: boolean;
    hideValue?: boolean;
    size?: "small" | "medium" | "large";
};
export default function ConfigSlider({
    style,
    label,
    value,
    unit,
    precision,
    min,
    max,
    disabled,
    step,
    fieldValue,
    onChange,
    marks,
    showButtons,
    hideValue,
    size,
}: ConfigSliderProps) {
    const increment = (e: Event) => {
        if (disabled) return;
        const newValue = clampMax(value + step, max);
        onChange(e, newValue, fieldValue);
    };
    const decrement = (e: Event) => {
        if (disabled) return;
        const newValue = clampMin(value - step, min);
        onChange(e, newValue, fieldValue);
    };

    return (
        <FormControl className={styles["form-control-slider"]} style={style}>
            <div
                className={clsx([
                    styles["slider-label"],
                    size && styles["size-" + size],
                ])}
            >
                {label}
                {!hideValue && ": "}
                {!hideValue && (
                    <span className={styles["highlight"]}>
                        {roundForDisplay(value, precision)}
                        {unit}
                    </span>
                )}
            </div>
            <div className={styles["slider-con1"]}>
                {showButtons && (
                    <PiMinusCircleDuotone
                        className={clsx([
                            styles["step-icon"],
                            disabled && styles["disabled"],
                        ])}
                        onClick={(e) => decrement(e as unknown as Event)}
                    />
                )}
                <div
                    className={clsx([
                        styles["slider-con2"],
                        size && styles["size-" + size],
                    ])}
                >
                    <Slider
                        size="small"
                        aria-label="Base right"
                        value={roundForDisplay(value, 1)}
                        min={roundForDisplay(min, 1)}
                        max={roundForDisplay(max, 1)}
                        marks={
                            marks || [
                                {
                                    value: roundForDisplay(min, 1),
                                    label: roundForDisplay(min, 1),
                                },
                                {
                                    value: roundForDisplay(max, 1),
                                    label: roundForDisplay(max, 1),
                                },
                            ]
                        }
                        disabled={disabled}
                        step={step}
                        valueLabelDisplay="auto"
                        color="secondary"
                        onChange={(e, value) => {
                            // console.log("on change ", value);
                            return onChange(e, value as number, fieldValue);
                        }}
                        sx={sliderSx}
                    />
                </div>
                {showButtons && (
                    <PiPlusCircleDuotone
                        className={clsx([
                            styles["step-icon"],
                            disabled && styles["disabled"],
                        ])}
                        onClick={(e) => increment(e as unknown as Event)}
                    />
                )}
            </div>
        </FormControl>
    );
}
