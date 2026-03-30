import { Skeleton } from "@/components/ui/skeleton";

export default function PostCardSkeleton() {
  return (
    <div className="p-4 w-full md:w-1/4">
      <div className="rounded-xl border p-4 space-y-3">
        {/* Image */}
        <Skeleton className="h-40 w-full rounded-lg" />

        {/* Title */}
        <Skeleton className="h-4 w-3/4" />

        {/* Subtitle */}
        <Skeleton className="h-4 w-1/2" />

        {/* Button */}
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>
    </div>
  );
}
