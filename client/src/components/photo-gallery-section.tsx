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
    <section id="gallery" className="scroll-mt-20 py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Photo Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                data-testid={`gallery-photo-${index}`}
              >
                <div className="aspect-square relative bg-gray-200">
                  <img 
                    src={photo.imageUrl} 
                    alt={photo.caption || `Gallery photo ${index + 1}`}
                    className="w-full h-full object-cover"
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
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
