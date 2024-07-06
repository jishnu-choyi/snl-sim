import { restoreZoom } from "@/lib/fabric-zoom-utils";
import { fabric } from "fabric";
import { FabricJSEditor } from "fabricjs-react";
import paper from "paper";

export const initializeEditor = (editor: FabricJSEditor | undefined) => {
    const canvas = editor?.canvas;
    if (!canvas) return;
    paper.setup([canvas.width || 1024, canvas.height || 512]);
    canvas.defaultCursor = "auto";
};
export const initialiseCanvasBehaviour = (canvas: fabric.Canvas) =>
    //updateData: T_shapeUpdateData
    {
        // const { canvas, shapeContext } = updateData;
        //----Global canvas behaviour-----
        canvas.preserveObjectStacking = true;
        canvas.selection = false;
        canvas.enableRetinaScaling = true;
        restoreZoom(canvas);
    };
