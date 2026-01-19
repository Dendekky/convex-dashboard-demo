import type { WidgetData } from "../App";

type SidebarProps = {
  selectedWidget: WidgetData | null;
  onUpdate: (updates: Partial<Omit<WidgetData, "_id" | "position" | "data">>) => void;
  onClose: () => void;
};

const WIDGET_TYPES = [
  { value: "bar", label: "Bar Chart" },
  { value: "pie", label: "Pie Chart" },
  { value: "line", label: "Line Chart" },
  { value: "area", label: "Area Chart" },
  { value: "stat", label: "Stat Card" },
  { value: "table", label: "Table" },
  { value: "progress", label: "Progress" },
  { value: "list", label: "List" },
];

const COLORS = [
  "#3b82f6", // blue
  "#10b981", // green
  "#8b5cf6", // purple
  "#f59e0b", // amber
  "#ef4444", // red
  "#06b6d4", // cyan
  "#ec4899", // pink
  "#84cc16", // lime
];

export default function Sidebar({ selectedWidget, onUpdate, onClose }: SidebarProps) {
  return (
    <aside className="w-72 bg-slate-800 border-r border-slate-700 p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Configuration</h2>
        {selectedWidget && (
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-sm"
          >
            Clear
          </button>
        )}
      </div>

      {selectedWidget ? (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={selectedWidget.title}
              onChange={(e) => onUpdate({ title: e.target.value })}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Chart Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {WIDGET_TYPES.map((type) => (
                <button
                  key={type.value}
                  onClick={() => onUpdate({ type: type.value })}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedWidget.type === type.value
                      ? "bg-blue-600 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Color
            </label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => onUpdate({ color })}
                  className={`w-8 h-8 rounded-full transition-transform ${
                    selectedWidget.color === color
                      ? "ring-2 ring-white ring-offset-2 ring-offset-slate-800 scale-110"
                      : "hover:scale-110"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedWidget.visible}
                onChange={(e) => onUpdate({ visible: e.target.checked })}
                className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-800"
              />
              <span className="text-sm font-medium text-slate-300">Visible</span>
            </label>
          </div>

          <div className="pt-4 border-t border-slate-700">
            <p className="text-xs text-slate-500">
              Widget ID: {selectedWidget._id}
            </p>
            <p className="text-xs text-slate-500">
              Position: {selectedWidget.position}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-slate-400 text-center text-sm">
            Click on a widget to configure it
          </p>
        </div>
      )}

      <div className="mt-auto pt-4 border-t border-slate-700">
        <div className="bg-slate-700/50 rounded-lg p-3">
          <p className="text-xs text-slate-400">
            Changes sync in realtime across all connected clients.
            Try opening this page in another tab!
          </p>
        </div>
      </div>
    </aside>
  );
}
