# Sijam Consults Limited — Enterprise Consular & Travel Facilitation Platform

Official web platform for **SIJAM Consults Limited** (CAC Registered: **RC 1715416**), an educational advisory, international employment visa facilitation, and corporate travel consultancy headquartered in Kaduna, Nigeria.

---

## 🛠 Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Actions, Server Components)
- **Language**: TypeScript 5 (Strict Mode)
- **Styling**: Tailwind CSS 4, Custom Design Tokens
- **Database**: [Supabase](https://supabase.com/) PostgreSQL with Row Level Security (RLS) & dual-mode resilient repository
- **Email Delivery**: cPanel SMTP Relay via `nodemailer` (Direct SMTPS on Port 465) with durable outbox logging
- **SEO & Metadata**: JSON-LD Structured Data (Organization, BreadcrumbList, Article, JobPosting, Service), dynamic XML sitemaps, RSS 2.0 feed
- **Icons**: Lucide React

---

## 🚀 Key Features

1. **Service Pathways**:
   - Study Abroad & Student Visa Advisory
   - Work Permits & Employment Placement Advisory
   - Tourist & Visitor Visa Assistance
   - Visa Application Assistance & Review
   - Foreign Company Registration & European Corporate Incorporation
   - Travel Document Legalization, Authentication & Notarization
   - Flight Reservation & Ticketing Coordination

2. **Interactive Consultation Booking**:
   - Multi-step service wizard with real-time field validation
   - Immediate Supabase persistence with unique reference codes (`SJM-XXXXXX`)
   - Automatic transactional email dispatch to applicant + internal alert to Kaduna operations desk

3. **International Opportunities & Job Board**:
   - Filterable opportunities directory with verified employers
   - Application eligibility criteria and document checklists
   - Secure private candidate application submissions with email confirmations

4. **Editorial & SEO Engine**:
   - Editorial blog with category and tag archives
   - RSS 2.0 feed (`/blog/rss.xml`)
   - Complete Schema.org JSON-LD microdata on all service, job, and blog pages
   - Dynamic XML sitemaps and robots.txt

5. **Staff Governance & Operations Dashboard**:
   - Role-based administrative access control
   - Consultation lifecycle tracking (new, assigned, scheduled, completed)
   - Candidate application reviews and status history
   - Client review moderation engine
   - Real-time durable email outbox delivery monitoring

---

## 🏁 Getting Started

### Prerequisites

- Node.js 20+ (Node 22+ recommended)
- npm or pnpm
- Supabase project credentials
- cPanel mail credentials

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:ducexdev/Sijam-Consults.git
   cd Sijam-Consults
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env.local
   # Fill in your Supabase and SMTP credentials in .env.local
   ```

4. Run database migrations:
   ```bash
   # Apply SQL files in supabase/migrations/ via Supabase CLI or SQL Editor
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🏗 Build & Production

To create an optimized production build:

```bash
npm run build
```

To run lint checks:

```bash
npm run lint
```

---

## 🏛 Statutory Notice & Regulatory Compliance

SIJAM Consults Limited (RC: 1715416) is a private corporate advisory and travel facilitation consultancy. The company is **NOT** an embassy, consulate, or sovereign visa-issuing authority. The issuance or denial of any visa remains the exclusive prerogative of respective sovereign governments. Sijam Consults strictly adheres to NDPR data protection regulations.
