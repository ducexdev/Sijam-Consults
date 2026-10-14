/**
 * Centralized Video URL Configuration
 * 
 * Supports both Supabase Storage CDN and local fallback paths.
 * If NEXT_PUBLIC_USE_SUPABASE_VIDEOS is true, video links resolve to your
 * Supabase Storage 'videos' bucket URL. Otherwise, they resolve to local files.
 */

const SUPABASE_PROJECT_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tpoxyelvhitwbjjvijwc.supabase.co';

const SUPABASE_VIDEOS_BASE = `${SUPABASE_PROJECT_URL}/storage/v1/object/public/videos`;

const USE_SUPABASE_VIDEOS =
  process.env.NEXT_PUBLIC_USE_SUPABASE_VIDEOS === 'true';

/**
 * Helper to resolve a video file name to either Supabase CDN or local /videos path.
 */
export function getVideoUrl(filename: string): string {
  if (USE_SUPABASE_VIDEOS) {
    // Encodes spaces and special characters for clean URL streaming
    return `${SUPABASE_VIDEOS_BASE}/${encodeURIComponent(filename)}`;
  }
  return `/videos/${filename}`;
}

export const VIDEOS = {
  // Brand & Company Profile
  SIJAM_CONSULT_LIMITED: getVideoUrl('SIjam-Consult-Limited.mp4'),
  SIJAM_CONSULTS_PARTNERS: getVideoUrl('Sijam-Consults-Partners.mp4'),

  // Services & Guides
  STUDY_VISA: getVideoUrl('Study-visa.mp4'),
  WORK_VISA: getVideoUrl('Work-visa.mp4'),
  TOURIST_VISA: getVideoUrl('Tourist-visa.mp4'),
  FLIGHT_RESERVATIONS: getVideoUrl('Flight-ReservationTicketing.mp4'),
  DOCUMENT_LEGALIZATION: getVideoUrl('Travel-Document-Legalization-Notarization.mp4'),

  // Video Testimonials / Client Proof
  TESTIMONIAL_1: getVideoUrl('WhatsApp Video 2026-10-12 at 10.45.26 AM.mp4'),
  TESTIMONIAL_2: getVideoUrl('WhatsApp Video 2026-10-12 at 10.45.27 AM.mp4'),
} as const;
