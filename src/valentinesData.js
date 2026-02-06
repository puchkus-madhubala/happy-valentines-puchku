// src/data/valentinesData.js

export const valentinesData = [
  {
    id: 1,
    name: "Rose Day",
    date: "2026-02-07",
    icon: "🌹",
    theme: {
      primary: "#ff4d6d", // Deep rose pink
      secondary: "#fff0f3", // Soft petal pink
      accent: "#c9184a",
    },
    title: "A Rose for My Favorite Person",
    message:
      "Starting this week with a digital garden just for you. Every rose here represents a reason why I love talking to you.",
    interactiveElement: "VIRTUAL_GARDEN", // Kiro can use this to render a specific component
  },
  {
    id: 2,
    name: "Propose Day",
    date: "2026-02-08",
    icon: "💍",
    theme: {
      primary: "#80ed99",
      secondary: "#f1fff2",
      accent: "#2d6a4f",
    },
    title: "A Simple Question...",
    message:
      "If I asked you to go on a 100 more adventures with me, what would you say?",
    interactiveElement: "YES_NO_BOUNCE", // The "No" button runs away from the cursor
  },
  {
    id: 3,
    name: "Chocolate Day",
    date: "2026-02-09",
    icon: "🍫",
    theme: {
      primary: "#7f5539",
      secondary: "#ede0d4",
      accent: "#9c6644",
    },
    title: "Sweetest Thing (After You)",
    message:
      "I couldn't send real chocolates through the screen, so I made these digital ones!",
    interactiveElement: "CHOCOLATE_BOX", // Click to "eat" a chocolate and see a compliment
  },
  {
    id: 4,
    name: "Teddy Day",
    date: "2026-02-10",
    icon: "🧸",
    theme: {
      primary: "#fb8500",
      secondary: "#ffead0",
      accent: "#e36414",
    },
    title: "Big Virtual Hug",
    message:
      "For the times I'm not there to give you a real hug, click this bear.",
    interactiveElement: "TEDDY_HUG",
  },
  {
    id: 5,
    name: "Promise Day",
    date: "2026-02-11",
    icon: "🤝",
    theme: {
      primary: "#4361ee",
      secondary: "#edf2ff",
      accent: "#3f37c9",
    },
    title: "My Promises to You",
    message: "Pinky promises are legally binding in this household!",
    interactiveElement: "PROMISE_WALL",
  },
  {
    id: 6,
    name: "Hug Day",
    date: "2026-02-12",
    icon: "🫂",
    theme: {
      primary: "#f72585",
      secondary: "#ffeef8",
      accent: "#b5179e",
    },
    title: "Warm & Cozy",
    message: "Sending you all the warmth in the world today.",
    interactiveElement: "HUG_METER",
  },
  {
    id: 7,
    name: "Kiss Day",
    date: "2026-02-13",
    icon: "💋",
    theme: {
      primary: "#ef233c",
      secondary: "#fff3f5",
      accent: "#d90429",
    },
    title: "Muah!",
    message: "A little digital peck on the cheek for my love.",
    interactiveElement: "KISS_PARTICLES",
  },
  {
    id: 8,
    name: "Valentine's Day",
    date: "2026-02-14",
    icon: "💝",
    theme: {
      primary: "#d00000",
      secondary: "#fff5f5",
      accent: "#9b0000",
    },
    title: "Happy Valentine's Day, Anupama!",
    message: "You are the white chutney to my dosa. Thank you for being you.",
    interactiveElement: "FINAL_SURPRISE", // Maybe a photo gallery of your memories
  },
];

export const authConfig = {
  username: "dosawithwhitechutney",
  secretAnswer: "12/04/2025",
  secretQuestion: "When did we first start talking?",
};
