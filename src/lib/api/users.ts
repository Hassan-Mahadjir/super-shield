import { supabase } from "../supabseClient";

export interface User {
  phone_number: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateUserData {
  phone_number: string;
  name: string;
}

// create user py phone number
export async function createOrUpdateUser(
  userData: CreateUserData
): Promise<User | null> {
  try {
    // Debug: Check if environment variables are set
    console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log(
      "Supabase Anon Key exists:",
      !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    console.log("User data being sent:", userData);

    const { data, error } = await supabase
      .from("users")
      .upsert([userData], {
        onConflict: "phone_number",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error creating/updating user:", error);
      console.error("Error details:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      return null;
    }

    console.log("Successfully created/updated user:", data);
    return data;
  } catch (error) {
    console.error("Unexpected error in createOrUpdateUser:", error);
    return null;
  }
}

// Get user by phone number
export async function getUserByPhone(
  phoneNumber: string
): Promise<User | null> {
  try {
    console.log("Fetching user by phone:", phoneNumber);

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("phone_number", phoneNumber)
      .single();

    if (error) {
      console.error("Supabase error fetching user:", error);
      return null;
    }

    console.log("Successfully fetched user:", data);
    return data;
  } catch (error) {
    console.error("Unexpected error in getUserByPhone:", error);
    return null;
  }
}
