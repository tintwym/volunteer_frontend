'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  Users,
  Shield,
  ShieldCheck,
  Search,
  Filter,
  UserCheck,
  UserX,
  Edit2,
  CheckCircle2,
  XCircle,
  Lock,
  X,
  KeyRound,
  ShieldAlert,
} from 'lucide-react';

interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: 'Organiser' | 'Volunteer Leader' | 'Volunteer' | 'Participant';
  status: 'Active' | 'Suspended' | 'Pending';
  lastActive: string;
  avatar: string;
}

interface UserRoleManagementViewProps {
  onUpdateRole?: (userId: string, newRole: any) => void;
}

const INITIAL_USERS: UserAccount[] = [
  {
    id: 'usr-1',
    name: 'Elena Rostova',
    email: 'elena.rostova@hopeharbor.org',
    role: 'Organiser',
    status: 'Active',
    lastActive: 'Right now',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
  },
  {
    id: 'usr-2',
    name: 'Marcus Vance',
    email: 'marcus.v@hopeharbor.org',
    role: 'Volunteer Leader',
    status: 'Active',
    lastActive: '5 mins ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  },
  {
    id: 'usr-3',
    name: 'Sophia Chen',
    email: 'sophia.c@hopeharbor.org',
    role: 'Volunteer Leader',
    status: 'Active',
    lastActive: '12 mins ago',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
  },
  {
    id: 'usr-4',
    name: 'David Kim',
    email: 'david.k@gmail.com',
    role: 'Volunteer',
    status: 'Active',
    lastActive: '1 hour ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
  },
  {
    id: 'usr-5',
    name: 'Chloe Bennett',
    email: 'chloe.b@gmail.com',
    role: 'Volunteer',
    status: 'Active',
    lastActive: 'Yesterday',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  },
  {
    id: 'usr-6',
    name: 'Dr. Sarah Jenkins',
    email: 'dr.jenkins@hopeharbor.org',
    role: 'Volunteer Leader',
    status: 'Active',
    lastActive: '30 mins ago',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150',
  },
  {
    id: 'usr-7',
    name: 'Aisha Patel',
    email: 'aisha.p@techaid.org',
    role: 'Volunteer',
    status: 'Pending',
    lastActive: 'Never',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  },
];

export const UserRoleManagementView: React.FC<UserRoleManagementViewProps> = () => {
  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [editingUser, setEditingUser] = useState<UserAccount | null>(null);
  const [newRole, setNewRole] = useState<'Organiser' | 'Volunteer Leader' | 'Volunteer' | 'Participant'>('Volunteer');

  const filteredUsers = (users || []).filter((u) => {
    const matchesSearch =
      (u.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleRoleChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...u, role: newRole } : u))
      );
      setEditingUser(null);
    }
  };

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  return (
    <div id="user-role-management-view" className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">User Accounts & Role Permissions</h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
              RBAC Governance
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Control platform privileges: assign operational roles (Organiser, Volunteer Leader, Volunteer, Participant) and enforce security boundaries.
          </p>
        </div>
      </div>

      {/* Permissions Matrix Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
          <span>Role Permission Capabilities</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead>
              <tr className="border-b border-slate-200 font-bold text-[11px] uppercase tracking-wider text-slate-400">
                <th className="py-2 px-3">Role</th>
                <th className="py-2 px-3">Create Events</th>
                <th className="py-2 px-3">Appoint Leaders</th>
                <th className="py-2 px-3">Assign Shifts</th>
                <th className="py-2 px-3">Attendance Audit</th>
                <th className="py-2 px-3">Broadcast Alerts</th>
                <th className="py-2 px-3">Approve Claims</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-2 px-3 font-bold text-slate-900">Organiser</td>
                <td className="py-2 px-3 text-emerald-600 font-bold">Full</td>
                <td className="py-2 px-3 text-emerald-600 font-bold">Full</td>
                <td className="py-2 px-3 text-emerald-600 font-bold">Full</td>
                <td className="py-2 px-3 text-emerald-600 font-bold">Full</td>
                <td className="py-2 px-3 text-emerald-600 font-bold">Full (4 Tiers)</td>
                <td className="py-2 px-3 text-emerald-600 font-bold">Full</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-indigo-900">Volunteer Leader</td>
                <td className="py-2 px-3 text-slate-400">View Only</td>
                <td className="py-2 px-3 text-slate-400">No</td>
                <td className="py-2 px-3 text-emerald-600 font-bold">Team Level</td>
                <td className="py-2 px-3 text-emerald-600 font-bold">Check-in Only</td>
                <td className="py-2 px-3 text-emerald-600 font-bold">Squad Channel</td>
                <td className="py-2 px-3 text-slate-400">No</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-slate-700">Volunteer</td>
                <td className="py-2 px-3 text-slate-400">View Only</td>
                <td className="py-2 px-3 text-slate-400">No</td>
                <td className="py-2 px-3 text-slate-400">Request Swaps</td>
                <td className="py-2 px-3 text-slate-400">Self Clock-in</td>
                <td className="py-2 px-3 text-slate-400">Direct Only</td>
                <td className="py-2 px-3 text-slate-400">Submit Claims</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Users List & Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search accounts by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700"
        >
          <option value="All">All Roles</option>
          <option value="Organiser">Organiser</option>
          <option value="Volunteer Leader">Volunteer Leader</option>
          <option value="Volunteer">Volunteer</option>
          <option value="Participant">Participant</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Current Role</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Last Activity</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filteredUsers.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2.5">
                    <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                    <div>
                      <p className="font-bold text-slate-900">{u.name}</p>
                      <p className="text-[11px] text-slate-400">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      u.role === 'Organiser'
                        ? 'bg-amber-100 text-amber-900'
                        : u.role === 'Volunteer Leader'
                        ? 'bg-indigo-100 text-indigo-900'
                        : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      u.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : u.status === 'Suspended'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-500">{u.lastActive}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingUser(u);
                        setNewRole(u.role);
                      }}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-700 p-1 cursor-pointer"
                      title="Change user role"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleUserStatus(u.id)}
                      className="text-xs font-bold text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                      title={u.status === 'Active' ? 'Suspend user' : 'Reactivate user'}
                    >
                      {u.status === 'Active' ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Change Role Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Modify Role Assignment</h3>
              <button onClick={() => setEditingUser(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Change permissions and operational rank for <strong>{editingUser.name}</strong>:
            </p>

            <form onSubmit={handleRoleChangeSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-semibold"
                >
                  <option value="Organiser">Organiser (Full Platform Control)</option>
                  <option value="Volunteer Leader">Volunteer Leader (Squad Management)</option>
                  <option value="Volunteer">Volunteer (Operational Contributor)</option>
                  <option value="Participant">Participant (Guest / Attendee)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-3 py-2 font-bold text-slate-500 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl"
                >
                  Update Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
