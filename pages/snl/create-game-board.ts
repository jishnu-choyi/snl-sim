import { fabric } from "fabric";
import {
    createOriginIndicator,
    removeAllObjects,
    setCanvasBgColor,
} from "@/lib/fabric-utils";
import {
    E_gameSide,
    T_boardData,
    T_gamePrepBoard,
    T_playerData,
    T_snlSimInput,
} from "./snlTypes";
import { T_point2d } from "@/lib/types/types2d";
// import { RAD2DEG } from "three/src/math/MathUtils";
import { checkSimInputValidity } from "./validate-data";
import { T_snlSimContext } from "./snlSimContext";
import { SNLPlayer } from "./Player";
import { RAD2DEG } from "three/src/math/MathUtils.js";

export const createGameBoards = ({
    canvas,
    snlSimInput,
    simContext,
}: {
    canvas: fabric.Canvas;
    snlSimInput: T_snlSimInput;
    simContext: T_snlSimContext;
}) => {
    canvas.discardActiveObject();

    removeAllObjects(canvas);
    setCanvasBgColor(canvas, "#ffffff");
    createOriginIndicator(canvas, { x: 0, y: 0 });

    const check = checkSimInputValidity(snlSimInput);
    if (!check.valid) {
        console.log("check=", check);
        displayErrorMessages(canvas, check.msgs);
        return;
    }

    const lightBoard = createGameBoard({
        canvas,
        boardData: snlSimInput.lightSideData,
        playerData: snlSimInput.playerData.filter(
            (x) => x.mode === E_gameSide.light
        ),
    });
    const darkBoard = createGameBoard({
        canvas,
        boardData: snlSimInput.darkSideData,
        playerData: snlSimInput.playerData.filter(
            (x) => x.mode === E_gameSide.light
        ),
    });
    lightBoard.group.set({
        left: -canvas.getWidth() * 0.5 + 30,
        top: -canvas.getHeight() * 0.5,
    });
    darkBoard.group.set({
        left:
            -canvas.getWidth() * 0.5 +
            lightBoard.group.getBoundingRect().width +
            60,
        top: -canvas.getHeight() * 0.5,
    });

    const { players } = createPlayers({
        canvas,
        lightBoard,
        darkBoard,
        snlSimInput,
    });

    const { setGamePrep } = simContext;
    setGamePrep({
        lightBoard,
        darkBoard,
        players,
    });
};

const displayErrorMessages = (canvas: fabric.Canvas, msgs: string[]) => {
    msgs.forEach((msg, index) => {
        const text = new fabric.Text(`${msg}`, {
            left: -canvas.getWidth() * 0.5,
            top: -canvas.getHeight() * 0.5 + index * 20,
            fill: "#ff0000",
            fontSize: 10,
            name: "error-" + index,
        });
        canvas.add(text);
    });
};

