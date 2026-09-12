'use client';
// @ts-nocheck

import React from 'react';
import { useApp } from '../context/AppContext';
import { handleImageError, DEFAULT_COMMUNITY_IMAGE } from '../utils/imageUtils';
import { 
  ArrowLeft, 
  Quote, 
  MapPin, 
  Calendar, 
  Users, 
  Sparkles, 
  Camera, 
  HeartHandshake,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const PhotoStoryPage: React.FC = () => {
  const { setPage, openLightbox, opportunities, openApplyModal } = useApp();

  const storyPhotos = [
    {
      id: 'story-1',
      title: 'Dawn Briefing along Green River',
      caption: 'Organizers and first-time volunteer families receiving safety gear, high-vis vests, and biodegradable collection sacks.',
      imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop&q=80',
      photographer: 'Elena Rostova',
      location: 'Green River Trailhead'
    },
    {
      id: 'story-2',
      title: 'Youth Environmental Stewards',
      caption: 'High school students identifying and carefully cataloging microplastic pollution near the salmon spawning creek.',
      imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80',
      photographer: 'Marcus Chen',
      location: 'Wetland Sanctuary'
    },
    {
      id: 'story-3',
      title: 'Native Willow Sapling Planting',
      caption: 'Over 280 native willows planted along the eroded embankment to stabilize soil and prevent runoff during rainfall.',
      imageUrl: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=1200&auto=format&fit=crop&q=80',
      photographer: 'Elena Rostova',
      location: 'River Mile 4.2'
    },
    {
      id: 'story-4',
      title: 'The Triumphant Weigh-In',
      caption: 'Volunteers smiling at noon as the municipal scales recorded 4.2 tons of waste diverted from the watershed.',
      imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&auto=format&fit=crop&q=80',
      photographer: 'Elena Rostova',
      location: 'Eco-Sorting Staging Area'
    }
  ];

  return (
    <div id="photo-story-view" className="py-10 bg-white dark:bg-stone-900 min-h-screen transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <button
          onClick={() => setPage('gallery')}
          className="mb-6 inline-flex items-center gap-2 text-xs font-bold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Photo Gallery</span>
        </button>

        {/* Story Title & Meta */}
        <div className="space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
            <Camera className="w-3.5 h-3.5" />
            <span>Special Photo Feature</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-editorial text-stone-900 dark:text-stone-100 leading-tight">
            Community Cleanup Day 2026: Hands in the Water, Hope on the Riverbanks
          </h1>

          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl font-editorial">
            How 420 neighbors transformed an overlooked urban waterway in single morning, restoring 3 miles of wetland habitat and planting hundreds of trees.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800">
            <span className="flex items-center gap-1 text-stone-600 dark:text-stone-300 font-medium">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              <span>Saturday, May 16, 2026</span>
            </span>
            <span className="flex items-center gap-1 text-stone-600 dark:text-stone-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Green River Watershed</span>
            </span>
            <span>Photography by Elena Rostova & Marcus Chen</span>
          </div>
        </div>

        {/* Impact Numbers Infographic Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-3xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 mb-12">
          <div className="text-center">
            <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              420
            </span>
            <span className="text-xs text-stone-500 font-medium">Volunteers Joined</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl sm:text-3xl font-extrabold text-teal-600 dark:text-teal-400">
              4.2 Tons
            </span>
            <span className="text-xs text-stone-500 font-medium">Debris Removed</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              3 Miles
            </span>
            <span className="text-xs text-stone-500 font-medium">Shoreline Restored</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">
              280
            </span>
            <span className="text-xs text-stone-500 font-medium">Trees Planted</span>
          </div>
        </div>

        {/* Photo 1 - Hero */}
        <div className="space-y-3 mb-12">
          <div 
            onClick={() => openLightbox({
              id: 'story-1',
              title: storyPhotos[0].title,
              caption: storyPhotos[0].caption,
              imageUrl: storyPhotos[0].imageUrl,
              date: 'May 16, 2026',
              location: storyPhotos[0].location,
              organization: 'Green River Coalition',
              photographer: storyPhotos[0].photographer,
              likes: 128,
              category: 'Environmental Projects'
            })}
            className="rounded-3xl overflow-hidden shadow-lg cursor-pointer max-h-[500px] group relative bg-stone-800"
          >
            <img
              src={storyPhotos[0].imageUrl}
              alt={storyPhotos[0].title}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              referrerPolicy="no-referrer"
              onError={(e) => handleImageError(e, DEFAULT_COMMUNITY_IMAGE)}
            />
            <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1">
              <span>Click to enlarge</span>
            </div>
          </div>
          <div className="text-xs text-stone-500 flex justify-between">
            <span className="italic">“{storyPhotos[0].caption}”</span>
            <span className="shrink-0 font-medium">Photo: {storyPhotos[0].photographer}</span>
          </div>
        </div>

        {/* Narrative Paragraph */}
        <div className="prose prose-stone dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed space-y-4 mb-10 text-stone-800 dark:text-stone-200">
          <p>
            At 7:45 AM, thick river fog still hung low over the water when the first wave of volunteers arrived with thermoses, work boots, and garden shears. For many in the district, this stretch of river had long been seen as a neglected industrial drainage ditch. But within three hours, it transformed into an engine of civic stewardship.
          </p>
        </div>

        {/* Pull Quote */}
        <div className="my-10 p-6 sm:p-8 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border-l-4 border-emerald-500">
          <Quote className="w-8 h-8 text-emerald-600/40 dark:text-emerald-400/30 mb-2" />
          <p className="text-base sm:text-lg font-editorial font-bold text-stone-900 dark:text-stone-100 leading-snug">
            “My nine-year-old daughter asked me this morning why strangers were coming out to pick up trash they didn't drop. By noon, she had filled two buckets herself and said: 'Dad, this river belongs to us, doesn't it?' That is what community means.”
          </p>
          <div className="mt-3 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            — David Ramirez, Volunteer Crew Leader
          </div>
        </div>

        {/* Side-by-Side Photos 2 & 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-10">
          <div className="space-y-2">
            <div 
              onClick={() => openLightbox({
                id: 'story-2',
                title: storyPhotos[1].title,
                caption: storyPhotos[1].caption,
                imageUrl: storyPhotos[1].imageUrl,
                date: 'May 16, 2026',
                location: storyPhotos[1].location,
                organization: 'Green River Coalition',
                photographer: storyPhotos[1].photographer,
                likes: 84,
                category: 'Workshops'
              })}
              className="rounded-2xl overflow-hidden shadow-md cursor-pointer h-64 group relative bg-stone-800"
            >
              <img
                src={storyPhotos[1].imageUrl}
                alt={storyPhotos[1].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
                onError={(e) => handleImageError(e, DEFAULT_COMMUNITY_IMAGE)}
              />
            </div>
            <p className="text-xs text-stone-500 italic leading-relaxed">
              {storyPhotos[1].caption}
            </p>
          </div>

          <div className="space-y-2">
            <div 
              onClick={() => openLightbox({
                id: 'story-3',
                title: storyPhotos[2].title,
                caption: storyPhotos[2].caption,
                imageUrl: storyPhotos[2].imageUrl,
                date: 'May 16, 2026',
                location: storyPhotos[2].location,
                organization: 'Green River Coalition',
                photographer: storyPhotos[2].photographer,
                likes: 92,
                category: 'Environmental Projects'
              })}
              className="rounded-2xl overflow-hidden shadow-md cursor-pointer h-64 group relative bg-stone-800"
            >
              <img
                src={storyPhotos[2].imageUrl}
                alt={storyPhotos[2].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
                onError={(e) => handleImageError(e, DEFAULT_COMMUNITY_IMAGE)}
              />
            </div>
            <p className="text-xs text-stone-500 italic leading-relaxed">
              {storyPhotos[2].caption}
            </p>
          </div>
        </div>

        {/* Narrative Closing */}
        <div className="prose prose-stone dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed space-y-4 mb-12 text-stone-800 dark:text-stone-200">
          <p>
            By midday, the riverbank looked unrecognizably clear. Native willow saplings stood tall against the spring sun, their roots already poised to hold the riverbank together against winter rains. Over 40 bags of recyclable plastics were separated for city reclaim centers, and water clarity tests demonstrated immediate improvements in dissolved oxygen.
          </p>
        </div>

        {/* Related Shifts CTA */}
        <div className="p-8 rounded-3xl bg-gradient-to-tr from-emerald-900 to-teal-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next River Cleanup Day: June 20, 2026</span>
            </div>
            <h3 className="text-2xl font-bold font-editorial">
              Join the Next River Stewardship Crew
            </h3>
            <p className="text-xs text-emerald-100 max-w-md leading-relaxed">
              Open to all ages and experience levels. We supply work gloves, litter pickers, and hot lunch for all registered helpers.
            </p>
          </div>

          <button
            onClick={() => setPage('opportunities')}
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 text-xs font-bold transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <span>Register for River Cleanup</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
