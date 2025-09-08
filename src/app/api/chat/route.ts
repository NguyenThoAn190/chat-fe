import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const OLLAMA_BASE_URL =
  process.env.CHATBOT_BASE_URL || "http://36.50.176.152:11434";
const BASIC_USER = process.env.CHATBOT_BASIC_USER;
const BASIC_PASS = process.env.CHATBOT_BASIC_PASS;
const DEFAULT_MODEL = process.env.DEFAULT_MODEL;

// Tạo header Authorization: Basic ... nếu có user/pass
function authHeader(): Record<string, string> {
  if (BASIC_USER && BASIC_PASS) {
    const token = Buffer.from(`${BASIC_USER}:${BASIC_PASS}`).toString("base64");
    return { Authorization: `Basic ${token}` };
  }
  return {};
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    messages,
    stream = true, // mặc định stream cho chat
    model = DEFAULT_MODEL,
  } = body || {};

  const res = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    } as HeadersInit,
    body: JSON.stringify({ model, messages, stream }),
  });

  if (!stream) {
    // Trả JSON một phát
    const data = await res.json();
    return NextResponse.json(data);
  }

  // Streaming: pipe thẳng NDJSON từ Ollama về client
  // Đặt header để client đọc từng chunk
  const readable = res.body;
  if (!readable) {
    return new NextResponse("No stream", { status: 500 });
  }
  return new NextResponse(readable, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "Transfer-Encoding": "chunked",
      // Cho phép gọi từ browser nếu khác origin (tùy bạn)
      // 'Access-Control-Allow-Origin': '*',
    },
  });
}
