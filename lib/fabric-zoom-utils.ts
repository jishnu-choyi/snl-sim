export const restoreZoom = (canvas: fabric.Canvas) => {
    const { zoom, viewPortTransform } = getZoomDefault(canvas);
    canvas.setZoom(zoom);
    canvas.setViewportTransform(viewPortTransform);
};
const getZoomDefault = (canvas: fabric.Canvas) => {
    const X_PAN_VALUE = canvas.width ? canvas.width * 0.5 : 0;
    const Y_PAN_VALUE = canvas.height ? canvas.height * 0.5 + 28 : 0;
    return {
        zoom: 1,
        viewPortTransform: [1, 0, 0, 1, X_PAN_VALUE, Y_PAN_VALUE],
    };
};
