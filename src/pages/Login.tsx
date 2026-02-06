import React, { useState } from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { authConfig } from "../data/valentinesData";
import confetti from "canvas-confetti";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert date picker format (YYYY-MM-DD) to DD/MM/YYYY
    let formattedPassword = password;
    if (password.includes("-")) {
      const [year, month, day] = password.split("-");
      formattedPassword = `${day}/${month}/${year}`;
    }

    const success = login(username, formattedPassword);

    if (success) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      setError("Oops! Wrong credentials. Try again! 💕");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-red-100">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="bg-white p-8 rounded-3xl shadow-lg max-w-md w-full"
      >
        <div className="text-center mb-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block"
          >
            <Heart
              className="w-16 h-16 text-red-500 mx-auto"
              fill="currentColor"
            />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mt-4">
            Valentine's Week
          </h1>
          <p className="text-gray-600 mt-2">A special surprise awaits! 💝</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none transition-colors"
              placeholder="Food we had on our first date"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {authConfig.secretQuestion}
            </label>
            <input
              type="date"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none transition-colors"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            Unlock the Magic ✨
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
