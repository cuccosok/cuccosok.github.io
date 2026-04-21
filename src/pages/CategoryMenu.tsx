import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Category {
  id: string;
  label: string;
  image: string;
}

export default function CategoryMenu() {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/categories.json')
      .then(r => r.json())
      .then(setCategories)
      .catch(() => {});
  }, []);

  return (
    <div className="terminal-screen min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="terminal-panel pointer-events-none" />

      <div className="relative z-10 mb-12 text-center">
        <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-primary/45">
          // INVENTORY ACCESS
        </div>
        <h1 className="font-orbitron text-2xl md:text-4xl text-primary neon-text-cyan mt-3 tracking-[0.2em]">
          VÁLASSZ KATEGÓRIÁT<span className="terminal-cursor terminal-cursor-tight">_</span>
        </h1>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => navigate(`/category/${cat.id}`)}
            className="group relative aspect-[3/2] overflow-hidden border border-primary/30 breathing-glow transition-all duration-500 hover:border-primary cursor-pointer bg-background"
          >
            {/* Image */}
            <img
              src={cat.image}
              alt={cat.label}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

            {/* Label */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h2 className="font-orbitron text-lg md:text-xl text-primary tracking-[0.15em] group-hover:neon-text-cyan transition-all duration-300">
                {cat.label}
              </h2>
              <div className="h-[2px] bg-primary/30 mt-2 transition-all duration-500 group-hover:bg-primary group-hover:shadow-[0_0_8px_hsl(174_97%_50%/0.6)]" />
            </div>
          </button>
        ))}
      </div>

      <div className="scanlines pointer-events-none" />
    </div>
  );
}
