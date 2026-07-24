export default function DashboardSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="h-40 animate-pulse rounded-xl bg-slate-200"
        />
      ))}
    </div>
  );
}