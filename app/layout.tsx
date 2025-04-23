import { Providers } from './providers';
import Root from './Root';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Anime World',
  description: 'Discover and explore anime series from around the world',
  icons: {
    icon: '/zoro2.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen antialiased">
        <Providers>
          <Root>
            {children}
          </Root>
        </Providers>
      </body>
    </html>
  );
}
