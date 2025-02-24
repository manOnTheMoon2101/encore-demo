import { APIError, Gateway, Header, api } from "encore.dev/api";
import { authHandler } from "encore.dev/auth";

interface LoginParams {
  email: string;
  password: string;
}

export const login = api(
  { expose: true, auth: false, method: "GET", path: "/login" },
  async (params: LoginParams): Promise<{ token: string }> => {

    return { token: "dummy-token" };
  }
);

interface AuthParams {
  authorization: Header<"Authorization">;
}

export const myAuthHandler = authHandler(
  async (params: AuthParams): Promise<{ userID: string }> => {

    if (!params.authorization) {
      throw APIError.unauthenticated("no token provided");
    }
    if (params.authorization !== "dummy-token") {
      throw APIError.unauthenticated("invalid token");
    }

    return { userID: "dummy-user-id" };
  }
);

export const gateway = new Gateway({ authHandler: myAuthHandler });
