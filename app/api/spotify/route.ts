import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token || '',
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Failed to get access token:', error);
      throw new Error('Failed to get access token');
    }

    return response.json();
  } catch (error) {
    console.error('Error in getAccessToken:', error);
    throw error;
  }
};

export async function GET() {
  // Add cache control headers
  const headersList = headers();
  const referer = headersList.get('referer') || '';

  const responseHeaders = {
    'content-type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  };

  if (!client_id || !client_secret) {
    console.error('Missing Spotify client credentials');
    return new NextResponse(
      JSON.stringify({
        error: {
          message: 'Spotify client credentials not configured',
        },
      }),
      {
        status: 500,
        headers: responseHeaders,
      }
    );
  }

  if (!refresh_token) {
    console.error('Missing Spotify refresh token');
    return new NextResponse(
      JSON.stringify({
        error: {
          message: 'No refresh token found. Please set SPOTIFY_REFRESH_TOKEN in your environment variables.',
        },
      }),
      {
        status: 500,
        headers: responseHeaders,
      }
    );
  }

  try {
    const { access_token } = await getAccessToken();

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: 'no-store',
      next: { revalidate: 0 },
    });

    if (response.status === 204) {
      return new NextResponse(null, {
        status: 204,
        headers: responseHeaders,
      });
    }

    if (!response.ok) {
      const error = await response.json();
      console.error('Spotify API error:', error);
      return new NextResponse(
        JSON.stringify({
          error: {
            message: 'Failed to fetch currently playing track from Spotify',
            details: error,
          },
        }),
        {
          status: response.status,
          headers: responseHeaders,
        }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return new NextResponse(
      JSON.stringify({
        error: {
          message: 'Error fetching data from Spotify',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      }),
      {
        status: 500,
        headers: responseHeaders,
      }
    );
  }
} 