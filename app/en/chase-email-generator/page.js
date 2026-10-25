import ChaseEmailGenerator from "@/components/ChaseEmailGenerator";
import { chaseEmailCopy } from "@/lib/chase-email-generator/copy";
import { copy } from "@/lib/i18n";

const t = { ...chaseEmailCopy.en, lang: "en" };

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

export default function ChaseEmailGeneratorEnPage() {
  return <ChaseEmailGenerator t={t} kitBrand={copy.en.footerBrand} />;
}
