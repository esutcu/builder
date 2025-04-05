export interface TimeSlot {
  date: string;
  dayName: string;
  times: string[];
}

export interface PlannedClass {
  date: string;
  time: string;
  student: string;
}

export interface TeachingStats {
  monthlyHours: number;
  totalHours: number;
  activeStudents: number;
  monthlyGrowth: number;
  totalGrowth: number;
  studentGrowth: number;
}
