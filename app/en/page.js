import Landing from "@/components/Landing";
import { copy } from "@/lib/i18n";

export const metadata = {
  title: copy.en.metaTitle,
  description: copy.en.metaDesc,
  alternates: { languages: { fr: "/", en: "/en" } },
};

export default function EnHomePage() {
  return <Landing t={copy.en} />;
}
