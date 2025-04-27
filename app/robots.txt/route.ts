import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse(`User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://otaku-realm.com/sitemap.xml
Host: https://otaku-realm.com`, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
} 