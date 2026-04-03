import { useEffect, useRef } from "react";

const SYMBOLS = ["₹", "$", "€", "💰", "📈", "📉", "💳", "🏦", "💵", "📊", "⚡", "💎"];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function ParticlesBackground({ darkMode }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 25 }, () => ({
      x: randomBetween(0, canvas.width),
      y: randomBetween(0, canvas.height),
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      size: randomBetween(14, 32),
      speedX: randomBetween(-0.4, 0.4),
      speedY: randomBetween(-0.6, -0.2),
      opacity: randomBetween(0.08, 0.25),
      rotation: randomBetween(0, 360),
      rotationSpeed: randomBetween(-0.5, 0.5),
    }));

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = darkMode ? "#030712" : "#f8fafc";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.font = `${p.size}px serif`;
        ctx.fillStyle = darkMode ? "#93c5fd" : "#3b82f6";
        ctx.fillText(p.symbol, 0, 0);
        ctx.restore();

        // Move
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Reset when off screen
        if (p.y < -50) {
          p.y = canvas.height + 50;
          p.x = randomBetween(0, canvas.width);
        }
        if (p.x < -50) p.x = canvas.width + 50;
        if (p.x > canvas.width + 50) p.x = -50;
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
}