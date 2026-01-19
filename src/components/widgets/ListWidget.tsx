type ListWidgetProps = {
  data: { label: string; value: number }[];
  color: string;
};

export default function ListWidget({ data, color }: ListWidgetProps) {
  return (
    <div className="h-full overflow-auto space-y-2">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-2 bg-slate-700/30 rounded-lg"
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-sm text-slate-300 truncate">
              {item.label}
            </span>
          </div>
          <span
            className="text-sm font-medium"
            style={{ color }}
          >
            ${item.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
