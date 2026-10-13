export interface ServiceItem {
  slug: string;
  title: string;
  category: string;
  shortDesc: string;
  destinations: string;
  badge: string;
  processingTime: string;
  eligibility: string[];
  documents: string[];
  processSteps: { step: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

export interface JobOpportunity {
  id: string;
  title: string;
  country: string;
  location: string;
  category: string;
  type: "Full-Time" | "Contract" | "Seasonal";
  salaryRange: string;
  publishedDate: string;
  deadline: string;
  employerVerified: boolean;
  employerName: string;
  overview: string;
  requirements: string[];
  responsibilities: string[];
  visaNotes: string;
}

export interface GuideArticle {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
}
