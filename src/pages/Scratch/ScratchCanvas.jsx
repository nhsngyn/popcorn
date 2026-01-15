import { useRef, useEffect, useState } from "react";
import needleCursorImg from "../../assets/scratch/needle.png";
import brushTexture from "../../assets/scratch/brushtexture.png"; 

const ScratchCanvas = ({ width, height, coverImage, onReveal, isActive = false }) => {
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
    if (!isActive) return; // 활성화되지 않았으면 무시
    isDrawing.current = true;
    lastPos.current = { x: 0, y: 0 }; // 리셋
    draw(e);
  };

  const stopDrawing = () => {
    if (!isActive) return; // 활성화되지 않았으면 무시
    isDrawing.current = false;
    lastPos.current = { x: 0, y: 0 }; // 리셋
    checkRevealPercentage();
  };

  const lastPos = useRef({ x: 0, y: 0 });

  const draw = (e) => {
    if (!isDrawing.current || !isReady || !isActive) return; // isActive 체크 추가

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // 부드러운 선 그리기 (이전 위치에서 현재 위치까지)
    if (lastPos.current.x !== 0 && lastPos.current.y !== 0) {
      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.max(1, Math.floor(distance / 5)); // 5픽셀마다 브러시 찍기

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const interpX = lastPos.current.x + dx * t;
        const interpY = lastPos.current.y + dy * t;

        if (brushImgRef.current) {
          const brushSize = 80; 
          
          ctx.save();
          ctx.translate(interpX, interpY);
          ctx.rotate(Math.random() * Math.PI * 2); 
          ctx.globalAlpha = 0.8; // 약간 투명하게 (더 자연스러운 효과)
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
          ctx.arc(interpX, interpY, 50, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    lastPos.current = { x, y };
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