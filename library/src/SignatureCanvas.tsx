import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';

export interface SignatureCanvasRef {
  clear: () => void;
  undo: () => void;
  canUndo: boolean;
  isEmpty: () => boolean;
  getCanvas: () => HTMLCanvasElement | null;
  getTrimmedCanvas: () => HTMLCanvasElement | null;
  toDataURL: (type?: string, quality?: any, throwIfEmpty?: boolean) => string;
}

export interface SignatureCanvasProps {
  strokeColor?: string;
  strokeWidth?: number;
  stabilization?: boolean;
  autoCrop?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  canvasClassName?: string;
  canvasStyle?: React.CSSProperties;
  onDrawStart?: () => void;
  onDrawEnd?: () => void;
  onUndoStateChange?: (canUndo: boolean) => void;
  children?: React.ReactNode;
}

const SignatureCanvas = forwardRef<SignatureCanvasRef, SignatureCanvasProps>(({
  strokeColor = '#000000',
  strokeWidth = 3,
  stabilization = true,
  autoCrop = false,
  width = '100%',
  height = '100%',
  className = '',
  style,
  canvasClassName = '',
  canvasStyle,
  onDrawStart,
  onDrawEnd,
  onUndoStateChange,
  children
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const isEmptyRef = useRef(true);

  const isDrawingRef = useRef(false);
  const onDrawStartRef = useRef(onDrawStart);
  const onDrawEndRef = useRef(onDrawEnd);
  const stabilizationRef = useRef(stabilization);

  useEffect(() => {
    onDrawStartRef.current = onDrawStart;
    onDrawEndRef.current = onDrawEnd;
    stabilizationRef.current = stabilization;
  }, [onDrawStart, onDrawEnd, stabilization]);

  const [undoStack, setUndoStack] = useState<string[]>([]);
  
  const pointsRef = useRef<{x: number, y: number}[]>([]);
  const lastEndPoint = useRef<{x: number, y: number} | null>(null);

  const currentStrokeWidth = useRef(strokeWidth);
  const currentColor = useRef(strokeColor);

  useEffect(() => {
    currentStrokeWidth.current = strokeWidth;
    currentColor.current = strokeColor;
  }, [strokeWidth, strokeColor]);

  const onUndoStateChangeRef = useRef(onUndoStateChange);

  useEffect(() => {
    onUndoStateChangeRef.current = onUndoStateChange;
  }, [onUndoStateChange]);

  const lastCanUndoRef = useRef<boolean>(false);

  useEffect(() => {
    const nextCanUndo = undoStack.length > 0;
    if (lastCanUndoRef.current !== nextCanUndo) {
      lastCanUndoRef.current = nextCanUndo;
      onUndoStateChangeRef.current?.(nextCanUndo);
    }
  }, [undoStack.length]);

  const saveStateToUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const currentState = canvas.toDataURL();
    setUndoStack(prev => [...prev.slice(-19), currentState]); // maintain max 20 states
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const previousState = undoStack[undoStack.length - 1];
    setUndoStack(prev => prev.slice(0, -1));

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
      ctx.drawImage(img, 0, 0, img.width / (window.devicePixelRatio || 1), img.height / (window.devicePixelRatio || 1));
      // If we undo to the first state and stack is now 0, it might be empty if we didn't save an initial blank state.
      // A better check for isEmpty would be to inspect pixel data, but for simplicity:
      if (undoStack.length === 1) { // 1 before slice means it's now 0
         setIsEmpty(true); isEmptyRef.current = true;
      }
    };
    img.src = previousState;
  };

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let dataUrl = '';
      if (canvas.width > 0 && canvas.height > 0) {
          dataUrl = canvas.toDataURL();
      }

      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = currentColor.current;
      ctx.lineWidth = currentStrokeWidth.current;

      if (dataUrl) {
         const img = new Image();
         img.onload = () => {
             ctx.drawImage(img, 0, 0, img.width / dpr, img.height / dpr);
         };
         img.src = dataUrl;
      }
    };

    setTimeout(resizeCanvas, 0);
    
    const observer = new ResizeObserver(() => {
      resizeCanvas();
    });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
  }, [strokeColor, strokeWidth]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    return {
      x: (e as React.MouseEvent | MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent | MouseEvent).clientY - rect.top
    };
  };

  const startDrawing = (e: MouseEvent | TouchEvent) => {
    if ('touches' in e && e.touches.length > 1) {
      return;
    }
    if (e.cancelable) e.preventDefault();
    onDrawStartRef.current?.();
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveStateToUndo();

    ctx.beginPath();
    ctx.moveTo(x, y);
    isDrawingRef.current = true;
    setIsDrawing(true);
    setIsEmpty(false); isEmptyRef.current = false;
    
    if (stabilizationRef.current) {
      pointsRef.current = [{x, y}];
      lastEndPoint.current = {x, y};
    }
  };

  const draw = (e: MouseEvent | TouchEvent) => {
    if ('touches' in e && e.touches.length > 1) {
      return;
    }
    if (e.cancelable) e.preventDefault();
    if (!isDrawingRef.current) return;
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (stabilizationRef.current) {
      pointsRef.current.push({x, y});
      const pts = pointsRef.current;
      if (pts.length > 2) {
        const p1 = pts[pts.length - 2];
        const p2 = pts[pts.length - 1];
        const midPoint = {
          x: (p1.x + p2.x) / 2,
          y: (p1.y + p2.y) / 2
        };
        ctx.beginPath();
        ctx.moveTo(lastEndPoint.current!.x, lastEndPoint.current!.y);
        ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
        ctx.stroke();
        lastEndPoint.current = midPoint;
      }
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = (e?: MouseEvent | TouchEvent) => {
    if (e && e.cancelable) {
      e.preventDefault();
    }
    
    if (isDrawingRef.current && stabilizationRef.current && pointsRef.current.length > 1) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (ctx) {
        const pts = pointsRef.current;
        const lastPoint = pts[pts.length - 1];
        ctx.beginPath();
        ctx.moveTo(lastEndPoint.current!.x, lastEndPoint.current!.y);
        ctx.lineTo(lastPoint.x, lastPoint.y);
        ctx.stroke();
      }
    }
    
    if (isDrawingRef.current) {
      onDrawEndRef.current?.();
    }
    isDrawingRef.current = false;
    setIsDrawing(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', stopDrawing, { passive: false });
    canvas.addEventListener('touchcancel', stopDrawing, { passive: false });

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    return () => {
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
      canvas.removeEventListener('touchcancel', stopDrawing);

      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
    };
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    saveStateToUndo();
    ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
    ctx.beginPath();
    setIsEmpty(true); isEmptyRef.current = true;
  };


  const getTrimmedCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    
    let minX = canvas.width;
    let minY = canvas.height;
    let maxX = 0;
    let maxY = 0;
    let hasContent = false;

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const alpha = data[(y * canvas.width + x) * 4 + 3];
        if (alpha > 5) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
          hasContent = true;
        }
      }
    }

    if (!hasContent) return canvas;

    const padding = 20 * (window.devicePixelRatio || 1);
    minX = Math.max(0, minX - padding);
    minY = Math.max(0, minY - padding);
    maxX = Math.min(canvas.width, maxX + padding);
    maxY = Math.min(canvas.height, maxY + padding);

    const width = maxX - minX;
    const height = maxY - minY;

    const trimmedCanvas = document.createElement('canvas');
    trimmedCanvas.width = width;
    trimmedCanvas.height = height;
    const trimmedCtx = trimmedCanvas.getContext('2d');
    if (trimmedCtx) {
      trimmedCtx.drawImage(canvas, minX, minY, width, height, 0, 0, width, height);
    }
    return trimmedCanvas;
  };

  useImperativeHandle(ref, () => ({
    clear: clearCanvas,
    undo: handleUndo,
    canUndo: undoStack.length > 0,
    isEmpty: () => isEmptyRef.current,
    getCanvas: () => canvasRef.current,
    getTrimmedCanvas,
    toDataURL: (type?: string, quality?: any, throwIfEmpty?: boolean) => {
      if (throwIfEmpty && isEmptyRef.current) {
        const error = new Error("The canvas is empty.");
        error.name = "EmptySignatureError";
        throw error;
      }
      const canvas = autoCrop ? getTrimmedCanvas() : canvasRef.current;
      if (!canvas) return '';
      return canvas.toDataURL(type, quality);
    }
  }));

  const defaultContainerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    minHeight: '200px', // Fallback minimum height
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    WebkitTapHighlightColor: 'transparent',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    ...style
  };

  const defaultCanvasStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    cursor: 'crosshair',
    WebkitTapHighlightColor: 'transparent',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    ...canvasStyle
  };

  return (
    <div 
      ref={containerRef}
      className={className}
      style={defaultContainerStyle}
    >
      {children}
      <canvas
        ref={canvasRef}
        className={canvasClassName}
        style={defaultCanvasStyle}
        tabIndex={0}
      />
    </div>
  );
});

SignatureCanvas.displayName = 'SignatureCanvas';

export default SignatureCanvas;
