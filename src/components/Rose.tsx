import React from "react";
import { motion } from "motion/react";
import roseImage from "../assets/puckhus-rose.png";

interface RoseProps {
  x: number;
  y: number;
  rotation: number;
}

const Rose: React.FC<RoseProps> = ({ x, y, rotation }) => {
  return (
    <motion.div
      initial={{ scale: 0, rotate: 0 }}
      animate={{ scale: [0, 1.2, 1], rotate: rotation }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
      }}
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }}
      className="select-none"
    >
      <img src={roseImage} alt="Rose" className="w-12 h-12 object-contain" />
    </motion.div>
  );
};

export default Rose;
