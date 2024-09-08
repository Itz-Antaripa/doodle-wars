import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToHistory, undo, redo } from "../slices/drawingSlice";
import { MENU_ITEMS } from "../constants";

const Board = ({ width, height }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  
  const dispatch = useDispatch();
  const { activeMenuItem } = useSelector((state) => state.menu);
  const { drawHistory, historyPointer } = useSelector((state) => state.drawing);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 2;
    contextRef.current = context;

    // Save initial blank state
    saveToHistory();
  }, [width, height]);

  useEffect(() => {
    if (activeMenuItem === MENU_ITEMS.UNDO) {
      dispatch(undo());
    } else if (activeMenuItem === MENU_ITEMS.REDO) {
      dispatch(redo());
    }
  }, [activeMenuItem, dispatch]);

  useEffect(() => {
    if (historyPointer >= 0 && drawHistory.length > 0) {
      const imageData = drawHistory[historyPointer];
      contextRef.current.putImageData(imageData, 0, 0);
    } else {
      contextRef.current.clearRect(0, 0, width, height);
    }
  }, [drawHistory, historyPointer, width, height]);

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    const imageData = contextRef.current.getImageData(0, 0, canvas.width, canvas.height);
    dispatch(addToHistory(imageData));
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    saveToHistory();
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      className="bg-white "
    />
  );
};

export default Board;
