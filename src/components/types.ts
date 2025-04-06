export interface Teacher {
  id: number;
  name: string;
  subject: string;
  availableSlots: {
    date: string;
    time: string;
  }[];
}

export interface UpcomingClass {
  id: number;
  subject: string;
  teacher: string;
  date: string;
  time: string;
  canJoin: boolean;
}

export interface PricingPlan {
  title: string;
  price: string;
  features: string[];
  isPro?: boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  image: string;
  content: string;
}
