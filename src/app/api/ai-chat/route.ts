import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const CHAT_API_BASE_URL =
  process.env.CHAT_API_BASE_URL || "http://192.168.1.7:3100";
const CHAT_API_PREDICTION_ID =
  process.env.CHAT_API_PREDICTION_ID || "c2b95b51-9a73-4ce4-a72d-f410c950c766";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question } = body || {};

    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    const url = `${CHAT_API_BASE_URL}/api/v1/prediction/${CHAT_API_PREDICTION_ID}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `AI service error: ${response.status}` },
        { status: response.status }
      );
    }

    // Try to parse as JSON first
    const contentType = response.headers.get("content-type") || "";
    
    if (contentType.includes("application/json")) {
      const data = await response.json();
      // Extract text from various possible response formats
      const text = data?.text || data?.response || data?.answer || data?.result || data?.content || data?.message || JSON.stringify(data);
      return NextResponse.json({ text });
    }

    // If not JSON, return as text
    const text = await response.text();
    return NextResponse.json({ text });
  } catch (error) {
    console.error("AI Chat error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
