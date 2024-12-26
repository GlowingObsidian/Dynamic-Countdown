# Countdown Timer Web App

A dynamic countdown timer web application built with React.js and Vite. The app is fully frontend-focused, deployed on Vercel, and styled using Tailwind CSS with the ShadCN UI library. Users can set up countdowns, view them, and share countdowns via unique URLs.

## Features

- **Dynamic Countdown**: Set up custom countdowns with ease.
- **Shareable Countdown**: Share the countdown via a unique URL.
- **Three Routes**:
  - `/`: Home page
  - `/setup`: Configure a countdown
  - `/countdown`: Display the active countdown
- **Modern UI**: Built using ShadCN UI components for a sleek and responsive design.
- **Frontend-only**: No backend dependencies for simplicity and faster deployment.

## Tech Stack

- **Framework**: [React.js](https://reactjs.org/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.dev/)
- **Hosting**: [Vercel](https://vercel.com/)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/GlowingObsidian/Dynamic-Countdown
   cd dynamic-countdown
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment

This app is deployed on Vercel. To deploy your own:

1. Push the project to a GitHub repository.
2. Connect the repository to Vercel.
3. Configure the build command (`npm run build`) and the output directory (`dist`).
4. Deploy!

## Project Structure

```plaintext
.
├── public/             # Static assets
├── src/
│   ├── components/ui   # ShadCN UI components
│   ├── pages/          # Page components for routes
│   └── main.jsx        # Entry point
├── vite.config.js      # Vite configuration
└── package.json        # Project dependencies and scripts
```

## Usage

1. **Home Page (`/`):**

   - Landing page with app overview and navigation.

2. **Setup Page (`/setup`):**

   - Configure countdowns by entering the target date and time.

3. **Countdown Page (`/countdown`):**
   - View the active countdown.
   - Share the countdown link to others via the unique URL.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Built with ❤️ using React, Vite, and Tailwind CSS.
