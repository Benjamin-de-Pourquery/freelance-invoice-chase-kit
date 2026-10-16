import InvoiceChecker from "@/components/InvoiceChecker";
import { checkerCopy } from "@/lib/invoice-checker/copy";
import { copy } from "@/lib/i18n";

const t = { ...checkerCopy.fr, lang: "fr" };

export const metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
  alternates: {
    languages: {
      fr: "/outil-verification-facture",
      en: "/en/invoice-checker",
    },
  },
};

export default function InvoiceCheckerFrPage() {
  return <InvoiceChecker t={t} kitBrand={copy.fr.footerBrand} />;
}
