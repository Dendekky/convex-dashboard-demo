type TableWidgetProps = {
  data: { label: string; value: number }[];
  color: string;
};

export default function TableWidget({ data, color }: TableWidgetProps) {
  return (
    <div className="h-full overflow-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-400 border-b border-slate-700">
            <th className="pb-2 font-medium">Product</th>
            <th className="pb-2 font-medium text-right">Sales</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b border-slate-700/50">
              <td className="py-1.5 text-slate-300">{item.label}</td>
              <td
                className="py-1.5 text-right font-medium"
                style={{ color }}
              >
                ${item.value.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
