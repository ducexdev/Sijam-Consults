import type { BlogPost, BlogCategory, BlogTag, BlogAuthor } from '../types';

// ─── Authors ──────────────────────────────────────────────────────────────────

export const BLOG_AUTHORS: BlogAuthor[] = [
  {
    id: 'author-james',
    name: 'James Samson',
    role: 'MD & Principal Consultant',
    bio: 'James Samson is the Managing Director of Sijam Consults Limited and has personally advised hundreds of Nigerians on legitimate study, work, and business mobility pathways to Europe and North America.',
    avatar: '/team/James-Samson.png',
    linkedInUrl: undefined,
    twitterHandle: undefined,
  },
  {
    id: 'author-blessing',
    name: 'Blessing Attabor',
    role: 'Head of Operations',
    bio: 'Blessing Attabor heads Operations at Sijam Consults Limited, overseeing the client onboarding pipeline and document compliance for every application the firm processes.',
    avatar: '/team/Blessing-Attabor.png',
  },
  {
    id: 'author-zainab',
    name: 'Salami Zainab Kehinde',
    role: 'Client Success & Visa Processing Lead',
    bio: 'Zainab Kehinde leads the Visa Processing and Client Success teams, coordinating document verification and embassy submission timelines for Sijam clients.',
    avatar: '/team/Salami-Zainab.png',
  },
];

// ─── Categories ───────────────────────────────────────────────────────────────

export const BLOG_CATEGORIES: BlogCategory[] = [
  { id: 'cat-study', name: 'Study Abroad', slug: 'study-abroad', color: '#402493' },
  { id: 'cat-work', name: 'Work & Relocation', slug: 'work-relocation', color: '#F45A2A' },
  { id: 'cat-business', name: 'Business Mobility', slug: 'business-mobility', color: '#059669' },
  { id: 'cat-visitor', name: 'Visitor & Tourist', slug: 'visitor-tourist', color: '#0369a1' },
  { id: 'cat-policy', name: 'Immigration Policy', slug: 'immigration-policy', color: '#7c3aed' },
  { id: 'cat-jobs', name: 'International Jobs', slug: 'international-jobs', color: '#b45309' },
];

// ─── Tags ─────────────────────────────────────────────────────────────────────

