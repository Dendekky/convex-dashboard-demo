import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  widgets: defineTable({
    position: v.number(),
    type: v.string(),
    title: v.string(),
    color: v.string(),
    visible: v.boolean(),
    data: v.array(
      v.object({
        label: v.string(),
        value: v.number(),
      })
    ),
  }),
});
