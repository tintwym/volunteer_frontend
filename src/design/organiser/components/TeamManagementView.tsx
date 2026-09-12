'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Users,
  CheckCircle2,
  Clock,
  UserCheck,
  UserPlus,
  Trash2,
  Edit2,
  ArrowRightLeft,
  X,
  ShieldCheck,
} from 'lucide-react';
import { OperationalTeam } from '../types';

interface TeamManagementViewProps {
  teams?: OperationalTeam[];
  leaders?: any[];
  volunteers?: any[];
  onCreateTeam?: (team: OperationalTeam) => void;
  onUpdateTeam?: ((team: OperationalTeam) => void) | ((teamId: string, patch: Partial<OperationalTeam>) => void) | any;
  onDeleteTeam?: (teamId: string) => void;
}

export const TeamManagementView: React.FC<TeamManagementViewProps> = ({
  teams = [],
  leaders = [],
  volunteers = [],
  onCreateTeam,
  onUpdateTeam,
  onDeleteTeam,
}) => {
  const [selectedTeam, setSelectedTeam] = useState<OperationalTeam | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

  const dispatchUpdateTeam = (updated: OperationalTeam) => {
    if (onUpdateTeam) {
      try {
        onUpdateTeam(updated.id, updated);
      } catch (err) {
        onUpdateTeam(updated);
      }
    }
  };

  // Form states for Create Team
  const [teamName, setTeamName] = useState('');
  const [teamLeader, setTeamLeader] = useState('Sophia Chen');
  const [teamCapacity, setTeamCapacity] = useState(25);
  const [teamResponsibilities, setTeamResponsibilities] = useState('');

  // Add member modal
  const [memberName, setMemberName] = useState('');
  const [memberRole, setMemberRole] = useState('Field Specialist');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTeam: OperationalTeam = {
      id: `team-${Date.now()}`,
      name: teamName,
      eventId: 'evt-101',
      eventName: 'Coastal Wildlife Restoration',
      leaderId: `lead-${Date.now()}`,
      leaderName: teamLeader,
      leaderAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
      capacity: Number(teamCapacity),
      assignedCount: 4,
      responsibilities: teamResponsibilities,
      attendanceRate: 95,
      taskCompletionRate: 90,
      members: [
        { id: `mem-${Date.now()}-1`, name: teamLeader, role: 'Team Leader', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150', status: 'Present' },
      ],
    };

    onCreateTeam(newTeam);
    setIsCreateModalOpen(false);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTeam && memberName.trim()) {
      const updated: OperationalTeam = {
        ...selectedTeam,
        assignedCount: selectedTeam.assignedCount + 1,
        members: [
          ...(selectedTeam.members || []),
          {
            id: `mem-${Date.now()}`,
            name: memberName,
            role: memberRole,
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
            status: 'Present',
          },
        ],
      };
      dispatchUpdateTeam(updated);
      setSelectedTeam(updated);
      setIsAddMemberModalOpen(false);
      setMemberName('');
    }
  };

  const handleRemoveMember = (memberId: string) => {
    if (selectedTeam) {
      const updated: OperationalTeam = {
        ...selectedTeam,
        assignedCount: Math.max(0, selectedTeam.assignedCount - 1),
        members: (selectedTeam.members || []).filter((m) => m.id !== memberId),
      };
      dispatchUpdateTeam(updated);
      setSelectedTeam(updated);
    }
  };

  return (
    <div id="team-management-view" className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Team & Group Management</h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {teams.length} Active Operational Teams
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Organise volunteers into functional teams (Registration, Logistics, Crowd Management, First Aid), assign leaders, enforce headcount capacities, and monitor squad outputs.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create Operational Team</span>
        </button>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teams.map((team) => {
          const fillPercentage = Math.round((team.assignedCount / (team.capacity || 1)) * 100);

          return (
            <div
              key={team.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-slate-900">{team.name}</h3>
                      <p className="text-xs text-slate-500">{team.eventName}</p>
                    </div>
                  </div>

                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                    {team.assignedCount} / {team.capacity} members
                  </span>
                </div>

                {/* Leader Tag */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={team.leaderAvatar}
                      alt={team.leaderName}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Assigned Leader</span>
                      <strong className="text-slate-800">{team.leaderName}</strong>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Attendance</span>
                    <span className="font-bold text-emerald-600">{team.attendanceRate}%</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{team.responsibilities}</p>

                {/* Capacity Bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                    <span>Team Capacity</span>
                    <span>{fillPercentage}% Staffed</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        fillPercentage >= 100 ? 'bg-emerald-500' : 'bg-teal-500'
                      }`}
                      style={{ width: `${Math.min(100, fillPercentage)}%` }}
                    />
                  </div>
                </div>

                {/* Team Roster Avatars */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 mb-2">
                    <span>Team Members ({team.members.length})</span>
                    <button
                      onClick={() => {
                        setSelectedTeam(team);
                        setIsAddMemberModalOpen(true);
                      }}
                      className="text-emerald-700 hover:text-emerald-800 text-[11px] flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Member</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto py-1">
                    {team.members.map((mem) => (
                      <div
                        key={mem.id}
                        className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg text-xs shrink-0"
                      >
                        <img src={mem.avatar} alt={mem.name} className="w-5 h-5 rounded-full object-cover" />
                        <span className="font-medium text-slate-800">{mem.name}</span>
                        <button
                          onClick={() => {
                            setSelectedTeam(team);
                            handleRemoveMember(mem.id);
                          }}
                          className="text-slate-400 hover:text-rose-500 ml-1 cursor-pointer"
                          title="Remove from team"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Task Completion: <strong>{team.taskCompletionRate}%</strong></span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedTeam(team)}
                    className="font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
                  >
                    Manage Roster
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Manage Team Roster Modal */}
      {selectedTeam && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">{selectedTeam.name} Roster</h3>
              <button
                onClick={() => setSelectedTeam(null)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {selectedTeam.members.map((m) => (
                <div key={m.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-slate-900">{m.name}</p>
                      <p className="text-[11px] text-slate-400">{m.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {m.status}
                    </span>
                    <button
                      onClick={() => handleRemoveMember(m.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                      title="Remove volunteer from team"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setIsAddMemberModalOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Member</span>
              </button>
              <button
                onClick={() => setSelectedTeam(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2 rounded-xl"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {isAddMemberModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <h4 className="font-bold text-base text-slate-900">Add Member to Team</h4>
            <form onSubmit={handleAddMember} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Volunteer Name</label>
                <input
                  type="text"
                  required
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  placeholder="e.g. Jordan Miller"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Role / Duty</label>
                <input
                  type="text"
                  required
                  value={memberRole}
                  onChange={(e) => setMemberRole(e.target.value)}
                  placeholder="e.g. Gate Marshal, Hydration Runner"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddMemberModalOpen(false)}
                  className="px-3 py-2 font-bold text-slate-500 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl"
                >
                  Confirm Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Team Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Create Operational Team</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Team Name</label>
                <input
                  type="text"
                  required
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g. Hospitality & VIP Support"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Appointed Squad Leader</label>
                <select
                  value={teamLeader}
                  onChange={(e) => setTeamLeader(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                >
                  <option value="Sophia Chen">Sophia Chen</option>
                  <option value="Marcus Vance">Marcus Vance</option>
                  <option value="Mateo Gomez">Mateo Gomez</option>
                  <option value="Dr. Sarah Jenkins">Dr. Sarah Jenkins</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Volunteer Capacity</label>
                <input
                  type="number"
                  value={teamCapacity}
                  onChange={(e) => setTeamCapacity(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Team Responsibilities</label>
                <textarea
                  rows={3}
                  required
                  value={teamResponsibilities}
                  onChange={(e) => setTeamResponsibilities(e.target.value)}
                  placeholder="Detail daily tasks, staging points, and standards..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-3 py-2 font-bold text-slate-500 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl"
                >
                  Create Team
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
