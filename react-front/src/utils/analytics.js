import posthog from "posthog-js";

const POSTHOG_KEY = process.env.REACT_APP_POSTHOG_KEY;
const POSTHOG_HOST = process.env.REACT_APP_POSTHOG_HOST || "https://us.i.posthog.com";

let isInitialized = false;

export const isAnalyticsEnabled = Boolean(POSTHOG_KEY);

export const initAnalytics = () => {
  if (isInitialized || !isAnalyticsEnabled) {
    return;
  }

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: "history_change",
    capture_pageleave: true,
    person_profiles: "identified_only",
    autocapture: true,
  });

  isInitialized = true;
};

export const trackEvent = (eventName, properties = {}) => {
  if (!isInitialized) {
    initAnalytics();
  }

  if (!isInitialized) {
    return;
  }

  posthog.capture(eventName, properties);
};

export const trackPageView = ({ pageName, path, search = "" }) => {
  trackEvent("page_view", {
    page_name: pageName,
    path,
    search,
  });
};
