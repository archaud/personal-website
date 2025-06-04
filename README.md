# Personal Website with Spotify Integration

A modern personal website built with Next.js 13, TypeScript, and Tailwind CSS, featuring real-time Spotify "Now Playing" integration.

## Features

- 🎵 Real-time Spotify Now Playing widget
- 🌓 Dark/Light mode support
- 🎨 Modern, responsive design
- ⚡ Built with Next.js 13 App Router
- 🔒 Environment variable configuration
- 💅 Tailwind CSS styling

## Getting Started

1. Clone the repository
```bash
git clone <your-repo-url>
cd personal-website
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file with your Spotify API credentials:
```
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REFRESH_TOKEN=your_refresh_token
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technology Stack

- Next.js 13 (App Router)
- TypeScript
- Tailwind CSS
- Spotify Web API

## Project Structure

```
├── app/
│   ├── api/           # API routes
│   ├── components/    # React components
│   ├── page.tsx      # Main page
│   └── layout.tsx    # Root layout
├── public/           # Static assets
└── styles/          # Global styles
```

## Environment Variables

- `SPOTIFY_CLIENT_ID`: Your Spotify application client ID
- `SPOTIFY_CLIENT_SECRET`: Your Spotify application client secret
- `SPOTIFY_REFRESH_TOKEN`: Your Spotify refresh token

## License

ISC License

---
