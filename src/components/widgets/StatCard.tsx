type StatCardProps = {
  data: { label: string; value: number }[];
  color: string;
};

export default function StatCard({ data, color }: StatCardProps) {
  const stat = data[0];
  if (!stat) return null;

  const formattedValue =
    stat.value >= 1000000
      ? `$${(stat.value / 1000000).toFixed(1)}M`
      : stat.value >= 1000
        ? `$${(stat.value / 1000).toFixed(0)}K`
        : `$${stat.value}`;

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div
        className="text-4xl font-bold mb-2"
        style={{ color }}
      >
        {formattedValue}
      </div>
      <div className="text-sm text-slate-400">{stat.label}</div>
      <div className="mt-3 flex items-center gap-1 text-green-400 text-sm">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
        <span>12.5%</span>
      </div>
    </div>
  );
}
