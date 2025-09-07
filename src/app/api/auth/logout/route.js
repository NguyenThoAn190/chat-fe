import { cookies } from "next/headers";
import { decodeJwt } from "jose";
import { redirect } from "next/navigation";
import { postRequest } from "@/_utils/route-handler-utils";

export async function POST(request) {
  console.log(decodeJwt);
  console.log(redirect);
  // call logout api
  postRequest("/auth/logout", request);

  // set cookie
  cookies().set("token", "", {
    expires: new Date(0),
  });
  cookies().set("refresh_token", "", {
    expires: new Date(0),
  });

  return Response.json({
    status: "success",
    message: "Logout successfull",
  });
}
