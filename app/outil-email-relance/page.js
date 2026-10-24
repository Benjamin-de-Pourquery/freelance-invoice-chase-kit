import ChaseEmailGenerator from "@/components/ChaseEmailGenerator";
import { chaseEmailCopy } from "@/lib/chase-email-generator/copy";
import { copy } from "@/lib/i18n";

const t = { ...chaseEmailCopy.fr, lang: "fr" };

export const metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
  alternates: {
    languages: {
      fr: "/outil-email-relance",
      en: "/en/chase-email-generator",
    },
  },
};

export default function ChaseEmailGeneratorFrPage() {
  return <ChaseEmailGenerator t={t} kitBrand={copy.fr.footerBrand} />;
}
