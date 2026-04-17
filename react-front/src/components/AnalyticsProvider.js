import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initAnalytics, trackPageView } from "../utils/analytics";

const PAGE_NAME_MAP = {
  "/": "home",
  "/home": "home",
  "/about": "about",
  "/projects": "projects",
  "/contact": "contact",
};

const getPageName = (pathname) => PAGE_NAME_MAP[pathname] || "unknown";

const AnalyticsProvider = () => {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageView({
      pageName: getPageName(location.pathname),
      path: location.pathname,
      search: location.search,
    });
  }, [location.pathname, location.search]);

  return null;
};

export default AnalyticsProvider;
