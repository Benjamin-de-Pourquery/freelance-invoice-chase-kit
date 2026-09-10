import Link from "next/link";

export default function LangToggle({ href, label }) {
  return (
    <Link className="lang-toggle" href={href} hrefLang={label.toLowerCase()} aria-label={`Switch to ${label}`}>
      {label}
    </Link>
  );
}
