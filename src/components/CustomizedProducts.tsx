"use client";
import React, { useState, useMemo } from "react";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCart } from "@/store/cart/cart";

const formSchema = z.object({
  front: z.string().min(1, { message: "Select a front window option." }),
  back: z.string().min(1, { message: "Select a back window option." }),
  sides: z.string().min(1, { message: "Select a sides window option." }),
  carMake: z.string().min(1, { message: "Select a car make." }),
  carModel: z.string().min(1, { message: "Select a car model." }),
  carType: z.string().min(1, { message: "Select a car type." }),
});

const tintOptions = [
  { value: "clear", label: "Clear (75% transparency)" },
  { value: "light", label: "Light Tint (50% transparency)" },
  { value: "medium", label: "Medium Tint (35% transparency)" },
  { value: "dark", label: "Dark (20% transparency)" },
  { value: "blackout", label: "Blackout (5% transparency)" },
];

const windowFields = [
  {
    name: "front",
    label: "Front Window",
    placeholder: "Select front window option",
  },
  {
    name: "back",
    label: "Back Window",
    placeholder: "Select back window option",
  },
  {
    name: "sides",
    label: "Sides Window",
    placeholder: "Select sides window option",
  },
] as const;

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

const BACK_WINDOW_EXTRA_COST = 200; // Example extra cost for back window
const BASE_PRICE = 1000; // Example base price for the product

const CustomizedProducts = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      front: "",
      back: "",
      sides: "",
      carMake: "",
      carModel: "",
      carType: "",
    },
  });

  const addToCart = useCart((state) => state.addToCart);

  // State for extra cost toggle
  const [backWindowExtra, setBackWindowExtra] = useState(true);

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
    // If back window is selected and extra is enabled, add extra cost
    if (watchFields.back && backWindowExtra) {
      extra += BACK_WINDOW_EXTRA_COST;
    }
    // You can add more logic for other options here
    price += extra;
    return { totalPrice: price, extraCost: extra };
  }, [watchFields.back, backWindowExtra]);

  // Handle submit
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Compose product name/description
    const make = values.carMake === "other" ? customMake : values.carMake;
    const model = values.carModel === "other" ? customModel : values.carModel;
    const type = values.carType === "other" ? customType : values.carType;
    const name = `Custom Tint: ${make} ${model} (${type})`;
    const description =
      `Front: ${values.front}, Back: ${values.back}, Sides: ${values.sides}` +
      (backWindowExtra ? " + Back Window Extra" : "");
    addToCart(
      Date.now(), // id (unique)
      totalPrice,
      name,
      "/hero.png", // image (placeholder)
      description,
      1 // quantity
    );
    // Optionally reset form or show a message
  };

  return (
    <div>
      <Button disabled className="rounded-sm text-sm bg-red-500 text-white">
        Options
      </Button>
      <div className="flex flex-col mt-4">
        {/* Price Display */}
        <div className="mb-4">
          <span className="font-semibold">Total Price: </span>
          <span className="text-lg">{totalPrice} R.S</span>
          {extraCost > 0 && (
            <div className="text-sm text-red-600 flex items-center gap-2 mt-1">
              <span>+ Back Window Extra: {BACK_WINDOW_EXTRA_COST} R.S</span>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="px-2 py-0 h-6 text-xs"
                onClick={() => setBackWindowExtra(false)}
                disabled={!backWindowExtra}
              >
                Remove Extra
              </Button>
            </div>
          )}
          {!backWindowExtra && watchFields.back && (
            <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
              <span>Back Window Extra removed.</span>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="px-2 py-0 h-6 text-xs"
                onClick={() => setBackWindowExtra(true)}
              >
                Add Again
              </Button>
            </div>
          )}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Tint Options */}
            {windowFields.map((windowField) => (
              <FormField
                key={windowField.name}
                control={form.control}
                name={windowField.name}
                render={({ field }) => (
                  <FormItem className="flex flex-row justify-start">
                    <FormLabel className="w-1/6">{windowField.label}</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-3/4">
                          <SelectValue placeholder={windowField.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {tintOptions.map((option) => (
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
            ))}

            {/* Car Make */}
            <FormField
              control={form.control}
              name="carMake"
              render={({ field }) => (
                <FormItem className="flex flex-row justify-start">
                  <FormLabel className="w-1/6">Car Make</FormLabel>
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
                      <SelectTrigger className="w-3/4">
                        <SelectValue placeholder="Select car make" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(carData).map((make) => (
                          <SelectItem key={make} value={make}>
                            {make}
                          </SelectItem>
                        ))}
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {selectedMake === "other" && (
                    <Input
                      className="w-3/4"
                      placeholder="Enter car make"
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
                  <FormLabel className="w-1/6">Car Model</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (value !== "other") setCustomModel("");
                      }}
                      defaultValue={field.value}
                      // Note: For full search, consider using react-select
                    >
                      <SelectTrigger className="w-3/4">
                        <SelectValue placeholder="Select car model" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredModels.map((model: string) => (
                          <SelectItem key={model} value={model}>
                            {model}
                          </SelectItem>
                        ))}
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {selectedModel === "other" && (
                    <Input
                      className="w-3/4"
                      placeholder="Enter car model"
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
                  <FormLabel className="w-1/6">Car Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (value !== "other") setCustomType("");
                      }}
                      defaultValue={field.value}
                      // Note: For full search, consider using react-select
                    >
                      <SelectTrigger className="w-3/4">
                        <SelectValue placeholder="Select car type" />
                      </SelectTrigger>
                      <SelectContent>
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
                      placeholder="Enter car type"
                      value={customType}
                      onChange={(e) => setCustomType(e.target.value)}
                    />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Add to Cart ({totalPrice} R.S)
            </Button>
          </form>
        </Form>
        {/* Note: For a fully searchable and free-text select, consider using react-select or similar library. */}
      </div>
    </div>
  );
};

export default CustomizedProducts;
