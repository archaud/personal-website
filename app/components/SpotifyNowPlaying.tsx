'use client';

import { useEffect, useState, useCallback } from 'react';

interface SpotifyTrack {
  item: {
    name: string;
    artists: Array<{ name: string }>;
    album: {
      name: string;
      images: Array<{ url: string }>;
    };
    external_urls: {
      spotify: string;
    };
  };
  is_playing: boolean;
  progress_ms: number;
  timestamp: number;
}

export default function SpotifyNowPlaying() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [timeAgo, setTimeAgo] = useState<number>(0);

  const fetchNowPlaying = useCallback(async () => {
    try {
      setLoading(true);
      // Add timestamp to prevent caching
      const response = await fetch(`/api/spotify?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });

      if (response.status === 204) {
        setIsTransitioning(true);
        setTimeout(() => {
          setTrack(null);
          setError('Nothing playing right now');
          setIsTransitioning(false);
        }, 300);
      } else {
        const data = await response.json();
        if (data.error) {
          console.error('Spotify API error:', data.error);
          setIsTransitioning(true);
          setTimeout(() => {
            setError(data.error.message);
            setIsTransitioning(false);
          }, 300);
        } else {
          // Only update if the data is different
          setTrack(prevTrack => {
            if (!prevTrack || !data.item || prevTrack.item.name !== data.item.name) {
              setIsTransitioning(true);
              setTimeout(() => {
                setIsTransitioning(false);
              }, 300);
              return data;
            }
            return prevTrack;
          });
          setError('');
        }
      }
    } catch (err) {
      console.error('Failed to fetch currently playing track:', err);
      setIsTransitioning(true);
      setTimeout(() => {
        setError('Failed to fetch currently playing track');
        setIsTransitioning(false);
      }, 300);
    } finally {
      setLoading(false);
      setLastUpdated(new Date());
    }
  }, []);

  useEffect(() => {
    fetchNowPlaying();
    // Refresh every 30 seconds
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, [fetchNowPlaying]);

  // Add a new useEffect for updating the time ago
  useEffect(() => {
    if (!lastUpdated) return;

    const updateTimeAgo = () => {
      const seconds = Math.floor((new Date().getTime() - lastUpdated.getTime()) / 1000);
      setTimeAgo(seconds);
    };

    // Update immediately
    updateTimeAgo();

    // Then update every second
    const interval = setInterval(updateTimeAgo, 1000);
    return () => clearInterval(interval);
  }, [lastUpdated]);

  const handleManualRefresh = async () => {
    await fetchNowPlaying();
  };

  const LastUpdatedInfo = () => {
    if (!lastUpdated) return null;
    return (
      <span className="text-xs text-gray-400">
        Updated {timeAgo < 60 ? `${timeAgo}s ago` : 'over 1m ago'}
      </span>
    );
  };

  if (loading && !track) {
    return (
      <div className="animate-pulse flex items-center space-x-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <LastUpdatedInfo />
        <button
          onClick={handleManualRefresh}
          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
          disabled={loading}
        >
          Refresh
        </button>
      </div>

      <div className={`transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {error && !track ? (
          <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            <span className="text-gray-500 dark:text-gray-400">{error}</span>
          </div>
        ) : track?.item ? (
          <a
            href={track.item.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-4 p-4 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300"
          >
            {track.item.album.images[0] && (
              <img
                src={track.item.album.images[0].url}
                alt={`${track.item.album.name} album art`}
                className="w-16 h-16 rounded shadow-sm transition-transform duration-300 hover:scale-105"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {track.item.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {track.item.artists.map(artist => artist.name).join(', ')}
              </p>
              <div className="flex items-center mt-1">
                <svg className="w-4 h-4 text-green-500 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="8" />
                </svg>
                <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                  Playing on Spotify
                </span>
              </div>
            </div>
          </a>
        ) : null}
      </div>
    </div>
  );
} 