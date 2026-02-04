import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, User, X } from "lucide-react";
import type { BlogArticle } from "@shared/schema";

interface BlogDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: BlogArticle | null;
}

export default function BlogDetailModal({ isOpen, onClose, article }: BlogDetailModalProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && article) {
      setLoading(false);
    }
  }, [isOpen, article]);

  if (!article) return null;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "students":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "graduates":
        return "bg-green-100 text-green-800 border-green-200";
      case "professionals":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return null;

    // YouTube URL patterns
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch && youtubeMatch[1]) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }

    // Vimeo URL pattern
    const vimeoRegex = /vimeo\.com\/(?:.*\/)?(\d+)/;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }

    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Header Image */}
            {article.imageUrl ? (
              <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-gray-400 text-8xl">📚</div>
                </div>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
                  data-testid="button-close-blog-modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                <div className="text-gray-400 text-8xl">📚</div>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
                  data-testid="button-close-blog-modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            <div className="p-8 pb-16">
              <DialogHeader className="mb-6">
                {/* Category Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <Badge className={`px-3 py-1 border ${getCategoryColor(article.category)}`}>
                    {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                  </Badge>
                </div>

                {/* Title */}
                <DialogTitle className="text-3xl font-bold text-foreground leading-tight mb-4">
                  {article.title}
                </DialogTitle>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b border-border pb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(article.createdAt.toString())}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {article.readTime}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Careerskope Team
                  </div>
                </div>
              </DialogHeader>

              {/* Description */}
              <div className="prose prose-lg max-w-none pb-12">
                <p className="text-xl text-muted-foreground font-medium mb-8 leading-relaxed">
                  {article.description}
                </p>

                {/* Video Embed */}
                {article.videoUrl && getEmbedUrl(article.videoUrl) && (
                  <div className="mb-8">
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        src={getEmbedUrl(article.videoUrl) || ''}
                        title={article.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="text-foreground leading-relaxed space-y-6 pb-8">
                  {article.content && article.content.trim() ? (
                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                  ) : (
                    <div className="space-y-6">
                      <p>
                        This comprehensive guide will help you navigate your career journey and make informed decisions about your professional future.
                      </p>

                      <h3 className="text-2xl font-semibold mb-4">Key Insights</h3>

                      <ul className="space-y-3 list-disc list-inside">
                        <li>Understanding industry trends and market demands</li>
                        <li>Developing essential skills for career advancement</li>
                        <li>Building a strong professional network</li>
                        <li>Creating effective career development strategies</li>
                        <li>Balancing personal goals with professional growth</li>
                      </ul>

                      <h3 className="text-2xl font-semibold mb-4">Action Steps</h3>

                      <p>
                        Take the time to reflect on your career goals and create a concrete plan for achieving them. Remember that career development is an ongoing process that requires continuous learning and adaptation.
                      </p>

                      <blockquote className="border-l-4 border-blue-500 pl-6 italic text-lg bg-blue-50 p-4 rounded-r-lg">
                        "Success in your career comes from understanding your strengths, staying adaptable to change, and continuously investing in your professional development."
                      </blockquote>

                      <h3 className="text-2xl font-semibold mb-4">Next Steps</h3>

                      <p>
                        Ready to take the next step in your career journey? Our expert team at Careerskope is here to provide personalized guidance and support. Contact us today to learn about our comprehensive career coaching packages.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}