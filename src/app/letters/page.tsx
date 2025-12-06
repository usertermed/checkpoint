'use client';

import { useFirestore, useMemoFirebase } from '@/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { type MessageDocument } from '@/lib/types';
import { Envelope } from '@/components/envelope';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Loading from './loading';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function LettersPage() {
  const db = useFirestore();
  const [messages, setMessages] = useState<MessageDocument[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const messagesQuery = useMemoFirebase(() => {
    if (!db) return null;
    // Query the public 'messages' collection
    return query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
  }, [db]);

  useEffect(() => {
    if (!messagesQuery) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const unsubscribe = onSnapshot(
      messagesQuery,
      (querySnapshot) => {
        const messagesData: MessageDocument[] = [];
        querySnapshot.forEach((doc) => {
          messagesData.push({ id: doc.id, ...doc.data() } as MessageDocument);
        });
        setMessages(messagesData);
        setIsLoading(false);
      },
      (error) => {
        const permissionError = new FirestorePermissionError({
          path: (messagesQuery as any).path,
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        console.error('Error fetching messages:', error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [messagesQuery]);

  return (
    <div className="flex-1">
      <audio autoPlay loop>
        <source src="https://github.com/usertermed/archives/raw/refs/heads/main/mp3/taia777.mp3" type="audio/mpeg"/>
      Your browser does not support the audio element.
      </audio>
      <main className="container mx-auto p-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-headline tracking-tight text-primary">
            letters
          </h1>
          <p className="mt-2 text-muted-foreground">
            messages from the past. click a letter to read.
          </p>
        </div>

        {isLoading ? (
          <Loading />
        ) : messages && messages.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-12">
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
