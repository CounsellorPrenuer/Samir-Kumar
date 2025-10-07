import { useState } from "react";
import { Linkedin } from "lucide-react";
import samirKumarPhoto from "@assets/samir pic_1759307185073.jpg";
import { ResponsiveImage } from "./responsive-image";

export default function FounderSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  // JSX for the full, expanded text with formatting
  const fullText = (
    <>
      <p className="mb-4">
        With over 30 years of distinguished expertise in career counselling,
        sales, marketing, and business development, Samir Kumar, the founder of{" "}
        <strong className="text-foreground">Gnosis Consultancy & Services</strong>, has launched{" "}
        <strong className="text-foreground">
          Careerskope ( www.careerskope.com ) that is focused on career
          counselling and guidance
        </strong>
        . He is a Mentoria Gold Career Counsellor, and a leading authority in
        guiding individuals and organizations toward transformative career
        decisions. Samir’s approach integrates psychometric assessments with
        bespoke career strategies, enabling his clients to navigate career
        transitions with precision, clarity, and confidence.
      </p>
      <p className="mb-4">
        He works towards empowering professionals to align their innate
        strengths with tailored opportunities, ensuring sustained career growth,
        fulfilment, and success. Widely regarded for his insightful guidance and
        strategic foresight, Samir is a trusted mentor who shapes the future of
        both individuals and organisations, empowering them to achieve their
        highest potential.
      </p>
      <p>Email: samir.kumar@gnosiscs.com</p>
    </>
  );

  // JSX for the truncated, default text with formatting
  const truncatedText = (
    <p>
      With over 30 years of distinguished expertise in career counselling,
      sales, marketing, and business development, Samir Kumar, the founder of{" "}
      <strong className="text-foreground">Gnosis Consultancy & Services</strong>, has launched{" "}
      <strong className="text-foreground">
        Careerskope ( www.careerskope.com ) that is focused on career
        counselling and guidance
      </strong>
      . He is a Mentoria Gold Career Counsellor, and a leading authority in
      guiding individuals and organizations toward transformative career
      decisions...
    </p>
  );

  return (
    <section id="leadership" className="scroll-mt-20 py-12 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4 animate-fade-in-up">
            Leadership @ Careerskope
          </h2>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden max-w-5xl mx-auto">
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-1/4 flex flex-col">
              <ResponsiveImage
                src={samirKumarPhoto}
                alt="Samir Kumar - Founder & Career Strategist"
                className="object-cover flex-grow"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 25vw"
                aspectRatio="1/1"
                data-testid="founder-image"
              />
              <div className="p-4 bg-white dark:bg-gray-800">
                <button className="w-full bg-gradient-to-r from-blue-600 to-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-red-700 transition-all duration-300 flex items-center justify-center min-h-[44px] min-w-[44px] text-sm" data-testid="button-connect-linkedin">
                  <Linkedin className="mr-2 h-4 w-4" />
                  Connect on LinkedIn
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className="md:w-3/4 p-6 md:p-8">
              <div className="flex items-center mb-4">
                <div className="w-1 h-10 bg-blue-600 mr-3"></div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    Samir Kumar
                  </h3>
                  <p className="text-blue-600 font-semibold text-sm">
                    Founder & Career Strategist
                  </p>
                </div>
              </div>

              <div className="text-muted-foreground leading-relaxed text-sm text-justify">
                {isExpanded ? fullText : truncatedText}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-blue-600 hover:text-blue-700 font-semibold mt-4 inline-block"
                  data-testid="button-read-more"
                >
                  {isExpanded ? "Show less" : "read more"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}