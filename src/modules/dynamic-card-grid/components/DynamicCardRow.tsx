import React from "react";
import type { DynamicCardRowProps } from "../types";
import "./DynamicCardGrid.css";

export const DynamicCardRow: React.FC<DynamicCardRowProps> = ({
  rowId,
  className = "",
  children,
  emptyBehavior = "collapse",
}) => {
  const validChildren = React.Children.toArray(children).filter(Boolean);

  if (validChildren.length === 0 && emptyBehavior === "collapse") {
    return null;
  }

  return (
    <div
      className={`dynamic-card-row ${className}`.trim()}
      data-row-id={rowId}
    >
      {children}
    </div>
  );
};
