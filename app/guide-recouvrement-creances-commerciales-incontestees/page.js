import CommercialDebtRecoveryGuide from "@/components/CommercialDebtRecoveryGuide";
import { guideCopy } from "@/lib/commercial-debt-recovery/copy";
import { copy } from "@/lib/i18n";

const t = { ...guideCopy.fr, lang: "fr" };
const BASE = "https://freelance-invoice-chase-kit.vercel.app";

export const metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
  alternates: {
    canonical: `${BASE}${t.canonicalPath}`,
    languages: {
      fr: t.canonicalPath,
      en: "/en/commercial-debt-recovery-procedure",
    },
  },
};

export default function CommercialDebtRecoveryGuideFrPage() {
  return (
    <CommercialDebtRecoveryGuide t={t} kitBrand={copy.fr.footerBrand} />
  );
}
