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
          id: "act-123",
          userId: "user-456",
          action: "payment_processed",
          timestamp: new Date().toISOString(),
        },
        {
          id: "act-124",
          userId: "user-789",
          action: "account_created",
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
