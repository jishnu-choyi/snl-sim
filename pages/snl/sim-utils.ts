import { rnd1, rnd4 } from "@/lib/utils";
import { getSNLSimInput } from "./snlData/snlData";
import { T_snlSimContext } from "./snlSimContext";
import { T_boardData, T_snlSimOutput } from "./snlTypes";

export const startSimulation = ({
    simContext,
}: {
    simContext: T_snlSimContext;
}) => {
    const { setIsSimRunning, isSimRunning, gamePrep, setOutput, input } =
        simContext;
    const defaultSimInput = getSNLSimInput();
    const snlSimInput = input || defaultSimInput;
    const { numGames, maxThrowsPerGame } = snlSimInput;

    if (!gamePrep) return;
    setIsSimRunning(true);
    const { lightBoard, darkBoard, players } = gamePrep;
    console.log("gamePrep=", gamePrep);

    const output: T_snlSimOutput = {
        numGamesPlayed: 0,
        numGamesWithWin: 0,
        lightSideWins: 0,
        darkSideWins: 0,

        pLightWin: 0,
        pLightLast: 0,
        avgLightSideThrowsToFirstWin: 0,
        avgDarkSideThrowsToFirstWin: 0,
        avgLightSideScore: 0,
        avgDarkSideScore: 0,
        playerResults: [],
    };

    let throwsTillWin = 0;
    let throwsTillWin_light = 0;
    let throwsTillWin_dark = 0;
    for (let gameCount = 0; gameCount < numGames; gameCount++) {
        //----Start a game------
        let playerTurn = 0;
        let gameEndOnVictory = false;
        players.forEach((player) => {
            player.reset();
        });
        for (let throwCount = 0; throwCount < maxThrowsPerGame; throwCount++) {
            const diceValue = throwDice();
            const currentPlayer = players[playerTurn];
            const playerWon = currentPlayer.play(diceValue);
            if (diceValue !== 6) {
                playerTurn = (playerTurn + 1) % players.length;
            }
            if (playerWon) {
                //update report
                gameEndOnVictory = true;
                if (currentPlayer.opts.playerData.mode === "light") {
                    output.lightSideWins++;
                    throwsTillWin_light += currentPlayer.numThrows;
                } else {
                    output.darkSideWins++;
                    throwsTillWin_dark += currentPlayer.numThrows;
                }
                output.numGamesWithWin++;
                throwsTillWin += currentPlayer.numThrows;

                break;
            }
        }
        output.numGamesPlayed++;
    }
    output.pLightWin = rnd4(output.lightSideWins / output.numGamesWithWin);
    output.avgLightSideThrowsToFirstWin = rnd1(
        throwsTillWin_light / output.lightSideWins
    );
    output.avgDarkSideThrowsToFirstWin = rnd1(
        throwsTillWin_dark / output.darkSideWins
    );
    // console.log("output=", output);
    setOutput(output);
    // setIsSimRunning(false);
};
export const stopSimulation = ({
    simContext,
}: {
    simContext: T_snlSimContext;
}) => {
    const { setIsSimRunning, isSimRunning, setGamePrep, setOutput } =
        simContext;
    setIsSimRunning(false);
    setGamePrep(undefined);
    setOutput(undefined);
};

const throwDice = () => {
    return Math.floor(Math.random() * 6) + 1;
};

export const isLadderStart = (position: number, boardData: T_boardData) => {
    const ladder = boardData.ladders.find(
        (ladder) => ladder.start === position
    );
    if (ladder) return ladder;
    else return false;
};
export const isSnakeHead = (position: number, boardData: T_boardData) => {
    const snake = boardData.snakes.find((snake) => snake.head === position);
    if (snake) return snake;
    else return false;
};
