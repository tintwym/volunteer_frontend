"use client";

import { ScreenPanel } from "@/components/dashboard/ScreenPanel";

const copy: Record<
  string,
  { title: string; description: string; bullets: string[] }
> = {
  dashboard: {
    title: "Volunteer dashboard",
    description: "Your upcoming shifts, hours, and recognition at a glance.",
    bullets: ["Next shift", "Pending hours", "Recent badges"],
  },
  events: {
    title: "Event discovery",
    description: "Browse and apply to open volunteer opportunities.",
    bullets: ["Cause filters", "Location / remote", "Open spots"],
  },
  "my-events": {
    title: "My events",
    description: "Track applications and confirmed event participation.",
    bullets: ["Pending approvals", "Confirmed events", "Past events"],
  },
  schedule: {
    title: "My schedule",
    description: "See your confirmed shifts and availability.",
    bullets: ["Calendar view", "Reminders", "Swap requests"],
  },
  tasks: {
    title: "My tasks",
    description: "Complete assigned tasks for your events and team.",
    bullets: ["Due soon", "In progress", "Done"],
  },
  attendance: {
    title: "Attendance & check-in",
    description: "Check in to shifts and log service hours.",
    bullets: ["Check-in", "Check-out", "Hour submission"],
  },
  team: {
    title: "My team",
    description: "See teammates and your volunteer leader contacts.",
    bullets: ["Team roster", "Leader contact", "Shared docs"],
  },
  messages: {
    title: "Communication",
    description: "Stay in sync with leaders and organizers.",
    bullets: ["Event channels", "Direct messages", "Announcements"],
  },
  training: {
    title: "Training & quizzes",
    description: "Complete required onboarding and event training.",
    bullets: ["Required modules", "Quizzes", "Certificates"],
  },
  documents: {
    title: "Event documents",
    description: "Access waivers, guides, and shift materials.",
    bullets: ["Waivers", "Briefings", "Maps"],
  },
  requests: {
    title: "Volunteer requests",
    description: "Request schedule changes, support, or role updates.",
    bullets: ["New request", "Status tracking", "Responses"],
  },
  incidents: {
    title: "Incident reporting",
    description: "Report safety or operational issues during service.",
    bullets: ["Quick report", "Severity", "Follow-up"],
  },
  reports: {
    title: "Volunteer hours",
    description: "Review verified and pending service hours.",
    bullets: ["Hour ledger", "Exports", "Pending review"],
  },
  certificates: {
    title: "Certificates & letters",
    description: "Download certificates and appreciation letters.",
    bullets: ["Certificates", "Letters", "Share links"],
  },
  badges: {
    title: "Badges & milestones",
    description: "Celebrate milestones and share achievements.",
    bullets: ["Earned badges", "Next milestone", "Share"],
  },
  feedback: {
    title: "Submit feedback",
    description: "Share feedback about events and leadership support.",
    bullets: ["Event feedback", "Anonymous option", "Suggestions"],
  },
  profile: {
    title: "Volunteer profile",
    description: "Keep your skills, availability, and emergency contacts current.",
    bullets: ["Skills", "Availability", "Emergency contact"],
  },
  settings: {
    title: "System settings",
    description: "Manage notification preferences and account security.",
    bullets: ["Email / SMS", "Reminders", "Password"],
  },
};

export function VolunteerScreen({ screen }: { screen: string }) {
  const content = copy[screen] ?? {
    title: screen,
    description: "Volunteer workspace module.",
    bullets: ["Role-gated for volunteers"],
  };
  return <ScreenPanel {...content} role="Volunteer" />;
}
