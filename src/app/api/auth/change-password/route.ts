import { postRequest } from "@/services/utils/apiUtils";

export async function POST(request: any) {
  return postRequest("/auth/change-password", request);
}
