import { useEffect, useRef } from "react";

export default function Scroller() {
  const scrollersRef = useRef([]);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }
  }, []);

  function addAnimation() {
    scrollersRef.current.forEach((scroller) => {
      if (!scroller) return;
      scroller.setAttribute("data-animated", true);

      const scrollerInner = scroller.querySelector(".scroller__inner");
      if (!scrollerInner) return;

      const scrollerContent = Array.from(scrollerInner.children);
      scrollerContent.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(clone);
      });
    });
  }

  return (
    <div
      ref={(el) => (scrollersRef.current[0] = el)}
      className="scroller overflow-hidden w-full"
      data-animated="false"
    >
      <div className="scroller__inner flex gap-4 w-max animate-scroll">
        {/* Colored Divs */}
        <div className="w-24 h-24 rounded-lg bg-red-500 flex items-center justify-center text-white font-bold">
          Red
        </div>
        <div className="w-24 h-24 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold">
          Blue
        </div>
        <div className="w-24 h-24 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold">
          Green
        </div>
        <div className="w-24 h-24 rounded-lg bg-yellow-500 flex items-center justify-center text-black font-bold">
          Yellow
        </div>
        <div className="w-24 h-24 rounded-lg bg-purple-500 flex items-center justify-center text-white font-bold">
          Purple
        </div>
      </div>
    </div>
  );
}
