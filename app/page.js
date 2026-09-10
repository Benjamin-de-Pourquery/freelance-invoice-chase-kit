import Landing from "@/components/Landing";
import { copy } from "@/lib/i18n";

export const metadata = {
  title: copy.fr.metaTitle,
  description: copy.fr.metaDesc,
  alternates: { languages: { fr: "/", en: "/en" } },
};

export default function HomePage() {
  return <Landing t={copy.fr} />;
}
