import type { Metadata } from 'next';
import { adminMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = adminMetadata('SEO Dashboard');

export { default } from './page';
