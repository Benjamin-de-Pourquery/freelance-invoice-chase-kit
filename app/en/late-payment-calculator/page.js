import LatePaymentCalculator from "@/components/LatePaymentCalculator";
import { penaltyCopy } from "@/lib/late-payment-penalty/copy";
import { copy } from "@/lib/i18n";

const t = { ...penaltyCopy.en, lang: "en" };

export const metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
  alternates: {
    languages: {
      fr: "/outil-penalites-retard",
      en: "/en/late-payment-calculator",
    },
  },
};

export default function LatePaymentCalculatorEnPage() {
  return <LatePaymentCalculator t={t} kitBrand={copy.en.footerBrand} />;
}
