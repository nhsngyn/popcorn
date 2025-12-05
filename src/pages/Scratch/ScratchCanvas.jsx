import { useRef, useEffect, useState } from "react";
import needleCursorImg from "../../assets/scratch/needle.png";
import brushTexture from "../../assets/scratch/brushtexture.png"; 

// onScratch prop 제거
const ScratchCanvas = ({ width, height, coverImage, onReveal }) => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const brushImgRef = useRef(null); 

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const brush = new Image();
    brush.src = brushTexture;
    brush.onload = () => { brushImgRef.current = brush; };

    ctx.clearRect(0, 0, width, height); 
    ctx.globalCompositeOperation = "source-over"; 
    ctx.fillStyle = "#222"; 
    ctx.fillRect(0, 0, width, height);

    const img = new Image();
    img.crossOrigin = "Anonymous";
    
    img.onload = () => {
      const canvasRatio = width / height;
      const imgRatio = img.width / img.height;
      let renderWidth, renderHeight, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        renderWidth = width;
        renderHeight = width / imgRatio;
        offsetX = 0;
        offsetY = (height - renderHeight) / 2;
      } else {
        renderWidth = height * imgRatio;
        renderHeight = height;
        offsetX = (width - renderWidth) / 2;
        offsetY = 0;
      }
      
      ctx.globalCompositeOperation = "source-over"; 
      ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
      
      ctx.globalCompositeOperation = "destination-out"; 
      setIsReady(true);
    };

    img.src = coverImage; 

  }, [coverImage, width, height]);

  const checkRevealPercentage = () => {
    if (!isReady) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    try {
        const imageData = ctx.getImageData(0, 0, width, height);
        const pixels = imageData.data;
        let transparentPixels = 0;
        for (let i = 3; i < pixels.length; i += 64) { 
            if (pixels[i] === 0) transparentPixels++;
        }
        const totalTested = pixels.length / 64;
        const currentPercent = (transparentPixels / totalTested) * 100;
        if (currentPercent > 30) {
            onReveal();
        }
    } catch (e) {}
  };

  const startDrawing = (e) => {
    isDrawing.current = true;
    draw(e);
  };

  const stopDrawing = () => {
    isDrawing.current = false;
    checkRevealPercentage();
  };

  const draw = (e) => {
    if (!isDrawing.current || !isReady) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (brushImgRef.current) {
        const brushSize = 80; 
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.random() * Math.PI * 2); 
        ctx.drawImage(
            brushImgRef.current, 
            -brushSize / 2, 
            -brushSize / 2, 
            brushSize, 
            brushSize
        );
        ctx.restore();
    } else {
        ctx.beginPath();
        ctx.arc(x, y, 50, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // 조각 생성 로직 삭제됨
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={startDrawing}
      onMouseUp={stopDrawing}
      onMouseMove={draw}
      onMouseLeave={stopDrawing}
      onTouchStart={startDrawing}
      onTouchEnd={stopDrawing}
      onTouchMove={draw}
      style={{ cursor: `url(${needleCursorImg}) 0 32, auto` }} 
      className="absolute inset-0 z-20 touch-none"
    />
  );
};

export default ScratchCanvas;