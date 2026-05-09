
import React, { useEffect, useRef } from 'react';

const MoleculeBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width: number, height: number, molecules: Node[] = [], time = 0;

    class Node {
      x: number;
      yBase: number;
      offsetY: number;
      y: number;
      vx: number;
      color: string;
      radius: number;

      constructor(x: number, yBase: number, offset: number) {
        this.x = x;
        this.yBase = yBase;
        this.offsetY = offset;
        this.y = yBase + offset;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.color = '#22d3ee';
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        const waveY = Math.sin(this.x * 0.003 + time) * (height * 0.15);
        const bob = Math.sin(time * 2 + this.x) * 5;
        this.x += this.vx;
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        this.y = this.yBase + this.offsetY + waveY + bob;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const initNetwork = () => {
      molecules = [];
      const numNodes = Math.floor(width / 5); 
      for (let i = 0; i < numNodes; i++) {
        const x = Math.random() * width;
        const centerY = height / 2;
        const sineOffset = Math.sin(x * 0.005) * (height * 0.2);
        const spread = (Math.random() - 0.5) * 200;
        molecules.push(new Node(x, centerY + sineOffset, spread));
      }
    };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNetwork();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.005;

      molecules.forEach(m => { m.update(); m.draw(); });

      ctx.lineWidth = 0.8;
      for (let i = 0; i < molecules.length; i++) {
        for (let j = i + 1; j < molecules.length; j++) {
          const dx = molecules[i].x - molecules[j].x;
          const dy = molecules[i].y - molecules[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - dist / 100) * 0.15})`;
            ctx.moveTo(molecules[i].x, molecules[i].y);
            ctx.lineTo(molecules[j].x, molecules[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default MoleculeBackground;
