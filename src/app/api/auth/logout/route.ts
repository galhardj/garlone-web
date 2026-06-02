import { NextResponse } from "next/server";
import { supabaseServer } from "@/src/lib/supabase";

export async function POST() {
  try {
    const supabase = await supabaseServer.withSetCookies();
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
