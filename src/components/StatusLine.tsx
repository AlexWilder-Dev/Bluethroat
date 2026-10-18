import type { Bar } from '../data/bluethroat';
import { barStatus, type LondonNow } from '../lib/time';

export function StatusLine({ bar, now, short = false }: { bar: Bar; now: LondonNow; short?: boolean }) {
  const st = barStatus(bar, now);
  if (st.open) {
    return (
      <span className="status is-open">
        <span className="status-dot" aria-hidden="true" />
        {short ? `Open · till ${st.closes}` : `Open now until ${st.closes}`}
      </span>
    );
  }
  return (
    <span className="status">
      <span className="status-dot" aria-hidden="true" />
      {short ? `Opens ${shortWhen(st.when)}` : `Opens ${st.when}`}
    </span>
  );
}

function shortWhen(when: string) {
  return when.replace('tonight at ', 'at ').replace(/^(\w{3})\w*day, /, '$1 ');
}
