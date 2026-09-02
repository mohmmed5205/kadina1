import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  ANALYTICS_EVENTS,
  getCurrentPath,
  getNavigationId,
  getPageType,
  trackViewEvent,
} from "../utils/analytics";

export function usePageView(language) {
  const location = useLocation();
  const navigationId = getNavigationId(location);
  const path = getCurrentPath(location);

  useEffect(() => {
    trackViewEvent(
      ANALYTICS_EVENTS.PAGE_VIEW,
      {
        language,
        page_type: getPageType(location.pathname),
        path,
      },
      navigationId,
    );
  }, [language, location.pathname, navigationId, path]);
}

export function useTrackedView(eventName, payload, enabled = true) {
  const location = useLocation();
  const navigationId = getNavigationId(location);
  const serializedPayload = JSON.stringify(payload);
  const routeLanguage = location.pathname.split("/").filter(Boolean)[0];
  const routeViewEvent = `${getPageType(location.pathname)}_view`;

  useEffect(() => {
    const resolvedPayload = JSON.parse(serializedPayload);
    if (
      !enabled ||
      eventName !== routeViewEvent ||
      (resolvedPayload.path && resolvedPayload.path !== getCurrentPath()) ||
      (resolvedPayload.language && resolvedPayload.language !== routeLanguage)
    ) {
      return;
    }
    trackViewEvent(eventName, resolvedPayload, navigationId);
  }, [
    enabled,
    eventName,
    navigationId,
    routeLanguage,
    routeViewEvent,
    serializedPayload,
  ]);
}
