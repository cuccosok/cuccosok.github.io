import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import ImageGallery from '@/components/ImageGallery';
import NeonButton from '@/components/NeonButton';

interface ItemData {
  folder: string;
  title: string;
}

export default function ItemListPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [items, setItems] = useState<ItemData[]>([]);
  const [descriptions, setDescriptions] = useState<Record<string, string>>({});
  const [galleryState, setGalleryState] = useState<{ images: string[]; index: number } | null>(null);

  useEffect(() => {
    if (!categoryId) return;
    fetch(`/data/items/${categoryId}/items.json`)
      .then(r => r.json())
      .then((data: ItemData[]) => {
        setItems(data);
        // Load all descriptions
        data.forEach(item => {
          fetch(`/data/items/${categoryId}/${item.folder}/description.md`)
            .then(r => r.text())
            .then(md => setDescriptions(prev => ({ ...prev, [item.folder]: md })))
            .catch(() => {});
        });
      })
      .catch(() => {});
  }, [categoryId]);

  const getImages = (folder: string) => {
    const base = `/data/items/${categoryId}/${folder}`;
    return [`${base}/main.jpg`, `${base}/pic1.jpg`, `${base}/pic2.jpg`, `${base}/pic3.jpg`];
  };

  const openGallery = (folder: string, index: number) => {
    setGalleryState({ images: getImages(folder), index });
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 flex items-center gap-4">
        <NeonButton variant="cyan" onClick={() => navigate('/menu')} className="text-xs px-4 py-2">
          ← Vissza
        </NeonButton>
        <h1 className="font-orbitron text-xl md:text-2xl text-primary neon-text-cyan tracking-[0.15em]">
          {categoryId?.toUpperCase().replace(/-/g, ' ')}
        </h1>
      </div>

      {/* Items */}
      <div className="max-w-6xl mx-auto space-y-12">
        {items.map((item) => {
          const images = getImages(item.folder);
          return (
            <div
              key={item.folder}
              className="border border-primary/30 neon-border-cyan p-4 md:p-6"
            >
              <h2 className="font-orbitron text-lg text-primary mb-4 tracking-wider">
                {item.title}
              </h2>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Images column */}
                <div className="md:w-1/2 space-y-3">
                  {/* Main image */}
                  <button
                    onClick={() => openGallery(item.folder, 0)}
                    className="w-full aspect-[3/2] overflow-hidden border border-primary/20 hover:border-primary transition-colors cursor-pointer"
                  >
                    <img
                      src={images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </button>

                  {/* Thumbnails */}
                  <div className="grid grid-cols-3 gap-2">
                    {images.slice(1).map((img, i) => (
                      <button
                        key={i}
                        onClick={() => openGallery(item.folder, i + 1)}
                        className="aspect-[3/2] overflow-hidden border border-primary/20 hover:border-primary transition-colors cursor-pointer"
                      >
                        <img
                          src={img}
                          alt={`${item.title} ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="md:w-1/2 border border-primary/20 p-4 max-h-[400px] overflow-y-auto cyber-scrollbar">
                  <div className="prose prose-invert prose-sm max-w-none
                    prose-headings:font-orbitron prose-headings:text-primary prose-headings:tracking-wider
                    prose-h1:text-lg prose-h2:text-base prose-h3:text-sm
                    prose-p:text-muted-foreground prose-p:font-rajdhani prose-p:text-base
                    prose-strong:text-primary
                    prose-li:text-muted-foreground prose-li:font-rajdhani
                    prose-th:text-primary prose-th:font-orbitron prose-th:text-xs
                    prose-td:text-muted-foreground prose-td:font-rajdhani
                    prose-table:border-primary/20
                    prose-em:text-neon-hot-pink prose-em:not-italic
                  ">
                    <ReactMarkdown>{descriptions[item.folder] || '*Betöltés...*'}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Gallery Modal */}
      {galleryState && (
        <ImageGallery
          images={galleryState.images}
          initialIndex={galleryState.index}
          onClose={() => setGalleryState(null)}
        />
      )}

      <div className="scanlines pointer-events-none" />
    </div>
  );
}
