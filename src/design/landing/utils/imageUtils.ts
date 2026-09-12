// @ts-nocheck

import React from 'react';

// Reliable, verified fallback images
export const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1593113630400-ea4288922497?w=1200&auto=format&fit=crop&q=80';
export const DEFAULT_GARDEN_IMAGE = 'https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=1200&auto=format&fit=crop&q=80';
export const DEFAULT_COMMUNITY_IMAGE = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop&q=80';
export const DEFAULT_AVATAR_IMAGE = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80';

/**
 * Gracefully handles image load errors by substituting with a reliable fallback
 */
export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackUrl: string = DEFAULT_FALLBACK_IMAGE
) => {
  const target = e.currentTarget;
  if (target.src !== fallbackUrl) {
    target.src = fallbackUrl;
  }
};
