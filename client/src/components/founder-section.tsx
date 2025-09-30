import { Check, Linkedin } from "lucide-react";
import samirKumarPhoto from "@assets/Samir Kumar_CS website - Samir Kumar_1758954653508.jpg";
import { ResponsiveImage } from "./responsive-image";

export default function FounderSection() {
  const expertiseAreas = [
    "Sales & Business Development",
    "People Management & Development", 
    "Channel Management",
    "Marketing & Product Management",
    "Customer Engagements",
    "Career Counselling & Coaching"
  ];

  return (
    <section id="leadership" className="scroll-mt-20 py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">Leadership @ Careerskope</h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden max-w-5xl mx-auto">
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-2/5">
              <ResponsiveImage 
                src={samirKumarPhoto} 
                alt="Samir Kumar - Founder & Career Strategist" 
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 40vw"
                aspectRatio="1/1"
                data-testid="founder-image"
              />
            </div>
            
            {/* Content Section */}
            <div className="md:w-3/5 p-8 md:p-12">
              <div className="flex items-center mb-4">
                <div className="w-1 h-12 bg-blue-600 mr-4"></div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Samir Kumar</h3>
                  <p className="text-blue-600 font-semibold">Founder & Career Strategist</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                With 30+ years of experience in education, training, business development, marketing, 
                admissions, and alliances, Samir brings unparalleled expertise to career guidance.
              </p>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4 text-foreground">Areas of Expertise</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {expertiseAreas.map((area, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-sm text-muted-foreground">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-blue-600">Mission:</strong> Providing structured career guidance for students, graduates, 
                  and professionals to help them achieve their career aspirations.
                </p>
              </div>
              
              <button className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-red-700 transition-all duration-300 flex items-center min-h-[44px] min-w-[44px]" data-testid="button-connect-linkedin">
                <Linkedin className="mr-2 h-5 w-5" />
                Connect on LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
