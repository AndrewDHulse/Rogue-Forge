import { useState, useRef } from "react"

export default function WhiteBoard(){
    const canvasRef = useRef(null);
    const [isErasing, setIsErasing] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastX, setLastX] = useState(0);
    const [lastY, setLastY] = useState(0);

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const toggleEraser = () => {
        setIsErasing(prevIsErasing => !prevIsErasing);
        setIsDrawing(false);
    };

    const handleMouseDown = e => {
        const canvas = canvasRef.current;
        const canvasRect = canvas.getBoundingClientRect();
        setIsDrawing(true);
        setLastX(e.clientX - canvasRect.left);
        setLastY(e.clientY - canvasRect.top);
    };

    const handleMouseMove = e => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const currentX = e.nativeEvent.offsetX;
        const currentY = e.nativeEvent.offsetY;

        context.strokeStyle = isErasing ? 'white' : 'black';
        context.lineWidth = 5;
        context.lineCap = 'round';

        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(currentX, currentY);
        context.stroke();

        setLastX(currentX);
        setLastY(currentY);
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    const handleMouseOut = () => {
        setIsDrawing(false);
    };

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={500}
                height={500}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseOut={handleMouseOut}
            ></canvas>
            <button onClick={toggleEraser}>{isErasing ? 'DRAW' : 'ERASE'}</button>
            <button onClick={clearCanvas}>CLEAR</button>
        </div>
    )
}