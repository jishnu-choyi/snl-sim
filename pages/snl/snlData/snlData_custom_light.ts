import { T_ladderData, T_snakeData } from "../snlTypes";

export const getSnakeData = (): T_snakeData[] => {
    return [
        { head: 16, tail: 6 },
        { head: 47, tail: 26 },
        { head: 49, tail: 11 },
        { head: 66, tail: 53 },
        { head: 62, tail: 19 },
        { head: 87, tail: 55 },
        { head: 93, tail: 73 },
        { head: 95, tail: 75 },
    ];
};
export const getLadderData = (): T_ladderData[] => {
    return [
        { start: 3, end: 22 },
        { start: 8, end: 26 },
        { start: 20, end: 38 },
        { start: 27, end: 56 },
        { start: 50, end: 91 },
        { start: 63, end: 81 },
        { start: 70, end: 89 },
        { start: 79, end: 98 },
    ];
};
