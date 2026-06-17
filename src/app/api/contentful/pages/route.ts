import { getPages } from "@/src/lib/route-handler/contentful";
import {
  nextResponseSuccess,
  nextResponseFailed,
} from "@/src/lib/route-handler/utils";

export async function GET() {
  try {
    const allPages = await getPages();
    const allSlugs = allPages.items.map((page) => page.fields.slug);
    return nextResponseSuccess(allSlugs);
  } catch (err) {
    return nextResponseFailed(err, "contentful/pages");
  }
}
