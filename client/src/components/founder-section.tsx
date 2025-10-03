import { Check, Linkedin } from "lucide-react";
import samirKumarPhoto from "@assets/samir pic_1759307185073.jpg";
import { ResponsiveImage } from "./responsive-image";

export default function FounderSection() {
  return (
    <section id="leadership" className="scroll-mt-20 py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">Leadership @ Careerskope</h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden max-w-5xl mx-auto">
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-1/3 flex flex-col">
              <ResponsiveImage 
                src={samirKumarPhoto} 
                alt="Samir Kumar - Founder & Career Strategist" 
                className="object-cover flex-grow"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
                aspectRatio="1/1"
                data-testid="founder-image"
              />
              <div className="p-6 bg-white dark:bg-gray-800">
                <button className="w-full bg-gradient-to-r from-blue-600 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-red-700 transition-all duration-300 flex items-center justify-center min-h-[44px] min-w-[44px]" data-testid="button-connect-linkedin">
                  <Linkedin className="mr-2 h-5 w-5" />
                  Connect on LinkedIn
                </button>
              </div>
            </div>
            
            {/* Content Section */}
            <div className="md:w-2/3 p-8 md:p-12">
              <div className="flex items-center mb-6">
                <div className="w-1 h-12 bg-blue-600 mr-4"></div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Samir Kumar</h3>
                  <p className="text-blue-600 font-semibold">Founder & Career Strategist</p>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  With over 30 years of distinguished expertise in career counselling, sales, marketing, and business development, 
                  Samir Kumar is the founder of Careerskope, a Mentoria Gold Career Counsellor, and a leading authority in guiding 
                  individuals and organisations toward transformative career decisions. Samir's approach integrates psychometric 
                  assessments with bespoke career strategies, enabling his clients to navigate career transitions with precision, 
                  clarity, and confidence.
                </p>
                
                <p>
                  He works towards empowering professionals to align their innate strengths with tailored opportunities, ensuring 
                  sustained career growth, fulfilment, and success. Widely regarded for his insightful guidance and strategic foresight, 
                  Samir is a trusted mentor who shapes the futures of both individuals and organisations, empowering them to achieve 
                  their highest potential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
