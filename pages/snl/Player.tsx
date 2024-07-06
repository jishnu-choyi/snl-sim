import { fabric } from "fabric";
import {
    E_gameSide,
    T_gamePrepBoard,
    T_playerData,
    T_snlSimInput,
} from "./snlTypes";
import { isLadderStart, isSnakeHead } from "./sim-utils";
import { computeAbsolutePosition, deleteItemByName } from "@/lib/fabric-utils";
type T_playerOpts = {
    idp: string;
    playerData: T_playerData;
    darkBoard: T_gamePrepBoard;
    lightBoard: T_gamePrepBoard;
    snlSimInput: T_snlSimInput;
};

export class SNLPlayer {
    canvas: fabric.Canvas;
    opts: T_playerOpts;
    playerObj: fabric.Circle;
    isInGame: boolean;
    numThrowsBeforeFirst6: number;
    numThrows: number;
    currentPosition: number;
    verdict: string;

    constructor(canvas: fabric.Canvas, opts: T_playerOpts) {
        this.isInGame = false;
        this.numThrowsBeforeFirst6 = 0;
        this.numThrows = 0;
        this.currentPosition = 0;
        this.opts = opts;
        this.canvas = canvas;
        this.verdict = "";

        const name = ["player", opts.idp].join("-");
        const playerObj = new fabric.Circle({
            fill: "#ff00ff",
            opacity: 0.5,
            radius: 10,
            left: 0,
            top: canvas.getHeight() * 0.5 - 20,
            name,
        });
        this.playerObj = playerObj;

        deleteItemByName(canvas, name);
        canvas.add(this.playerObj);
    }
    reset() {
        this.isInGame = false;
        this.numThrowsBeforeFirst6 = 0;
        this.numThrows = 0;
        this.currentPosition = 0;
        this.verdict = "";
    }
    play(diceValue: number, { players }: { players: SNLPlayer[] }) {
        // console.log(`player ${this.opts.idp}:`, diceValue);
        this.numThrows++;
        if (!this.isInGame && diceValue === 6) {
            this.isInGame = true;
            this.setPosition(1);
            return false;
        }
        if (!this.isInGame) {
            this.numThrowsBeforeFirst6++;
            return false;
        }
        let tentativeNewPosition = this.currentPosition + diceValue;
        if (tentativeNewPosition > 100) return false;
        if (tentativeNewPosition === 100) {
            this.setPosition(100);
            this.setWin();
            return true;
        }
        const currentBoard = this.getCurrentBoard();
        const snakeCheck = isSnakeHead(
            tentativeNewPosition,
            currentBoard.boardData
        );
        const ladderCheck = isLadderStart(
            tentativeNewPosition,
            currentBoard.boardData
        );
        let newPosition = tentativeNewPosition;
        if (snakeCheck) {
            newPosition = snakeCheck.tail;
            if (newPosition < 1) {
                this.isInGame = false;
            }
        } else if (ladderCheck) {
            newPosition = ladderCheck.end;
        } else {
            newPosition = tentativeNewPosition;
        }
        this.setPosition(newPosition);
        //If any other players exist in the same position, you might want to cut
        this.tryCuttingOtherPlayers(newPosition, currentBoard, players);

        if (
            currentBoard.boardData.side === E_gameSide.light &&
            this.opts.snlSimInput.cuttingEnabledOnLightSide
        ) {
        }

        return false;
    }

    getCut() {
        this.setPosition(0);
        this.isInGame = false;
    }
    tryCuttingOtherPlayers(
        newPosition: number,
        currentBoard: T_gamePrepBoard,
        players: SNLPlayer[]
    ) {
        const currentBoardSide = currentBoard.boardData.side;
        const { cuttingEnabledOnDarkSide, cuttingEnabledOnLightSide } =
            this.opts.snlSimInput;
        if (currentBoardSide === E_gameSide.dark && cuttingEnabledOnDarkSide) {
            const otherPlayers = players.filter((item) => {
                return (
                    item.opts.playerData.mode === E_gameSide.dark &&
                    item.opts.playerData.id !== this.opts.playerData.id
                );
            });
            otherPlayers.forEach((otherPlayer) => {
                if (otherPlayer.currentPosition === newPosition) {
                    otherPlayer.getCut();
                }
            });
        }
        if (
            currentBoardSide === E_gameSide.light &&
            cuttingEnabledOnLightSide
        ) {
            const otherPlayers = players.filter((item) => {
                return (
                    item.opts.playerData.mode === E_gameSide.light &&
                    item.opts.playerData.id !== this.opts.playerData.id
                );
            });
            otherPlayers.forEach((otherPlayer) => {
                if (otherPlayer.currentPosition === newPosition) {
                    otherPlayer.getCut();
                }
            });
        }
    }
    setWin() {
        this.isInGame = false;
        this.verdict = "won";
    }

    setPosition(value: number) {
        this.currentPosition = value;
        const currentBoard = this.getCurrentBoard();
        const currentBox = currentBoard.group.getObjects().find((item) => {
            const t = item.name?.split("-");
            return t && t.length > 1 && t[1] === value + "";
        });
        if (!currentBox) return;
        const absPos = computeAbsolutePosition(currentBox);
        this.playerObj.set({
            left: absPos.absoluteLeft,
            top: absPos.absoluteTop,
            originX: "center",
            originY: "center",
        });
    }
    getCurrentBoard() {
        const currentBoard =
            this.opts.playerData.mode === "light"
                ? this.opts.lightBoard
                : this.opts.darkBoard;

        return currentBoard;
    }
}
