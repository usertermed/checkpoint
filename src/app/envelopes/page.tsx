'use client';

import { useFirestore } from '@/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { type MessageDocument } from '@/lib/types';
import { Envelope } from '@/components/envelope';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Loading from './loading';

export default function EnvelopesPage() {
  const db = useFirestore();
  const [messages, setMessages] = useState<MessageDocument[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const messagesData: MessageDocument[] = [];
        querySnapshot.forEach((doc) => {
          messagesData.push({ id: doc.id, ...doc.data() } as MessageDocument);
        });
        setMessages(messagesData);
        setIsLoading(false);
      },
      (error) => {
        console.error('Error fetching messages:', error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [db]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex-1">
      <main className="container mx-auto p-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-headline tracking-tight text-primary">
            envelopes
          </h1>
          <p className="mt-2 text-muted-foreground">
            messages from the past. click an envelope to read.
          </p>
        </div>

        {messages && messages.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4 mt-12">
            {messages.map((message, index) => (
              <Envelope key={message.id} message={message} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center mt-16">
            <p className="text-muted-foreground">
              no messages yet. be the first.
            </p>
            <Button asChild className="mt-4">
              <Link href="/">leave a message</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
