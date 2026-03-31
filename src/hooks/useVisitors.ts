import { useState, useEffect } from 'react';

interface Visitor {
  email: string;
  timestamp: number;
}

export function useVisitors() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [stats, setStats] = useState<{ count: number; lastVisit?: string }>({ count: 0 });

  useEffect(() => {
    try {
      const data = localStorage.getItem('portfolioVisitors');
      if (data) {
        const parsed: Visitor[] = JSON.parse(data);
        setVisitors(parsed);
        if (parsed.length > 0) {
          const last = parsed[parsed.length - 1];
          const date = new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }).format(new Date(last.timestamp));
          setStats({ count: parsed.length, lastVisit: date });
        }
      }
    } catch {
      console.error('Failed to load visitors');
    }
  }, []);

  const recordVisit = (email: string) => {
    if (!email || !email.includes('@')) return false;
    try {
      const newVisitor: Visitor = { email, timestamp: Date.now() };
      const updated = [...visitors, newVisitor];
      localStorage.setItem('portfolioVisitors', JSON.stringify(updated));
      setVisitors(updated);
      const date = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(newVisitor.timestamp));
      setStats({ count: updated.length, lastVisit: date });
      return true;
    } catch {
      return false;
    }
  };

  return { stats, recordVisit };
}

