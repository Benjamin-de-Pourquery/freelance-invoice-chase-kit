import { NextResponse } from "next/server";
import { verifyCheckoutSession, hasStripeSecret } from "@/lib/stripe";
import { readPackFile, PACK_FILES } from "@/lib/pack";

export const runtime = "nodejs";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");
  const fileKey = searchParams.get("file");

  if (!hasStripeSecret()) {
    return NextResponse.json(
      { error: "configure STRIPE_SECRET_KEY", reason: "missing_secret" },
      { status: 503 }
    );
  }

  if (!fileKey || !PACK_FILES[fileKey]) {
    return NextResponse.json({ error: "unknown_file" }, { status: 404 });
  }

  const result = await verifyCheckoutSession(sessionId);
  if (!result.ok) {
    return NextResponse.json({ error: result.reason }, { status: 401 });
  }

  const file = await readPackFile(fileKey);
  if (!file) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  return new NextResponse(file.buf, {
    status: 200,
    headers: {
      "Content-Type": file.mime,
      "Content-Disposition": `attachment; filename="${file.filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
