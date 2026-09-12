'use client';
// @ts-nocheck

import React from 'react';
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  UserCheck,
  CalendarDays,
  MessageSquareText,
  AlertTriangle,
  GraduationCap,
  HelpCircle,
  TrendingUp,
  Star,
  Mail,
  Award,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  HeartHandshake,
  Settings
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tabId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  openIncidentsCount: number;
  pendingRequestsCount: number;
  unreadMessagesCount: number;
  inProgressTasksCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  openIncidentsCount,
  pendingRequestsCount,
  unreadMessagesCount,
  inProgressTasksCount
}) => {
  const navSections = [
    {
      heading: 'Operations',
      items: [
        {
          id: 'dashboard',
          label: 'Leader Dashboard',
          icon: LayoutDashboard,
          badge: null
        },
        {
          id: 'my_team',
          label: 'My Team (20)',
          icon: Users,
          badge: 'Assigned',
          badgeColor: 'bg-emerald-100 text-emerald-800'
        },
        {
          id: 'tasks',
          label: 'Task Management',
          icon: CheckSquare,
          badge: inProgressTasksCount > 0 ? `${inProgressTasksCount} active` : null,
          badgeColor: 'bg-blue-100 text-blue-800'
        },
        {
          id: 'attendance',
          label: 'Team Attendance',
          icon: UserCheck,
          badge: '18 / 20',
          badgeColor: 'bg-emerald-100 text-emerald-800'
        },
        {
          id: 'schedule',
          label: 'Shift Schedule',
          icon: CalendarDays,
          badge: null
        },
        {
          id: 'communication',
          label: 'Comms & Relay',
          icon: MessageSquareText,
          badge: unreadMessagesCount > 0 ? `${unreadMessagesCount} new` : 'Broadcast',
          badgeColor: 'bg-amber-100 text-amber-800'
        }
      ]
    },
    {
      heading: 'Supervision & Safety',
      items: [
        {
          id: 'incidents',
          label: 'Incident Reporting',
          icon: AlertTriangle,
          badge: openIncidentsCount > 0 ? `${openIncidentsCount} open` : null,
          badgeColor: 'bg-rose-100 text-rose-800'
        },
        {
          id: 'training',
          label: 'Training Readiness',
          icon: GraduationCap,
          badge: '1 action',
          badgeColor: 'bg-amber-100 text-amber-800'
        },
        {
          id: 'requests',
          label: 'Support Requests',
          icon: HelpCircle,
          badge: pendingRequestsCount > 0 ? `${pendingRequestsCount} pending` : null,
          badgeColor: 'bg-amber-100 text-amber-800'
        },
        {
          id: 'progress',
          label: 'Progress Monitoring',
          icon: TrendingUp,
          badge: null
        },
        {
          id: 'feedback',
          label: 'Volunteer Feedback',
          icon: Star,
          badge: '7 dims',
          badgeColor: 'bg-purple-100 text-purple-800'
        }
      ]
    },
    {
      heading: 'Recognition & Automation',
      items: [
        {
          id: 'emails',
          label: 'Automated Notifications',
          icon: Mail,
          badge: null
        },
        {
          id: 'recognition',
          label: 'Recognition & Badges',
          icon: Award,
          badge: 'Certificates',
          badgeColor: 'bg-indigo-100 text-indigo-800'
        }
      ]
    },
    {
      heading: 'System & Admin',
      items: [
        {
          id: 'settings',
          label: 'Portal Settings',
          icon: Settings,
          badge: null
        }
      ]
    }
  ];

  return (
    <aside
      className={`relative bg-slate-900 text-slate-300 flex flex-col transition-all duration-300 ease-in-out select-none z-20 shrink-0 ${
        isCollapsed ? 'w-18' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800">
        {!isCollapsed ? (
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white shrink-0 font-bold shadow-xs">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div className="truncate">
              <span className="text-sm font-bold text-white tracking-wide block truncate">
                CAN Leader Portal
              </span>
              <span className="text-[10px] text-emerald-400 block font-medium">
                Team Alpha Supervisor
              </span>
            </div>
          </div>
        ) : (
          <div className="mx-auto">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold shadow-xs">
              <HeartHandshake className="w-5 h-5" />
            </div>
          </div>
        )}

        {/* Collapse toggle button */}
        <button
          onClick={onToggleCollapse}
          className={`p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer ${
            isCollapsed ? 'mx-auto mt-2' : ''
          }`}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Navigation with Sections */}
      <nav className="flex-1 px-3 py-3 space-y-4 overflow-y-auto">
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            {!isCollapsed && (
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 pb-1">
                {section.heading}
              </div>
            )}

            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white font-semibold shadow-xs shadow-emerald-950/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  } ${isCollapsed ? 'justify-center px-2' : ''}`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />

                  {!isCollapsed && (
                    <div className="flex-1 text-left flex items-center justify-between min-w-0">
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full shrink-0 ml-1.5 ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : item.badgeColor || 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Leader Admin Status Box */}
      {!isCollapsed ? (
        <div className="p-3 m-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-[11px]">Role: Volunteer Leader</span>
          </div>
          <p className="text-slate-400 text-[10px] leading-relaxed">
            Supervising <strong>Team Alpha</strong> (Registration & Welcome). Operational supervisor between Organiser and Volunteers.
          </p>
        </div>
      ) : (
        <div className="p-2 text-center text-emerald-400 text-xs mb-2" title="Volunteer Leader Scope">
          <ShieldCheck className="w-4 h-4 mx-auto" />
        </div>
      )}
    </aside>
  );
};
