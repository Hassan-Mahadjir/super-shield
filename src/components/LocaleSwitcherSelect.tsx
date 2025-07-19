import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface LocaleSwitcherSelectProps {
  defaultValue: string;
  label: string;
  children: React.ReactNode;
  width: string; // allow both Tailwind class and raw CSS value
}

export default function LocaleSwitcherSelect({
  defaultValue,
  label,
  children,
  width,
}: LocaleSwitcherSelectProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedLocale, setSelectedLocale] = useState<string>(defaultValue);

  useEffect(() => {
    const storedLocale = localStorage.getItem("locale");
    if (storedLocale && storedLocale !== selectedLocale) {
      setSelectedLocale(storedLocale);
    }
  }, []);

  const handleValueChange = (newLocale: string) => {
    setSelectedLocale(newLocale);
    localStorage.setItem("locale", newLocale);
    // Replace the locale in the pathname (assuming /[locale]/... structure)
    const segments = pathname.split("/");
    if (segments[1]) {
      segments[1] = newLocale;
      const newPath = segments.join("/") || "/";
      router.push(newPath);
    }
  };

  // Extract locale values and labels from children (option elements)
  const localeOptions = Array.isArray(children)
    ? children.map((child: any) => ({
        value: child.props.value,
        label: child.props.children,
      }))
    : [];

  return (
    <div>
      <label>{label}</label>
      <Select value={selectedLocale} onValueChange={handleValueChange}>
        <SelectTrigger
          className={width.startsWith("w-") ? width : undefined}
          style={!width.startsWith("w-") ? { width } : undefined}
          dir={selectedLocale === "ar" ? "rtl" : "ltr"}
        >
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent dir={selectedLocale === "ar" ? "rtl" : "ltr"}>
          <SelectGroup>
            {localeOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
