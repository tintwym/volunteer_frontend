'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  Award,
  FileText,
  Share2,
  Printer,
  Download,
  CheckCircle2,
  Sparkles,
  Medal,
  Trophy,
  Crown,
  HeartHandshake,
  ShieldCheck,
  Linkedin,
  Twitter,
  Facebook,
  Copy,
  Check,
  Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Volunteer, Badge, CertificateRecord, AppreciationLetterRecord } from '../types';

interface RecognitionMilestonesViewProps {
  volunteers: Volunteer[];
  certificates: CertificateRecord[];
  allBadges: Badge[];
  onIssueCertificate: (cert: CertificateRecord) => void;
  onAwardBadge: (volunteerId: string, badgeId: string) => void;
  preSelectedVolunteer?: Volunteer | null;
}

export const RecognitionMilestonesView: React.FC<RecognitionMilestonesViewProps> = ({
  volunteers,
  certificates,
  allBadges,
  onIssueCertificate,
  onAwardBadge,
  preSelectedVolunteer
}) => {
  const [activeTab, setActiveTab] = useState<'certificates' | 'letters' | 'badges' | 'social'>('certificates');
  const [selectedVolunteerId, setSelectedVolunteerId] = useState<string>(
    preSelectedVolunteer?.id || volunteers[0]?.id || ''
  );

  // Certificate Generator State
  const [certProgram, setCertProgram] = useState('Community Food Security & Emergency Outreach');
  const [certSignatory, setCertSignatory] = useState('Sarah Jenkins');
  const [certTitle, setCertTitle] = useState('Volunteer Leadership Director');
  const [certOrg, setCertOrg] = useState('Community Action Network Alliance');
  const [issuedSuccess, setIssuedSuccess] = useState(false);

  // Letter Generator State
  const [letterTone, setLetterTone] = useState<'Warm & Inspiring' | 'Official Non-Profit Endorsement' | 'Academic / Career Recommendation'>('Warm & Inspiring');
  const [copiedLetter, setCopiedLetter] = useState(false);

  // Badge Awarding State
  const [selectedBadgeToAward, setSelectedBadgeToAward] = useState<string>(allBadges[0]?.id || '');
  const [badgeAwardSuccess, setBadgeAwardSuccess] = useState(false);

  // Social Share State
  const [copiedSocialText, setCopiedSocialText] = useState(false);

  const selectedVolunteer = volunteers.find(v => v.id === selectedVolunteerId) || volunteers[0];

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleIssueCertificate = () => {
    if (!selectedVolunteer) return;
    const newCert: CertificateRecord = {
      id: `cert-${Date.now()}`,
      volunteerId: selectedVolunteer.id,
      volunteerName: selectedVolunteer.name,
      hours: selectedVolunteer.verifiedHours,
      organization: certOrg,
      issuedDate: new Date().toISOString().slice(0, 10),
      signatoryLeader: certSignatory,
      signatoryTitle: certTitle,
      programFocus: certProgram,
      certificateNumber: `CAN-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`
    };

    onIssueCertificate(newCert);
    triggerConfetti();
    setIssuedSuccess(true);
    setTimeout(() => setIssuedSuccess(false), 4000);
  };

  const handleAwardBadge = () => {
    if (!selectedVolunteer || !selectedBadgeToAward) return;
    onAwardBadge(selectedVolunteer.id, selectedBadgeToAward);
    triggerConfetti();
    setBadgeAwardSuccess(true);
    setTimeout(() => setBadgeAwardSuccess(false), 4000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Generate Letter Text dynamically based on volunteer verified hours & tone
  const generateLetterText = () => {
    if (!selectedVolunteer) return '';
    const name = selectedVolunteer.name;
    const hours = selectedVolunteer.verifiedHours;
    const shifts = selectedVolunteer.shiftsCompleted;
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    if (letterTone === 'Academic / Career Recommendation') {
      return `Date: ${date}\n\nTo Whom It May Concern,\n\nI am writing this formal letter of recommendation to strongly commend ${name} for their exemplary dedication and service with the Community Action Network.\n\nOver the course of their service, ${name} has accumulated ${hours} verified hours of community volunteer leadership across ${shifts} major public service operations. In each engagement, they demonstrated remarkable reliability, teamwork, and problem-solving abilities.\n\n${name} has shown a high degree of civic responsibility, adaptability, and integrity. Their contributions have significantly impacted the local community, and I have no doubt they will bring the same dedication and initiative to any academic or professional endeavor they pursue.\n\nSincerely,\n${certSignatory}\n${certTitle}\n${certOrg}`;
    }

    if (letterTone === 'Official Non-Profit Endorsement') {
      return `Date: ${date}\n\nDear ${name},\n\nOn behalf of the Board of Directors and the entire volunteer leadership team at ${certOrg}, it is our distinct privilege to officially recognize your outstanding civic contributions.\n\nWith ${hours} verified service hours officially logged into our permanent registry, your unwavering commitment has provided indispensable support to our community pantry, emergency shelters, and educational workshops.\n\nYour civic stewardship embodies the very mission of our alliance. We thank you for being a steadfast pillar of our organization and look forward to continuing our partnership in the seasons ahead.\n\nWith our highest appreciation,\n${certSignatory}\n${certTitle}\n${certOrg}`;
    }

    return `Date: ${date}\n\nDear ${name},\n\nWords cannot fully express how grateful our entire team is for your warm heart and selfless service! Reaching ${hours} verified hours is an extraordinary milestone that represents countless lives touched and smiles shared.\n\nWhether stepping up during demanding morning food distributions or providing compassionate care at our community events, your presence brings hope and positive energy to everyone around you.\n\nThank you for being such an inspiring community champion. We celebrate your dedication today and always!\n\nWarmly and with deep gratitude,\n${certSignatory}\n${certTitle}\n${certOrg}`;
  };

  const letterText = generateLetterText();

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(letterText);
    setCopiedLetter(true);
    setTimeout(() => setCopiedLetter(false), 3000);
  };

  // Social Share Text
  const socialShareText = selectedVolunteer
    ? `Proud to celebrate ${selectedVolunteer.name} for surpassing ${selectedVolunteer.verifiedHours} verified volunteer service hours with @CommunityActionNetwork! Thank you for your tireless community impact and dedication! #VolunteerImpact #CommunityService #CivicLeadership #VolunteerHero`
    : '';

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodeURIComponent(socialShareText)}`;
    window.open(url, '_blank');
  };

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(socialShareText)}`;
    window.open(url, '_blank');
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(socialShareText)}`;
    window.open(url, '_blank');
  };

  const handleCopySocial = () => {
    navigator.clipboard.writeText(socialShareText);
    setCopiedSocialText(true);
    setTimeout(() => setCopiedSocialText(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Volunteer Recognition & Milestones</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
              Accredited Honors
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Generate printable certificates based on verified hours, draft personalized appreciation letters, award badges, and share civic milestones.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-slate-100 p-1 rounded-xl flex flex-wrap items-center text-xs font-semibold">
          <button
            onClick={() => setActiveTab('certificates')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'certificates' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Certificates of Service
          </button>
          <button
            onClick={() => setActiveTab('letters')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'letters' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Appreciation Letters
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'badges' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Badges System
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'social' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Social Sharing
          </button>
        </div>
      </div>

      {/* Volunteer Target Selector Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {selectedVolunteer && (
            <img
              src={selectedVolunteer.avatar}
              alt={selectedVolunteer.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500"
            />
          )}
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Active Recognition Candidate
            </span>
            <select
              value={selectedVolunteerId}
              onChange={(e) => setSelectedVolunteerId(e.target.value)}
              className="mt-0.5 text-sm font-bold text-slate-900 bg-transparent border-0 focus:outline-none cursor-pointer"
            >
              {volunteers.map(v => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.verifiedHours} Verified Hours • {v.role})
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedVolunteer && (
          <div className="flex items-center gap-4 text-xs">
            <div className="text-right">
              <span className="text-slate-400 block text-[11px]">Total Service Credit</span>
              <span className="font-bold text-emerald-700 text-sm">
                {selectedVolunteer.verifiedHours} Verified Hours
              </span>
            </div>
            <div className="text-right pl-4 border-l border-slate-200">
              <span className="text-slate-400 block text-[11px]">Shifts Completed</span>
              <span className="font-bold text-slate-800 text-sm">
                {selectedVolunteer.shiftsCompleted} Operations
              </span>
            </div>
          </div>
        )}
      </div>

      {/* TAB 1: Certificates of Service */}
      {activeTab === 'certificates' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Certificate Configuration (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Certificate Credentials</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Leader administrative authorization fields
              </p>
            </div>

            {issuedSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Certificate registered and archived to volunteer service record!</span>
              </div>
            )}

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Organization Name</label>
                <input
                  type="text"
                  value={certOrg}
                  onChange={(e) => setCertOrg(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Program Initiative Focus</label>
                <input
                  type="text"
                  value={certProgram}
                  onChange={(e) => setCertProgram(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Signatory Leader Name</label>
                <input
                  type="text"
                  value={certSignatory}
                  onChange={(e) => setCertSignatory(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Signatory Title</label>
                <input
                  type="text"
                  value={certTitle}
                  onChange={(e) => setCertTitle(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={handleIssueCertificate}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Issue & Register Certificate</span>
              </button>

              <button
                onClick={handlePrint}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Certificate (PDF)</span>
              </button>
            </div>
          </div>

          {/* Right: Certificate Live High-Resolution Preview (8 cols) */}
          <div className="lg:col-span-8 bg-slate-100 p-6 rounded-2xl border border-slate-200 flex items-center justify-center">
            {selectedVolunteer ? (
              <div
                id="printable-certificate"
                className="bg-white w-full max-w-2xl rounded-xl shadow-lg border-8 border-double border-amber-600/60 p-8 text-center relative overflow-hidden text-slate-900"
              >
                {/* Decorative background watermark */}
                <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
                  <Award className="w-96 h-96 text-slate-900" />
                </div>

                {/* Top Non-profit Header */}
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-2 text-amber-700 font-bold text-xs tracking-widest uppercase mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{certOrg}</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 uppercase tracking-wider mt-1">
                    Certificate of Service
                  </h3>
                  <div className="w-24 h-0.5 bg-amber-600 mx-auto mt-2"></div>

                  <p className="text-xs text-slate-500 italic mt-4">
                    This official certificate is proudly conferred in recognition of outstanding community stewardship to:
                  </p>

                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-emerald-900 tracking-tight my-4">
                    {selectedVolunteer.name}
                  </h2>

                  <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
                    who has generously dedicated and successfully verified a grand total of
                  </p>

                  {/* Hours Badge Callout */}
                  <div className="my-5 inline-flex flex-col items-center justify-center px-6 py-2.5 rounded-2xl bg-amber-50 border-2 border-amber-300 shadow-2xs">
                    <span className="text-3xl font-serif font-black text-amber-900">
                      {selectedVolunteer.verifiedHours} Hours
                    </span>
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                      Verified Community Service
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    in dedicated service toward <strong className="text-slate-800">{certProgram}</strong>, significantly elevating community wellness and civic fellowship.
                  </p>

                  {/* Signatures & Seal */}
                  <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-2 gap-4 text-xs items-end">
                    <div className="text-left">
                      <div className="font-serif italic text-base text-slate-800 pb-1">
                        {certSignatory}
                      </div>
                      <div className="w-36 h-px bg-slate-400"></div>
                      <div className="font-bold text-slate-900 mt-1">{certSignatory}</div>
                      <div className="text-[10px] text-slate-500">{certTitle}</div>
                    </div>

                    <div className="text-right">
                      <div className="inline-flex flex-col items-center justify-center p-2 rounded-full border border-amber-300 bg-amber-50/50 text-[10px] text-amber-900 font-bold mb-1">
                        <Award className="w-5 h-5 text-amber-600 mb-0.5" />
                        <span>VERIFIED SEAL</span>
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Date: {new Date().toLocaleDateString()}
                      </div>
                      <div className="text-[9px] text-slate-400 font-mono">
                        CAN-{new Date().getFullYear()}-CERT
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-slate-400 text-sm">Select a volunteer to preview certificate</div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Appreciation Letters */}
      {activeTab === 'letters' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Letter Tone & Config */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Appreciation Letter Studio</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Generate tailored formal commendations or academic endorsements.
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Tone & Purpose</label>
              <div className="space-y-2 text-xs">
                {(['Warm & Inspiring', 'Official Non-Profit Endorsement', 'Academic / Career Recommendation'] as const).map(t => (
                  <label
                    key={t}
                    className={`p-3 rounded-xl border cursor-pointer block ${
                      letterTone === t
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="tone"
                      checked={letterTone === t}
                      onChange={() => setLetterTone(t)}
                      className="sr-only"
                    />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                onClick={handleCopyLetter}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                {copiedLetter ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLetter ? 'Copied to Clipboard!' : 'Copy Letter Text'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Letterhead</span>
              </button>
            </div>
          </div>

          {/* Right: Rendered Letterhead */}
          <div className="lg:col-span-8 bg-slate-100 p-6 rounded-2xl border border-slate-200 flex items-center justify-center">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg border border-slate-200 p-8 text-slate-800 text-xs leading-relaxed space-y-4 font-sans">
              {/* Official Letterhead Banner */}
              <div className="border-b-2 border-emerald-700 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-emerald-950 text-base tracking-wide">
                    Community Action Network Alliance
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    425 Main Street, Suite 400 • Volunteer Administration Office
                  </p>
                </div>
                <div className="text-right text-[10px] text-slate-400">
                  <span>CAN Ref: REC-{selectedVolunteer?.id.toUpperCase()}</span>
                </div>
              </div>

              {/* Letter Content */}
              <div className="whitespace-pre-wrap py-2 font-normal text-slate-800 leading-relaxed">
                {letterText}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Badges System */}
      {activeTab === 'badges' && (
        <div className="space-y-6">
          {/* Badge Awarding Action Box */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Award Digital Badge to {selectedVolunteer?.name}</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Recognize skills, reliability streaks, or service hours milestones.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedBadgeToAward}
                onChange={(e) => setSelectedBadgeToAward(e.target.value)}
                className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none"
              >
                {allBadges.map(b => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.category})
                  </option>
                ))}
              </select>

              <button
                onClick={handleAwardBadge}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Award Badge</span>
              </button>
            </div>
          </div>

          {badgeAwardSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Badge awarded to {selectedVolunteer?.name} with celebratory notification dispatched!</span>
            </div>
          )}

          {/* Badges Catalog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allBadges.map((badge) => {
              const isAwardedToCurrent = selectedVolunteer?.badges.some(b => b.id === badge.id);

              return (
                <div
                  key={badge.id}
                  className={`p-5 rounded-2xl border transition-all bg-white shadow-xs ${
                    isAwardedToCurrent
                      ? 'border-amber-300 ring-2 ring-amber-400/20 bg-gradient-to-br from-white to-amber-50/40'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-xs shrink-0">
                      <Award className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                          {badge.category}
                        </span>
                        {isAwardedToCurrent && (
                          <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-0.5">
                            <Check className="w-3 h-3" /> Awarded
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 mt-1">{badge.name}</h3>
                      <p className="text-xs text-slate-500 mt-1">{badge.description}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span>
                      {badge.hoursRequired > 0 ? `${badge.hoursRequired} verified hours required` : 'Leader discretionary award'}
                    </span>
                    {!isAwardedToCurrent && selectedVolunteer && (
                      <button
                        onClick={() => {
                          setSelectedBadgeToAward(badge.id);
                          onAwardBadge(selectedVolunteer.id, badge.id);
                          triggerConfetti();
                        }}
                        className="text-emerald-700 font-bold hover:underline cursor-pointer"
                      >
                        Award &rarr;
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: Social Media Milestone Integration */}
      {activeTab === 'social' && selectedVolunteer && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Sharing Controls & Intent Buttons (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Social Milestone Sharing</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Amplify volunteer achievements on organization social channels and celebrate civic impact.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <span className="font-bold text-slate-700 block">Pre-drafted Social Announcement</span>
              <p className="text-slate-600 italic">"{socialShareText}"</p>
              <button
                onClick={handleCopySocial}
                className="mt-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
              >
                {copiedSocialText ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSocialText ? 'Copied to Clipboard!' : 'Copy Social Text'}</span>
              </button>
            </div>

            {/* Direct Platform Share Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleShareLinkedIn}
                className="w-full py-2.5 px-4 bg-[#0A66C2] hover:bg-[#084e96] text-white rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Linkedin className="w-4 h-4" />
                <span>Share Milestone on LinkedIn</span>
              </button>

              <button
                onClick={handleShareTwitter}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-black text-white rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Twitter className="w-4 h-4" />
                <span>Post Shoutout on X (Twitter)</span>
              </button>

              <button
                onClick={handleShareFacebook}
                className="w-full py-2.5 px-4 bg-[#1877F2] hover:bg-[#1464cc] text-white rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Facebook className="w-4 h-4" />
                <span>Share to Non-Profit Facebook Page</span>
              </button>
            </div>
          </div>

          {/* Right: Generated Social Graphic Card (7 cols) */}
          <div className="lg:col-span-7 bg-slate-100 p-6 rounded-2xl border border-slate-200 flex items-center justify-center">
            {/* 1200x630 proportion Card Preview */}
            <div className="w-full max-w-lg aspect-[12/6.8] bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 rounded-2xl shadow-xl p-6 text-white flex flex-col justify-between relative overflow-hidden border-2 border-emerald-500/40">
              {/* Watermark glow */}
              <div className="absolute right-0 bottom-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

              {/* Card Header */}
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-xs shadow-xs">
                    CAN
                  </div>
                  <span className="text-xs font-bold tracking-wide text-slate-200">
                    Community Action Network
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-amber-950">
                  Civic Hero Milestone
                </span>
              </div>

              {/* Volunteer Highlight */}
              <div className="flex items-center gap-4 my-2 relative z-10">
                <img
                  src={selectedVolunteer.avatar}
                  alt={selectedVolunteer.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-4 ring-emerald-400 shadow-md"
                />
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {selectedVolunteer.name}
                  </h3>
                  <p className="text-xs text-emerald-300 font-semibold mt-0.5">
                    {selectedVolunteer.role} • {selectedVolunteer.shiftsCompleted} Community Shifts
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-amber-300 font-bold flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      {selectedVolunteer.verifiedHours} Verified Service Hours
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Quote */}
              <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-[10px] text-slate-400 relative z-10">
                <span>"Making community resilience possible through action."</span>
                <span className="font-semibold text-emerald-400">#VolunteerSpotlight</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
