'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  ClipboardList,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MapPin,
  Users,
  Calendar,
  X,
  Edit2,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { OperationalTask, TaskPriority, TaskStatus } from '../types';

interface TaskManagementViewProps {
  tasks?: OperationalTask[];
  teams?: any[];
  events?: any[];
  onCreateTask?: (task: OperationalTask) => void;
  onUpdateTaskStatus?: ((taskId: string, status: TaskStatus, progress?: number) => void) | any;
  onDeleteTask?: (taskId: string) => void;
}

export const TaskManagementView: React.FC<TaskManagementViewProps> = ({
  tasks = [],
  teams = [],
  events = [],
  onCreateTask,
  onUpdateTaskStatus,
  onDeleteTask,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<OperationalTask | null>(null);

  const handleUpdateStatus = (taskId: string, status: TaskStatus, progress?: number) => {
    if (onUpdateTaskStatus) {
      onUpdateTaskStatus(taskId, status, progress ?? (status === 'Completed' ? 100 : 50));
    }
  };

  // Form states
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formTeamName, setFormTeamName] = useState('Logistics Team');
  const [formLeaderName, setFormLeaderName] = useState('Marcus Vance');
  const [formLocation, setFormLocation] = useState('Warehouse Bay 3');
  const [formStartTime, setFormStartTime] = useState('09:00');
  const [formEndTime, setFormEndTime] = useState('13:00');
  const [formPriority, setFormPriority] = useState<TaskPriority>('High');
  const [formInstructions, setFormInstructions] = useState('Follow safety protocol guidelines.');
  const [formDueDate, setFormDueDate] = useState('Today, 14:00');

  const filteredTasks = (tasks || []).filter((t) => {
    const taskName = t.name || (t as any).title || '';
    const taskTeam = t.teamName || '';
    const taskLoc = t.location || '';
    const matchesSearch =
      taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      taskTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      taskLoc.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: OperationalTask = {
      id: `tsk-${Date.now()}`,
      name: formName,
      description: formDescription,
      teamId: 'team-log-1',
      teamName: formTeamName,
      assignedLeaderId: 'lead-2',
      assignedLeaderName: formLeaderName,
      assignedVolunteers: [
        { id: 'vol-101', name: formLeaderName, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
      ],
      location: formLocation,
      startTime: formStartTime,
      endTime: formEndTime,
      priority: formPriority,
      requiredSkills: ['General Operations'],
      instructions: formInstructions,
      status: 'Assigned',
      progress: 0,
      dueDate: formDueDate,
    };

    onCreateTask(newTask);
    setIsCreateModalOpen(false);
  };

  const getPriorityBadgeClass = (priority: TaskPriority) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'High':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Medium':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Low':
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div id="task-management-view" className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Operational Task Management</h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
              {tasks.length} Tracked Tasks
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Define specific operational activities, assign to squad leaders and volunteers, track priority levels, monitor progress percentage, and resolve bottlenecks.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create Task</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tasks by name, location, or team..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-900"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700"
          >
            <option value="All">All Statuses</option>
            <option value="Not Started">Not Started</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700"
          >
            <option value="All">All Priorities</option>
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${getPriorityBadgeClass(
                    task.priority
                  )}`}
                >
                  {task.priority} Priority
                </span>
                <h3 className="font-bold text-sm text-slate-900">{task.name}</h3>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-semibold text-slate-600">{task.teamName}</span>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">{task.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {task.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {task.startTime} - {task.endTime} ({task.dueDate})
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  Leader: <strong>{task.assignedLeaderName}</strong>
                </span>
              </div>
            </div>

            {/* Status & Progress Bar */}
            <div className="flex items-center gap-4 shrink-0 justify-between lg:justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100">
              <div className="w-32 space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                  <span>{task.progress}%</span>
                  <span className="text-slate-400 font-normal">{task.status}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      task.progress === 100
                        ? 'bg-emerald-500'
                        : task.priority === 'Urgent'
                        ? 'bg-rose-500'
                        : 'bg-blue-600'
                    }`}
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>

              {/* Status Switcher Select */}
              <select
                value={task.status}
                onChange={(e) => {
                  const newStatus = e.target.value as TaskStatus;
                  const newProg = newStatus === 'Completed' ? 100 : newStatus === 'In Progress' ? 50 : 0;
                  handleUpdateStatus(task.id, newStatus, newProg);
                }}
                className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800"
              >
                <option value="Not Started">Not Started</option>
                <option value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <button
                onClick={() => setSelectedTask(task)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                title="View task instructions"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Task Instructions Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">{selectedTask.name}</h3>
              <button
                onClick={() => setSelectedTask(null)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100">
                <span className="font-bold text-blue-900 block mb-1 uppercase tracking-wider text-[10px]">
                  Operational Instructions:
                </span>
                <p className="text-slate-700 leading-relaxed">{selectedTask.instructions}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="p-2.5 bg-slate-50 rounded-lg">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Team</span>
                  <span className="font-bold text-slate-800">{selectedTask.teamName}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Location</span>
                  <span className="font-bold text-slate-800">{selectedTask.location}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => {
                  onDeleteTask(selectedTask.id);
                  setSelectedTask(null);
                }}
                className="text-rose-600 hover:text-rose-700 font-bold text-xs flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Task</span>
              </button>
              <button
                onClick={() => setSelectedTask(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Create Operational Task</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Inspect Lot 4 Pedestrian Barricades"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Specific actionable goals..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Team</label>
                  <select
                    value={formTeamName}
                    onChange={(e) => setFormTeamName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  >
                    <option value="Registration Team">Registration Team</option>
                    <option value="Logistics Team">Logistics Team</option>
                    <option value="Crowd Management Team">Crowd Management Team</option>
                    <option value="First Aid Support Team">First Aid Support Team</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Priority</label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as TaskPriority)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  >
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Location / Post</label>
                <input
                  type="text"
                  required
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  placeholder="e.g. North Gate Pavilion"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Detailed Instructions</label>
                <textarea
                  rows={2}
                  value={formInstructions}
                  onChange={(e) => setFormInstructions(e.target.value)}
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
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
