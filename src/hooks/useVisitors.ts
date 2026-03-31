import { useState, useEffect } from 'react';

interface Visitor {
  email: string;
  timestamp: number;
}

export function useVisitors() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [stats, setStats] = useState<{ count: number }>({ count: 0 });


  useEffect(() => {
    try {
      const data = localStorage.getItem('portfolioVisitors');
      if (data) {
        const parsed: Visitor[] = JSON.parse(data);
        setVisitors(parsed);
        if (parsed.length > 0) {
          setStats({ count: parsed.length });
        }

      }
    } catch {
      console.error('Failed to load visitors');
    }
  }, []);

  const hasVisited = (): boolean => {
    try {
      return localStorage.getItem('hasVisitedPortfolio') === 'true';
    } catch {
      return false;
    }
  };

  const setFirstVisitEmail = (email: string): boolean => {
    if (!email || !email.includes('@')) return false;
    try {
      // Set flag
      localStorage.setItem('hasVisitedPortfolio', 'true');
      // Record visitor
      const newVisitor: Visitor = { email, timestamp: Date.now() };
      const updated = [...visitors, newVisitor];
      localStorage.setItem('portfolioVisitors', JSON.stringify(updated));
      setVisitors(updated);
      setStats({ count: updated.length });
      return true;
    } catch {
      return false;
    }
  };

  return { stats, hasVisited, setFirstVisitEmail };

}

