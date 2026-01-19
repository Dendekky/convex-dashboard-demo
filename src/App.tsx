import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import type { Id } from "../convex/_generated/dataModel";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import ActivityFeed from "./components/ActivityFeed";
import { useUserIdentity, regenerateIdentity } from "./hooks/useUserIdentity";

export type WidgetData = {
  _id: Id<"widgets">;
  position: number;
  type: string;
  title: string;
  color: string;
  visible: boolean;
  data: { label: string; value: number }[];
};

function App() {
  const widgets = useQuery(api.widgets.getWidgets);
  const seedWidgets = useMutation(api.widgets.seedWidgets);
  const updateWidget = useMutation(api.widgets.updateWidget);
  const [selectedWidgetId, setSelectedWidgetId] = useState<Id<"widgets"> | null>(null);
  const user = useUserIdentity();

  const selectedWidget = widgets?.find((w) => w._id === selectedWidgetId) || null;

  const handleUpdateWidget = (updates: Partial<Omit<WidgetData, "_id" | "position" | "data">>) => {
    if (selectedWidgetId && user.name) {
      updateWidget({
        id: selectedWidgetId,
        userName: user.fullTitle,
        userColor: user.color,
        ...updates,
      });
    }
  };

  if (widgets === undefined) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (widgets.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-2xl mb-4">No widgets found</h1>
          <button
            onClick={() => seedWidgets()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Initialize Dashboard Widgets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white">
              Realtime Dashboard Demo
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Open this page in another tab to see realtime sync in action
            </p>
          </div>
          <div className="flex items-center gap-6">
            {user.fullTitle && (
              <div className="flex items-center gap-3 bg-slate-700/50 rounded-full pl-1 pr-4 py-1">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg"
                  style={{ backgroundColor: user.color }}
                >
                  {user.name.split(" ").map(w => w[0]).join("")}
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: user.color }}
                  >
                    {user.name}
                  </span>
                  <span className="text-xs text-slate-400">
                    from {user.location}
                  </span>
                </div>
                <button
                  onClick={regenerateIdentity}
                  className="ml-2 text-slate-500 hover:text-slate-300 transition-colors"
                  title="Get new identity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400">Live</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          selectedWidget={selectedWidget}
          onUpdate={handleUpdateWidget}
          onClose={() => setSelectedWidgetId(null)}
        />
        <main className="flex-1 p-6 overflow-auto">
          <Dashboard
            widgets={widgets as WidgetData[]}
            selectedWidgetId={selectedWidgetId}
            onSelectWidget={setSelectedWidgetId}
          />
        </main>
      </div>

      <ActivityFeed />
    </div>
  );
}

export default App;
