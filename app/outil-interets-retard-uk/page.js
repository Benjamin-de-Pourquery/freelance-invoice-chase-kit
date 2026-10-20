import UkLatePaymentCalculator from "@/components/UkLatePaymentCalculator";
import { ukLatePaymentCopy } from "@/lib/uk-late-payment/copy";
import { copy } from "@/lib/i18n";

const t = { ...ukLatePaymentCopy.fr, lang: "fr" };

export const metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
  alternates: {
    languages: {
      fr: "/outil-interets-retard-uk",
      en: "/en/uk-late-payment-calculator",
    },
  },
};

export default function UkLatePaymentCalculatorFrPage() {
  return <UkLatePaymentCalculator t={t} kitBrand={copy.fr.footerBrand} />;
}
