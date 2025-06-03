import { useEffect, useRef, useState } from 'react';

type GameObject = {
  x: number;
  y: number;
  type: 'coin' | 'bomb';
};

const GamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [remainingTime, setRemainingTime] = useState(30);
  const basketRef = useRef({ x: 150 });
  const objectsRef = useRef<GameObject[]>([]);
  const gameInterval = useRef<NodeJS.Timeout>();

  const basketWidth = 60;
  const basketHeight = 20;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const width = 400;
    const height = 400;

    const draw = () => {
      if (!context) return;
      context.clearRect(0, 0, width, height);

      // draw basket
      context.fillStyle = 'blue';
      context.fillRect(basketRef.current.x, height - 30, basketWidth, basketHeight);

      // draw falling objects
      objectsRef.current.forEach((obj) => {
        context.fillStyle = obj.type === 'coin' ? 'gold' : 'red';
        context.beginPath();
        context.arc(obj.x, obj.y, 10, 0, Math.PI * 2);
        context.fill();
      });
    };

    const update = () => {
      objectsRef.current = objectsRef.current
        .map((obj) => ({ ...obj, y: obj.y + 5 }))
        .filter((obj) => obj.y < height);

      // Collision detection
      objectsRef.current.forEach((obj) => {
        const isCaught =
          obj.y > height - 40 &&
          obj.x > basketRef.current.x &&
          obj.x < basketRef.current.x + basketWidth;
        if (isCaught) {
          if (obj.type === 'coin') {
            setScore((prev) => prev + 10);
          } else if (obj.type === 'bomb') {
            setIsGameOver(true);
          }
          obj.y = height + 100; // Remove from screen
        }
      });

      draw();
    };

    // Add random object
    const spawnObject = () => {
      const type = Math.random() < 0.8 ? 'coin' : 'bomb';
      objectsRef.current.push({
        x: Math.random() * (width - 20),
        y: 0,
        type,
      });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') basketRef.current.x -= 20;
      if (e.key === 'ArrowRight') basketRef.current.x += 20;
    };

    window.addEventListener('keydown', handleKeyDown);

    const loop = () => {
      update();
      if (!isGameOver) {
        requestAnimationFrame(loop);
      }
    };

    spawnObject();
    const spawnInterval = setInterval(spawnObject, 800);
    gameInterval.current = setInterval(() => {
      setRemainingTime((t) => t - 1);
    }, 1000);

    loop();

    return () => {
      clearInterval(spawnInterval);
      clearInterval(gameInterval.current!);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isGameOver]);

  useEffect(() => {
    if (remainingTime <= 0 || isGameOver) {
      setIsGameOver(true);
    }
  }, [remainingTime]);

  return (
    <div>
      <h1>Coin Catcher</h1>
      <p>Score: {score}</p>
      <p>Time Left: {remainingTime}s</p>
      {isGameOver && <h2>Game Over!</h2>}
      <canvas ref={canvasRef} width={400} height={400} style={{ border: '1px solid black' }} />
    </div>
  );
};

export default GamePage;
