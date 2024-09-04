import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { menuItemClick } from "../slices/menuslice";
import { MENU_ITEMS } from "../constants";

const Board = ({ width, height }) => {
  const canvasRef = useRef(null);
  const shouldDraw = useRef(false);
  const drawHistory = useRef([]);
  const historyPointer = useRef(0);
  const dispatch = useDispatch();
  const { activeMenuItem } = useSelector((state) => {
    return {
      activeMenuItem: state?.menu?.activeMenuItem,
    };
  });

  // when activemenuitem changes
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (activeMenuItem === MENU_ITEMS.DOWNLOAD) {
      const URL = canvas.toDataURL();
      const anchor = document.createElement("a");
      anchor.href = URL;
      anchor.download = "sketch.jpg";
      anchor.click();
    } else if (
      activeMenuItem === MENU_ITEMS.UNDO ||
      activeMenuItem === MENU_ITEMS.REDO
    ) {
      if (historyPointer.current > 0 && activeMenuItem === MENU_ITEMS.UNDO)
        historyPointer.current -= 1;
      if (
        historyPointer.current < drawHistory.current.length - 1 &&
        activeMenuItem === MENU_ITEMS.REDO
      )
        historyPointer.current += 1;
      const imageData = drawHistory.current[historyPointer.current];
      context.putImageData(imageData, 0, 0);
    }
    dispatch(menuItemClick(null));
  }, [activeMenuItem, dispatch]);

  // when initial brower loader
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
      drawHistory.current.push(imageData);
      historyPointer.current = drawHistory.current.length - 1;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="border border-black"
      style={{ width: `${width}px`, height: `${height}px` }}
    ></canvas>
  );
};

export default Board;
