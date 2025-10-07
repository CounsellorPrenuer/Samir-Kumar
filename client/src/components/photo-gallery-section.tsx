import { useQuery } from "@tanstack/react-query";
import { Image as ImageIcon } from "lucide-react";
import type { PhotoGallery } from "@shared/schema";

export default function PhotoGallerySection() {
  const { data: photos, isLoading } = useQuery<PhotoGallery[]>({
    queryKey: ["/api/photo-gallery"],
  });

  if (isLoading) {
    return (
      <section id="gallery" className="scroll-mt-20 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading gallery...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="scroll-mt-20 py-20 bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 dark:from-gray-900 dark:via-pink-900/20 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-32 left-32 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 section-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Photo Gallery</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Glimpses from our journey of transforming careers and lives
          </p>
        </div>

        {!photos || photos.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No photos available yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {photos.map((photo, index) => (
              <div 
                key={photo.id} 
                className="group enhanced-card overflow-hidden rounded-2xl transition-all duration-500 transform hover:-translate-y-2"
                data-testid={`gallery-photo-${index}`}
              >
                <img 
                  src={photo.imageUrl} 
                  alt={photo.caption || `Gallery photo ${index + 1}`}
                  className="w-full h-auto block"
                  loading="lazy"
                />
                {photo.caption && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <p className="text-white p-4 text-sm font-medium">
                      {photo.caption}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
