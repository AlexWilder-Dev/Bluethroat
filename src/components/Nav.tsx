import { NavLink, Link } from 'react-router-dom';
import { BarSwitch } from './BarSwitch';
import { Wordmark } from './Wordmark';
import { IconArch, IconCoupe, IconKey, IconPin } from './Icons';

const links = [
  { to: '/', label: 'Tonight', icon: <IconArch /> },
  { to: '/menu', label: 'Menu', icon: <IconCoupe /> },
  { to: '/visit', label: 'Visit', icon: <IconPin /> },
  { to: '/private-hire', label: 'Private hire', short: 'Hire', icon: <IconKey /> },
];

export function TopBar() {
  return (
    <header className="topbar">
      <Link to="/" className="topbar-brand" aria-label="Bluethroat, tonight">
        <Wordmark />
      </Link>
      <nav className="topbar-nav" aria-label="Main">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.to === '/'}>
            {l.label}
          </NavLink>
        ))}
      </nav>
      <BarSwitch id="top" />
    </header>
  );
}

export function TabBar() {
  return (
    <nav className="tabbar" aria-label="Main">
      {links.map((l) => (
        <NavLink key={l.to} to={l.to} end={l.to === '/'} className="tab">
          {l.icon}
          <span>{l.short ?? l.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
