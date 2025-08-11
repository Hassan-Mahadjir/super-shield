import { supabase } from "@/lib/supabseClient";

export default async function sitemap() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://supershield-sa.com";
  const currentDate = new Date().toISOString().split("T")[0];

  // Fetch all product IDs from the database
  const { data: products, error } = await supabase
    .from("product")
    .select("id, language, created_at")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching products for sitemap:", error);
  }

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/ar`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ar/cart`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/cart`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  // Generate product pages for both languages
  const productPages =
    products?.flatMap((product) => [
      {
        url: `${baseUrl}/ar/product/${product.id}`,
        lastModified: product.created_at?.split("T")[0] || currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/en/product/${product.id}`,
        lastModified: product.created_at?.split("T")[0] || currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      },
    ]) || [];

  return [...staticPages, ...productPages];
}
