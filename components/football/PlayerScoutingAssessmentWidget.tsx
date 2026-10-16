'use client';

import React, { useState } from 'react';
import {
  Trophy,
  CheckCircle2,
  AlertCircle,
  Video,
  FileText,
  Globe2,
  Send,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  UserCheck,
  MapPin,
  Clock,
  ArrowRight,
  PhoneCall,
  Check,
} from 'lucide-react';
import { COMPANY } from '@/lib/routes';

export function PlayerScoutingAssessmentWidget() {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [position, setPosition] = useState('Center Forward / Striker');
  const [preferredFoot, setPreferredFoot] = useState('Right');
  const [currentClub, setCurrentClub] = useState('');
  const [stateOfResidence, setStateOfResidence] = useState('Kaduna State');
  const [videoLink, setVideoLink] = useState('');
  const [hasPassport, setHasPassport] = useState('Yes, Valid > 18 Months');
  const [targetCorridor, setTargetCorridor] = useState('Spain & Portugal (Iberian Hub)');
  const [phone, setPhone] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !age) {
      alert('Please fill out your Full Name, Age, and Contact Phone Number.');
      return;
    }

    const ref = `SFT-${Date.now().toString().slice(-6)}`;
    setReferenceCode(ref);
    setSubmitted(true);
  };

  const getWhatsAppMessage = () => {
    const msg = `*NEW FOOTBALL SCOUTING & TRIAL APPLICATION*
Ref: ${referenceCode || 'SFT-PENDING'}
------------------------------------
*Player Name:* ${fullName}
*Age / Category:* ${age} years old
*Position:* ${position} (Preferred Foot: ${preferredFoot})
*Current Academy/Club:* ${currentClub || 'Free Agent / Grassroots'}
*State/Location:* ${stateOfResidence}
*Passport Status:* ${hasPassport}
*Target European Corridor:* ${targetCorridor}
*Highlight Video Reel:* ${videoLink || 'Available on request'}
*Phone/WhatsApp:* ${phone}
------------------------------------
_Submitted via Sijam Consults & Basic Soccer Academy Portal_`;
    return encodeURIComponent(msg);
  };

  return (
    <div id="scouting-assessment" className="relative rounded-3xl bg-gradient-to-br from-[#100B2E] via-[#0C0824] to-[#0A061E] border border-blue-500/20 p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.8)] backdrop-blur-xl">
      <span id="apply" className="sr-only" />
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5 text-blue-400" />
            <span>Athletic Evaluation Intake Desk</span>
          </div>
          <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Pre-Screening &amp; European Trial Assessment
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl mx-auto">
            Joint scouting review by <strong>Sijam Consults Intermediary Desk</strong> and <strong>Basic Soccer Academy (RC: 2839888)</strong>. Complete your athletic profile below to initiate file verification.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-10 px-4 space-y-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                Scouting File Successfully Logged
              </span>
              <h4 className="font-heading font-black text-2xl text-white">
                Dossier Reference: {referenceCode}
              </h4>
              <p className="text-sm text-slate-300 max-w-lg mx-auto">
                Your athletic details for <strong>{fullName}</strong> ({position}, {age} yrs) have been queued for intermediary video assessment and trial quota matching with partner clubs.
              </p>
            </div>

            {/* Next Steps Card */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-left max-w-lg mx-auto space-y-3">
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#4DA5EC]" />
                <span>Next Immediate Steps</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span>Send your full highlight video reel and international passport copy via WhatsApp for priority review.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span>Our scouting team in Kaduna State and Lagos will verify club trial eligibility within 48–72 hours.</span>
                </li>
              </ul>
            </div>

            {/* WhatsApp Dispatch Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href={`https://wa.me/2348033696489?text=${getWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-900/40"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Dispatch Profile to WhatsApp Scouting Desk</span>
              </a>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-slate-300 transition-colors"
              >
                Submit Another Player Profile
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Player Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ibrahim Abubakar"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Age / Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Age (Years) *
                </label>
                <input
                  type="number"
                  required
                  min="14"
                  max="35"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 19"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Primary Playing Position */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Primary Playing Position *
                </label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#140E35] border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="Goalkeeper">Goalkeeper (GK)</option>
                  <option value="Center Back (CB)">Center Back (CB)</option>
                  <option value="Fullback / Wingback (RB/LB)">Fullback / Wingback (RB/LB)</option>
                  <option value="Defensive Midfield (DM / No. 6)">Defensive Midfield (DM / No. 6)</option>
                  <option value="Central Midfield (CM / No. 8)">Central Midfield (CM / No. 8)</option>
                  <option value="Attacking Midfield (AM / No. 10)">Attacking Midfield (AM / No. 10)</option>
                  <option value="Winger (RW/LW / No. 7 & 11)">Winger (RW/LW / No. 7 &amp; 11)</option>
                  <option value="Center Forward / Striker">Center Forward / Striker (CF / No. 9)</option>
                </select>
              </div>

              {/* Preferred Foot */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Dominant Foot
                </label>
                <select
                  value={preferredFoot}
                  onChange={(e) => setPreferredFoot(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#140E35] border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="Right">Right Foot</option>
                  <option value="Left">Left Foot</option>
                  <option value="Ambidextrous (Both Feet)">Ambidextrous (Both Feet)</option>
                </select>
              </div>

              {/* Current Club / Academy */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Current Club / Academy
                </label>
                <input
                  type="text"
                  value={currentClub}
                  onChange={(e) => setCurrentClub(e.target.value)}
                  placeholder="e.g. Free Agent or Basic Soccer Academy"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* State / Base */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  State of Residence *
                </label>
                <select
                  value={stateOfResidence}
                  onChange={(e) => setStateOfResidence(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#140E35] border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="Kaduna State">Kaduna State (Academy Base)</option>
                  <option value="Kano State">Kano State</option>
                  <option value="Abuja FCT">Abuja FCT</option>
                  <option value="Lagos State">Lagos State</option>
                  <option value="Rivers State">Rivers State</option>
                  <option value="Plateau State">Plateau State</option>
                  <option value="Edo State">Edo State</option>
                  <option value="Other Nigerian State">Other Nigerian State</option>
                  <option value="Other African Country">Other African Country (Ghana, Cameroon, etc.)</option>
                </select>
              </div>

              {/* Passport Status */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  International Passport Status *
                </label>
                <select
                  value={hasPassport}
                  onChange={(e) => setHasPassport(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#140E35] border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="Yes, Valid > 18 Months">Yes, Valid (&gt; 18 Months)</option>
                  <option value="Yes, Expiring Soon (< 6 Months)">Yes, Expiring Soon (&lt; 6 Months)</option>
                  <option value="Currently Applying / Not Yet Ready">Currently Applying / Not Yet Ready</option>
                </select>
              </div>

              {/* Target European Corridor */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Target Mobility Corridor *
                </label>
                <select
                  value={targetCorridor}
                  onChange={(e) => setTargetCorridor(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#140E35] border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="Spain & Portugal (Iberian Hub)">Spain &amp; Portugal (Iberian Hub)</option>
                  <option value="Eastern Europe (Serbia, Montenegro, Poland, Romania)">Eastern Europe (Serbia, Montenegro, Poland, Romania)</option>
                  <option value="Mediterranean (Turkey & Greece)">Mediterranean (Turkey &amp; Greece)</option>
                  <option value="Arabian Gulf & Asia (Saudi Arabia, UAE, Qatar, Malaysia)">Arabian Gulf &amp; Asia (Saudi, UAE, Qatar, Malaysia)</option>
                  <option value="Any Verified European Club Trial">Any Verified European Club Trial</option>
                </select>
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +234 803 123 4567"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Video Highlight Link (Full width on sm) */}
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-[#4DA5EC]" />
                    <span>Match Footage / Highlight Video Link (YouTube, Vimeo, Google Drive, Hudl)</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">Highly recommended for rapid trial matching</span>
                </label>
                <input
                  type="url"
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... or Google Drive link"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

            </div>

            {/* Compliance Guarantee */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-slate-400 leading-relaxed flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong>Intermediary Statutory Notice:</strong> Sijam Consults Limited and Basic Soccer Academy operate under registered FIFA intermediary protocols. All trial invitations are authentic, authenticated directly with clubs in Europe and Asia, and processed through sovereign consular channels.
              </div>
            </div>

            {/* Submit CTA */}
            <div className="text-center pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white font-bold text-sm tracking-wide shadow-xl shadow-blue-900/30 transition-all hover:scale-[1.02]"
              >
                <Send className="w-4 h-4" />
                <span>Submit Profile for Intermediary Review</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
