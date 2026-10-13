'use client';

import React, { useState } from 'react';
import {
  Star,
  X,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { submitPublicReview } from '@/app/actions/testimonials';

export const SubmitReviewModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(5);
  const [formData, setFormData] = useState({
    clientName: '',
    clientTitle: '',
    location: '',
    category: 'Study Visa' as 'Study Visa' | 'Work Permit' | 'Schengen Business' | 'Tourist Visa' | 'Document Legalization',
    destinationCountry: '',
    quote: '',
    fullStory: '',
    email: '',
    permissionToPublish: true,
    privacyAcknowledged: true,
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await submitPublicReview({
        ...formData,
        rating,
      });

      if (res.success) {
        setIsSuccess(true);
      } else if (res.errors) {
        setErrors(res.errors);
      } else {
        setErrors({ form: res.message || 'Submission failed.' });
      }
    } catch {
      setErrors({ form: 'An error occurred submitting your review.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#120B30] border border-purple-800/80 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 text-white shadow-2xl relative">
        <button
          onClick={onClose}
          aria-label="Close review modal"
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-heading font-extrabold text-2xl text-white">
              Thank You for Your Feedback!
            </h3>
            <p className="text-xs sm:text-sm text-purple-200 leading-relaxed max-w-md mx-auto">
              Your testimonial has been submitted to our compliance desk. To safeguard client confidentiality, every review undergoes redaction checks before public posting.
            </p>
            <div className="pt-4">
              <Button onClick={onClose} variant="primary" size="md">
                Close Window
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#F45A2A] bg-orange-950/60 border border-orange-800/60 px-2.5 py-0.5 rounded-full">
                Authentic Client Feedback
              </span>
              <h2 className="font-heading font-extrabold text-2xl text-white mt-2">
                Share Your Experience with Sijam
              </h2>
              <p className="text-xs text-purple-200">
                Help prospective students and travelers understand what it’s like working with our Kaduna advisory team.
              </p>
            </div>

            {/* Rating Stars */}
            <div>
              <label className="block text-xs font-bold text-purple-200 uppercase tracking-wider mb-2">
                Your Overall Rating *
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(rating)}
                    className="p-1 transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= (hoverRating || rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-xs font-bold text-amber-400">
                  {rating === 5 ? 'Exceptional (5/5)' : `${rating} Stars`}
                </span>
              </div>
            </div>

            {/* Honeypot hidden input */}
            <input
              type="text"
              name="_company_site"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-purple-200 uppercase tracking-wider mb-1">
                  Full Name / Display Name *
                </label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="e.g. Emeka O. or Dr. Amina Y."
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-purple-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-[#F45A2A]"
                />
                {errors.clientName && (
                  <p className="text-[11px] text-rose-400 mt-1">{errors.clientName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-purple-200 uppercase tracking-wider mb-1">
                  Title / Organization (Optional)
                </label>
                <input
                  type="text"
                  value={formData.clientTitle}
                  onChange={(e) => setFormData({ ...formData, clientTitle: e.target.value })}
                  placeholder="e.g. MSc Student, IT Professional"
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-purple-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-[#F45A2A]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-purple-200 uppercase tracking-wider mb-1">
                  Service Utilized *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value as typeof formData.category,
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#0D0826] border border-purple-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-[#F45A2A]"
                >
                  <option value="Study Visa">Study Abroad & Student Visa</option>
                  <option value="Work Permit">Work Permit & Employment Placement</option>
                  <option value="Schengen Business">European Company Registration</option>
                  <option value="Tourist Visa">Tourist & Visitor Visa</option>
                  <option value="Document Legalization">Document Legalization (MFA)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-purple-200 uppercase tracking-wider mb-1">
                  Destination Country *
                </label>
                <input
                  type="text"
                  value={formData.destinationCountry}
                  onChange={(e) => setFormData({ ...formData, destinationCountry: e.target.value })}
                  placeholder="e.g. Poland, Cyprus, Canada, UK"
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-purple-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-[#F45A2A]"
                />
              </div>
            </div>

            {/* Written Review */}
            <div>
              <label className="block text-xs font-semibold text-purple-200 uppercase tracking-wider mb-1">
                Your Review *
              </label>
              <textarea
                rows={3}
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                placeholder="Describe how the Sijam team assisted you with your admissions, documentation, or visa interview..."
                className="w-full px-3.5 py-2.5 bg-black/40 border border-purple-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-[#F45A2A]"
              />
              {errors.quote && <p className="text-[11px] text-rose-400 mt-1">{errors.quote}</p>}
            </div>

            {/* Email for optional acknowledgement */}
            <div>
              <label className="block text-xs font-semibold text-purple-200 uppercase tracking-wider mb-1">
                Your Email Address (For Verification Only — Not Published)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. you@example.com"
                className="w-full px-3.5 py-2.5 bg-black/40 border border-purple-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-[#F45A2A]"
              />
            </div>

            {/* Privacy Warning */}
            <div className="p-3.5 rounded-xl bg-purple-950/60 border border-purple-800/60 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-[#F98864] shrink-0 mt-0.5" />
              <p className="text-[11px] text-purple-200 leading-relaxed">
                <strong>Confidentiality Notice:</strong> Do NOT disclose passport numbers, bank balances, or visa vignette numbers. In compliance with NDPR regulations, all testimonials are reviewed before publication.
              </p>
            </div>

            {/* Consent checkboxes */}
            <div className="space-y-2 text-xs text-purple-200">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.permissionToPublish}
                  onChange={(e) =>
                    setFormData({ ...formData, permissionToPublish: e.target.checked })
                  }
                  className="mt-1 h-4 w-4 rounded border-purple-700 text-[#F45A2A]"
                />
                <span>I confirm this review is authentic and grant Sijam Consults permission to publish it.</span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.privacyAcknowledged}
                  onChange={(e) =>
                    setFormData({ ...formData, privacyAcknowledged: e.target.checked })
                  }
                  className="mt-1 h-4 w-4 rounded border-purple-700 text-[#F45A2A]"
                />
                <span>I acknowledge that submitted reviews undergo moderation and will not appear immediately.</span>
              </label>
            </div>

            {errors.form && (
              <p className="text-xs text-rose-400 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> {errors.form}
              </p>
            )}

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Verifying & Submitting...' : 'Submit for Moderation'} <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
