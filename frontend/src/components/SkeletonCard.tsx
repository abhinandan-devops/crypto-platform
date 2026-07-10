function SkeletonCard() {
  return (
    <div className="bg-slate-800 rounded-xl p-4 animate-pulse">

      <div className="flex items-center gap-4">

        <div className="w-12 h-12 rounded-full bg-slate-600" />

        <div className="flex-1">

          <div className="h-4 w-32 rounded bg-slate-600 mb-3" />

          <div className="h-3 w-20 rounded bg-slate-700" />

        </div>

      </div>

      <div className="mt-6 h-3 rounded bg-slate-700" />

    </div>
  );
}

export default SkeletonCard;