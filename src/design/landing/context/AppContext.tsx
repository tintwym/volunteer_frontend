'use client';
// @ts-nocheck

import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useTheme } from '@/components/theme/ThemeProvider';
import { 
  PageView, 
  Language, 
  UserRole, 
  Opportunity, 
  CommunityNews, 
  GalleryPhoto, 
  PhotoStory, 
  CommunityEvent, 
  VolunteerStory, 
  Organization, 
  FeedPost, 
  VolunteerUser, 
  VolunteerApplication,
  ToastMessage,
  NotificationSettings
} from '../types';
import { translations, Translations } from '../i18n';
import { 
  INITIAL_OPPORTUNITIES, 
  INITIAL_NEWS, 
  INITIAL_PHOTOS, 
  INITIAL_PHOTO_STORIES, 
  INITIAL_EVENTS, 
  INITIAL_STORIES, 
  INITIAL_ORGANIZATIONS, 
  INITIAL_FEED_POSTS, 
  INITIAL_USER,
  INITIAL_APPLICATIONS
} from '../data/mockData';

interface AppContextType {
  page: PageView;
  setPage: (page: PageView) => void;
  selectedOpportunityId: string | null;
  setSelectedOpportunityId: (id: string | null) => void;
  selectedArticleId: string | null;
  setSelectedArticleId: (id: string | null) => void;
  selectedPhotoStoryId: string | null;
  setSelectedPhotoStoryId: (id: string | null) => void;
  selectedOrgId: string | null;
  setSelectedOrgId: (id: string | null) => void;
  
  opportunities: Opportunity[];
  newsArticles: CommunityNews[];
  photos: GalleryPhoto[];
  photoStories: PhotoStory[];
  events: CommunityEvent[];
  stories: VolunteerStory[];
  organizations: Organization[];
  feedPosts: FeedPost[];
  applications: VolunteerApplication[];
  setApplications: React.Dispatch<React.SetStateAction<VolunteerApplication[]>>;
  
  currentUser: VolunteerUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<VolunteerUser>>;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isLoggedIn: boolean;
  login: (provider: 'google' | 'github' | 'email', role?: UserRole, userData?: { name?: string; email?: string }) => void;
  logout: () => void;
  /** Clear session and open auth so the user can pick another account. */
  switchAccount: () => void;
  
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'signin' | 'signup';
  setAuthModalMode: (mode: 'signin' | 'signup') => void;
  openAuthModal: (mode?: 'signin' | 'signup') => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  opportunitySearchQuery: string;
  setOpportunitySearchQuery: (query: string) => void;
  isNotificationsModalOpen: boolean;
  setIsNotificationsModalOpen: (open: boolean) => void;
  isVolunteerApplyModalOpen: boolean;
  activeApplyOpportunity: Opportunity | null;
  openApplyModal: (opp: Opportunity) => void;
  closeApplyModal: () => void;
  submitApplication: (appData: { name: string; email: string; phone: string; note: string }) => void;
  
  toggleSaveOpportunity: (id: string) => void;
  joinEvent: (eventId: string) => void;
  createFeedPost: (post: { content: string; imageUrl?: string; category: string }) => void;
  toggleLikePost: (postId: string) => void;
  addCommentToPost: (postId: string, content: string) => void;
  
  lightboxPhoto: GalleryPhoto | null;
  openLightbox: (photo: GalleryPhoto) => void;
  closeLightbox: () => void;
  navigateLightbox: (direction: 'next' | 'prev') => void;
  
