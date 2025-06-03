// components/FarcasterLogin.tsx
import { NeynarProvider, useFarcasterIdentity } from '@neynar/react';
import { upsertUser } from '@/lib/supabaseService';

export default function FarcasterLogin({ onLogin }: { onLogin: (fid: number) => void }) {
  const { identity, login, logout } = useFarcasterIdentity();

  if (!identity) return <button onClick={login}>Login with Warpcast</button>;

  // Save user to Supabase
  upsertUser(identity.fid, identity.username).then(() => onLogin(identity.fid));

  return (
    <div>
      <p>Welcome {identity.username}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
