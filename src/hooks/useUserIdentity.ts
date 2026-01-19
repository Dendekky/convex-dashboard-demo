import { useState, useEffect } from "react";

const NAMES = [
  "Alex", "Blake", "Casey", "Drew", "Ellis", "Finley", "Gray", "Harper",
  "Indigo", "Jamie", "Kelly", "Logan", "Morgan", "Nico", "Parker", "Quinn",
  "Riley", "Sam", "Taylor", "Val"
];

const COLORS = [
  "#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444",
  "#06b6d4", "#ec4899", "#84cc16", "#f97316", "#6366f1"
];

type UserIdentity = {
  name: string;
  color: string;
};

export function useUserIdentity(): UserIdentity {
  const [identity, setIdentity] = useState<UserIdentity>(() => {
    // Try to load from localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dashboard-user-identity");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // Fall through to generate new identity
        }
      }
    }
    return { name: "", color: "" };
  });

  useEffect(() => {
    // Generate identity if not already set
    if (!identity.name || !identity.color) {
      const newIdentity = {
        name: NAMES[Math.floor(Math.random() * NAMES.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
      setIdentity(newIdentity);
      localStorage.setItem("dashboard-user-identity", JSON.stringify(newIdentity));
    }
  }, [identity]);

  return identity;
}
