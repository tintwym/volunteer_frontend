'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  Award, 
  Sparkles, 
  Download, 
  HeartHandshake, 
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { DigitalBadge, VolunteerProfile } from '../types';

interface ShareMilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  badge: DigitalBadge | null;
  profile: VolunteerProfile;
}

export const ShareMilestoneModal: React.FC<ShareMilestoneModalProps> = ({
  isOpen,
  onClose,
  badge,
  profile
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !badge) return null;

  const shareText = `🎉 Proud to announce I've achieved the "${badge.title}" milestone on VolunteerHub with ${profile.totalHours} verified hours of community service!

From supporting local food distribution to ecological restoration, volunteering has been a deeply rewarding journey.

Check out my certified service transcript: https://volunteerhub.org/verify/CERT-2026-VOL-8921

#VolunteerImpact #CommunityService #CivicEngagement #VolunteerHub`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent('https://volunteerhub.org/verify/CERT-2026-VOL-8921');
    const text = encodeURIComponent(shareText);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`, '_blank');
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`🎉 Proud to achieve the "${badge.title}" milestone on @VolunteerHub with ${profile.totalHours} verified community service hours! #VolunteerImpact #CommunityService`);
    const url = encodeURIComponent('https://volunteerhub.org/verify/CERT-2026-VOL-8921');
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleShareFacebook = () => {
    const url = encodeURIComponent('https://volunteerhub.org/verify/CERT-2026-VOL-8921');
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Share Milestone to Social Media</h3>
              <p className="text-[11px] text-slate-500">Inspire your network with verified community service achievements</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs">
          {/* Milestone Visual Card Graphic Preview */}
          <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-emerald-950 p-6 rounded-2xl text-white text-center relative overflow-hidden shadow-lg border-2 border-amber-400/40">
            <div className="absolute top-2 right-2 text-[9px] uppercase tracking-wider font-mono text-amber-300/80 bg-black/40 px-2 py-0.5 rounded">
              VERIFIED CIVIC IMPACT
            </div>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 text-white mx-auto flex items-center justify-center shadow-lg border-2 border-white/20 mb-3">
              <Award className="w-9 h-9 text-white" />
            </div>

            <div className="text-xs font-semibold uppercase tracking-widest text-amber-300">
              MILESTONE HONOREE
            </div>

            <div className="text-2xl font-bold tracking-tight text-white mt-0.5">
              {profile.name}
            </div>

            <div className="mt-2 inline-block bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full border border-white/20 text-xs font-bold text-emerald-300">
              {badge.title} ({badge.rarity} Tier)
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-around text-center text-xs">
              <div>
                <div className="text-lg font-extrabold text-white">{profile.totalHours} hrs</div>
                <div className="text-[10px] text-slate-400">Total Verified</div>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <div className="text-lg font-extrabold text-white">14 Shifts</div>
                <div className="text-[10px] text-slate-400">100% Attendance</div>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <div className="text-lg font-extrabold text-white">Seattle, WA</div>
                <div className="text-[10px] text-slate-400">Community Reach</div>
              </div>
            </div>
          </div>

          {/* Social Media Share Buttons */}
          <div className="space-y-2">
            <span className="font-bold text-slate-700 block">
              1-Click Share to Platforms:
            </span>

            <div className="grid grid-cols-3 gap-2.5">
              {/* LinkedIn */}
              <button
                onClick={handleShareLinkedIn}
                className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#0a66c2] hover:bg-[#084e96] text-white font-semibold rounded-xl text-xs transition-colors shadow-xs"
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3" />
              </button>

              {/* X / Twitter */}
              <button
                onClick={handleShareTwitter}
                className="flex items-center justify-center gap-1.5 py-2 px-3 bg-black hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition-colors shadow-xs"
              >
                <span>X (Twitter)</span>
                <ExternalLink className="w-3 h-3" />
              </button>

              {/* Facebook */}
              <button
                onClick={handleShareFacebook}
                className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#1877f2] hover:bg-[#0d65d9] text-white font-semibold rounded-xl text-xs transition-colors shadow-xs"
              >
                <span>Facebook</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Copyable Post Caption */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">Pre-formatted Post Caption:</span>
              <button
                onClick={handleCopyText}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Caption'}</span>
              </button>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 whitespace-pre-line text-xs font-mono max-h-32 overflow-y-auto leading-relaxed">
              {shareText}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-xl transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
