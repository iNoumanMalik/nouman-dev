import { motion } from "framer-motion";
import { useState } from "react";

type TechIconProps = {
  icon: React.ReactNode;
  name: string;
  description: string;
};

export default function TechIcon({ icon, name, description }: TechIconProps) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center w-14 h-14 cursor-pointer"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {icon}

      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 10, y: -10 }}
          animate={{ opacity: 1, scale: 1, x: 10, y: -10 }}
          exit={{ opacity: 0 }}
          className="absolute top-0 right-0 bg-black text-white text-xs px-3 py-1 rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
        >
          <span className="font-semibold">{name}</span> — {description}
        </motion.div>
      )}
    </div>
  );
}
