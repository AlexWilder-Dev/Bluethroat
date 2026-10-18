import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { bars, type Bar, type BarId } from '../data/bluethroat';
import { londonNow, type LondonNow } from '../lib/time';

const KEY = 'bluethroat.bar';

interface BarState {
  barId: BarId;
  bar: Bar;
  /** False until the visitor has picked an arch themselves. */
  chosen: boolean;
  setBar: (id: BarId) => void;
  now: LondonNow;
}

const Ctx = createContext<BarState | null>(null);

function readStored(): BarId | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'deptford' || v === 'brixton' ? v : null;
  } catch {
    return null;
  }
}

export function BarProvider({ children }: { children: ReactNode }) {
  const stored = readStored();
  const [barId, setBarId] = useState<BarId>(stored ?? 'deptford');
  const [chosen, setChosen] = useState(stored !== null);
  const [now, setNow] = useState(londonNow);

  // Keep "open now" honest if the page is left open across the evening.
  useEffect(() => {
    const t = window.setInterval(() => setNow(londonNow()), 30_000);
    return () => window.clearInterval(t);
  }, []);

  const setBar = useCallback((id: BarId) => {
    setBarId(id);
    setChosen(true);
    try {
      localStorage.setItem(KEY, id);
    } catch {
      /* private mode: the choice just won't persist */
    }
  }, []);

  return <Ctx.Provider value={{ barId, bar: bars[barId], chosen, setBar, now }}>{children}</Ctx.Provider>;
}

export function useBar(): BarState {
  const v = useContext(Ctx);
  if (!v) throw new Error('useBar outside BarProvider');
  return v;
}
