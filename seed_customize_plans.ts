import { storage } from "./server/storage";

const customizePlansData = [
  {
    name: "Career Report",
    description: "Get a detailed report of your psychometric assessment for a scientific analysis of your interests. Find out where your interests lie and which future paths you can potentially consider.",
    price: "1500",
    priceType: "one-time",
    duration: null,
    displayOrder: 1,
    isActive: true
  },
  {
    name: "Career Report + Career Counselling",
    description: "Connect with India's top career coaches to analyse your psychometric report and shortlist the top three career paths you're most likely to enjoy and excel at.",
    price: "3000",
    priceType: "one-time",
    duration: null,
    displayOrder: 2,
    isActive: true
  },
  {
    name: "Knowledge Gateway + Career Helpline Access",
    description: "Unlock holistic information on your career paths and get direct access to Mentoria's experts, who will resolve your career-related queries through our dedicated Career Helpline. Validate your career decisions from now until you land a job you love.",
    price: "100",
    priceType: "monthly",
    duration: "per month",
    displayOrder: 3,
    isActive: true
  },
  {
    name: "One-to-One Session with a Career Expert",
    description: "Resolve your career queries and glimpse into your future world through a one-on-one session with an expert from your chosen field.",
    price: "3500",
    priceType: "per-interaction",
    duration: "1 hour",
    displayOrder: 4,
    isActive: true
  },
  {
    name: "College Admission Planning",
    description: "Get unbiased recommendations and details on your future college options in India and abroad, organised in one resourceful planner.",
    price: "3000",
    priceType: "one-time",
    duration: "for a planner with top 10 colleges in India OR any 1 country abroad",
    displayOrder: 5,
    isActive: true
  },
  {
    name: "Exam Stress Management",
    description: "Get expert guidance on tackling exam stress, planning your study schedule, revision tips and more from India's top educators. Increase your chances of acing exams with a calm and clear mind.",
    price: "1000",
    priceType: "one-time",
    duration: "one-hour session",
    displayOrder: 6,
    isActive: true
  },
  {
    name: "College Admissions Planner - 100 (CAP-100)",
    description: "Get an expert-curated list of colleges based on verified cut-offs. CAP-100 ranks the top 100 colleges into four tiers to help you plan smarter: Indian Ivy League, Target, Smart Backup, and Safe Bet colleges. You can then shortlist colleges based on where you stand!",
    price: "199",
    priceType: "one-time",
    duration: "ranked list of the top 100 colleges in your course",
    displayOrder: 7,
    isActive: true
  }
];

async function seedCustomizePlans() {
  console.log("Seeding customize plans...");
  
  for (const plan of customizePlansData) {
    try {
      await storage.createCustomizePlan(plan);
      console.log(`Created: ${plan.name}`);
    } catch (error) {
      console.error(`Failed to create ${plan.name}:`, error);
    }
  }
  
  console.log("Customize plans seeded successfully!");
  process.exit(0);
}

seedCustomizePlans();
