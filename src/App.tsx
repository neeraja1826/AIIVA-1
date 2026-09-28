import React from 'react';
import { MotionConfig } from 'framer-motion';
import { Nav } from './components/Nav';
import { Hero } from './components/hero/Hero';
import { Intro } from './components/Intro';
import { HowItWorks } from './components/how/HowItWorks';
import { Showcase } from './components/showcase/Showcase';
import { Products } from './components/Products';
import { AutomateGrid } from './components/AutomateGrid';
import { Scenes } from './components/scenes/Scenes';
import { Ecosystem } from './components/Ecosystem';
import { Benefits } from './components/Benefits';
import { Journey } from './components/Journey';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { useSmoothScroll } from './hooks/useSmoothScroll';

export function App() {
  useSmoothScroll();

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen w-full bg-ink font-sans text-bone antialiased">
        <Nav />
        <main>
          <Hero />
          <Intro />
          <HowItWorks />
          <Showcase />
          <Products />
          <AutomateGrid />
          <Scenes />
          <Ecosystem />
          <Benefits />
          <Journey />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}