import { supabase } from "@/lib/supabseClient";
// import { v4 as uuidv4 } from "uuid";

export async function createCoupon(
  code: string,
  discount: number,
  isPercent = true,
  expiresAt: string
) {
  const { data, error } = await supabase.from("coupons").insert([
    {
      code: code.toUpperCase(),
      discount,
      is_percent: isPercent,
      expires_at: expiresAt,
      used_count: 0,
      active: true,
    },
  ]);

  if (error) throw error;
  return data;
}
