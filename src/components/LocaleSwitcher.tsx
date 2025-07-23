"use client";
import { routing } from "@/i18n/routing";
import { useLocale } from "next-intl";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";
import { SelectItem } from "./ui/select";
import { useEffect, useState } from "react";

interface LocaleSwitcherProps {
  width?: string;
}

export default function LocaleSwitcher({
  width = "w-32",
}: LocaleSwitcherProps) {
  const locale: string = useLocale();
  const [defaultLocale, setDefaultLocale] = useState(locale);

  useEffect(() => {
    const storedLocale = localStorage.getItem("locale");
    if (storedLocale && storedLocale !== defaultLocale) {
      setDefaultLocale(storedLocale);
    }
  }, [locale]);

  const languageNames: Record<string, { en: string; ar: string }> = {
    en: { en: "English", ar: "الإنجليزية" },
    ar: { en: "Arabic", ar: "العربية" },
  };

  return (
    <div>
      <LocaleSwitcherSelect width={width} defaultValue={defaultLocale} label="">
        {routing.locales.map((cur) => (
          <SelectItem key={cur} value={cur}>
            {languageNames[cur]
              ? languageNames[cur][locale as "en" | "ar"]
              : cur}
          </SelectItem>
        ))}
      </LocaleSwitcherSelect>
    </div>
  );
}
