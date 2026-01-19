import { useState, useEffect } from "react";

const ADJECTIVES = [
  "Shadow", "Crimson", "Azure", "Golden", "Silver", "Mystic", "Phantom",
  "Thunder", "Cosmic", "Emerald", "Obsidian", "Radiant", "Void", "Storm",
  "Lunar", "Solar", "Frost", "Blaze", "Neon", "Crystal"
];

const CREATURES = [
  "Phoenix", "Dragon", "Wolf", "Raven", "Serpent", "Griffin", "Titan",
  "Specter", "Falcon", "Panther", "Viper", "Sphinx", "Kraken", "Chimera",
  "Valkyrie", "Ronin", "Ninja", "Samurai", "Knight", "Wizard"
];

const COLORS = [
  "#ef4444", "#f97316", "#f59e0b", "#84cc16", "#10b981",
  "#06b6d4", "#3b82f6", "#6366f1", "#8b5cf6", "#ec4899"
];

// Map timezones to friendly location names
const TIMEZONE_LOCATIONS: Record<string, string> = {
  "America/New_York": "New York",
  "America/Chicago": "Chicago",
  "America/Denver": "Denver",
  "America/Los_Angeles": "Los Angeles",
  "America/Toronto": "Toronto",
  "America/Vancouver": "Vancouver",
  "America/Mexico_City": "Mexico City",
  "America/Sao_Paulo": "São Paulo",
  "America/Buenos_Aires": "Buenos Aires",
  "Europe/London": "London",
  "Europe/Paris": "Paris",
  "Europe/Berlin": "Berlin",
  "Europe/Madrid": "Madrid",
  "Europe/Rome": "Rome",
  "Europe/Amsterdam": "Amsterdam",
  "Europe/Moscow": "Moscow",
  "Europe/Istanbul": "Istanbul",
  "Asia/Dubai": "Dubai",
  "Asia/Mumbai": "Mumbai",
  "Asia/Kolkata": "India",
  "Asia/Bangkok": "Bangkok",
  "Asia/Singapore": "Singapore",
  "Asia/Hong_Kong": "Hong Kong",
  "Asia/Shanghai": "Shanghai",
  "Asia/Tokyo": "Tokyo",
  "Asia/Seoul": "Seoul",
  "Australia/Sydney": "Sydney",
  "Australia/Melbourne": "Melbourne",
  "Pacific/Auckland": "Auckland",
  "Africa/Lagos": "Lagos",
  "Africa/Cairo": "Cairo",
  "Africa/Johannesburg": "Johannesburg",
};

function getLocation(): string {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Direct match
    if (TIMEZONE_LOCATIONS[timezone]) {
      return TIMEZONE_LOCATIONS[timezone];
    }

    // Try to extract city from timezone (e.g., "America/New_York" -> "New York")
    const parts = timezone.split("/");
    if (parts.length >= 2) {
      const city = parts[parts.length - 1].replace(/_/g, " ");
      return city;
    }

    return "Unknown Realm";
  } catch {
    return "Unknown Realm";
  }
}

function generateDramaticName(): string {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const creature = CREATURES[Math.floor(Math.random() * CREATURES.length)];
  return `${adjective} ${creature}`;
}

export type UserIdentity = {
  name: string;
  location: string;
  color: string;
  fullTitle: string;
};

export function useUserIdentity(): UserIdentity {
  const [identity, setIdentity] = useState<UserIdentity>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dashboard-user-identity-v2");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // Fall through to generate new identity
        }
      }
    }
    return { name: "", location: "", color: "", fullTitle: "" };
  });

  useEffect(() => {
    if (!identity.name || !identity.color) {
      const name = generateDramaticName();
      const location = getLocation();
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const newIdentity = {
        name,
        location,
        color,
        fullTitle: `${name} from ${location}`,
      };
      setIdentity(newIdentity);
      localStorage.setItem("dashboard-user-identity-v2", JSON.stringify(newIdentity));
    }
  }, [identity]);

  // Allow regenerating identity
  return identity;
}

export function regenerateIdentity(): void {
  localStorage.removeItem("dashboard-user-identity-v2");
  window.location.reload();
}
