import type { WidgetData } from "../App";
import Widget from "./Widget";
import type { Id } from "../../convex/_generated/dataModel";

type DashboardProps = {
  widgets: WidgetData[];
  selectedWidgetId: Id<"widgets"> | null;
  onSelectWidget: (id: Id<"widgets">) => void;
};

export default function Dashboard({ widgets, selectedWidgetId, onSelectWidget }: DashboardProps) {
  const visibleWidgets = widgets.filter((w) => w.visible);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {visibleWidgets.map((widget) => (
        <Widget
          key={widget._id}
          widget={widget}
          isSelected={selectedWidgetId === widget._id}
          onSelect={() => onSelectWidget(widget._id)}
        />
      ))}
      {visibleWidgets.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-slate-400">All widgets are hidden. Use the sidebar to show them.</p>
        </div>
      )}
    </div>
  );
}
