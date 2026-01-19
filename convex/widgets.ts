import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getWidgets = query({
  args: {},
  handler: async (ctx) => {
    const widgets = await ctx.db.query("widgets").collect();
    return widgets.sort((a, b) => a.position - b.position);
  },
});

export const updateWidget = mutation({
  args: {
    id: v.id("widgets"),
    type: v.optional(v.string()),
    title: v.optional(v.string()),
    color: v.optional(v.string()),
    visible: v.optional(v.boolean()),
    userName: v.string(),
    userColor: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, userName, userColor, ...updates } = args;
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );

    // Get the widget to know its title
    const widget = await ctx.db.get(id);
    if (!widget) return;

    // Determine what changed for the activity log
    let action = "";
    if (updates.type !== undefined) {
      action = `changed chart type to ${updates.type}`;
    } else if (updates.title !== undefined) {
      action = `renamed widget to "${updates.title}"`;
    } else if (updates.color !== undefined) {
      action = `changed color`;
    } else if (updates.visible !== undefined) {
      action = updates.visible ? "showed widget" : "hid widget";
    }

    // Update the widget
    await ctx.db.patch(id, filteredUpdates);

    // Log the activity
    if (action) {
      await ctx.db.insert("activity", {
        userName,
        userColor,
        action,
        widgetTitle: updates.title ?? widget.title,
        timestamp: Date.now(),
      });

      // Keep only the last 20 activities
      const activities = await ctx.db.query("activity").collect();
      if (activities.length > 20) {
        const sorted = activities.sort((a, b) => a.timestamp - b.timestamp);
        const toDelete = sorted.slice(0, activities.length - 20);
        for (const activity of toDelete) {
          await ctx.db.delete(activity._id);
        }
      }
    }
  },
});

export const getActivity = query({
  args: {},
  handler: async (ctx) => {
    const activities = await ctx.db.query("activity").collect();
    return activities.sort((a, b) => b.timestamp - a.timestamp).slice(0, 10);
  },
});

export const seedWidgets = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if widgets already exist
    const existing = await ctx.db.query("widgets").first();
    if (existing) {
      return { message: "Widgets already seeded" };
    }

    const defaultWidgets = [
      {
        position: 1,
        type: "bar",
        title: "Monthly Revenue",
        color: "#3b82f6",
        visible: true,
        data: [
          { label: "Jan", value: 45000 },
          { label: "Feb", value: 52000 },
          { label: "Mar", value: 48000 },
          { label: "Apr", value: 61000 },
          { label: "May", value: 55000 },
          { label: "Jun", value: 67000 },
        ],
      },
      {
        position: 2,
        type: "pie",
        title: "Sales by Region",
        color: "#10b981",
        visible: true,
        data: [
          { label: "North", value: 35 },
          { label: "South", value: 25 },
          { label: "East", value: 22 },
          { label: "West", value: 18 },
        ],
      },
      {
        position: 3,
        type: "line",
        title: "Revenue Trend",
        color: "#8b5cf6",
        visible: true,
        data: [
          { label: "Q1", value: 145000 },
          { label: "Q2", value: 183000 },
          { label: "Q3", value: 198000 },
          { label: "Q4", value: 225000 },
        ],
      },
      {
        position: 4,
        type: "stat",
        title: "Total Revenue",
        color: "#f59e0b",
        visible: true,
        data: [{ label: "Total", value: 1247000 }],
      },
      {
        position: 5,
        type: "table",
        title: "Top Products",
        color: "#ef4444",
        visible: true,
        data: [
          { label: "Product A", value: 89000 },
          { label: "Product B", value: 67000 },
          { label: "Product C", value: 54000 },
          { label: "Product D", value: 43000 },
          { label: "Product E", value: 38000 },
        ],
      },
      {
        position: 6,
        type: "progress",
        title: "Quarterly Goal",
        color: "#06b6d4",
        visible: true,
        data: [{ label: "Progress", value: 78 }],
      },
      {
        position: 7,
        type: "area",
        title: "Daily Orders",
        color: "#ec4899",
        visible: true,
        data: [
          { label: "Mon", value: 120 },
          { label: "Tue", value: 145 },
          { label: "Wed", value: 132 },
          { label: "Thu", value: 167 },
          { label: "Fri", value: 189 },
          { label: "Sat", value: 156 },
          { label: "Sun", value: 98 },
        ],
      },
      {
        position: 8,
        type: "list",
        title: "Recent Sales",
        color: "#84cc16",
        visible: true,
        data: [
          { label: "Enterprise License", value: 12500 },
          { label: "Pro Subscription", value: 499 },
          { label: "Team Package", value: 1999 },
          { label: "Starter Plan", value: 99 },
          { label: "Add-on Module", value: 299 },
        ],
      },
    ];

    for (const widget of defaultWidgets) {
      await ctx.db.insert("widgets", widget);
    }

    return { message: "Widgets seeded successfully" };
  },
});
