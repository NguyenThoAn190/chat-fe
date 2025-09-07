import { cookies } from "next/headers";
import { decodeJwt } from "jose";

export async function POST(request) {
  const body = await request.json();
  // trim input values
  body.username = body.username.trim();
  body.password = body.password.trim();

  // validate input
  if (!body.username || !body.password) {
    return Response.json({
      status: 400,
      message: "Please enter a valid username and password",
    });
  }

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "API-Key": process.env.DATA_API_KEY,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return Response.json({
      status: res.status,
      message: res.statusText,
    });
  }

  const data = await res.json();
  const decoded = decodeJwt(data.token);

  // set cookie
  cookies().set("token", data.token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
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

  return Response.json({
    status: "success",
    message: "Login successfull",
  });
}
