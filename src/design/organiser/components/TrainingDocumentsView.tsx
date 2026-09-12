'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  FileText,
  Video,
  CheckCircle2,
  AlertCircle,
  Award,
  Download,
  ExternalLink,
  Users,
  Send,
  X,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { TrainingMaterial } from '../types';

interface TrainingDocumentsViewProps {
  materials?: TrainingMaterial[];
  volunteers?: any[];
  onAddMaterial?: (material: TrainingMaterial) => void;
  onSendReminder?: (materialId: string) => void;
}

export const TrainingDocumentsView: React.FC<TrainingDocumentsViewProps> = ({
  materials = [],
  volunteers = [],
  onAddMaterial,
  onSendReminder,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<TrainingMaterial | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Safety Training');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'document' | 'video' | 'guideline' | 'course'>('course');
  const [duration, setDuration] = useState('20 mins');
  const [isMandatory, setIsMandatory] = useState(true);
  const [url, setUrl] = useState('https://training.hopeharbor.org/module');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMat: TrainingMaterial = {
      id: `trn-${Date.now()}`,
      title,
      category,
      description,
      type,
      duration,
      isMandatory,
      completedCount: 0,
      totalAssigned: 250,
      url,
      modules: ['Module 1: Overview', 'Module 2: Practical Protocol', 'Module 3: Verification Quiz'],
    };

    if (onAddMaterial) onAddMaterial(newMat);
    setIsModalOpen(false);
  };

  return (
    <div id="training-documents-view" className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Training & Document Repository</h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {materials.length} Certified Courses
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Administer mandatory compliance courses (Safety Training, Event Orientation, Emergency Procedure), track volunteer completion, and issue certificates.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Training Material</span>
        </button>
      </div>

      {/* Materials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(materials || []).map((mat) => {
          const compPct = Math.round((mat.completedCount / (mat.totalAssigned || 1)) * 100);
          const pendingCount = mat.totalAssigned - mat.completedCount;

          return (
            <div
              key={mat.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                      {mat.type === 'video' ? (
                        <Video className="w-4 h-4" />
                      ) : mat.type === 'document' ? (
                        <FileText className="w-4 h-4" />
                      ) : (
                        <BookOpen className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                        {mat.category}
                      </span>
                      <h3 className="font-bold text-sm text-slate-900">{mat.title}</h3>
                    </div>
                  </div>

                  {mat.isMandatory && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 shrink-0">
                      Mandatory
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{mat.description}</p>

                {/* Sub-modules checklist */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Curriculum Units:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-700">
                    {(mat.modules || []).map((m, i) => (
                      <div key={i} className="flex items-center gap-1.5 p-1.5 bg-slate-50 rounded-lg border border-slate-100">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate text-[11px] font-medium">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Completion Progress Bar */}
                <div className="pt-2 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-600">Volunteer Completion</span>
                    <span className="text-slate-900">
                      <strong>{mat.completedCount}</strong> / {mat.totalAssigned} ({compPct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        compPct >= 90 ? 'bg-emerald-500' : 'bg-teal-500'
                      }`}
                      style={{ width: `${compPct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Duration: {mat.duration}</span>
                <div className="flex items-center gap-2">
                  {pendingCount > 0 && (
                    <button
                      onClick={() => onSendReminder(mat.id)}
                      className="text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Remind {pendingCount} Pending</span>
                    </button>
                  )}
                  <a
                    href={mat.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
                    title="Open Resource Link"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload Training Material Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Upload Training Resource</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Module Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Hazardous Weather & Flood Procedures"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  >
                    <option value="Safety Training">Safety Training</option>
                    <option value="Event Orientation">Event Orientation</option>
                    <option value="Emergency Procedure">Emergency Procedure</option>
                    <option value="Specialized Track">Specialized Track</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Resource Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  >
                    <option value="course">Interactive Course</option>
                    <option value="video">Video Lecture</option>
                    <option value="document">PDF Document</option>
                    <option value="guideline">Guideline SOP</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Est. Duration</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Resource URL</label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">Mandatory for Shift Eligibility</span>
                  <p className="text-[11px] text-slate-500">Volunteers must complete prior to clocking in.</p>
                </div>
                <input
                  type="checkbox"
                  checked={isMandatory}
                  onChange={(e) => setIsMandatory(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded-md"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-2 font-bold text-slate-500 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl"
                >
                  Publish Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
