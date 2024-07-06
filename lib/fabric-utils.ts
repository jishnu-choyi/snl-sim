import { T_point2d } from "./types/types2d";
import { fabric } from "fabric";

//Use this to get the absolute position of an object inside a group e.g. inside a selection group
export const computeAbsolutePosition = (obj: fabric.Object) => {
    const transformMatrix = obj.calcTransformMatrix();
    const absoluteLeft = transformMatrix[4];
    const absoluteTop = transformMatrix[5];
    // console.log("absoluteTop", absoluteTop);
    return { absoluteLeft, absoluteTop };
};
export const deleteItemByName = function (
    canvas: fabric.Canvas,
    name: string | string[]
) {
    let objects = canvas.getObjects(),
        numDeleted = 0;
    const names = Array.isArray(name) ? name : [name];
    for (let i = 0, len = canvas.size(); i < len; i++) {
        const n = objects[i].name;
        if (n && names.includes(n)) {
            canvas.remove(objects[i]);
            numDeleted++;
        }
    }
    return numDeleted;
};
export const removeAllObjects = (
    canvas: fabric.Canvas,
    exceptionByName: string[] = []
) => {
    //canvas.clear(); //Returns JS error from fabric
    let objects = canvas.getObjects();
    objects.forEach((o) => {
        if (!o.name || !exceptionByName.includes(o.name)) {
            canvas.remove(o);
        }
    });
};
export const setCanvasBgColor = (
    canvas: fabric.Canvas | undefined,
    color: string
) => {
    if (!canvas) return;
    canvas.backgroundColor = color;
    canvas.requestRenderAll();
};
export const createOriginIndicator = (
    canvas: fabric.Canvas,
    canvasOrigin: T_point2d
) => {
    deleteItemByName(canvas, "originIndicator");
    const originIndicator = new fabric.Circle({
        radius: 8,
        strokeWidth: 0.5,
        stroke: "#c6c6c6",
        fill: "#ffffff80",
        name: "originIndicator",
        left: canvasOrigin.x,
        top: canvasOrigin.y,
        originX: "center",
        originY: "center",
        selectable: false,
    });
    originIndicator.hoverCursor = "auto";
    // originIndicator.moveTo(FABRIC_Z_INDEX.ORIGIN);
    canvas.add(originIndicator);
};
