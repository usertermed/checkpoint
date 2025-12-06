import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex-1">
      <main className="container mx-auto p-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-headline tracking-tight text-primary">
            letters
          </h1>
          <p className="mt-2 text-muted-foreground">
            retrieving messages from the ether...
          </p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4 mt-12">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="flex justify-center items-center aspect-square"
            >
              <Skeleton className="w-full h-full" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
