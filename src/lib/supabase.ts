import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const getSupabaseEnv = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase env variables");
  }

  return { supabaseUrl, supabaseAnonKey };
};

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export const getSupabaseClient = async ({
  mutableCookies,
}: {
  mutableCookies: boolean;
}) => {
  const cookieStore = await cookies();
  const { supabaseUrl, supabaseAnonKey } = getSupabaseEnv();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: mutableCookies
        ? (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, { ...options, ...cookieOptions });
            });
          }
        : () => {},
    },
  });
};

export const getAuthUser = async () => {
  const supabase = await getSupabaseClient({ mutableCookies: false });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};
