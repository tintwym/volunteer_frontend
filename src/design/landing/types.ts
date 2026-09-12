// @ts-nocheck

export type Language = 'en' | 'zh' | 'ms' | 'ta';

export type UserRole = 'volunteer' | 'organization' | 'admin';

export type PageView = 
  | 'home'
  | 'opportunities'
  | 'opportunity-detail'
  | 'news'
  | 'news-article'
  | 'gallery'
  | 'photo-story'
  | 'events'
  | 'stories'
  | 'organizations'
  | 'organization-profile'
  | 'profile'
  | 'org-dashboard';

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  organizationId: string;
  orgLogo: string;
  location: string;
  address?: string;
  isRemote: boolean;
  date: string;
  timeCommitment: string;
  cause: string;
  skillsRequired: string[];
  spotsAvailable: number;
  totalSpots: number;
  shortDescription: string;
  longDescription: string;
  requirements?: string[];
  imageUrl: string;
  urgency?: 'urgent' | 'regular' | 'flexible';
  createdAt: string;
  status: 'active' | 'archived' | 'draft';
}

export interface CommunityNews {
  id: string;
  headline: string;
  summary: string;
  content: string;
  category: string;
  publicationDate: string;
  author: string;
  authorRole: string;
  organization: string;
  orgLogo: string;
  imageUrl: string;
  readTime: string;
  relatedOpportunityIds: string[];
  relatedPhotoUrls: string[];
  tags: string[];
  viewsCount: number;
  likesCount: number;
  isFeatured?: boolean;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  caption: string;
  date: string;
  location: string;
  organization: string;
  photographer: string;
  imageUrl: string;
  category: string;
  eventId?: string;
  albumTitle?: string;
  aspectRatio?: 'tall' | 'wide' | 'square';
  likes: number;
}

export interface PhotoStory {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  date: string;
  location: string;
  organization: string;
  intro: string;
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
  impactStats: { label: string; value: string }[];
  photos: {
    url: string;
    caption: string;
    credit: string;
  }[];
  fullStory: string;
  relatedNewsIds: string[];
  relatedOpportunityIds: string[];
}

export interface CommunityEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  isOnline: boolean;
  organizer: string;
  organizerLogo: string;
  description: string;
  attendeesCount: number;
  maxAttendees?: number;
  imageUrl: string;
  category: string;
  isJoined?: boolean;
}

export interface VolunteerStory {
  id: string;
  name: string;
  volunteerRole: string;
  volunteerPhoto: string;
  organization: string;
  storyTitle: string;
  shortIntroduction: string;
  fullStory: string;
  quote: string;
  timeServed: string;
  impactCreated: string;
  relatedOpportunityIds: string[];
}

export interface Organization {
  id: string;
  name: string;
  logo: string;
  coverPhoto: string;
  mission: string;
  about: string;
  location: string;
  website: string;
  email: string;
  phone: string;
  opportunitiesCount: number;
  causes: string[];
  verified: boolean;
  impactStats: { label: string; value: string }[];
}

export interface FeedComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  date: string;
  author?: string;
  text?: string;
}

export interface FeedPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorType: 'volunteer' | 'organization';
  authorOrg?: string;
  content: string;
  imageUrl?: string;
  category: string;
  date: string;
  likes: number;
  isLiked?: boolean;
  commentsCount: number;
  sharesCount: number;
  comments: FeedComment[];
  author?: string;
  authorRole?: string;
  shares?: number;
}

export interface VolunteerApplication {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  name: string;
  email: string;
  phone: string;
  note?: string;
  status: 'confirmed' | 'pending' | 'reviewed';
  submittedAt: string;
}

export interface Badge {
  id: string;
  title: string;
  iconName: string;
  description: string;
  earnedDate: string;
  color: string;
}

export interface NotificationSettings {
  emailUpdates: boolean;
  pushEnabled: boolean;
  opportunityAlerts: boolean;
  eventReminders: boolean;
  impactDigest: boolean;
  sound: boolean;
}

export interface VolunteerUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  availability?: string;
  location: string;
  role: UserRole;
  interests: string[];
  skills: string[];
  causesSupported: string[];
  volunteerHours: number;
  totalHoursLogged?: number;
  completedOpportunitiesCount: number;
  badges: Badge[];
  savedOpportunityIds: string[];
  registeredOpportunityIds?: string[];
  upcomingActivityIds: string[];
  contributedPhotos: string[];
  impactProfile: {
    hoursThisMonth: number;
    impactScore: number;
    mealsPacked: number;
    treesPlanted: number;
    studentsTutored: number;
  };
  notificationSettings: NotificationSettings;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}
