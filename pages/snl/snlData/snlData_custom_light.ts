import { T_ladderData, T_snakeData } from "../snlTypes";

//-----Version 2--------------------------------------
export const getSnakeData = (): T_snakeData[] => {
    return [
        { head: 38, tail: 8 },
        { head: 47, tail: 26 },
        { head: 49, tail: 11 },
        { head: 66, tail: 53 },
        { head: 75, tail: 19 },
        { head: 86, tail: 55 },
        { head: 93, tail: 73 },
        { head: 96, tail: 84 },
    ];
};
export const getLadderData = (): T_ladderData[] => {
    return [
        { start: 3, end: 35 },
        { start: 12, end: 26 },
        { start: 28, end: 44 },
        { start: 27, end: 57 },
        { start: 52, end: 91 },
        { start: 60, end: 82 },
        { start: 70, end: 88 },
        { start: 81, end: 97 },
    ];
};

// //-----Version 1--------------------------------------
// export const getSnakeData = (): T_snakeData[] => {
//     return [
//         { head: 16, tail: 6 },
//         { head: 47, tail: 26 },
//         { head: 49, tail: 11 },
//         { head: 66, tail: 53 },
//         { head: 62, tail: 19 },
//         { head: 87, tail: 55 },
//         { head: 93, tail: 73 },
//         { head: 95, tail: 75 },
//     ];
// };
// export const getLadderData = (): T_ladderData[] => {
//     return [
//         { start: 3, end: 22 },
//         { start: 8, end: 26 },
//         { start: 20, end: 38 },
//         { start: 27, end: 56 },
//         { start: 50, end: 91 },
//         { start: 63, end: 81 },
//         { start: 70, end: 89 },
//         { start: 79, end: 98 },
//     ];
// };
