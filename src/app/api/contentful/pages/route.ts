import { getPages } from "@/src/lib/contentful/get-pages";
import { mapAllSlugs } from "@/src/lib/contentful/utils";
import {
  nextResponseSuccess,
  nextResponseFailed,
} from "@/src/lib/route-handler";

export async function GET() {
  try {
    const allPages = await getPages();
    const allSlugs = mapAllSlugs(allPages);

    return nextResponseSuccess(allSlugs);
  } catch (err) {
    return nextResponseFailed(err, "contentful/pages");
  }
}
