import { STATIC_BLOG_ARTICLES } from "@/lib/static-data";
import { useState } from "react";
import type { BlogArticle } from "@shared/schema";
import BlogDetailModal from "./blog-detail-modal";
import { client, urlFor } from "@/lib/sanity";
import { useQuery } from "@tanstack/react-query";

interface SanityPost {
  title: string;
  excerpt: string; // New schema uses excerpt
  description?: string; // Legacy
  category: string;
  readTime: string;
  thumbnail: any; // New schema uses thumbnail
  mainImage?: any; // Legacy
  publishedAt: string;
  slug: { current: string };
}

export default function BlogSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filters = [
    { key: "all", label: "All Articles" },
    { key: "students", label: "Students" },
    { key: "graduates", label: "Graduates" },
    { key: "professionals", label: "Professionals" }
  ];

  // Fetch from Sanity
  const { data: sanityPosts, isLoading } = useQuery({
    queryKey: ['sanity-posts'],
    queryFn: async () => {
      try {
        const data = await client.fetch<SanityPost[]>(`*[_type == "resource"] | order(publishedAt desc)`);
        console.log("Sanity Resource Data:", data);
        return data;
      } catch (error) {
        console.warn("Sanity fetch failed, using fallback:", error);
        return [];
      }
    }
  });

  // Use Sanity data ONLY. No static fallback.
  const sourceArticles = (!isLoading && sanityPosts) ? sanityPosts.map((p, idx) => ({
    id: `sanity-${idx}`,
    title: p.title,
    description: p.excerpt || p.description || "",
    category: p.category || "students",
    readTime: p.readTime || "5 min read",
    imageUrl: p.thumbnail ? urlFor(p.thumbnail) : (p.mainImage ? urlFor(p.mainImage) : null),
    content: p.excerpt || p.description || "",
    isActive: true,
    videoUrl: null,
    published: p.publishedAt ? new Date(p.publishedAt) : new Date(),
    createdAt: p.publishedAt ? new Date(p.publishedAt) : new Date()
  })) : [];

  const filteredArticles = sourceArticles.filter(article => activeFilter === "all" || article.category === activeFilter);

  const getArticleStyles = (category: string) => {
    switch (category) {
      case "students":
        return { color: "text-blue-600", hoverColor: "hover:text-blue-700" };
      case "graduates":
        return { color: "text-green-600", hoverColor: "hover:text-green-700" };
      case "professionals":
        return { color: "text-red-600", hoverColor: "hover:text-red-700" };
      default:
        return { color: "text-gray-600", hoverColor: "hover:text-gray-700" };
    }
  };

  // Show only first 3 articles unless "showAll" is true
  const displayedArticles = showAll ? filteredArticles : filteredArticles.slice(0, 3);

  const handleReadMore = (article: BlogArticle) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedArticle(null);
  };

  const handleViewAllArticles = () => {
    setShowAll(true);
  };

  return (
    <section id="blog" className="scroll-mt-20 py-12 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Resources
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with Industry trends, Career development insights, and inputs on personal growth
          </p>
        </div>


        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card p-6 rounded-xl animate-pulse text-center">
                <div className="mb-4 flex justify-center">
                  <div className="bg-gray-200 rounded-full h-12 w-12"></div>
                </div>
                <div className="bg-gray-200 rounded h-3 w-16 mb-2 mx-auto"></div>
                <div className="bg-gray-200 rounded h-5 w-full mb-3"></div>
                <div className="bg-gray-200 rounded h-4 w-full mb-2"></div>
                <div className="bg-gray-200 rounded h-4 w-3/4 mb-4 mx-auto"></div>
                <div className="flex items-center justify-between">
                  <div className="bg-gray-200 rounded h-3 w-12"></div>
                  <div className="bg-gray-200 rounded h-3 w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : displayedArticles.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-red-100 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-red-600 mb-2">Resources Not Loading</h3>
            <p className="text-gray-600">
              No content found in Sanity CMS.
            </p>
            <p className="text-sm text-gray-500 mt-2 px-4">
              <strong>Troubleshooting:</strong><br />
              1. Check if 'Resource' items are <strong>Published</strong> in Sanity Studio.<br />
              2. Check <strong>CORS Origins</strong> in Sanity API settings.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayedArticles.map((article) => {
              const styles = getArticleStyles(article.category);
              return (
                <article
                  key={article.id}
                  className="bg-card rounded-xl hover-lift text-center border-2 border-transparent hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 overflow-hidden"
                  data-testid={`blog-card-${article.category}`}
                >
                  {article.imageUrl ? (
                    <div className="w-full h-48 overflow-hidden">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="hidden mb-4 flex justify-center items-center h-48">
                        <div className="text-4xl">📚</div>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-4 flex justify-center items-center h-48">
                      <div className="text-4xl">📚</div>
                    </div>
                  )}
                  <div className="p-6">
                    <div className={`text-xs font-semibold mb-2 capitalize ${styles.color}`}>
                      {article.category}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{article.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{article.readTime}</span>
                      <button
                        onClick={() => handleReadMore(article)}
                        className={`font-semibold text-sm ${styles.color} ${styles.hoverColor} transition-colors duration-200`}
                        data-testid={`button-read-more-${article.id}`}
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {!showAll && filteredArticles.length > 3 && (
          <div className="text-center mt-12">
            <button
              onClick={handleViewAllArticles}
              className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
              data-testid="button-view-all-articles"
            >
              View All Articles ({filteredArticles.length - 3} more)
            </button>
          </div>
        )}

        {showAll && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(false)}
              className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300"
              data-testid="button-show-less-articles"
            >
              Show Less
            </button>
          </div>
        )}
      </div>

      <BlogDetailModal
        isOpen={showModal}
        onClose={handleCloseModal}
        article={selectedArticle}
      />
    </section>
  );
}