export const BLOG_TAGS: BlogTag[] = [
  { id: 'tag-canada', name: 'Canada', slug: 'canada' },
  { id: 'tag-poland', name: 'Poland', slug: 'poland' },
  { id: 'tag-uk', name: 'United Kingdom', slug: 'united-kingdom' },
  { id: 'tag-schengen', name: 'Schengen', slug: 'schengen' },
  { id: 'tag-study-visa', name: 'Study Visa', slug: 'study-visa' },
  { id: 'tag-work-permit', name: 'Work Permit', slug: 'work-permit' },
  { id: 'tag-business', name: 'Business Registration', slug: 'business-registration' },
  { id: 'tag-nursing', name: 'Nursing', slug: 'nursing' },
  { id: 'tag-nigeria', name: 'Nigeria', slug: 'nigeria' },
  { id: 'tag-refusal', name: 'Visa Refusal', slug: 'visa-refusal' },
  { id: 'tag-documents', name: 'Document Preparation', slug: 'document-preparation' },
  { id: 'tag-sop', name: 'Statement of Purpose', slug: 'statement-of-purpose' },
];

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-001',
    slug: 'why-study-nursing-canada-2026',
    title: 'Why Study Nursing in Canada: 2026 / 2027 Admission & Licence Pathway',
    excerpt:
      'A practical roadmap for Nigerian registered nurses and school leavers looking to build healthcare careers in Canada through verified academic pathways.',
    status: 'published',
    publishedAt: '2026-08-14',
    updatedAt: '2026-09-28',
    contentReviewDue: '2027-02-28',
    readTimeMinutes: 7,
    isImmigrationPolicy: true,
    policyLastVerified: '2026-09-28',
    featuredImage: '/blogs/Why-Study-Nursing-in-Canada-20262027.png',
    featuredImageAlt: 'A nursing student in a Canadian hospital corridor — representing the study nursing in Canada pathway',
    author: BLOG_AUTHORS[0],
    category: BLOG_CATEGORIES[0],
    tags: [BLOG_TAGS[0], BLOG_TAGS[4], BLOG_TAGS[7]],
    keyTakeaways: [
      'Canadian provinces face documented nursing deficits with designated PR retention pathways for international graduates.',
      'Bridging programmes exist for Nigerian-trained RNs seeking NNAS credential equivalency.',
      'Proof of funds must clearly demonstrate liquid living expenses alongside first-year tuition already paid.',
      'A well-structured Statement of Purpose addressing Section 216(1)(b) ties to home country is critical for approval.',
    ],
    sections: [
      {
        heading: 'The Global Demand for Healthcare Talent',
        content:
          'Canada continues to prioritise international healthcare professionals across British Columbia, Ontario, Alberta, and Saskatchewan. For Nigerian nurses, transitioning via post-graduate clinical nursing certificates or direct Bachelor of Science in Nursing (BScN) degrees provides an accredited foundation with legal work rights during and after studies. The Government of Canada\'s Designated Learning Institution (DLI) list is updated each year — only programmes at approved DLIs qualify for Post-Graduation Work Permits (PGWPs).',
      },
      {
        heading: 'Direct Admission vs. Bridging Programmes',
        content:
          'If you already hold an RN licence from the Nursing and Midwifery Council of Nigeria (NMCN), direct licence conversion through the National Nursing Assessment Service (NNAS) can be time-consuming. Enrolling in a Canadian DLI for a two-year post-graduate nursing specialisation allows you to study, adapt to Canadian clinical software systems, and sit the NCLEX-RN examination. Many graduates in this cohort achieve high first-time pass rates once fully acclimatised to Canadian clinical standards.',
      },
      {
        heading: 'Overcoming Common Study Visa Refusal Grounds',
        content:
          'The most frequent refusal reason under Section 216(1)(b) of the Immigration and Refugee Protection Regulations (IRPR) is "lack of ties to home country" and "unreasonable study plan." Your Statement of Purpose must demonstrate how the advanced Canadian curriculum directly addresses a skills gap you intend to address professionally upon return. Generic SOPs that read as immigration intent rather than academic purpose are routinely flagged by visa officers.',
      },
      {
        heading: 'Proof of Funds: What Is Actually Required',
        content:
          'IRCC requires applicants to demonstrate sufficient funds to cover: first-year tuition, living expenses for the first year (CAD 20,635 as of the 2025 update), and return transportation. Funds must be accessible and liquid — fixed assets, land, or informal savings arrangements are not accepted. Bank statements should show a consistent history rather than a sudden lump-sum deposit immediately before the application.',
      },
      {
        heading: 'Post-Graduation Work Permits and PR Pathways',
        content:
          'Graduates of qualifying programmes at DLIs are eligible for PGWPs commensurate with the length of their programme — up to three years for programmes of two years or longer. This work experience is then eligible under the Canadian Experience Class (CEC) of the Express Entry system, opening permanent residency options. Healthcare professionals are additionally advantaged under provincial nominee streams in Ontario, Alberta, and Saskatchewan.',
      },
    ],
    faqs: [
      {
        question: 'Does Sijam Consults guarantee a Canadian study visa?',
        answer:
          'No. Sijam Consults Limited is an immigration advisory firm, not a visa-issuing authority. We provide professional consultation, document preparation guidance, and SOP review. All visa decisions are made solely by Immigration, Refugees and Citizenship Canada (IRCC). We do not guarantee approvals, and any consultant who does so is misrepresenting their authority.',
      },
      {
        question: 'Can a Nigerian RN apply directly without a new degree?',
        answer:
          'Possibly, via the NNAS credential review pathway, but this can take 12–18 months and does not guarantee provincial regulatory acceptance. The faster and more structured route for most applicants is enrolling in a qualifying Canadian nursing programme first.',
      },
      {
        question: 'How much does nursing school cost in Canada?',
        answer:
          'International student tuition at Canadian institutions varies significantly by province and institution, typically between CAD 18,000 and CAD 35,000 per year. Sijam Consults can provide guidance on identifying suitable institutions based on your profile, but we do not quote or collect tuition on behalf of any institution.',
      },
    ],
    relatedPostSlugs: ['schengen-d-visa-african-founders', 'uk-skilled-worker-visa-guide-2026'],
    officialSourceUrls: [
      'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html',
      'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/permit/temporary/post-graduation.html',
      'https://www.nnas.ca/',
    ],
    seo: {
      title: 'Study Nursing in Canada from Nigeria: 2026/2027 Complete Guide | Sijam Consults',
      description:
        'Step-by-step guide for Nigerian nurses and school leavers on studying nursing in Canada: admission pathways, DLI requirements, proof of funds, PGWP eligibility, and PR options.',
      ogImage: '/blogs/Why-Study-Nursing-in-Canada-20262027.png',
    },
  },
  {
    id: 'post-002',
    slug: 'schengen-d-visa-african-founders',
    title: 'European Corporate Setup & Schengen D-Visa: Complete Guide for African Founders',
    excerpt:
      'How Nigerian business owners can legally incorporate a Polish Sp. z o.o., access European banking infrastructure, and obtain long-stay residency across 27 Schengen countries.',
    status: 'published',
    publishedAt: '2026-07-22',
    updatedAt: '2026-09-10',
    contentReviewDue: '2027-01-10',
    readTimeMinutes: 8,
    isImmigrationPolicy: true,
    policyLastVerified: '2026-09-10',
    featuredImage: '/blogs/Ducex-Blog.png',
    featuredImageAlt: 'A business district in Warsaw, Poland — representing European company registration for African founders',
    author: BLOG_AUTHORS[1],
    category: BLOG_CATEGORIES[2],
    tags: [BLOG_TAGS[1], BLOG_TAGS[3], BLOG_TAGS[6]],
    keyTakeaways: [
      'Polish Sp. z o.o. can be incorporated without physical presence via notarial or electronic KRS portals.',
      'Poland offers a 9% Corporate Income Tax (CIT) rate for small qualifying companies.',
      'Company directors who hold genuine roles are eligible to apply for National Type-D residency visas.',
      'A genuine business plan and operational evidence are essential — Polish immigration authorities scrutinise "shell" incorporations.',
    ],
    sections: [
      {
        heading: 'Why Poland for African Business Founders',
        content:
          'Poland sits at the heart of the European Union\'s single market while maintaining relatively accessible business formation processes for non-EU nationals. With a corporate tax rate of 9% for small companies, low commercial property costs compared to Western Europe, and a well-connected logistics infrastructure, Warsaw and Kraków have emerged as European headquarters for founders from Africa, Asia, and the Middle East.',
      },
      {
        heading: 'Incorporating a Polish Sp. z o.o. Remotely',
        content:
          'The Spółka z ograniczoną odpowiedzialnością (Sp. z o.o.) is the Polish equivalent of a limited liability company. Remote incorporation is possible via two routes: the S24 electronic registration portal (limited use cases, standardised articles) or a notarised power of attorney authorising a local Polish representative to execute registration on your behalf. Share capital of PLN 5,000 (approximately EUR 1,200 at current rates) is required at formation. Publication in the National Court Register (KRS) takes approximately three to five business days.',
      },
      {
        heading: 'Opening a Polish Business Bank Account',
        content:
          'This is often the most challenging step for non-resident founders. Most Polish banks require an in-person visit for Know Your Customer (KYC) compliance. However, several Polish fintech institutions and EU-licensed online banks have introduced video KYC processes that allow account opening without flying to Poland. Sijam Consults can advise on compatible banking partners based on your business type.',
      },
      {
        heading: 'The National Type-D (Long-Stay) Visa',
        content:
          'A Polish National Visa (Type D) allows stays of up to 365 days per year in Poland and free movement across the Schengen Area. Directors and majority shareholders of actively-trading Polish companies may qualify. Supporting evidence must include: KRS extract, company bank statements, genuine commercial contracts or client agreements, and a credible business activity report. Purely nominal directorships with no actual business activity are regularly refused.',
      },
      {
        heading: 'Schengen-Wide Movement Rights',
        content:
          'A valid Polish National Visa does not automatically grant the right to live in other Schengen member states — it permits travel and short stays. If you intend to reside in Germany, France, or the Netherlands while maintaining your Polish company, separate national residence permits are typically required. Sijam Consults provides country-specific guidance on multi-jurisdiction residency structuring.',
      },
    ],
    faqs: [
      {
        question: 'Can Sijam Consults guarantee my Polish visa or residency will be approved?',
        answer:
          'No. We advise on documentation, business plan structure, and application preparation. All decisions rest with Polish consular and immigration authorities. Approval depends on the genuine nature of your business and the completeness of your application.',
      },
      {
        question: 'How long does the full process take from incorporation to visa?',
        answer:
          'Realistically, 4–8 months when all steps are executed efficiently: incorporation (2–4 weeks), bank account (4–8 weeks), trading activity evidence (3–6 months of documented operations), then visa application processing (8–12 weeks at the Polish Embassy in Abuja). Attempting to shortcut the trading period is the primary reason applications are refused.',
      },
    ],
    relatedPostSlugs: ['why-study-nursing-canada-2026', 'uk-skilled-worker-visa-guide-2026'],
    officialSourceUrls: [
      'https://www.biznes.gov.pl/en/e-services/00_0001_00,register-a-company-in-s24-e-court-register.html',
      'https://www.gov.pl/web/konsulat-lagos/national-visa',
    ],
    seo: {
      title: 'Polish Company Registration & Schengen D-Visa for Nigerians | Sijam Consults',
      description:
        'Complete guide to incorporating a Sp. z o.o. in Poland, opening a business bank account, and obtaining a National Type-D visa for Schengen travel — for Nigerian founders.',
      ogImage: '/blogs/Ducex-Blog.png',
    },
  },
  {
    id: 'post-003',
    slug: 'uk-skilled-worker-visa-guide-2026',
    title: 'UK Skilled Worker Visa from Nigeria: What Has Changed in 2026',
    excerpt:
      'Updated breakdown of the UK Home Office salary thresholds, approved sponsor list requirements, and the genuine impact of the 2024–2026 immigration rule changes on Nigerian applicants.',
    status: 'published',
    publishedAt: '2026-06-10',
    updatedAt: '2026-10-01',
    contentReviewDue: '2027-04-01',
    readTimeMinutes: 9,
    isImmigrationPolicy: true,
    policyLastVerified: '2026-10-01',
    featuredImage: '/blogs/Ducex-Blog-1.png',
    featuredImageAlt: 'Big Ben and the Houses of Parliament in London — representing UK immigration for Nigerian professionals',
    author: BLOG_AUTHORS[2],
    category: BLOG_CATEGORIES[1],
    tags: [BLOG_TAGS[2], BLOG_TAGS[5], BLOG_TAGS[8]],
    keyTakeaways: [
      'The general minimum salary threshold rose to £38,700 as of April 2024, up from £26,200.',
      'Care sector roles face additional restrictions: sponsors must meet Care Quality Commission (CQC) registration requirements.',
      'Dependant rights were significantly restricted from March 2024 — most non-student dependants face new scrutiny.',
      'A genuine, approved UK Sponsor Licence remains non-negotiable — no sponsor, no Skilled Worker visa.',
    ],
    sections: [
      {
        heading: '2024–2026 Rule Changes: The Core Facts',
        content:
          'The UK government introduced sweeping changes to immigration rules beginning April 2024. The headline change was the increase in the general Skilled Worker minimum salary threshold from £26,200 to £38,700 per year. The "going rate" for specific occupations also increased, meaning some roles that previously qualified under the salary rules no longer do. These changes followed the March 2024 five-point plan announced by the then-Home Secretary and have since been maintained under the current government. Always verify the current thresholds directly on the UK Visas & Immigration (UKVI) official guidance pages, as these may be updated.',
      },
      {
        heading: 'Finding a Licensed UK Sponsor',
        content:
          'The most common reason Nigerian applicants are unable to proceed with a Skilled Worker application is the absence of a valid Certificate of Sponsorship (CoS) from a Home Office-licenced employer. You cannot self-sponsor. The UK Home Office publishes a publicly searchable Register of Licensed Sponsors — Sijam Consults recommends verifying that any employer claiming to sponsor you is on this register before paying any fees or processing documents.',
      },
      {
        heading: 'Healthcare & Social Care: Specific Restrictions',
        content:
          'The care sector saw the most significant restrictions. From March 2024, care workers and home carers sponsored by employers not registered with the Care Quality Commission (CQC) are no longer eligible for Skilled Worker visas. Additionally, dependants of care workers sponsored in these roles from that date face significantly restricted rights. Nigerian nurses and doctors are in a different sub-category and should check the specific occupation codes and NHS/CQC registration requirements applicable to their role.',
      },
      {
        heading: 'English Language Requirements',
        content:
          'All Skilled Worker applicants must meet B1 English on the Common European Framework of Reference (CEFR). Accepted tests include IELTS Academic (minimum 4.0 in each component for most roles), Pearson PTE Academic, and others on the approved list. Nigerian applicants educated in English-language institutions may qualify for an exemption — but this is determined on a case-by-case basis and must be evidenced properly.',
      },
      {
        heading: 'Financial Requirements and Bank Statements',
        content:
          'Unless your Certificate of Sponsorship confirms your employer will cover your first month\'s accommodation costs, you must demonstrate you have held at least £1,270 in your bank account continuously for 28 days before your application date. Funds must appear on statements for the full 28-day window — a balance that dips below the threshold at any point in that period fails the requirement, even if the average is sufficient.',
      },
    ],
    faqs: [
      {
        question: 'Can Sijam Consults find me a UK employer sponsor?',
        answer:
          'Sijam Consults is an immigration advisory firm — we do not directly recruit for UK employers and do not guarantee job placements. We can advise on legitimate job search channels, how to evaluate sponsor licence status, and how to prepare your immigration documentation once you have a confirmed CoS from a licensed employer.',
      },
      {
        question: 'How long does the UK Skilled Worker visa take to process?',
        answer:
          'Standard processing from outside the UK typically takes three to eight weeks. Priority and super-priority services are available at additional cost from certain overseas visa application centres. Current processing times are published on the official UK Visas & Immigration website.',
      },
      {
        question: 'Are the minimum salary thresholds the same for every job?',
        answer:
          'No. Each SOC occupation code has its own "going rate" which may be higher than the general £38,700 threshold. You must meet whichever is higher — the general threshold or the occupation-specific going rate. The full table is available in Appendix Skilled Occupations on the UK Home Office website.',
      },
    ],
    relatedPostSlugs: ['why-study-nursing-canada-2026', 'schengen-d-visa-african-founders'],
    officialSourceUrls: [
      'https://www.gov.uk/skilled-worker-visa',
      'https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers',
      'https://www.gov.uk/government/publications/skilled-worker-visa-going-rates-for-eligible-occupations',
    ],
    seo: {
      title: 'UK Skilled Worker Visa 2026: Salary Thresholds & Rules for Nigerian Applicants | Sijam',
      description:
        'Updated guide to the UK Skilled Worker Visa for Nigerians in 2026: new £38,700 salary threshold, sponsor licence requirements, care sector restrictions, and English language rules.',
      ogImage: '/blogs/sijam-blog.jpg',
    },
  },
  {
    id: 'post-004',
    slug: 'tourist-visa-refusal-common-mistakes',
    title: '7 Reasons Your Tourist Visa Was Refused (And What to Do Next)',
    excerpt:
      'Understanding the most common grounds for Schengen and UK tourist visa refusals from Nigeria — and how to address each one in a fresh application.',
    status: 'published',
    publishedAt: '2026-05-18',
    updatedAt: '2026-09-05',
    contentReviewDue: '2027-03-05',
    readTimeMinutes: 6,
    isImmigrationPolicy: false,
    featuredImage: '/blogs/Why-Study-Nursing-in-Canada-20262027.png',
    featuredImageAlt: 'A travel passport with boarding pass — representing tourist visa applications and refusals',
    author: BLOG_AUTHORS[0],
    category: BLOG_CATEGORIES[3],
    tags: [BLOG_TAGS[3], BLOG_TAGS[9], BLOG_TAGS[10]],
    keyTakeaways: [
      'The refusal letter cites a specific legal ground — read it carefully before reapplying.',
      'Insufficient proof of funds and unclear travel itinerary account for the majority of Schengen refusals.',
      'Reapplying immediately with the same documents is almost always unsuccessful.',
      'A well-structured cover letter addressing each refusal ground specifically is more effective than a generic resubmission.',
    ],
    sections: [
      {
        heading: 'Reason 1: Insufficient Proof of Funds',
        content:
          'Embassies require clear evidence that you can financially sustain yourself throughout your trip without recourse to public funds in the destination country. The threshold varies by country and duration, but as a guide, Schengen countries typically look for the equivalent of €50–€100 per day of stay in accessible, liquid funds. Bank statements showing recent large deposits with no transactional history are frequently questioned.',
      },
      {
        heading: 'Reason 2: Unclear Travel Purpose',
        content:
          'A vague itinerary ("visiting Europe for tourism") is insufficient. Officers want to see hotel bookings, a day-by-day outline of planned activities, and evidence that your stated purpose is consistent with your travel history, profession, and financial profile. If you are visiting family, sponsorship letters from the host and proof of relationship are expected.',
      },
      {
        heading: 'Reason 3: Weak Ties to Home Country',
        content:
          'This is the most cited refusal ground across both Schengen and UK tourist visas for Nigerian applicants. Embassies assess your likelihood of returning. Evidence of ties includes: stable employment (salary slips, employer letters, tax records), property ownership, family dependants in Nigeria, and business ownership. Unemployed or recently graduated applicants face heightened scrutiny and must address this directly.',
      },
      {
        heading: 'Reason 4: Incomplete or Inconsistent Documentation',
        content:
          'Missing a single required document can result in refusal — and in some cases, an automatic disqualification for a period. Common missing items include: missing pages of bank statements, expired travel insurance that does not meet the minimum EUR 30,000 medical cover requirement, photos that do not meet specification, or a national ID that is not apostilled where required.',
      },
      {
        heading: 'Reason 5: Previous Immigration Violations',
        content:
          'If you have previously overstayed a visa, been deported, or entered a country unlawfully, this will appear in immigration databases and significantly affect future applications. There are legitimate procedures for disclosing and addressing prior violations — attempting to conceal them is both illegal and counterproductive.',
      },
      {
        heading: 'Reason 6: Inconsistent Accommodation Arrangements',
        content:
          'Claiming to stay with a friend but presenting no invitation letter, or booking a hotel in one city while your flight arrives in another city with no explained travel plan, creates inconsistencies that trigger refusal. Every element of your application narrative must be coherent and supported.',
      },
      {
        heading: 'Reason 7: Unexplained Gaps in Travel History',
        content:
          'Officers review your passport travel history. Long unexplained gaps, or a history of single-entry visas that were used exactly once to the day, can raise questions. A clear narrative of your travel history — particularly previous Schengen entries — is beneficial.',
      },
    ],
    faqs: [
      {
        question: 'How soon can I reapply after a refusal?',
        answer:
          'There is no mandatory waiting period for tourist visa refusals in most Schengen jurisdictions, but reapplying within days with the same documents is almost universally unsuccessful. Address the specific grounds cited in your refusal letter before submitting a new application. Sijam Consults recommends a minimum review period of four to eight weeks to rebuild and reframe the application.',
      },
      {
        question: 'Should I appeal or reapply?',
        answer:
          'In most Schengen cases, an administrative appeal is a procedural right but rarely results in a different outcome — the officer\'s assessment of subjective grounds (such as ties to home country) is difficult to overturn on appeal. A new, stronger application is generally more effective. UK visa refusals have a separate administrative review process — check the specific right stated in your refusal letter.',
      },
    ],
    relatedPostSlugs: ['why-study-nursing-canada-2026', 'schengen-d-visa-african-founders'],
    seo: {
      title: '7 Reasons Your Tourist Visa Was Refused from Nigeria | Sijam Consults',
      description:
        'Learn the 7 most common tourist visa refusal reasons for Nigerian applicants — Schengen and UK — and how to properly address each before reapplying.',
    },
  },
  {
    id: 'post-005',
    slug: 'international-job-search-strategy-nigeria',
    title: 'How to Legitimately Search for International Jobs from Nigeria in 2026',
    excerpt:
      'A structured strategy for Nigerian professionals looking for verified international employment — without falling for recruitment scams or illegal migration schemes.',
    status: 'published',
    publishedAt: '2026-04-02',
    updatedAt: '2026-08-20',
    readTimeMinutes: 7,
    isImmigrationPolicy: false,
    featuredImage: '/blogs/Ducex-Blog-1.png',
    featuredImageAlt: 'A professional reviewing job offers on a laptop — representing legitimate international job search from Nigeria',
    author: BLOG_AUTHORS[1],
    category: BLOG_CATEGORIES[5],
    tags: [BLOG_TAGS[5], BLOG_TAGS[8], BLOG_TAGS[10]],
    keyTakeaways: [
      'Legitimate employers do not charge candidates processing fees, agency fees, or travel deposits upfront.',
      'Verify any sponsor\'s licence status on official government employer registers before proceeding.',
      'An employment contract should be reviewed before any immigration application is submitted.',
      'Sijam Consults provides advisory services — we do not directly source employers or guarantee placements.',
    ],
    sections: [
      {
        heading: 'The Difference Between Immigration Advisory and Job Placement',
        content:
          'Sijam Consults Limited is an immigration consultancy — we advise on visa pathways, documentation, and application strategy. We do not operate as a licensed employment agency, and we do not recruit on behalf of foreign employers. This distinction matters enormously: if any firm promises you a job abroad as part of an immigration service package, verify that they are licensed as an employment agency by the Nigerian Employment and Vacancies Act framework and, where applicable, by the destination country\'s labour authorities.',
      },
      {
        heading: 'Verified Job Search Platforms',
        content:
          'For legitimate international job opportunities, use employer-direct job portals and internationally recognised platforms: LinkedIn (filter by work permit sponsorship), Indeed International, the specific national employment portals of your target country (e.g., Poland\'s Praca.gov.pl, the UK\'s Find a Job service), and NHS Jobs for UK healthcare roles. In addition, destination-country employer databases such as the UK\'s Register of Licensed Sponsors can be cross-checked to verify whether a company offering you a role actually holds sponsorship rights.',
      },
      {
        heading: 'Red Flags That Indicate Fraud',
        content:
          'Common indicators of fraudulent international job offers include: upfront fees before any contract is signed; job offers received via WhatsApp or social media with no verifiable company identity; salaries significantly above market rates for the stated role; guarantees of visa approval; pressure to decide within 24–48 hours; and payment requests via personal mobile money accounts. If you encounter any of these, do not proceed. Report to the Nigeria Police Force cybercrime unit or EFCC.',
      },
      {
        heading: 'Preparing Your International Job Profile',
        content:
          'Before applying internationally, ensure your documents are in order: an internationally-legible CV in the format expected in your target country (European CV Europass format for EU roles; chronological format for UK and North American employers), certified translations of credentials where required, apostilled educational certificates for many European countries, and a strong LinkedIn profile consistent with your CV.',
      },
      {
        heading: 'Understanding Work Authorisation Before Accepting an Offer',
        content:
          'Do not resign from your current role or make any financial commitments until you have a signed employment contract AND your work authorisation visa has been stamped. An employer letter of intent is not a visa. A Certificate of Sponsorship is not entry clearance. Full clarity on your visa status and timeline should precede any irreversible personal or financial decision.',
      },
    ],
    faqs: [
      {
        question: 'Does Sijam Consults connect me with employers abroad?',
        answer:
          'Sijam Consults advises on immigration pathways and documentation. We do not directly source or guarantee employment with foreign employers. Our Jobs directory lists opportunities we have been made aware of and consider potentially legitimate — but applicants must conduct their own due diligence and verify employer credentials independently.',
      },
      {
        question: 'What should I do if I have already paid an agent who promised me a job abroad?',
        answer:
          'Cease payments immediately and seek legal advice. If the agent is operating in Nigeria, report to the National Agency for the Prohibition of Trafficking in Persons (NAPTIP) or the Federal Ministry of Labour and Employment. Preserve all communications and receipts. Sijam Consults does not take over cases from other agents without a full assessment of the situation.',
      },
    ],
    relatedPostSlugs: ['uk-skilled-worker-visa-guide-2026', 'why-study-nursing-canada-2026'],
    seo: {
      title: 'How to Find Legitimate International Jobs from Nigeria in 2026 | Sijam Consults',
      description:
        'A structured guide for Nigerian professionals on verified international job search strategies, red flags to avoid, and how to prepare your profile for overseas applications.',
    },
  },
];

