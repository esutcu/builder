export interface SystemStats {
    totalStudents: number;
    activeStudents: number;
    totalTeachers: number;
    activeTeachers: number;
    totalCourses: number;
    activeCourses: number;
    totalRevenue: number;
    monthlyRevenue: number;
  }
  
  export interface UserActivity {
    id: string;
    user: {
      name: string;
      role: 'student' | 'teacher';
      avatar?: string;
    };
    action: string;
    timestamp: string;
  }
  
  export interface SystemHealthMetric {
    name: string;
    value: number;
    status: 'healthy' | 'warning' | 'critical';
    trend: 'up' | 'down' | 'stable';
  }
  
  export interface Package {
    id: string;
    name: string;
    price: number;
    credits: number;
    isActive: boolean;
    subscriberCount: number;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'teacher' | 'admin';
    status: 'active' | 'inactive' | 'suspended';
    joinDate: string;
    lastActive: string;
  }
  
  export interface RevenueData {
    period: string;
    amount: number;
    growth: number;
  }