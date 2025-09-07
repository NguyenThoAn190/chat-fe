import { getRequest } from "@/_utils/route-handler-utils";
import { cookies } from "next/headers";
import { decodeJwt } from "jose";

export async function GET(request, { params }) {
  console.log(params);

  const { searchParams } = new URL(request.url);
  const provider = searchParams.get("provider");
  return getRequest(`/auth/login-via-3rd?provider=${provider}`);
}

export async function POST(request) {
  const body = await request.json();
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/auth/login-via-3rd`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "API-Key": process.env.DATA_API_KEY,
      },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to login user with 3rd party");
  }

  const data = await res.json();

  if (data.error) {
    throw data.error;
  }

  const decoded = decodeJwt(data.token);

  // set cookie
  cookies().set("token", data.token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    expires: new Date(decoded.exp * 1000),
  });

  // set refresh token
  if (data.refresh_token) {
    cookies().set("refresh_token", data.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
  }

  // return null
  return Response.json({
    status: "success",
    message: "Login successfull",
  });
}
