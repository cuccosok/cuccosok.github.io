import { useEffect, useRef, type ReactNode } from 'react';
import cyberBg from '@/assets/cyber-bg.png';

const sceneFrameClass = "absolute left-1/2 top-1/2 h-[max(66.6667vw,100vh)] w-[max(100vw,150vh)] -translate-x-1/2 -translate-y-1/2 [container-type:inline-size]";

function CSSRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const drops: { x: number; y: number; speed: number; length: number; opacity: number }[] = [];
    for (let i = 0; i < 300; i++) {
      drops.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        speed: 2 + Math.random() * 5,
        length: 10 + Math.random() * 20,
        opacity: 0.2 + Math.random() * 0.4,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const drop of drops) {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.strokeStyle = `rgba(5, 242, 219, ${drop.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        drop.y += drop.speed;
        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[2] pointer-events-none"
    />
  );
}

interface IntroSceneProps {
  children?: ReactNode;
}

export default function IntroScene({ children }: IntroSceneProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background image with edge fade */}
      <div className={`${sceneFrameClass} z-[1]`}>
        <img
          src={cyberBg}
          alt=""
          className="h-full w-full object-fill"
        />
        {/* Edge fade overlay - vignette effect */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at center, transparent 30%, hsl(184 95% 7%) 85%),
              linear-gradient(to top, hsl(184 95% 7%) 0%, transparent 15%),
              linear-gradient(to bottom, hsl(184 95% 7%) 0%, transparent 15%),
              linear-gradient(to left, hsl(184 95% 7%) 0%, transparent 10%),
              linear-gradient(to right, hsl(184 95% 7%) 0%, transparent 10%)
            `,
          }}
        />
      </div>

      {/* CSS Rain on top */}
      <CSSRain />

      <div className={`${sceneFrameClass} z-[3] pointer-events-none`}>
        {children}
      </div>
    </div>
  );
}
