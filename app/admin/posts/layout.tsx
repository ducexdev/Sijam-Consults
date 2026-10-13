import type { Metadata } from 'next';
import { adminMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = adminMetadata('Blog Posts');

export { default } from './page';
