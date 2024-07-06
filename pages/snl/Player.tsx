import { fabric } from "fabric";
import { T_gamePrepBoard, T_playerData } from "./snlTypes";
import { isLadderStart, isSnakeHead } from "./sim-utils";
import { computeAbsolutePosition, deleteItemByName } from "@/lib/fabric-utils";
type T_playerOpts = {
    idp: string;
    playerData: T_playerData;
    darkBoard: T_gamePrepBoard;
    lightBoard: T_gamePrepBoard;
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
    play(diceValue: number) {
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
        if (snakeCheck) {
            this.setPosition(snakeCheck.tail);
            if (snakeCheck.tail < 1) {
                this.isInGame = false;
            }
        } else if (ladderCheck) {
            this.setPosition(ladderCheck.end);
        } else {
            this.setPosition(tentativeNewPosition);
        }
        return false;
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
