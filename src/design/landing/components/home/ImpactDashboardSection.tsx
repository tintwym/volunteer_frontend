'use client';
// @ts-nocheck

import React, { useEffect, useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Building2, HeartHandshake, Clock, Sparkles } from 'lucide-react';

interface StatItem {
  target: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

export const ImpactDashboardSection: React.FC = () => {
  const { t } = useApp();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0, 0]);

  const stats: StatItem[] = [
    {
      target: 10000,
      suffix: '+',
      label: t.impact.volunteers,
      icon: <Users className="w-6 h-6" />,
      color: 'from-emerald-500 to-teal-600'
    },
    {
      target: 500,
      suffix: '+',
      label: t.impact.organizations,
      icon: <Building2 className="w-6 h-6" />,
      color: 'from-teal-500 to-cyan-600'
    },
    {
      target: 2500,
      suffix: '+',
      label: t.impact.opportunities,
      icon: <HeartHandshake className="w-6 h-6" />,
      color: 'from-emerald-600 to-green-700'
    },
    {
      target: 50000,
      suffix: '+',
      label: t.impact.hours,
      icon: <Clock className="w-6 h-6" />,
      color: 'from-amber-500 to-orange-600'
    },
    {
      target: 100,
      suffix: '+',
      label: t.impact.projects,
      icon: <Sparkles className="w-6 h-6" />,
      color: 'from-indigo-500 to-purple-600'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1800; // ms
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCounts(stats.map(s => Math.floor(easeOut * s.target)));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts(stats.map(s => s.target));
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, stats]);

  return (
    <section 
      id="impact-dashboard-section"
      ref={sectionRef}
      className="py-16 bg-white dark:bg-stone-900 border-y border-stone-200/80 dark:border-stone-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Real Community Metrics
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-stone-900 dark:text-stone-100 mt-1">
            {t.impact.title}
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-2 leading-relaxed">
            {t.impact.subtitle}
          </p>
        </div>

        {/* 5 Impact Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`relative overflow-hidden p-5 sm:p-6 rounded-2xl border border-stone-200/90 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-850 transition-all hover:shadow-md hover:-translate-y-0.5 group ${
                index === 4 ? 'col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${stat.color} text-white flex items-center justify-center shadow-sm`}>
                  {stat.icon}
                </div>
              </div>

              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 font-sans tracking-tight">
                {counts[index].toLocaleString()}
                <span className="text-emerald-600 dark:text-emerald-400">{stat.suffix}</span>
              </div>

              <div className="text-xs font-medium text-stone-600 dark:text-stone-300 mt-1 leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
