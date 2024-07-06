import { T_ladderData, T_snakeData } from "../snlTypes";

export const getSnakeData = (): T_snakeData[] => {
    return [
        {
            head: 97,
            tail: 44,
        },
        {
            head: 89,
            tail: 70,
        },
        {
            head: 92,
            tail: 58,
        },
        {
            head: 75,
            tail: 8,
        },
        {
            head: 42,
            tail: 16,
        },
        {
            head: 30,
            tail: 11,
        },
        {
            head: 26,
            tail: 6,
        },
    ];
};
export const getLadderData = (): T_ladderData[] => {
    return [
        {
            start: 2,
            end: 55,
        },
        {
            start: 13,
            end: 27,
        },
        {
            start: 31,
            end: 67,
        },
        {
            start: 38,
            end: 65,
        },
        {
            start: 60,
            end: 62,
        },
        {
            start: 69,
            end: 87,
        },
        {
            start: 76,
            end: 95,
        },
    ];
};
