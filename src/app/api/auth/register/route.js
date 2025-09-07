import { postRequest } from "@/_utils/route-handler-utils";

export async function POST(request) {
  return postRequest("/auth/register", request);
  // return Response.json(data);
  // return Response.json({ message: "Register successfull" });
}
