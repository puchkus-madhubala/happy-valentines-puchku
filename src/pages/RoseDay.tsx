import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import Rose from "../components/Rose";
import { valentinesData } from "../data/valentinesData";
import madhubalaImage from "../assets/madhubala-punching-bag.png";

interface RoseItem {
  id: number;
  x: number;
  y: number;
}

const RoseDay: React.FC = () => {
  const [roses, setRoses] = useState<RoseItem[]>([]);
  const [punchCount, setPunchCount] = useState(0);
  const bagControls = useAnimation();
  const navigate = useNavigate();
  const roseData = valentinesData.find((day) => day.name === "Rose Day");

  // Watch for punch count changes and spawn roses at every 5th punch
  useEffect(() => {
    if (punchCount > 0 && punchCount % 5 === 0) {
      const x = Math.random() * (window.innerWidth - 100) + 50;
      const y = Math.random() * (window.innerHeight - 200) + 100;

      const newRose: RoseItem = {
        id: Date.now() + Math.random(),
        x,
        y,
      };

      setRoses((prev) => [...prev, newRose]);

      // Trigger confetti at the bag position
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { x: 0.5, y: 0.5 },
        colors: ["#ff4d6d", "#fff0f3", "#c9184a"],
      });
    }
  }, [punchCount]);

  const handlePunch = async () => {
    // Increment punch count
    setPunchCount((prev) => prev + 1);

    // Trigger swing animation (non-blocking)
    bagControls.start({
      rotate: [0, -20, 15, -10, 5, 0],
      scale: [1, 0.95, 1],
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    });
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

      {/* Main content area */}
      <div className="relative min-h-screen flex flex-col items-center justify-center gap-8 py-12">
        {/* Render roses behind everything */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {roses.map((rose) => (
            <Rose key={rose.id} x={rose.x} y={rose.y} />
          ))}
        </div>

        {/* Love Note Card - Now at top */}
        <motion.div
          className="relative z-30 max-w-xl w-full px-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border-t-4 border-[#ff4d6d]">
            <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">
              {roseData?.title}
            </h3>
            <p className="text-gray-600 text-center leading-relaxed">
              {roseData?.message}
            </p>
          </div>
        </motion.div>

        {/* Punching bag container */}
        <div className="relative z-20 flex flex-col items-center">
          {/* String/vine from top */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-green-600 to-green-800 h-32 rounded-full shadow-md"
            style={{ transformOrigin: "top center" }}
          />

          {/* Punching bag */}
          <motion.div
            animate={bagControls}
            style={{ transformOrigin: "top center" }}
            className="cursor-pointer select-none mt-32"
            onClick={handlePunch}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={madhubalaImage}
              alt="Madhubala Punching Bag"
              className="w-64 h-auto max-h-[50vh] object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* Punch counter */}
          <motion.div
            className="mt-6 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
          >
            <p className="text-lg font-semibold text-gray-700">
              👊 Punches: {punchCount} | Roses: {roses.length} 🌹
            </p>
          </motion.div>
        </div>

        {/* Instruction text - Now at bottom */}
        <motion.div
          className="relative z-30 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg text-center max-w-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <p className="text-lg font-semibold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
              Punch the bag for everytime i've upset you
            </span>
            <span className="ml-1">😝</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RoseDay;
