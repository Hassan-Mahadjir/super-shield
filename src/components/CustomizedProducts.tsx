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
};

const CustomizedProducts = ({ product }: { product?: Product }) => {
  const t = useTranslations("form");
  const tFrontWindowOptions = useTranslations("frontWindowOptions");
  const tBackWindowOptions = useTranslations("backWindowOptions");
  const tSidesWindowOptions = useTranslations("sidesWindowOptions");
  const locale = useLocale();
  const theme = useTheme();
  const isDark = theme.theme === "dark";
  const currencyFill = isDark ? "white" : "black";

  const formSchema = z.object({
    name: z.string().min(1, { message: t("name") }),
    phone: z.string().min(1, { message: t("phone") }),
    front: z.string().min(1, { message: t("frontplaceholder") }),
    back: z.string().min(1, { message: t("backplaceholder") }),
    sides: z.string().min(1, { message: t("sidesplaceholder") }),
    third: z.string().optional(),
    carMake: z.string().min(1, { message: t("carMake") }),
    carModel: z.string().min(1, { message: t("carModel") }),
    carType: z.string().min(1, { message: t("carType") }),
  });

  const windowFields = [
    {
      name: "front",
      label: t("front"),
      placeholder: t("frontplaceholder"),
    },
    {
      name: "back",
      label: t("back"),
      placeholder: t("backplaceholder"),
    },
    {
      name: "sides",
      label: t("sides"),
      placeholder: t("sidesplaceholder"),
    },
    {
      name: "third",
      label: t("third"),
      placeholder: t("thirdplaceholder"),
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

  // Country codes with flags
  const countryCodes = [
    { code: "+966", flag: "🇸🇦", country: "Saudi Arabia" },
    { code: "+971", flag: "🇦🇪", country: "UAE" },
    { code: "+973", flag: "🇧🇭", country: "Bahrain" },
    { code: "+965", flag: "🇰🇼", country: "Kuwait" },
    { code: "+968", flag: "🇴🇲", country: "Oman" },
    { code: "+974", flag: "🇶🇦", country: "Qatar" },
  ];

  // Generate car years from 1990 to current year
  const currentYear = new Date().getFullYear();
  const carYears = Array.from({ length: currentYear - 1989 }, (_, i) =>
    (1990 + i).toString()
  ).reverse();

  const THIRD_WINDOW_EXTRA_COST = 200; // Example extra cost for third window
  const BASE_PRICE = product?.current_price || 0; // Example base price for the product

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      front: "",
      back: "",
      sides: "",
      third: "",
      carMake: "",
      carModel: "",
      carType: "",
    },
  });

  const addToCart = useCart((state) => state.addToCart);

  // State for extra cost toggle
  const [thirdWindowExtra, setThirdWindowExtra] = useState(true);

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
    // If third window is selected and extra is enabled, add extra cost
    if (watchFields.third && thirdWindowExtra) {
      extra += THIRD_WINDOW_EXTRA_COST;
    }
    // You can add more logic for other options here
    price += extra;
    return { totalPrice: price, extraCost: extra };
  }, [watchFields.third, thirdWindowExtra]);

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
      const sidesDisplay = tSidesWindowOptions(
        values.sides as keyof typeof tSidesWindowOptions.raw
      );
      const thirdDisplay = values.third
        ? tSidesWindowOptions(
            values.third as keyof typeof tSidesWindowOptions.raw
          )
        : "";

      const description =
        `Customer: ${customerName} | Phone: ${customerPhone} | ${t(
          "carMake"
        )}: ${make} | ${t("carModel")}: ${model} | ${t(
          "carType"
        )}: ${type} | ${t("front")}: ${frontDisplay} | ${t(
          "back"
        )}: ${backDisplay} | ${t("sides")}: ${sidesDisplay} | ${t(
          "third"
        )}: ${thirdDisplay}` +
        (thirdWindowExtra ? ` | ${t("third")} ${t("removeExtra")}` : "");

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
      setCustomModel("");

      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting order:", error);
      // You might want to show an error message to the user here
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
          {!thirdWindowExtra && watchFields.third && (
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
                        onValueChange={setSelectedCountryCode}
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
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                          field.onChange(selectedCountryCode + e.target.value);
                        }}
                      />
                    </div>
                  </FormControl>
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
              else if (windowField.name === "sides") options = sidesOptions;
              else if (windowField.name === "third") options = backOptions; // or a separate thirdOptions if needed
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
                <span>
                  + {t("third")} {t("removeExtra")}: {THIRD_WINDOW_EXTRA_COST}{" "}
                  {/* Replace R.S with SVG */}
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
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="px-2 py-0 h-6 text-xs"
                  onClick={() => setThirdWindowExtra(false)}
                  disabled={!thirdWindowExtra}
                >
                  {t("removeExtra")}
                </Button>
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
