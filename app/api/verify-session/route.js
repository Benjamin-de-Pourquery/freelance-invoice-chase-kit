import { NextResponse } from "next/server";
import { verifyCheckoutSession, hasStripeSecret } from "@/lib/stripe";
import { PACK_FILES } from "@/lib/pack";

export const runtime = "nodejs";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");
  const lang = searchParams.get("lang") === "en" ? "en" : "fr";

  if (!hasStripeSecret()) {
    return NextResponse.json(
      { ok: false, reason: "missing_secret", files: [] },
      { status: 503 }
    );
  }

  const result = await verifyCheckoutSession(sessionId);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, reason: result.reason, files: [] },
      { status: 401 }
    );
  }

  const files = Object.entries(PACK_FILES).map(([key, meta]) => ({
    key,
    label: meta.label[lang] || meta.label.fr,
  }));

  return NextResponse.json({
    ok: true,
    reason: "paid",
    session: result.session,
    files,
  });
}
