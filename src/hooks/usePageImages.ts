import { useEffect } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { siteImageKeysForPage, type SiteImageKey } from "@/config/siteImageConfig";

/**
 * Loads only the admin-managed images shown on this page.
 * `firstKeys` (e.g. the hero photos) are fetched first; the rest start once those have arrived,
 * so above-the-fold images don't compete for bandwidth with images further down the page.
 * `skipKeys` are not fetched at all (e.g. photos hidden at the current screen size).
 */
export const usePageImages = (
  path: string,
  firstKeys: readonly SiteImageKey[] = [],
  skipKeys: readonly SiteImageKey[] = [],
) => {
  const { requestSiteImages } = useAdmin();

  useEffect(() => {
    const first = firstKeys.filter(k => !skipKeys.includes(k));
    const rest = siteImageKeysForPage(path).filter(k => !firstKeys.includes(k) && !skipKeys.includes(k));
    requestSiteImages(first).finally(() => requestSiteImages(rest));
    // firstKeys / skipKeys are static per page load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, requestSiteImages]);
};
