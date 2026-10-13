import type { BreadcrumbItem } from '@/lib/types';

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

/**
 * BreadcrumbList JSON-LD schema.
 * Only renders when there are at least 2 items (home + current page minimum).
 */
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const BASE_URL = 'https://sijamconsults.com';

  // Always prepend Home if not already first
  const fullItems: BreadcrumbItem[] =
    items[0]?.label === 'Home' ? items : [{ label: 'Home', href: '/' }, ...items];

  if (fullItems.length < 2) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: fullItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${BASE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  );
}
