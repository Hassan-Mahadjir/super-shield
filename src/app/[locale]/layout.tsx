import type { Metadata, Viewport } from "next";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/cart/whatsappButton";
import { AuthProvider } from "@/components/context/AuthProvider";
import { getMessages } from "next-intl/server";
import { Toaster } from "@/components/ui/sonner";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  interface MetadataMessages {
    title: string;
    description: string;
    keywords: string;
    author: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
  }

  const metadata = messages.metadata as MetadataMessages;

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    authors: [{ name: metadata.author }],
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://supershield-sa.com"
    ),
    other: {
      "google-site-verification": "67_03TW9-9Nii7SG4mfjYfpjogr4Kry3F0YJ91pj3qc",
    },
    openGraph: {
      title: metadata.ogTitle,
      description: metadata.ogDescription,
      images: [
        {
          url: metadata.ogImage,
          width: 1200,
          height: 630,
          alt: metadata.title,
        },
      ],
      type: "website",
      locale: locale,
      alternateLocale: locale === "ar" ? "en" : "ar",
    },
    icons: {
      icon: [
        { url: "/favicon.png", type: "image/png", sizes: "32x32" },
        { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
        { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
        { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
        { url: "/favicon-64x64.png", type: "image/png", sizes: "64x64" },
        { url: "/favicon-128x128.png", type: "image/png", sizes: "128x128" },
        { url: "/favicon-256x256.png", type: "image/png", sizes: "256x256" },
      ],
      shortcut: "/favicon.png",
      apple: "/favicon-128x128.png",
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "/",
      languages: {
        en: "/ar",
        ar: "/en",
      },
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const isRTL = locale === "ar";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"} suppressHydrationWarning>
      <head>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics
            GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
          />
        )}
      </head>
      <body className="relative pt-[72px]">
        <NextIntlClientProvider>
          {" "}
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <AuthProvider>{children}</AuthProvider>
            <WhatsappButton />
            <Footer />
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
