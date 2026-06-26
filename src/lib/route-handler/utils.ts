import { NextResponse } from "next/server";
import { refineCatchedErr } from "@/src/lib/http-client";

export type NextRouteSuccess<T> = { success: true; data: T };

export type ParamsProps = {
  params: Promise<{ slug: string }>;
};

export const nextResponseSuccess = <T>(data: T, status = 200) =>
  NextResponse.json({ success: true, data }, { status });

export const nextResponseFailed = (err: unknown, id: string) => {
  const refinedError = refineCatchedErr(err, id);

  return NextResponse.json(
    { success: false, message: refinedError.message },
    { status: refinedError.status },
  );
};
