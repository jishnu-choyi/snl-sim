import { SNLPlayer } from "./Player";

export enum E_gameSide {
    "dark" = "dark",
    "light" = "light",
}
export enum E_gameVerdict {
    "win" = "win",
    "loss" = "loss",
    "tie" = "tie",
    "forfeit" = "forfeit",
}

export type T_snakeData = {
    head: number;
    tail: number;
    name?: string;
};
export type T_ladderData = {
    start: number;
    end: number;
    name?: string;
};
export type T_playerData = {
    mode: E_gameSide;
};
export type T_boardData = {
    side: E_gameSide;
    snakes: T_snakeData[];
    ladders: T_ladderData[];
};

export type T_snlSimInput = {
    numGames: number;
    maxThrowsPerGame: number;
    needs6ToStart: boolean;
    cuttingEnabledOnDarkSide: boolean;
    cuttingEnabledOnLightSide: boolean;

    lightSideData: T_boardData;
    darkSideData: T_boardData;
    playerData: T_playerData[];
};

export type T_snlPlayerResult = {
    numThrowsToWin: number;
    numThrowsBeforeStart: number;
    snakeBiteCounts: number[];
    ladderClimbCounts: number[];
    verdict: E_gameVerdict;
};
export type T_snlSimOutput = {
    numGamesPlayed: number;
    numGamesWithWin: number;
    lightSideWins: number;
    darkSideWins: number;

    pLightWin: number;
    pLightLast: number;
    avgLightSideThrowsToFirstWin: number;
    avgDarkSideThrowsToFirstWin: number;
    avgLightSideScore: number;
    avgDarkSideScore: number;
    playerResults: T_snlPlayerResult[];
};
export type T_gamePrepBoard = {
    group: fabric.Group;
    boardData: T_boardData;
};
export type T_gamePrep = {
    lightBoard: T_gamePrepBoard;
    darkBoard: T_gamePrepBoard;
    players: SNLPlayer[];
};
