import { useState } from "react";
import { Linkedin } from "lucide-react";
import samirKumarPhoto from "@assets/samir pic_1759307185073.jpg";
import { ResponsiveImage } from "./responsive-image";
import { client, urlFor } from "@/lib/sanity";
import { useQuery } from "@tanstack/react-query";

interface SanityLeadership {
  name: string;
  designation: string;
  photo: any;
  bio: string;
}

export default function FounderSection() {
  const [expandedProfiles, setExpandedProfiles] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedProfiles(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Fetch from Sanity
  const { data: sanityProfiles, isLoading } = useQuery({
    queryKey: ['sanity-leadership'],
    queryFn: async () => {
      try {
        const data = await client.fetch<SanityLeadership[]>(`*[_type == "leadershipProfile"] | order(name asc)`);
        console.log("Sanity Leadership Data Raw:", data);
        if (data.length === 0) console.warn("Sanity Leadership data is empty.");
        return data;
      } catch (error) {
        console.warn("Sanity fetch failed, using fallback:", error);
        return [];
      }
    }
  });

  // Use Sanity data if available, otherwise fallback to static Samir Kumar
  const profiles = (!isLoading && sanityProfiles && sanityProfiles.length > 0)
    ? sanityProfiles.map((p, idx) => ({
      id: String(idx),
      name: p.name,
      designation: p.designation,
      photoUrl: p.photo ? urlFor(p.photo) : null,
      bio: p.bio,
      isStatic: false
    }))
    : [{
      id: "static-1",
      name: "Samir Kumar",
      designation: "Founder & Career Strategist",
      photoUrl: samirKumarPhoto,
      bio: "With over 30 years of distinguished expertise in career counselling, sales, marketing, and business development, Samir Kumar, the founder of Gnosis Consultancy & Services, has launched Careerskope ( www.careerskope.com ) that is focused on career counselling and guidance. He is a Mentoria Gold Career Counsellor, and a leading authority in guiding individuals and organizations toward transformative career decisions. Samir’s approach integrates psychometric assessments with bespoke career strategies, enabling his clients to navigate career transitions with precision, clarity, and confidence.\n\nHe works towards empowering professionals to align their innate strengths with tailored opportunities, ensuring sustained career growth, fulfilment, and success. Widely regarded for his insightful guidance and strategic foresight, Samir is a trusted mentor who shapes the future of both individuals and organisations, empowering them to achieve their highest potential.",
      isStatic: true
    }];

  return (
    <section id="leadership" className="scroll-mt-20 py-12 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Leadership @ Careerskope (Live Check)
            </span>
          </h2>
          {/* Debug Error Message */}
          {!isLoading && (!sanityProfiles || sanityProfiles.length === 0) && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 text-left max-w-2xl mx-auto">
              <p className="font-bold">Debug Status:</p>
              <p>Sanity connection failed or returned no data. Using static fallback.</p>
              <p className="text-xs mt-1">Please check Browser Console (F12) for CORS or Network errors.</p>
            </div>
          )}
        </div>

        <div className="space-y-12">
          {profiles.map((profile) => {
            const isExpanded = expandedProfiles[profile.id];
            // Truncate logic: First 300 chars or first paragraph split
            const bioText = profile.bio || "";
            const truncatedBio = bioText.length > 300 ? bioText.slice(0, 300) + "..." : bioText;

            return (
              <div key={profile.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden max-w-5xl mx-auto">
                <div className="md:flex">
                  {/* Image Section */}
                  <div className="md:w-1/4 flex flex-col">
                    <div className="h-full relative min-h-[300px] md:min-h-auto">
                      <img
                        src={profile.photoUrl || samirKumarPhoto}
                        alt={`${profile.name} - ${profile.designation}`}
                        className="w-full h-full object-cover absolute inset-0"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="md:w-3/4 p-6 md:p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-1 h-10 bg-blue-600 mr-3"></div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">
                          {profile.name}
                        </h3>
                        <p className="text-blue-600 font-semibold text-sm">
                          {profile.designation}
                        </p>
                      </div>
                    </div>

                    <div className="text-muted-foreground leading-relaxed text-sm text-justify whitespace-pre-line">
                      {isExpanded ? bioText : truncatedBio}
                      {bioText.length > 300 && (
                        <button
                          onClick={() => toggleExpand(profile.id)}
                          className="text-blue-600 hover:text-blue-700 font-semibold mt-4 inline-block ml-2"
                        >
                          {isExpanded ? "Show less" : "read more"}
                        </button>
                      )}

                      {profile.isStatic && isExpanded && (
                        <p className="mt-4">Email: samir.kumar@gnosiscs.com</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
