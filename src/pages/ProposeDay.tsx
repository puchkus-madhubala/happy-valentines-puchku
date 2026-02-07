import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";

const ProposeDay = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [showProposal, setShowProposal] = useState(false);
  const [showYesButton, setShowYesButton] = useState(false);
  const [showLoveYou, setShowLoveYou] = useState(false);

  const message =
    "My dearest Anupama, every day with you feels like a new page in a story I never want to end. You are the white chutney to my dosa, and the best part of my every day...";
  const proposal =
    "Will you continue to be my Valentine, today and for all the days to come?";

  // Typewriter effect for the main message
  useEffect(() => {
    if (!showLetter) return;

    let index = 0;
    const timer = setInterval(() => {
      if (index < message.length) {
        setDisplayedText(message.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        // Show proposal after main message
        setTimeout(() => setShowProposal(true), 500);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [showLetter]);

  // Show Yes button and trigger confetti after proposal appears
  useEffect(() => {
    if (showProposal) {
      setTimeout(() => {
        setShowYesButton(true);
        // Heart confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          shapes: ["circle"],
          colors: ["#ff4d6d", "#ff758f", "#ffb3c1", "#ffc2d1"],
          scalar: 1.2,
        });
      }, 1000);
    }
  }, [showProposal]);

  const handleEnvelopeClick = () => {
    if (!isEnvelopeOpen) {
      setIsEnvelopeOpen(true);
      // Show letter after flap animation
      setTimeout(() => setShowLetter(true), 600);
    }
  };

  const handleYesClick = () => {
    setShowLoveYou(true);
    // Massive confetti explosion
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        shapes: ["circle"],
        colors: ["#ff4d6d", "#ff758f", "#ffb3c1", "#ffc2d1"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        shapes: ["circle"],
        colors: ["#ff4d6d", "#ff758f", "#ffb3c1", "#ffc2d1"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center p-4 overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
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
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            💕
          </motion.div>
        ))}
      </div>

      {/* Envelope Container */}
      <AnimatePresence>
        {!showLetter && (
          <motion.div
            className="relative cursor-pointer"
            onClick={handleEnvelopeClick}
            whileHover={{ scale: 1.05 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {/* Envelope Body */}
            <div className="relative w-80 h-56 bg-gradient-to-br from-pink-200 to-pink-300 rounded-lg shadow-2xl">
              {/* Envelope Flap */}
              <motion.div
                className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-pink-300 to-pink-400 origin-top"
                style={{
                  clipPath: "polygon(0 0, 50% 60%, 100% 0)",
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  rotateX: isEnvelopeOpen ? 180 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  duration: 0.6,
                }}
              />

              {/* Click hint */}
              {!isEnvelopeOpen && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center text-pink-700 font-medium"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Click to open 💌
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Letter */}
      <AnimatePresence>
        {showLetter && (
          <motion.div
            className="relative max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12"
            initial={{ y: 100, scale: 0.5, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.2,
            }}
          >
            {/* Decorative hearts in corners */}
            <div className="absolute top-4 left-4 text-3xl">💕</div>
            <div className="absolute top-4 right-4 text-3xl">💕</div>
            <div className="absolute bottom-4 left-4 text-3xl">💕</div>
            <div className="absolute bottom-4 right-4 text-3xl">💕</div>

            {/* Letter content */}
            <div className="space-y-6">
              <p className="text-gray-700 text-lg leading-relaxed font-serif">
                {displayedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  |
                </motion.span>
              </p>

              {/* Proposal text */}
              <AnimatePresence>
                {showProposal && (
                  <motion.p
                    className="text-2xl md:text-3xl font-bold text-pink-600 text-center italic"
                    style={{ fontFamily: "cursive" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    {proposal}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Yes Button */}
              <AnimatePresence>
                {showYesButton && (
                  <motion.div
                    className="flex justify-center pt-4"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <motion.button
                      onClick={handleYesClick}
                      className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-12 py-4 rounded-full text-xl font-bold shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        scale: {
                          duration: 1,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }}
                    >
                      Yes! 💖
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* I LOVE YOU Screen-wide Animation */}
      <AnimatePresence>
        {showLoveYou && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-pink-500 via-red-500 to-purple-600 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="text-6xl md:text-9xl font-bold text-white text-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
            >
              I LOVE YOU! 💕
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProposeDay;
