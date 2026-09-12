'use client';
// @ts-nocheck

import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedOpportunitiesSection } from '../components/home/FeaturedOpportunitiesSection';
import { ImpactDashboardSection } from '../components/home/ImpactDashboardSection';
import { CommunityNewsSection } from '../components/home/CommunityNewsSection';
import { PhotoGallerySection } from '../components/home/PhotoGallerySection';
import { UpcomingEventsSection } from '../components/home/UpcomingEventsSection';
import { VolunteerStoriesSection } from '../components/home/VolunteerStoriesSection';
import { FeaturedOrganizationsSection } from '../components/home/FeaturedOrganizationsSection';
import { FinalCTASection } from '../components/home/FinalCTASection';
import { FadeInView } from '@/components/motion/ui';

export const HomePage: React.FC = () => {
  return (
    <div id="home-page-container" className="flex flex-col">
      <HeroSection />

      <FadeInView>
        <ImpactDashboardSection />
      </FadeInView>

      <FadeInView delay={0.05}>
        <FeaturedOpportunitiesSection />
      </FadeInView>

      <FadeInView delay={0.05}>
        <CommunityNewsSection />
      </FadeInView>

      <FadeInView delay={0.05}>
        <PhotoGallerySection />
      </FadeInView>

      <FadeInView delay={0.05}>
        <UpcomingEventsSection />
      </FadeInView>

      <FadeInView delay={0.05}>
        <VolunteerStoriesSection />
      </FadeInView>

      <FadeInView delay={0.05}>
        <FeaturedOrganizationsSection />
      </FadeInView>

      <FadeInView delay={0.08}>
        <FinalCTASection />
      </FadeInView>
    </div>
  );
};
