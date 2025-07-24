import { supabase } from "@/lib/supabseClient";

export async function validateCoupon(code: string) {
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .eq("code", code.toUpperCase())
    .eq("active", true)
    .limit(1)
    .single();

  if (error || !data) {
    return { valid: false, message: "Invalid or inactive coupon." };
  }

  const now = new Date();
  const expires = new Date(data.expires_at);

  if (expires < now) {
    return { valid: false, message: "Coupon has expired." };
  }

  if (data.max_uses && data.used_count >= data.max_uses) {
    return { valid: false, message: "Coupon usage limit reached." };
  }

  return {
    valid: true,
    discount: data.discount,
    isPercent: data.is_percent,
    message: "Coupon is valid.",
  };
}
