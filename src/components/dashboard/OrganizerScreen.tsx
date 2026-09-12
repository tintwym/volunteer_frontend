"use client";

import { InviteMemberForm } from "@/components/dashboard/InviteMemberForm";
import { ScreenPanel } from "@/components/dashboard/ScreenPanel";

const copy: Record<
  string,
  { title: string; description: string; bullets: string[] }
> = {
  overview: {
    title: "Organizer dashboard",
    description:
      "Monitor events, staffing levels, pending approvals, and organization health.",
    bullets: [
      "Live event and shift occupancy",
      "Pending volunteer applications",
      "Open incidents and approvals",
    ],
  },
  events: {
    title: "Event management",
    description: "Create, publish, and staff volunteer events and positions.",
    bullets: ["Event drafts and publishing", "Capacity planning", "Leader assignment"],
  },
  volunteers: {
    title: "Volunteer roster",
    description: "Search, filter, and manage your organization volunteer database.",
    bullets: ["Status and skills filters", "Invite new volunteers", "Profile history"],
  },
  leaders: {
    title: "Leader hierarchy",
    description: "Assign volunteer leaders and define their team ownership.",
    bullets: ["Promote leaders", "Team capacity", "Coverage mapping"],
  },
  teams: {
    title: "Team management",
    description: "Group volunteers into operational teams for events and programs.",
    bullets: ["Team composition", "Skill coverage", "Leader ownership"],
  },
  tasks: {
    title: "Task management",
    description: "Assign and track operational tasks across events and teams.",
    bullets: ["Due dates", "Priority queues", "Completion tracking"],
  },
  scheduling: {
    title: "Schedule & shifts",
    description: "Build shift calendars and fill volunteer slots.",
    bullets: ["Shift templates", "Waitlists", "Conflict checks"],
  },
  attendance: {
    title: "Attendance audit",
    description: "Review check-ins, no-shows, and verified hours.",
    bullets: ["Check-in logs", "Hour verification", "Reliability trends"],
  },
  messaging: {
    title: "Live messaging",
    description: "Coordinate in real time with leaders and volunteers.",
    bullets: ["Channels by event/team", "Urgent alerts", "Read receipts"],
  },
  communication: {
    title: "Broadcast dispatch",
    description: "Send tiered announcements across your organization.",
    bullets: ["Audience targeting", "Priority levels", "Delivery history"],
  },
  automations: {
    title: "Email automations",
    description: "Configure reminders, confirmations, and follow-up sequences.",
    bullets: ["Reminder windows", "Template library", "Trigger rules"],
  },
  incidents: {
    title: "Incident management",
    description: "Track field incidents from report through resolution.",
    bullets: ["Severity triage", "Owner assignment", "Resolution notes"],
  },
  training: {
    title: "Training & documents",
    description: "Publish required training and event documents.",
    bullets: ["Completion tracking", "Document versions", "Quiz readiness"],
  },
  approvals: {
    title: "Approval center",
    description: "Approve applications, hours, and operational requests.",
    bullets: ["Queued decisions", "Bulk actions", "Audit trail"],
  },
  reports: {
    title: "Reports & analytics",
    description: "Measure hours, retention, and program impact.",
    bullets: ["Hour trends", "Top volunteers", "Exportable reports"],
  },
  recognition: {
    title: "Recognition & badges",
    description: "Award milestones, certificates, and appreciation letters.",
    bullets: ["Badge rules", "Letter templates", "Public milestones"],
  },
  roles: {
    title: "User & role access",
    description: "Invite leaders and volunteers; manage organization membership.",
    bullets: ["Invite by email", "Role assignment", "Access revocation"],
  },
  settings: {
    title: "Platform settings",
    description: "Configure organization profile, notifications, and preferences.",
    bullets: ["Org branding", "Notification defaults", "Security"],
  },
};

export function OrganizerScreen({ screen }: { screen: string }) {
  const content = copy[screen] ?? {
    title: screen,
    description: "Organizer workspace module.",
    bullets: ["Connected to CommonGround API", "Role-gated for organizers"],
  };
  return (
    <div>
      <ScreenPanel {...content} role="Organizer" />
      {screen === "roles" && (
        <div className="mx-auto mt-6 max-w-5xl">
          <InviteMemberForm />
        </div>
      )}
    </div>
  );
}
