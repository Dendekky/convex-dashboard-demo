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
      <div className="flex gap-3 overflow-x-auto pb-1">
        {activities.map((activity) => {
          const initials = getInitials(activity.userName);
          return (
            <div
              key={activity._id}
              className="flex items-center gap-2 bg-slate-700/50 rounded-lg px-3 py-2 flex-shrink-0 max-w-md"
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{ backgroundColor: activity.userColor }}
              >
                {initials}
              </div>
              <div className="flex flex-col min-w-0">
                <span
                  className="text-sm font-semibold truncate"
                  style={{ color: activity.userColor }}
                >
                  {activity.userName}
                </span>
                <span className="text-xs text-slate-400">
                  {activity.action} on{" "}
                  <span className="text-slate-300 font-medium">
                    {activity.widgetTitle}
                  </span>
                </span>
              </div>
              <span className="text-xs text-slate-500 flex-shrink-0 ml-2">
                {formatTime(activity.timestamp)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getInitials(name: string): string {
  // Handle "Adjective Creature from Location" format
  const parts = name.split(" ");
  if (parts.length >= 2) {
    // Get first letter of first two words (the dramatic name part)
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.charAt(0).toUpperCase();
}

function formatTime(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}
