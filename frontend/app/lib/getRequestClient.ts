import { cookies } from "next/headers";
import Client, { Environment } from "./client";

const getRequestClient = () => {
  const token = cookies().get("auth-token")?.value || "";
  const env =
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:4000"
      : Environment("staging");

  return new Client(env, {
    auth: { authorization: token },
  });
};

export default getRequestClient;
