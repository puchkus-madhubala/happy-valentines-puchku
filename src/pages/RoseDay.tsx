import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import Rose from "../components/Rose";
import { valentinesData } from "../data/valentinesData";

interface RoseItem {
  id: number;
  x: number;
  y: number;
  rotation: number;
}

const RoseDay: React.FC = () => {
  const [roses, setRoses] = useState<RoseItem[]>([]);
  const gardenRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const roseData = valentinesData.find((day) => day.name === "Rose Day");

  useEffect(() => {
    // Trigger confetti on every 5 roses
    if (roses.length > 0 && roses.length % 5 === 0) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#ff4d6d", "#fff0f3", "#c9184a"],
      });
    }
  }, [roses.length]);

  const handleGardenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gardenRef.current) return;

    const rect = gardenRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotation = Math.random() * 30 - 15; // Random rotation between -15 and 15 degrees

    const newRose: RoseItem = {
      id: Date.now() + Math.random(),
      x,
      y,
      rotation,
    };

    setRoses((prev) => [...prev, newRose]);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#fff0f3] via-[#ffe5ec] to-[#fff0f3]"
        animate={{
          background: [
            "linear-gradient(to bottom right, #fff0f3, #ffe5ec, #fff0f3)",
            "linear-gradient(to bottom right, #ffe5ec, #fff0f3, #ffe5ec)",
            "linear-gradient(to bottom right, #fff0f3, #ffe5ec, #fff0f3)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
            }}
            animate={{
              y: -50,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            💕
          </motion.div>
        ))}
      </div>

      {/* Back button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <ArrowLeft size={18} />
        Back
      </motion.button>

      {/* Rose counter */}
      <motion.div
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <p className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
          Roses grown for you: {roses.length} 🌹
        </p>
      </motion.div>

      {/* Garden Canvas */}
      <div
        ref={gardenRef}
        onClick={handleGardenClick}
        className="relative min-h-screen cursor-pointer"
      >
        {/* Empty state */}
        {roses.length === 0 && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-2xl text-gray-400 font-light text-center px-4">
              Tap to plant a rose for everytime i've upset you😝😝
            </p>
          </motion.div>
        )}

        {/* Render roses */}
        {roses.map((rose) => (
          <Rose key={rose.id} x={rose.x} y={rose.y} rotation={rose.rotation} />
        ))}
      </div>

      {/* Love Note Card */}
      <motion.div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-md w-full mx-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 15 }}
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border-t-4 border-[#ff4d6d]">
          <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center font-['Quicksand']">
            {roseData?.title}
          </h3>
          <p className="text-gray-600 text-center leading-relaxed font-['Nunito']">
            {roseData?.message}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RoseDay;
