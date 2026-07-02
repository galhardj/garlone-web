import { getPages } from "@/src/lib/route-handler/contentful";
import { mapAllSlugs } from "@/src/lib/contentful";
import {
  nextResponseSuccess,
  nextResponseFailed,
} from "@/src/lib/route-handler/utils";

export async function GET() {
  try {
    const allPages = await getPages();
    const allSlugs = mapAllSlugs(allPages);

    return nextResponseSuccess(allSlugs);
  } catch (err) {
    return nextResponseFailed(err, "contentful/pages");
  }
}
