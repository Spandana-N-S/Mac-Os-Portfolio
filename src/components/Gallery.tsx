import { useState } from 'react';
import { Image as ImageIcon, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const IMAGES = [
  {
    src: '/Moxo.jpeg',
    alt: 'Moxo Company',
  },
  {
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    alt: 'Portfolio Project 1',
  },
  {
    src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    alt: 'Portfolio Project 2',
  },
  // ... (keep all 12 images)
  // Truncated for brevity
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="h-full p-8 bg-gradient-to-br from-[#0D1A2B] via-[#1F2D3D] to-[#3C4B57] overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <ImageIcon className="w-8 h-8 text-cyan-400" />
          <h1 className="text-3xl font-bold text-white">Portfolio Gallery</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {IMAGES.map((image, index) => (
            <div key={index} className="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 hover:scale-105 bg-white/5 backdrop-blur-sm border border-white/10">
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <h3 className="text-white font-semibold mb-2">{image.alt}</h3>
                  <Button
                    onClick={() => setSelectedImage(image.src)}
                    className="bg-cyan-500/80 hover:bg-cyan-600 text-white border-0"
                  >
                    <Maximize2 className="w-4 h-4 mr-2" />
                    View Full
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <Dialog open onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-black/90 backdrop-blur-xl border-white/10">
            <img src={selectedImage} alt="" className="w-full h-full object-contain" />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export { Gallery };

