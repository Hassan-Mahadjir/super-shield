import { supabase } from "@/lib/supabseClient";

export interface Order {
  id: string;
  user_phone_number: string;
  coupon_code?: string;
  car_make: string;
  car_model: string;
  car_type: string;
  front_window: string;
  sidesfront_window: string;
  sidesback_window: string;
  back_window: string;
  third_window?: string;
  extra_window?: string;
  extra_cost?: number;
  quantity: number;
  price: number;
  discount_amount: number;
  final_price: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateOrderData {
  user_phone_number: string;
  coupon_code?: string;
  car_make: string;
  car_model: string;
  car_type: string;
  front_window: string;
  sidesfront_window: string;
  sidesback_window: string;
  back_window: string;
  third_window?: string | null;
  extra_window?: string | null;
  extra_cost?: number;
  quantity: number;
  price: number;
  discount_amount: number;
  final_price: number;
}

// Create a new order
export async function createOrder(
  orderData: CreateOrderData
): Promise<Order | null> {
  try {
    console.log("Attempting to create order:", orderData);

    const { data, error } = await supabase
      .from("orders")
      .insert([orderData])
      .select()
      .single();

    if (error) {
      console.error("Supabase error creating order:", error);
      console.error("Error details:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      return null;
    }

    console.log("Successfully created order:", data);
    return data;
  } catch (error) {
    console.error("Unexpected error in createOrder:", error);
    return null;
  }
}

// Get orders by user phone number
export async function getOrdersByUser(phoneNumber: string): Promise<Order[]> {
  try {
    console.log("Fetching orders for user:", phoneNumber);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_phone_number", phoneNumber)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error fetching orders:", error);
      return [];
    }

    console.log(`Successfully fetched ${data?.length || 0} orders for user`);
    return data || [];
  } catch (error) {
    console.error("Unexpected error in getOrdersByUser:", error);
    return [];
  }
}
