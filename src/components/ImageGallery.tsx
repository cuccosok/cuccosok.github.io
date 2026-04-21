import { useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function ImageGallery({ images, initialIndex, onClose }: ImageGalleryProps) {
  const [index, setIndex] = useState(initialIndex);

  const prev = useCallback(() => setIndex(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex(i => (i + 1) % images.length), [images.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/95" />

      {/* Modal */}
      <div
        className="relative max-w-4xl max-h-[90vh] w-full mx-4 cyber-corners"
        onClick={e => e.stopPropagation()}
      >
        {/* Double border frame */}
        <div className="border-2 border-primary p-1 neon-border-cyan">
          <div className="border border-primary/40 bg-background p-2">
            <img
              src={images[index]}
              alt={`Image ${index + 1}`}
              className="w-full h-auto max-h-[75vh] object-contain"
            />
          </div>
        </div>

        {/* Nav buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-[-50px] top-1/2 -translate-y-1/2 p-2 text-primary hover:text-neon-hot-pink transition-colors"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={next}
              className="absolute right-[-50px] top-1/2 -translate-y-1/2 p-2 text-primary hover:text-neon-hot-pink transition-colors"
            >
              <ChevronRight size={32} />
            </button>
          </>
        )}

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-primary hover:text-neon-hot-pink transition-colors"
        >
          <X size={24} />
        </button>

        {/* Counter */}
        <div className="text-center mt-3 font-mono text-sm text-muted-foreground">
          {index + 1} / {images.length}
        </div>
      </div>

      <div className="scanlines pointer-events-none" />
    </div>
  );
}
