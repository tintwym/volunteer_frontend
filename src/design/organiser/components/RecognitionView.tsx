'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  Award,
  FileText,
  Share2,
  Download,
  Printer,
  Sparkles,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Clock,
  Heart,
  Edit3,
  QrCode,
  Layers,
  Linkedin,
  Twitter,
  Facebook,
  PartyPopper,
  Plus,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  Badge,
  CertificateData,
  AppreciationLetterData,
  User,
} from '../types';

type BadgeDraft = {
  title: string;
  description: string;
  category: Badge['category'];
  tier: Badge['tier'];
  maxProgress: number;
};

const TIER_EMOJI: Record<string, string> = {
  bronze: '🥉',
  silver: '🥈',
  gold: '🥇',
  platinum: '👑',
  diamond: '💎',
  mythic: '🔮',
  immortal: '♾️',
};

interface RecognitionViewProps {
  badges?: Badge[];
  certificate: CertificateData;
  appreciationLetter: AppreciationLetterData;
  currentUser: User;
  onUpdateCertificate?: (cert: CertificateData) => void;
  onUpdateLetter?: (letter: AppreciationLetterData) => void;
  onCreateBadge?: (badge: Badge) => void;
}

const EMPTY_BADGE_DRAFT: BadgeDraft = {
  title: '',
  description: '',
  category: 'milestone',
  tier: 'bronze',
  maxProgress: 1,
};

