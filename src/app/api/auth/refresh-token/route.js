import refreshToken from "@/_utils/refresh-token";

export async function GET(request, { params }) {
  console.log(request, params);

  return refreshToken();
}
