import { api } from "encore.dev/api";
import { getAuthData } from "~encore/auth";

// Define interface for dashboard data with appropriate properties
interface DashboardData {
  stats: {
    activeUsers: number;
    totalRevenue: number;
    conversionRate: number;
  };
  recentActivity: Array<{
    id: string;
    userId: string;
    action: string;
    timestamp: string;
  }>;
  userInfo: {
    id: string;
    role: string;
    lastLogin: string;
  };
}

export const getDashboardData = api(
  {
    expose: true, // Is publicly accessible
    auth: true, // Auth handler validation is required
    method: "GET",
    path: "/admin",
  },
  async (): Promise<DashboardData> => {
    const userID = getAuthData()!.userID;
    return {
      stats: {
        activeUsers: 1254,
        totalRevenue: 45897.65,
        conversionRate: 3.2,
      },
      recentActivity: [
        {
          id: "69",
          userId: "user-456",
          action: "testing 1",
          timestamp: new Date().toISOString(),
        },
        {
          id: "420",
          userId: "user-789",
          action: "testing 2",
          timestamp: new Date().toISOString(),
        },
        {
          id: "911",
          userId: "user-789",
          action: "testing 3",
          timestamp: new Date().toISOString(),
        },
        {
          id: "9000",
          userId: "user-789",
          action: "testing 4",
          timestamp: new Date().toISOString(),
        },
      ],
      userInfo: {
        id: userID,
        role: "admin",
        lastLogin: new Date().toISOString(),
      },
    };
  }
);
