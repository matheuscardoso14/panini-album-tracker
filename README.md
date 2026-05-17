# Panini Album Tracker

A web application built with **React**, **TypeScript**, and **Vite** to help collectors track their Panini sticker albums. It allows you to easily manage which stickers you own and keep a count of your duplicates for trading!

*Disclaimer: The application currently only supports the World Cup 2026 album stickers.*

## Features

- **Sticker Management**: Mark stickers as owned or missing.
- **Duplicate Tracking**: Easily increase or decrease the counter for repeated stickers (more than 1 sticker).
- **Search**: Quickly find stickers using fuzzy search by name, team, or number.
- **Filter**: Filter by ownership status (Owned, Not owned, Duplicates).
- **Sorting**: Order your stickers by duplicate quantity.
- **Persistent State**: Your collection is saved locally, so you won't lose your progress when closing the tab (managed via [Jotai](https://jotai.org/)).

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Jotai](https://jotai.org/) (State Management)
- [Fuse.js](https://fusejs.io/) (Fuzzy Search)
- SCSS Modules (Styling)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Installation
To run this project locally:

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:5173`).
