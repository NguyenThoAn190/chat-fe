import { postRequest } from "@/_utils/route-handler-utils";

export async function POST(request) {
  return postRequest("/auth/reset-password", request);
}
