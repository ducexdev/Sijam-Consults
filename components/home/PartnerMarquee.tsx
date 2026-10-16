import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PARTNERS_DATA } from '@/lib/data/partners';
import { ROUTES } from '@/lib/routes';

export const PartnerMarquee: React.FC = () => {
  return (
    <section className="py-14 bg-[#070415] border-y border-white/10 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#F98864]">
            Verified Bilateral Alliances &amp; Global Mobility Partners
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
          {PARTNERS_DATA.map((partner) => (
            <div
              key={partner.id}
              className="bg-white/[0.04] rounded-2xl p-4 border border-white/10 hover:border-[#F45A2A]/40 shadow-sm hover:shadow-neon-orange transition-all flex flex-col items-center justify-center h-24 group backdrop-blur-sm"
            >
              <div className="relative w-full h-12" style={{ position: 'relative' }}>
                <Image
                  src={partner.logoUrl}
                  alt={partner.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-contain filter brightness-90 group-hover:brightness-100 transition-all p-1"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link
            href={ROUTES.partners}
            className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Explore all bilateral partnerships, university placements &amp; recruitment quotas →
          </Link>
        </div>
      </div>
    </section>
  );
};
