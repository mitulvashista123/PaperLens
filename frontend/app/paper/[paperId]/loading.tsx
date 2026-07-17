import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-5xl p-10 space-y-6">
      <Skeleton className="h-12 w-72" />

      <Skeleton className="h-6 w-40" />

      <Skeleton className="h-40 w-full rounded-xl" />
      <Skeleton className="h-40 w-full rounded-xl" />
      <Skeleton className="h-40 w-full rounded-xl" />
    </main>
  );
}