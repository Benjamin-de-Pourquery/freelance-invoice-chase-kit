import UkLatePaymentCalculator from "@/components/UkLatePaymentCalculator";
import { ukLatePaymentCopy } from "@/lib/uk-late-payment/copy";
import { copy } from "@/lib/i18n";

const t = { ...ukLatePaymentCopy.en, lang: "en" };

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

export default function UkLatePaymentCalculatorEnPage() {
  return <UkLatePaymentCalculator t={t} kitBrand={copy.en.footerBrand} />;
}
