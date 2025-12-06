'use client';

import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { type MessageDocument } from '@/lib/types';
import { format } from 'date-fns';
import placeholderImages from '@/lib/placeholder-images.json';
import { useMemo } from 'react';

type EnvelopeProps = {
  message: MessageDocument;
  index: number;
};

export function Envelope({ message, index }: EnvelopeProps) {
  const createdAtDate = new Date(
    message.createdAt.seconds * 1000 + message.createdAt.nanoseconds / 1000000
  );

  const envelopeImage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * placeholderImages.envelopes.length);
    return placeholderImages.envelopes[randomIndex];
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="group animate-fade-in focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
          style={{ animationDelay: `${index * 50}ms`, opacity: 0 }}
          aria-label="open message"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-muted transition-transform duration-300 group-hover:scale-105 group-focus:scale-105">
            <Image
              src={envelopeImage.src}
              alt={envelopeImage.alt}
              fill
              className="object-cover"
              data-ai-hint={envelopeImage.hint}
            />
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>a message from the past</DialogTitle>
          <DialogDescription>
            sent on {format(createdAtDate, 'ppp')}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 whitespace-pre-wrap break-words text-sm text-foreground/90 font-serif">
          {message.content}
        </div>
      </DialogContent>
    </Dialog>
  );
}
