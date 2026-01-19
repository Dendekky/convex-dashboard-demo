import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

type PieChartWidgetProps = {
  data: { label: string; value: number }[];
  color: string;
};

const generateColors = (baseColor: string, count: number) => {
  const colors = [baseColor];
  for (let i = 1; i < count; i++) {
    const opacity = 1 - i * 0.15;
    colors.push(`${baseColor}${Math.round(opacity * 255).toString(16).padStart(2, "0")}`);
  }
  return colors;
};

export default function PieChartWidget({ data, color }: PieChartWidgetProps) {
  const colors = generateColors(color, data.length);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={35}
          outerRadius={55}
          paddingAngle={2}
          dataKey="value"
          nameKey="label"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "0.5rem",
            color: "#f1f5f9",
          }}
          formatter={(value, name) => [`${value}%`, String(name)]}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
