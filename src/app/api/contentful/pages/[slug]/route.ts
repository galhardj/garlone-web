import { getPageBySlug } from "@/src/lib/contentful/get-pages";
import {
  type ParamsProps,
  nextResponseSuccess,
  nextResponseFailed,
} from "@/src/lib/route-handler";

export async function GET(_: Request, { params }: ParamsProps) {
  try {
    const { slug } = await params;
    const pageBySlug = await getPageBySlug(slug);
    return nextResponseSuccess(pageBySlug);
  } catch (err) {
    return nextResponseFailed(err, "contentful/pages/[slug]");
  }
}
