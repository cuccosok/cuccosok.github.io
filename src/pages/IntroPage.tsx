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

  const buttonLetters = [...config.buttonText.toUpperCase()];
  const buttonColor = '#f8cae8';
  const buttonFlickerGlowColor = '#f4d0e7';

  return (
    <div className={`min-h-screen relative overflow-hidden transition-opacity duration-500 ${entered ? 'opacity-0' : 'opacity-100'}`}>
      <IntroScene>
        {/* BELÉPÉS button positioned in the background image coordinate space */}
        <button
          onClick={handleEnter}
          className="absolute pointer-events-auto group cursor-pointer bg-transparent border-0 outline-none"
          style={{
            left: '43.5%',
            top: '10.3%',
            height: '49%',
            width: '8%',
          }}
        >
          <span
            className="font-orbitron font-black uppercase neon-flicker flex h-full w-full flex-col items-center justify-center gap-[clamp(0.26rem,0.48cqw,0.8rem)] pb-[20px] leading-none"
            style={{
              fontSize: 'clamp(1.9rem, 3.05cqw, 4.25rem)',
              transform: 'scaleX(1)',
              color: buttonColor,
              '--flicker-core-color': buttonColor,
              '--flicker-glow-color': buttonFlickerGlowColor,
              '--flicker-on-opacity': 0.92,
              '--flicker-off-opacity': 0.58,
              '--flicker-on-filter': 'blur(0.25px) saturate(0.92)',
              '--flicker-off-filter': 'blur(0.45px) saturate(0.72)',
              filter: 'blur(0.25px) saturate(0.92)',
              opacity: 0.92,
              textShadow: 'none',
              transition: 'all 0.3s ease',
            }}
            aria-hidden="true"
          >
            {buttonLetters.map((letter, index) => (
              <span key={`${letter}-${index}`}>{letter}</span>
            ))}
          </span>
          <span className="sr-only">{config.buttonText}</span>
          {/* Hover glow overlay */}
            <span
              className="absolute inset-0 transition-all duration-300 opacity-0 group-hover:opacity-100"
              style={{
                boxShadow: `inset 0 0 30px ${buttonFlickerGlowColor}24, 0 0 20px ${buttonFlickerGlowColor}18`,
              }}
            />
        </button>
      </IntroScene>

      {/* Sign text & subtitle */}
      <div className="absolute inset-0 flex flex-col items-center z-10 pointer-events-none" style={{ justifyContent: 'flex-end', paddingBottom: '8%' }}>
        <div className="flex flex-col items-center pointer-events-auto">
          <div
            className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-black tracking-[0.15em] leading-tight text-center"
            style={{
              color: buttonColor,
              textShadow: `0 0 7px ${buttonColor}, 0 0 10px ${buttonColor}, 0 0 21px ${buttonColor}, 0 0 42px ${buttonColor}, 0 0 82px ${buttonColor}`,
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
