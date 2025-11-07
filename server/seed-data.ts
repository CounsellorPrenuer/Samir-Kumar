import { storage } from "./storage";

export async function seedDatabase() {
  try {
    console.log("Checking database seed data...");
    
    const testimonialData = [
        {
          name: "Priya Verma",
          role: "Class 12 Student → Engineering",
          quote: "The psychometric test was incredibly insightful! It helped me understand my strengths and choose the right engineering stream. The counselors were patient and supportive throughout.",
          initial: "P",
          gradient: "bg-gradient-to-br from-pink-500 to-purple-600",
          imageUrl: "/attached_assets/stock_images/professional_busines_21e83427.jpg",
          isActive: true
        },
        {
          name: "Amit Kumar",
          role: "MBA Graduate → Marketing Manager",
          quote: "Careerskope provided exceptional guidance during my MBA placement. The mock interviews and resume optimization helped me secure a position at a leading multinational company.",
          initial: "A",
          gradient: "bg-gradient-to-br from-orange-500 to-red-600",
          imageUrl: "/attached_assets/stock_images/professional_busines_03b735cf.jpg",
          isActive: true
        },
        {
          name: "Sneha Kapoor",
          role: "Working Professional → Career Switch",
          quote: "After 5 years in finance, I wanted to switch to digital marketing. The career counseling sessions at Careerskope gave me the confidence and roadmap to make this transition successfully.",
          initial: "S",
          gradient: "bg-gradient-to-br from-teal-500 to-cyan-600",
          imageUrl: "/attached_assets/stock_images/professional_busines_9c2a9400.jpg",
          isActive: true
        },
        {
          name: "Vikram Singh",
          role: "Class 10 Student → Science Stream",
          quote: "As a confused 10th grader, I did not know which stream to choose. The counselors at Careerskope helped me discover my passion for science and guided me toward the right path.",
          initial: "V",
          gradient: "bg-gradient-to-br from-indigo-500 to-blue-600",
          imageUrl: "/attached_assets/stock_images/young_professional_s_6c8146cb.jpg",
          isActive: true
        },
        {
          name: "Neha Agarwal",
          role: "College Graduate → HR Professional",
          quote: "The professional development workshops and interview preparation were game-changers. I landed my dream HR role within weeks of completing my graduation, thanks to Careerskope!",
          initial: "N",
          gradient: "bg-gradient-to-br from-rose-500 to-pink-600",
          imageUrl: "/attached_assets/stock_images/young_professional_s_d5c140f5.jpg",
          isActive: true
        },
        {
          name: "Rahul Patel",
          role: "Recent Graduate → Data Analyst",
          quote: "The psychometric assessment and career coaching sessions gave me clarity about my strengths and helped me land my dream job in data analytics.",
          initial: "R",
          gradient: "bg-gradient-to-br from-red-500 to-pink-600",
          imageUrl: "/attached_assets/stock_images/professional_busines_2ee7751f.jpg",
          isActive: true
        },
        {
          name: "Ananya Sharma",
          role: "Software Engineer → Product Manager",
          quote: "Careerskope helped me transition from engineering to product management seamlessly. The career mapping and mentorship were invaluable in my journey.",
          initial: "A",
          gradient: "bg-gradient-to-br from-green-500 to-blue-600",
          imageUrl: "/attached_assets/stock_images/professional_busines_b44588be.jpg",
          isActive: true
        },
        {
          name: "Rajiv Mishra",
          role: "Recent Graduate → Data Analyst",
          quote: "The psychometric assessment and career coaching sessions gave me clarity about my strengths and helped me land my dream job in data analytics.",
          initial: "R",
          gradient: "bg-gradient-to-br from-blue-500 to-purple-600",
          imageUrl: "/attached_assets/stock_images/professional_busines_3c128897.jpg",
          isActive: true
        }
    ];

    const existingTestimonials = await storage.getTestimonials();
    const existingNames = new Set(existingTestimonials.map(t => t.name));
    
    let addedCount = 0;
    for (const testimonial of testimonialData) {
      if (!existingNames.has(testimonial.name)) {
        await storage.createTestimonial(testimonial);
        addedCount++;
      }
    }
    
    if (addedCount > 0) {
      console.log(`Added ${addedCount} new testimonials`);
    }
    
    if (existingTestimonials.length < testimonialData.length) {
      console.log(`Testimonials: ${existingTestimonials.length + addedCount}/${testimonialData.length} in database`);
    }

    const blogData = [
        {
          title: "Navigating Corporate Careers: How Expert Guidance Can Accelerate Your Professional Journey",
          description: "Learn how expert corporate career guidance can help students and professionals map their skills, identify opportunities, and accelerate growth in the corporate world",
          category: "professionals",
          readTime: "5 min read",
          imageUrl: "/attached_assets/stock_images/business_professiona_bd849125.jpg",
          content: "In today's fast-paced corporate world, advancing your career requires more than just hard work—it demands strategic planning, self-awareness, and the right guidance. Many professionals find themselves at crossroads, unsure if their current path aligns with their skills, interests, or long-term goals. This is where expert corporate career guidance can make all the difference.\n\nUnderstanding Your Strengths and Opportunities\nCorporate growth begins with a deep understanding of your unique strengths and areas for improvement. Advanced psychometric assessments help professionals gain clear insights into their personality, skillsets, and career potential, allowing them to identify opportunities that align with their natural abilities.\n\nBridging the Gap Between Talent and Opportunity\nSuccess is about knowing where and how to apply your skills. Careerskope's tailored mentorship programs guide professionals through industry trends, emerging job roles, and AI-driven transformations, ensuring that you strategically position yourself for success.\n\nPersonalized Career Roadmaps\nNavigating transitions—whether moving to management, switching industries, or aiming for leadership—is easier with a structured roadmap. Careerskope's career counselling framework provides actionable insights, step-by-step guidance, and coaching sessions to make informed decisions without losing momentum.\n\nProfessional Development Beyond Job Titles\nCorporate success requires more than technical expertise. Communication, leadership, networking, and personal branding are critical. Careerskope's professional development programs focus on building these essential skills to help you advance confidently.\n\nConclusion\nWhether you're a fresh graduate entering the corporate world or an experienced professional seeking new opportunities, expert career guidance can unlock doors you didn't know existed. With Careerskope, you get more than advice—you gain a partner committed to your long-term success.",
          isActive: true
        },
        {
          title: "10 Essential Career Planning Tips for Students",
          description: "Discover key strategies for students to plan their career path effectively, from self-assessment to skill development and networking",
          category: "students",
          readTime: "7 min read",
          imageUrl: "/attached_assets/stock_images/students_career_plan_6f6bae86.jpg",
          content: "Career planning is one of the most important aspects of a student's life. Making the right decisions early can set you up for long-term success. Here are 10 essential career planning tips every student should follow:\n\n1. Start Early\nThe earlier you start thinking about your career, the better. Begin exploring different fields and industries while you're still in school.\n\n2. Understand Your Strengths\nTake psychometric tests and career assessments to understand your natural abilities, interests, and personality traits.\n\n3. Research Career Options\nDon't limit yourself to traditional career paths. Research emerging fields and opportunities that align with your interests.\n\n4. Set Clear Goals\nDefine short-term and long-term career goals. Having a clear vision helps you stay focused and motivated.\n\n5. Build Relevant Skills\nIdentify the skills required for your desired career and start developing them through courses, internships, and projects.\n\n6. Gain Practical Experience\nInternships, volunteering, and part-time jobs provide valuable hands-on experience and help you build your resume.\n\n7. Network Actively\nConnect with professionals in your field of interest. Attend career fairs, workshops, and networking events.\n\n8. Seek Mentorship\nFind mentors who can guide you through your career journey and provide valuable insights.\n\n9. Stay Flexible\nBe open to exploring different paths. Your interests and goals may evolve as you gain more experience.\n\n10. Invest in Professional Guidance\nWork with career counselors who can provide personalized advice and help you navigate important decisions.\n\nConclusion\nCareer planning is an ongoing process. By following these tips and seeking expert guidance when needed, you can build a successful and fulfilling career.",
          isActive: true
        },
        {
          title: "From Campus to Corporate: A Smooth Transition Guide",
          description: "Essential tips for recent graduates to successfully transition from campus life to the corporate world with confidence",
          category: "graduates",
          readTime: "6 min read",
          imageUrl: "/attached_assets/stock_images/young_graduate_profe_3e5b535a.jpg",
          content: "The transition from campus to corporate life can be both exciting and challenging. Here's your comprehensive guide to making this transition smooth and successful:\n\nUnderstanding Corporate Culture\nCorporate culture is very different from campus life. Learn about workplace etiquette, professional communication, and organizational hierarchies.\n\nDeveloping Professional Skills\nFocus on building essential professional skills like time management, teamwork, communication, and problem-solving.\n\nBuilding Your Personal Brand\nCreate a strong LinkedIn profile, maintain a professional online presence, and start networking with industry professionals.\n\nPreparing for Interviews\nPractice common interview questions, prepare your elevator pitch, and research companies thoroughly before interviews.\n\nManaging Expectations\nUnderstand that your first job might not be perfect. Focus on learning and gaining experience.\n\nSeeking Mentorship\nFind mentors within your organization who can guide you through the initial months and help you navigate corporate challenges.\n\nContinuous Learning\nStay updated with industry trends, take relevant courses, and continuously develop your skills.\n\nWork-Life Balance\nLearn to maintain a healthy work-life balance from the beginning of your career.\n\nConclusion\nWith the right mindset, preparation, and guidance, you can successfully transition from campus to corporate and build a thriving career.",
          isActive: true
        }
    ];

    const existingBlogs = await storage.getBlogArticles();
    const existingTitles = new Set(existingBlogs.map(b => b.title));
    
    let addedBlogCount = 0;
    for (const blog of blogData) {
      if (!existingTitles.has(blog.title)) {
        await storage.createBlogArticle(blog);
        addedBlogCount++;
      }
    }
    
    if (addedBlogCount > 0) {
      console.log(`Added ${addedBlogCount} new blog articles`);
    }
    
    if (existingBlogs.length < blogData.length) {
      console.log(`Blog articles: ${existingBlogs.length + addedBlogCount}/${blogData.length} in database`);
    }

    console.log("Database initialization complete");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
