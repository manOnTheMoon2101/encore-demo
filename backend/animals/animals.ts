import { api } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import { db } from "../src/db/index";
import { animals } from "../src/db/schema";
import { eq } from "drizzle-orm";

// Define the request structure
interface GetAnimalsRequest {
  query?: {
    type?: string;
  };
}

// Define the response structure
interface AnimalsResponse {
  data: any[];
  userInfo: {
    id: string;
    role: string;
    lastLogin: string;
  };
}

export const getAnimals = api(
  {
    expose: true,
    auth: false,
    method: "GET",
    path: "/animals",
  },
  async (req: GetAnimalsRequest): Promise<AnimalsResponse> => {
    try {
      const userID = getAuthData()!.userID;
      const type = req.query?.type;
      
      let result;
      if (type) {
        result = await db
          .select()
          .from(animals)
          .where(eq(animals.animalType, type));
      } else {
        result = await db.select().from(animals);
      }
      
      return {
        data: result,
        userInfo: {
          id: userID,
          role: "admin",
          lastLogin: new Date().toISOString(),
        }
      };
    } catch (err) {
      throw new Error(`Error fetching animals: ${err}`);
    }
  }
);