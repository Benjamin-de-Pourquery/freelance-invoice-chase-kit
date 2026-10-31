import PaymentTermsGenerator from "@/components/PaymentTermsGenerator";
import { paymentTermsCopy } from "@/lib/payment-terms-generator/copy";
import { copy } from "@/lib/i18n";

const t = { ...paymentTermsCopy.fr, lang: "fr" };

export const metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
  alternates: {
    languages: {
      fr: "/outil-conditions-paiement",
      en: "/en/payment-terms-generator",
    },
  },
};

export default function PaymentTermsGeneratorFrPage() {
  return <PaymentTermsGenerator t={t} kitBrand={copy.fr.footerBrand} />;
}
