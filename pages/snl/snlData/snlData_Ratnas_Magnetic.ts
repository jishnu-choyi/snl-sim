import { T_ladderData, T_snakeData } from "../snlTypes";

export const getSnakeData = (): T_snakeData[] => {
    return [
        { head: 97, tail: 14 },
        { head: 74, tail: 35 },
        { head: 63, tail: 17 },
        { head: 58, tail: 40 },
        { head: 52, tail: 11 },
        { head: 47, tail: 4 },
        { head: 37, tail: 7 },
    ];
};
export const getLadderData = (): T_ladderData[] => {
    return [
        {
            start: 8,
            end: 26,
        },
        {
            start: 19,
            end: 38,
        },
        {
            start: 21,
            end: 82,
        },
        {
            start: 28,
            end: 53,
        },
        {
            start: 36,
            end: 57,
        },
        {
            start: 43,
            end: 77,
        },
        {
            start: 51,
            end: 91,
        },
        {
            start: 54,
            end: 88,
        },
        {
            start: 61,
            end: 99,
        },
        {
            start: 62,
            end: 96,
        },
        {
            start: 66,
            end: 87,
        },
    ];
};
