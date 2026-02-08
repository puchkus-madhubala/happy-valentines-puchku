import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import madhavImage from "../assets/madhav-face.png";
import chocolate1 from "../assets/chocolate-1.png";
import chocolate2 from "../assets/chocolate-2.jpg";
import chocolate3 from "../assets/chocolate-3.png";
import milkPowder from "../assets/milk-powder.png";

interface FallingItem {
  id: number;
  type: "chocolate1" | "chocolate2" | "chocolate3" | "milkPowder" | "madhav";
  x: number;
  speed: number;
}

interface FloatingScore {
  id: number;
  x: number;
  y: number;
  value: string;
  color: string;
}

const ChocolateDay = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [madhavClicks, setMadhavClicks] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);
  const [shakeScore, setShakeScore] = useState(false);
  const [heartBurst, setHeartBurst] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [floatingScores, setFloatingScores] = useState<FloatingScore[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  // Spawn items every 800ms
  useEffect(() => {
    if (showCertificate) return;

    const interval = setInterval(() => {
      const rand = Math.random();
      let type: FallingItem["type"];

      if (rand < 0.25) {
        type = "chocolate1";
      } else if (rand < 0.5) {
        type = "chocolate2";
      } else if (rand < 0.65) {
        type = "chocolate3";
      } else if (rand < 0.8) {
        type = "milkPowder";
      } else {
        type = "madhav";
      }

      const newItem: FallingItem = {
        id: Date.now() + Math.random(),
        type,
        x: Math.random() * 90 + 5,
        speed: Math.random() * 3 + 2,
      };
      setItems((prev) => [...prev, newItem]);
    }, 800);

    return () => clearInterval(interval);
  }, [showCertificate]);

  // Clean up items that fall off screen
  useEffect(() => {
    const cleanup = setInterval(() => {
      setItems((prev) => prev.filter(() => true));
    }, 6000);

    return () => clearInterval(cleanup);
  }, []);

  const handleItemClick = (item: FallingItem, event: React.MouseEvent) => {
    event.stopPropagation();

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const clickX = rect.left + rect.width / 2;
    const clickY = rect.top + rect.height / 2;

    // Remove the item
    setItems((prev) => prev.filter((i) => i.id !== item.id));

    let scoreText = "";
    let scoreColor = "";

    if (
      item.type === "chocolate1" ||
      item.type === "chocolate2" ||
      item.type === "chocolate3"
    ) {
      // Chocolates: +12 points
      scoreText = "+12";
      scoreColor = "#10b981";
      setScore((prev) => prev + 12);
    } else if (item.type === "milkPowder") {
      // Milk powder: always +120 points
      scoreText = "+120";
      scoreColor = "#fbbf24";
      setScore((prev) => prev + 120);
      setHeartBurst({ x: clickX, y: clickY });
      setTimeout(() => setHeartBurst(null), 1000);
    } else {
      // Madhav face logic
      const newMadhavClicks = madhavClicks + 1;
      setMadhavClicks(newMadhavClicks);

      if (newMadhavClicks <= 3) {
        // Clicks 1-3: -12 points and shake animation
        scoreText = "-12";
        scoreColor = "#ef4444";
        setScore((prev) => Math.max(0, prev - 12));
        setShakeScore(true);
        setTimeout(() => setShakeScore(false), 500);
      } else {
        // Click 4+: +120 points with heart burst
        scoreText = "+120";
        scoreColor = "#ec4899";
        setScore((prev) => prev + 120);
        setHeartBurst({ x: clickX, y: clickY });
        setTimeout(() => setHeartBurst(null), 1000);
      }
    }

    // Add floating score text
    const floatingScore: FloatingScore = {
      id: Date.now() + Math.random(),
      x: clickX,
      y: clickY,
      value: scoreText,
      color: scoreColor,
    };
    setFloatingScores((prev) => [...prev, floatingScore]);

    // Remove floating score after animation
    setTimeout(() => {
      setFloatingScores((prev) =>
        prev.filter((s) => s.id !== floatingScore.id),
      );
    }, 1000);
  };

  const handleFinishGame = () => {
    setShowCertificate(true);
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#7f5539", "#a0826d", "#c9a690", "#ffd700", "#ff69b4"],
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#7f5539", "#a0826d", "#c9a690", "#ffd700", "#ff69b4"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div
      ref={gameAreaRef}
      className="min-h-screen bg-gradient-to-br from-[#4b2e2a] via-[#6b4423] to-[#7f5539] relative overflow-hidden"
      style={{
        cursor:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>🍫</text></svg>\") 16 0, auto",
      }}
    >
      {/* Back Button */}
      <motion.button
        onClick={() => navigate("/")}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-amber-900 rounded-2xl shadow-lg hover:bg-white transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back</span>
      </motion.button>

      {!showCertificate ? (
        <>
          {/* Score Display */}
          <motion.div
            className="fixed top-6 left-1/2 -translate-x-1/2 z-40"
            animate={
              shakeScore
                ? {
                    x: [0, -10, 10, -10, 10, 0],
                    rotate: [0, -5, 5, -5, 5, 0],
                  }
                : {}
            }
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-4 rounded-3xl shadow-2xl">
              <motion.p
                className="text-5xl font-bold text-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 1 }}
              >
                🍫 {score}
              </motion.p>
            </div>
          </motion.div>

          {/* Falling Items */}
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                className="absolute cursor-pointer z-30"
                style={{ left: `${item.x}%`, top: -100 }}
                initial={{ y: -100 }}
                animate={{ y: window.innerHeight + 100 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{
                  y: { duration: item.speed, ease: "linear" },
                }}
                onClick={(e) => handleItemClick(item, e)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onAnimationComplete={() => {
                  setItems((prev) => prev.filter((i) => i.id !== item.id));
                }}
              >
                {item.type === "chocolate1" && (
                  <img
                    src={chocolate1}
                    alt="Chocolate 1"
                    className="w-28 h-28 object-contain drop-shadow-2xl pointer-events-none"
                  />
                )}
                {item.type === "chocolate2" && (
                  <img
                    src={chocolate2}
                    alt="Chocolate 2"
                    className="w-28 h-28 object-contain drop-shadow-2xl pointer-events-none"
                  />
                )}
                {item.type === "chocolate3" && (
                  <img
                    src={chocolate3}
                    alt="Chocolate 3"
                    className="w-28 h-28 object-contain drop-shadow-2xl pointer-events-none"
                  />
                )}
                {item.type === "milkPowder" && (
                  <img
                    src={milkPowder}
                    alt="Milk Powder"
                    className="w-28 h-28 object-contain drop-shadow-2xl pointer-events-none"
                  />
                )}
                {item.type === "madhav" && (
                  <img
                    src={madhavImage}
                    alt="Madhav"
                    className="w-28 h-28 object-contain drop-shadow-2xl rounded-full pointer-events-none"
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Floating Score Text */}
          <AnimatePresence>
            {floatingScores.map((floatingScore) => (
              <motion.div
                key={floatingScore.id}
                className="fixed z-50 pointer-events-none font-bold text-4xl"
                style={{
                  left: floatingScore.x,
                  top: floatingScore.y,
                  color: floatingScore.color,
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                }}
                initial={{ opacity: 1, y: 0, scale: 1 }}
                animate={{ opacity: 0, y: -100, scale: 1.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                {floatingScore.value}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Heart Burst Effect */}
          <AnimatePresence>
            {heartBurst && (
              <div
                className="fixed z-50 pointer-events-none"
                style={{ left: heartBurst.x, top: heartBurst.y }}
              >
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-4xl"
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                      scale: [0, 1.5, 0],
                      x: Math.cos((i * 30 * Math.PI) / 180) * 100,
                      y: Math.sin((i * 30 * Math.PI) / 180) * 100,
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    💖
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* Finish Button */}
          <motion.button
            onClick={handleFinishGame}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-gradient-to-r from-pink-500 to-red-500 text-white px-12 py-5 rounded-full text-2xl font-bold shadow-2xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            🎁 Finish & Get My Reward
          </motion.button>

          {/* Instructions */}
          <motion.div
            className="fixed bottom-32 left-1/2 -translate-x-1/2 z-30 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg max-w-md text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-amber-900 font-medium text-sm">
              🍫 Chocolates = +12 | 🥛 Milk Powder = +120
              <br />
              😈 Madhav: First 3 clicks = -12, then +120!
            </p>
          </motion.div>
        </>
      ) : (
        /* Certificate Screen */
        <motion.div
          className="min-h-screen flex items-center justify-center p-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="relative max-w-3xl w-full bg-gradient-to-br from-amber-50 to-yellow-100 rounded-3xl shadow-2xl p-12 border-8 border-yellow-600">
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 text-6xl">🏆</div>
            <div className="absolute top-4 right-4 text-6xl">🍫</div>
            <div className="absolute bottom-4 left-4 text-6xl">💝</div>
            <div className="absolute bottom-4 right-4 text-6xl">✨</div>

            {/* Certificate Content */}
            <div className="text-center space-y-6">
              <motion.h1
                className="text-6xl font-bold text-amber-900"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎉 YAYYYYY 🎉
              </motion.h1>

              <motion.div
                className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-purple-600"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {score}
              </motion.div>

              <p className="text-3xl font-bold text-amber-800">YOU SCORED</p>

              <div className="py-6">
                <p className="text-4xl font-bold text-pink-600 leading-relaxed">
                  Happy Chocolate Day My Love 💕
                </p>
                <p className="text-3xl font-semibold text-amber-900 mt-4 leading-relaxed">
                  YOU ARE THE SWEETEST SWEETIE
                  <br />
                  OF ALL THE SWEETUS
                </p>
              </div>

              <motion.p
                className="text-5xl font-bold text-red-500"
                animate={{ rotate: [-5, 5, -5] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                MWAHHH 😘💋
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ChocolateDay;
