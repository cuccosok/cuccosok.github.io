import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IntroScene from '@/components/IntroScene';

interface IntroConfig {
  signText: string;
  subtitle: string;
  buttonText: string;
  signColor: string;
  glowColor: string;
}

export default function IntroPage() {
  const navigate = useNavigate();
  const [config, setConfig] = useState<IntroConfig | null>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    fetch('/data/intro.json')
      .then(r => r.json())
      .then(setConfig)
      .catch(() => setConfig({
        signText: 'CYBER\nSHOP',
        subtitle: 'Prémium Gamer Felszerelés',
        buttonText: 'Belépés',
        signColor: '#F205CB',
        glowColor: '#D9048E',
      }));
  }, []);

  const handleEnter = () => {
    setEntered(true);
    setTimeout(() => navigate('/menu'), 600);
  };

  if (!config) return <div className="min-h-screen bg-background" />;

  return (
    <div className={`min-h-screen relative overflow-hidden transition-opacity duration-500 ${entered ? 'opacity-0' : 'opacity-100'}`}>
      <IntroScene />

      {/* BELÉPÉS button positioned over the neon billboard in background */}
      <button
        onClick={handleEnter}
        className="absolute z-20 pointer-events-auto group cursor-pointer bg-transparent border-0 outline-none"
        style={{
          left: '43.5%',
          top: '3%',
          height: '58%',
          width: '8%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          className="font-orbitron font-black uppercase neon-flicker"
          style={{
            fontSize: '2.25rem',
            writingMode: 'vertical-rl',
            textOrientation: 'upright',
            transform: 'scaleX(1.5)',
            letterSpacing: '0.12em',
            color: config.signColor,
            textShadow: `0 0 7px ${config.signColor}, 0 0 10px ${config.signColor}, 0 0 21px ${config.signColor}, 0 0 42px ${config.glowColor}, 0 0 82px ${config.glowColor}`,
            transition: 'all 0.3s ease',
          }}
        >
          {config.buttonText}
        </div>
        {/* Hover glow overlay */}
        <div
          className="absolute inset-0 transition-all duration-300 opacity-0 group-hover:opacity-100"
          style={{
            boxShadow: `inset 0 0 30px ${config.signColor}40, 0 0 20px ${config.signColor}30`,
          }}
        />
      </button>

      {/* Sign text & subtitle */}
      <div className="absolute inset-0 flex flex-col items-center z-10 pointer-events-none" style={{ justifyContent: 'flex-end', paddingBottom: '8%' }}>
        <div className="flex flex-col items-center pointer-events-auto">
          <div
            className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-black tracking-[0.15em] leading-tight text-center"
            style={{
              color: config.signColor,
              textShadow: `0 0 7px ${config.signColor}, 0 0 10px ${config.signColor}, 0 0 21px ${config.signColor}, 0 0 42px ${config.glowColor}, 0 0 82px ${config.glowColor}`,
            }}
          >
            {config.signText.split('\n').map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>

          <p className="mt-4 font-rajdhani text-lg md:text-xl tracking-[0.3em] uppercase text-primary/80 neon-text-cyan">
            {config.subtitle}
          </p>
        </div>
      </div>

      {/* Scanlines overlay */}
      <div className="scanlines pointer-events-none" />
    </div>
  );
}
