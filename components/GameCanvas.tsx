// components/GameCanvas.tsx (disingkat)
useEffect(() => {
  // ... game loop
  const update = () => {
    // Update posisi objek
    // Deteksi tabrakan dengan basket
    objectsRef.current.forEach((obj) => {
      const isCaught = ...; // hitbox
      if (isCaught) {
        if (obj.type === 'coin') setScore((prev) => prev + 10);
        if (obj.type === 'bomb') setIsGameOver(true);
      }
    });

    if (isGameOver || time <= 0) {
      updateScore(fid, score); // simpan skor ke Supabase
    }
  };

  const spawnObject = () => {
    objectsRef.current.push({ x: Math.random() * width, y: 0, type: Math.random() > 0.8 ? 'bomb' : 'coin' });
  };

  // Game loop, input handler, render canvas
}, []);
