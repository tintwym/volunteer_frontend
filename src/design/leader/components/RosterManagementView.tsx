'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertTriangle,
  FileDown,
  Mail,
  MoreVertical,
  Award,
  Phone,
  Calendar,
  X,
  Edit2,
  Check,
  Save,
  MessageSquare
} from 'lucide-react';
import { Volunteer, VolunteerStatus, BackgroundCheckStatus, Badge } from '../types';

interface RosterManagementViewProps {
  volunteers: Volunteer[];
  onVerifyHours: (volunteerId: string) => void;
  onBatchVerifyHours: () => void;
  onUpdateVolunteerStatus: (volunteerId: string, status: VolunteerStatus) => void;
  onUpdateBackgroundStatus: (volunteerId: string, status: BackgroundCheckStatus) => void;
  onAddVolunteer: (newVol: Omit<Volunteer, 'id'>) => void;
  onUpdateVolunteerNotes: (volunteerId: string, notes: string) => void;
  onOpenMessageWithVolunteer: (volunteerId: string) => void;
  onOpenRecognitionForVolunteer: (volunteer: Volunteer) => void;
  selectedVolunteerForDrawer?: Volunteer | null;
  onCloseDrawer?: () => void;
}

export const RosterManagementView: React.FC<RosterManagementViewProps> = ({
  volunteers,
  onVerifyHours,
  onBatchVerifyHours,
  onUpdateVolunteerStatus,
  onUpdateBackgroundStatus,
  onAddVolunteer,
  onUpdateVolunteerNotes,
  onOpenMessageWithVolunteer,
  onOpenRecognitionForVolunteer,
  selectedVolunteerForDrawer,
  onCloseDrawer
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | VolunteerStatus>('All');
  const [clearanceFilter, setClearanceFilter] = useState<'All' | BackgroundCheckStatus>('All');
  const [skillFilter, setSkillFilter] = useState<string>('All');
  const [activeVolunteerModal, setActiveVolunteerModal] = useState<Volunteer | null>(selectedVolunteerForDrawer || null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingNotes, setEditingNotes] = useState('');

  // Collect all unique skills
  const allSkills = Array.from(new Set(volunteers.flatMap(v => v.skills)));

  // Add Volunteer Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Volunteer' as 'Volunteer' | 'Team Lead' | 'Specialist' | 'New Recruit',
    status: 'On-boarding' as VolunteerStatus,
    skills: [] as string[],
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelationship: '',
    backgroundCheckStatus: 'Pending' as BackgroundCheckStatus,
    notes: ''
  });

  const filteredVolunteers = volunteers.filter(v => {
    const matchesSearch =
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || v.status === statusFilter;
    const matchesClearance = clearanceFilter === 'All' || v.backgroundCheckStatus === clearanceFilter;
    const matchesSkill = skillFilter === 'All' || v.skills.includes(skillFilter);
    return matchesSearch && matchesStatus && matchesClearance && matchesSkill;
  });

  const pendingHoursCount = volunteers.filter(v => v.pendingHours > 0).length;

  const handleOpenVolunteer = (vol: Volunteer) => {
    setActiveVolunteerModal(vol);
    setEditingNotes(vol.notes);
  };

  const handleSaveNotes = () => {
    if (activeVolunteerModal) {
      onUpdateVolunteerNotes(activeVolunteerModal.id, editingNotes);
      setActiveVolunteerModal({
        ...activeVolunteerModal,
        notes: editingNotes
      });
    }
  };

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Role', 'Status', 'Verified Hours', 'Pending Hours', 'Attendance Rate', 'Background Clearance', 'Skills'];
    const rows = volunteers.map(v => [
      `"${v.name}"`,
      `"${v.email}"`,
      `"${v.phone}"`,
      `"${v.role}"`,
      `"${v.status}"`,
      v.verifiedHours,
      v.pendingHours,
      `"${v.attendanceRate}%"`,
      `"${v.backgroundCheckStatus}"`,
      `"${v.skills.join('; ')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `volunteer_roster_leader_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    onAddVolunteer({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '(555) 000-0000',
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 90000000)}?w=150&auto=format&fit=crop&q=80`,
      role: formData.role,
      status: formData.status,
      totalHours: 0,
      verifiedHours: 0,
      pendingHours: 0,
      joinedDate: new Date().toISOString().slice(0, 10),
      skills: formData.skills.length > 0 ? formData.skills : ['Community Support'],
      emergencyContact: {
        name: formData.emergencyName || 'Emergency Contact',
        phone: formData.emergencyPhone || '(555) 999-0000',
        relationship: formData.emergencyRelationship || 'Family'
      },
      backgroundCheckStatus: formData.backgroundCheckStatus,
      badges: [],
      attendanceRate: 100,
      shiftsCompleted: 0,
      notes: formData.notes || 'Newly onboarded volunteer.'
    });

    setShowAddModal(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'Volunteer',
      status: 'On-boarding',
      skills: [],
      emergencyName: '',
      emergencyPhone: '',
      emergencyRelationship: '',
      backgroundCheckStatus: 'Pending',
      notes: ''
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header with Title and Administrative Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Roster Management</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              {volunteers.length} Enrolled
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Administrative control for credentials, volunteer hours verification, attendance records, and onboarding.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {pendingHoursCount > 0 && (
            <button
              onClick={onBatchVerifyHours}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 active:bg-amber-800 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Batch Verify ({pendingHoursCount}) Pending</span>
            </button>
          )}

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <FileDown className="w-4 h-4 text-slate-500" />
            <span>Export Roster CSV</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Volunteer</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, or skill (e.g. First Aid, Driver)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 focus:bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">Status: All</option>
              <option value="Active">Active</option>
              <option value="On-boarding">On-boarding</option>
              <option value="Inactive">Inactive</option>
              <option value="On Leave">On Leave</option>
            </select>

            {/* Clearance filter */}
            <select
              value={clearanceFilter}
              onChange={(e) => setClearanceFilter(e.target.value as any)}
              className="text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">Clearance: All</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Expired">Expired</option>
            </select>

            {/* Skill filter */}
            <select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">Skill: All ({allSkills.length})</option>
              {allSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Badges summary */}
        {(statusFilter !== 'All' || clearanceFilter !== 'All' || skillFilter !== 'All' || searchQuery) && (
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
            <span>Active filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                "{searchQuery}"
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
              </span>
            )}
            {statusFilter !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                Status: {statusFilter}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setStatusFilter('All')} />
              </span>
            )}
            {clearanceFilter !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                Clearance: {clearanceFilter}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setClearanceFilter('All')} />
              </span>
            )}
            {skillFilter !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                Skill: {skillFilter}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSkillFilter('All')} />
              </span>
            )}
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('All');
                setClearanceFilter('All');
                setSkillFilter('All');
              }}
              className="text-emerald-600 hover:underline ml-auto font-medium"
            >
              Reset All
            </button>
          </div>
        )}
      </div>

      {/* Roster Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Volunteer / Contact</th>
                <th className="py-3 px-4">Role & Status</th>
                <th className="py-3 px-4">Service Hours</th>
                <th className="py-3 px-4">Attendance</th>
                <th className="py-3 px-4">Clearance</th>
                <th className="py-3 px-4">Skills & Badges</th>
                <th className="py-3 px-4 text-right">Admin Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredVolunteers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No volunteers found matching current criteria.
                  </td>
                </tr>
              ) : (
                filteredVolunteers.map((vol) => (
                  <tr key={vol.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Volunteer Profile Info */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={vol.avatar}
                          alt={vol.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 shrink-0"
                        />
                        <div>
                          <button
                            onClick={() => handleOpenVolunteer(vol)}
                            className="font-bold text-slate-900 hover:text-emerald-600 text-left cursor-pointer"
                          >
                            {vol.name}
                          </button>
                          <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                            <span>{vol.email}</span>
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {vol.phone} • Joined {vol.joinedDate}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role & Status with Quick Leader Toggle */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <span className="font-semibold text-slate-800 block">
                          {vol.role}
                        </span>
                        <select
                          value={vol.status}
                          onChange={(e) => onUpdateVolunteerStatus(vol.id, e.target.value as VolunteerStatus)}
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border cursor-pointer ${
                            vol.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : vol.status === 'On-boarding'
                              ? 'bg-blue-50 text-blue-800 border-blue-200'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          <option value="Active">Active</option>
                          <option value="On-boarding">On-boarding</option>
                          <option value="Inactive">Inactive</option>
                          <option value="On Leave">On Leave</option>
                        </select>
                      </div>
                    </td>

                    {/* Service Hours & Leader Verification */}
                    <td className="py-3.5 px-4">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm font-bold text-slate-900">{vol.verifiedHours}</span>
                          <span className="text-[11px] text-slate-500">verified</span>
                        </div>
                        {vol.pendingHours > 0 ? (
                          <div className="mt-1 flex items-center gap-1.5">
                            <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                              +{vol.pendingHours} pending
                            </span>
                            <button
                              onClick={() => onVerifyHours(vol.id)}
                              className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 underline cursor-pointer"
                              title="Verify pending hours"
                            >
                              Verify
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-emerald-600 flex items-center gap-0.5 mt-0.5">
                            <Check className="w-3 h-3" /> All verified
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Attendance Reliability */}
                    <td className="py-3.5 px-4">
                      <div>
                        <div className="flex items-center gap-1.5 font-bold text-slate-800">
                          <span>{vol.attendanceRate}%</span>
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {vol.shiftsCompleted} shifts completed
                        </span>
                      </div>
                    </td>

                    {/* Background Clearance Status */}
                    <td className="py-3.5 px-4">
                      <select
                        value={vol.backgroundCheckStatus}
                        onChange={(e) => onUpdateBackgroundStatus(vol.id, e.target.value as BackgroundCheckStatus)}
                        className={`text-[11px] font-medium px-2 py-0.5 rounded-full border cursor-pointer ${
                          vol.backgroundCheckStatus === 'Approved'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : vol.backgroundCheckStatus === 'Pending'
                            ? 'bg-amber-50 text-amber-800 border-amber-300 animate-pulse'
                            : 'bg-rose-50 text-rose-800 border-rose-200'
                        }`}
                      >
                        <option value="Approved">Approved</option>
                        <option value="Pending">Pending Review</option>
                        <option value="Expired">Expired</option>
                      </select>
                    </td>

                    {/* Skills & Badges */}
                    <td className="py-3.5 px-4 max-w-[200px]">
                      <div className="flex flex-wrap gap-1">
                        {vol.skills.slice(0, 2).map(skill => (
                          <span key={skill} className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px]">
                            {skill}
                          </span>
                        ))}
                        {vol.skills.length > 2 && (
                          <span className="px-1 py-0.5 text-slate-400 text-[10px]">
                            +{vol.skills.length - 2} more
                          </span>
                        )}
                      </div>
                      {vol.badges.length > 0 && (
                        <div className="flex items-center gap-1 mt-1 text-[10px] text-amber-700 font-medium">
                          <Award className="w-3 h-3" />
                          <span>{vol.badges.length} badges awarded</span>
                        </div>
                      )}
                    </td>

                    {/* Administrative Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenVolunteer(vol)}
                          className="px-2.5 py-1 text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                          title="Open volunteer dossier"
                        >
                          Dossier
                        </button>
                        <button
                          onClick={() => onOpenMessageWithVolunteer(vol.id)}
                          className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                          title="Direct message volunteer"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onOpenRecognitionForVolunteer(vol)}
                          className="p-1.5 text-slate-500 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                          title="Issue certificate or letter"
                        >
                          <Award className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Volunteer Profile Dossier Modal / Drawer */}
      {activeVolunteerModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/70">
              <div className="flex items-center gap-4">
                <img
                  src={activeVolunteerModal.avatar}
                  alt={activeVolunteerModal.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900">{activeVolunteerModal.name}</h2>
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
                      {activeVolunteerModal.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {activeVolunteerModal.role} • Enrolled {activeVolunteerModal.joinedDate}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveVolunteerModal(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dossier Body */}
            <div className="p-6 space-y-6">
              {/* Hours Verification Quick Control */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Service Hours Summary
                  </span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-2xl font-bold text-slate-900">
                      {activeVolunteerModal.verifiedHours} hrs
                    </span>
                    <span className="text-xs text-slate-500">verified</span>
                    {activeVolunteerModal.pendingHours > 0 && (
                      <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                        {activeVolunteerModal.pendingHours} hrs pending approval
                      </span>
                    )}
                  </div>
                </div>

                {activeVolunteerModal.pendingHours > 0 ? (
                  <button
                    onClick={() => {
                      onVerifyHours(activeVolunteerModal.id);
                      setActiveVolunteerModal({
                        ...activeVolunteerModal,
                        verifiedHours: activeVolunteerModal.verifiedHours + activeVolunteerModal.pendingHours,
                        pendingHours: 0
                      });
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    Verify {activeVolunteerModal.pendingHours} Pending Hours
                  </button>
                ) : (
                  <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Hours Up to Date
                  </span>
                )}
              </div>

              {/* Contact and Emergency Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    Contact Information
                  </h3>
                  <div className="text-xs space-y-1 text-slate-600">
                    <div><strong className="text-slate-800">Email:</strong> {activeVolunteerModal.email}</div>
                    <div><strong className="text-slate-800">Phone:</strong> {activeVolunteerModal.phone}</div>
                    <div><strong className="text-slate-800">Attendance Reliability:</strong> {activeVolunteerModal.attendanceRate}%</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                    Emergency Contact
                  </h3>
                  <div className="text-xs space-y-1 text-slate-600">
                    <div><strong className="text-slate-800">Name:</strong> {activeVolunteerModal.emergencyContact.name} ({activeVolunteerModal.emergencyContact.relationship})</div>
                    <div><strong className="text-slate-800">Phone:</strong> {activeVolunteerModal.emergencyContact.phone}</div>
                    <div>
                      <strong className="text-slate-800">Background Clearance:</strong>{' '}
                      <span className={`font-semibold ${activeVolunteerModal.backgroundCheckStatus === 'Approved' ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {activeVolunteerModal.backgroundCheckStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills & Badges */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Qualified Skills & Badges
                </h3>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {activeVolunteerModal.skills.map(s => (
                    <span key={s} className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-medium">
                      {s}
                    </span>
                  ))}
                </div>

                {activeVolunteerModal.badges.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {activeVolunteerModal.badges.map(b => (
                      <div key={b.id} className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200 flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-700 shrink-0" />
                        <div className="min-w-0 text-xs">
                          <div className="font-bold text-amber-950 truncate">{b.name}</div>
                          <div className="text-[10px] text-amber-800">{b.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Coordinator Confidential Notes */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Leader Administrative Notes
                  </h3>
                  <button
                    onClick={handleSaveNotes}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Notes</span>
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  placeholder="Record supervisor observations, schedule constraints, leadership readiness, or background clearance notes..."
                  className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              {/* Quick Actions Footer */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-end gap-2.5">
                <button
                  onClick={() => {
                    onOpenMessageWithVolunteer(activeVolunteerModal.id);
                    setActiveVolunteerModal(null);
                  }}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Direct Message</span>
                </button>
                <button
                  onClick={() => {
                    onOpenRecognitionForVolunteer(activeVolunteerModal);
                    setActiveVolunteerModal(null);
                  }}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Award className="w-4 h-4" />
                  <span>Issue Service Certificate</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Volunteer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Enroll New Volunteer</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Administrative intake to assign coordinator role and schedule shifts.
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Lin"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. maya.lin@example.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Phone</label>
                  <input
                    type="text"
                    placeholder="(555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Assigned Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Volunteer">Volunteer</option>
                    <option value="Team Lead">Team Lead</option>
                    <option value="Specialist">Specialist</option>
                    <option value="New Recruit">New Recruit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Initial Skills (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Food Handling, First Aid, Driver, Youth Mentorship"
                  onChange={(e) => setFormData({
                    ...formData,
                    skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
                  Emergency Contact Details
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Contact Name"
                    value={formData.emergencyName}
                    onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                    className="p-2 bg-white border border-slate-200 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    value={formData.emergencyPhone}
                    onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                    className="p-2 bg-white border border-slate-200 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Relationship (e.g. Parent)"
                    value={formData.emergencyRelationship}
                    onChange={(e) => setFormData({ ...formData, emergencyRelationship: e.target.value })}
                    className="p-2 bg-white border border-slate-200 rounded-md"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 rounded-lg font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg font-semibold shadow-xs cursor-pointer"
                >
                  Enroll Volunteer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
