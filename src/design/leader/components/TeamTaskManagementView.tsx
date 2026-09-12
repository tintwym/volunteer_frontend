'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  CheckSquare,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  User,
  Users,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  MessageSquare,
  AlertOctagon,
  X,
  FileText,
  MapPin,
  Check
} from 'lucide-react';
import { TeamTask, TaskStatus, TaskPriority, Volunteer } from '../types';

interface TeamTaskManagementViewProps {
  tasks: TeamTask[];
  volunteers: Volunteer[];
  onUpdateTaskStatus: (taskId: string, status: TaskStatus) => void;
  onAddTaskNote: (taskId: string, note: string) => void;
  onReportTaskIssue: (taskId: string, issue: string) => void;
  onEscalateTask: (taskId: string) => void;
  onAssignVolunteerSubRole: (taskId: string, volunteerId: string, volunteerName: string, subRole: string) => void;
  onRemoveAssignment: (taskId: string, volunteerId: string) => void;
  onAddNewTask: (task: Omit<TeamTask, 'id'>) => void;
}

export const TeamTaskManagementView: React.FC<TeamTaskManagementViewProps> = ({
  tasks,
  volunteers,
  onUpdateTaskStatus,
  onAddTaskNote,
  onReportTaskIssue,
  onEscalateTask,
  onAssignVolunteerSubRole,
  onRemoveAssignment,
  onAddNewTask
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'In Progress' | 'Completed' | 'Escalated'>('all');
  const [selectedTaskForDetail, setSelectedTaskForDetail] = useState<TeamTask | null>(null);

  // Modal State for New Task
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newLocation, setNewLocation] = useState('Main Entrance - Counter A');
  const [newPriority, setNewPriority] = useState<TaskPriority>('High');
  const [newDeadline, setNewDeadline] = useState('Today at 01:00 PM');
  const [newNotes, setNewNotes] = useState('');

  // Sub-assignment assignment in-drawer/card state
  const [assigningTaskId, setAssigningTaskId] = useState<string | null>(null);
  const [selectedVolunteerId, setSelectedVolunteerId] = useState(volunteers[0]?.id || '');
  const [subRoleInput, setSubRoleInput] = useState('Check-in Desk');

  // New Note or Issue input
  const [taskNoteInput, setTaskNoteInput] = useState('');
  const [issueInput, setIssueInput] = useState('');

  const filteredTasks = tasks.filter(t => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'Escalated') return t.isEscalated;
    return t.status === activeFilter;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    onAddNewTask({
      title: newTitle,
      description: newDesc,
      zone: 'Zone A - Lobby',
      location: newLocation,
      priority: newPriority,
      status: 'Todo',
      assignments: [],
      deadline: newDeadline,
      notes: newNotes,
      issuesReported: [],
      isEscalated: false
    });

    setShowCreateModal(false);
    setNewTitle('');
    setNewDesc('');
    setNewNotes('');
  };

  const handleAddSubAssignment = (taskId: string) => {
    const vol = volunteers.find(v => v.id === selectedVolunteerId);
    if (!vol || !subRoleInput.trim()) return;

    onAssignVolunteerSubRole(taskId, vol.id, vol.name, subRoleInput.trim());
    setAssigningTaskId(null);
    setSubRoleInput('Check-in Desk');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Team Task Management</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              Operational Execution
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Supervise team tasks, delegate specific sub-roles (Check-in, Registration, Queue Management), track execution, and escalate blocked workflows to Organiser.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter Pills */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-semibold">
            {(['all', 'In Progress', 'Completed', 'Escalated'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer capitalize ${
                  activeFilter === tab ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab} ({tab === 'all' ? tasks.length : tab === 'Escalated' ? tasks.filter(t => t.isEscalated).length : tasks.filter(t => t.status === tab).length})
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Create Task</span>
          </button>
        </div>
      </div>

      {/* Operational Hierarchy Guidance Box (Section 2.3 Example) */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-[11px]">
            LEADER DELEGATION PATTERN
          </div>
          <p className="text-slate-600">
            Leader supervises operational execution by breaking down parent tasks into volunteer sub-roles:
            <strong className="text-slate-800 ml-1">Volunteer A &rarr; Check-in | Volunteer B &rarr; Registration | Volunteer C &rarr; Queue Management</strong>
          </p>
        </div>
        <span className="text-[11px] font-semibold text-slate-400 shrink-0">Team Alpha Scope</span>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTasks.map((task) => {
          const isDone = task.status === 'Completed';

          return (
            <div
              key={task.id}
              className={`p-5 rounded-2xl border transition-all bg-white shadow-xs flex flex-col justify-between ${
                task.isEscalated
                  ? 'border-rose-300 ring-2 ring-rose-400/20 bg-rose-50/20'
                  : isDone
                  ? 'border-slate-200 opacity-85'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Header Info */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          task.priority === 'Urgent'
                            ? 'bg-rose-100 text-rose-800'
                            : task.priority === 'High'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {task.priority} Priority
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {task.location}
                      </span>
                      {task.isEscalated && (
                        <span className="text-[10px] font-bold bg-rose-600 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> ESCALATED TO ORGANISER
                        </span>
                      )}
                    </div>

                    <h2 className="text-sm font-bold text-slate-900 mt-2">{task.title}</h2>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{task.description}</p>
                  </div>

                  {/* Status Dropdown */}
                  <select
                    value={task.status}
                    onChange={(e) => onUpdateTaskStatus(task.id, e.target.value as TaskStatus)}
                    className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
                  >
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Review">Review</option>
                    <option value="Completed">Completed</option>
                    <option value="Escalated">Escalated</option>
                  </select>
                </div>

                {/* Sub-Role Delegations Container */}
                <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                      <Users className="w-3.5 h-3.5 text-blue-600" />
                      Assigned Volunteer Sub-Roles ({task.assignments?.length || 0})
                    </span>
                    <button
                      onClick={() => setAssigningTaskId(task.id)}
                      className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer flex items-center gap-0.5"
                    >
                      <Plus className="w-3 h-3" /> Assign Volunteer
                    </button>
                  </div>

                  {/* Assignments List */}
                  {(task.assignments?.length || 0) > 0 ? (
                    <div className="space-y-1.5 pt-1">
                      {task.assignments?.map((asg) => (
                        <div
                          key={asg.volunteerId}
                          className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 text-xs shadow-2xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{asg.volunteerName}</span>
                            <span className="text-slate-400">&rarr;</span>
                            <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 font-semibold text-[11px]">
                              {asg.subRole}
                            </span>
                          </div>
                          <button
                            onClick={() => onRemoveAssignment(task.id, asg.volunteerId)}
                            className="text-slate-400 hover:text-rose-600 p-0.5"
                            title="Remove delegation"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-[11px] text-slate-400 italic py-1">
                      No volunteers delegated yet. Click "+ Assign Volunteer" to delegate sub-roles.
                    </div>
                  )}

                  {/* Assign Form (Inline if active) */}
                  {assigningTaskId === task.id && (
                    <div className="pt-2 border-t border-slate-200 mt-2 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <select
                          value={selectedVolunteerId}
                          onChange={(e) => setSelectedVolunteerId(e.target.value)}
                          className="p-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                        >
                          {volunteers.map(v => (
                            <option key={v.id} value={v.id}>{v.name} ({v.role})</option>
                          ))}
                        </select>
                        <input
                          type="text"
                          placeholder="Sub-role: Check-in, Queue..."
                          value={subRoleInput}
                          onChange={(e) => setSubRoleInput(e.target.value)}
                          className="p-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div className="flex items-center justify-end gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => setAssigningTaskId(null)}
                          className="px-2.5 py-1 text-slate-500 hover:text-slate-700"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddSubAssignment(task.id)}
                          className="px-3 py-1 bg-emerald-600 text-white rounded-lg font-bold"
                        >
                          Confirm Delegation
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Notes & Reported Problems */}
                {task.notes && (
                  <div className="mt-3 text-xs text-slate-600 bg-amber-50/50 p-2.5 rounded-lg border border-amber-200/60">
                    <strong className="text-amber-900 font-semibold">Leader Note:</strong> {task.notes}
                  </div>
                )}

                {(task.issuesReported?.length || 0) > 0 && (
                  <div className="mt-2 space-y-1">
                    {task.issuesReported?.map((issue, idx) => (
                      <div key={idx} className="text-xs text-rose-700 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>{issue}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Target: {task.deadline}
                </span>

                <div className="flex items-center gap-2">
                  {!task.isEscalated && task.status !== 'Completed' && (
                    <button
                      onClick={() => onEscalateTask(task.id)}
                      className="px-2.5 py-1 text-[11px] font-bold text-rose-700 hover:bg-rose-50 rounded-lg border border-rose-200 transition-colors cursor-pointer"
                      title="Escalate incomplete task or blocker to Organiser"
                    >
                      Escalate to Organiser
                    </button>
                  )}

                  {task.status !== 'Completed' ? (
                    <button
                      onClick={() => onUpdateTaskStatus(task.id, 'Completed')}
                      className="px-3 py-1 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Mark Complete</span>
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Completed
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Task Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Create Operational Task</h3>
                <p className="text-xs text-slate-500 mt-0.5">Delegate execution to Team Alpha members</p>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Registration Counter C: Afternoon Wave"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Operational Instructions *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Operational details, queue lanes, equipment requirements..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Location / Zone</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as TaskPriority)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Deadline / Target Time</label>
                <input
                  type="text"
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  Deploy Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
