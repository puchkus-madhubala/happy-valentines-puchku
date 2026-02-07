import React from "react";
import { motion } from "motion/react";
import roseImage from "../assets/puckhus-rose.png";

interface RoseProps {
  x: number;
  y: number;
}

const Rose: React.FC<RoseProps> = ({ x, y }) => {
  const rotation = Math.random() * 30 - 15; // Random rotation between -15 and 15 degrees

  return (
    <motion.div
      initial={{ scale: 1.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        pointerEvents: "none",
      }}
      className="select-none"
    >
      <img
        src={roseImage}
        alt="Rose"
        className="w-12 h-12 object-contain drop-shadow-lg"
      />
    </motion.div>
  );
};

export default Rose;
