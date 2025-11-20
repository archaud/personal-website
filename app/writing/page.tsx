'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';

// Array of Substack article embed HTML strings
// Add your Substack article embeds here
const substackArticles = [
  {
    embedHtml: `<div class="substack-post-embed"><p lang="en">the finance bro summer confessional  by Ochuko Akpovbovbo</p><p>+ coperni is now a fashion-as-skincare athleisure brand</p><a data-post-link href="https://asseenonbyochuko.substack.com/p/the-finance-bro-summer-confessional">Read on Substack</a></div>`,
  },
  // Add more articles here by copying the embed HTML from Substack
  // Example:
  // {
  //   embedHtml: `<div class="substack-post-embed"><p lang="en">Your article title</p><a data-post-link href="https://your-substack.substack.com/p/article-slug">Read on Substack</a></div>`,
  // },
];

export default function WritingPage() {
  useEffect(() => {
    // Re-initialize Substack embeds after script loads
    if (typeof window !== 'undefined' && (window as any).SubstackEmbed) {
      (window as any).SubstackEmbed.init();
    }
  }, []);

  return (
    <>
      <Script
        src="https://substack.com/embedjs/embed.js"
        strategy="afterInteractive"
        charSet="utf-8"
        onLoad={() => {
          // Initialize embeds after script loads
          if (typeof window !== 'undefined' && (window as any).SubstackEmbed) {
            (window as any).SubstackEmbed.init();
          }
        }}
      />
      <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-24 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="max-w-7xl w-full">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 dark:text-white">Writing</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {substackArticles.map((article, index) => (
              <article
                key={index}
                className="substack-article-card"
              >
                <div
                  className="substack-embed-wrapper"
                  dangerouslySetInnerHTML={{ __html: article.embedHtml }}
                />
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
} 