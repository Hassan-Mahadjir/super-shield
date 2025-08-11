"use client";
import React, { useState, useMemo } from "react";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Currency from "./Currency";
import { CartItem } from "@/store/cart/cart";

type Product = {
  id: number;
  created_at: string;
  name: string;
  images: string[];
  description: string;
  current_price: number;
  old_price: number;
  has_offer: boolean;
  language: string;
  elect_cost: number;
  third_cost: number;
};

interface CartEditFormProps {
  item: CartItem;
  onSave: (updatedItem: CartItem) => void;
  onCancel: () => void;
  product?: Product | null;
}

const CartEditForm = ({
  item,
  onSave,
  onCancel,
  product,
}: CartEditFormProps) => {
  const t = useTranslations("form");
  const tFrontWindowOptions = useTranslations("frontWindowOptions");
  const tBackWindowOptions = useTranslations("backWindowOptions");
  const tSidesWindowOptions = useTranslations("sidesWindowOptions");
  const tFrontSidesWindowOptions = useTranslations("frontsidesWindowOptions");
  const locale = useLocale();
  const theme = useTheme();
  const isDark = theme.theme === "dark";
  const currencyFill = isDark ? "white" : "black";

  const formSchema = z.object({
    name: z.string().min(1, { message: t("name") }),
    phone: z
      .string()
      .min(1, { message: t("phoneRequired") })
      .refine(
        (value) => {
          if (!value) return false;
          const [countryCode, phoneNumber] = value.split("-");
          if (!countryCode || !phoneNumber) return false;
          const fullNumber = countryCode + phoneNumber;
          const digitsOnly = phoneNumber.replace(/\D/g, "");
          if (digitsOnly.length < 7 || digitsOnly.length > 15) {
            return false;
          }
          return isValidPhoneNumber(fullNumber);
        },
        { message: t("phoneInvalid") }
      ),
    carMake: z.string().min(1, { message: t("carMake") }),
    carType: z.string().min(1, { message: t("carType") }),
    carModel: z.string().min(1, { message: t("carModel") }),
    front: z.string().min(1, { message: t("frontplaceholder") }),
    sidesfront: z.string().min(1, { message: t("sidesfrontplaceholder") }),
    sidesback: z.string().min(1, { message: t("sidesbackplaceholder") }),
    back: z.string().min(1, { message: t("backplaceholder") }),
    third: z.string().optional(),
    extra: z.string().optional(),
  });

  const windowFields = [
    {
      name: "front",
      label: t("front"),
      placeholder: t("frontplaceholder"),
    },
    {
      name: "sidesfront",
      label: t("sidesfront"),
      placeholder: t("sidesfrontplaceholder"),
    },
    {
      name: "sidesback",
      label: t("sidesback"),
      placeholder: t("sidesbackplaceholder"),
    },
    {
      name: "back",
      label: t("back"),
      placeholder: t("backplaceholder"),
    },
  ] as const;

  const frontOptions = [
    {
      value: "transparent",
      label: tFrontWindowOptions("transparent"),
    },
    {
      value: "lightdark",
      label: tFrontWindowOptions("lightdark"),
    },
  ];

  const backOptions = [
    {
      value: "transparent",
      label: tBackWindowOptions("transparent"),
    },
    {
      value: "lightdark",
      label: tBackWindowOptions("lightdark"),
    },
    {
      value: "darkShadow",
      label: tBackWindowOptions("darkShadow"),
    },
    {
      value: "mediumShadow",
      label: tBackWindowOptions("mediumShadow"),
    },
    {
      value: "dark",
      label: tBackWindowOptions("dark"),
    },
  ];

  const extraOptions = [
    {
      value: "yes",
      label: t("yes"),
    },
    {
      value: "no",
      label: t("no"),
    },
  ];

  const sidesOptions = [
    {
      value: "transparent",
      label: tSidesWindowOptions("transparent"),
    },
    {
      value: "lightdark",
      label: tSidesWindowOptions("lightdark"),
    },
    {
      value: "darkShadow",
      label: tSidesWindowOptions("darkShadow"),
    },
    {
      value: "mediumShadow",
      label: tSidesWindowOptions("mediumShadow"),
    },
    {
      value: "dark",
      label: tSidesWindowOptions("dark"),
    },
  ];

  const frontsidesOptions = [
    {
      value: "transparent",
      label: tFrontSidesWindowOptions("transparent"),
    },
    {
      value: "lightdark",
      label: tFrontSidesWindowOptions("lightdark"),
    },
    {
      value: "darkShadow",
      label: tFrontSidesWindowOptions("darkShadow"),
    },
    {
      value: "mediumShadow",
      label: tFrontSidesWindowOptions("mediumShadow"),
    },
    {
      value: "dark",
      label: tFrontSidesWindowOptions("dark"),
    },
  ];

  const countryCodes = [
    { code: "+966", flag: "🇸🇦", country: "Saudi Arabia" },
    { code: "+971", flag: "🇦🇪", country: "UAE" },
    { code: "+973", flag: "🇧🇭", country: "Bahrain" },
    { code: "+965", flag: "🇰🇼", country: "Kuwait" },
    { code: "+968", flag: "🇴🇲", country: "Oman" },
    { code: "+974", flag: "🇶🇦", country: "Qatar" },
    { code: "+20", flag: "🇪🇬", country: "Egypt" },
    { code: "+212", flag: "🇲🇦", country: "Morocco" },
    { code: "+216", flag: "🇹🇳", country: "Tunisia" },
    { code: "+213", flag: "🇩🇿", country: "Algeria" },
    { code: "+1", flag: "🇺🇸", country: "USA/Canada" },
    { code: "+44", flag: "🇬🇧", country: "UK" },
    { code: "+33", flag: "🇫🇷", country: "France" },
    { code: "+49", flag: "🇩🇪", country: "Germany" },
    { code: "+39", flag: "🇮🇹", country: "Italy" },
    { code: "+34", flag: "🇪🇸", country: "Spain" },
    { code: "+91", flag: "🇮🇳", country: "India" },
    { code: "+86", flag: "🇨🇳", country: "China" },
    { code: "+81", flag: "🇯🇵", country: "Japan" },
    { code: "+82", flag: "🇰🇷", country: "South Korea" },
    { code: "+61", flag: "🇦🇺", country: "Australia" },
    { code: "+64", flag: "🇳🇿", country: "New Zealand" },
  ];

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 2) {
      return digits;
    } else if (digits.length <= 5) {
      return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    } else {
      return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5)}`;
    }
  };

  const currentYear = new Date().getFullYear();
  const carYears = Array.from({ length: currentYear - 1989 + 1 + 1 }, (_, i) =>
    (1990 + i).toString()
  ).reverse();

  const THIRD_WINDOW_EXTRA_COST = product?.elect_cost || 50;
  const EXTRA_WINDOW_COST = product?.third_cost || 49;
  const BASE_PRICE = product?.current_price || 0;

  // Parse existing data from cart item description
  const parseExistingData = () => {
    if (!item.description || !item.description.includes("Customer:")) {
      return {
        name: "",
        phone: "",
        carMake: "",
        carType: "",
        carModel: "",
        front: "",
        sidesfront: "",
        sidesback: "",
        back: "",
        third: "",
        extra: "",
        selectedCountryCode: "+966",
        phoneNumber: "",
        customModel: "",
        thirdWindowExtra: true,
        extraWindowExtra: true,
      };
    }

    const parts = item.description.split(" | ");
    const customerName = parts[0]?.replace("Customer:", "").trim() || "";
    const phonePart = parts[1]?.replace("Phone:", "").trim() || "";

    // Parse phone number and country code
    let selectedCountryCode = "+966";
    let phoneNumber = "";
    if (phonePart.includes("-")) {
      const [countryCode, number] = phonePart.split("-");
      selectedCountryCode = countryCode || "+966";
      phoneNumber = number || "";
    } else {
      phoneNumber = phonePart;
    }

    // Parse car details - using translated labels
    const carMake = parts[2]?.split(":")[1]?.trim() || "";
    const carModel = parts[3]?.split(":")[1]?.trim() || "";
    const carType = parts[4]?.split(":")[1]?.trim() || "";

    // Parse window options - using translated labels
    const windowParts = parts.slice(5);
    const front = windowParts[0]?.split(":")[1]?.trim() || "";
    const sidesfront = windowParts[1]?.split(":")[1]?.trim() || "";
    const sidesback = windowParts[2]?.split(":")[1]?.trim() || "";
    const back = windowParts[3]?.split(":")[1]?.trim() || "";
    const third = windowParts[4]?.split(":")[1]?.trim() || "";
    const extra = windowParts[5]?.split(":")[1]?.trim() || "";

    // Convert translated display values back to canonical values
    const getCanonicalValue = (
      displayValue: string,
      options: { value: string; label: string }[]
    ) => {
      // Trim whitespace from display value for comparison
      const trimmedDisplayValue = displayValue.trim();
      const option = options.find(
        (opt) => opt.label.trim() === trimmedDisplayValue
      );
      return option ? option.value : displayValue;
    };

    // Convert front window display value to canonical value
    const frontCanonical = getCanonicalValue(front, frontOptions);

    // Convert back window display value to canonical value
    const backCanonical = getCanonicalValue(back, backOptions);

    // Convert sides windows display values to canonical values
    const sidesfrontCanonical = getCanonicalValue(
      sidesfront,
      frontsidesOptions
    );
    const sidesbackCanonical = getCanonicalValue(sidesback, sidesOptions);

    // Convert third and extra display values to canonical values
    const thirdCanonical =
      third === t("yes") ? "yes" : third === t("no") ? "no" : third;
    const extraCanonical =
      extra === t("yes") ? "yes" : extra === t("no") ? "no" : extra;

    // Check if extra costs were removed
    const thirdWindowExtra = !item.description.includes(
      "third removeExtra removed"
    );
    const extraWindowExtra = !item.description.includes(
      "extra removeExtra removed"
    );

    return {
      name: customerName,
      phone: phonePart,
      carMake,
      carType,
      carModel,
      front: frontCanonical,
      sidesfront: sidesfrontCanonical,
      sidesback: sidesbackCanonical,
      back: backCanonical,
      third: thirdCanonical,
      extra: extraCanonical,
      selectedCountryCode,
      phoneNumber,
      customModel: carModel === "other" ? carModel : "",
      thirdWindowExtra,
      extraWindowExtra,
    };
  };

  const existingData = parseExistingData();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: existingData.name,
      phone: existingData.phone,
      carMake: existingData.carMake,
      carType: existingData.carType,
      carModel: existingData.carModel,
      front: existingData.front,
      sidesfront: existingData.sidesfront,
      sidesback: existingData.sidesback,
      back: existingData.back,
      third: existingData.third,
      extra: existingData.extra,
    },
  });

  // State for extra cost toggles
  const [thirdWindowExtra, setThirdWindowExtra] = useState(
    existingData.thirdWindowExtra
  );
  const [extraWindowExtra, setExtraWindowExtra] = useState(
    existingData.extraWindowExtra
  );

  // State for custom model
  const [customModel, setCustomModel] = useState(existingData.customModel);

  // State for phone number
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    existingData.selectedCountryCode
  );
  const [phoneNumber, setPhoneNumber] = useState(existingData.phoneNumber);

  // Watch form values
  const watchFields = form.watch();
  const selectedModel = form.watch("carModel");

  // Calculate price
  const { totalPrice, extraCost } = useMemo(() => {
    let price = BASE_PRICE;
    let extra = 0;

    if (watchFields.third === "yes" && thirdWindowExtra) {
      extra += THIRD_WINDOW_EXTRA_COST;
    }

    if (watchFields.extra === "yes" && extraWindowExtra) {
      extra += EXTRA_WINDOW_COST;
    }

    price += extra;
    return { totalPrice: price, extraCost: extra };
  }, [
    watchFields.third,
    watchFields.extra,
    thirdWindowExtra,
    extraWindowExtra,
    BASE_PRICE,
    EXTRA_WINDOW_COST,
    THIRD_WINDOW_EXTRA_COST,
  ]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const make = values.carMake;
      const model = values.carModel === "other" ? customModel : values.carModel;
      const type = values.carType;

      const customerName = values.name;
      const customerPhone = values.phone;
      const name = `${make} ${model} (${type})`;

      const frontDisplay =
        tFrontWindowOptions(
          values.front as keyof typeof tFrontWindowOptions.raw
        ) || values.front;
      const backDisplay =
        tBackWindowOptions(
          values.back as keyof typeof tBackWindowOptions.raw
        ) || values.back;
      const sidesfrontDisplay =
        tFrontSidesWindowOptions(
          values.sidesfront as keyof typeof tFrontSidesWindowOptions.raw
        ) || values.sidesfront;
      const sidesbackDisplay =
        tSidesWindowOptions(
          values.sidesback as keyof typeof tSidesWindowOptions.raw
        ) || values.sidesback;
      const thirdDisplay = values.third === "yes" ? t("yes") : t("no");
      const extraDisplay = values.extra === "yes" ? t("yes") : t("no");

      const description =
        `Customer: ${customerName} | Phone: ${customerPhone} | ${t(
          "carMake"
        )}: ${make} | ${t("carModel")}: ${model} | ${t(
          "carType"
        )}: ${type} | ${t("front")}: ${frontDisplay} | ${t(
          "sidesfront"
        )}: ${sidesfrontDisplay} | ${t("sidesback")}: ${sidesbackDisplay} | ${t(
          "back"
        )}: ${backDisplay} | ${t("third")}: ${thirdDisplay} | ${t(
          "extra"
        )}: ${extraDisplay}` +
        (thirdWindowExtra && values.third === "yes"
          ? ` | ${t("third")} ${t("removeExtra")}`
          : "") +
        (extraWindowExtra && values.extra === "yes"
          ? ` | ${t("extra")} ${t("removeExtra")}`
          : "");

      const updatedItem: CartItem = {
        ...item,
        name,
        price: totalPrice,
        description,
      };

      console.log("CartEditForm - Price calculation:", {
        BASE_PRICE,
        THIRD_WINDOW_EXTRA_COST,
        EXTRA_WINDOW_COST,
        third: values.third,
        extra: values.extra,
        thirdWindowExtra,
        extraWindowExtra,
        totalPrice,
        extraCost,
        product: product ? "Available" : "Not available",
      });

      onSave(updatedItem);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleThirdWindowExtraRemoval = () => {
    setThirdWindowExtra(false);
  };

  const handleExtraWindowExtraRemoval = () => {
    setExtraWindowExtra(false);
  };

  const handleThirdWindowChange = (value: string) => {
    form.setValue("third", value);
    if (value === "no") {
      setThirdWindowExtra(false);
    } else if (value === "yes") {
      setThirdWindowExtra(true);
    }
  };

  const handleExtraWindowChange = (value: string) => {
    form.setValue("extra", value);
    if (value === "no") {
      setExtraWindowExtra(false);
    } else if (value === "yes") {
      setExtraWindowExtra(true);
    }
  };

  return (
    <div className="border border-red-200 dark:border-red-800 p-4 rounded-lg mt-4">
      <h3 className="text-lg font-semibold mb-4">{t("editSpecification")}</h3>

      {/* Price Display */}
      <div className="mb-4">
        {!thirdWindowExtra && watchFields.third === "yes" && (
          <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
            <span>
              {t("third")} {t("removeExtra")} {t("removed")}
            </span>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="px-2 py-0 h-6 text-xs"
              onClick={() => setThirdWindowExtra(true)}
            >
              {t("add")}
            </Button>
          </div>
        )}
        {!extraWindowExtra && watchFields.extra === "yes" && (
          <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
            <span>
              {t("extra")} {t("removeExtra")} {t("removed")}
            </span>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="px-2 py-0 h-6 text-xs"
              onClick={() => setExtraWindowExtra(true)}
            >
              {t("add")}
            </Button>
          </div>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-row justify-start">
                <FormLabel className="w-1/4">{t("name")}</FormLabel>
                <FormControl>
                  <Input
                    className="w-3/4 placeholder:text-sm"
                    placeholder={t("namePlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number Field */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex flex-row justify-start">
                <FormLabel className="w-1/4">{t("phone")}</FormLabel>
                <FormControl>
                  <div className="flex w-3/4 gap-2">
                    <Input
                      className="w-2/3 placeholder:text-sm"
                      placeholder={t("phonePlaceholder")}
                      value={formatPhoneNumber(phoneNumber)}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[-\s]/g, "");
                        setPhoneNumber(rawValue);
                        field.onChange(selectedCountryCode + "-" + rawValue);
                      }}
                      onBlur={(e) => {
                        const rawValue = e.target.value.replace(/[-\s]/g, "");
                        setPhoneNumber(rawValue);
                      }}
                    />
                    <Select
                      value={selectedCountryCode}
                      onValueChange={(value) => {
                        setSelectedCountryCode(value);
                        field.onChange(value + "-" + phoneNumber);
                      }}
                    >
                      <SelectTrigger className="w-1/3 placeholder:text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {countryCodes.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            <span className="flex items-center gap-2">
                              <span>{country.flag}</span>
                              <span>{country.code}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Car Make */}
          <FormField
            control={form.control}
            name="carMake"
            render={({ field }) => (
              <FormItem className="flex flex-row justify-start">
                <FormLabel className="w-1/4">{t("carMake")}</FormLabel>
                <FormControl>
                  <Input
                    className="w-3/4 placeholder:text-sm"
                    placeholder={t("carMakePlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Car Type */}
          <FormField
            control={form.control}
            name="carType"
            render={({ field }) => (
              <FormItem className="flex flex-row justify-start">
                <FormLabel className="w-1/4">{t("carType")}</FormLabel>
                <FormControl>
                  <Input
                    className="w-3/4 placeholder:text-sm"
                    placeholder={t("carTypePlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Car Model (Year) */}
          <FormField
            control={form.control}
            name="carModel"
            render={({ field }) => (
              <FormItem className="flex flex-row justify-start">
                <FormLabel className="w-1/4">{t("carModel")}</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      if (value !== "other") setCustomModel("");
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      className="w-3/4 placeholder:text-sm"
                      dir={locale === "ar" ? "rtl" : "ltr"}
                    >
                      <SelectValue placeholder={t("carModelPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent dir={locale === "ar" ? "rtl" : "ltr"}>
                      {carYears.map((year: string) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                      <SelectItem value="other">{t("other")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                {selectedModel === "other" && (
                  <Input
                    className="w-3/4 placeholder:text-sm"
                    placeholder={t("carModelPlaceholder")}
                    value={customModel}
                    onChange={(e) => setCustomModel(e.target.value)}
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tint Options */}
          {windowFields.map((windowField) => {
            let options: { value: string; label: string }[] = [];
            if (windowField.name === "front") options = frontOptions;
            else if (windowField.name === "back") options = backOptions;
            else if (windowField.name === "sidesfront")
              options = frontsidesOptions;
            else if (windowField.name === "sidesback") options = sidesOptions;

            return (
              <FormField
                key={windowField.name}
                control={form.control}
                name={windowField.name}
                render={({ field }) => (
                  <FormItem className="flex flex-row justify-start">
                    <FormLabel className="w-1/4">{windowField.label}</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger
                          className="w-3/4 placeholder:text-sm"
                          dir={locale === "ar" ? "rtl" : "ltr"}
                        >
                          <SelectValue placeholder={windowField.placeholder} />
                        </SelectTrigger>
                        <SelectContent dir={locale === "ar" ? "rtl" : "ltr"}>
                          {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}

          {/* Third window */}
          <FormField
            control={form.control}
            name="third"
            render={({ field }) => (
              <FormItem className="flex flex-row justify-start">
                <FormLabel className="w-1/4">{t("third")}</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleThirdWindowChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      className="w-3/4 placeholder:text-sm"
                      dir={locale === "ar" ? "rtl" : "ltr"}
                    >
                      <SelectValue placeholder={t("yesorno")} />
                    </SelectTrigger>
                    <SelectContent dir={locale === "ar" ? "rtl" : "ltr"}>
                      {extraOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Extra window */}
          <FormField
            control={form.control}
            name="extra"
            render={({ field }) => (
              <FormItem className="flex flex-row justify-start">
                <FormLabel className="w-1/4">{t("extra")}</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleExtraWindowChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      className="w-3/4 placeholder:text-sm "
                      dir={locale === "ar" ? "rtl" : "ltr"}
                    >
                      <SelectValue placeholder={t("yesornoElec")} />
                    </SelectTrigger>
                    <SelectContent dir={locale === "ar" ? "rtl" : "ltr"}>
                      {extraOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-2">
            <span className="font-semibold">{t("totalPrice")}: </span>
            <span className="text-lg flex items-center gap-1">
              {totalPrice}{" "}
              <span
                style={{
                  display: "inline-flex",
                  verticalAlign: "middle",
                  width: 24,
                  height: 24,
                }}
              >
                <Currency currencyFill={currencyFill} />
              </span>
            </span>
          </div>

          {extraCost > 0 && (
            <div className="text-sm text-red-600 flex items-center gap-2 mt-1">
              {watchFields.third === "yes" && thirdWindowExtra && (
                <span>
                  + {t("third")} {t("removeExtra")}: {THIRD_WINDOW_EXTRA_COST}{" "}
                  <span
                    style={{
                      display: "inline-flex",
                      verticalAlign: "middle",
                      width: 24,
                      height: 24,
                    }}
                  >
                    <Currency currencyFill={currencyFill} />
                  </span>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="px-2 py-0 h-6 text-xs ml-2"
                    onClick={handleThirdWindowExtraRemoval}
                  >
                    {t("removeExtra")}
                  </Button>
                </span>
              )}
              {watchFields.extra === "yes" && extraWindowExtra && (
                <span>
                  + {t("extra")} {t("removeExtra")}: {EXTRA_WINDOW_COST}{" "}
                  <span
                    style={{
                      display: "inline-flex",
                      verticalAlign: "middle",
                      width: 24,
                      height: 24,
                    }}
                  >
                    <Currency currencyFill={currencyFill} />
                  </span>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="px-2 py-0 h-6 text-xs ml-2"
                    onClick={handleExtraWindowExtraRemoval}
                  >
                    {t("removeExtra")}
                  </Button>
                </span>
              )}
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {t("saveChanges")}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              {t("cancel")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CartEditForm;
