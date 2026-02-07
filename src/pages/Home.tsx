import React from "react";
import { motion } from "motion/react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { valentinesData } from "../data/valentinesData";

const Home: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const currentDate = new Date();

  const isDayUnlocked = (dayDate: string): boolean => {
    const today = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
    );
    const unlockDate = new Date(dayDate);
    const unlockDay = new Date(
      unlockDate.getFullYear(),
      unlockDate.getMonth(),
      unlockDate.getDate(),
    );
    return today >= unlockDay;
  };

  const handleDayClick = (day: (typeof valentinesData)[0]) => {
    if (!isDayUnlocked(day.date)) return;

    if (day.name === "Rose Day") {
      navigate("/rose-day");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-red-50">
      <nav className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
            Puchku's Valentine's Week 💕
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-2xl hover:bg-red-200 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </motion.button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Our Special Week!❤️
          </h2>
          <p className="text-gray-600 text-lg">
            Hum valentines pe sath nahi hai to kya hogaya. I bring valentines on
            your screen😋🥰
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valentinesData.map((day, index) => {
            const isUnlocked = isDayUnlocked(day.date);

            return (
              <motion.div
                key={day.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
                whileHover={isUnlocked ? { scale: 1.05 } : {}}
                onClick={() => handleDayClick(day)}
                className={`relative p-6 rounded-3xl shadow-lg cursor-pointer ${
                  isUnlocked
                    ? "bg-white hover:shadow-xl transition-shadow"
                    : "bg-gray-200 opacity-60"
                }`}
                style={
                  isUnlocked
                    ? { borderTop: `4px solid ${day.theme.primary}` }
                    : {}
                }
              >
                {!isUnlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100/90 rounded-3xl">
                    <div className="text-center">
                      <span className="text-4xl">🔒</span>
                      <p className="text-sm text-gray-600 mt-2">
                        Not yet, my darling! 🕵️‍♀️
                      </p>
                    </div>
                  </div>
                )}

                <div className="text-center">
                  {day.icon.startsWith("/") ? (
                    <img
                      src={day.icon}
                      alt={day.name}
                      className="w-16 h-16 mx-auto mb-4 object-contain"
                    />
                  ) : (
                    <span className="text-5xl mb-4 block">{day.icon}</span>
                  )}
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {day.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
