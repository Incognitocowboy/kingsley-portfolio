import { useEffect } from 'react';
import { beatListeners } from './audio/engine';
import { setTheme } from './theme';
import { useEngine } from './useEngine';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Decks from './components/Decks';
import Projects from './components/Projects';
import Experience from './components/Experience';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  // On air (any deck playing) = light mode, off air = dark mode.
  const { A, B } = useEngine();
  const live = A || B;
  useEffect(() => { setTheme(live); }, [live]);

  // Scroll-reveal for every element with the "reveal" class.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { threshold: 0.2 },
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Pulse the hero on every beat.
  useEffect(() => {
    const onBeat = () => { document.body.classList.remove('beat'); void document.body.offsetWidth; document.body.classList.add('beat'); };
    beatListeners.add(onBeat);
    return () => { beatListeners.delete(onBeat); };
  }, []);

  return (
    <>
      <Cursor />
      <Nav />
      <Hero />
      <Marquee />
      <Decks />
      <Projects />
      <Experience />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
