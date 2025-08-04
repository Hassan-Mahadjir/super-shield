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

import { useCart } from "@/store/cart/cart";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Currency from "./Currency";

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

const CustomizedProducts = ({ product }: { product?: Product }) => {
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
          // The value format is "countryCode-phoneNumber" (e.g., "+966-56229839281")
          const [countryCode, phoneNumber] = value.split("-");
          if (!countryCode || !phoneNumber) return false;

          // Combine them for validation
          const fullNumber = countryCode + phoneNumber;

          // Basic length check for common formats
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

  // Country codes with flags
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

  // Format phone number for display (55-123-283 format)
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");

    // Format as 55-123-283
    if (digits.length <= 2) {
      return digits;
    } else if (digits.length <= 5) {
      return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    } else {
      return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5)}`;
    }
  };

  // Generate car years from 1990 to current year
  const currentYear = new Date().getFullYear();
  const carYears = Array.from({ length: currentYear - 1989 }, (_, i) =>
    (1990 + i).toString()
  ).reverse();

  const THIRD_WINDOW_EXTRA_COST = product?.elect_cost || 50; // Example extra cost for third window
  const EXTRA_WINDOW_COST = product?.third_cost || 49; // Example extra cost for extra window
  const BASE_PRICE = product?.current_price || 0; // Example base price for the product

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
    },
  });

  const addToCart = useCart((state) => state.addToCart);

  // State for extra cost toggles
  const [thirdWindowExtra, setThirdWindowExtra] = useState(true);
  const [extraWindowExtra, setExtraWindowExtra] = useState(true);

  // State for custom model
  const [customModel, setCustomModel] = useState("");

  // State for phone number
  const [selectedCountryCode, setSelectedCountryCode] = useState("+966");
  const [phoneNumber, setPhoneNumber] = useState("");

  // State for success message
  const [showSuccess, setShowSuccess] = useState(false);

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

  // Handle submit
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // create user or update
      const userData = {
        phone_number: values.phone,
        name: values.name,
      };
      console.log(userData);

      const make = values.carMake;
      const model = values.carModel === "other" ? customModel : values.carModel;
      const type = values.carType;

      // Also add to cart for consistency
      const customerName = values.name;
      const customerPhone = values.phone;
      const name = `${make} ${model} (${type})`;

      // Translate the canonical values for display in description
      const frontDisplay = tFrontWindowOptions(
        values.front as keyof typeof tFrontWindowOptions.raw
      );
      const backDisplay = tBackWindowOptions(
        values.back as keyof typeof tBackWindowOptions.raw
      );
      const sidesfrontDisplay = tSidesWindowOptions(
        values.sidesfront as keyof typeof tSidesWindowOptions.raw
      );
      const sidesbackDisplay = tSidesWindowOptions(
        values.sidesback as keyof typeof tSidesWindowOptions.raw
      );
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

      const id = product?.id ?? Date.now();
      const price = totalPrice;
      const image =
        product?.images && product.images.length > 0
          ? product.images[0]
          : "/hero.png";
      const old_price = product?.old_price ?? undefined;
      addToCart(id, price, name, image, description, 1, old_price);

      // Reset form after successful submission
      form.reset();
      setPhoneNumber("");
      setSelectedCountryCode("+966");
      setThirdWindowExtra(true);
      setExtraWindowExtra(true);
      setCustomModel("");

      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting order:", error);
      // You might want to show an error message to the user here
    }
  };

  // Handle third window extra cost removal
  const handleThirdWindowExtraRemoval = () => {
    setThirdWindowExtra(false);
    // Don't reset the form value, let user keep their yes/no selection
  };

  // Handle extra window extra cost removal
  const handleExtraWindowExtraRemoval = () => {
    setExtraWindowExtra(false);
    // Don't reset the form value, let user keep their yes/no selection
  };

  // Handle third window selection change
  const handleThirdWindowChange = (value: string) => {
    form.setValue("third", value);
    // If user selects "no", remove the extra cost
    if (value === "no") {
      setThirdWindowExtra(false);
    } else if (value === "yes") {
      // If user selects "yes", enable the extra cost
      setThirdWindowExtra(true);
    }
  };

  // Handle extra window selection change
  const handleExtraWindowChange = (value: string) => {
    form.setValue("extra", value);
    // If user selects "no", remove the extra cost
    if (value === "no") {
      setExtraWindowExtra(false);
    } else if (value === "yes") {
      // If user selects "yes", enable the extra cost
      setExtraWindowExtra(true);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-extrabold justify-center text-center">
        {t("orderSepcification")}
      </h2>
      <div className="flex flex-col mt-4">
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-row justify-start">
                  <FormLabel className="w-1/6">{t("name")}</FormLabel>
                  <FormControl>
                    <Input
                      className="w-3/4"
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
                  <FormLabel className="w-1/6">{t("phone")}</FormLabel>
                  <FormControl>
                    <div className="flex w-3/4 gap-2">
                      <Select
                        value={selectedCountryCode}
                        onValueChange={(value) => {
                          setSelectedCountryCode(value);
                          // Update the form field with new country code
                          field.onChange(value + "-" + phoneNumber);
                        }}
                      >
                        <SelectTrigger className="w-1/3">
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
                      <Input
                        className="w-2/3"
                        placeholder={t("phonePlaceholder")}
                        value={formatPhoneNumber(phoneNumber)}
                        onChange={(e) => {
                          // Remove formatting for storage
                          const rawValue = e.target.value.replace(/[-\s]/g, "");
                          setPhoneNumber(rawValue);
                          field.onChange(selectedCountryCode + "-" + rawValue);
                        }}
                        onBlur={(e) => {
                          // Format on blur for better UX
                          const rawValue = e.target.value.replace(/[-\s]/g, "");
                          setPhoneNumber(rawValue);
                        }}
                      />
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
                  <FormLabel className="w-1/6">{t("carMake")}</FormLabel>
                  <FormControl>
                    <Input
                      className="w-3/4"
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
                  <FormLabel className="w-1/6">{t("carType")}</FormLabel>
                  <FormControl>
                    <Input
                      className="w-3/4"
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
                  <FormLabel className="w-1/6">{t("carModel")}</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (value !== "other") setCustomModel("");
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className="w-3/4"
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
                      className="w-3/4"
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
              // Determine options based on window field
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
                      <FormLabel className="w-1/6">
                        {windowField.label}
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger
                            className="w-3/4"
                            dir={locale === "ar" ? "rtl" : "ltr"}
                          >
                            <SelectValue
                              placeholder={windowField.placeholder}
                            />
                          </SelectTrigger>
                          <SelectContent dir={locale === "ar" ? "rtl" : "ltr"}>
                            {options.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
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

            {/* third window sides */}
            <FormField
              control={form.control}
              name="third"
              render={({}) => (
                <FormItem className="flex flex-row justify-start">
                  <FormLabel className="w-1/6">{t("third")}</FormLabel>
                  <FormControl>
                    <Select onValueChange={handleThirdWindowChange}>
                      <SelectTrigger
                        className="w-3/4"
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
            {/* extra window sides */}
            <FormField
              control={form.control}
              name="extra"
              render={({}) => (
                <FormItem className="flex flex-row justify-start">
                  <FormLabel className="w-1/6">{t("extra")}</FormLabel>
                  <FormControl>
                    <Select onValueChange={handleExtraWindowChange}>
                      <SelectTrigger
                        className="w-3/4"
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
            <Button
              type="submit"
              className="w-full hover:bg-red-800 transition duration-300 hover:text-white"
            >
              {t("add")}
            </Button>

            {showSuccess && (
              <div className="text-green-600 text-center text-sm font-medium">
                ✓ {t("addedSuccessfully")}
              </div>
            )}
          </form>
        </Form>
        {/* Note: For a fully searchable and free-text select, consider using react-select or similar library. */}
      </div>
    </div>
  );
};

export default CustomizedProducts;
