/**
 * Analytics Integration Stub
 *
 * This module provides configuration points for analytics platforms.
 * Analytics scripts are NOT loaded until the appropriate environment
 * variable is set AND the user has consented via the cookie consent banner.
 *
 * Supported platforms:
 * - Google Analytics 4 (GA4): Set NEXT_PUBLIC_GA4_MEASUREMENT_ID
 * - Plausible Analytics: Set NEXT_PUBLIC_PLAUSIBLE_DOMAIN
 *
 * DO NOT load analytics before cookie consent is obtained.
 * DO NOT claim analytics is active before the environment variables are set.
 */

export interface AnalyticsConfig {
  ga4MeasurementId: string | null;
  plausibleDomain: string | null;
  isAnyConfigured: boolean;
}

/**
 * Returns the analytics configuration status.
 * Used to conditionally render analytics scripts.
 */
export function getAnalyticsConfig(): AnalyticsConfig {
  const ga4MeasurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? null;
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? null;

  return {
    ga4MeasurementId,
    plausibleDomain,
    isAnyConfigured: Boolean(ga4MeasurementId || plausibleDomain),
  };
}

/**
 * Track a custom event (call from client components after consent is obtained).
 * No-op if GA4 is not configured or if window.gtag is not available.
 */
export function trackEvent(
  eventName: string,
  parameters?: Record<string, string | number | boolean>
): void {
  if (typeof window === 'undefined') return;

  const config = getAnalyticsConfig();
  if (!config.ga4MeasurementId) return;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gtag = (window as any).gtag;
  if (typeof gtag === 'function') {
    gtag('event', eventName, parameters);
  }
}

/**
 * Track a consultation form submission.
 * Fires only if GA4 is configured and consent was given.
 */
export function trackConsultationSubmission(serviceSlug: string): void {
  trackEvent('consultation_form_submit', {
    service: serviceSlug,
    event_category: 'Lead Generation',
  });
}

/**
 * Track a job application initiation.
 */
export function trackJobApplicationStart(jobSlug: string): void {
  trackEvent('job_application_start', {
    job_slug: jobSlug,
    event_category: 'Jobs',
  });
}
