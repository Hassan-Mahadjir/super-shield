import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { ModeToggle } from "@/components/modeToggle";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <div>
      <LocaleSwitcher />
      <ModeToggle />
      <h1>{t("title")}</h1>
      <Link href="/about">{t("about")}</Link>
    </div>
  );
}
