import { T_clamp } from "@/lib/types/types2d";

export const DEG2RAD = Math.PI / 180;
export const RAD2DEG = 180 / Math.PI;

export const clampCheck = (v: number, clamp: T_clamp) => {
    const tol = clamp.tol || 0;
    return v > clamp.max - tol ? 1 : v < clamp.min + tol ? -1 : 0;
};
export const clamp = (v: number, min: number, max: number) => {
    return v > max ? max : v < min ? min : v;
};
export const clampMin = (v: number, min: number) => {
    return v < min ? min : v;
};
export const clampMax = (v: number, max: number) => {
    return v > max ? max : v;
};

export const roundForDisplay = (number: number, decimalPoints = 2) => {
    const multiplier = Math.pow(10, decimalPoints);
    // console.log("rounded=", Math.round(number * multiplier) / multiplier);
    return Math.round(number * multiplier) / multiplier;
};
export const rnd4 = (number: number) => {
    return roundForDisplay(number, 4);
};
export const rnd2 = (number: number) => {
    return roundForDisplay(number, 2);
};
export const rnd1 = (number: number) => {
    return roundForDisplay(number, 1);
};
export const rnd0 = (number: number) => {
    return Math.round(number);
};
