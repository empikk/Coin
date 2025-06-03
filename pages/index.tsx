import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getTickets, useTicket } from '@/lib/ticketManager';

export default function Home() {
  const router = useRouter();
  const [tickets, setTickets] = useState(5);

  useEffect(() => {
    setTickets(getTickets());
  }, []);

  const startGame = () => {
    if (useTicket()) {
      router.push('/game');
    } else {
      alert('Tiket habis! Coba lagi besok.');
    }
  };

  return (
    <div>
      <h1>Selamat datang di Coin Catcher!</h1>
      <p>Tiket tersisa: {tickets}</p>
      <button onClick={startGame}>Mainkan Game</button>
    </div>
  );
}
