import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { BlogArticle } from "@shared/schema";

export default function BlogSection() {
  const [activeFilter, setActiveFilter] = useState("all");

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

  const filteredArticles = articles;

  return (
    <section id="blog" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Latest Resources</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with career planning, admissions, and industry trends
          </p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeFilter === filter.key
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              data-testid={`filter-button-${filter.key}`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-muted rounded-xl overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="bg-gray-200 rounded h-4 w-20 mb-2"></div>
                  <div className="bg-gray-200 rounded h-6 w-full mb-3"></div>
                  <div className="bg-gray-200 rounded h-4 w-full mb-2"></div>
                  <div className="bg-gray-200 rounded h-4 w-3/4 mb-4"></div>
                  <div className="flex items-center justify-between">
                    <div className="bg-gray-200 rounded h-4 w-16"></div>
                    <div className="bg-gray-200 rounded h-4 w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => {
              const styles = getArticleStyles(article.category);
              return (
                <article 
                  key={article.id}
                  className="bg-muted rounded-xl overflow-hidden hover-lift animate-fade-in"
                  data-testid={`blog-card-${article.category}`}
                >
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-gray-400 text-6xl">📚</div>
                  </div>
                  <div className="p-6">
                    <div className={`text-sm font-medium mb-2 capitalize ${styles.color}`}>
                      {article.category}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{article.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{article.readTime}</span>
                      <button className={`font-medium ${styles.color} ${styles.hoverColor}`} data-testid={`button-read-more-${article.id}`}>
                        Read More
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
        
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-red-700 transition-all duration-300" data-testid="button-view-all-articles">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  );
}
