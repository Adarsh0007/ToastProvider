import { useEffect, useState } from "react";
import useThrottle from "../hooks/useThrottle";

const MouseTracker = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const throttledPos = useThrottle(pos, 5000);

  useEffect(() => {
    const handler = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => removeEventListener("mousemove", handler);
  }, []);

  return (
    <div>
      Mouse Position: {throttledPos.x}, {throttledPos.y}
    </div>
  );
};

export default MouseTracker;
