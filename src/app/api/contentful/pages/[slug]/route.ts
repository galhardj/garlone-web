import { getPages } from "@/src/lib/route-handler/contentful";
import {
  type ParamsProps,
  nextResponseSuccess,
  nextResponseFailed,
} from "@/src/lib/route-handler/utils";

export async function GET(_: Request, { params }: ParamsProps) {
  try {
    const { slug } = await params;
    const pageBySlug = await getPages(slug);
    return nextResponseSuccess(pageBySlug);
  } catch (err) {
    return nextResponseFailed(err, "contentful/pages/[slug]");
  }
}
