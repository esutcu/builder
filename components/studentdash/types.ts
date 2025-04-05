export interface Teacher {
  name: string;
}

export interface TimeSlot {
  date: string;
  dayName: string;
  times: string[];
}

export interface PlannedClass {
  date: string;
  time: string;
  teacher: string;
}

export interface Package {
  title: string;
  price: string;
  credits: number;
  isPopular?: boolean;
}
