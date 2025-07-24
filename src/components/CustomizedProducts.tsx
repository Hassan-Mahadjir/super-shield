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
      value: tFrontWindowOptions("transparent"),
      label: tFrontWindowOptions("transparent"),
    },
    {
      value: tFrontWindowOptions("lightdark"),
      label: tFrontWindowOptions("lightdark"),
    },
  ];

  const backOptions = [
    {
      value: tBackWindowOptions("transparent"),
      label: tBackWindowOptions("transparent"),
    },
    {
      value: tBackWindowOptions("lightdark"),
      label: tBackWindowOptions("lightdark"),
    },
    {
      value: tBackWindowOptions("darkShadow"),
      label: tBackWindowOptions("darkShadow"),
    },
    {
      value: tBackWindowOptions("mediumShadow"),
      label: tBackWindowOptions("mediumShadow"),
    },
    {
      value: tBackWindowOptions("dark"),
      label: tBackWindowOptions("dark"),
    },
  ];

  const sidesOptions = [
    {
      value: tBackWindowOptions("transparent"),
      label: tBackWindowOptions("transparent"),
    },
    {
      value: tBackWindowOptions("lightdark"),
      label: tBackWindowOptions("lightdark"),
    },
    {
      value: tBackWindowOptions("darkShadow"),
      label: tBackWindowOptions("darkShadow"),
    },
    {
      value: tBackWindowOptions("mediumShadow"),
      label: tBackWindowOptions("mediumShadow"),
    },
    {
      value: tBackWindowOptions("dark"),
      label: tBackWindowOptions("dark"),
    },
  ];

  const carData = {
    Toyota: {
      models: ["Corolla", "Camry", "RAV4"],
      types: ["Sedan", "SUV", "Truck"],
    },
    BMW: {
      models: ["3 Series", "5 Series", "X5"],
      types: ["Coupe", "Sedan", "SUV"],
    },
    Tesla: {
      models: ["Model S", "Model 3", "Model X"],
      types: ["Electric", "SUV", "Sedan"],
    },
  };

  const THIRD_WINDOW_EXTRA_COST = 200; // Example extra cost for third window
  const BASE_PRICE = product?.current_price || 0; // Example base price for the product

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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

  // State for custom model/type
  const [customMake, setCustomMake] = useState("");
  const [customModel, setCustomModel] = useState("");
  const [customType, setCustomType] = useState("");

  // Watch form values
  const watchFields = form.watch();
  const selectedMake = form.watch("carMake");
  const selectedModel = form.watch("carModel");
  const selectedType = form.watch("carType");

  // Filtered options
  const filteredModels =
    selectedMake &&
    (carData as Record<string, { models: string[]; types: string[] }>)[
      selectedMake
    ]
      ? (carData as Record<string, { models: string[]; types: string[] }>)[
          selectedMake
        ].models
      : [];
  const filteredTypes =
    selectedMake &&
    (carData as Record<string, { models: string[]; types: string[] }>)[
      selectedMake
    ]
      ? (carData as Record<string, { models: string[]; types: string[] }>)[
          selectedMake
        ].types
      : [];

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
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Compose product name/description
    const make = values.carMake === "other" ? customMake : values.carMake;
    const model = values.carModel === "other" ? customModel : values.carModel;
    const type = values.carType === "other" ? customType : values.carType;
    const name = `Custom Tint: ${make} ${model} (${type})`;
    const description =
      `${t("front")}: ${values.front}, ${t("back")}: ${values.back}, ${t(
        "sides"
      )}: ${values.sides}, ${t("third")}: ${values.third}` +
      (thirdWindowExtra ? ` + ${t("third")} ${t("removeExtra")}` : "");
    addToCart(
      Date.now(), // id (unique)
      totalPrice,
      "/hero.png", // image (placeholder)
      name,
      description,
      1 // quantity
    );
    // Optionally reset form or show a message
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
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        // Reset model/type if make changes
                        form.setValue("carModel", "");
                        form.setValue("carType", "");
                        setCustomMake("");
                        setCustomModel("");
                        setCustomType("");
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className="w-3/4"
                        dir={locale === "ar" ? "rtl" : "ltr"}
                      >
                        <SelectValue placeholder={t("carMakePlaceholder")} />
                      </SelectTrigger>
                      <SelectContent dir={locale === "ar" ? "rtl" : "ltr"}>
                        {Object.keys(carData).map((make) => (
                          <SelectItem key={make} value={make}>
                            {make}
                          </SelectItem>
                        ))}
                        <SelectItem value="other">{t("other")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {selectedMake === "other" && (
                    <Input
                      className="w-3/4"
                      placeholder={t("carMakePlaceholder")}
                      value={customMake}
                      onChange={(e) => setCustomMake(e.target.value)}
                    />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Car Model */}
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
                      // Note: For full search, consider using react-select
                    >
                      <SelectTrigger
                        className="w-3/4"
                        dir={locale === "ar" ? "rtl" : "ltr"}
                      >
                        <SelectValue placeholder={t("carModelPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent dir={locale === "ar" ? "rtl" : "ltr"}>
                        {filteredModels.map((model: string) => (
                          <SelectItem key={model} value={model}>
                            {model}
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
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (value !== "other") setCustomType("");
                      }}
                      defaultValue={field.value}
                      // Note: For full search, consider using react-select
                    >
                      <SelectTrigger
                        className="w-3/4"
                        dir={locale === "ar" ? "rtl" : "ltr"}
                      >
                        <SelectValue placeholder={t("carTypePlaceholder")} />
                      </SelectTrigger>
                      <SelectContent dir={locale === "ar" ? "rtl" : "ltr"}>
                        {filteredTypes.map((type: string) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {selectedType === "other" && (
                    <Input
                      className="w-3/4"
                      placeholder={t("carTypePlaceholder")}
                      value={customType}
                      onChange={(e) => setCustomType(e.target.value)}
                    />
                  )}
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
          </form>
        </Form>
        {/* Note: For a fully searchable and free-text select, consider using react-select or similar library. */}
      </div>
    </div>
  );
};

export default CustomizedProducts;
