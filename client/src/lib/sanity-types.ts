export interface SanityPost {
    _id: string;
    title: string;
    slug: { current: string };
    description: string;
    category: string;
    readTime: string;
    publishedAt: string;
    imageUrl: string;
    body: any[];
}

export interface SanityTestimonial {
    _id: string;
    name: string;
    role: string;
    quote: string;
    imageUrl: string;
    initial: string;
    gradient: string;
    isActive: boolean;
}

export interface SanityPackage {
    _id: string;
    title: string;
    price: string;
    description: string;
    features: string[];
    category: string;
    razorpayButtonId: string;
}

export interface SanityData {
    posts: SanityPost[];
    testimonials: SanityTestimonial[];
    packages: SanityPackage[];
}