const createGameBoard = ({
    canvas,
    boardData,
    playerData,
}: {
    canvas: fabric.Canvas;
    boardData: T_boardData;
    playerData: T_playerData[];
}): T_gamePrepBoard => {
    const { side, snakes, ladders } = boardData;
    const boardName = ["board", side].join("-");
    const numRows = 10;
    const numCols = 10;
    const boxWidth = 30;
    const boxHeight = 30;
    const boxObjs: fabric.Object[] = [];

    const valuePositionHash: Record<string, T_point2d> = {
        "0": { x: 0, y: canvas.getHeight() * 0.25 },
    };
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            let value = row * numRows + col + 1;
            if (row % 2 === 1) {
                value = row * numRows + numCols - col;
            }
            const position: T_point2d = {
                x: col * boxWidth,
                y: -row * boxHeight,
            };
            valuePositionHash[value] = position;
            const box = createBox({
                canvas,
                boxWidth,
                boxHeight,
                left: position.x,
                top: position.y,
                idp: [row, col].join(":"),
                value,
                gameSide: side,
            });
            boxObjs.push(box);
        }
    }
    //----create snakes --------
    const snakeObjs: fabric.Object[] = [];
    snakes.forEach((snake, index) => {
        const startPoint = valuePositionHash[snake.head + ""];
        const endPoint = valuePositionHash[snake.tail + ""];
        const snakeStartOffset: T_point2d = {
            x: boxWidth * (0.5 + (Math.random() - 0.5) * 0.6),
            y: boxHeight * (0.5 + (Math.random() - 0.5) * 0.6),
        };
        const snakeEndOffset: T_point2d = {
            x: boxWidth * (0.5 + (Math.random() - 0.5) * 0.6),
            y: boxHeight * (0.5 + (Math.random() - 0.5) * 0.6),
        };

        const snakeObj = createSnake({
            startPoint: {
                x: startPoint.x + snakeStartOffset.x,
                y: startPoint.y + snakeStartOffset.y,
            },
            endPoint: {
                x: endPoint.x + snakeEndOffset.x,
                y: endPoint.y + snakeEndOffset.y,
            },
            idp: index + "",
        });
        snakeObjs.push(snakeObj);
    });

    //----create ladders --------
    const ladderObjs: fabric.Object[] = [];
    ladders.forEach((ladder, index) => {
        const startPoint = valuePositionHash[ladder.start + ""];
        const endPoint = valuePositionHash[ladder.end + ""];
        const ladderStartOffset: T_point2d = {
            x: boxWidth * (0.5 + (Math.random() - 0.5) * 0.6),
            y: boxHeight * (0.5 + (Math.random() - 0.5) * 0.6),
        };
        const ladderEndOffset: T_point2d = {
            x: boxWidth * (0.5 + (Math.random() - 0.5) * 0.6),
            y: boxHeight * (0.5 + (Math.random() - 0.5) * 0.6),
        };

        const ladderObj = createLadder({
            startPoint: {
                x: startPoint.x + ladderStartOffset.x,
                y: startPoint.y + ladderStartOffset.y,
            },
            endPoint: {
                x: endPoint.x + ladderEndOffset.x,
                y: endPoint.y + ladderEndOffset.y,
            },
            idp: index + "",
        });
        ladderObjs.push(ladderObj);
    });

    const boardGroup = new fabric.Group(
        [...boxObjs, ...snakeObjs, ...ladderObjs],
        {
            name: boardName,
        }
    );
    canvas.add(boardGroup);
    return {
        group: boardGroup,
        boardData,
    };
};

const createPlayers = ({
    canvas,
    lightBoard,
    darkBoard,
    snlSimInput,
}: {
    canvas: fabric.Canvas;
    lightBoard: T_gamePrepBoard;
    darkBoard: T_gamePrepBoard;
    snlSimInput: T_snlSimInput;
}) => {
    const playerData = snlSimInput.playerData;

    //----create players---------
    const playerObjs: fabric.Object[] = [];
    const players: SNLPlayer[] = [];
    playerData.forEach((player, index) => {
        const t = new SNLPlayer(canvas, {
            idp: index + "",
            playerData: player,
            lightBoard,
            darkBoard,
            snlSimInput,
        });
        players.push(t);
        playerObjs.push(t.playerObj);
    });
    return { playerObjs, players };
};

