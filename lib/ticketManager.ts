export const getTodayKey = () => {
  const today = new Date();
  return `tickets_${today.toISOString().split('T')[0]}`;
};

export const getTickets = (): number => {
  const key = getTodayKey();
  const stored = localStorage.getItem(key);
  return stored ? parseInt(stored, 10) : 5;
};

export const useTicket = (): boolean => {
  const key = getTodayKey();
  const current = getTickets();
  if (current <= 0) return false;
  localStorage.setItem(key, (current - 1).toString());
  return true;
};
