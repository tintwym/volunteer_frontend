'use client';
// @ts-nocheck

import React, { useMemo, useState } from 'react';
import {
  FileText,
  Users,
  Clock,
  CalendarCheck,
  UserCheck,
  Award,
  ShieldAlert,
  Download,
  FileSpreadsheet,
  FileType2,
  Search,
} from 'lucide-react';
import { ReportMetrics, User } from '../types';

type ReportFormat = 'pdf' | 'excel' | 'csv';

interface VolunteerReportType {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ElementType;
  accent: string;
  iconWrap: string;
  columns: string[];
  rows: (string | number)[][];
}

interface ReportingViewProps {
  metrics?: ReportMetrics;
  currentUser?: User;
}

function downloadBlob(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function toCsv(columns: string[], rows: (string | number)[][]) {
  const escape = (value: string | number) => {
    const text = String(value ?? '');
    if (/[",\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
    return text;
  };
  return [columns.map(escape).join(','), ...rows.map((row) => row.map(escape).join(','))].join('\n');
}

function toExcelXml(title: string, columns: string[], rows: (string | number)[][]) {
  const headerCells = columns
    .map((col) => `<Cell><Data ss:Type="String">${escapeXml(col)}</Data></Cell>`)
    .join('');
  const bodyRows = rows
    .map((row) => {
      const cells = row
        .map((cell) => {
          const isNumber = typeof cell === 'number';
          return `<Cell><Data ss:Type="${isNumber ? 'Number' : 'String'}">${escapeXml(String(cell ?? ''))}</Data></Cell>`;
        })
        .join('');
      return `<Row>${cells}</Row>`;
    })
    .join('');

  return `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <Worksheet ss:Name="${escapeXml(title.slice(0, 31))}">
  <Table>
   <Row>${headerCells}</Row>
   ${bodyRows}
  </Table>
 </Worksheet>
</Workbook>`;
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function downloadPdf(report: VolunteerReportType) {
  const rowsHtml = report.rows
    .map(
      (row) =>
        `<tr>${row.map((cell) => `<td style="padding:8px;border-bottom:1px solid #e2e8f0;font-size:12px;">${escapeXml(String(cell ?? ''))}</td>`).join('')}</tr>`
    )
    .join('');
  const headersHtml = report.columns
    .map(
      (col) =>
        `<th style="text-align:left;padding:8px;border-bottom:2px solid #0f766e;font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:#64748b;">${escapeXml(col)}</th>`
    )
    .join('');

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${escapeXml(report.title)}</title>
  <style>
    body { font-family: Inter, Arial, sans-serif; color: #0f172a; padding: 32px; }
    h1 { font-size: 22px; margin: 0 0 4px; }
    p { color: #64748b; font-size: 13px; margin: 0 0 24px; }
    table { width: 100%; border-collapse: collapse; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body>
  <h1>${escapeXml(report.title)}</h1>
  <p>${escapeXml(report.description)} · Generated ${new Date().toLocaleString()}</p>
  <table>
    <thead><tr>${headersHtml}</tr></thead>
    <tbody>${rowsHtml}</tbody>
  </table>
  <script>window.onload = function () { window.print(); };</script>
</body>
</html>`;

  const win = window.open('', '_blank');
  if (!win) return;
  win.document.open();
  win.document.write(html);
  win.document.close();
}

export const ReportingView: React.FC<ReportingViewProps> = ({
  metrics: propMetrics,
  currentUser,
}) => {
  const [query, setQuery] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const metrics = propMetrics || {
    totalHours: 1240,
    activeVolunteers: 185,
    totalShiftsCompleted: 312,
    fulfillmentRate: 94,
    economicImpactValue: 41527,
    retentionRate: 88,
    monthlyTrends: [],
    causeDistribution: [],
    topVolunteers: [],
  };

  const reports: VolunteerReportType[] = useMemo(
    () => [
      {
        id: 'hours-by-volunteer',
        title: 'Volunteer Hours Summary',
        description: 'Verified service hours logged per volunteer for the selected period.',
        category: 'Hours',
        icon: Clock,
        accent: 'text-emerald-700',
        iconWrap: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        columns: ['Volunteer', 'Hours Logged', 'Shifts Completed', 'Badges Earned', 'Primary Cause'],
        rows: (metrics.topVolunteers || []).map((v) => [
          v.name,
          v.hours,
          v.shiftsCount,
          v.badgeCount,
          v.recentCause,
        ]),
      },
      {
        id: 'active-roster',
        title: 'Active Volunteer Roster',
        description: 'Current volunteer pool with engagement status and retention signals.',
        category: 'Roster',
        icon: Users,
        accent: 'text-teal-700',
        iconWrap: 'bg-teal-50 text-teal-700 border-teal-100',
        columns: ['Metric', 'Value'],
        rows: [
          ['Active volunteers', metrics.activeVolunteers],
          ['6-month retention rate (%)', metrics.retentionRate],
          ['Total service hours (YTD)', metrics.totalHours],
          ['Prepared by', currentUser?.name || 'Organizer'],
        ],
      },
      {
        id: 'attendance-fulfillment',
        title: 'Attendance & Shift Fulfillment',
        description: 'Shift completion rates and attendance outcomes across volunteer sessions.',
        category: 'Attendance',
        icon: UserCheck,
        accent: 'text-indigo-700',
        iconWrap: 'bg-indigo-50 text-indigo-700 border-indigo-100',
        columns: ['Metric', 'Value'],
        rows: [
          ['Shift fulfillment rate (%)', metrics.fulfillmentRate],
          ['Completed community sessions', metrics.totalShiftsCompleted],
          ['Active volunteer pool', metrics.activeVolunteers],
        ],
      },
      {
        id: 'monthly-hours-trend',
        title: 'Monthly Volunteer Hours Trend',
        description: 'Month-by-month volunteer hours and participation for planning and audits.',
        category: 'Trends',
        icon: CalendarCheck,
        accent: 'text-sky-700',
        iconWrap: 'bg-sky-50 text-sky-700 border-sky-100',
        columns: ['Month', 'Hours Served', 'Volunteers Participating'],
        rows: (metrics.monthlyTrends || []).map((m) => [m.month, m.hours, m.volunteers]),
      },
      {
        id: 'cause-distribution',
        title: 'Hours by Cause / Program',
        description: 'Volunteer hour distribution across cause areas and program tracks.',
        category: 'Programs',
        icon: FileText,
        accent: 'text-amber-700',
        iconWrap: 'bg-amber-50 text-amber-700 border-amber-100',
        columns: ['Cause', 'Hours', 'Volunteers', 'Share (%)'],
        rows: (metrics.causeDistribution || []).map((c) => [
          c.cause,
          c.hours,
          c.volunteersCount,
          c.percentage,
        ]),
      },
      {
        id: 'recognition-milestones',
        title: 'Recognition & Badge Milestones',
        description: 'Top volunteers approaching or earning recognition milestones.',
        category: 'Recognition',
        icon: Award,
        accent: 'text-rose-700',
        iconWrap: 'bg-rose-50 text-rose-700 border-rose-100',
        columns: ['Rank', 'Volunteer', 'Hours', 'Badges', 'Focus Area'],
        rows: (metrics.topVolunteers || []).map((v) => [
          v.rank,
          v.name,
          v.hours,
          v.badgeCount,
          v.recentCause,
        ]),
      },
      {
        id: 'incident-volunteer-impact',
        title: 'Volunteer Safety Incidents Overview',
        description: 'High-level volunteer-related incident counts for compliance reporting.',
        category: 'Safety',
        icon: ShieldAlert,
        accent: 'text-slate-700',
        iconWrap: 'bg-slate-100 text-slate-700 border-slate-200',
        columns: ['Item', 'Detail'],
        rows: [
          ['Report scope', 'Volunteer-facing incidents'],
          ['Recommended follow-up', 'Review open incident queue in Incident Management'],
          ['Generated for', currentUser?.name || 'Organizer'],
        ],
      },
    ],
    [metrics, currentUser]
  );

  const filtered = reports.filter((report) => {
    const haystack = `${report.title} ${report.description} ${report.category}`.toLowerCase();
    return haystack.includes(query.trim().toLowerCase());
  });

  const handleDownload = (report: VolunteerReportType, format: ReportFormat) => {
    setDownloadingId(`${report.id}-${format}`);
    const stamp = new Date().toISOString().slice(0, 10);
    const base = `${report.id}_${stamp}`;

    try {
      if (format === 'csv') {
        downloadBlob(toCsv(report.columns, report.rows), `${base}.csv`, 'text/csv;charset=utf-8;');
      } else if (format === 'excel') {
        downloadBlob(
          toExcelXml(report.title, report.columns, report.rows),
          `${base}.xls`,
          'application/vnd.ms-excel;charset=utf-8;'
        );
      } else {
        downloadPdf(report);
      }
    } finally {
      window.setTimeout(() => setDownloadingId(null), 400);
    }
  };

  return (
    <div id="reporting-container" className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight dark:text-slate-100">
              Reports & Analytics
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl dark:text-slate-400">
              Download volunteer-focused operational reports as PDF, Excel, or CSV for audits, board packs, and partner sharing.
            </p>
          </div>
          <div className="relative w-full max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search report types..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((report) => {
          const Icon = report.icon;
          return (
            <article
              key={report.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4 dark:bg-slate-900 dark:border-slate-800"
            >
              <div className="flex items-start gap-3">
                <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 ${report.iconWrap}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className={`text-[10px] font-extrabold uppercase tracking-wider ${report.accent}`}>
                    {report.category}
                  </p>
                  <h2 className="text-sm font-bold text-slate-900 mt-0.5 dark:text-slate-100">
                    {report.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed dark:text-slate-400">
                    {report.description}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2 text-[11px] text-slate-500 dark:bg-slate-800/60 dark:border-slate-700 dark:text-slate-400">
                {report.rows.length} row{report.rows.length === 1 ? '' : 's'} · {report.columns.length} columns
              </div>

              <div className="mt-auto grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleDownload(report, 'pdf')}
                  disabled={downloadingId === `${report.id}-pdf`}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-60 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  title="Download PDF"
                >
                  <FileType2 className="w-3.5 h-3.5 text-rose-600" />
                  PDF
                </button>
                <button
                  type="button"
                  onClick={() => handleDownload(report, 'excel')}
                  disabled={downloadingId === `${report.id}-excel`}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-60 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  title="Download Excel"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  Excel
                </button>
                <button
                  type="button"
                  onClick={() => handleDownload(report, 'csv')}
                  disabled={downloadingId === `${report.id}-csv`}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-60 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  title="Download CSV"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-600" />
                  CSV
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
          No volunteer reports match “{query}”.
        </div>
      )}
    </div>
  );
};
