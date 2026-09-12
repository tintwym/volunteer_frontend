'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  Database,
  Download,
  RotateCcw,
  AlertTriangle,
  HardDrive,
  CheckCircle2,
  FileSpreadsheet,
  Activity,
} from 'lucide-react';
import { OrganiserSystemSettings } from '../../types';

interface DataGovernanceModuleProps {
  settings: OrganiserSystemSettings;
  onExportAllData?: () => void;
  onResetAllData?: () => void;
}

export const DataGovernanceModule: React.FC<DataGovernanceModuleProps> = ({
  settings,
  onExportAllData,
  onResetAllData,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  return (
    <div id="module-data-governance" className="space-y-6">
      {/* Backup & Data Portability Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/50">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Data Portability & Platform Backups
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Generate encrypted snapshot archives of events, rosters, verified hours, and audit tickets.
              </p>
            </div>
          </div>
          <span className="self-start sm:self-center px-2.5 py-1 text-[11px] font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            Governance Module
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Platform JSON */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-indigo-600" />
                <p className="text-xs sm:text-sm font-bold text-slate-900">
                  Full Platform JSON Archive
                </p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Complete data package including all shifts, attendee rosters, communication threads, and configuration state.
              </p>
            </div>
            <button
              type="button"
              id="export-full-data-btn"
              onClick={onExportAllData}
              className="mt-2 w-full sm:w-auto self-start px-4 py-2 text-xs sm:text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-2xs"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>Export Full JSON Archive</span>
            </button>
          </div>

          {/* System Health Diagnostics */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between gap-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                <p className="text-xs sm:text-sm font-bold text-slate-900">
                  Storage & Diagnostics
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <p className="text-[10px] text-slate-400">Local Persistence</p>
                  <p className="font-bold text-slate-800">Healthy (Synced)</p>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <p className="text-[10px] text-slate-400">Database Engine</p>
                  <p className="font-bold text-slate-800">HTML5 Storage Engine</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>All module tables active and responding</span>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone Card */}
      <div className="bg-white p-6 rounded-2xl border border-rose-200 shadow-xs space-y-5">
        <div className="flex items-center gap-3 border-b border-rose-100 pb-4">
          <div className="p-2.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200/50">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-rose-900">
              Environment Reset & Purge Zone
            </h2>
            <p className="text-xs text-rose-700/80 mt-0.5">
              Permanently revert all local shifts, customized messages, and roster modifications.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-bold text-rose-950">
              Restore Factory Initial Mock Dataset
            </p>
            <p className="text-xs text-rose-800/80 leading-relaxed max-w-xl">
              This action clears all browser modifications across shifts, messages, attendance entries, and resets all configurations to original demonstration values.
            </p>
          </div>
          <button
            type="button"
            id="open-reset-modal-btn"
            onClick={() => setShowConfirmModal(true)}
            className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors flex items-center justify-center gap-2 shrink-0 shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div
          id="reset-confirm-modal-backdrop"
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            id="reset-confirm-modal"
            className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4 animate-in fade-in zoom-in-95"
          >
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-lg font-bold text-slate-900">
                Confirm Factory Data Reset?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Are you sure you want to reset all platform data? All customized shifts, rosters, logs, and modified settings will be permanently reverted to factory defaults.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                id="cancel-reset-modal-btn"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                id="confirm-reset-btn"
                onClick={() => {
                  setShowConfirmModal(false);
                  if (onResetAllData) {
                    onResetAllData();
                  }
                }}
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition-colors"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
