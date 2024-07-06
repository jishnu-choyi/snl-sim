import { MenuItem } from "@mui/material";
import { T_option } from "../types/types";

export const autoCompleteSx = {
    "& .MuiOutlinedInput-root": {
        fontSize: 14,
        fontWeight: 300,
    },
};

export const dropDownSx = {
    "& .MuiSelect-select": {
        fontSize: 14,
        fontWeight: 300,
    },
};

export const checkboxSx = {
    "& .MuiFormControlLabel-label": {
        fontSize: 14,
        fontWeight: 300,
    },
};

export const radioGroupSx = {
    "& .MuiFormControlLabel-label": {
        color: "#3e3e3e",
        fontSize: 14,
        fontWeight: 300,
    },
    "& .MuiFormControlLabel-labelPlacementEnd": {
        marginLeft: 0,
    },
};
export const radioSx = {
    // color: "red",
    "&.Mui-checked": {
        // color: "blue",
        color: "#ffaa1b",
    },
    "& .MuiSvgIcon-root": {
        fontSize: 16,
        fontWeight: 300,
    },
};

export const sliderSx = {
    "& .MuiSlider-markLabel": {
        fontSize: "0.6rem",
        fontWeight: 200,
        color: "#3e3e3e",
        textAlign: "center",
        background: "white",
    },
    "& .MuiSlider-mark": {
        height: "12px",
        width: "1px",
        background: "#ffaa1b",
        fontSize: "0.6rem",
    },
    "& .MuiSlider-markActive": {
        height: "12px",
        background: "#ffaa1b",
    },
};

export const renderMenuItems = (options: T_option[]) => {
    return options.map((option) => {
        if (!option.icon && !option.label) {
            return (
                <MenuItem
                    key={option.id}
                    value={option.id}
                    style={{ fontSize: "14px", fontWeight: 300 }}
                >
                    {option.label}
                </MenuItem>
            );
        } else {
            return (
                <MenuItem
                    key={option.id}
                    value={option.id}
                    style={{
                        fontSize: "14px",
                        fontWeight: 300,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        paddingTop: "8px",
                        paddingBottom: "8px",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {option.icon}
                        <div
                            style={{
                                marginLeft: "8px",
                                fontWeight: 400,
                                color: "#3e3e3e",
                            }}
                        >
                            {option.label}
                        </div>
                    </div>
                    {option.msg && (
                        <div style={{ fontSize: "13px", marginTop: "4px" }}>
                            {option.msg}
                        </div>
                    )}
                </MenuItem>
            );
        }
    });
};
