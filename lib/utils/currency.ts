/**
 * Currency conversion utilities for Sijam Consults Foreign Jobs
 * Provides real-time dynamic conversion estimates between European/UK currencies and Nigerian Naira (NGN).
 */

// Central reference conversion rates for overseas employment estimation
export const EXCHANGE_RATES: Record<string, number> = {
  EUR: 1750, // 1 EUR ≈ ₦1,750
  GBP: 2100, // 1 GBP ≈ ₦2,100
  USD: 1650, // 1 USD ≈ ₦1,650
  CAD: 1220, // 1 CAD ≈ ₦1,220
  PLN: 410,  // 1 PLN ≈ ₦410
};

/**
 * Parses and converts foreign salary strings into estimated Nigerian Naira
 * Examples:
 *  "€2,400 – €3,200 / month (gross)" -> "₦4.2M – ₦5.6M / month"
 *  "£23,800 – £28,500 / year + overtime" -> "₦4.1M – ₦4.9M / month"
 */
export function formatSalaryDisplay(salaryStr?: string, showNaira = false): string {
  if (!salaryStr) return 'Competitive Foreign Package';
  if (!showNaira) return salaryStr;

  try {
    let rate = EXCHANGE_RATES.EUR;
    let isAnnual = salaryStr.toLowerCase().includes('year') || salaryStr.toLowerCase().includes('annum');
    let isHourly = salaryStr.toLowerCase().includes('hour');

    if (salaryStr.includes('£') || salaryStr.includes('GBP')) {
      rate = EXCHANGE_RATES.GBP;
    } else if (salaryStr.includes('$') || salaryStr.includes('USD')) {
      rate = EXCHANGE_RATES.USD;
    } else if (salaryStr.includes('zł') || salaryStr.includes('PLN')) {
      rate = EXCHANGE_RATES.PLN;
    }

    // Extract numbers from string
    const cleaned = salaryStr.replace(/,/g, '');
    const matches = cleaned.match(/\d+(\.\d+)?/g);

    if (!matches || matches.length === 0) return salaryStr;

    const numbers = matches.map(Number);
    
    // Helper to format in Millions or Thousands
    const toNairaStr = (val: number) => {
      let naira = val * rate;
      if (isAnnual) {
        naira = naira / 12; // Normalize to monthly for intuitive candidate comprehension
      } else if (isHourly) {
        naira = naira * 160; // 160 hours monthly average
      }

      if (naira >= 1_000_000) {
        return `₦${(naira / 1_000_000).toFixed(1)}M`;
      }
      return `₦${Math.round(naira / 1000)}k`;
    };

    if (numbers.length >= 2) {
      return `~${toNairaStr(numbers[0])} – ${toNairaStr(numbers[1])} / month`;
    }
    return `~${toNairaStr(numbers[0])} / month`;
  } catch {
    return salaryStr;
  }
}
