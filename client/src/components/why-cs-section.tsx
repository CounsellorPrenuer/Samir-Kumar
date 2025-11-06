import { Target, Brain, Lightbulb, TrendingUp, Users, CheckCircle2, ArrowRight } from "lucide-react";
import counsellingFramework1 from "@assets/WhatsApp Image 2025-10-01 at 14.09.57_1759310947676.jpeg";
import counsellingFramework2 from "@assets/WhatsApp Image 2025-09-30 at 11.56.28_1759303602861.jpeg";

export default function WhyCSSection() {
  return (
    <section id="why-cs" className="scroll-mt-20 py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Careerskope?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive career guidance with proven frameworks and personalized approach
          </p>
        </div>

        {/* Subsection 1: Counselling Framework */}
        <div className="mb-16" data-testid="subsection-counselling-framework">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg ring-1 ring-black/5 p-8 md:p-12 space-y-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full shadow-lg mb-2">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Counselling Framework
                </span>
              </h3>
              <p className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Our comprehensive framework combines evaluation, career planning, unbiased guidance, and informed decision-making to guide you toward the perfect career path.
              </p>
            </div>

            {/* Framework Flow - Stepper Style */}
            <div className="py-4">
              <div className="flex items-center justify-center gap-2 md:gap-4 max-w-4xl mx-auto">
                <div className="flex flex-col items-center text-center gap-2 flex-1">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center shadow-md">
                    1
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-800">Career Options</span>
                </div>
                <div className="hidden md:block h-px flex-1 max-w-[80px] bg-gradient-to-r from-blue-300 to-indigo-300"></div>
                
                <div className="flex flex-col items-center text-center gap-2 flex-1">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center shadow-md">
                    2
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-800">Roadmap</span>
                </div>
                <div className="hidden md:block h-px flex-1 max-w-[80px] bg-gradient-to-r from-blue-300 to-indigo-300"></div>
                
                <div className="flex flex-col items-center text-center gap-2 flex-1">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center shadow-md">
                    3
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-800">Opportunities</span>
                </div>
                <div className="hidden md:block h-px flex-1 max-w-[80px] bg-gradient-to-r from-blue-300 to-indigo-300"></div>
                
                <div className="flex flex-col items-center text-center gap-2 flex-1">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center shadow-md">
                    4
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-800">Decisions</span>
                </div>
              </div>
            </div>

            {/* Framework Images - Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* First Image - 50% on desktop */}
              <div className="group">
                <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 p-[2px] rounded-2xl h-full">
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm h-full transition-all duration-300 group-hover:shadow-xl">
                    <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                      <img 
                        src={counsellingFramework1} 
                        alt="Career Counselling at CareerSkope Framework" 
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                        data-testid="img-counselling-framework-1"
                      />
                    </div>
                    <p className="mt-3 text-sm font-medium text-gray-700/80 text-center border-t border-gray-100 pt-3">
                      Career Counselling at CareerSkope
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Second Image - 50% on desktop */}
              <div className="group">
                <div className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 p-[2px] rounded-2xl h-full">
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm h-full transition-all duration-300 group-hover:shadow-xl">
                    <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                      <img 
                        src={counsellingFramework2} 
                        alt="Career Choice Framework" 
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                        data-testid="img-counselling-framework-2"
                      />
                    </div>
                    <p className="mt-3 text-sm font-medium text-gray-700/80 text-center border-t border-gray-100 pt-3">
                      Career Choice Framework
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subsection 2: Advanced Psychometrics */}
        <div className="bg-gradient-to-r from-blue-600 via-green-600 to-red-600 rounded-3xl p-1 mb-16">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12">
              <h3 className="text-3xl font-bold text-center mb-8">
                Advanced Psychometric <span className="bg-gradient-to-r from-blue-600 via-green-600 to-red-600 bg-clip-text text-transparent">Career Assessment</span>
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Vector Graphic Section - Now smaller and on the left */}
                <div className="flex justify-center">
                  <div className="w-full max-w-md">
                    <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 p-8 shadow-lg" data-testid="img-psychometric-assessment">
                      <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <defs>
                          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3B82F6"/>
                            <stop offset="100%" stopColor="#1E40AF"/>
                          </linearGradient>
                          <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#10B981"/>
                            <stop offset="100%" stopColor="#059669"/>
                          </linearGradient>
                          <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#EF4444"/>
                            <stop offset="100%" stopColor="#DC2626"/>
                          </linearGradient>
                        </defs>
                        
                        {/* Person Taking Test */}
                        <g transform="translate(80, 100)">
                          <circle cx="0" cy="0" r="25" fill="#1E40AF"/>
                          <path d="M 0 25 L 0 65" stroke="#1E40AF" strokeWidth="8" strokeLinecap="round"/>
                          <path d="M 0 40 L -25 65" stroke="#1E40AF" strokeWidth="7" strokeLinecap="round"/>
                          <path d="M 0 40 L 25 65" stroke="#1E40AF" strokeWidth="7" strokeLinecap="round"/>
                          <path d="M 0 65 L -15 95" stroke="#1E40AF" strokeWidth="7" strokeLinecap="round"/>
                          <path d="M 0 65 L 15 95" stroke="#1E40AF" strokeWidth="7" strokeLinecap="round"/>
                          
                          {/* Computer/Test Screen */}
                          <rect x="30" y="30" width="70" height="50" rx="4" fill="white" stroke="#3B82F6" strokeWidth="3"/>
                          <rect x="38" y="38" width="18" height="3" rx="1" fill="#3B82F6"/>
                          <rect x="38" y="45" width="25" height="3" rx="1" fill="#10B981"/>
                          <rect x="38" y="52" width="20" height="3" rx="1" fill="#EF4444"/>
                          <rect x="38" y="59" width="22" height="3" rx="1" fill="#F59E0B"/>
                          <circle cx="70" cy="45" r="2" fill="#3B82F6"/>
                          <circle cx="77" cy="45" r="2" fill="#10B981"/>
                          <circle cx="84" cy="45" r="2" fill="#EF4444"/>
                        </g>
                        
                        {/* Arrow to AI Processing */}
                        <path d="M 180 150 L 220 150" stroke="#6366F1" strokeWidth="3" strokeDasharray="5 3"/>
                        <path d="M 220 150 L 215 145 M 220 150 L 215 155" stroke="#6366F1" strokeWidth="3"/>
                        
                        {/* AI Processing Center */}
                        <g transform="translate(300, 150)">
                          <circle cx="0" cy="0" r="50" fill="url(#blueGrad)" opacity="0.1"/>
                          <circle cx="0" cy="0" r="40" fill="white" stroke="#6366F1" strokeWidth="3"/>
                          
                          {/* AI Brain */}
                          <path d="M -15 -10 Q -10 -20 0 -20 Q 10 -20 15 -10 Q 20 -5 20 5 Q 20 15 10 20 Q 0 25 -10 20 Q -20 15 -20 5 Q -20 -5 -15 -10" 
                                fill="#6366F1" opacity="0.3"/>
                          
                          {/* AI Icon */}
                          <text x="0" y="8" fontSize="24" fontWeight="bold" fill="#6366F1" textAnchor="middle">AI</text>
                          
                          {/* Processing particles */}
                          <circle cx="-25" cy="-15" r="3" fill="#F59E0B">
                            <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
                          </circle>
                          <circle cx="25" cy="15" r="3" fill="#F59E0B">
                            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
                          </circle>
                        </g>
                        
                        {/* Three Analysis Dimensions */}
                        <g transform="translate(250, 280)">
                          {/* Interests */}
                          <g transform="translate(-100, 0)">
                            <circle cx="0" cy="0" r="35" fill="url(#blueGrad)" opacity="0.9"/>
                            <path d="M -10 -5 L -5 5 L 5 -10" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M 0 -15 L 0 -8" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                            <text x="0" y="55" fontSize="14" fontWeight="bold" fill="#1E40AF" textAnchor="middle">Interests</text>
                          </g>
                          
                          {/* Personality */}
                          <g transform="translate(0, 0)">
                            <circle cx="0" cy="0" r="35" fill="url(#greenGrad)" opacity="0.9"/>
                            <circle cx="0" cy="-5" r="8" fill="white"/>
                            <path d="M 0 3 L 0 15" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                            <path d="M 0 10 L -8 20" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                            <path d="M 0 10 L 8 20" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                            <text x="0" y="55" fontSize="14" fontWeight="bold" fill="#059669" textAnchor="middle">Personality</text>
                          </g>
                          
                          {/* Abilities */}
                          <g transform="translate(100, 0)">
                            <circle cx="0" cy="0" r="35" fill="url(#redGrad)" opacity="0.9"/>
                            <path d="M 0 -15 L -5 -5 L -12 -7 L 0 8 L 12 -7 L 5 -5 Z" fill="white"/>
                            <text x="0" y="55" fontSize="14" fontWeight="bold" fill="#DC2626" textAnchor="middle">Abilities</text>
                          </g>
                        </g>
                        
                        {/* Arrows from AI to dimensions */}
                        <path d="M 300 190 L 170 260" stroke="#3B82F6" strokeWidth="2" opacity="0.6" strokeDasharray="4 2"/>
                        <path d="M 300 190 L 250 260" stroke="#10B981" strokeWidth="2" opacity="0.6" strokeDasharray="4 2"/>
                        <path d="M 300 190 L 330 260" stroke="#EF4444" strokeWidth="2" opacity="0.6" strokeDasharray="4 2"/>
                        
                        {/* Comprehensive Report */}
                        <g transform="translate(250, 420)">
                          <rect x="-60" y="-40" width="120" height="60" rx="6" fill="white" stroke="#6366F1" strokeWidth="3"/>
                          <rect x="-50" y="-30" width="100" height="4" rx="1" fill="#3B82F6"/>
                          <rect x="-50" y="-22" width="80" height="3" rx="1" fill="#94A3B8"/>
                          <rect x="-50" y="-15" width="90" height="3" rx="1" fill="#94A3B8"/>
                          <rect x="-50" y="-8" width="70" height="3" rx="1" fill="#94A3B8"/>
                          <rect x="-50" y="-1" width="85" height="3" rx="1" fill="#94A3B8"/>
                          <rect x="-50" y="6" width="60" height="3" rx="1" fill="#94A3B8"/>
                          <text x="0" y="40" fontSize="14" fontWeight="bold" fill="#1E40AF" textAnchor="middle">10+ Page Report</text>
                        </g>
                        
                        {/* Arrows from dimensions to report */}
                        <path d="M 150 315 L 200 380" stroke="#3B82F6" strokeWidth="2" opacity="0.4"/>
                        <path d="M 250 315 L 250 380" stroke="#10B981" strokeWidth="2" opacity="0.4"/>
                        <path d="M 350 315 L 300 380" stroke="#EF4444" strokeWidth="2" opacity="0.4"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content Section - Now on the right */}
                <div className="space-y-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    The psychometric assessment administered by Careerskope is the most advanced and accurate online career test 
                    that will help you make informed career decisions. It is one of the highest rated career assessment platforms in India.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our online career assessment is based on well-proven psychometric theories and Artificial Intelligence (AI). 
                    The multi-dimensional career assessment test includes detailed analysis of interests, personality, and abilities.
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mt-6">
                    <h4 className="text-xl font-bold mb-4 text-center">Assessment Features</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <span className="text-muted-foreground">Industry benchmark accuracy</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                        <span className="text-muted-foreground">AI-powered insights</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                        <span className="text-muted-foreground">Multi-dimensional analysis</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <span className="text-muted-foreground">10+ page comprehensive report</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>




        {/* Subsection 5: Professional Development */}
        <div className="mb-20" data-testid="subsection-professional-development">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Professional Development
                  </h3>
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  Beyond career selection, we offer comprehensive professional development programs to help you excel in your chosen field. Our training covers both technical and soft skills essential for career success.
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Our Training Programs Include:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-700">Leadership and management skills</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-700">Communication and presentation</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-700">Interview preparation and techniques</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-700">Resume building and LinkedIn optimization</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-700">Industry-specific certifications</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-700">Networking and personal branding</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8" data-testid="img-professional-development">
                <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  {/* Background Mountains */}
                  <path d="M0 400 L100 300 L200 350 L300 250 L400 300 L400 500 L0 500 Z" fill="#E0E7FF" opacity="0.5"/>
                  
                  {/* Staircase */}
                  <g>
                    {/* Step 1 - Bottom */}
                    <rect x="50" y="420" width="80" height="20" rx="2" fill="#3B82F6"/>
                    <rect x="50" y="440" width="80" height="60" rx="2" fill="#60A5FA" opacity="0.8"/>
                    
                    {/* Step 2 */}
                    <rect x="130" y="380" width="80" height="20" rx="2" fill="#3B82F6"/>
                    <rect x="130" y="400" width="80" height="100" rx="2" fill="#60A5FA" opacity="0.8"/>
                    
                    {/* Step 3 */}
                    <rect x="210" y="340" width="80" height="20" rx="2" fill="#3B82F6"/>
                    <rect x="210" y="360" width="80" height="140" rx="2" fill="#60A5FA" opacity="0.8"/>
                    
                    {/* Step 4 */}
                    <rect x="290" y="300" width="80" height="20" rx="2" fill="#3B82F6"/>
                    <rect x="290" y="320" width="80" height="180" rx="2" fill="#60A5FA" opacity="0.8"/>
                  </g>
                  
                  {/* Person climbing */}
                  <g transform="translate(320, 270)">
                    {/* Head */}
                    <circle cx="0" cy="-15" r="12" fill="#1E40AF"/>
                    
                    {/* Body */}
                    <path d="M0 -3 L0 20" stroke="#1E40AF" strokeWidth="6" strokeLinecap="round"/>
                    
                    {/* Arms - reaching up */}
                    <path d="M0 5 L-8 -5" stroke="#1E40AF" strokeWidth="5" strokeLinecap="round"/>
                    <path d="M0 5 L8 -8" stroke="#1E40AF" strokeWidth="5" strokeLinecap="round"/>
                    
                    {/* Legs - climbing pose */}
                    <path d="M0 20 L-6 35" stroke="#1E40AF" strokeWidth="5" strokeLinecap="round"/>
                    <path d="M0 20 L8 32" stroke="#1E40AF" strokeWidth="5" strokeLinecap="round"/>
                    
                    {/* Motion lines */}
                    <path d="M-20 0 L-15 0" stroke="#3B82F6" strokeWidth="2" opacity="0.5"/>
                    <path d="M-20 8 L-12 8" stroke="#3B82F6" strokeWidth="2" opacity="0.5"/>
                  </g>
                  
                  {/* Golden Star at the top */}
                  <g transform="translate(330, 100)">
                    {/* Glow effect */}
                    <circle cx="0" cy="0" r="40" fill="url(#star-glow)" opacity="0.6"/>
                    <circle cx="0" cy="0" r="30" fill="url(#star-glow)" opacity="0.4"/>
                    
                    {/* Star shape */}
                    <path d="M0 -25 L7 -8 L25 -8 L11 3 L18 20 L0 10 L-18 20 L-11 3 L-25 -8 L-7 -8 Z" 
                          fill="url(#golden-gradient)" 
                          stroke="#F59E0B" 
                          strokeWidth="2"/>
                    
                    {/* Inner star detail */}
                    <path d="M0 -15 L4 -5 L15 -5 L7 2 L11 12 L0 6 L-11 12 L-7 2 L-15 -5 L-4 -5 Z" 
                          fill="#FEF3C7"/>
                    
                    {/* Sparkles */}
                    <circle cx="-35" cy="-10" r="3" fill="#FBBF24">
                      <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="35" cy="5" r="3" fill="#FBBF24">
                      <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="-10" cy="35" r="2" fill="#FBBF24">
                      <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="25" cy="-30" r="2" fill="#FBBF24">
                      <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/>
                    </circle>
                  </g>
                  
                  {/* Achievement badges on steps */}
                  <circle cx="90" cy="410" r="6" fill="#10B981"/>
                  <circle cx="170" cy="370" r="6" fill="#10B981"/>
                  <circle cx="250" cy="330" r="6" fill="#10B981"/>
                  
                  {/* Progress indicators */}
                  <text x="70" y="470" fill="#1E40AF" fontSize="12" fontWeight="bold">Start</text>
                  <text x="300" y="270" fill="#F59E0B" fontSize="14" fontWeight="bold">Success!</text>
                  
                  {/* Definitions */}
                  <defs>
                    <linearGradient id="golden-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FCD34D"/>
                      <stop offset="50%" stopColor="#F59E0B"/>
                      <stop offset="100%" stopColor="#D97706"/>
                    </linearGradient>
                    
                    <radialGradient id="star-glow">
                      <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.8"/>
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="0"/>
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Call to Action */}
      <div className="text-center mb-20">
        <h3 className="text-2xl font-bold mb-6">Ready to Transform Your Career Journey?</h3>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Embark on a fulfilling career path with our expert career guidance services. Our knowledgeable career counsellors 
          will assist you in exploring various industries, identifying your interests, and mapping your personality to help 
          you make informed career decisions.
        </p>
        <button 
          onClick={() => {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          className="bg-gradient-to-r from-blue-600 via-green-600 to-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          data-testid="button-start-assessment"
        >
          Start Your Career Assessment
        </button>
      </div>
    </section>
  );
}
