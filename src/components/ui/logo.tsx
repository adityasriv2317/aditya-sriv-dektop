import { useState, useRef, useEffect } from "react";

// Define the component using React's Functional Component type
const Logo: React.FC = () => {
  // Constants for the names
  const shortFirstName = "A";
  const shortLastName = "S";
  const fullFirstName = "Aditya";
  const fullLastName = "Srivastava";

  const [firstName, setFirstName] = useState(shortFirstName);
  const [lastName, setLastName] = useState(shortLastName);
  const [isAnimating, setIsAnimating] = useState(false);

  const intervalRef = useRef<number | undefined>(undefined);

  const handleMouseEnter = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    let i = 1;
    const maxLen = Math.max(fullFirstName.length, fullLastName.length);

    intervalRef.current = window.setInterval(() => {
      setFirstName(fullFirstName.slice(0, i + 1));
      setLastName(fullLastName.slice(0, i + 1));

      i++;
      if (i > maxLen) {
        clearInterval(intervalRef.current);
        setIsAnimating(false);
      }
    }, 60);
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setFirstName(shortFirstName);
    setLastName(shortLastName);
    setIsAnimating(false);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <a
      className="flex group cursor-pointer items-center font-light text-black transition-colors duration-300 hover:text-gray-600"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <span className="group-hover:font-bold group-hover:mr-1">{firstName}</span>
      <span className="group-hover:font-semibold">{lastName}</span>
    </a>
  );
};

export default Logo;
