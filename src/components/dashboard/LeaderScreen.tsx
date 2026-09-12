"use client";

import { ScreenPanel } from "@/components/dashboard/ScreenPanel";

const copy: Record<
  string,
  { title: string; description: string; bullets: string[] }
> = {
  dashboard: {
    title: "Leader dashboard",
    description: "See your team readiness, upcoming shifts, and open field issues.",
    bullets: ["Team roster snapshot", "Today’s shifts", "Open incidents"],
  },
  "my-team": {
    title: "My team",
    description: "Manage the volunteers assigned to your leadership.",
    bullets: ["Contact details", "Skills matrix", "Availability"],
  },
  tasks: {
    title: "Task management",
    description: "Assign and track day-of tasks for your team.",
    bullets: ["Task boards", "Owners", "Completion status"],
  },
  attendance: {
    title: "Team attendance",
    description: "Check volunteers in and verify hours on site.",
    bullets: ["QR / manual check-in", "Late / no-show flags", "Hour verification"],
  },
  schedule: {
    title: "Shift schedule",
    description: "Coordinate coverage and swap requests for your shifts.",
    bullets: ["Coverage gaps", "Swap approvals", "Waitlist pulls"],
  },
  communication: {
    title: "Comms & relay",
    description: "Relay organizer broadcasts and keep your team informed.",
    bullets: ["Team channels", "Broadcast relay", "Urgent pings"],
  },
  incidents: {
    title: "Incident reporting",
    description: "File and escalate field incidents quickly.",
    bullets: ["Severity levels", "Photo notes", "Escalation path"],
  },
  training: {
    title: "Training readiness",
    description: "Track which teammates completed required training.",
    bullets: ["Completion %", "Expiring certs", "Quiz scores"],
  },
  requests: {
    title: "Support requests",
    description: "Handle operational requests from your volunteers.",
    bullets: ["Supplies", "Schedule changes", "Escalations"],
  },
  progress: {
    title: "Progress monitoring",
    description: "Watch team hours and milestone progress.",
    bullets: ["Hours toward goals", "Milestone alerts", "Reliability"],
  },
  feedback: {
    title: "Volunteer feedback",
    description: "Collect and review feedback after shifts.",
    bullets: ["Post-event surveys", "Sentiment notes", "Follow-ups"],
  },
  emails: {
    title: "Automated notifications",
    description: "Review reminder and notification sequences for your team.",
    bullets: ["Shift reminders", "No-show follow-ups", "Custom notes"],
  },
  recognition: {
    title: "Recognition & badges",
    description: "Nominate teammates for badges and milestones.",
    bullets: ["Nominations", "Milestone sharing", "Appreciation notes"],
  },
  settings: {
    title: "Portal settings",
    description: "Manage your leader notification and profile preferences.",
    bullets: ["Alert preferences", "Contact visibility", "Timezone"],
  },
};

export function LeaderScreen({ screen }: { screen: string }) {
  const content = copy[screen] ?? {
    title: screen,
    description: "Volunteer leader workspace module.",
    bullets: ["Role-gated for volunteer leaders"],
  };
  return <ScreenPanel {...content} role="Volunteer Leader" />;
}
