import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cyan' | 'pink';
}

export default function NeonButton({ className, variant = 'cyan', children, ...props }: NeonButtonProps) {
  const colors = variant === 'cyan'
    ? 'border-primary text-primary hover:bg-primary/10 hover:shadow-[0_0_15px_hsl(174_97%_50%/0.4),0_0_30px_hsl(174_97%_50%/0.2)]'
    : 'border-neon-hot-pink text-neon-hot-pink hover:bg-neon-hot-pink/10 hover:shadow-[0_0_15px_hsl(308_97%_50%/0.4),0_0_30px_hsl(308_97%_50%/0.2)]';

  return (
    <button
      className={cn(
        'relative px-8 py-3 border-2 font-orbitron text-sm uppercase tracking-[0.2em] transition-all duration-300 bg-transparent cursor-pointer',
        colors,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
