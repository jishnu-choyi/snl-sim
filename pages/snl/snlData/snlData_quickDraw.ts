import { T_ladderData, T_snakeData } from "../snlTypes";

export const getSnakeData = (): T_snakeData[] => {
    return [
        {
            head: 98,
            tail: 78,
        },
        {
            head: 95,
            tail: 75,
        },
        {
            head: 93,
            tail: 73,
        },
        {
            head: 87,
            tail: 24,
        },
        {
            head: 62,
            tail: 19,
        },
        {
            head: 64,
            tail: 60,
        },
        {
            head: 56,
            tail: 54,
        },
        {
            head: 49,
            tail: 11,
        },
        {
            head: 47,
            tail: 26,
        },
    ];
};
export const getLadderData = (): T_ladderData[] => {
    return [
        {
            start: 1,
            end: 38,
        },
        {
            start: 4,
            end: 14,
        },
        {
            start: 9,
            end: 31,
        },
        {
            start: 20,
            end: 42,
        },
        {
            start: 28,
            end: 84,
        },
        {
            start: 36,
            end: 44,
        },
        {
            start: 51,
            end: 67,
        },
        {
            start: 71,
            end: 91,
        },
        {
            start: 80,
            end: 100,
        },
    ];
};
