import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSnapchatGhost } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";

import { Button } from "./ui/button";
import ReturnPolicyDialog from "./ReturnPolicyDialog";
import SocialIcons from "./SocialIcons";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface FooterProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  VAT?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer = ({
  logo,
  VAT,
  tagline,
  menuItems,
  copyright,
  bottomLinks,
}: FooterProps) => {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const defaultLogo = {
    src: "/super.png",
    alt: t("logoAlt", { defaultValue: "Super Shield Logo" }),
    title: t("logoTitle", { defaultValue: "Super Shield Company" }),
    url: "#",
  };
  const defaultVAT = {
    src: "/vat.png",
    alt: t("vatAlt", { defaultValue: "VAT Logo" }),
    title: t("vatTitle", { defaultValue: "Value Added Tax" }),
    url: "#",
  };
  const defaultTagline = t("tagline", {
    defaultValue:
      "Locally made, sun-tested — the first thermal shield built for Saudi Arabia’s extreme heat. Join 300,000+ satisfied customers staying cool and protected.",
  });
  const defaultMenuItems: MenuItem[] = [
    {
      title: t("importantLinks", { defaultValue: "Important Links" }),
      links: [
        {
          text: t("frequentlyAskedQuestions", {
            defaultValue: "Frequently Asked Questions",
          }),
          url: "",
        },
        {
          text: t("returnPolicy", { defaultValue: "Return Policy" }),
          url: "",
        },
        {
          text: t("InstallationGuide", { defaultValue: "Installation Guide" }),
          url: "",
        },
        {
          text: t("BusinessFranchises", {
            defaultValue: "Business & Franchises",
          }),
          url: "",
        },
        {
          text: t("salesPoint", {
            defaultValue: "Sales & Installation Points",
          }),
          url: "",
        },
      ],
    },
  ];
  const defaultCopyright = isRTL
    ? `${t("allRightsReserved", { defaultValue: "جميع الحقوق محفوظة" })} ${t(
        "logoTitle"
      )} ${new Date().getFullYear()} ©`
    : `© ${new Date().getFullYear()} ${t("logoTitle")} ${t(
        "allRightsReserved",
        { defaultValue: "All rights reserved" }
      )}`;
  const defaultBottomLinks = [
    { text: t("terms", { defaultValue: "Terms and Conditions" }), url: "#" },
    { text: t("privacyPolicy", { defaultValue: "Privacy Policy" }), url: "#" },
  ];

  const finalLogo = logo || defaultLogo;
  const finalVAT = VAT || defaultVAT;
  const finalTagline = tagline || defaultTagline;
  const finalMenuItems = menuItems || defaultMenuItems;
  const finalCopyright = copyright || defaultCopyright;
  const finalBottomLinks = bottomLinks || defaultBottomLinks;

  return (
    <section className="pt-10">
      <footer className="py-6">
        <div className="mb-6 text-center flex flex-row justify-center gap-4">
          <p>{t("followUs")}</p>
          <SocialIcons
            icons={[
              {
                href: "https://instagram.com/supershield.sa/",
                label: t("instagram", { defaultValue: "Instagram" }),
                icon: <FaInstagram className="!w-6 !h-6" />,
                hoverClass: "hover:text-pink-500",
              },
              {
                href: "https://www.snapchat.com/add/supershield.sa",
                label: t("snapchat", { defaultValue: "Snapchat" }),
                icon: <FaSnapchatGhost className="!w-6 !h-6" />,
                hoverClass: "hover:text-yellow-400",
              },
              {
                href: "https://x.com/supershield.sa",
                label: t("x", { defaultValue: "X" }),
                icon: <FaXTwitter className="!w-6 !h-6" />,
                hoverClass: "hover:text-blue-400",
              },
              {
                href: "https://www.tiktok.com/@supershield.sa",
                label: t("tiktok", { defaultValue: "TikTok" }),
                icon: <FaTiktok className="!w-6 !h-6" />,
                hoverClass: "hover:text-white",
              },
            ]}
          />
        </div>
        <div className="border-t pt-8 grid grid-cols-1 gap-5 lg:grid-cols-5 mx-auto px-4 sm:px-6 lg:px-4">
          <div
            className={`col-span-1 ${
              isRTL ? "ml-8" : "mr-8"
            } lg:col-span-2 mb-2 lg:mb-0`}
          >
            <div className="flex items-center gap-2 lg:justify-start">
              <Image
                src={finalLogo.src}
                alt={finalLogo.alt}
                width={80}
                height={80}
              />
              <p>{finalLogo.title}</p>
            </div>
            <p className="mt-4 font-medium">{finalTagline}</p>
          </div>
          <div>
            {finalMenuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="text-muted-foreground space-y-4">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="hover:text-primary font-medium"
                    >
                      {link.text ===
                      t("returnPolicy", { defaultValue: "Return Policy" }) ? (
                        <ReturnPolicyDialog>
                          <button className="hover:text-primary font-medium">
                            {link.text}
                          </button>
                        </ReturnPolicyDialog>
                      ) : (
                        <a href={link.url}>{link.text}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* Services */}
          <div>
            <h3 className="mb-4 font-bold">{t("customerService")}</h3>
            <Button variant="ghost" size="default" aria-label="WhatsApp">
              <FaWhatsapp className="!w-8 !h-8" />
              {t("contactUs", { defaultValue: "Contact Us" })}
            </Button>
          </div>
          {/* VAT */}
          <div className="mb-4 lg:mb-0">
            <div className="flex items-center gap-2 lg:justify-start">
              <Image
                src={finalVAT.src}
                alt={finalVAT.alt}
                width={80}
                height={80}
              />
              <div className="gap-2">
                <p>{finalVAT.title}</p>
                <p>{"09876543211234"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-muted-foreground mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium md:flex-row md:items-center  mx-auto px-4 sm:px-6 lg:px-4">
          <p>{finalCopyright}</p>
          <ul className="flex gap-4">
            {finalBottomLinks.map((link, linkIdx) => (
              <li key={linkIdx} className="hover:text-primary underline">
                <a href={link.url}>{link.text}</a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
