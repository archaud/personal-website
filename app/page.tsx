'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import { useTheme } from './components/ThemeProvider';

const SpotifyNowPlaying = dynamic(() => import('./components/SpotifyNowPlaying'), {
  ssr: false,
});

function Divider() {
  return <hr className="receipt-divider" />;
}

function ReceiptLine({ left, right }: { left: string; right: string }) {
  return (
    <div className="receipt-line text-xs">
      <span className="whitespace-nowrap">{left}</span>
      <span className="leader" />
      <span className="whitespace-nowrap">{right}</span>
    </div>
  );
}

function Barcode() {
  const [bars, setBars] = useState(() => generateBars());

  function generateBars() {
    const pattern = [];
    for (let i = 0; i < 60; i++) {
      const height = Math.random() > 0.3 ? 40 + Math.random() * 10 : 25 + Math.random() * 15;
      const width = Math.random() > 0.5 ? 2 : 1;
      pattern.push({ height, width });
    }
    return pattern;
  }

  const shuffle = () => setBars(generateBars());

  return (
    <div className="barcode cursor-pointer" onClick={shuffle}>
      {bars.map((bar, i) => (
        <div
          key={i}
          className="bar"
          style={{
            height: bar.height,
            width: bar.width,
            transition: 'height 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transitionDelay: `${i * 8}ms`,
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).toUpperCase();
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).toUpperCase();

  useEffect(() => {
    const loadingTimer = setTimeout(() => setIsLoading(false), 2000);
    const mountTimer = setTimeout(() => setIsMounted(true), 2500);
    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(mountTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 transition-colors duration-500">
      <LoadingScreen isLoading={isLoading} />

      {/* Theme toggle */}
      <div className={`fixed top-4 right-4 z-[100] transition-all duration-500 ${!isLoading && isMounted ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={toggleDarkMode}
          className="text-xs font-mono text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
          aria-label="Toggle dark mode"
        >
          [{isDarkMode ? 'LIGHT' : 'DARK'}]
        </button>
      </div>

      <main className={`py-8 sm:py-16 px-4 transition-opacity duration-500 ${!isLoading && isMounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="receipt receipt-print">
          {/* Header / Store Name */}
          <div className="text-center mb-4">
            <img src="/images/memoji.png" alt="Arun" className="w-16 h-16 mx-auto mb-1 rounded-full" />
            <h1 className="text-2xl font-bold tracking-wider">ARUN CHAUDHURI</h1>
            <p className="text-xs tracking-widest mt-1">I like restaurants so I made a receipt</p>
            <p className="text-xs mt-1 opacity-60">NEW YORK, NY</p>
          </div>

          <Divider />

          {/* Receipt metadata */}
          <div className="text-xs space-y-0.5">
            <div className="flex justify-between">
              <span>DATE: {dateStr}</span>
              <span>TIME: {timeStr}</span>
            </div>
            <div className="flex justify-between">
              <span>RECEIPT: #AC-716</span>
              <span>TABLE: 01</span>
            </div>
            <div className="flex justify-between">
              <span>SERVER: ARUN</span>
              <span>GUESTS: 01</span>
            </div>
          </div>

          <Divider />

          {/* About / Quote */}
          <div className="my-4">
            <p className="text-xs italic leading-relaxed">
              Living in NYC and working in crypto.
              Love the{' '}
              <a href="https://www.buffalobills.com/" target="_blank" rel="noopener noreferrer">
                Buffalo Bills
              </a>{' '}
              and{' '}
              <a href="https://www.instagram.com/nycwingtrail/" target="_blank" rel="noopener noreferrer">
                chicken wings
              </a>
              . Spend my free time exploring restaurants,
              traveling, and trying new beers.
            </p>
          </div>

          <Divider />

          {/* Contact / Specialties */}
          <div className="my-4">
            <h2 className="text-sm font-bold tracking-wider mb-3">CONTACT</h2>
            <div className="space-y-1">
              <a href="mailto:chaudhuri.arunabh@gmail.com">
                <ReceiptLine left="EMAIL" right="chaudhuri.arunabh@gmail.com" />
              </a>
              <a href="https://calendly.com/arun-npcgroup/30min" target="_blank" rel="noopener noreferrer">
                <ReceiptLine left="CALENDLY" right="book 30 min" />
              </a>
              <a href="/images/Arun_Resume.pdf" target="_blank" rel="noopener noreferrer">
                <ReceiptLine left="RESUME" right="download pdf" />
              </a>
            </div>
          </div>

          <Divider />

          {/* Order History / Experience */}
          <div className="my-4">
            <h2 className="text-sm font-bold tracking-wider mb-3">EXPERIENCE</h2>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold">
                  <span>PALATE</span>
                  <span>PRESENT</span>
                </div>
                <p className="text-xs opacity-60">Founder</p>
                <p className="text-xs italic mt-1 leading-relaxed">
                  Redefining restaurant discovery |{' '}
                  <a href="https://www.yourpalate.app/" target="_blank" rel="noopener noreferrer">
                    yourpalate.app
                  </a>
                </p>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold">
                  <span>COMPETI</span>
                  <span>PRESENT</span>
                </div>
                <p className="text-xs opacity-60">COO</p>
                <p className="text-xs italic mt-1 leading-relaxed">
                  Cooking on prediction markets |{' '}
                  <a href="https://www.competi.com/" target="_blank" rel="noopener noreferrer">
                    competi.com
                  </a>
                </p>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold">
                  <span>NPC GROUP (POLYGON LABS)</span>
                  <span>2025</span>
                </div>
                <p className="text-xs opacity-60">Product</p>
                <p className="text-xs italic mt-1 leading-relaxed">
                  Got into crypto here |{' '}
                  <a href="https://npcgroup.xyz/" target="_blank" rel="noopener noreferrer">
                    npcgroup.xyz
                  </a>
                </p>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold">
                  <span>B-HARVEST</span>
                  <span>2025</span>
                </div>
                <p className="text-xs opacity-60">Product</p>
                <p className="text-xs italic mt-1 leading-relaxed">
                  Focused on BD + Hyperliquid eco |{' '}
                  <a href="https://bharvest.io/" target="_blank" rel="noopener noreferrer">
                    bharvest.io
                  </a>
                </p>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold">
                  <span>AMEX</span>
                  <span>2022-24</span>
                </div>
                <p className="text-xs opacity-60">Product</p>
                <p className="text-xs italic mt-1 leading-relaxed">
                  Restructured AR platform for{' '}
                  <a href="https://www.americanexpress.com/en-ca/charge-cards/aeroplan-card/" target="_blank" rel="noopener noreferrer">
                    Aeroplan Card
                  </a>
                </p>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold">
                  <span>APPLE</span>
                  <span>2021</span>
                </div>
                <p className="text-xs opacity-60">Product</p>
                <p className="text-xs italic mt-1 leading-relaxed">
                  Helped ship{' '}
                  <a href="https://www.apple.com/newsroom/2021/10/introducing-the-next-generation-of-airpods/" target="_blank" rel="noopener noreferrer">
                    AirPods 3
                  </a>
                </p>
              </div>
            </div>
          </div>

          <Divider />

          {/* Education */}
          <div className="my-4">
            <ReceiptLine left="EDUCATION" right="CORNELL UNIVERSITY" />
          </div>

          <Divider />

          {/* Totals */}
          <div className="my-4 text-xs space-y-1">
            <ReceiptLine left="HOMETOWN" right="BUFFALO" />
            <ReceiptLine left="GO BILLS" right="716" />
            <ReceiptLine left="GRATUITY (BEERS)" right="INCLUDED" />
          </div>

          <Divider />

          {/* Now Playing */}
          <div className="my-4">
            <p className="text-xs font-bold tracking-wider mb-2">NOW PLAYING IN THE KITCHEN</p>
            <SpotifyNowPlaying />
          </div>

          <Divider />

          {/* Socials */}
          <div className="my-4 text-center">
            <p className="text-xs font-bold tracking-widest mb-3">THANK YOU FOR VISITING!</p>
            <div className="flex justify-center gap-4 text-xs">
              <a href="https://x.com/arunchaudhuri_" target="_blank" rel="noopener noreferrer">
                TWITTER
              </a>
              <a href="https://t.me/arunchaudhuri" target="_blank" rel="noopener noreferrer">
                TELEGRAM
              </a>
              <a href="https://arunchaudhuri.substack.com/" target="_blank" rel="noopener noreferrer">
                SUBSTACK
              </a>
              <a href="https://www.linkedin.com/in/arunabh-chaudhuri/" target="_blank" rel="noopener noreferrer">
                LINKEDIN
              </a>
            </div>
          </div>

          {/* Barcode */}
          <Barcode />
          <p className="text-center text-xs opacity-40 tracking-[0.3em]">
            0727200027210
          </p>

        </div>
      </main>
    </div>
  );
}
