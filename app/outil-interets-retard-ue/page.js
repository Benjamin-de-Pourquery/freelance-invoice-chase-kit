import EuLatePaymentCalculator from "@/components/EuLatePaymentCalculator";
import { euPenaltyCopy } from "@/lib/eu-late-payment/copy";
import { copy } from "@/lib/i18n";

const t = { ...euPenaltyCopy.fr, lang: "fr" };

export const metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
  alternates: {
    languages: {
      fr: "/outil-interets-retard-ue",
      en: "/en/eu-late-payment-calculator",
    },
  },
};

export default function EuLatePaymentCalculatorFrPage() {
  return <EuLatePaymentCalculator t={t} kitBrand={copy.fr.footerBrand} />;
}
