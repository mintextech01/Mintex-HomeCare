import { useEffect } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { siteImageKeysForPage, type SiteImageKey } from "@/config/siteImageConfig";

/**
 * Loads only the admin-managed images shown on this page.
 * `firstKeys` (e.g. the hero photos) are fetched first; the rest start once those have arrived,
 * so above-the-fold images don't compete for bandwidth with images further down the page.
 */
export const usePageImages = (path: string, firstKeys: readonly SiteImageKey[] = []) => {
  const { requestSiteImages } = useAdmin();

  useEffect(() => {
    const rest = siteImageKeysForPage(path).filter(k => !firstKeys.includes(k));
    requestSiteImages(firstKeys).finally(() => requestSiteImages(rest));
    // firstKeys is a static list per page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, requestSiteImages]);
};
