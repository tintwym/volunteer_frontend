'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { 
  FolderOpen, 
  Search, 
  FileText, 
  Download, 
  Eye, 
  MapPin, 
  ShieldAlert, 
  BookMarked, 
  FileCheck, 
  Calendar, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { EventDocument, DocumentCategory } from '../types';

interface DocumentsViewProps {
  documents: EventDocument[];
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({ documents }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewDoc, setPreviewDoc] = useState<EventDocument | null>(null);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const categories = [
    'all',
    'Handbook',
    'Venue Map',
    'Emergency',
    'Shift Instructions',
    'Code of Conduct',
    'Safety'
  ];

  const filteredDocs = documents.filter(doc => {
    if (selectedCategory !== 'all' && doc.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        doc.title.toLowerCase().includes(q) ||
        doc.description.toLowerCase().includes(q) ||
        (doc.eventTitle && doc.eventTitle.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleDownload = (doc: EventDocument) => {
    setDownloadToast(`Downloading ${doc.title} (${doc.version})...`);
    setTimeout(() => {
      setDownloadToast(`Downloaded ${doc.title} successfully!`);
      setTimeout(() => setDownloadToast(null), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {downloadToast && (
        <div className="bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center justify-between text-xs font-semibold animate-fadeIn">
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-emerald-400" />
            <span>{downloadToast}</span>
          </div>
          <button onClick={() => setDownloadToast(null)} className="text-white/60 hover:text-white underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs tracking-wider uppercase mb-1">
              <FolderOpen className="w-4 h-4" />
              <span>Section 3.10 • Event Guidelines & Documentation</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Event Resources & Handbooks</h1>
            <p className="text-sm text-slate-600 mt-1">
              Official manuals, venue maps, safety instructions, and code of conduct policies for your assignments.
            </p>
          </div>

          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            {documents.length} Official Documents
          </span>
        </div>

        {/* Search & Category Filter */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search handbooks, maps, emergency rules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Files' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.length === 0 ? (
          <div className="col-span-3 bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500">
            <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="font-semibold text-slate-700">No documents found</p>
            <p className="text-xs text-slate-400 mt-1">Try clearing your search query or selecting "All Files".</p>
          </div>
        ) : (
          filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-300 shadow-xs flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    {doc.category}
                  </span>

                  <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {doc.version}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {doc.title}
                </h3>

                {doc.eventTitle && (
                  <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                    {doc.eventTitle}
                  </p>
                )}

                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {doc.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3">
                  <span>Updated: {doc.updatedDate}</span>
                  <span>{doc.fileSize} • {doc.fileType}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPreviewDoc(doc)}
                    className="w-full py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>

                  <button
                    onClick={() => handleDownload(doc)}
                    className="w-full py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[85vh] flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                      {previewDoc.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{previewDoc.version}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{previewDoc.title}</h3>
                </div>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Simulated document reader content */}
              <div className="mt-4 p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3 font-serif text-slate-800 text-xs leading-relaxed max-h-[50vh] overflow-y-auto">
                <div className="border-b border-slate-200 pb-2 text-[10px] font-sans font-semibold text-slate-400 uppercase tracking-wider flex justify-between">
                  <span>Official Document Extract</span>
                  <span>Last Certified: {previewDoc.updatedDate}</span>
                </div>
                <p className="font-sans text-xs text-slate-600 font-medium">
                  <strong>Overview:</strong> {previewDoc.description}
                </p>
                <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs leading-relaxed text-slate-700">
                  {previewDoc.contentPreview}
                </div>
                <p className="text-[11px] text-slate-500 font-sans">
                  This document is maintained under VolunteerHub document governance rules. For full print formatting and schematic attachments, please use the download button below.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Format: {previewDoc.fileType} ({previewDoc.fileSize})</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleDownload(previewDoc);
                    setPreviewDoc(null);
                  }}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Document</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
