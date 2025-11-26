import { useRef, useEffect, useState } from "react";

const ScratchCanvas = ({ width, height, coverImage, onReveal }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isReady, setIsReady] = useState(false); // 준비 완료 상태 추가

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 1. [중요] 일단 '지우기 모드'를 끕니다. (그리기 모드로 초기화)
    ctx.globalCompositeOperation = "source-over";

    // 2. 안전장치: 이미지가 안 떠도 긁는 맛은 나게 '회색'으로 먼저 덮습니다.
    ctx.fillStyle = "#999999"; 
    ctx.fillRect(0, 0, width, height);

    // 3. 이미지 로딩 시작
    const img = new Image();
    img.crossOrigin = "Anonymous"; 
    img.src = coverImage;
    
    img.onload = () => {
      // 4. 이미지가 로딩되면 회색 위에 덮어 그립니다.
      ctx.globalCompositeOperation = "source-over"; // 확실하게 그리기 모드
      ctx.drawImage(img, 0, 0, width, height);

      // 5. [핵심] 그림을 다 그린 '다음에' 지우개 모드로 변경합니다.
      ctx.globalCompositeOperation = "destination-out"; 
      ctx.lineWidth = 60;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      
      setIsReady(true); // 이제 긁어도 된다고 신호 줌
    };

    // (혹시 이미지가 깨져도 기본 기능은 하게 설정)
    ctx.globalCompositeOperation = "destination-out"; 
    ctx.lineWidth = 60;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

  }, [coverImage, width, height]);

  // 70% 체크 로직
  const checkRevealPercentage = () => {
    if (!isReady) return; // 준비 안 됐으면 계산 금지

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    // 픽셀 검사 (성능을 위해 16픽셀씩 건너뛰며 대충 검사)
    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] === 0) transparentPixels++;
    }

    // 전체 픽셀 대비 투명 픽셀 비율 (건너뛴 만큼 보정 불필요, 비율은 같음)
    const totalTested = pixels.length / 16; 
    const currentPercent = (transparentPixels / totalTested) * 100;

    if (currentPercent > 70) {
      onReveal(); 
    }
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    checkRevealPercentage(); 
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
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
      // 👇 [수정] cursor-none을 지웠습니다! 이제 기본 마우스가 보일 겁니다.
      className="absolute inset-0 z-20 touch-none cursor-crosshair" 
    />
  );
};

export default ScratchCanvas;