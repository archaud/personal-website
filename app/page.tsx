'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import { useTheme } from './components/ThemeProvider';
import Link from 'next/link'

const SpotifyNowPlaying = dynamic(() => import('./components/SpotifyNowPlaying'), {
  ssr: false,
});

// This is the main homepage component
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    // Show loading screen for 2.5 seconds
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    // Mount content after loading is complete
    const mountTimer = setTimeout(() => {
      setIsMounted(true);
    }, 3000);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(mountTimer);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <LoadingScreen isLoading={isLoading} />
      <div
        className={`fixed top-4 right-4 z-[100] transition-all duration-500 ease-in-out ${!isLoading && isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
      >
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all duration-500 ease-in-out hover:scale-110"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <svg className="w-6 h-6 text-yellow-500 transition-transform duration-500 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-gray-900 transition-transform duration-500 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>
      </div>
      <main className={`min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-8 transition-all duration-500 ease-in-out ${!isLoading && isMounted ? 'opacity-100' : 'opacity-0'}`}>
        <section className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6 sm:gap-0">
            <div className="flex-1 text-center sm:text-left">
              {/* Header section with title and description */}
              <header className="mb-8 sm:mb-16">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-600 dark:text-gray-400">Hi, I'm Arun</h1>
                <p className="text-base sm:text-lg text-gray-400 dark:text-gray-500 italic">lets chat: <a href="mailto:chaudhuri.arunabh@gmail.com" className="underline hover:no-underline">email</a> / <a href="https://calendly.com/arun-npcgroup/30min" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">find time</a></p>
              </header>
            </div>
            <div className="transition-opacity duration-500 ease-in-out" style={{ opacity: isMounted ? 1 : 0 }}>
              <Image
                src="/images/memoji.png"
                alt="Arun's Memoji"
                width={80}
                height={80}
                className="rounded-full"
                priority
              />
            </div>
          </div>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">About Me</h2>
            <ul className="space-y-4">
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">Living in NYC and working in crypto.
                <br /> Love the Bills and <a href="https://www.instagram.com/nycwingtrail/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">chicken wings</a>
                .<br />
                Spend my free time exploring restaurants, traveling, and trying new beers.
              </p>
            </ul>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 dark:text-white">Experiences</h2>
            <div className="space-y-2 text-base sm:text-lg text-gray-600 dark:text-gray-300">
              <p>Currently cooking on prediction markets with <a href="https://www.competi.com/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Competi</a>.</p>
              <p>Got into crypto working with <a href="https://npcgroup.xyz/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">NPC Group</a> (Polygon Labs)
                and <a href="https://bharvest.io/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">B-Harvest</a>.</p>
              <p>Before crypto was on product teams at AMEX and Apple.</p>
              <p>Learned how to have fun at Cornell University.</p>
            </div>
          </section>

          {/* Footer section with social media links and Spotify widget */}
          <footer className="mt-8 sm:mt-16">
            <div className={`flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8 sm:gap-0 transition-opacity duration-500 ease-in-out ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
              <div className="text-center sm:text-left">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">socials</h3>
                <div className="flex space-x-4 justify-center sm:justify-start">
                  <a
                    href="https://x.com/arunchaudhuri_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block hover:opacity-80 transition-opacity"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 sm:h-8 w-6 sm:w-8 fill-current text-gray-600 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300"
                      aria-hidden="true"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>

                  <a
                    href="https://t.me/arunchaudhuri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block hover:opacity-80 transition-opacity"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 sm:h-8 w-6 sm:w-8 fill-current text-gray-600 dark:text-gray-400 hover:text-[#229ED9] dark:hover:text-[#229ED9]"
                      aria-hidden="true"
                    >
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </a>

                  <a
                    href="https://arunchaudhuri.substack.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block hover:opacity-80 transition-opacity"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 sm:h-8 w-6 sm:w-8 fill-current text-gray-600 dark:text-gray-400 hover:text-[#FF6719] dark:hover:text-[#FF6719]"
                      aria-hidden="true"
                    >
                      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24h21.08V10.812H1.46zm2.836 2.836h2.836v1.418H4.296v-1.418zm5.672 0h2.836v1.418H9.968v-1.418zm5.672 0h2.836v1.418h-2.836v-1.418zM1.46 3.988V0h21.08v3.988H1.46z" />
                    </svg>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/arunabh-chaudhuri/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block hover:opacity-80 transition-opacity"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 sm:h-8 w-6 sm:w-8 fill-current text-gray-600 dark:text-gray-400 hover:text-[#0077B5] dark:hover:text-[#0077B5]"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="w-full sm:w-64">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 text-center sm:text-left">what i'm listening to</h3>
                <SpotifyNowPlaying />
              </div>
            </div>
          </footer>
        </section>
      </main>
    </div >
  );
}
