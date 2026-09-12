'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  Mail,
  Phone,
  Layers,
  ClipboardList,
  MessageSquare,
  ShieldAlert,
  ChevronRight,
  UserCheck,
  UserX,
  X,
  Sparkles,
} from 'lucide-react';
import { VolunteerLeaderProfile } from '../types';

interface LeaderManagementViewProps {
  leaders?: VolunteerLeaderProfile[];
  teams?: any[];
  onAppointLeader?: (leader: VolunteerLeaderProfile) => void;
  onUpdateLeaderStatus?: (leaderId: string, status: 'Active' | 'Suspended') => void;
  onRemoveLeader?: (leaderId: string) => void;
}

export const LeaderManagementView: React.FC<LeaderManagementViewProps> = ({
  leaders = [],
  teams = [],
  onAppointLeader,
  onUpdateLeaderStatus,
  onRemoveLeader,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeader, setSelectedLeader] = useState<VolunteerLeaderProfile | null>(null);
  const [isAppointModalOpen, setIsAppointModalOpen] = useState(false);

  // Appoint modal state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('+1 (555) 000-1122');
  const [newRoleTitle, setNewRoleTitle] = useState('Logistics Area Coordinator');
  const [newTeamName, setNewTeamName] = useState('Logistics Team');
  const [newResponsibilities, setNewResponsibilities] = useState('Supervise dock receiving and warehouse shift staging.');
  const [newMaxVolunteers, setNewMaxVolunteers] = useState(25);

  const filteredLeaders = (leaders || []).filter(
    (l) =>
      (l.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.teamName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.roleTitle || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAppointSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLeaderProfile: VolunteerLeaderProfile = {
      id: `lead-${Date.now()}`,
      name: newName,
      email: newEmail,
      phone: newPhone,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      roleTitle: newRoleTitle,
      assignedEventId: 'evt-101',
      assignedEventName: 'Coastal Wildlife Restoration & Tidal Cleanup',
      teamId: `team-${Date.now()}`,
      teamName: newTeamName,
      responsibilities: newResponsibilities,
      maxVolunteers: Number(newMaxVolunteers),
      assignedVolunteersCount: 12,
      attendanceManagedRate: 95,
      tasksCompletedCount: 18,
      incidentsReportedCount: 0,
      messagesSentCount: 24,
      status: 'Active',
      volunteers: [
        { id: `vol-temp-1`, name: 'Liam O’Connor', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', role: 'Staffer', hours: 42 },
      ],
    };

    onAppointLeader(newLeaderProfile);
    setIsAppointModalOpen(false);
  };

  return (
    <div id="leader-management-view" className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Volunteer Leader Management</h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
              15 Appointed Leaders
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Appoint, supervise, and empower operational squad leaders across event locations. Maintain the operational hierarchy: <span className="font-semibold text-slate-700">Organiser → Volunteer Leader → Team → Volunteers</span>.
          </p>
        </div>

        <button
          onClick={() => setIsAppointModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Appoint Volunteer Leader</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leaders by name, role title, or operational squad..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900"
          />
        </div>
      </div>

      {/* Leader Cards Grid with Hierarchy Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredLeaders.map((leader) => (
          <div
            key={leader.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all p-5 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Leader Profile Row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={leader.avatar}
                    alt={leader.name}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-slate-900">{leader.name}</h3>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          leader.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {leader.status}
                      </span>
                    </div>
                    <p className="text-xs text-indigo-700 font-semibold">{leader.roleTitle}</p>
                    <p className="text-[11px] text-slate-500">{leader.teamName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {leader.status === 'Active' ? (
                    <button
                      onClick={() => onUpdateLeaderStatus(leader.id, 'Suspended')}
                      title="Suspend Leader"
                      className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500 text-xs font-semibold cursor-pointer"
                    >
                      <UserX className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onUpdateLeaderStatus(leader.id, 'Active')}
                      title="Reactivate Leader"
                      className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-600 text-xs font-semibold cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Responsibilities */}
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                <strong>Responsibilities:</strong> {leader.responsibilities}
              </p>

              {/* Monitored Performance Metrics */}
              <div className="grid grid-cols-4 gap-2 text-center pt-1">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Volunteers
                  </span>
                  <span className="font-black text-slate-900 text-sm">
                    {leader.assignedVolunteersCount} / {leader.maxVolunteers}
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Attendance
                  </span>
                  <span className="font-black text-emerald-600 text-sm">{leader.attendanceManagedRate}%</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Tasks Done
                  </span>
                  <span className="font-black text-blue-600 text-sm">{leader.tasksCompletedCount}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Incidents
                  </span>
                  <span className="font-black text-rose-600 text-sm">{leader.incidentsReportedCount}</span>
                </div>
              </div>

              {/* Hierarchy Tree (Leader -> Team -> Volunteers) */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Squad Volunteers ({leader.volunteers.length})</span>
                  </span>
                  <button
                    onClick={() => setSelectedLeader(leader)}
                    className="text-indigo-600 hover:text-indigo-700 cursor-pointer"
                  >
                    View Hierarchy
                  </button>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                  {leader.volunteers.map((vol) => (
                    <div
                      key={vol.id}
                      className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg shrink-0 text-[11px]"
                    >
                      <img src={vol.avatar} alt={vol.name} className="w-4 h-4 rounded-full object-cover" />
                      <span className="font-medium text-slate-800">{vol.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Contact: {leader.phone}</span>
              <button
                onClick={() => setSelectedLeader(leader)}
                className="font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
              >
                <span>Full Details & Hierarchy</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Leader Hierarchy Modal */}
      {selectedLeader && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-base text-slate-900">Operational Hierarchy Tree</h3>
              </div>
              <button
                onClick={() => setSelectedLeader(null)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-2">
              <div className="flex items-center gap-3">
                <img
                  src={selectedLeader.avatar}
                  alt={selectedLeader.name}
                  className="w-12 h-12 rounded-xl object-cover border border-indigo-200"
                />
                <div>
                  <h4 className="font-bold text-slate-900">{selectedLeader.name}</h4>
                  <p className="text-xs text-indigo-700 font-semibold">{selectedLeader.roleTitle}</p>
                  <p className="text-[11px] text-slate-500">Managing: {selectedLeader.teamName}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                Direct Volunteer Reports ({selectedLeader.volunteers.length})
              </h5>
              <div className="space-y-2 max-h-52 overflow-y-auto">
                {selectedLeader.volunteers.map((vol) => (
                  <div
                    key={vol.id}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={vol.avatar} alt={vol.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="font-bold text-slate-900">{vol.name}</p>
                        <p className="text-[11px] text-slate-400">{vol.role}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-emerald-700 text-[11px]">{vol.hours} total hours</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedLeader(null)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-xl transition-all"
            >
              Close Tree
            </button>
          </div>
        </div>
      )}

      {/* Appoint Leader Modal */}
      {isAppointModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Appoint New Volunteer Leader</h3>
              <button
                onClick={() => setIsAppointModalOpen(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAppointSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Leader Full Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Rachel Torres"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="e.g. rachel.t@hopeharbor.org"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  value={newRoleTitle}
                  onChange={(e) => setNewRoleTitle(e.target.value)}
                  placeholder="e.g. Field Triage Lead"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assigned Operational Team</label>
                <select
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                >
                  <option value="Registration Team">Registration Team</option>
                  <option value="Logistics Team">Logistics Team</option>
                  <option value="Crowd Management Team">Crowd Management Team</option>
                  <option value="First Aid Support Team">First Aid Support Team</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Supervision Responsibilities</label>
                <textarea
                  rows={2}
                  required
                  value={newResponsibilities}
                  onChange={(e) => setNewResponsibilities(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Max Volunteers Supervised</label>
                <input
                  type="number"
                  value={newMaxVolunteers}
                  onChange={(e) => setNewMaxVolunteers(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAppointModalOpen(false)}
                  className="px-3 py-2 font-bold text-slate-500 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl"
                >
                  Confirm Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
