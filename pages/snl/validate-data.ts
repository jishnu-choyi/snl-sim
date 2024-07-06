import { T_clamp } from "@/lib/types/types2d";
import {
    T_boardData,
    T_ladderData,
    T_snakeData,
    T_snlSimInput,
} from "./snlTypes";
import { clampCheck } from "@/lib/utils";

export const checkSimInputValidity = (snlSimInput: T_snlSimInput) => {
    let lightBoardCheck = checkBoardDataValidity(snlSimInput.lightSideData);
    let darkBoardCheck = checkBoardDataValidity(snlSimInput.darkSideData);
    return {
        valid: lightBoardCheck.valid && darkBoardCheck.valid,
        msgs: [...lightBoardCheck.msgs, ...darkBoardCheck.msgs],
    };
};

const checkBoardDataValidity = (boardData: T_boardData) => {
    const { side, snakes, ladders } = boardData;
    let snakesValid = true;
    const checkMsgs: string[] = [];
    for (let i = 0; i < snakes.length; i++) {
        const check = isSnakeValid(snakes[i], i, boardData);
        if (!check.valid) {
            console.warn(check.msg);
            checkMsgs.push(check.msg);
        }
        snakesValid = snakesValid && check.valid;
    }

    let laddersValid = true;
    for (let i = 0; i < ladders.length; i++) {
        const check = isLadderValid(ladders[i], i, boardData);
        if (!check.valid) {
            console.warn(check.msg);
            checkMsgs.push(check.msg);
        }
        laddersValid = laddersValid && check.valid;
    }

    const ladderStartNumbers = ladders.map((ladder) => ladder.start);
    const ladderEndNumbers = ladders.map((ladder) => ladder.end);
    const snakeTailNumbers = snakes.map((snake) => snake.tail);
    const snakeHeadNumbers = snakes.map((snake) => snake.head);

    //snake tails cannot end where ladders start
    let validSnakeTail = true;
    for (let i = 0; i < snakeTailNumbers.length; i++) {
        let checkResult = true;
        if (ladderStartNumbers.includes(snakeTailNumbers[i])) {
            checkResult = false;
            const msg = `Snake tail cannot be where ladders start @tailNumber[${i}] = ${snakeTailNumbers[i]} for board:${side}`;
            console.warn(msg);
            checkMsgs.push(msg);
        }
        validSnakeTail = validSnakeTail && checkResult;
    }

    //Ladder cannot end where another ladder starts
    let validLadderEnd = true;
    for (let i = 0; i < ladderEndNumbers.length; i++) {
        let checkResult = true;
        if (ladderStartNumbers.includes(ladderEndNumbers[i])) {
            checkResult = false;
            const msg = `Ladder cannot end where another ladder starts @ladderEndNumber[${i}] = ${ladderEndNumbers[i]} for board:${side}`;
            console.warn(msg);
            checkMsgs.push(msg);
        }
        validLadderEnd = validLadderEnd && checkResult;
    }

    //snake heads cannot end where ladders end
    let validSnakeHead = true;
    for (let i = 0; i < snakeHeadNumbers.length; i++) {
        let checkResult = true;
        if (ladderEndNumbers.includes(snakeHeadNumbers[i])) {
            checkResult = false;
            const msg = `Snake head cannot be where ladders end @headNumber[${i}] = ${snakeHeadNumbers[i]} for board:${side}`;
            console.warn(msg);
            checkMsgs.push(msg);
        }
        validSnakeHead = validSnakeHead && checkResult;
    }

    //snake heads cannot end where snakes end
    let validSnakeHead2 = true;
    for (let i = 0; i < snakeHeadNumbers.length; i++) {
        let checkResult = true;
        if (snakeTailNumbers.includes(snakeHeadNumbers[i])) {
            checkResult = false;
            const msg = `Snake head cannot be where another snake ends @headNumber[${i}] = ${snakeHeadNumbers[i]} for board:${side}`;
            console.warn(msg);
            checkMsgs.push(msg);
        }
        validSnakeHead2 = validSnakeHead2 && checkResult;
    }

    return {
        snakesValid,
        laddersValid,
        validSnakeHead,
        validSnakeHead2,
        validSnakeTail,
        validLadderEnd,
        valid:
            snakesValid &&
            laddersValid &&
            validSnakeHead &&
            validSnakeHead2 &&
            validSnakeTail &&
            validLadderEnd,
        msgs: checkMsgs,
    };
};

export const isSnakeValid = (
    snakeData: T_snakeData,
    index: number,
    boardData: T_boardData
) => {
    const c1 = snakeData.head > snakeData.tail;
    let msg = "";
    if (!c1) {
        msg = `snakeData.head must be > snakeData.tail @${index} for board:${boardData.side}`;
        return { valid: false, msg };
    }
    const startBounds: T_clamp = { max: 99, min: 2 };
    const c2 = clampCheck(snakeData.head, startBounds) === 0;
    if (!c2) {
        msg = `snakeData.start must be between [${startBounds.min},${startBounds.max}] @${index} for board:${boardData.side}`;
        return { valid: false, msg };
    }
    const endBounds: T_clamp = { max: 98, min: 0 };
    const c3 = clampCheck(snakeData.tail, endBounds) === 0;
    if (!c3) {
        msg = `snakeData.end must be between [${endBounds.min},${endBounds.max}] @${index} for board:${boardData.side}`;
        return { valid: false, msg };
    }
    return { valid: c1 && c2 && c3, msg };
};
export const isLadderValid = (
    ladderData: T_ladderData,
    index: number,
    boardData: T_boardData
) => {
    const c1 = ladderData.start < ladderData.end;
    let msg = "";
    if (!c1) {
        msg = `ladderData.start must be < ladderData.end @${index} for board:${boardData.side}`;
        return { valid: false, msg };
    }
    const startBounds: T_clamp = { max: 97, min: 1 };
    const c2 = clampCheck(ladderData.start, startBounds) === 0;
    if (!c2) {
        msg = `ladderData.start must be between [${startBounds.min},${startBounds.max}] @${index} for board:${boardData.side}`;
        return { valid: false, msg };
    }
    const endBounds: T_clamp = { max: 100, min: 2 };
    const c3 = clampCheck(ladderData.end, endBounds) === 0;
    if (!c3) {
        msg = `ladderData.end must be between [${endBounds.min},${endBounds.max}] @${index} for board:${boardData.side}`;
        return { valid: false, msg };
    }
    return { valid: c1 && c2 && c3, msg };
};
