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
import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import CartButton from "./cart/cartButton";

const sheetOnlyItems = ["Sheet Item 1", "Sheet Item 2", "Sheet Item 3"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [nestedSheet, setNestedSheet] = useState<string | null>(null); // Track which nested sheet is open
  const [scrolledDown, setScrolledDown] = useState(false); // Track scroll direction
  const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position
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

  const nestedSheetContent: Record<string, React.ReactNode> = {
    [t("importantLinks")]: (
      <>
        <Button className="mb-2" variant="outline">
          Link 1
        </Button>
        <Button className="mb-2" variant="outline">
          Link 2
        </Button>
      </>
    ),
    [t("customerService")]: (
      <>
        <Button className="mb-2" variant="outline">
          Contact Us
        </Button>
        <Button className="mb-2" variant="outline">
          FAQ
        </Button>
      </>
    ),
    // Add more items as needed
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setScrolledDown(true); // Animate up on scroll down
      } else {
        setScrolledDown(false); // Animate back on scroll up
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 border-b bg-background px-4 py-2 flex items-center justify-between transition-transform duration-300 ${
        scrolledDown ? "-translate-y-2" : "translate-y-0"
      }`}
      style={{ height: "72px" }}
    >
      {/* left: Menu (desktop) */}
      <div className="hidden md:flex gap-4">
        {menuItems.slice(0, 3).map((item) => (
          <Button key={item} variant="ghost" size="sm">
            {item}
          </Button>
        ))}
        <CartButton />
      </div>
      {/* center: Logo */}
      <div className="flex items-center gap-2 mt-1">
        <Image
          src={"/super.png"}
          alt="super shield logo"
          width={80}
          height={80}
        />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <LocaleSwitcher />
        <ModeToggle />
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
                <span className="font-bold text-lg">ACME</span>
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
                {nestedSheet && nestedSheetContent[nestedSheet]}
              </div>
            </NestedSheet>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
