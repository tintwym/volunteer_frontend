export type NavItem = {
  id: string;
  label: string;
  href: string;
};

export type NavSection = {
  group: string;
  items: NavItem[];
};

export const organizerNav: NavSection[] = [
  {
    group: "Core Operations",
    items: [
      { id: "overview", label: "Dashboard", href: "/organizer" },
      { id: "events", label: "Event Management", href: "/organizer/events" },
      { id: "volunteers", label: "Volunteer Roster", href: "/organizer/volunteers" },
      { id: "leaders", label: "Leader Hierarchy", href: "/organizer/leaders" },
      { id: "teams", label: "Team Management", href: "/organizer/teams" },
      { id: "tasks", label: "Task Management", href: "/organizer/tasks" },
      { id: "scheduling", label: "Schedule & Shifts", href: "/organizer/scheduling" },
      { id: "attendance", label: "Attendance Audit", href: "/organizer/attendance" },
    ],
  },
  {
    group: "Communication & Safety",
    items: [
      { id: "messaging", label: "Live Messaging", href: "/organizer/messaging" },
      { id: "communication", label: "Broadcast Dispatch", href: "/organizer/communication" },
      { id: "automations", label: "Email Automations", href: "/organizer/automations" },
      { id: "incidents", label: "Incident Management", href: "/organizer/incidents" },
    ],
  },
  {
    group: "Governance & Impact",
    items: [
      { id: "training", label: "Training & Documents", href: "/organizer/training" },
      { id: "approvals", label: "Approval Center", href: "/organizer/approvals" },
      { id: "reports", label: "Reports & Analytics", href: "/organizer/reports" },
      { id: "recognition", label: "Recognition & Badges", href: "/organizer/recognition" },
      { id: "roles", label: "User & Role Access", href: "/organizer/roles" },
      { id: "settings", label: "Platform Settings", href: "/organizer/settings" },
    ],
  },
];

export const leaderNav: NavSection[] = [
  {
    group: "Team Operations",
    items: [
      { id: "dashboard", label: "Leader Dashboard", href: "/leader" },
      { id: "my-team", label: "My Team", href: "/leader/my-team" },
      { id: "tasks", label: "Task Management", href: "/leader/tasks" },
      { id: "attendance", label: "Team Attendance", href: "/leader/attendance" },
      { id: "schedule", label: "Shift Schedule", href: "/leader/schedule" },
      { id: "communication", label: "Comms & Relay", href: "/leader/communication" },
    ],
  },
  {
    group: "Field Support",
    items: [
      { id: "incidents", label: "Incident Reporting", href: "/leader/incidents" },
      { id: "training", label: "Training Readiness", href: "/leader/training" },
      { id: "requests", label: "Support Requests", href: "/leader/requests" },
      { id: "progress", label: "Progress Monitoring", href: "/leader/progress" },
      { id: "feedback", label: "Volunteer Feedback", href: "/leader/feedback" },
    ],
  },
  {
    group: "Engagement",
    items: [
      { id: "emails", label: "Automated Notifications", href: "/leader/emails" },
      { id: "recognition", label: "Recognition & Badges", href: "/leader/recognition" },
      { id: "settings", label: "Portal Settings", href: "/leader/settings" },
    ],
  },
];

export const volunteerNav: NavSection[] = [
  {
    group: "My Activity",
    items: [
      { id: "dashboard", label: "Dashboard Overview", href: "/volunteer" },
      { id: "events", label: "Event Discovery", href: "/volunteer/events" },
      { id: "my-events", label: "My Events", href: "/volunteer/my-events" },
      { id: "schedule", label: "My Schedule", href: "/volunteer/schedule" },
      { id: "tasks", label: "My Tasks", href: "/volunteer/tasks" },
      { id: "attendance", label: "Attendance & Check-in", href: "/volunteer/attendance" },
    ],
  },
  {
    group: "Collaboration",
    items: [
      { id: "team", label: "My Team", href: "/volunteer/team" },
      { id: "messages", label: "Communication", href: "/volunteer/messages" },
      { id: "training", label: "Training & Quizzes", href: "/volunteer/training" },
      { id: "documents", label: "Event Documents", href: "/volunteer/documents" },
      { id: "requests", label: "Volunteer Requests", href: "/volunteer/requests" },
      { id: "incidents", label: "Incident Reporting", href: "/volunteer/incidents" },
    ],
  },
  {
    group: "Impact",
    items: [
      { id: "reports", label: "Volunteer Hours", href: "/volunteer/reports" },
      { id: "certificates", label: "Certificates & Letters", href: "/volunteer/certificates" },
      { id: "badges", label: "Badges & Milestones", href: "/volunteer/badges" },
      { id: "feedback", label: "Submit Feedback", href: "/volunteer/feedback" },
      { id: "profile", label: "Volunteer Profile", href: "/volunteer/profile" },
      { id: "settings", label: "System Settings", href: "/volunteer/settings" },
    ],
  },
];
