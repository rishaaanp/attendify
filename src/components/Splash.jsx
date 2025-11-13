import { useState, useEffect } from "react";

export default function Splash() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHide(true), 2200); // stay 2.2 sec
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-900 z-[9999]
      transition-opacity duration-700 ease-out
      ${hide ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      {/* Logo Animation */}
      <img
        src="/icons/icon-192.png"
        alt="Attendify"
        className="w-28 h-28 rounded-2xl shadow-md
        animate-splash-logo"
      />

      {/* Text Animation */}
      <h1 className="text-3xl font-semibold mt-4 text-blue-600 dark:text-blue-400 animate-splash-text">
        Attendify
      </h1>

      <style>{`
        @keyframes splashLogo {
          0%   { transform: scale(0.6); opacity: 0; }
          40%  { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes splashText {
          0%   { transform: translateY(20px); opacity: 0; }
          70%  { transform: translateY(0px); opacity: 1; }
          100% { opacity: 1; }
        }

        .animate-splash-logo {
          animation: splashLogo 0.9s ease-out forwards;
        }

        .animate-splash-text {
          animation: splashText 1.1s ease-out forwards;
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}
