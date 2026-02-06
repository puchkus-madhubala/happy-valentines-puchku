# Project Rules: Valentine's Week Web Experience

## 1. Core Persona & Aesthetic

- **Vibe:** Cute, Whimsical, Playful, and Interactive.
- **Styling:** Use rounded corners (`rounded-2xl` to `rounded-3xl`), soft shadows (`shadow-lg`), and pastel gradients.
- **Animations:** Everything must feel "bouncy." Use `framer-motion` spring physics: `type: "spring", stiffness: 300, damping: 15`.

## 2. Technical Stack & Architecture

- **Framework:** React.js (Functional Components).
- **Styling:** Tailwind CSS.
- **Animations:** Framer Motion (use `AnimatePresence` for page transitions).
- **Icons:** Lucide-react.
- **State Management:** Use React Context for `AuthContext` (Login status) and `ThemeContext` (Day-specific themes).
- **Clean Code:** - No code duplication (DRY principle).
  - Extract reusable UI elements into `src/components/ui/`.
  - Keep business logic (like date checking) in utility functions.

## 3. The "Valentine's Logic" (Business Rules)

- **Source of Truth:** All day-specific content must live in `src/data/valentinesData.js`.
- **The Date Lock:** - Days are February 7th through 14th.
  - A card is "Unlocked" only if `currentDate >= dayDate`.
  - Provide a "Debug Mode" toggle in development to unlock all days for testing.
- **Authentication:**
  - Username: `dosawithwhitechutney`
  - Password (Secret Date): `12/04/2025`
  - Persistence: Save login state to `localStorage`.

## 4. Component Guidelines

- **Layout.jsx:** A wrapper component that handles the background gradients and floating "particle" animations (hearts/bubbles).
- **DayCard.jsx:** Should have a "Locked" state (looks like a gift) and an "Unlocked" state (shows the day's icon/name).
- **TransitionWrapper.jsx:** Every page change should trigger a smooth "bouncy slide" or "scale-up" animation.

## 5. Interaction Rules

- **Hover Effects:** Every clickable element must scale up slightly (`whileHover={{ scale: 1.05 }}`).
- **Success States:** Use `canvas-confetti` for the Login success and when a new Day Card is opened for the first time.
- **Empty States:** If a day is locked, show a cute "Not yet, sunshine! 🕵️‍♀️" message.

## 6. Project Structure

src/
├── components/
│ ├── ui/ # Buttons, Inputs, Cards
│ ├── shared/ # Layout, Navbar, Transitions
│ └── effects/ # Confetti, FloatingHearts
├── data/ # valentinesData.js
├── hooks/ # useAuth, useDateCheck
├── pages/ # Login, Home, RoseDay, etc.
└── utils/ # Date formatting, validation
