import type { WidgetData } from "../App";
import BarChartWidget from "./widgets/BarChartWidget";
import PieChartWidget from "./widgets/PieChartWidget";
import LineChartWidget from "./widgets/LineChartWidget";
import AreaChartWidget from "./widgets/AreaChartWidget";
import StatCard from "./widgets/StatCard";
import TableWidget from "./widgets/TableWidget";
import ProgressWidget from "./widgets/ProgressWidget";
import ListWidget from "./widgets/ListWidget";

type WidgetProps = {
  widget: WidgetData;
  isSelected: boolean;
  onSelect: () => void;
};

export default function Widget({ widget, isSelected, onSelect }: WidgetProps) {
  const renderChart = () => {
    switch (widget.type) {
      case "bar":
        return <BarChartWidget data={widget.data} color={widget.color} />;
      case "pie":
        return <PieChartWidget data={widget.data} color={widget.color} />;
      case "line":
        return <LineChartWidget data={widget.data} color={widget.color} />;
      case "area":
        return <AreaChartWidget data={widget.data} color={widget.color} />;
      case "stat":
        return <StatCard data={widget.data} color={widget.color} />;
      case "table":
        return <TableWidget data={widget.data} color={widget.color} />;
      case "progress":
        return <ProgressWidget data={widget.data} color={widget.color} />;
      case "list":
        return <ListWidget data={widget.data} color={widget.color} />;
      default:
        return <div className="text-slate-400">Unknown widget type</div>;
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`bg-slate-800 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
        isSelected
          ? "ring-2 ring-blue-500 shadow-lg shadow-blue-500/20"
          : "hover:bg-slate-750 hover:shadow-md"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-slate-200 truncate">
          {widget.title}
        </h3>
        <span
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{ backgroundColor: widget.color }}
        />
      </div>
      <div className="h-40">{renderChart()}</div>
    </div>
  );
}
