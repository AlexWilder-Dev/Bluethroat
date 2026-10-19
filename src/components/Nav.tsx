import { Link, NavLink } from 'react-router-dom';
import { BarSwitch } from './BarSwitch';
import { Wordmark } from './Wordmark';

const links = [
  { to: '/', label: 'Tonight' },
  { to: '/menu', label: 'Menu' },
  { to: '/visit', label: 'Visit' },
  { to: '/private-hire', label: 'Private hire', short: 'Hire' },
];

export function TopBar() {
  return (
    <header className="masthead">
      <Link to="/" className="masthead-brand" aria-label="Bluethroat, tonight">
        <Wordmark />
      </Link>
      <nav className="masthead-nav" aria-label="Main">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.to === '/'}>
            {l.label}
          </NavLink>
        ))}
      </nav>
      <BarSwitch />
    </header>
  );
}

export function TabBar() {
  return (
    <nav className="tabbar" aria-label="Main">
      {links.map((l) => (
        <NavLink key={l.to} to={l.to} end={l.to === '/'} className="tab">
          {l.short ?? l.label}
        </NavLink>
      ))}
    </nav>
  );
}
