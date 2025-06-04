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
        setTrack(null);
        setError('Nothing playing right now');
      } else {
        const data = await response.json();
        if (data.error) {
          console.error('Spotify API error:', data.error);
          setError(data.error.message);
        } else {
          // Only update if the data is different
          setTrack(prevTrack => {
            if (!prevTrack || !data.item || prevTrack.item.name !== data.item.name) {
              return data;
            }
            return prevTrack;
          });
          setError('');
        }
      }
    } catch (err) {
      console.error('Failed to fetch currently playing track:', err);
      setError('Failed to fetch currently playing track');
    } finally {
      setLoading(false);
      setLastUpdated(new Date());
    }
  }, []);

  useEffect(() => {
    fetchNowPlaying();
    // Refresh every 5 seconds
    const interval = setInterval(fetchNowPlaying, 5000);
    return () => clearInterval(interval);
  }, [fetchNowPlaying]);

  const handleManualRefresh = async () => {
    await fetchNowPlaying();
  };

  const LastUpdatedInfo = () => {
    if (!lastUpdated) return null;
    const timeAgo = Math.floor((new Date().getTime() - lastUpdated.getTime()) / 1000);
    return (
      <span className="text-xs text-gray-400">
        Updated {timeAgo < 60 ? `${timeAgo}s ago` : 'over 1m ago'}
      </span>
    );
  };

  if (loading) {
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
          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          disabled={loading}
        >
          Refresh
        </button>
      </div>

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
          className="flex items-center space-x-4 p-4 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
        >
          {track.item.album.images[0] && (
            <img
              src={track.item.album.images[0].url}
              alt={`${track.item.album.name} album art`}
              className="w-16 h-16 rounded shadow-sm"
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
  );
} 