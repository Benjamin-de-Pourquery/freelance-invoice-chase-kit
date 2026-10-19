import UsFreelancePaymentChecker from "@/components/UsFreelancePaymentChecker";
import { usFreelanceCopy } from "@/lib/us-freelance-payment/copy";
import { copy } from "@/lib/i18n";

const t = { ...usFreelanceCopy.fr, lang: "fr" };

export const metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
  alternates: {
    languages: {
      fr: "/outil-loi-paiement-freelance-us",
      en: "/en/us-freelance-payment-checker",
    },
  },
};

export default function UsFreelancePaymentCheckerFrPage() {
  return (
    <UsFreelancePaymentChecker t={t} kitBrand={copy.fr.footerBrand} />
  );
}
