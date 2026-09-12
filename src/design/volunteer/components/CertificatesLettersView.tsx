'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { 
  FileCheck2, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  Award, 
  Scroll, 
  ShieldCheck, 
  Calendar, 
  QrCode, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { VolunteerProfile } from '../types';

interface CertificatesLettersViewProps {
  profile: VolunteerProfile;
}

export const CertificatesLettersView: React.FC<CertificatesLettersViewProps> = ({ profile }) => {
  const [activeSubTab, setActiveSubTab] = useState<'certificate' | 'letter'>('certificate');
  const [certTitle, setCertTitle] = useState('Certificate of Commendable Service');
  const [copiedId, setCopiedId] = useState(false);
  const [copiedLetter, setCopiedLetter] = useState(false);

  const verificationId = `CERT-2026-VOL-8921-MC`;
  const issueDate = 'September 08, 2026';

  const handlePrint = () => {
    window.print();
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(verificationId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const appreciationLetterText = `GLOBAL VOLUNTEER ALLIANCE & CIVIC IMPACT NETWORK
1400 Civic Center Parkway, Suite 500, Seattle, WA 98101
Phone: (206) 555-0199 | verification@volunteerhub.org

Date: ${issueDate}

TO WHOM IT MAY CONCERN:

RE: Official Letter of Appreciation & Character Reference for Maya Chen

It is an immense privilege to provide this official letter of commendation for Maya Chen on behalf of the Global Volunteer Alliance and our regional non-profit coalition.

Maya Chen has contributed an outstanding total of ${profile.totalHours} verified hours of volunteer service across multiple community programs, including the Cascadia Community Food Relief, Puget Sound Environmental Trust, and Youth Horizons Foundation.

Throughout her tenure, Maya has demonstrated unparalleled dedication, punctuality, and civic leadership. She maintains a flawless 100% attendance and punctuality record across all 14 registered shifts. Whether coordinating the packaging of emergency grocery hampers for food-insecure families or clearing sensitive coastal dunes, Maya approaches every task with energy, empathy, and remarkable teamwork.

In recognition of these exemplary contributions, Maya has earned the Golden Heart Champion Milestone and is consistently requested by volunteer coordinators to assist in welcoming new participants.

We wholeheartedly commend Maya Chen for her dedication to civic betterment and recommend her without reservation for academic admissions, scholarship awards, and professional endeavors.

Should you require any further verification of her service records, please do not hesitate to contact our verification office at verification@volunteerhub.org referencing Verification ID: ${verificationId}.

Sincerely,

Dr. Julian Montgomery
Executive Director
Global Volunteer Alliance`;

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(appreciationLetterText);
    setCopiedLetter(true);
    setTimeout(() => setCopiedLetter(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Tab Controls */}
      <div className="no-print bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Certificates of Service & Appreciation Letters
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Official verifiable proof of your {profile.totalHours} completed service hours for university, scholarship, or employer records.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveSubTab('certificate')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'certificate'
                  ? 'bg-white text-emerald-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>Official Certificate</span>
            </button>

            <button
              onClick={() => setActiveSubTab('letter')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'letter'
                  ? 'bg-white text-emerald-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Scroll className="w-3.5 h-3.5 text-indigo-600" />
              <span>Appreciation Letter</span>
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Download / Print PDF</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'certificate' ? (
        /* Certificate View */
        <div className="space-y-4">
          {/* Certificate Customizer Bar (hidden when printing) */}
          <div className="no-print bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">Certificate Title:</span>
              <select
                value={certTitle}
                onChange={(e) => setCertTitle(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="Certificate of Commendable Service">Certificate of Commendable Service</option>
                <option value="Presidential Community Service Commendation">Presidential Community Service Commendation</option>
                <option value="Distinguished Civic Leadership Award">Distinguished Civic Leadership Award</option>
                <option value="Milestone 50-Hour Service Achievement">Milestone 50-Hour Service Achievement</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verification Code: <strong className="font-mono text-slate-800">{verificationId}</strong></span>
              </div>
              <button
                onClick={handleCopyId}
                className="text-xs text-emerald-700 font-semibold hover:underline flex items-center gap-1"
              >
                {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId ? 'Copied' : 'Copy ID'}</span>
              </button>
            </div>
          </div>

          {/* PRINTABLE CERTIFICATE CANVAS */}
          <div className="printable-document bg-[#faf8f5] text-slate-900 border-[12px] border-emerald-900/90 rounded-2xl p-8 sm:p-14 shadow-lg relative overflow-hidden max-w-4xl mx-auto">
            {/* Corner Ornamental Accents */}
            <div className="absolute top-3 left-3 w-12 h-12 border-t-2 border-l-2 border-amber-600/70" />
            <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-amber-600/70" />
            <div className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-amber-600/70" />
            <div className="absolute bottom-3 right-3 w-12 h-12 border-b-2 border-r-2 border-amber-600/70" />

            {/* Inner Border */}
            <div className="border border-amber-600/40 p-6 sm:p-10 rounded-xl relative">
              {/* Top Header */}
              <div className="text-center space-y-2 mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/60 border border-emerald-300 text-emerald-900 text-[11px] font-bold tracking-wider uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  Official Certified Document
                </div>

                <div className="text-xs sm:text-sm font-semibold tracking-widest text-slate-500 uppercase">
                  Global Volunteer Alliance & Civic Impact Network
                </div>

                <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-emerald-950 tracking-tight">
                  {certTitle}
                </h2>
                <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mt-2" />
              </div>

              {/* Recipient Presentation */}
              <div className="text-center space-y-4 my-8">
                <p className="text-xs sm:text-sm text-slate-600 uppercase tracking-widest font-medium">
                  This certificate is proudly conferred upon
                </p>

                <div className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-normal underline decoration-amber-500/40 underline-offset-8">
                  {profile.name}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed pt-2">
                  In recognition and sincere appreciation of dedicated volunteer service and meritorious contributions to the community, totaling:
                </p>

                {/* Total Hours Emblem Box */}
                <div className="inline-block bg-gradient-to-br from-amber-50 via-white to-amber-100/80 border-2 border-amber-500/80 rounded-2xl px-6 py-3 shadow-xs">
                  <div className="text-3xl sm:text-4xl font-extrabold text-amber-900 tracking-tight font-serif">
                    {profile.totalHours} Verified Hours
                  </div>
                  <div className="text-[11px] font-semibold text-amber-800 tracking-wider uppercase mt-0.5">
                    14 Completed Community Projects &bull; 100% Attendance
                  </div>
                </div>
              </div>

              {/* Bottom Signatures & Seal Section */}
              <div className="mt-12 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
                {/* Signatory 1 */}
                <div className="space-y-1">
                  <div className="font-serif italic text-lg sm:text-xl text-slate-800 font-semibold">
                    Julian Montgomery
                  </div>
                  <div className="w-40 h-px bg-slate-300 mx-auto sm:mx-0" />
                  <div className="text-xs font-bold text-slate-800">Dr. Julian Montgomery</div>
                  <div className="text-[11px] text-slate-500">Executive Director, GVA</div>
                </div>

                {/* Official Gold Seal Graphic */}
                <div className="relative flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 text-white p-1 shadow-md flex items-center justify-center text-center border-2 border-amber-200">
                    <div className="w-full h-full rounded-full border border-dashed border-amber-100 flex flex-col items-center justify-center p-1">
                      <Award className="w-6 h-6 text-white" />
                      <span className="text-[7px] font-black uppercase tracking-tighter text-amber-100 leading-none mt-0.5">
                        OFFICIAL SEAL
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] font-semibold text-amber-800 tracking-wider uppercase mt-1">
                    VERIFIED SERVICE
                  </span>
                </div>

                {/* Signatory 2 & Verification */}
                <div className="space-y-1 text-center sm:text-right">
                  <div className="font-serif italic text-lg sm:text-xl text-slate-800 font-semibold">
                    Karen Soto
                  </div>
                  <div className="w-40 h-px bg-slate-300 mx-auto sm:ml-auto" />
                  <div className="text-xs font-bold text-slate-800">Karen Soto</div>
                  <div className="text-[11px] text-slate-500">Director of Volunteer Operations</div>
                </div>
              </div>

              {/* Verification Footer ID */}
              <div className="mt-8 pt-3 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400 gap-2 font-mono">
                <span>Issue Date: {issueDate}</span>
                <span>Verification ID: {verificationId}</span>
                <span>volunteerhub.org/verify</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Appreciation Letter View */
        <div className="space-y-4">
          <div className="no-print bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between gap-3 text-xs">
            <span className="text-slate-600">
              This letter is formulated as an official character and service reference suitable for employment or university admissions.
            </span>
            <button
              onClick={handleCopyLetter}
              className="text-xs font-semibold text-indigo-700 hover:text-indigo-800 flex items-center gap-1 shrink-0"
            >
              {copiedLetter ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLetter ? 'Copied to Clipboard' : 'Copy Full Text'}</span>
            </button>
          </div>

          {/* Printable Letterhead Paper */}
          <div className="printable-document bg-white border border-slate-200 rounded-2xl p-8 sm:p-14 shadow-lg max-w-3xl mx-auto space-y-6 text-slate-800 font-sans text-xs sm:text-sm leading-relaxed">
            {/* Letterhead Header */}
            <div className="flex items-start justify-between border-b-2 border-emerald-900 pb-5">
              <div>
                <div className="text-lg font-bold text-emerald-950 font-serif tracking-tight">
                  GLOBAL VOLUNTEER ALLIANCE
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Civic Impact Network & Community Coalition
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  1400 Civic Center Parkway, Suite 500, Seattle, WA 98101
                </div>
              </div>
              <div className="text-right text-[11px] text-slate-500">
                <div>Phone: (206) 555-0199</div>
                <div>verification@volunteerhub.org</div>
                <div className="font-mono text-[10px] text-emerald-800 mt-1">Ref: {verificationId}</div>
              </div>
            </div>

            {/* Date & Addressee */}
            <div className="space-y-1 pt-2">
              <div className="font-semibold text-slate-600">Date: {issueDate}</div>
              <div className="font-bold text-slate-900 pt-2">TO WHOM IT MAY CONCERN:</div>
              <div className="font-semibold text-emerald-900">
                SUBJECT: Official Letter of Commendation & Service Reference for {profile.name}
              </div>
            </div>

            {/* Body */}
            <div className="space-y-4 text-slate-700">
              <p>
                It is an immense privilege to provide this official letter of commendation for <strong>{profile.name}</strong> on behalf of the Global Volunteer Alliance and our community partner organizations.
              </p>

              <p>
                Over the course of her involvement, Maya has contributed an outstanding total of <strong>{profile.totalHours} verified service hours</strong> across 14 separate civic initiatives, including regional food pantry distribution with Cascadia Community Food Relief, coastal dune conservation with the Puget Sound Environmental Trust, and youth mentorship workshops.
              </p>

              <p>
                Maya has continually demonstrated exemplary dependability, empathy, and initiative. She currently maintains a <strong>100% attendance and punctuality rate</strong>. Event organizers frequently commend her capacity to work seamlessly alongside diverse groups of participants and step into leadership positions during high-volume operations.
              </p>

              <p>
                Her tireless volunteer efforts have directly impacted hundreds of local community members, from assembling emergency grocery hampers to safeguarding Pacific Northwest ecosystems. In recognition of these achievements, Maya was awarded the <em>Golden Heart Champion Milestone</em>.
              </p>

              <p>
                We recommend Maya Chen with the highest degree of confidence for any academic program, scholarship, or professional opportunity. Her work ethic and dedication to community upliftment represent the highest standards of civic leadership.
              </p>
            </div>

            {/* Sign-off */}
            <div className="pt-6 space-y-4">
              <p>Sincerely,</p>
              <div>
                <div className="font-serif italic text-lg text-slate-900 font-bold">
                  Dr. Julian Montgomery
                </div>
                <div className="text-xs font-bold text-slate-900">Dr. Julian Montgomery</div>
                <div className="text-[11px] text-slate-500">Executive Director, Global Volunteer Alliance</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
