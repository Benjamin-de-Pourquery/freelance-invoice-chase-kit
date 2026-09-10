import { Suspense } from "react";
import SuccessClient from "@/components/SuccessClient";

export const metadata = {
  title: "Thank you — Freelancer Overdue Invoice Kit",
  description: "Download your pack after payment confirmation.",
  robots: { index: false, follow: false },
};

export default function EnSuccessPage() {
  return (
    <Suspense fallback={<main className="wrap"><p className="lead">…</p></main>}>
      <SuccessClient lang="en" />
    </Suspense>
  );
}