  isDarkMode: boolean;
  themePreference: 'light' | 'dark' | 'system';
  toggleDarkMode: () => void;
  setThemePreference: (theme: 'light' | 'dark' | 'system') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  
  // Organization CMS actions
  addOpportunity: (opp: Omit<Opportunity, 'id' | 'createdAt' | 'status'>) => void;
  updateOpportunity: (id: string, updates: Partial<Opportunity>) => void;
  archiveOpportunity: (id: string) => void;
  addNewsArticle: (news: Omit<CommunityNews, 'id' | 'viewsCount' | 'likesCount'>) => void;
  addPhoto: (photo: Omit<GalleryPhoto, 'id' | 'likes'>) => void;
  addEvent: (evt: Omit<CommunityEvent, 'id' | 'attendeesCount' | 'isJoined'>) => void;
  addStory: (story: Omit<VolunteerStory, 'id'>) => void;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [page, setPageInternal] = useState<PageView>('home');
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedPhotoStoryId, setSelectedPhotoStoryId] = useState<string | null>(null);
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);

  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => {
    const saved = localStorage.getItem('cg_opportunities');
    return saved ? JSON.parse(saved) : INITIAL_OPPORTUNITIES;
  });

  const [newsArticles, setNewsArticles] = useState<CommunityNews[]>(() => {
    const saved = localStorage.getItem('cg_news');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  const [photos, setPhotos] = useState<GalleryPhoto[]>(() => {
    const saved = localStorage.getItem('cg_photos');
    return saved ? JSON.parse(saved) : INITIAL_PHOTOS;
  });

  const [photoStories] = useState<PhotoStory[]>(INITIAL_PHOTO_STORIES);
  const [events, setEvents] = useState<CommunityEvent[]>(() => {
    const saved = localStorage.getItem('cg_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });
  const [stories, setStories] = useState<VolunteerStory[]>(INITIAL_STORIES);
  const [organizations, setOrganizations] = useState<Organization[]>(INITIAL_ORGANIZATIONS);
  
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>(() => {
    try {
      const saved = localStorage.getItem('cg_feed');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map(p => ({
            ...p,
            comments: Array.isArray(p.comments) ? p.comments : []
          }));
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_FEED_POSTS;
  });

  const [applications, setApplications] = useState<VolunteerApplication[]>(() => {
    try {
      const saved = localStorage.getItem('cg_applications');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_APPLICATIONS;
  });

  const [currentUser, setCurrentUser] = useState<VolunteerUser>(() => {
    try {
      const saved = localStorage.getItem('cg_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_USER,
          ...parsed,
          skills: Array.isArray(parsed.skills) ? parsed.skills : INITIAL_USER.skills,
          causesSupported: Array.isArray(parsed.causesSupported) ? parsed.causesSupported : INITIAL_USER.causesSupported,
          interests: Array.isArray(parsed.interests) ? parsed.interests : INITIAL_USER.interests,
          badges: Array.isArray(parsed.badges) ? parsed.badges : INITIAL_USER.badges,
          savedOpportunityIds: Array.isArray(parsed.savedOpportunityIds) ? parsed.savedOpportunityIds : INITIAL_USER.savedOpportunityIds,
          upcomingActivityIds: Array.isArray(parsed.upcomingActivityIds) ? parsed.upcomingActivityIds : INITIAL_USER.upcomingActivityIds,
          registeredOpportunityIds: Array.isArray(parsed.registeredOpportunityIds) 
            ? parsed.registeredOpportunityIds 
            : (INITIAL_USER.registeredOpportunityIds || ['opp-1', 'opp-3'])
        };
      }
    } catch {
      // fallback
    }
    return INITIAL_USER;
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('cg_is_logged_in') === 'true';
  });

  const [userRole, setUserRole] = useState<UserRole>(currentUser.role || 'volunteer');

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [opportunitySearchQuery, setOpportunitySearchQuery] = useState('');
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isVolunteerApplyModalOpen, setIsVolunteerApplyModalOpen] = useState(false);
  const [activeApplyOpportunity, setActiveApplyOpportunity] = useState<Opportunity | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);

  const {
    theme: themePreference,
    isDark: isDarkMode,
    setTheme: setThemePreference,
    cycleThemePreference,
  } = useTheme();

  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('cg_lang');
    if (saved === 'en' || saved === 'zh' || saved === 'ms' || saved === 'ta') {
      return saved as Language;
    }
    return 'en';
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toggleDarkMode = () => {
    cycleThemePreference();
  };

  // Sync state to local storage for persistent data
  useEffect(() => {
    localStorage.setItem('cg_opportunities', JSON.stringify(opportunities));
  }, [opportunities]);

  useEffect(() => {
    localStorage.setItem('cg_news', JSON.stringify(newsArticles));
  }, [newsArticles]);

  useEffect(() => {
    localStorage.setItem('cg_photos', JSON.stringify(photos));
  }, [photos]);

  useEffect(() => {
    localStorage.setItem('cg_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('cg_feed', JSON.stringify(feedPosts));
  }, [feedPosts]);

  useEffect(() => {
    localStorage.setItem('cg_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('cg_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const setPage = (newPage: PageView) => {
    setPageInternal(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('cg_lang', lang);
  };

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = 'toast-' + Date.now() + Math.random().toString(36).substr(2, 4);
    const durationMs = toast.durationMs ?? 5000;
    setToasts(prev => [...prev, { ...toast, id, durationMs, createdAt: Date.now() }]);
    setTimeout(() => {
      removeToast(id);
    }, durationMs);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const openAuthModal = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const login = (
    provider: 'google' | 'github' | 'email',
    role: UserRole = 'volunteer',
    userData?: { name?: string; email?: string }
  ) => {
    // OAuth placeholders still go through real auth pages
    if (provider === 'google' || provider === 'github') {
      window.location.href = '/login';
      return;
    }

    // Prototype 1-click: stay on landing so the profile dropdown works
    const demoRole =
      role === 'organization'
        ? 'ORGANIZER'
        : role === 'admin'
          ? 'VOLUNTEER_LEADER'
          : 'VOLUNTEER';

    void import('@/lib/auth').then(({ enterDemo }) => {
      enterDemo(demoRole);
    });

    setIsLoggedIn(true);
    localStorage.setItem('cg_is_logged_in', 'true');
    setUserRole(role);
    setCurrentUser(prev => ({
      ...prev,
      role: role,
      name: userData?.name || (role === 'organization' ? 'Marcus Vance (Green Roots)' : role === 'admin' ? 'Jordan Lee' : 'Alex Rivera'),
      email: userData?.email || (role === 'organization' ? 'marcus@greenroots.org' : role === 'admin' ? 'jordan.lee@commonground.org' : 'alex.rivera@commonground.org')
    }));
    setIsAuthModalOpen(false);
    addToast({
      type: 'success',
      title: 'Welcome to CommonGround!',
      message: `Signed in successfully via ${provider.toUpperCase()} as ${role}.`
    });
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('cg_is_logged_in', 'false');
    setIsAuthModalOpen(false);
    setPageInternal('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    addToast({
      type: 'info',
      title: 'Signed Out',
      message: 'You have been safely signed out. See you soon!',
      durationMs: 5000,
    });
  };

  const switchAccount = () => {
    setIsLoggedIn(false);
    localStorage.setItem('cg_is_logged_in', 'false');
    setPageInternal('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setAuthModalMode('signin');
    setIsAuthModalOpen(true);
    addToast({
      type: 'info',
      title: 'Switch Account',
      message: 'Sign in with a different account or use 1-click demo access.',
      durationMs: 4000,
    });
  };

  const openApplyModal = (opp: Opportunity) => {
    setActiveApplyOpportunity(opp);
    setIsVolunteerApplyModalOpen(true);
  };

  const closeApplyModal = () => {
    setIsVolunteerApplyModalOpen(false);
    setActiveApplyOpportunity(null);
  };

  const submitApplication = (appData: { name: string; email: string; phone: string; note: string }) => {
    if (!activeApplyOpportunity) return;

    // Decrement spots and mark in user's upcoming & registered
    setOpportunities(prev => prev.map(opp => {
      if (opp.id === activeApplyOpportunity.id) {
        return {
          ...opp,
          spotsAvailable: Math.max(0, opp.spotsAvailable - 1)
        };
      }
      return opp;
    }));

    setCurrentUser(prev => {
      const upcoming = prev.upcomingActivityIds || [];
      const registered = prev.registeredOpportunityIds || [];
      const alreadyIn = upcoming.includes(activeApplyOpportunity.id);
      return {
        ...prev,
        upcomingActivityIds: alreadyIn ? upcoming : [...upcoming, activeApplyOpportunity.id],
        registeredOpportunityIds: registered.includes(activeApplyOpportunity.id) ? registered : [...registered, activeApplyOpportunity.id],
        volunteerHours: (prev.volunteerHours || 0) + 3,
        totalHoursLogged: (prev.totalHoursLogged || prev.volunteerHours || 0) + 3
      };
    });

    // Record application in org dashboard records
    const newApp: VolunteerApplication = {
      id: 'app-' + Date.now(),
      opportunityId: activeApplyOpportunity.id,
      opportunityTitle: activeApplyOpportunity.title,
      name: appData.name,
      email: appData.email,
      phone: appData.phone,
      note: appData.note,
      status: 'confirmed',
      submittedAt: new Date().toISOString()
    };
    setApplications(prev => [newApp, ...(prev || [])]);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }

    addToast({
      type: 'success',
      title: 'Application Confirmed!',
      message: `You are officially registered for "${activeApplyOpportunity.title}". Check your email (${appData.email}) for shift instructions.`
    });

    closeApplyModal();
  };

  const toggleSaveOpportunity = (id: string) => {
    setCurrentUser(prev => {
      const savedList = prev.savedOpportunityIds || [];
      const isSaved = savedList.includes(id);
      const newSaved = isSaved 
        ? savedList.filter(item => item !== id)
        : [...savedList, id];
      
      addToast({
        type: 'info',
        title: isSaved ? 'Removed from Saved' : 'Saved for Later',
        message: isSaved 
          ? 'Opportunity removed from your bookmarked list.' 
          : 'Opportunity bookmarked! Access it anytime in your profile.'
      });

      return {
        ...prev,
        savedOpportunityIds: newSaved
      };
    });
  };

  const joinEvent = (eventId: string) => {
    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId) {
        const nextJoined = !evt.isJoined;
        addToast({
          type: 'success',
          title: nextJoined ? 'RSVP Confirmed!' : 'RSVP Cancelled',
          message: nextJoined 
            ? `You are attending "${evt.name}". A calendar invite has been queued.` 
            : `You cancelled your reservation for "${evt.name}".`
        });
        return {
          ...evt,
          isJoined: nextJoined,
          attendeesCount: nextJoined ? evt.attendeesCount + 1 : Math.max(0, evt.attendeesCount - 1)
        };
      }
      return evt;
    }));
  };

  const createFeedPost = (post: { content: string; imageUrl?: string; category: string }) => {
    const newPost: FeedPost = {
      id: 'post-' + Date.now(),
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorType: userRole === 'organization' ? 'organization' : 'volunteer',
      authorOrg: userRole === 'organization' ? 'Green Roots Urban Agriculture' : undefined,
      content: post.content,
      imageUrl: post.imageUrl,
      category: post.category,
      date: 'Just now',
      likes: 0,
      isLiked: false,
      commentsCount: 0,
      sharesCount: 0,
      comments: []
    };

    setFeedPosts(prev => [newPost, ...prev]);

    addToast({
      type: 'success',
      title: 'Post Published!',
      message: 'Your update is now live on the Community Feed.'
    });
  };

  const toggleLikePost = (postId: string) => {
    setFeedPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const isLiked = !p.isLiked;
        return {
          ...p,
          isLiked,
          likes: isLiked ? p.likes + 1 : Math.max(0, p.likes - 1)
        };
      }
      return p;
    }));
  };

  const addCommentToPost = (postId: string, content: string) => {
    if (!content.trim()) return;
    setFeedPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const newComment = {
          id: 'c-' + Date.now(),
          authorName: currentUser.name,
          authorAvatar: currentUser.avatar,
          content: content.trim(),
          date: 'Just now'
        };
        return {
          ...p,
          commentsCount: p.commentsCount + 1,
          comments: [...p.comments, newComment]
        };
      }
      return p;
    }));

    addToast({
      type: 'info',
      title: 'Comment Added',
      message: 'Your reply has been shared.'
    });
  };

  const openLightbox = (photo: GalleryPhoto) => {
    setLightboxPhoto(photo);
  };

  const closeLightbox = () => {
    setLightboxPhoto(null);
  };

  const navigateLightbox = (direction: 'next' | 'prev') => {
    if (!lightboxPhoto) return;
    const currentIndex = photos.findIndex(p => p.id === lightboxPhoto.id);
    if (currentIndex === -1) return;

    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= photos.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = photos.length - 1;

    setLightboxPhoto(photos[nextIndex]);
  };

  // CMS functions
  const addOpportunity = (opp: Omit<Opportunity, 'id' | 'createdAt' | 'status'>) => {
    const newOpp: Opportunity = {
      ...opp,
      id: 'opp-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    setOpportunities(prev => [newOpp, ...prev]);
    addToast({
      type: 'success',
      title: 'Opportunity Created!',
      message: `"${opp.title}" is now published and open for volunteer sign-ups.`
    });
  };

  const updateOpportunity = (id: string, updates: Partial<Opportunity>) => {
    setOpportunities(prev => prev.map(opp => opp.id === id ? { ...opp, ...updates } : opp));
    addToast({
      type: 'info',
      title: 'Opportunity Updated',
      message: 'Your modifications were saved.'
    });
  };

  const archiveOpportunity = (id: string) => {
    setOpportunities(prev => prev.map(opp => opp.id === id ? { ...opp, status: 'archived' } : opp));
    addToast({
      type: 'warning',
      title: 'Opportunity Archived',
      message: 'Opportunity moved to archives.'
    });
  };

  const addNewsArticle = (news: Omit<CommunityNews, 'id' | 'viewsCount' | 'likesCount'>) => {
    const newArticle: CommunityNews = {
      ...news,
      id: 'news-' + Date.now(),
      viewsCount: 1,
      likesCount: 0
    };
    setNewsArticles(prev => [newArticle, ...prev]);
    addToast({
      type: 'success',
      title: 'News Article Published!',
      message: `"${news.headline}" is now live on the Community News portal.`
    });
  };

  const addPhoto = (photo: Omit<GalleryPhoto, 'id' | 'likes'>) => {
    const newPhoto: GalleryPhoto = {
      ...photo,
      id: 'photo-' + Date.now(),
      likes: 0
    };
    setPhotos(prev => [newPhoto, ...prev]);
    addToast({
      type: 'success',
      title: 'Photo Uploaded!',
      message: 'Image added to Community in Action gallery.'
    });
  };

  const addEvent = (evt: Omit<CommunityEvent, 'id' | 'attendeesCount' | 'isJoined'>) => {
    const newEvt: CommunityEvent = {
      ...evt,
      id: 'event-' + Date.now(),
      attendeesCount: 1,
      isJoined: true
    };
    setEvents(prev => [newEvt, ...prev]);
    addToast({
      type: 'success',
      title: 'Event Scheduled!',
      message: `"${evt.name}" published. Registrations are open.`
    });
  };

  const addStory = (story: Omit<VolunteerStory, 'id'>) => {
    const newStory: VolunteerStory = {
      ...story,
      id: 'story-' + Date.now()
    };
    setStories(prev => [newStory, ...prev]);
    addToast({
      type: 'success',
      title: 'Story Added!',
      message: 'Inspiring volunteer narrative published.'
    });
  };

  const updateNotificationSettings = (settings: Partial<NotificationSettings>) => {
    setCurrentUser(prev => ({
      ...prev,
      notificationSettings: {
        ...prev.notificationSettings,
        ...settings
      }
    }));
    addToast({
      type: 'info',
      title: 'Preferences Saved',
      message: 'Your push notification and alert preferences have been updated.'
    });
  };

  const t = translations[language] || translations.en;

  return (
    <AppContext.Provider
      value={{
        page,
        setPage,
        selectedOpportunityId,
        setSelectedOpportunityId,
        selectedArticleId,
        setSelectedArticleId,
        selectedPhotoStoryId,
        setSelectedPhotoStoryId,
        selectedOrgId,
        setSelectedOrgId,
        
        opportunities,
        newsArticles,
        photos,
        photoStories,
        events,
        stories,
        organizations,
        feedPosts,
        applications,
        setApplications,
        
        currentUser,
        setCurrentUser,
        userRole,
        setUserRole,
        isLoggedIn,
        login,
        logout,
        switchAccount,
        
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openAuthModal,
        isSearchModalOpen,
        setIsSearchModalOpen,
        opportunitySearchQuery,
        setOpportunitySearchQuery,
        isNotificationsModalOpen,
        setIsNotificationsModalOpen,
        isVolunteerApplyModalOpen,
        activeApplyOpportunity,
        openApplyModal,
        closeApplyModal,
        submitApplication,
        
        toggleSaveOpportunity,
        joinEvent,
        createFeedPost,
        toggleLikePost,
        addCommentToPost,
        
        lightboxPhoto,
        openLightbox,
        closeLightbox,
        navigateLightbox,
        
        isDarkMode,
        themePreference,
        toggleDarkMode,
        setThemePreference,
        language,
        setLanguage,
        t,
        
        toasts,
        addToast,
        removeToast,
        
        addOpportunity,
        updateOpportunity,
        archiveOpportunity,
        addNewsArticle,
        addPhoto,
        addEvent,
        addStory,
        updateNotificationSettings
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
