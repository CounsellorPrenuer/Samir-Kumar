import { Check, Linkedin } from "lucide-react";
import samirKumarPhoto from "@assets/Samir Kumar_CS website - Samir Kumar_1758954653508.jpg";

export default function FounderSection() {
  const competencies = [
    "Strategy Planning",
    "Marketing & Sales", 
    "Career Services",
    "Corporate Alliances",
    "Leadership",
    "Business Development"
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <img 
              src={samirKumarPhoto} 
              alt="Samir Kumar - Founder & Career Strategist" 
              className="w-64 h-64 rounded-full mx-auto lg:mx-0 object-cover shadow-xl border-4 border-white"
              data-testid="founder-image"
            />
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet Our Founder</h2>
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              Samir Kumar – Founder & Career Strategist
            </h3>
            
            <p className="text-lg text-muted-foreground mb-6">
              With 30+ years of experience in education, training, business development, marketing, 
              admissions, and alliances, Samir brings unparalleled expertise to career guidance.
            </p>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3">Key Competencies:</h4>
              <div className="grid grid-cols-2 gap-2">
                {competencies.map((competency, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">{competency}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6">
              <strong>Objective:</strong> Providing structured career guidance for students, graduates, 
              and professionals to help them achieve their career aspirations.
            </p>
            
            <button className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-red-700 transition-all duration-300 flex items-center" data-testid="button-connect-linkedin">
              <Linkedin className="mr-2 h-5 w-5" />
              Connect on LinkedIn
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
