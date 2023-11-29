import React, { useRef, useEffect, useState, FC } from 'react';
import { useDroppable } from '@dnd-kit/core';

interface DrawingBoardProps {
  children?: React.ReactNode;
}

const DrawingBoard: FC<DrawingBoardProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const { setNodeRef } = useDroppable({ id: 'drawing-board' });

  // Basic drawing logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const startDrawing = (event: MouseEvent) => {
      const { offsetX, offsetY } = event;
      context.beginPath();
      context.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    };

    const draw = (event: MouseEvent) => {
      if (!isDrawing) return;
      const { offsetX, offsetY } = event;
      context.lineTo(offsetX, offsetY);
      context.stroke();
    };

    const stopDrawing = () => {
      context.closePath();
      setIsDrawing(false);
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
    };
  }, [isDrawing]);

  return (
    <div ref={setNodeRef} style={{ position: 'relative' }}>
      <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid black' }} />
      <div style={{ position: 'absolute', top: 0, left: 0 }}>
        {children}
      </div>
    </div>
  );
};

export default DrawingBoard;
