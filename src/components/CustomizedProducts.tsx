"use client";
import React from "react";
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div>
      <Button disabled className="rounded-sm text-sm bg-red-500 text-white">
        Options
      </Button>
      <div className="flex flex-col mt-4">
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
                      onValueChange={field.onChange}
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
                      </SelectContent>
                    </Select>
                  </FormControl>
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
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-3/4">
                        <SelectValue placeholder="Select car model" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(carData).map(([make, data]) => (
                          <SelectGroup key={make}>
                            <SelectLabel>{make}</SelectLabel>
                            {data.models.map((model) => (
                              <SelectItem key={model} value={model}>
                                {model}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        ))}
                      </SelectContent>
                    </Select>
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
                  <FormLabel className="w-1/6">Car Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-3/4">
                        <SelectValue placeholder="Select car type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(carData).map(([make, data]) => (
                          <SelectGroup key={make}>
                            <SelectLabel>{make}</SelectLabel>
                            {data.types.map((type) => (
                              <SelectItem
                                key={`${make}-${type}`}
                                value={`${make}-${type}`}
                              >
                                {type}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CustomizedProducts;