/**
 * Get all published blog posts, sorted by publishedAt descending.
 */
export function getPublishedPosts(): BlogPost[] {
  const now = new Date();
  return BLOG_POSTS.filter((post) => {
    if (post.status === 'scheduled' && post.scheduledAt) {
      return new Date(post.scheduledAt) <= now;
    }
    return post.status === 'published';
  }).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

/**
 * Find a single published post by slug. Returns undefined if not found or not published.
 */
export function getPublishedPostBySlug(slug: string): BlogPost | undefined {
  const posts = getPublishedPosts();
  return (
    posts.find((p) => p.slug === slug) ||
    (slug === 'why-study-nursing-in-canada-2026-2027'
      ? posts.find((p) => p.slug === 'why-study-nursing-canada-2026')
      : undefined)
  );
}

/**
 * Get published posts by category slug.
 */
export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return getPublishedPosts().filter((p) => p.category.slug === categorySlug);
}

/**
 * Get published posts by tag slug.
 */
export function getPostsByTag(tagSlug: string): BlogPost[] {
  return getPublishedPosts().filter((p) => p.tags.some((t) => t.slug === tagSlug));
}

/**
 * Get related posts by slug list, filtering to published only.
 */
export function getRelatedPosts(slugs: string[]): BlogPost[] {
  return getPublishedPosts().filter((p) => slugs.includes(p.slug));
}
