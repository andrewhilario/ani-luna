import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "URL parameter is required" },
      { status: 400 }
    );
  }

  try {
    const decodedUrl = decodeURIComponent(url);
    const response = await fetch(decodedUrl, {
      headers: {
        Referer: "https://ee.netmagcdn.com/",
        Origin: "https://ee.netmagcdn.com/"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (decodedUrl.endsWith(".ts")) {
      const buffer = await response.arrayBuffer();
      return new NextResponse(buffer, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "video/mp2t"
        }
      });
    }

    let text = await response.text();
    text = text.replace(/([^\s"']+\.(m3u8|ts))/g, (match) => {
      const absolute = new URL(match, decodedUrl).href;
      return `/api/video-proxy?url=${encodeURIComponent(absolute)}`;
    });

    return new NextResponse(text, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/vnd.apple.mpegurl"
      }
    });
  } catch (err) {
    console.error("Proxy error:", err);
    return NextResponse.json(
      { error: "Failed to fetch stream" },
      { status: 500 }
    );
  }
}