export const RecognitionView: React.FC<RecognitionViewProps> = ({
  badges = [],
  certificate,
  appreciationLetter,
  currentUser,
  onUpdateCertificate,
  onUpdateLetter,
  onCreateBadge,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'badges' | 'certificate' | 'letter' | 'social'>('badges');
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [copiedSocialText, setCopiedSocialText] = useState<boolean>(false);
  const [isEditingCertificate, setIsEditingCertificate] = useState<boolean>(false);
  const [isEditingLetter, setIsEditingLetter] = useState<boolean>(false);
  const [showCreateBadge, setShowCreateBadge] = useState(false);
  const [badgeDraft, setBadgeDraft] = useState<BadgeDraft>(EMPTY_BADGE_DRAFT);
  const [badgeError, setBadgeError] = useState('');

  // Editable certificate fields
  const [certData, setCertData] = useState<CertificateData>(certificate);
  const [letterData, setLetterData] = useState<AppreciationLetterData>(appreciationLetter);

  const isOrganizer = currentUser.role === 'organizer';

  // Preset volunteers for organizer to easily select and issue credentials
  const PRESET_VOLUNTEERS = [
    {
      name: 'Marcus Vance',
      hours: 142.5,
      code: 'HH-2026-CERT-8841',
      praise:
        'In recognition of exceptional dedication and sustained volunteer leadership during 2026 Coastal Restoration, Emergency Food Pantry, and Youth Mentorship initiatives.',
      cause: 'Coastal Restoration & Food Relief',
    },
    {
      name: 'Sophia Chen',
      hours: 198.0,
      code: 'HH-2026-CERT-9122',
      praise:
        'Awarded for extraordinary field coordination, botanical biodiversity surveying, and environmental stewardship across Pacific Cove Sanctuary.',
      cause: 'Environmental Science & Habitats',
    },
    {
      name: 'Mateo Gomez',
      hours: 110.0,
      code: 'HH-2026-CERT-7450',
      praise:
        'Honoring outstanding commitment to emergency logistics, supply chain distribution, and frontline civic assistance during seasonal crises.',
      cause: 'Disaster Relief & Aid',
    },
    {
      name: 'Maya Lin',
      hours: 84.0,
      code: 'HH-2026-CERT-6310',
      praise:
        'With sincere gratitude for compassionate engagement in youth literacy, STEM tutoring, and community educational enrichment.',
      cause: 'Education & Youth Mentorship',
    },
  ];

  const handleSelectVolunteer = (vol: typeof PRESET_VOLUNTEERS[0]) => {
    setCertData((prev) => ({
      ...prev,
      recipientName: vol.name,
      hoursVerified: vol.hours,
      verificationCode: vol.code,
      customPraise: vol.praise,
      causeFocus: vol.cause,
    }));
    setLetterData((prev) => ({
      ...prev,
      volunteerName: vol.name,
      totalHours: vol.hours,
      verificationId: vol.code,
    }));
    triggerCelebration();
  };

  // Trigger celebration confetti
  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0f766e', '#ca8a04', '#2563eb', '#10b981'],
    });
  };

  const handleBadgeClick = (badge: Badge) => {
    setSelectedBadge(badge);
    if (badge.isUnlocked) {
      triggerCelebration();
    }
  };

  const openCreateBadge = () => {
    setBadgeDraft(EMPTY_BADGE_DRAFT);
    setBadgeError('');
    setShowCreateBadge(true);
  };

  const handleCreateBadge = () => {
    const title = badgeDraft.title.trim();
    const description = badgeDraft.description.trim();
    if (!title) {
      setBadgeError('Badge title is required.');
      return;
    }
    if (!description) {
      setBadgeError('Badge description is required.');
      return;
    }
    const maxProgress = Math.max(1, Number(badgeDraft.maxProgress) || 1);
    const newBadge: Badge = {
      id: `badge-custom-${Date.now()}`,
      title,
      description,
      category: badgeDraft.category,
      icon: 'Award',
      tier: badgeDraft.tier,
      progress: 0,
      maxProgress,
      isUnlocked: false,
      colorBg: 'bg-emerald-500/10 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300',
      colorBorder: 'border-emerald-400/40',
    };
    onCreateBadge?.(newBadge);
    setShowCreateBadge(false);
    setBadgeDraft(EMPTY_BADGE_DRAFT);
    setBadgeError('');
    setActiveSubTab('badges');
  };

  const handlePrint = () => {
    window.print();
  };

  // Social share text
  const milestoneShareText = `Proud to announce that I've completed ${certData.hoursVerified} verified service hours with ${certData.organizationName}! 🌟 Just unlocked the Century Club badge and received my formal service commendation. Every hour dedicated to coastal restoration and food security matters! #VolunteerImpact #CommunityFirst #ServiceLeadership #HopeHarbor`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(milestoneShareText);
    setCopiedSocialText(true);
    setTimeout(() => setCopiedSocialText(false), 3000);
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(milestoneShareText)}`;
    window.open(url, '_blank');
  };

  const shareToLinkedIn = () => {
    // LinkedIn share URL
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://hopeharbor.org/volunteers')}&summary=${encodeURIComponent(milestoneShareText)}`;
    window.open(url, '_blank');
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://hopeharbor.org/volunteers')}&quote=${encodeURIComponent(milestoneShareText)}`;
    window.open(url, '_blank');
  };

  return (
    <div id="recognition-container" className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Recognition, Badges & Milestone Certificates
              </h1>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Organizer Issuance Hub
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Authorize certified diplomas for service hours, print letters of recommendation on official letterhead, configure volunteer milestone badges, and broadcast community milestones.
            </p>
          </div>
        </div>

        {/* Sub-tab navigation */}
        <div className="flex flex-wrap items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <button
            id="subtab-badges"
            onClick={() => setActiveSubTab('badges')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeSubTab === 'badges' ? 'bg-white text-slate-900 shadow-xs font-bold dark:bg-slate-700 dark:text-slate-100' : 'hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Badges ({(badges || []).filter((b) => b.isUnlocked).length})
          </button>
          <button
            id="subtab-certificate"
            onClick={() => setActiveSubTab('certificate')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeSubTab === 'certificate' ? 'bg-white text-slate-900 shadow-xs font-bold dark:bg-slate-700 dark:text-slate-100' : 'hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Official Certificate
          </button>
          <button
            id="subtab-letter"
            onClick={() => setActiveSubTab('letter')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeSubTab === 'letter' ? 'bg-white text-slate-900 shadow-xs font-bold dark:bg-slate-700 dark:text-slate-100' : 'hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Appreciation Letter
          </button>
          <button
            id="subtab-social"
            onClick={() => setActiveSubTab('social')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeSubTab === 'social' ? 'bg-white text-slate-900 shadow-xs font-bold dark:bg-slate-700 dark:text-slate-100' : 'hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Social Sharing
          </button>
        </div>
      </div>

      {/* 1. BADGES TAB */}
      {activeSubTab === 'badges' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Earned Achievement Badges & Milestones
              </h2>
              <p className="text-xs text-slate-400">Click any badge to view milestone progress and celebrate</p>
            </div>
            <div className="flex items-center gap-2">
              {isOrganizer && (
                <button
                  type="button"
                  id="create-new-badge-btn"
                  onClick={openCreateBadge}
                  className="flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-xl transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Badge</span>
                </button>
              )}
              <button
                onClick={triggerCelebration}
                className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-xl transition-colors"
              >
                <PartyPopper className="w-4 h-4" />
                <span>Celebrate Impact</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(badges || []).map((badge) => {
              const progressPct = Math.min(100, Math.round((badge.progress / badge.maxProgress) * 100));

              return (
                <button
                  key={badge.id}
                  id={`badge-card-${badge.id}`}
                  onClick={() => handleBadgeClick(badge)}
                  className={`text-left p-5 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                    badge.isUnlocked
                      ? 'bg-white border-slate-200 hover:border-amber-400 hover:shadow-md cursor-pointer'
                      : 'bg-slate-50/80 dark:bg-slate-900/80 border-dashed border-slate-300 opacity-75'
                  }`}
                >
                  {badge.isUnlocked && (
                    <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                      Unlocked
                    </span>
                  )}

                  <div>
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-3 shadow-xs ${
                        badge.isUnlocked
                          ? 'bg-amber-500/10 text-amber-600 border border-amber-300/40'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      {TIER_EMOJI[badge.tier] ?? TIER_EMOJI.bronze}
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 mb-1">{badge.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {badge.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 w-full space-y-1.5">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                      <span>{badge.isUnlocked ? 'Completed' : 'Progress'}</span>
                      <span>{badge.progress} / {badge.maxProgress}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          badge.isUnlocked ? 'bg-amber-500' : 'bg-slate-400'
                        }`}
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. OFFICIAL CERTIFICATE TAB */}
      {activeSubTab === 'certificate' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between no-print">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Verified Certificate of Service
              </h2>
              <p className="text-xs text-slate-400">
                Official document suitable for professional portfolios, academic credit, and municipal records
              </p>
            </div>

            <div className="flex items-center gap-2">
              {isOrganizer && (
                <button
                  onClick={() => setIsEditingCertificate(!isEditingCertificate)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                  <span>{isEditingCertificate ? 'Done Editing' : 'Edit Text'}</span>
                </button>
              )}

              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 px-4 py-1.5 rounded-xl transition-colors shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Certificate</span>
              </button>
            </div>
          </div>

          {/* Volunteer Recipient Quick Selector (Organizer) */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs no-print">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-slate-900">Select Volunteer Recipient:</p>
              <span className="text-[11px] text-slate-500 font-medium">Click to populate official verified credentials</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {PRESET_VOLUNTEERS.map((v) => (
                <button
                  key={v.name}
                  onClick={() => handleSelectVolunteer(v)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    certData.recipientName === v.name
                      ? 'border-amber-400 bg-amber-50/80 ring-2 ring-amber-400/20 dark:border-amber-600 dark:bg-amber-950/50'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-900 truncate">{v.name}</p>
                  <p className="text-[11px] text-amber-800 font-semibold">{v.hours} verified hours</p>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">{v.code}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Certificate Editing Controls (for Organizer) */}
          {isEditingCertificate && (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs no-print">
              <p className="font-bold text-slate-800">Customize Certificate Details</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Recipient Name</label>
                  <input
                    type="text"
                    value={certData.recipientName}
                    onChange={(e) => setCertData({ ...certData, recipientName: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Verified Hours</label>
                  <input
                    type="number"
                    value={certData.hoursVerified}
                    onChange={(e) => setCertData({ ...certData, hoursVerified: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Commendation Text</label>
                <textarea
                  rows={2}
                  value={certData.customPraise}
                  onChange={(e) => setCertData({ ...certData, customPraise: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900"
                />
              </div>
            </div>
          )}

          {/* Rendered Certificate Card (Prints as clean formal document) */}
          <div className="print-certificate-container relative mx-auto max-w-4xl overflow-hidden rounded-3xl border-8 border-double border-[#8C733E] bg-[#FAF9F5] p-6 text-slate-900 shadow-xl sm:p-12 dark:border-amber-700 dark:bg-slate-950 dark:text-slate-100">
            {/* Background watermark seal */}
            <div className="absolute inset-0 flex items-center justify-center opacity-4 pointer-events-none">
              <Award className="w-96 h-96 text-[#8C733E]" />
            </div>

            {/* Inner ornamental border */}
            <div className="border border-[#8C733E]/50 p-6 sm:p-10 relative z-10 text-center space-y-6">
              {/* Organization Header */}
              <div className="space-y-1">
                <p className="font-seal uppercase tracking-[0.25em] text-xs sm:text-sm font-bold text-[#8C733E]">
                  {certData.organizationName}
                </p>
                <h3 className="font-serif-display text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
                  Certificate of Volunteer Service
                </h3>
                <p className="text-xs uppercase tracking-widest text-slate-500 font-medium">
                  Official Verification of Civic Contribution & Leadership
                </p>
              </div>

              {/* Presentation Line */}
              <div className="py-2">
                <p className="italic text-slate-500 text-sm font-serif-display">
                  This distinguished award is proudly presented to
                </p>
                <h4 className="font-serif-display text-3xl sm:text-5xl font-bold text-slate-900 underline decoration-[#8C733E]/40 underline-offset-8 my-3">
                  {certData.recipientName}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed pt-2">
                  {certData.customPraise}
                </p>
              </div>

              {/* Service Hours Highlight */}
              <div className="inline-block rounded-2xl border border-amber-300/60 bg-amber-50/80 px-8 py-3 shadow-xs dark:border-amber-700 dark:bg-amber-950/50">
                <p className="font-seal text-2xl sm:text-3xl font-bold text-[#8C733E]">
                  {certData.hoursVerified} Verified Service Hours
                </p>
                <p className="text-[11px] uppercase tracking-wider text-slate-600 font-semibold mt-0.5">
                  Focus: {certData.causeFocus}
                </p>
              </div>

              {/* Signatures & Verification Seal */}
              <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 items-end gap-6 border-t border-[#8C733E]/30 text-left">
                {/* Director Signature */}
                <div className="text-center sm:text-left space-y-1">
                  <div className="font-serif-display text-lg italic font-bold text-slate-800 border-b border-slate-400 pb-1 inline-block min-w-[160px]">
                    {certData.directorName}
                  </div>
                  <p className="text-xs font-semibold text-slate-900">{certData.directorTitle}</p>
                  <p className="text-[10px] text-slate-500">Authorized Signatory</p>
                </div>

                {/* Golden Seal */}
                <div className="flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full border-4 border-[#8C733E] bg-gradient-to-br from-[#E6CA65] to-[#B38F38] text-slate-900 flex flex-col items-center justify-center shadow-md p-1">
                    <Award className="w-5 h-5 text-slate-950" />
                    <span className="font-seal text-[8px] font-extrabold uppercase tracking-tighter text-slate-950 text-center leading-tight mt-0.5">
                      OFFICIAL SEAL
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#8C733E] mt-1 uppercase tracking-wider">
                    {certData.issueDate}
                  </span>
                </div>

                {/* QR & Verification ID */}
                <div className="text-center sm:text-right space-y-1">
                  <div className="flex items-center justify-center sm:justify-end gap-2">
                    <QrCode className="w-8 h-8 text-slate-800" />
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-slate-900">Certificate ID</p>
                      <p className="text-[10px] font-mono font-semibold text-slate-600">
                        {certData.verificationCode}
                      </p>
                    </div>
                  </div>
                  <p className="text-[9px] text-slate-400">
                    Verify online at verify.hopeharbor.org
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. APPRECIATION LETTER TAB */}
      {activeSubTab === 'letter' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between no-print">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Formal Letter of Appreciation & Commendation
              </h2>
              <p className="text-xs text-slate-400">
                Official recommendation letter format suitable for academic applications, scholarships, and employer records
              </p>
            </div>

            <div className="flex items-center gap-2">
              {isOrganizer && (
                <button
                  onClick={() => setIsEditingLetter(!isEditingLetter)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                  <span>{isEditingLetter ? 'Done' : 'Edit Remarks'}</span>
                </button>
              )}

              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 px-4 py-1.5 rounded-xl transition-colors shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Letter</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs no-print">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-slate-900">Select Volunteer for Commendation Letter:</p>
              <span className="text-[11px] text-slate-500 font-medium">Click to populate letter with volunteer record</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {PRESET_VOLUNTEERS.map((v) => (
                <button
                  key={v.name}
                  onClick={() => handleSelectVolunteer(v)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    letterData.volunteerName === v.name
                      ? 'bg-emerald-50/80 border-emerald-400 ring-2 ring-emerald-400/20'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-900 truncate">{v.name}</p>
                  <p className="text-[11px] text-emerald-800 font-semibold">{v.hours} verified hours</p>
                </button>
              ))}
            </div>
          </div>

          {/* Letter Editor for Organizer */}
          {isEditingLetter && (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs no-print">
              <p className="font-bold text-slate-800">Customize Letter Content</p>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Body Commendation Text</label>
                <textarea
                  rows={4}
                  value={letterData.customBody}
                  onChange={(e) => setLetterData({ ...letterData, customBody: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>
            </div>
          )}

          {/* Official Letterhead Stationery */}
          <div className="bg-white p-8 sm:p-14 rounded-3xl border border-slate-200 shadow-xl max-w-3xl mx-auto space-y-6 text-slate-800 print-certificate-container">
            {/* Letterhead Header */}
            <div className="flex items-center justify-between pb-6 border-b-2 border-slate-900">
              <div>
                <h3 className="font-bold text-lg text-slate-950 uppercase tracking-wide">
                  {letterData.organizationName}
                </h3>
                <p className="text-xs text-slate-500">
                  Division of Volunteer Leadership & Civic Engagement
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  100 Harbor Way, Suite 400 • www.hopeharbor.org • (555) 234-5678
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-600">{letterData.date}</p>
                <p className="text-[10px] font-mono text-slate-400 mt-1">Ref: LTR-2026-MV100</p>
              </div>
            </div>

            {/* Salutation & Body */}
            <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700">
              <p className="font-bold text-slate-900">{letterData.salutation}</p>

              <p>{letterData.customBody}</p>

              <div>
                <p className="font-semibold text-slate-900 mb-2">
                  Key Service Contributions & Verified Milestones:
                </p>
                <ul className="space-y-1.5 pl-4 list-disc text-slate-600">
                  {letterData.achievements.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <p>
                Volunteers like Marcus represent the lifeblood of our civic infrastructure. Should you require any further validation or detailed attendance records regarding their service tenure, please do not hesitate to contact my office directly.
              </p>
            </div>

            {/* Signoff */}
            <div className="pt-6 space-y-2">
              <p className="text-xs text-slate-600">With sincere appreciation and gratitude,</p>
              <div className="font-serif-display text-lg italic font-bold text-slate-900 pt-1">
                {letterData.signatoryName}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{letterData.signatoryName}</p>
                <p className="text-xs text-slate-500">{letterData.signatoryTitle}</p>
                <p className="text-[11px] text-emerald-700 font-semibold">HopeHarbor Volunteer Alliance</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. SOCIAL MEDIA INTEGRATION TAB */}
      {activeSubTab === 'social' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Social Media Integration & Milestone Showcase
              </h2>
              <p className="text-xs text-slate-400">
                Share your certified service milestones directly to professional and social feeds
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Share Controls & Copy Block */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-emerald-600" />
                <span>1-Click Milestone Sharing</span>
              </h3>

              <p className="text-xs text-slate-500">
                Inspire your friends, network, and employers by sharing your verified volunteer impact.
              </p>

              {/* Pre-crafted caption */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Formatted Post Caption
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-mono">
                  {milestoneShareText}
                </p>
                <div className="pt-2 flex items-center justify-end">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl transition-colors"
                  >
                    {copiedSocialText ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copy Caption</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Social platform buttons */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-600 block">
                  Broadcast to Platform:
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    onClick={shareToLinkedIn}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#0A66C2] hover:bg-[#095196] text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </button>

                  <button
                    onClick={shareToTwitter}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    <Twitter className="w-4 h-4" />
                    <span>X / Twitter</span>
                  </button>

                  <button
                    onClick={shareToFacebook}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#1877F2] hover:bg-[#1567d3] text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    <Facebook className="w-4 h-4" />
                    <span>Facebook</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Visual Social Card Graphic Preview */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Generated Social Media Graphic (1:1 Square)</span>
              </h3>

              {/* Square Graphic Mockup */}
              <div className="aspect-square w-full max-w-sm mx-auto rounded-3xl bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 p-6 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden">
                {/* Visual glow circles */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/20 rounded-full blur-2xl pointer-events-none" />

                {/* Top of card */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center font-bold text-xs">
                      HH
                    </div>
                    <span className="text-xs font-bold tracking-wider uppercase text-emerald-200">
                      HopeHarbor
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full">
                    Century Club
                  </span>
                </div>

                {/* Middle highlight */}
                <div className="text-center relative z-10 my-auto">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-amber-400/80 shadow-lg mb-3"
                  />
                  <h4 className="text-xl font-extrabold tracking-tight">
                    {currentUser.name}
                  </h4>
                  <p className="text-3xl font-extrabold text-amber-300 mt-1">
                    142.5 Hours
                  </p>
                  <p className="text-xs text-emerald-100 font-medium mt-1">
                    Verified Community Service Contributed
                  </p>
                </div>

                {/* Bottom of card */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-300 relative z-10">
                  <span>#VolunteerImpact</span>
                  <span>hopeharbor.org</span>
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={triggerCelebration}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Graphic for Instagram / LinkedIn</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCreateBadge && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-badge-title"
        >
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800">
              <div>
                <h3 id="create-badge-title" className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Create New Badge
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Define a milestone badge volunteers can earn through service.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateBadge(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 px-5 py-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 dark:text-slate-300">
                  Badge title
                </label>
                <input
                  type="text"
                  value={badgeDraft.title}
                  onChange={(e) => setBadgeDraft((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Weekend Warrior"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 dark:text-slate-300">
                  Description
                </label>
                <textarea
                  value={badgeDraft.description}
                  onChange={(e) => setBadgeDraft((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  placeholder="What do volunteers need to achieve?"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 dark:text-slate-300">
                    Category
                  </label>
                  <select
                    value={badgeDraft.category}
                    onChange={(e) =>
                      setBadgeDraft((prev) => ({
                        ...prev,
                        category: e.target.value as Badge['category'],
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  >
                    <option value="hours">Hours</option>
                    <option value="milestone">Milestone</option>
                    <option value="leadership">Leadership</option>
                    <option value="impact">Impact</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 dark:text-slate-300">
                    Tier
                  </label>
                  <select
                    value={badgeDraft.tier}
                    onChange={(e) =>
                      setBadgeDraft((prev) => ({
                        ...prev,
                        tier: e.target.value as Badge['tier'],
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  >
                    <option value="bronze">Bronze</option>
                    <option value="silver">Silver</option>
                    <option value="gold">Gold</option>
                    <option value="platinum">Platinum</option>
                    <option value="diamond">Diamond</option>
                    <option value="mythic">Mythic</option>
                    <option value="immortal">Immortal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 dark:text-slate-300">
                    Target progress
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={badgeDraft.maxProgress}
                    onChange={(e) =>
                      setBadgeDraft((prev) => ({
                        ...prev,
                        maxProgress: parseInt(e.target.value, 10) || 1,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              {badgeError && (
                <p className="text-xs font-semibold text-rose-600">{badgeError}</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-5 py-4 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowCreateBadge(false)}
                className="rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateBadge}
                className="rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-700"
              >
                Create Badge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
