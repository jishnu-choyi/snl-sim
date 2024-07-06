import {
    E_gameSide,
    T_ladderData,
    T_playerData,
    T_snakeData,
    T_snlSimInput,
} from "../snlTypes";
import * as ratna from "./snlData_Ratnas_Magnetic";
import * as fcry from "./snlData_FirstCry_carpet";
import * as fsk from "./snlData_funskool";
import * as qd from "./snlData_quickDraw";

const snakeData_light: T_snakeData[] = [...ratna.getSnakeData()];
const ladderData_light: T_ladderData[] = [...ratna.getLadderData()];
const snakeData_dark: T_snakeData[] = [...fsk.getSnakeData()];
const ladderData_dark: T_ladderData[] = [...fsk.getLadderData()];

const playerData: T_playerData[] = [
    {
        mode: E_gameSide.dark,
    },
    {
        mode: E_gameSide.light,
    },
];

export const getSNLSimInput = (): T_snlSimInput => {
    return {
        numGames: 100,
        maxThrowsPerGame: 1000,
        needs6ToStart: true,
        lightSideData: {
            side: E_gameSide.light,
            snakes: snakeData_light,
            ladders: ladderData_light,
        },
        darkSideData: {
            side: E_gameSide.dark,
            snakes: snakeData_dark,
            ladders: ladderData_dark,
        },
        cuttingEnabledOnDarkSide: true,
        cuttingEnabledOnLightSide: false,
        playerData,
    };
};
