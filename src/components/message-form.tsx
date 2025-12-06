'use client';

import { useRouter } from 'next/navigation';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MessageSchema, type Message } from '@/lib/schemas';
import { createMessage } from '@/lib/actions';
import { useFirestore, useUser } from '@/firebase';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export function MessageForm() {
  const { toast } = useToast();
  const router = useRouter();
  const db = useFirestore();
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Message>({
    resolver: zodResolver(MessageSchema),
  });

  const onSubmit: SubmitHandler<Message> = async (data) => {
    if (!db) {
      toast({
        title: 'error sending message',
        description: 'database not available. please try again later.',
        variant: 'destructive',
      });
      return;
    }
    if (!user) {
      toast({
        title: 'error sending message',
        description: 'you must be signed in to send a message.',
        variant: 'destructive',
      });
      return;
    }
    try {
      await createMessage(db, user.uid, data);
      toast({
        title: 'message sent!',
        description: 'it will be waiting for you in the letters.',
      });
      router.push('/letters');
    } catch (e: any) {
      console.error(e);
      toast({
        title: 'error sending message',
        description: e.message || 'please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="message">your message</Label>
        <Textarea
          id="message"
          placeholder="dear future me..."
          className="min-h-[150px]"
          {...register('message')}
        />
        {errors.message && (
          <p className="text-sm font-medium text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting || !user} className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            sending...
          </>
        ) : (
          'send to the future'
        )}
      </Button>
    </form>
  );
}
