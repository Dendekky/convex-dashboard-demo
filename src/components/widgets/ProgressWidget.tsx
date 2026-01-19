type ProgressWidgetProps = {
  data: { label: string; value: number }[];
  color: string;
};

export default function ProgressWidget({ data, color }: ProgressWidgetProps) {
  const progress = data[0];
  if (!progress) return null;

  const percentage = Math.min(100, Math.max(0, progress.value));

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="56"
            cy="56"
            r="48"
            stroke="#334155"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="56"
            cy="56"
            r="48"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${percentage * 3.02} 302`}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{percentage}%</span>
        </div>
      </div>
      <div className="mt-2 text-sm text-slate-400">{progress.label}</div>
    </div>
  );
}
