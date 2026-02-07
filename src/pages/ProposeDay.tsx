import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ProposeDay = () => {
  const navigate = useNavigate();
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [showProposal, setShowProposal] = useState(false);
  const [showYesButton, setShowYesButton] = useState(false);
  const [showLoveYou, setShowLoveYou] = useState(false);
  const [pageDirection, setPageDirection] = useState<"next" | "prev">("next");
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });

  const pages = [
    "ellooo ellooo maru puchku, thoda late hogaya haina. surri surri. okay so yesterday when i woke up and i checked my phone my lock screen said “300 days together”. can you believe it darling? i was so amazed by the fact that we have been together for 300 days now. i wanted to tell you about it and i even thought about making an edit of us for it but then i had a thought why not make her entire week special.",
    "i miss you gendi and when i say i miss you i dont just miss physically being around you and holding your hands and cuddling and hugging each other. i miss sending you good morning and good night texts. my mornings always start with you even on days when i wake up from a bad dream, after talking to you i can finally give a beautiful start to my day.",
    "i love how you can move so freely and comfortably around me. like the time when you were running around the garden and i recorded you from behind. i recall the moments and it brings a smile on my face each time. whenever we go out to a new place like the time we went to gandhi ashram and you were looking around each stuff there. im not really into such museums and it honestly bores me bcs im never focused like that to learn about history. but when im you and im looking at you everything around gets blurred and its like you are my focus point. i love how see the world and its so different then how i see it. but it all makes sense at the end of the day when we’re together.",
    "i love rage-baiting you and getting rage-baited by you.  you’ve such a beautiful soul my love. i miss watching you get ready at my dressing table. no matter how hard i try i still take more time than you to get ready hehe. i want to go shopping again and be your personal sales man and help you choose the best fits and be your makeup tester.",
    "after all this time you still get shy around me and its very cute. i keep hoping that we reach home sooner when we are driving back so i can finally hug you after unlocking the door. after dropping you off at nehrunagar on my way back i put my hand behind to reach for you and i couldn’t reach to you and thats when i realised i just left you at the bus stop.",
    "i honestly have no clue what is propose day for and i have already asked you to be my valentine. so here im to re-propose you my sweetheart. i really wish that even in after-life you still stay the puchku to my madhubala, the orca to my little fishie, the lily to my marshall, the gendi to my genda, the dhebli to my dhebla, and now the big question....",
  ];

  const proposal =
    "Will you like to be the bahu to my mom ? (abhi thode ring k paise nahi hai, baad me dila dunga)";

  // Typewriter effect for the current page
  useEffect(() => {
    if (!showLetter) return;

    setDisplayedText(""); // Reset text
    let index = 0;
    const currentText = pages[currentPage];

    const timer = setInterval(() => {
      if (index < currentText.length) {
        setDisplayedText(currentText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        // Show proposal after last page message
        if (currentPage === pages.length - 1) {
          setTimeout(() => setShowProposal(true), 500);
        }
      }
    }, 50);

    return () => clearInterval(timer);
  }, [showLetter, currentPage]);

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

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setPageDirection("next");
      setShowProposal(false);
      setShowYesButton(false);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setPageDirection("prev");
      setShowProposal(false);
      setShowYesButton(false);
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEnvelopeClick = () => {
    if (!isEnvelopeOpen) {
      setIsEnvelopeOpen(true);
      // Show letter after it slides out completely
      setTimeout(() => setShowLetter(true), 2000);
      // Close envelope after letter is out
      setTimeout(() => setIsEnvelopeOpen(false), 2200);
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

  const handleNoButtonHover = () => {
    // Move the No button to a random position within the letter area
    const maxX = 400; // Letter width constraint
    const maxY = 300; // Letter height constraint
    const newX = Math.random() * maxX - 200; // Center around 0
    const newY = Math.random() * maxY - 150; // Center around 0
    setNoButtonPosition({ x: newX, y: newY });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center p-4 overflow-hidden">
      {/* Back Button */}
      <motion.button
        onClick={() => navigate("/")}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-pink-600 rounded-2xl shadow-lg hover:bg-white transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back</span>
      </motion.button>

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

      {/* Envelope Container - Only show when letter is not displayed */}
      <AnimatePresence>
        {!showLetter && (
          <motion.div
            className="relative"
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative cursor-pointer z-20"
              onClick={handleEnvelopeClick}
              whileHover={!isEnvelopeOpen ? { scale: 1.05 } : {}}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {/* Envelope Body */}
              <div className="relative w-96 h-72 bg-gradient-to-br from-pink-200 to-pink-300 rounded-2xl shadow-2xl overflow-hidden">
                {/* Envelope Flap */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-40 bg-gradient-to-br from-pink-300 to-pink-400 origin-top z-30"
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

                {/* Letter inside envelope - slides out slowly */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 w-80 bg-gradient-to-b from-amber-50 to-yellow-50 rounded-t-lg shadow-xl z-10"
                  style={{
                    backgroundImage: `repeating-linear-gradient(
                      transparent,
                      transparent 31px,
                      #e0e7ff 31px,
                      #e0e7ff 32px
                    )`,
                  }}
                  initial={{ bottom: 0, height: "85%" }}
                  animate={{
                    bottom: isEnvelopeOpen ? "100%" : 0,
                    height: isEnvelopeOpen ? "400px" : "85%",
                  }}
                  transition={{
                    delay: isEnvelopeOpen ? 0.6 : 0,
                    duration: 1.2,
                    ease: "easeInOut",
                  }}
                >
                  {/* Paper texture overlay */}
                  <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiAvPjwvc3ZnPg==')]" />

                  {/* Red margin line */}
                  <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-red-300 opacity-40" />
                </motion.div>

                {/* Click hint */}
                {!isEnvelopeOpen && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center text-pink-700 font-medium text-lg z-20"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Click to open 💌
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Letter - Expanded View */}
      <AnimatePresence mode="wait">
        {showLetter && (
          <motion.div
            key={currentPage}
            className="relative max-w-2xl w-full bg-gradient-to-b from-amber-50 to-yellow-50 rounded-3xl shadow-2xl p-8 md:p-12"
            style={{
              backgroundImage: `repeating-linear-gradient(
                transparent,
                transparent 31px,
                #e0e7ff 31px,
                #e0e7ff 32px
              )`,
            }}
            initial={{
              rotateY: pageDirection === "next" ? 90 : -90,
              opacity: 0,
            }}
            animate={{
              rotateY: 0,
              opacity: 1,
            }}
            exit={{
              rotateY: pageDirection === "next" ? -90 : 90,
              opacity: 0,
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
          >
            {/* Paper texture overlay */}
            <div className="absolute inset-0 opacity-10 rounded-3xl bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiAvPjwvc3ZnPg==')]" />

            {/* Red margin line */}
            <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-red-300 opacity-40" />

            {/* Decorative hearts in corners */}
            <div className="absolute top-4 left-4 text-3xl">💕</div>
            <div className="absolute top-4 right-4 text-3xl">💕</div>
            <div className="absolute bottom-4 left-4 text-3xl">💕</div>
            <div className="absolute bottom-4 right-4 text-3xl">💕</div>

            {/* Letter content */}
            <div className="space-y-6 relative z-10 ml-8 mt-8">
              <p
                className="text-gray-700 text-2xl md:text-3xl leading-loose min-h-[200px]"
                style={{ fontFamily: "'Allison', cursive" }}
              >
                {displayedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  |
                </motion.span>
              </p>

              {/* Proposal text - only on last page */}
              <AnimatePresence>
                {showProposal && currentPage === pages.length - 1 && (
                  <motion.p
                    className="text-3xl md:text-4xl font-bold text-pink-600 text-center italic"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    {proposal}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Yes Button - only on last page */}
              <AnimatePresence>
                {showYesButton && currentPage === pages.length - 1 && (
                  <motion.div
                    className="relative flex justify-center gap-4 pt-4 h-24"
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

                    {/* No Button - Runs away on hover */}
                    <motion.button
                      onMouseEnter={handleNoButtonHover}
                      className="absolute bg-gradient-to-r from-gray-400 to-gray-500 text-white px-12 py-4 rounded-full text-xl font-bold shadow-lg cursor-pointer"
                      animate={{
                        x: noButtonPosition.x,
                        y: noButtonPosition.y,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                      }}
                      style={{
                        right: "50%",
                        marginRight: "-220px",
                      }}
                    >
                      No 😢
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-6">
                {currentPage > 0 ? (
                  <motion.button
                    onClick={handlePrevPage}
                    className="px-6 py-2 rounded-full font-medium bg-pink-100 text-pink-600 hover:bg-pink-200 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ← Previous
                  </motion.button>
                ) : (
                  <div></div>
                )}

                {currentPage < pages.length - 1 && (
                  <motion.button
                    onClick={handleNextPage}
                    className="px-6 py-2 rounded-full font-medium bg-pink-100 text-pink-600 hover:bg-pink-200 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Next →
                  </motion.button>
                )}
              </div>
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
              I LOVE YOU GENDII MWAHHH 🥰😋
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProposeDay;
