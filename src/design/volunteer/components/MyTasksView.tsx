'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { 
  CheckSquare, 
  Clock, 
  MapPin, 
  User, 
  AlertCircle, 
  CheckCircle2, 
  PlayCircle, 
  AlertTriangle,
  ArrowRight,
  Filter,
  Check
} from 'lucide-react';
import { VolunteerTask, TaskStatus } from '../types';

interface MyTasksViewProps {
  tasks: VolunteerTask[];
  onUpdateTaskStatus: (taskId: string, status: TaskStatus, progress?: number) => void;
  onReportTaskProblem: (taskId: string, problem: string) => void;
  onNavigateToLeaderChat?: (leaderName: string) => void;
}

export const MyTasksView: React.FC<MyTasksViewProps> = ({
  tasks,
  onUpdateTaskStatus,
  onReportTaskProblem,
  onNavigateToLeaderChat
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedTaskForProblem, setSelectedTaskForProblem] = useState<VolunteerTask | null>(null);
  const [problemText, setProblemText] = useState('');
  const [activeTabEvent, setActiveTabEvent] = useState<string>('all');

  const events = Array.from(new Set(tasks.map(t => t.eventTitle)));

  const filteredTasks = tasks.filter(task => {
    if (filterStatus !== 'all' && task.status !== filterStatus) return false;
    if (activeTabEvent !== 'all' && task.eventTitle !== activeTabEvent) return false;
    return true;
  });

  const handleStartTask = (taskId: string) => {
    onUpdateTaskStatus(taskId, 'In Progress', 30);
  };

  const handleAcceptTask = (taskId: string) => {
    onUpdateTaskStatus(taskId, 'Accepted', 10);
  };

  const handleCompleteTask = (taskId: string) => {
    onUpdateTaskStatus(taskId, 'Completed', 100);
  };

  const handleSubmitProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTaskForProblem || !problemText.trim()) return;
    onReportTaskProblem(selectedTaskForProblem.id, problemText);
    setSelectedTaskForProblem(null);
    setProblemText('');
  };

  const completedCount = tasks.filter(t => t.status === 'Completed').length;
  const inProgressCount = tasks.filter(t => t.status === 'In Progress').length;
  const pendingCount = tasks.filter(t => t.status === 'Assigned' || t.status === 'Accepted').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs tracking-wider uppercase mb-1">
              <CheckSquare className="w-4 h-4" />
              <span>Section 3.6 • Operational Task Assignment</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Assigned Tasks</h1>
            <p className="text-sm text-slate-600 mt-1">
              Direct operational tasks delegated to you by your Team Leader. Track progress from assignment to completion.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs">
              <span className="font-semibold text-slate-700">{completedCount}</span>
              <span className="text-slate-500">Completed</span>
            </div>
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-2 rounded-xl text-xs text-amber-800">
              <span className="font-semibold">{inProgressCount}</span>
              <span>In Progress</span>
            </div>
            <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 px-3 py-2 rounded-xl text-xs text-blue-800">
              <span className="font-semibold">{pendingCount}</span>
              <span>Pending</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Status:
            </span>
            {(['all', 'Assigned', 'Accepted', 'In Progress', 'Completed'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filterStatus === st
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st === 'all' ? 'All Tasks' : st}
              </button>
            ))}
          </div>

          {events.length > 1 && (
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className="font-medium text-slate-500">Event:</span>
              <select
                value={activeTabEvent}
                onChange={(e) => setActiveTabEvent(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="all">All Events</option>
                {events.map((ev) => (
                  <option key={ev} value={ev}>{ev}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Task Lifecycle Notice */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-emerald-900">
        <div className="flex items-center gap-2">
          <PlayCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Task Lifecycle:</strong> Assigned → Accepted → In Progress → Completed. Keep your Team Leader updated in real-time.
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-600 font-medium">
          <span>Need guidance?</span>
          <button 
            onClick={() => onNavigateToLeaderChat && onNavigateToLeaderChat('Marcus Reed')}
            className="text-emerald-700 underline font-semibold hover:text-emerald-800"
          >
            Message Team Leader
          </button>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTasks.length === 0 ? (
          <div className="col-span-2 bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500">
            <CheckSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="font-semibold text-slate-700">No tasks match your filter criteria</p>
            <p className="text-xs text-slate-400 mt-1">Try selecting "All Tasks" to view everything assigned to you.</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isCompleted = task.status === 'Completed';
            const isInProgress = task.status === 'In Progress';
            const isAssigned = task.status === 'Assigned';
            const isAccepted = task.status === 'Accepted';

            return (
              <div
                key={task.id}
                id={`task-card-${task.id}`}
                className={`bg-white rounded-2xl p-5 border transition-all ${
                  isCompleted 
                    ? 'border-slate-200 opacity-85 bg-slate-50/40' 
                    : isInProgress 
                    ? 'border-amber-300 shadow-sm ring-1 ring-amber-200' 
                    : 'border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                {/* Header tag and priority */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md truncate max-w-[200px]">
                    {task.eventTitle}
                  </span>
                  
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      task.priority === 'High' 
                        ? 'bg-red-50 text-red-700 border border-red-200' 
                        : task.priority === 'Medium'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {task.priority} Priority
                    </span>

                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      isCompleted 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : isInProgress 
                        ? 'bg-amber-100 text-amber-900 animate-pulse' 
                        : isAccepted 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {isCompleted && <CheckCircle2 className="w-3 h-3" />}
                      {isInProgress && <Clock className="w-3 h-3" />}
                      {task.status}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className={`text-base font-bold text-slate-900 ${isCompleted ? 'line-through text-slate-600' : ''}`}>
                  {task.title}
                </h3>

                {/* Instructions */}
                <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-slate-50/80 p-2.5 rounded-lg border border-slate-100">
                  <strong className="text-slate-700 block mb-0.5">Instructions:</strong>
                  {task.instructions}
                </p>

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{task.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Due: <strong>{task.deadline}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Assigned by: <strong>{task.assignedLeader}</strong> (Team Leader)</span>
                  </div>
                </div>

                {/* Problem reported notice if any */}
                {task.problemReported && (
                  <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">Problem Flagged to Leader:</span>
                      <p>{task.problemReported}</p>
                    </div>
                  </div>
                )}

                {/* Progress Bar & Slider */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                    <span>Task Progress</span>
                    <span className="font-bold text-slate-900">{task.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        isCompleted ? 'bg-emerald-600' : 'bg-amber-500'
                      }`}
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>

                  {!isCompleted && isInProgress && (
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="range"
                        min="10"
                        max="100"
                        step="10"
                        value={task.progress}
                        onChange={(e) => onUpdateTaskStatus(task.id, 'In Progress', parseInt(e.target.value))}
                        className="w-full accent-amber-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                      />
                    </div>
                  )}
                </div>

                {/* Action Buttons based on lifecycle */}
                <div className="mt-4 flex items-center justify-between gap-2 pt-2">
                  <button
                    onClick={() => {
                      setSelectedTaskForProblem(task);
                      setProblemText(task.problemReported || '');
                    }}
                    className="text-[11px] font-medium text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Report Issue</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {isAssigned && (
                      <button
                        onClick={() => handleAcceptTask(task.id)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Accept Task</span>
                      </button>
                    )}

                    {(isAssigned || isAccepted) && (
                      <button
                        onClick={() => handleStartTask(task.id)}
                        className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 shadow-xs"
                      >
                        <PlayCircle className="w-3.5 h-3.5" />
                        <span>Start Task</span>
                      </button>
                    )}

                    {isInProgress && (
                      <button
                        onClick={() => handleCompleteTask(task.id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 shadow-xs shadow-emerald-100"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark Completed</span>
                      </button>
                    )}

                    {isCompleted && (
                      <button
                        onClick={() => onUpdateTaskStatus(task.id, 'In Progress', 80)}
                        className="text-[11px] text-slate-500 hover:text-slate-800 underline"
                      >
                        Re-open Task
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Problem Modal */}
      {selectedTaskForProblem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center gap-2 text-red-700 font-bold text-base mb-1">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span>Report Task Problem to Leader</span>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              Flag an issue with <strong>{selectedTaskForProblem.title}</strong>. Your Team Leader will receive an immediate alert.
            </p>

            <form onSubmit={handleSubmitProblem} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Describe what is preventing completion:
                </label>
                <textarea
                  value={problemText}
                  onChange={(e) => setProblemText(e.target.value)}
                  placeholder="e.g. Missing extra wristband crates, tablet battery depleted, need physical assistance with heavy barrier..."
                  rows={3}
                  required
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedTaskForProblem(null)}
                  className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm shadow-red-200"
                >
                  Send Problem to Leader
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
