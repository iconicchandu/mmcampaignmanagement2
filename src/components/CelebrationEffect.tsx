import React, { useEffect, useState } from 'react';

interface CelebrationEffectProps {
  isActive: boolean;
  onComplete: () => void;
}

const CelebrationEffect: React.FC<CelebrationEffectProps> = ({ isActive, onComplete }) => {
  const [balloons, setBalloons] = useState<Array<{ id: number; x: number; delay: number; color: string }>>([]);
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; rotation: number; color: string; delay: number }>>([]);

  useEffect(() => {
    if (isActive) {
      // Generate balloons
      const newBalloons = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'][Math.floor(Math.random() * 7)]
      }));

      // Generate confetti
      const newConfetti = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'][Math.floor(Math.random() * 8)],
        delay: Math.random() * 3
      }));

      setBalloons(newBalloons);
      setConfetti(newConfetti);

      // Auto-complete after 4 seconds
      const timer = setTimeout(() => {
        onComplete();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Celebration message */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white px-8 py-4 rounded-2xl shadow-2xl animate-bounce text-2xl font-bold">
          🎉 Congratulations! Revenue Goal Achieved! 🎉
        </div>
      </div>

      {/* Balloons */}
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="absolute bottom-0 animate-float-up"
          style={{
            left: `${balloon.x}%`,
            animationDelay: `${balloon.delay}s`,
            animationDuration: '4s'
          }}
        >
          <div
            className="w-8 h-10 rounded-full shadow-lg relative"
            style={{ backgroundColor: balloon.color }}
          >
            {/* Balloon string */}
            <div className="absolute top-full left-1/2 w-px h-16 bg-gray-400 transform -translate-x-1/2"></div>
            {/* Balloon highlight */}
            <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full opacity-60"></div>
          </div>
        </div>
      ))}

      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: '3s'
          }}
        >
          <div
            className="w-3 h-3 rounded-sm"
            style={{
              backgroundColor: piece.color,
              transform: `rotate(${piece.rotation}deg)`
            }}
          ></div>
        </div>
      ))}

      {/* Sparkle effects */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            ✨
          </div>
        ))}
      </div>
    </div>
  );
};

export default CelebrationEffect;