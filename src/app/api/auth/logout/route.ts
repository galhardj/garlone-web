import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/src/lib/supabase";

export async function POST() {
  try {
    const supabase = await getSupabaseClient({ mutableCookies: true });
    const { error } = await supabase.auth.signOut();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Logout error:", err);
    return NextResponse.json(
      { error: "Unexpected error during logout" },
      { status: 500 },
    );
  }
}
