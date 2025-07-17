# Memorizer - Memory Game

[![Production](https://img.shields.io/badge/Live%20App-memorize--game--mu.vercel.app-blue?style=flat-square&logo=vercel)](https://memorize-game-mu.vercel.app/)

## 🧠 What is this project?

**Memorizer** is a modern, fully responsive Memory Game built with Next.js, React, and TypeScript. The goal is to match all image pairs on the board as fast as possible. The app demonstrates advanced frontend architecture, state management, authentication, accessibility, and beautiful UI/UX.

## 🚀 Live Demo

👉 [https://memorize-game-mu.vercel.app/](https://memorize-game-mu.vercel.app/)

## ✨ Features

- **Authentication**: Google login (NextAuth) and session persistence
- **Protected Routes**: Only authenticated users can play
- **Responsive UI**: Works on mobile, tablet, and desktop
- **Modern Design**: Gradients, animated loading, custom components
- **Game Logic**: Card flip, match, timer, win detection
- **High Scores**: Local leaderboard with modal overlay
- **Accessibility**: ARIA labels, keyboard navigation, semantic HTML
- **State Persistence**: Game and scores survive reloads (localStorage)
- **Storybook**: All components documented and isolated
- **Testing**: Jest + Testing Library, high coverage
- **Linting & Formatting**: ESLint, Prettier, Husky, lint-staged

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI**: [React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Auth**: [NextAuth.js](https://next-auth.js.org/) (Google OAuth)
- **State**: React hooks, localStorage
- **Testing**: [Jest](https://jestjs.io/), [@testing-library/react](https://testing-library.com/)
- **Component Docs**: [Storybook](https://storybook.js.org/)
- **Icons**: [react-icons](https://react-icons.github.io/react-icons/)
- **Image API**: [Picsum Photos](https://picsum.photos/) (easy to swap for Pexels)
- **CI/Dev Tools**: ESLint, Prettier, Husky, lint-staged

## 📦 Installation & Usage

```bash
# Install dependencies
npm install

# Run in development
npm run dev

# Run Storybook
npm run storybook

# Run tests
npm test

# Run tests with coverage
npm run test -- --coverage

# Lint and format
npm run lint
```

## 🧩 Project Structure

```
src/
  app/           # Next.js app routes (login, game, scores)
  components/    # All UI components (by feature, with stories & tests)
  providers/     # Auth provider
  lib/           # Auth config
  ...
```

## 🏆 Differentials

- 100% TypeScript, clean and scalable architecture
- All components isolated, tested, and documented
- Modern, accessible, and beautiful UI
- High test coverage and code quality
- Easy to extend (add new features, swap image API, etc)

## 📲 Production

- **Live app:** [https://memorize-game-mu.vercel.app/](https://memorize-game-mu.vercel.app/)
- Hosted on [Vercel](https://vercel.com/)

## 👤 Author

- **Denis Ibanez**
- [LinkedIn]([https://www.linkedin.com/](https://www.linkedin.com/in/denis-ibanez/])

---

> Challenge for Snyk - Senior Frontend Engineer Take Home Assignment
