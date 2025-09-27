import { useState } from "react";

export default function BlogSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { key: "all", label: "All Articles" },
    { key: "students", label: "Students" },
    { key: "graduates", label: "Graduates" },
    { key: "professionals", label: "Professionals" }
  ];

  const articles = [
    {
      category: "students",
      title: "10 Essential Career Planning Tips for Students",
      description: "Discover the fundamental strategies that will set you up for career success from day one of your academic journey.",
      readTime: "5 min read",
      color: "text-blue-600",
      hoverColor: "hover:text-blue-700"
    },
    {
      category: "graduates", 
      title: "From Campus to Corporate: A Smooth Transition Guide",
      description: "Navigate the transition from college to your first job with confidence and strategic planning.",
      readTime: "7 min read",
      color: "text-green-600",
      hoverColor: "hover:text-green-700"
    },
    {
      category: "professionals",
      title: "Mid-Career Pivots: How to Change Directions Successfully", 
      description: "Strategic approaches to career transitions without starting from scratch in your professional journey.",
      readTime: "6 min read",
      color: "text-red-600",
      hoverColor: "hover:text-red-700"
    }
  ];

  const filteredArticles = activeFilter === "all" 
    ? articles 
    : articles.filter(article => article.category === activeFilter);

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => (
            <article 
              key={index}
              className="bg-muted rounded-xl overflow-hidden hover-lift animate-fade-in"
              data-testid={`blog-card-${article.category}`}
            >
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-gray-400 text-6xl">📚</div>
              </div>
              <div className="p-6">
                <div className={`text-sm font-medium mb-2 capitalize ${article.color}`}>
                  {article.category}
                </div>
                <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{article.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{article.readTime}</span>
                  <button className={`font-medium ${article.color} ${article.hoverColor}`} data-testid="button-read-more">
                    Read More
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-red-700 transition-all duration-300" data-testid="button-view-all-articles">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  );
}
