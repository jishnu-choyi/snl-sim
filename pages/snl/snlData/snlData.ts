import {
    E_gameSide,
    T_ladderData,
    T_playerData,
    T_snakeData,
    T_snlSimInput,
} from "../snlTypes";
import * as ratna from "./commercial/snlData_Ratnas_Magnetic";
import * as fcry from "./commercial/snlData_FirstCry_carpet";
import * as fsk from "./commercial/snlData_funskool";
import * as qd from "./commercial/snlData_quickDraw";
import * as customLight from "./snlData_custom_light";
import * as customDark from "./snlData_custom_dark";

const snakeData_light: T_snakeData[] = [...ratna.getSnakeData()];
const ladderData_light: T_ladderData[] = [...ratna.getLadderData()];
const snakeData_dark: T_snakeData[] = [...fcry.getSnakeData()];
const ladderData_dark: T_ladderData[] = [...fcry.getLadderData()];

const playerData: T_playerData[] = [
    {
        id: "2",
        mode: E_gameSide.dark,
    },
    {
        id: "4",
        mode: E_gameSide.dark,
    },
    {
        id: "1",
        mode: E_gameSide.light,
    },
    {
        id: "3",
        mode: E_gameSide.light,
    },
];

export const getSNLSimInput = (): T_snlSimInput => {
    return {
        numGames: 500,
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
