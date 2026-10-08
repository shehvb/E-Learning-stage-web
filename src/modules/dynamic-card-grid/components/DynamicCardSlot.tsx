import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DynamicCardSlotProps } from "../types";
import "./DynamicCardGrid.css";

export const DynamicCardSlot: React.FC<DynamicCardSlotProps> = ({
  cardId,
  isVisible = true,
  flexRatio = 1,
  minWidth = 0,
  className = "",
  children,
  fallback = null,
}) => {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {isVisible ? (
        <motion.div
          key={cardId}
          layout
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={`dynamic-card-slot ${className}`.trim()}
          style={{
            flex: `${flexRatio} 1 0%`,
            minWidth: minWidth > 0 ? `${minWidth}px` : "0px",
          }}
          data-slot-id={cardId}
        >
          {children}
        </motion.div>
      ) : fallback ? (
        <motion.div
          key={`${cardId}-fallback`}
          layout
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={`dynamic-card-slot dynamic-card-slot--fallback ${className}`.trim()}
          style={{
            flex: `${flexRatio} 1 0%`,
            minWidth: minWidth > 0 ? `${minWidth}px` : "0px",
          }}
          data-slot-id={`${cardId}-fallback`}
        >
          {fallback}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
