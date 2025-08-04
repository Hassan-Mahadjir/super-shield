"use client";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  NestedSheet,
} from "./ui/sheet";
import LocaleSwitcher from "./LocaleSwitcher";
import { ModeToggle } from "./modeToggle";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import CartButton from "./cart/cartButton";
import { Link } from "@/i18n/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [nestedSheet, setNestedSheet] = useState<string | null>(null); // Track which nested sheet is open
  const [scrolledDown] = useState(false); // Track scroll direction
  const locale = useLocale();
  const isRTL = locale === "ar";

  const t = useTranslations("NavBar");
  const menuItems = [
    t("offers"),
    t("carHeatInsulator"),
    t("protection"),
    t("thermalInsulatorBuildings"),
    t("care"),
    t("complaints"),
    t("salesPoint"),
  ];

  const sheetOnlyItems = [t("importantLinks"), t("customerService")];

  // const nestedSheetContent: Record<string, React.ReactNode> = {
  //   [t("importantLinks")]: (
  //     <>
  //       <Button className="mb-2" variant="outline">
  //         Link 1
  //       </Button>
  //       <Button className="mb-2" variant="outline">
  //         Link 2
  //       </Button>
  //     </>
  //   ),
  //   [t("customerService")]: (
  //     <>
  //       <Button className="mb-2" variant="outline">
  //         Contact Us
  //       </Button>
  //       <Button className="mb-2" variant="outline">
  //         FAQ
  //       </Button>
  //     </>
  //   ),
  // };
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 border-b bg-background px-4 py-2 flex items-center justify-between transition-transform duration-300 ${
        scrolledDown ? "-translate-y-2" : "translate-y-0"
      }`}
      style={{ height: "72px" }}
    >
      {/* left: Menu (desktop) */}
      <div className="hidden md:flex gap-4">
        <div className="mx-4">
          <CartButton />
        </div>
      </div>
      {/* center: Logo */}
      <div className="flex items-center gap-2 my-4">
        <Link href="/">
          <Image
            src={"/super.png"}
            alt="super shield logo"
            width={90}
            height={90}
          />
        </Link>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Show LocaleSwitcher only on md and up */}
        <div className="hidden md:block">
          <LocaleSwitcher />
        </div>
        {/* Show CartButton only on mobile (block on small, hidden on md+) */}
        <div className="block md:hidden">
          <CartButton />
        </div>
        {/* <ModeToggle /> */}
        {/* Sheet trigger always visible */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Open menu">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </SheetTrigger>
          <SheetContent
            side={isRTL ? "right" : "left"}
            className="w-96 p-0"
            isRTL={isRTL}
          >
            <SheetTitle className="sr-only">Main Menu</SheetTitle>
            <div className="flex flex-col h-full" dir={isRTL ? "rtl" : "ltr"}>
              <div className="flex items-center gap-2 p-4 border-b">
                <span className="font-bold text-lg">{t("logo")}</span>
              </div>
              <div className="flex-1 flex flex-col gap-1 p-4">
                {menuItems.map((item) => (
                  <Button
                    key={item}
                    variant="ghost"
                    className="justify-start w-full"
                  >
                    {item}
                  </Button>
                ))}
                {sheetOnlyItems.map((item) => (
                  <Button
                    key={item}
                    variant="ghost"
                    className="justify-start w-full"
                    onClick={() => setNestedSheet(item)}
                  >
                    {item}
                  </Button>
                ))}
              </div>
              <div className="p-4 border-t flex gap-2">
                {/* Always show LocaleSwitcher in sheet */}
                <LocaleSwitcher width="w-72" />
                <ModeToggle />
              </div>
            </div>
            {/* NestedSheet overlayed when a sheetOnlyItem is clicked */}
            <NestedSheet
              open={!!nestedSheet}
              onOpenChange={(v) => {
                if (!v) {
                  setNestedSheet(null);
                  setOpen(false);
                }
              }}
              side={isRTL ? "right" : "left"}
              isRTL={isRTL}
            >
              {/* Back arrow and title */}
              <div className="flex items-center gap-2 p-4 border-b">
                <button
                  aria-label={t("back")}
                  onClick={() => setNestedSheet(null)}
                  className="mr-2"
                >
                  {/* Use an icon library or SVG for the arrow */}
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={isRTL ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
                    />
                  </svg>
                </button>
                <SheetTitle>{nestedSheet}</SheetTitle>
              </div>
              <div className="p-4">
                {/* {nestedSheet && nestedSheetContent[nestedSheet]} */}
              </div>
            </NestedSheet>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
