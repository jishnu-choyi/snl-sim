import { T_ladderData, T_snakeData } from "../snlTypes";

//--------Version 2------------------------------------------
export const getSnakeData = (): T_snakeData[] => {
    return [
        { head: 20, tail: 4 },
        { head: 31, tail: 9 },
        { head: 38, tail: 0 },
        { head: 47, tail: 10 },
        { head: 56, tail: 17 },
        { head: 62, tail: 18 },
        { head: 86, tail: 28 },
        { head: 96, tail: 58 },
        { head: 97, tail: 42 },
        { head: 99, tail: 21 },
    ];
};
export const getLadderData = (): T_ladderData[] => {
    return [
        { start: 8, end: 30 },
        { start: 2, end: 35 },
        { start: 20, end: 52 },
        { start: 36, end: 85 },
        { start: 37, end: 65 },
        { start: 51, end: 76 },
        { start: 75, end: 92 },
        { start: 11, end: 93 },
        { start: 87, end: 95 },
        { start: 80, end: 98 },
    ];
};

// //--------Version 1------------------------------------------
// export const getSnakeData = (): T_snakeData[] => {
//     return [
//         { head: 14, tail: 4 },
//         { head: 31, tail: 9 },
//         { head: 38, tail: 0 },
//         { head: 47, tail: 11 },
//         { head: 57, tail: 17 },
//         { head: 62, tail: 18 },
//         { head: 87, tail: 24 },
//         { head: 95, tail: 56 },
//         { head: 97, tail: 42 },
//         { head: 99, tail: 21 },
//     ];
// };
// export const getLadderData = (): T_ladderData[] => {
//     return [
//         { start: 2, end: 23 },
//         { start: 7, end: 29 },
//         { start: 15, end: 44 },
//         { start: 28, end: 84 },
//         { start: 36, end: 67 },
//         { start: 51, end: 72 },
//         { start: 65, end: 96 },
//         { start: 10, end: 93 },
//         { start: 87, end: 94 },
//         { start: 79, end: 98 },
//     ];
// };
