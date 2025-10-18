// Optimization and clean-up for FilterButton.jsx

import React, { useState } from "react";

export const FilterButton = ({ data, mode, filters, setFilters }) => {
  // Only use required props
  const _active = filters[mode].includes(mode == "order" ? data : data.id)
    ? true
    : false;
  const [active, setActive] = useState(_active);

  const handleClick = () => {
    setActive((prev) => !prev);

    setFilters((prev) => {
      if (prev[mode].includes(mode == "order" ? data : data.id)) {
        const dup = prev[mode].slice();
        dup.pop(mode == "order" ? data : data.id);
        return {
          ...prev,
          [mode]: dup,
        };
      } else {
        return {
          ...prev,
          [mode]: [...prev[mode], mode == "order" ? data : data.id],
        };
      }
    });
  };

  return (
    <button
      className={`text-xs text-zinc-300 tracking-wider h-fit py-2 m-1 border border-orange-500 px-2 rounded-md ${
        active ? "bg-orange-500 text-zinc-900" : ""
      }`}
      onClick={handleClick}
    >
      {mode == "order" ? data : data.name}
    </button>
  );
};
