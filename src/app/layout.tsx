import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export const metadata: Metadata = {
  title: 'internet checkpoint',
  description: 'leave a message',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://kit.fontawesome.com/f08a128311.js" crossOrigin="anonymous"></script>
      </head>
      <body className={cn('min-h-screen font-body antialiased')}>
        <FirebaseClientProvider>
          <Header />
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
