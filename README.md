# Trust Market

Trust Market is an interactive web-based game and experiment by AiEconLab, designed to explore trust, cooperation, and strategy in social dilemmas. Play against AI agents with different personalities and strategies, learn about game theory, and analyze your performance in a fun, educational environment.

## Features
- Multi-round Prisoner's Dilemma game with configurable AI agents
- Realistic AI personalities and strategies
- Discussion, decision, results, and debrief phases
- Beautiful, modern UI with responsive design
- Educational mode with insights and prompts
- API integration for ElevenLabs (text-to-speech) and OpenAI (AI personalities)
- Detailed performance analysis and strategy reveals

## Demo
> Coming soon!

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn]

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/TrustMarket.git
   cd TrustMarket
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## API Keys Setup
Some features require API keys:
- **ElevenLabs API Key:** For text-to-speech conversion of AI discussions.
- **OpenAI API Key:** For advanced AI personalities and decision-making.

You can enter your API keys in the game setup or via the API Configuration dialog.
- [Create an ElevenLabs account](https://www.elevenlabs.io/) and [get your API key](https://elevenlabs.io/api)
- [Sign up for OpenAI](https://platform.openai.com/signup) and [create an API key](https://platform.openai.com/api-keys)

## Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Icons:** Lucide, React Icons
- **APIs:** ElevenLabs, OpenAI

## Project Structure
```
TrustMarket/
  src/
    components/      # React components
    data/            # Game data and constants
    hooks/           # Custom React hooks
    services/        # API service modules
    types/           # TypeScript types
    index.css        # Global styles
    App.tsx          # Main app logic and routing
  public/
  package.json
  README.md
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License
[MIT](LICENSE)

---

**AiEconLab** — Advancing economics, trust, and cooperation through interactive AI.
