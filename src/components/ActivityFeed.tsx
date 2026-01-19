import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function ActivityFeed() {
  const activities = useQuery(api.widgets.getActivity);

  if (!activities || activities.length === 0) {
    return (
      <div className="bg-slate-800 border-t border-slate-700 px-6 py-3">
        <p className="text-slate-500 text-sm text-center">
          No recent activity. Make a change to see it appear here!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 border-t border-slate-700 px-6 py-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
          Live Activity
        </span>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-1">
        {activities.map((activity) => (
          <div
            key={activity._id}
            className="flex items-center gap-2 bg-slate-700/50 rounded-full px-3 py-1.5 flex-shrink-0"
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ backgroundColor: activity.userColor }}
            >
              {activity.userName.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm text-slate-300">
              <span className="font-medium" style={{ color: activity.userColor }}>
                {activity.userName}
              </span>{" "}
              {activity.action} on{" "}
              <span className="text-slate-200 font-medium">
                {activity.widgetTitle}
              </span>
            </span>
            <span className="text-xs text-slate-500">
              {formatTime(activity.timestamp)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatTime(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}
