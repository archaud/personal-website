import dynamic from 'next/dynamic';

const SpotifyNowPlaying = dynamic(() => import('./components/SpotifyNowPlaying'), {
  ssr: false,
});

// This is the main homepage component
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 transition-colors">
      <section className="max-w-3xl mx-auto">
        {/* Header section with title and description */}
        <header className="mb-16">
          <h1 className="text-4xl font-bold mb-2 text-blue-600 dark:text-blue-400">Hi, I'm Arun</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">[insert here]</p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          <ul className="space-y-4">
            <p className="text-lg text-gray-600 dark:text-gray-300">Go Bills & eating chicken wings</p>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Projects & Experiences</h2>
          <ul className="space-y-4">
            <li className="border dark:border-gray-700 p-4 rounded-xl shadow-sm bg-white dark:bg-gray-800">
              <h3 className="text-xl font-medium dark:text-white">Project One</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Coming soon.</p>
            </li>
            <li className="border dark:border-gray-700 p-4 rounded-xl shadow-sm bg-white dark:bg-gray-800">
              <h3 className="text-xl font-medium dark:text-white">Project Two</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Coming soon.</p>
            </li>
          </ul>
        </section>

        {/* Footer section with social media links and Spotify widget */}
        <footer className="mt-16">
          <div className="flex items-center justify-between animate-fade-in">
            <div className="flex space-x-4">
              <a
                href="https://x.com/arunchaudhuri_"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:opacity-80 transition-opacity"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-8 w-8 fill-current text-gray-600 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300"
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
                  className="h-8 w-8 fill-current text-gray-600 dark:text-gray-400 hover:text-[#229ED9] dark:hover:text-[#229ED9]"
                  aria-hidden="true"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
            </div>
            <div className="w-64">
              <SpotifyNowPlaying />
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}
