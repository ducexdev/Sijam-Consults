'use client';

import React, { useState } from 'react';
import {
  Plane,
  Ticket,
  Calendar,
  Users,
  Luggage,
  Clock,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import Image from 'next/image';

const POPULAR_ORIGINS = [
  { code: 'ABV', city: 'Abuja', name: 'Nnamdi Azikiwe Int’l' },
  { code: 'LOS', city: 'Lagos', name: 'Murtala Muhammed Int’l' },
  { code: 'KAN', city: 'Kano', name: 'Mallam Aminu Kano Int’l' },
  { code: 'PHC', city: 'Port Harcourt', name: 'Port Harcourt Int’l' },
];

const POPULAR_DESTINATIONS = [
  { code: 'LHR', city: 'London', country: 'United Kingdom' },
  { code: 'WAW', city: 'Warsaw', country: 'Poland (EU)' },
  { code: 'BTS', city: 'Bratislava / Vienna', country: 'Slovakia / Austria' },
  { code: 'IST', city: 'Istanbul', country: 'Turkey' },
  { code: 'RUH', city: 'Riyadh', country: 'Saudi Arabia' },
  { code: 'DOH', city: 'Doha', country: 'Qatar' },
  { code: 'YYZ', city: 'Toronto', country: 'Canada' },
  { code: 'ECN', city: 'Ercan / Lefkosa', country: 'Northern Cyprus' },
];

export const FlightBookingWidget: React.FC = () => {
  const [bookingType, setBookingType] = useState<'visa_reservation' | 'confirmed_ticket'>('visa_reservation');
  const [tripType, setTripType] = useState<'round_trip' | 'one_way'>('round_trip');
  const [origin, setOrigin] = useState('Abuja (ABV)');
  const [destination, setDestination] = useState('Warsaw, Poland (WAW)');
  const [travelClass, setTravelClass] = useState('Economy');
  const [passengers, setPassengers] = useState(1);
  const [passengerType, setPassengerType] = useState<'standard' | 'student' | 'work_relocation'>('standard');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [customOrigin, setCustomOrigin] = useState('');
  const [customDestination, setCustomDestination] = useState('');

  const finalOrigin = origin === 'Other' ? (customOrigin || 'Custom Origin') : origin;
  const finalDestination = destination === 'Other' ? (customDestination || 'Custom Destination') : destination;

  const generateWhatsAppMessage = () => {
    const serviceName =
      bookingType === 'visa_reservation'
        ? 'Verifiable Flight Reservation for Visa (Active GDS PNR)'
        : 'Confirmed Flight Ticket Purchase';

    const text = `Hello Sijam Consult & Everbright Travels Desk,\n\nI want to request a ${serviceName}.\n\nFlight Details:\n• Route: ${finalOrigin} ➔ ${finalDestination}\n• Trip Type: ${tripType === 'round_trip' ? 'Round Trip' : 'One Way'}\n• Class: ${travelClass}\n• Passengers: ${passengers} (${passengerType.replace('_', ' ').toUpperCase()})\n${departureDate ? `• Departure: ${departureDate}\n` : ''}${tripType === 'round_trip' && returnDate ? `• Return: ${returnDate}\n` : ''}\nPlease provide the verified GDS PNR itinerary quote.`;

    return encodeURIComponent(text);
  };

  return (
    <div className="rounded-3xl bg-white border border-slate-200/80 shadow-2xl overflow-hidden text-slate-800">
      {/* Widget Header with Co-Branded Alliance Badge */}
      <div className="bg-gradient-to-r from-[#09051C] via-[#120A38] to-[#09051C] p-6 sm:p-8 text-white border-b border-purple-900/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live GDS Desk Active
              </span>
              <span className="text-xs text-slate-300 hidden sm:inline">
                • 60–120 Min Turnaround
              </span>
            </div>
            <h3 className="font-heading font-black text-xl sm:text-2xl text-white">
              Instant Flight Reservation &amp; Ticketing Desk
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Powered by <strong className="text-white">Sijam Consults</strong> in strategic bilateral alliance with{' '}
              <strong className="text-[#4DA5EC]">Everbright Travels &amp; Consultants Limited</strong>.
            </p>
          </div>

          {/* Everbright Logo Badge in Header */}
          <div className="shrink-0 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15 flex items-center gap-3">
            <div className="relative h-9 w-28">
              <Image
                src="/partners/everbright-travels-logo-white.png"
                alt="Everbright Travels & Consultants Limited"
                fill
                sizes="112px"
                className="object-contain"
              />
            </div>
            <div className="border-l border-white/20 pl-2.5 text-left">
              <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Aviation Desk</div>
              <div className="text-[11px] font-black text-emerald-400">Verifiable PNR</div>
            </div>
          </div>
        </div>

        {/* Primary Mode Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6 pt-2">
          <button
            type="button"
            onClick={() => setBookingType('visa_reservation')}
            className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer flex items-center gap-3 ${
              bookingType === 'visa_reservation'
                ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-lg shadow-blue-500/25 ring-2 ring-white/30'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <Ticket className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider">Flight Reservation for Visa</div>
              <div className="text-[11px] opacity-85">Live GDS PNR code • Zero risk of full ticket forfeiture</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setBookingType('confirmed_ticket')}
            className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer flex items-center gap-3 ${
              bookingType === 'confirmed_ticket'
                ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-lg shadow-blue-500/25 ring-2 ring-white/30'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider">Confirmed Flight Ticket</div>
              <div className="text-[11px] opacity-85">Issued on major airlines upon visa approval • Best market rates</div>
            </div>
          </button>
        </div>
      </div>

      {/* Widget Body Form */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Trip Type & Class Sub-Selector */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Journey:</span>
            <div className="inline-flex rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setTripType('round_trip')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  tripType === 'round_trip' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Round Trip (Embassy Preferred)
              </button>
              <button
                type="button"
                onClick={() => setTripType('one_way')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  tripType === 'one_way' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                One Way
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Cabin:</span>
            <div className="inline-flex rounded-xl bg-slate-100 p-1">
              {['Economy', 'Business Class'].map((cls) => (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setTravelClass(cls)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    travelClass === cls ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Origin & Destination Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Origin */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Departure City (Nigeria / West Africa)
            </label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full p-3.5 rounded-xl border border-slate-300 bg-slate-50 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#257CFF] focus:bg-white transition-all cursor-pointer"
            >
              {POPULAR_ORIGINS.map((hub) => (
                <option key={hub.code} value={`${hub.city} (${hub.code})`}>
                  {hub.city} ({hub.code}) — {hub.name}
                </option>
              ))}
              <option value="Other">Other City / Airport...</option>
            </select>
            {origin === 'Other' && (
              <input
                type="text"
                placeholder="Enter departure airport / city"
                value={customOrigin}
                onChange={(e) => setCustomOrigin(e.target.value)}
                className="w-full mt-2 p-3 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#257CFF]"
              />
            )}
          </div>

          {/* Destination */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Destination City / Foreign Hub
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-3.5 rounded-xl border border-slate-300 bg-slate-50 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#257CFF] focus:bg-white transition-all cursor-pointer"
            >
              {POPULAR_DESTINATIONS.map((dest) => (
                <option key={dest.code} value={`${dest.city}, ${dest.country} (${dest.code})`}>
                  {dest.city} ({dest.code}) — {dest.country}
                </option>
              ))}
              <option value="Other">Other Destination...</option>
            </select>
            {destination === 'Other' && (
              <input
                type="text"
                placeholder="Enter destination airport / country"
                value={customDestination}
                onChange={(e) => setCustomDestination(e.target.value)}
                className="w-full mt-2 p-3 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#257CFF]"
              />
            )}
          </div>
        </div>

        {/* Dates & Passengers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {/* Departure Date */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#257CFF]" />
              <span>Intended Departure</span>
            </label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#257CFF] focus:bg-white transition-all"
            />
          </div>

          {/* Return Date (if round-trip) */}
          {tripType === 'round_trip' && (
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#257CFF]" />
                <span>Intended Return</span>
              </label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#257CFF] focus:bg-white transition-all"
              />
            </div>
          )}

          {/* Passengers & Category */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#257CFF]" />
              <span>Traveler Category</span>
            </label>
            <select
              value={passengerType}
              onChange={(e) => setPassengerType(e.target.value as any)}
              className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#257CFF] focus:bg-white transition-all cursor-pointer"
            >
              <option value="standard">Standard Adult / Tourist</option>
              <option value="student">Student Visa (40kg+ Luggage Perk)</option>
              <option value="work_relocation">Employment / Expatriate Relocation</option>
            </select>
          </div>
        </div>

        {/* Feature Guarantees Strip */}
        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-wrap items-center justify-between gap-3 text-xs text-blue-900">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">
              100% Embassy-Verifiable GDS PNR Code on Official Airline Systems
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Clock className="w-3.5 h-3.5 text-[#257CFF]" />
            <span>Fast Turnaround: Generated within 60 to 120 mins</span>
          </div>
        </div>

        {/* Action Button Strip */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <a
            href={`https://wa.me/2347064229556?text=${generateWhatsAppMessage()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white font-black text-sm tracking-wide text-center shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
          >
            <PhoneCall className="w-4 h-4 text-white" />
            <span>Generate Itinerary via WhatsApp Desk</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="tel:+2347064229556"
            className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm tracking-wide text-center border border-slate-200 transition-colors"
          >
            Call Flight Desk
          </a>
        </div>
      </div>
    </div>
  );
};
