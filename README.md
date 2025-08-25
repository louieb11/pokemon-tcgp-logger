# Pokémon TCG Pocket Ranked Logger

<img width="1194" height="744" alt="Image" src="https://github.com/user-attachments/assets/53b6c204-2cf0-4983-9f7f-69f54c77ddc4" />

A clean, interactive, and stream-friendly ranked logger for the Pokémon TCG Pocket. This tool allows players and streamers to track their game history, session stats, and performance against the meta in real-time.

https://pokemon-tcgp-logger.vercel.app/

---

## Features

-   **Real-time Game Logging:** Quickly log wins, losses, and ties against a list of meta decks.
-   **Multi-Icon Deck Support:** Decks are represented by their two key Pokémon, matching the competitive standard.
-   **Detailed Session Stats:**
    -   Overall W-L-T Record & Win Rate (ties excluded).
    -   Live Win/Loss Streak Counter.
    -   "Most Played Deck" summary.
    -   Matchup-specific performance breakdown.
    -   Performance analysis for going first vs. second.
-   **Responsive 3-Column Layout:** A professional layout that adapts from a multi-column desktop view to a single, scrollable column on mobile.
-   **Streamer-Friendly UI:** Designed for at-a-glance readability, perfect for use as an OBS overlay or a secondary tracking tool during streams.
-   **Polished User Experience:** Includes smooth animations, toast notifications, and a modern, clean design.

---

## Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
-   **Animations:** [Framer Motion](https://www.framer.com/motion/)
-   **Deployment:** [Vercel](https://vercel.com/)

---

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/louieb11/pokemon-tcgp-logger.git
    cd pokemon-tcgp-logger
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Environment Variables:**
    Create a `.env.local` file in the root of the project. This is used to store your API key for fetching deck data from LimitlessTCG.
    ```
    LIMITLESS_API_KEY="your_secret_api_key_here"
    NEXT_PUBLIC_APP_URL="http://localhost:3000"
    ```
    *Note: The app currently uses mock data and will function without a real API key.*

4.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## Deployment

This application is optimized for deployment on [Vercel](https://vercel.com/). Simply connect your GitHub repository to Vercel for automatic builds and deployments.