const createSnake = ({
    idp,
    startPoint,
    endPoint,
}: {
    idp: string;
    startPoint: T_point2d;
    endPoint: T_point2d;
}) => {
    const arrow = createArrow({
        startPoint,
        endPoint,
        color: "#06ab00",
        opacity: 0.8,
        idp: ["ladder", idp].join("-"),
    });
    arrow.set({
        name: ["snake", idp].join("-"),
    });
    return arrow;
};
const createLadder = ({
    idp,
    startPoint,
    endPoint,
}: {
    idp: string;
    startPoint: T_point2d;
    endPoint: T_point2d;
}) => {
    const arrow = createArrow({
        startPoint,
        endPoint,
        color: "orange",
        opacity: 0.8,
        idp: ["ladder", idp].join("-"),
    });
    arrow.set({
        name: ["ladder", idp].join("-"),
    });
    return arrow;
};
const createArrow = ({
    startPoint,
    endPoint,
    color,
    opacity,
    idp,
}: {
    startPoint: T_point2d;
    endPoint: T_point2d;
    color: string;
    opacity: number;
    idp: string;
}) => {
    const lineOptions = {
        strokeWidth: 1,
        stroke: color,
        selectable: false,
        evented: false,
        opacity,
    };
    const arrowLine = new fabric.Line(
        [startPoint.x, startPoint.y, endPoint.x, endPoint.y],
        {
            ...lineOptions,
            name: ["arrowLine", idp].join(":"),
        }
    );
    const arrowStart = new fabric.Circle({
        radius: 2,
        strokeWidth: 0.5,
        fill: color,
        stroke: color,
        opacity,
        left: startPoint.x + 1,
        top: startPoint.y + 1,
        originX: "center",
        originY: "center",
        selectable: false,
        evented: false,
        name: ["arrowStart", idp].join(":"),
    });

    const tanTheta = (endPoint.y - startPoint.y) / (endPoint.x - startPoint.x);
    let theta = Math.atan(tanTheta) * RAD2DEG;
    // console.log("theta=", theta);

    let leftOffset = 0;
    let topOffset = 1;
    const downArrow = startPoint.y < endPoint.y ? true : false;
    if (theta > 0 && theta <= 90) {
        theta += downArrow ? -270 : 270;
    }
    if (theta < 0 && theta >= -90) {
        theta += downArrow ? -90 : 90;
    }

    const arrowEnd = new fabric.Triangle({
        width: 4,
        height: 8,
        strokeWidth: 0.5,
        fill: color,
        stroke: color,
        opacity,
        left: endPoint.x + leftOffset,
        top: endPoint.y + topOffset,
        originX: "center",
        originY: "center",
        selectable: false,
        evented: false,
        angle: theta,
        name: ["arrowEnd", idp].join(":"),
    });

    return new fabric.Group([arrowLine, arrowStart, arrowEnd]);
};

const createBox = ({
    canvas,
    boxWidth,
    boxHeight,
    top,
    left,
    idp,
    value,
    gameSide,
}: {
    top: number;
    left: number;
    boxWidth: number;
    boxHeight: number;
    canvas: fabric.Canvas;
    idp: string;
    value: number;
    gameSide: E_gameSide;
}) => {
    const { boxBgColor, boxFillColor, boxStrokeColor } = getBoxColors(
        value,
        gameSide
    );
    const { textStrokeColor, textFillColor } = getTextColor(value, gameSide);

    const textRect = new fabric.Rect({
        width: boxWidth,
        height: boxHeight,
        left,
        top,
        strokeWidth: 1,
        stroke: boxStrokeColor,
        fill: boxFillColor,
        backgroundColor: boxBgColor,
    });
    const text = new fabric.Text(`${value}`, {
        width: boxWidth,
        height: boxHeight,
        left: left + 1,
        top: top + 1,
        strokeWidth: 1,
        stroke: textStrokeColor,
        fill: textFillColor,
        fontSize: 10,
    });
    return new fabric.Group([textRect, text], {
        name: ["boardBox", value, idp].join("-"),
    });
};
const getTextColor = (value: number, gameSide: E_gameSide) => {
    const textStrokeColor =
        gameSide === E_gameSide.light ? "#00000020" : "#ffffff0a";
    const textFillColor = gameSide === E_gameSide.light ? "#000" : "#fff";
    return {
        textStrokeColor,
        textFillColor,
    };
};
const getBoxColors = (value: number, gameSide: E_gameSide) => {
    let boxBgColor = value % 2 === 0 ? "#0000000a" : "#00000000";
    let boxFillColor =
        Math.ceil(value / 10) % 2 === 0 ? "#0000ff0a" : "#00000000";

    if (gameSide === E_gameSide.dark) {
        boxBgColor = value % 2 === 0 ? "#00000020" : "#00000000";
        boxFillColor =
            Math.ceil(value / 10) % 2 === 0 ? "#00000080" : "#000000a0";
    }

    let boxStrokeColor =
        gameSide === E_gameSide.light ? "#00000010" : "#00000040";
    return {
        boxBgColor,
        boxFillColor,
        boxStrokeColor,
    };
};
