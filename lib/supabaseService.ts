// lib/supabaseService.ts
import { supabase } from './supabase';

export async function upsertUser(fid: number, username: string) {
  return supabase
    .from('users')
    .upsert({ fid, username }, { onConflict: ['fid'] });
}

export async function checkAndResetTickets(fid: number) {
  const today = new Date().toISOString().split('T')[0];
  const { data } = await supabase.from('users').select('*').eq('fid', fid).single();
  if (data?.last_played !== today) {
    await supabase
      .from('users')
      .update({ tickets: 5, last_played: today })
      .eq('fid', fid);
  }
}

export async function consumeTicket(fid: number): Promise<boolean> {
  const { data } = await supabase.from('users').select('tickets').eq('fid', fid).single();
  if (!data || data.tickets <= 0) return false;

  await supabase
    .from('users')
    .update({ tickets: data.tickets - 1 })
    .eq('fid', fid);

  return true;
}

export async function updateScore(fid: number, newScore: number) {
  await supabase.from('users').update({ score: newScore }).eq('fid', fid);
}
