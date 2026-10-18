import { MotionConfig } from 'framer-motion';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { BarProvider } from './state/bar';
import { TopBar, TabBar } from './components/Nav';
import { Footer } from './components/Footer';
import { Tonight } from './pages/Tonight';
import { MenuPage } from './pages/MenuPage';
import { Visit } from './pages/Visit';
import { Hire } from './pages/Hire';

const titles: Record<string, string> = {
  '/': 'Bluethroat · Cocktail bars in the railway arches of Deptford & Brixton',
  '/menu': 'Menu · Edition 12 · Bluethroat',
  '/visit': 'Visit · Hours, directions & house rules · Bluethroat',
  '/private-hire': 'Private hire · Bluethroat Deptford & Brixton',
};

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0 });
    document.title = titles[pathname] ?? titles['/'];
  }, [pathname, hash]);
  return null;
}

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BarProvider>
        <ScrollManager />
        <button type="button" className="skip" onClick={() => document.getElementById('main')?.focus()}>
          Skip to content
        </button>
        <TopBar />
        <main id="main" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Tonight />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/visit" element={<Visit />} />
            <Route path="/private-hire" element={<Hire />} />
            <Route path="*" element={<Tonight />} />
          </Routes>
        </main>
        <Footer />
        <TabBar />
      </BarProvider>
    </MotionConfig>
  );
}
