import { Skeleton } from "@/components/ui/skeleton";

export default function HomeSkeleton() {
  return (
    <div className="h-screen w-full bg-black">
      {/* Header Skeleton */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-white/10">
        {/* Logo */}
        <Skeleton className="h-6 w-32 bg-white/20" />

        {/* Nav */}
        <div className="hidden md:flex gap-6">
          <Skeleton className="h-4 w-14 bg-white/20" />
          <Skeleton className="h-4 w-14 bg-white/20" />
          <Skeleton className="h-4 w-14 bg-white/20" />
          <Skeleton className="h-4 w-20 bg-white/20" />
        </div>

        {/* Icons */}
        <div className="flex gap-4">
          <Skeleton className="h-6 w-6 rounded-full bg-white/20" />
          <Skeleton className="h-6 w-6 rounded-full bg-white/20" />
          <Skeleton className="h-6 w-6 rounded-full bg-white/20" />
        </div>
      </header>

      {/* Hero Skeleton */}
      <section className="relative h-[calc(100vh-64px)]  flex flex-col justify-end pb-20">
        {/* Background shimmer */}
        <Skeleton className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10" />

        {/* Content */}
        <div className="relative z-10 text-center space-y-6">
          {/* Small category text */}
          <Skeleton className="h-4 w-40 mx-auto bg-white/20" />

          {/* Main heading */}
          <Skeleton className="h-12 w-[320px] md:w-[420px] mx-auto bg-white/30" />

          {/* Brand text */}
          <Skeleton className="h-8 w-[260px] md:w-[340px] mx-auto bg-white/20" />
        </div>
      </section>
    </div>
  );
}
