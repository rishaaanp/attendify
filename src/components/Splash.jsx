import { useState, useEffect } from "react";

export default function Splash() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHide(true), 2400); // stays visible ~2.4 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center 
        bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 
        dark:from-gray-800 dark:via-gray-900 dark:to-black
        z-[9999] transition-opacity duration-700 ease-out
        ${hide ? "opacity-0 pointer-events-none" : "opacity-100"}
      `}
    >
      {/* Logo */}
      <div className="relative">
        <img
          src="/icons/icon-192.png"
          alt="Attendify"
          className="w-28 h-28 rounded-2xl animate-logo-bounce"
        />

        {/* Glow Pulse */}
        <div className="absolute inset-0 rounded-2xl blur-xl opacity-40 animate-logo-glow bg-blue-300 dark:bg-blue-800"></div>
      </div>

      {/* App Name */}
      <h1 className="text-4xl font-bold text-white dark:text-gray-200 mt-6 animate-text-rise">
        Attendify
      </h1>

      <style>{`
        @keyframes logoBounce {
          0% { transform: scale(0.6); opacity: 0; }
          45% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes logoGlow {
          0% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.25); }
          100% { opacity: 0.15; transform: scale(1); }
        }

        @keyframes textRise {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0px); }
        }

        .animate-logo-bounce {
          animation: logoBounce 1s ease-out forwards;
        }

        .animate-logo-glow {
          animation: logoGlow 2.2s ease-in-out infinite;
        }

        .animate-text-rise {
          animation: textRise 1.1s ease-out 0.4s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
