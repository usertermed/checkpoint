import { MessageForm } from '@/components/message-form';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex-1">
      <main className="container mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] p-4">
        <div className="w-full max-w-2xl text-center">
          <h1 className="text-4xl font-headline tracking-tight sm:text-5xl md:text-6xl text-primary">
            internet checkpoint
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            leave a message
          </p>
        </div>
        <Card className="w-full max-w-lg mt-12">
          <CardContent className="pt-6">
            <MessageForm />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
