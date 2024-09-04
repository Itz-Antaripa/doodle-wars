import React, { useEffect, useLayoutEffect, useRef } from "react";

const Board = ({ width, height }) => {
  const canvasRef = useRef(null);
  const shouldDraw = useRef(false);
  const drawHistory = useRef([]);
  const historyPointer = useRef(0);

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
