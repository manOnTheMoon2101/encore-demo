import {redirect} from "next/navigation";
import getRequestClient from "../lib/getRequestClient";
import {admin, APIError, ErrCode} from "../lib/client";

export default async function Admin() {
  const client = getRequestClient();
  let response: admin.DashboardData | undefined;
  let error: APIError | undefined;

  try {
    response = await client.admin.getDashboardData();
  } catch (err) {
    error = err as APIError;
  }

  if (error) {
    if (error.code === ErrCode.Unauthenticated) redirect("/auth/unauthenticated?from=%2Fadmin");
    else throw error;
  }

  return (
    <section>
      <h1 className="text-3xl">Admin Dashboard</h1>
      <br/>
      <p>{response?.recentActivity.map((x:any) => x.id)}</p>
    </section>
  );
}
