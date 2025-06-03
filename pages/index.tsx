// pages/index.tsx
import { useState } from 'react';
import FarcasterLogin from '@/components/FarcasterLogin';
import { checkAndResetTickets, consumeTicket } from '@/lib/supabaseService';
import { useRouter } from 'next/router';

export default function HomePage() {
  const [fid, setFid] = useState<number | null>(null);
  const router = useRouter();

  const handleStart = async () => {
    if (!fid) return;

    await checkAndResetTickets(fid);
    const allowed = await consumeTicket(fid);
    if (allowed) router.push(`/game?fid=${fid}`);
    else alert('Tiket habis!');
  };

  return (
    <div>
      <h1>Coin Catcher</h1>
      <FarcasterLogin onLogin={setFid} />
      {fid && <button onClick={handleStart}>Main</button>}
    </div>
  );
}
