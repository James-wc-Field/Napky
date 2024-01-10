import React, { useRef, useEffect, useState, FC } from 'react';
import { useDroppable } from '@dnd-kit/core';

interface DrawingBoardProps {
  children?: React.ReactNode;
}

const DrawingBoard: FC<DrawingBoardProps> = ({ children }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [paths, setPaths] = useState<string[]>([]);
  const { setNodeRef } = useDroppable({ id: 'drawing-board' });

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const getPoint = (event: MouseEvent) => {
      const point = svg.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;
      return point.matrixTransform(svg.getScreenCTM()?.inverse());
    };

    const startDrawing = (event: MouseEvent) => {
      const { x, y } = getPoint(event);
      setCurrentPath(`M ${x} ${y}`);
      setIsDrawing(true);
    };

    const draw = (event: MouseEvent) => {
      if (!isDrawing) return;
      const { x, y } = getPoint(event);
      setCurrentPath(prev => `${prev} L ${x} ${y}`);
    };

    const stopDrawing = () => {
      setPaths(prev => [...prev, currentPath]);
      setCurrentPath('');
      setIsDrawing(false);
    };

    svg.addEventListener('mousedown', startDrawing);
    svg.addEventListener('mousemove', draw);
    svg.addEventListener('mouseup', stopDrawing);
    svg.addEventListener('mouseleave', stopDrawing);

    return () => {
      svg.removeEventListener('mousedown', startDrawing);
      svg.removeEventListener('mousemove', draw);
      svg.removeEventListener('mouseup', stopDrawing);
      svg.removeEventListener('mouseleave', stopDrawing);
    };
  }, [isDrawing, currentPath]);

  return (
    <div ref={setNodeRef} className='bg-sky-50' style={{ width: '100vw', height: '100vh' }}>
      <svg ref={svgRef} width='100%' height='100%' style={{ border: '1px solid black' }}>
        {paths.map((path, index) => (
          <path key={index} d={path} stroke="black" strokeWidth="2" fill="none" />
        ))}
        {isDrawing && <path d={currentPath} stroke="black" strokeWidth="2" fill="none" />}
      </svg>
      <div style={{ position: 'absolute', top: 0, left: 0 }}>
        {children}
      </div>
    </div>
  );
};

export default DrawingBoard;
