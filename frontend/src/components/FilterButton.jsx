// Optimization and clean-up for FilterButton.jsx

import React, { useState } from "react";

export const FilterButton = React.memo(({ name, setMap, id, _active }) => {
  // Only use required props
  const [active, setActive] = useState(_active);

  const handleClick = () => {
    setMap((prev) => {
      const _new = new Map(prev);
      if (_new.has(id)) {
        _new.delete(id);
      } else {
        _new.set(id, name);
      }
      return _new;
    });
    setActive((prev) => !prev);
  };

  return (
    <button
      className={`text-xs h-fit py-2 m-1 border border-orange-500 px-2 rounded-md ${
        active ? "bg-orange-500" : ""
      }`}
      onClick={handleClick}
    >
      {name}
    </button>
  );
});
