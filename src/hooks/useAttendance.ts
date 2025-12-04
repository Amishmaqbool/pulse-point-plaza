import { useState, useEffect } from 'react';

export interface TimeEntry {
  id: string;
  date: string;
  clockIn: string | null;
  clockOut: string | null;
  totalHours: number | null;
  notes: string;
}

const STORAGE_KEY = 'stellarstack-attendance';

export function useAttendance() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [todayEntry, setTodayEntry] = useState<TimeEntry | null>(null);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as TimeEntry[];
      setEntries(parsed);
      const todayRecord = parsed.find(e => e.date === today);
      setTodayEntry(todayRecord || null);
    }
  }, [today]);

  const saveEntries = (newEntries: TimeEntry[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newEntries));
    setEntries(newEntries);
  };

  const clockIn = () => {
    const now = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    
    if (todayEntry) {
      const updated = entries.map(e => 
        e.date === today ? { ...e, clockIn: now } : e
      );
      saveEntries(updated);
      setTodayEntry({ ...todayEntry, clockIn: now });
    } else {
      const newEntry: TimeEntry = {
        id: crypto.randomUUID(),
        date: today,
        clockIn: now,
        clockOut: null,
        totalHours: null,
        notes: '',
      };
      const updated = [...entries, newEntry];
      saveEntries(updated);
      setTodayEntry(newEntry);
    }
  };

  const clockOut = () => {
    if (!todayEntry?.clockIn) return;
    
    const now = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    const [inHour, inMin] = todayEntry.clockIn.split(':').map(Number);
    const [outHour, outMin] = now.split(':').map(Number);
    
    const totalMinutes = (outHour * 60 + outMin) - (inHour * 60 + inMin);
    const totalHours = Math.round((totalMinutes / 60) * 100) / 100;

    const updated = entries.map(e => 
      e.date === today ? { ...e, clockOut: now, totalHours } : e
    );
    saveEntries(updated);
    setTodayEntry({ ...todayEntry, clockOut: now, totalHours });
  };

  const updateNotes = (date: string, notes: string) => {
    const updated = entries.map(e => 
      e.date === date ? { ...e, notes } : e
    );
    saveEntries(updated);
    if (date === today) {
      setTodayEntry(prev => prev ? { ...prev, notes } : null);
    }
  };

  const getWeeklyHours = () => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    return entries
      .filter(e => new Date(e.date) >= weekAgo && e.totalHours)
      .reduce((sum, e) => sum + (e.totalHours || 0), 0);
  };

  return {
    entries,
    todayEntry,
    clockIn,
    clockOut,
    updateNotes,
    getWeeklyHours,
    isClockedIn: !!todayEntry?.clockIn && !todayEntry?.clockOut,
  };
}
