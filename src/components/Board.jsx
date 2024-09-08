import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { menuItemClick } from "../slices/menuslice";
import { addToHistory, undo, redo, clearHistory } from "../slices/drawingSlice.js";
import { MENU_ITEMS } from "../constants";
import { sendCanvasImage } from "../services/canvasService";

const Board = ({ width, height }) => {
  const canvasRef = useRef(null);
  const shouldDraw = useRef(false);
  const dispatch = useDispatch();
  const { activeMenuItem } = useSelector((state) => state.menu);
  const { drawHistory, historyPointer } = useSelector((state) => state.drawing);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const applyDrawingState = (imageData) => {
      context.putImageData(imageData, 0, 0);
    };

    switch (activeMenuItem) {
      case MENU_ITEMS.UNDO:
        dispatch(undo());
        break;
      case MENU_ITEMS.REDO:
        dispatch(redo());
        break;
      // ... handle other menu items
    }

    if (historyPointer >= 0 && historyPointer < drawHistory.length) {
      applyDrawingState(drawHistory[historyPointer]);
    } else if (historyPointer === -1) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }

    dispatch(menuItemClick(null));
  }, [activeMenuItem, dispatch, drawHistory, historyPointer]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;

    const beginPath = (x, y) => {
      const rect = canvas.getBoundingClientRect();
      context.beginPath();
      context.moveTo(x - rect.left, y - rect.top);
    };

    const drawLine = (x, y) => {
      const rect = canvas.getBoundingClientRect();
      context.lineTo(x - rect.left, y - rect.top);
      context.stroke();
    };

    const handleMouseDown = (e) => {
      shouldDraw.current = true;
      beginPath(e.clientX, e.clientY);
    };

    const handleMouseMove = (e) => {
      if (!shouldDraw.current) return;
      drawLine(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      shouldDraw.current = false;
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      dispatch(addToHistory(imageData));
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [width, height, dispatch]);

  return (
    <canvas
      ref={canvasRef}
      className="border border-black"
      style={{ width: `${width}px`, height: `${height}px` }}
    ></canvas>
  );
};

export default Board;
