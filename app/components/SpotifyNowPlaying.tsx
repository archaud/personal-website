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
  const [isTransitioning, setIsTransitioning] = useState(false);

  const fetchNowPlaying = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/spotify?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });

      if (response.status === 204) {
        if (!track) {
          setIsTransitioning(true);
          setTimeout(() => {
            setError('Nothing playing right now');
            setIsTransitioning(false);
          }, 500);
        }
      } else {
        const data = await response.json();
        if (data.error) {
          setIsTransitioning(true);
          setTimeout(() => {
            setError(data.error.message);
            setIsTransitioning(false);
          }, 500);
        } else {
          setTrack(prevTrack => {
            if (!prevTrack || !data.item || prevTrack.item.name !== data.item.name || prevTrack.is_playing !== data.is_playing) {
              setIsTransitioning(true);
              setTimeout(() => {
                setIsTransitioning(false);
              }, 500);
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
      }, 500);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, [fetchNowPlaying]);

  if (loading && !track) {
    return (
      <div className="text-xs opacity-50">Loading...</div>
    );
  }

  return (
    <div className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      {error && !track ? (
        <span className="text-xs opacity-50">{error}</span>
      ) : track?.item ? (
        <a
          href={track.item.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <span className="text-xs">
            {track.is_playing ? '> ' : '  '}
            {track.item.name} - {track.item.artists.map(a => a.name).join(', ')}
          </span>
        </a>
      ) : null}
    </div>
  );
}
