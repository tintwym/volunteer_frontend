'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertTriangle,
  UserCheck,
  UserX,
  Phone,
  Mail,
  Award,
  BookOpen,
  Calendar,
  Layers,
  ClipboardList,
  Download,
  Eye,
  ShieldCheck,
  Star,
  X,
  UserPlus,
  RefreshCw,
} from 'lucide-react';
import { DetailedVolunteerProfile, VolunteerDatabaseStatus } from '../types';

interface VolunteerManagementViewProps {
  volunteers?: DetailedVolunteerProfile[];
  teams?: any[];
  onUpdateVolunteerStatus?: (volunteerId: string, status: VolunteerDatabaseStatus) => void;
  onUpdateStatus?: (volunteerId: string, status: any) => void;
  onReassignVolunteer?: (volunteerId: string, team: string, assignment: string) => void;
  onAssignTeam?: (volunteerId: string, teamId: string) => void;
}

export const VolunteerManagementView: React.FC<VolunteerManagementViewProps> = ({
  volunteers = [],
  teams = [],
  onUpdateVolunteerStatus,
  onUpdateStatus,
  onReassignVolunteer,
  onAssignTeam,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [teamFilter, setTeamFilter] = useState<string>('All');
  const [skillFilter, setSkillFilter] = useState<string>('All');
  const [trainingFilter, setTrainingFilter] = useState<string>('All');
  const [selectedVolunteer, setSelectedVolunteer] = useState<DetailedVolunteerProfile | null>(null);
  const [isReassignModalOpen, setIsReassignModalOpen] = useState(false);
  const [targetVolunteer, setTargetVolunteer] = useState<DetailedVolunteerProfile | null>(null);
  const [newTeam, setNewTeam] = useState('Logistics Team');
  const [newAssignment, setNewAssignment] = useState('Field Support Lead');

  const handleUpdateStatus = (volId: string, status: VolunteerDatabaseStatus) => {
    if (onUpdateVolunteerStatus) onUpdateVolunteerStatus(volId, status);
    else if (onUpdateStatus) onUpdateStatus(volId, status);
  };

  const handleReassign = (volId: string, team: string, assignment: string) => {
    if (onReassignVolunteer) onReassignVolunteer(volId, team, assignment);
    else if (onAssignTeam) onAssignTeam(volId, team);
  };

  // Filtered volunteers
  const filteredVolunteers = (volunteers || []).filter((vol) => {
    const matchesSearch =
      (vol.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (vol.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (vol.skills || []).some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (vol.currentAssignment || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || vol.status === statusFilter;
    const matchesTeam = teamFilter === 'All' || vol.currentTeam === teamFilter;
    const matchesSkill = skillFilter === 'All' || (vol.skills || []).includes(skillFilter);
    const matchesTraining =
      trainingFilter === 'All' ||
      (trainingFilter === 'Completed All'
        ? (vol.trainingCompleted || []).length >= 3
        : (vol.trainingCompleted || []).includes(trainingFilter));

    return matchesSearch && matchesStatus && matchesTeam && matchesSkill && matchesTraining;
  });

  const allSkills = Array.from(new Set(volunteers.flatMap((v) => v.skills)));
  const allTeams = ['Registration Team', 'Logistics Team', 'Crowd Management Team', 'First Aid Support Team'];

  const handleExportCSV = () => {
    const headers = 'ID,Name,Email,Phone,Status,Team,Assignment,AttendanceRate,FeedbackScore\n';
    const rows = filteredVolunteers
      .map(
        (v) =>
          `"${v.id}","${v.name}","${v.email}","${v.phone}","${v.status}","${v.currentTeam}","${v.currentAssignment}","${v.attendanceRate}%","${v.feedbackScore}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `volunteer_roster_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const openReassignModal = (vol: DetailedVolunteerProfile) => {
    setTargetVolunteer(vol);
    setNewTeam(vol.currentTeam);
    setNewAssignment(vol.currentAssignment);
    setIsReassignModalOpen(true);
  };

  const handleReassignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (targetVolunteer) {
      handleReassign(targetVolunteer.id, newTeam, newAssignment);
      setIsReassignModalOpen(false);
      if (selectedVolunteer && selectedVolunteer.id === targetVolunteer.id) {
        setSelectedVolunteer({
          ...selectedVolunteer,
          currentTeam: newTeam,
          currentAssignment: newAssignment,
        });
      }
    }
  };

  return (
    <div id="volunteer-management-view" className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Volunteer Management Directory</h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              250 Registered Volunteers
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Review complete profiles, verified skills, emergency contacts, attendance records, and assign volunteers to operational teams.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-300 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Multi-facet Filter and Search Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, assignment, or specific skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Suspended">Suspended</option>
              <option value="Rejected">Rejected</option>
            </select>

            {/* Team Filter */}
            <select
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700"
            >
              <option value="All">All Teams</option>
              {allTeams.map((tm) => (
                <option key={tm} value={tm}>
                  {tm}
                </option>
              ))}
            </select>

            {/* Skill Filter */}
            <select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 max-w-[150px]"
            >
              <option value="All">All Skills</option>
              {allSkills.map((sk) => (
                <option key={sk} value={sk}>
                  {sk}
                </option>
              ))}
            </select>

            {/* Training Status Filter */}
            <select
              value={trainingFilter}
              onChange={(e) => setTrainingFilter(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700"
            >
              <option value="All">All Training Status</option>
              <option value="Safety Training">Safety Training Certified</option>
              <option value="Emergency Procedure">Emergency Procedure</option>
              <option value="Completed All">Completed All Mandatory</option>
            </select>
          </div>
        </div>
      </div>

      {/* Volunteers Roster Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4">Volunteer</th>
                <th className="py-3.5 px-4">Team & Assignment</th>
                <th className="py-3.5 px-4">Verified Skills</th>
                <th className="py-3.5 px-4">Attendance</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredVolunteers.map((vol) => (
                <tr key={vol.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* Name & Contact */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={vol.avatar}
                        alt={vol.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <button
                          onClick={() => setSelectedVolunteer(vol)}
                          className="font-bold text-slate-900 hover:text-emerald-700 text-left transition-colors cursor-pointer"
                        >
                          {vol.name}
                        </button>
                        <p className="text-[11px] text-slate-400">{vol.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Team & Assignment */}
                  <td className="py-3 px-4">
                    <div className="space-y-0.5">
                      <span className="font-semibold text-slate-900">{vol.currentTeam}</span>
                      <p className="text-[11px] text-slate-500 truncate max-w-xs">{vol.currentAssignment}</p>
                    </div>
                  </td>

                  {/* Skills */}
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {vol.skills.slice(0, 2).map((sk) => (
                        <span key={sk} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                          {sk}
                        </span>
                      ))}
                      {vol.skills.length > 2 && (
                        <span className="text-[10px] text-slate-400 font-medium">+{vol.skills.length - 2}</span>
                      )}
                    </div>
                  </td>

                  {/* Attendance Rate */}
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-xs">
                        <span className={vol.attendanceRate >= 90 ? 'text-emerald-600' : 'text-amber-600'}>
                          {vol.attendanceRate}%
                        </span>
                        <span className="text-[10px] text-slate-400">({vol.previousParticipationCount} shifts)</span>
                      </div>
                      <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            vol.attendanceRate >= 90 ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${vol.attendanceRate}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 px-4">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        vol.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : vol.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : vol.status === 'Suspended'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {vol.status}
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedVolunteer(vol)}
                        title="View Full Profile Details"
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => openReassignModal(vol)}
                        title="Reassign Team / Task"
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-700 transition-colors cursor-pointer"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>

                      {vol.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleUpdateStatus(vol.id, 'Active')}
                            title="Approve Registration"
                            className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-600 transition-colors cursor-pointer"
                          >
                            <UserCheck className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(vol.id, 'Rejected')}
                            title="Reject Registration"
                            className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-600 transition-colors cursor-pointer"
                          >
                            <UserX className="w-4 h-4" />
                          </button>
                        </>
                      )}

                      {vol.status === 'Active' && (
                        <button
                          onClick={() => handleUpdateStatus(vol.id, 'Suspended')}
                          title="Suspend Volunteer"
                          className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500 transition-colors cursor-pointer"
                        >
                          <AlertTriangle className="w-4 h-4" />
                        </button>
                      )}

                      {vol.status === 'Suspended' && (
                        <button
                          onClick={() => handleUpdateStatus(vol.id, 'Active')}
                          title="Reactivate Volunteer"
                          className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-600 transition-colors cursor-pointer"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comprehensive Volunteer Profile Details Modal */}
      {selectedVolunteer && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <img
                  src={selectedVolunteer.avatar}
                  alt={selectedVolunteer.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900">{selectedVolunteer.name}</h2>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        selectedVolunteer.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {selectedVolunteer.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{selectedVolunteer.currentAssignment}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {selectedVolunteer.email}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {selectedVolunteer.phone}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedVolunteer(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              {/* Left Column: Skills, Languages, Availability */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                    Skills & Background Experience
                  </h4>
                  <p className="text-slate-600 leading-relaxed mb-2">{selectedVolunteer.experience}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedVolunteer.skills.map((s) => (
                      <span key={s} className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Languages
                    </span>
                    <p className="font-semibold text-slate-800">{selectedVolunteer.languages.join(', ')}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Availability
                    </span>
                    <p className="font-semibold text-slate-800">{selectedVolunteer.availability.join(', ')}</p>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="p-3.5 bg-rose-50/60 rounded-xl border border-rose-200 space-y-1">
                  <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider block">
                    Emergency Contact
                  </span>
                  <p className="font-bold text-slate-900 text-xs">{selectedVolunteer.emergencyContact}</p>
                </div>
              </div>

              {/* Right Column: Training, Certifications, Attendance History */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                    Completed Training & Certifications
                  </h4>
                  <div className="space-y-1.5">
                    {selectedVolunteer.trainingCompleted.map((t) => (
                      <div key={t} className="flex items-center gap-2 text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="font-medium">{t}</span>
                      </div>
                    ))}
                    {selectedVolunteer.certifications.map((c) => (
                      <div key={c} className="flex items-center gap-2 text-indigo-700">
                        <Award className="w-3.5 h-3.5 text-indigo-600" />
                        <span className="font-medium">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Attendance History */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="font-bold text-slate-900 uppercase tracking-wider">
                      Recent Attendance History
                    </h4>
                    <span className="font-bold text-emerald-700">{selectedVolunteer.attendanceRate}% Reliability</span>
                  </div>
                  <div className="space-y-2 max-h-36 overflow-y-auto">
                    {selectedVolunteer.attendanceHistory.map((rec, i) => (
                      <div key={i} className="p-2 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-800">{rec.eventName}</p>
                          <span className="text-[10px] text-slate-400">{rec.date} • {rec.hours} hrs</span>
                        </div>
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                            rec.status === 'Present'
                              ? 'bg-emerald-100 text-emerald-800'
                              : rec.status === 'Late'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {rec.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  openReassignModal(selectedVolunteer);
                }}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reassign Team & Task</span>
              </button>

              <button
                onClick={() => setSelectedVolunteer(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2 rounded-xl text-xs transition-all cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reassign Team / Assignment Modal */}
      {isReassignModalOpen && targetVolunteer && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Reassign Volunteer</h3>
              <button
                onClick={() => setIsReassignModalOpen(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Reassign <strong>{targetVolunteer.name}</strong> to an operational squad:
            </p>

            <form onSubmit={handleReassignSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Operational Team</label>
                <select
                  value={newTeam}
                  onChange={(e) => setNewTeam(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                >
                  {allTeams.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Role / Assignment Responsibility</label>
                <input
                  type="text"
                  required
                  value={newAssignment}
                  onChange={(e) => setNewAssignment(e.target.value)}
                  placeholder="e.g. Triage Coordinator, Pallet Handler"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsReassignModalOpen(false)}
                  className="px-3 py-2 font-bold text-slate-500 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl"
                >
                  Save Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
