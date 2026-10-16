import LatePaymentCalculator from "@/components/LatePaymentCalculator";
import { penaltyCopy } from "@/lib/late-payment-penalty/copy";
import { copy } from "@/lib/i18n";

const t = { ...penaltyCopy.fr, lang: "fr" };

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

export default function LatePaymentCalculatorFrPage() {
  return <LatePaymentCalculator t={t} kitBrand={copy.fr.footerBrand} />;
}
