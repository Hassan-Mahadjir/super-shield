"use client";
import { routing } from "@/i18n/routing";
import { useLocale } from "next-intl";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";
import { useEffect, useState } from "react";

export default function LocaleSwitcher() {
  const locale: string = useLocale();
  const [defaultLocale, setDefaultLocale] = useState(locale);

  useEffect(() => {
    const storedLocale = localStorage.getItem("locale");
    if (storedLocale && storedLocale !== defaultLocale) {
      setDefaultLocale(storedLocale);
    }
  }, [locale]);

  return (
    <div>
      <LocaleSwitcherSelect defaultValue={defaultLocale} label="">
        {routing.locales.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </LocaleSwitcherSelect>
    </div>
  );
}
