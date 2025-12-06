import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Mail className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block">
              internet checkpoint
            </span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center space-x-2 justify-end">
          <Button asChild variant="ghost">
            <Link href="/">new message</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/letters">letters</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
