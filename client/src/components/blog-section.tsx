import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { BlogArticle } from "@shared/schema";
import BlogDetailModal from "./blog-detail-modal";
import { useInView } from "@/hooks/use-in-view";

export default function BlogSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { ref: cardsRef, isInView: cardsInView } = useInView({ threshold: 0.1 });

  const filters = [
    { key: "all", label: "All Articles" },
    { key: "students", label: "Students" },
    { key: "graduates", label: "Graduates" },
    { key: "professionals", label: "Professionals" }
  ];

  // Fetch blog articles from database
  const { data: articles = [], isLoading } = useQuery<BlogArticle[]>({
    queryKey: ['/api/blog-articles', activeFilter],
    queryFn: () => {
      const params = activeFilter !== "all" ? `?category=${activeFilter}` : "";
      return fetch(`/api/blog-articles${params}`).then(res => res.json());
    }
  });

  // Add styling based on category
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

  const filteredArticles = Array.isArray(articles) ? articles : [];
  
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
              Latest Resources
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with career planning, admissions, and industry trends
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
        ) : (
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayedArticles.map((article, index) => {
              const styles = getArticleStyles(article.category);
              return (
                <article 
                  key={article.id}
                  className={`bg-card p-6 rounded-xl hover-lift text-center border-2 border-transparent hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 ${
                    cardsInView ? 'animate-slide-up' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  data-testid={`blog-card-${article.category}`}
                >
                  <div className="mb-4 flex justify-center">
                    <div className="text-4xl">📚</div>
                  </div>
                  <div>
                    <div className={`text-xs font-semibold mb-2 capitalize ${styles.color}`}>
                      {article.category}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{article.description}</p>
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
