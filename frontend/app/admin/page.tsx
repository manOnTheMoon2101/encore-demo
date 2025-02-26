import { redirect } from "next/navigation";
import getRequestClient from "../lib/getRequestClient";
import { admin, APIError, ErrCode } from "../lib/client";

export default async function Admin() {
  const client = getRequestClient();
  let response: admin.DashboardData | undefined;
  let animals: admin.AnimalsResponse | undefined;
  let error: APIError | undefined;

  try {
    response = await (await client).admin.getDashboardData();
    animals = await (await client).admin.getAnimalsData();
    console.log(animals);
  } catch (err) {
    error = err as APIError;
  }

  if (error) {
    if (error.code === ErrCode.Unauthenticated)
      redirect("/auth/unauthenticated?from=%2Fadmin");
    else throw error;
  }

  return (
    <>
      <div>
        {animals ? animals.data.map((animal : any) => <div key={animal.id}>{animal.name}</div>) : null}
      </div>
    </>
  );
}
