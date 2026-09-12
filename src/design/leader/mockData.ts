// @ts-nocheck

import {
  Volunteer,
  ShiftEvent,
  Badge,
  ChatChannel,
  ChatMessage,
  AutomatedEmailTemplate,
  EmailLogEntry,
  CertificateRecord
} from './types';

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'b-bronze-25',
    name: 'Bronze Impact (25+ Hrs)',
    iconName: 'Award',
    description: 'Awarded for completing 25 hours of active service.',
    hoursRequired: 25,
    category: 'Milestone'
  },
  {
    id: 'b-silver-50',
    name: 'Silver Pillar (50+ Hrs)',
    iconName: 'Medal',
    description: 'Awarded for surpassing 50 dedicated community service hours.',
    hoursRequired: 50,
    category: 'Milestone'
  },
  {
    id: 'b-century-100',
    name: 'Century Hero (100+ Hrs)',
    iconName: 'Trophy',
    description: 'Prestigious recognition for 100+ verified community service hours.',
    hoursRequired: 100,
    category: 'Milestone'
  },
  {
    id: 'b-gold-250',
    name: 'Golden Champion (250+ Hrs)',
    iconName: 'Crown',
    description: 'Outstanding civic dedication with over 250 verified hours.',
    hoursRequired: 250,
    category: 'Milestone'
  },
  {
    id: 'b-first-aid',
    name: 'Safety & First Aid Lead',
    iconName: 'HeartHandshake',
    description: 'Certified in emergency response and first aid on-site.',
    hoursRequired: 0,
    category: 'Skill'
  },
  {
    id: 'b-shift-anchor',
    name: 'Reliability Anchor',
    iconName: 'ShieldCheck',
    description: 'Achieved 100% attendance rate across 10 consecutive scheduled events.',
    hoursRequired: 0,
    category: 'Reliability'
  },
  {
    id: 'b-team-captain',
    name: 'Squad Leader',
    iconName: 'Sparkles',
    description: 'Successfully coordinated and mentored new volunteer cohorts.',
    hoursRequired: 30,
    category: 'Leadership'
  }
];

export const INITIAL_VOLUNTEERS: Volunteer[] = [
  {
    id: 'vol-1',
    name: 'Elena Rostova',
    email: 'elena.rostova@example.org',
    phone: '(555) 234-8901',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Team Lead',
    status: 'Active',
    totalHours: 124,
    verifiedHours: 118,
    pendingHours: 6,
    joinedDate: '2024-03-12',
    skills: ['Food Handling', 'Event Logistics', 'Spanish Bilingual', 'First Aid / CPR'],
    emergencyContact: {
      name: 'Mikhail Rostova',
      phone: '(555) 998-1122',
      relationship: 'Spouse'
    },
    backgroundCheckStatus: 'Approved',
    badges: [
      INITIAL_BADGES[0],
      INITIAL_BADGES[1],
      INITIAL_BADGES[2],
      INITIAL_BADGES[4],
      INITIAL_BADGES[6]
    ],
    attendanceRate: 98,
    shiftsCompleted: 28,
    notes: 'Exceptional shift supervisor for Saturday food bank distributions. Highly dependable.'
  },
  {
    id: 'vol-2',
    name: 'Marcus Vance',
    email: 'marcus.v@example.org',
    phone: '(555) 431-7721',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'Volunteer',
    status: 'Active',
    totalHours: 62,
    verifiedHours: 58,
    pendingHours: 4,
    joinedDate: '2024-06-18',
    skills: ['Driver / Van', 'Logistics', 'Youth Mentorship'],
    emergencyContact: {
      name: 'Tanya Vance',
      phone: '(555) 782-9011',
      relationship: 'Sister'
    },
    backgroundCheckStatus: 'Approved',
    badges: [
      INITIAL_BADGES[0],
      INITIAL_BADGES[1],
      INITIAL_BADGES[5]
    ],
    attendanceRate: 95,
    shiftsCompleted: 15,
    notes: 'Always volunteers for early transport shifts with city shelter van.'
  },
  {
    id: 'vol-3',
    name: 'Amina Al-Mansoor',
    email: 'amina.mansoor@example.org',
    phone: '(555) 872-3341',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    role: 'Specialist',
    status: 'Active',
    totalHours: 210,
    verifiedHours: 205,
    pendingHours: 5,
    joinedDate: '2023-11-04',
    skills: ['First Aid / CPR', 'Crisis Support', 'Elder Care', 'Arabic Bilingual'],
    emergencyContact: {
      name: 'Dr. Tariq Mansoor',
      phone: '(555) 321-4490',
      relationship: 'Father'
    },
    backgroundCheckStatus: 'Approved',
    badges: [
      INITIAL_BADGES[0],
      INITIAL_BADGES[1],
      INITIAL_BADGES[2],
      INITIAL_BADGES[4],
      INITIAL_BADGES[5]
    ],
    attendanceRate: 100,
    shiftsCompleted: 44,
    notes: 'Registered nurse who supervises health screening clinics and senior wellness.'
  },
  {
    id: 'vol-4',
    name: 'Jordan Rivera',
    email: 'jordan.rivera@example.org',
    phone: '(555) 609-1223',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'Volunteer',
    status: 'Active',
    totalHours: 32,
    verifiedHours: 28,
    pendingHours: 4,
    joinedDate: '2024-09-02',
    skills: ['Park Revitalization', 'Carpentry', 'Heavy Lifting'],
    emergencyContact: {
      name: 'Lucia Rivera',
      phone: '(555) 441-9988',
      relationship: 'Mother'
    },
    backgroundCheckStatus: 'Approved',
    badges: [
      INITIAL_BADGES[0]
    ],
    attendanceRate: 92,
    shiftsCompleted: 8,
    notes: 'Key helper on urban garden build projects and trail maintenance.'
  },
  {
    id: 'vol-5',
    name: 'Chloe Bennett',
    email: 'chloe.bennett@example.org',
    phone: '(555) 912-7782',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    role: 'New Recruit',
    status: 'On-boarding',
    totalHours: 8,
    verifiedHours: 4,
    pendingHours: 4,
    joinedDate: '2025-01-14',
    skills: ['Social Media', 'Event Logistics', 'Youth Mentorship'],
    emergencyContact: {
      name: 'Samuel Bennett',
      phone: '(555) 231-0091',
      relationship: 'Brother'
    },
    backgroundCheckStatus: 'Pending',
    badges: [],
    attendanceRate: 100,
    shiftsCompleted: 2,
    notes: 'Orientation completed. Awaiting final background check verification.'
  },
  {
    id: 'vol-6',
    name: 'David Cho',
    email: 'david.cho@example.org',
    phone: '(555) 542-8819',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    role: 'Volunteer',
    status: 'Active',
    totalHours: 88,
    verifiedHours: 82,
    pendingHours: 6,
    joinedDate: '2024-04-10',
    skills: ['Food Handling', 'Inventory Systems', 'Korean Bilingual'],
    emergencyContact: {
      name: 'Grace Cho',
      phone: '(555) 887-1245',
      relationship: 'Spouse'
    },
    backgroundCheckStatus: 'Approved',
    badges: [
      INITIAL_BADGES[0],
      INITIAL_BADGES[1]
    ],
    attendanceRate: 94,
    shiftsCompleted: 21,
    notes: 'Handles food pantry stock receiving and refrigeration inventory.'
  },
  {
    id: 'vol-7',
    name: 'Priya Patel',
    email: 'priya.patel@example.org',
    phone: '(555) 349-1120',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    role: 'Specialist',
    status: 'Active',
    totalHours: 145,
    verifiedHours: 140,
    pendingHours: 5,
    joinedDate: '2023-09-15',
    skills: ['Youth Mentorship', 'Math Tutoring', 'Spanish Bilingual'],
    emergencyContact: {
      name: 'Raj Patel',
      phone: '(555) 901-2233',
      relationship: 'Parent'
    },
    backgroundCheckStatus: 'Approved',
    badges: [
      INITIAL_BADGES[0],
      INITIAL_BADGES[1],
      INITIAL_BADGES[2],
      INITIAL_BADGES[6]
    ],
    attendanceRate: 96,
    shiftsCompleted: 35,
    notes: 'Leads the after-school homework club and STEM activity tables.'
  },
  {
    id: 'vol-8',
    name: 'Lucas Morales',
    email: 'lucas.m@example.org',
    phone: '(555) 776-4321',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    role: 'Volunteer',
    status: 'Inactive',
    totalHours: 18,
    verifiedHours: 18,
    pendingHours: 0,
    joinedDate: '2024-02-11',
    skills: ['Heavy Lifting', 'Event Logistics'],
    emergencyContact: {
      name: 'Rosa Morales',
      phone: '(555) 667-8899',
      relationship: 'Mother'
    },
    backgroundCheckStatus: 'Expired',
    badges: [],
    attendanceRate: 75,
    shiftsCompleted: 4,
    notes: 'Paused volunteering due to semester college exam schedule.'
  }
];

export const INITIAL_SHIFTS: ShiftEvent[] = [
  {
    id: 'shift-101',
    title: 'Saturday Community Food Distribution',
    category: 'Community Food Pantry',
    date: '2026-09-12',
    startTime: '08:30',
    endTime: '13:00',
    durationHours: 4.5,
    location: 'Downtown Hope Center - 425 Main St Warehouse B',
    leadOrganizer: 'Sarah Jenkins (Leader)',
    description: 'Sorting fresh produce, packing pantry grocery boxes, and loading vehicles for 250 low-income families.',
    requiredVolunteers: 6,
    assignedVolunteerIds: ['vol-1', 'vol-2', 'vol-6', 'vol-4'],
    waitlistVolunteerIds: ['vol-5'],
    requiredSkills: ['Food Handling', 'Heavy Lifting'],
    status: 'Upcoming',
    attendance: {
      'vol-1': { volunteerId: 'vol-1', status: 'Registered', hoursLogged: 4.5, verified: false },
      'vol-2': { volunteerId: 'vol-2', status: 'Registered', hoursLogged: 4.5, verified: false },
      'vol-6': { volunteerId: 'vol-6', status: 'Registered', hoursLogged: 4.5, verified: false },
      'vol-4': { volunteerId: 'vol-4', status: 'Registered', hoursLogged: 4.5, verified: false }
    }
  },
  {
    id: 'shift-102',
    title: 'Youth STEM & Reading Workshop',
    category: 'Youth Mentorship',
    date: '2026-09-14',
    startTime: '15:30',
    endTime: '18:30',
    durationHours: 3.0,
    location: 'Oakridge Community Library - Learning Lab 2',
    leadOrganizer: 'Sarah Jenkins (Leader)',
    description: 'Guiding elementary school students through robotics kits and guided storybook reading sessions.',
    requiredVolunteers: 4,
    assignedVolunteerIds: ['vol-7', 'vol-3', 'vol-1'],
    waitlistVolunteerIds: [],
    requiredSkills: ['Youth Mentorship'],
    status: 'Upcoming',
    attendance: {
      'vol-7': { volunteerId: 'vol-7', status: 'Registered', hoursLogged: 3.0, verified: false },
      'vol-3': { volunteerId: 'vol-3', status: 'Registered', hoursLogged: 3.0, verified: false },
      'vol-1': { volunteerId: 'vol-1', status: 'Registered', hoursLogged: 3.0, verified: false }
    }
  },
  {
    id: 'shift-103',
    title: 'Riverbank Greenway Tree Planting & Cleanup',
    category: 'Park Revitalization',
    date: '2026-09-19',
    startTime: '09:00',
    endTime: '13:30',
    durationHours: 4.5,
    location: 'Westside Riverside Park - North Pavilion',
    leadOrganizer: 'Sarah Jenkins (Leader)',
    description: 'Planting 60 native willow saplings and clearing plastic debris along the east wetland bank.',
    requiredVolunteers: 8,
    assignedVolunteerIds: ['vol-2', 'vol-4', 'vol-6'],
    waitlistVolunteerIds: [],
    requiredSkills: ['Park Revitalization', 'Heavy Lifting'],
    status: 'Upcoming',
    attendance: {
      'vol-2': { volunteerId: 'vol-2', status: 'Registered', hoursLogged: 4.5, verified: false },
      'vol-4': { volunteerId: 'vol-4', status: 'Registered', hoursLogged: 4.5, verified: false },
      'vol-6': { volunteerId: 'vol-6', status: 'Registered', hoursLogged: 4.5, verified: false }
    }
  },
  {
    id: 'shift-104',
    title: 'Senior Health Screening & Care Packages',
    category: 'Senior Outreach',
    date: '2026-09-06',
    startTime: '10:00',
    endTime: '14:00',
    durationHours: 4.0,
    location: 'Evergreen Senior Living Center - Great Hall',
    leadOrganizer: 'Sarah Jenkins (Leader)',
    description: 'Blood pressure checks, medication review assistance, and distributing nutritional hydration kits.',
    requiredVolunteers: 4,
    assignedVolunteerIds: ['vol-3', 'vol-7', 'vol-1'],
    waitlistVolunteerIds: [],
    requiredSkills: ['Elder Care', 'First Aid / CPR'],
    status: 'Completed',
    attendance: {
      'vol-3': { volunteerId: 'vol-3', status: 'Attended', hoursLogged: 4.0, verified: true },
      'vol-7': { volunteerId: 'vol-7', status: 'Attended', hoursLogged: 4.0, verified: true },
      'vol-1': { volunteerId: 'vol-1', status: 'Attended', hoursLogged: 4.0, verified: true }
    }
  },
  {
    id: 'shift-105',
    title: 'Emergency Cold Weather Shelter Setup',
    category: 'Emergency Shelter Support',
    date: '2026-09-02',
    startTime: '18:00',
    endTime: '22:00',
    durationHours: 4.0,
    location: 'Municipal Civic Gym - 12th Avenue',
    leadOrganizer: 'Sarah Jenkins (Leader)',
    description: 'Setting up 80 emergency cots, thermal blankets, and preparing warm soup distribution.',
    requiredVolunteers: 5,
    assignedVolunteerIds: ['vol-1', 'vol-2', 'vol-4', 'vol-6'],
    waitlistVolunteerIds: [],
    requiredSkills: ['First Aid / CPR', 'Logistics'],
    status: 'Completed',
    attendance: {
      'vol-1': { volunteerId: 'vol-1', status: 'Attended', hoursLogged: 4.0, verified: true },
      'vol-2': { volunteerId: 'vol-2', status: 'Attended', hoursLogged: 4.0, verified: true },
      'vol-4': { volunteerId: 'vol-4', status: 'Attended', hoursLogged: 4.0, verified: true },
      'vol-6': { volunteerId: 'vol-6', status: 'Attended', hoursLogged: 4.0, verified: true }
    }
  }
];

export const INITIAL_CHANNELS: ChatChannel[] = [
  {
    id: 'ch-announcements',
    name: '📢 organizer-announcements',
    description: 'Official broadcasts and urgent shift notices from Volunteer Leaders.',
    isDirect: false,
    unreadCount: 0
  },
  {
    id: 'ch-food-drive',
    name: '🍎 food-bank-operations',
    description: 'Coordination for Saturday food distributions and warehouse sorting.',
    isDirect: false,
    unreadCount: 1
  },
  {
    id: 'ch-leads',
    name: '⭐ team-leads-only',
    description: 'Private coordination channel for Volunteer Leaders and Shift Captains.',
    isDirect: false,
    unreadCount: 0
  },
  {
    id: 'ch-vol-1',
    name: 'Elena Rostova',
    description: 'Direct communication with Shift Lead Elena.',
    isDirect: true,
    recipientVolunteerId: 'vol-1',
    unreadCount: 0
  },
  {
    id: 'ch-vol-2',
    name: 'Marcus Vance',
    description: 'Direct communication with Van Driver Marcus.',
    isDirect: true,
    recipientVolunteerId: 'vol-2',
    unreadCount: 0
  },
  {
    id: 'ch-vol-3',
    name: 'Amina Al-Mansoor',
    description: 'Direct communication with Clinic Specialist Amina.',
    isDirect: true,
    recipientVolunteerId: 'vol-3',
    unreadCount: 0
  }
];

export const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  'ch-announcements': [
    {
      id: 'msg-1',
      channelId: 'ch-announcements',
      senderId: 'leader-sarah',
      senderName: 'Sarah Jenkins (Leader)',
      senderRole: 'Volunteer Coordinator',
      senderAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      content: '🚨 Reminder: The Saturday Food Pantry shift starts at 08:30 AM sharp at Main St Warehouse B. Please bring closed-toe shoes. 2 more volunteer spots are open!',
      timestamp: 'Today at 09:15 AM',
      isAnnouncement: true,
      priority: 'urgent'
    },
    {
      id: 'msg-2',
      channelId: 'ch-announcements',
      senderId: 'leader-sarah',
      senderName: 'Sarah Jenkins (Leader)',
      senderRole: 'Volunteer Coordinator',
      senderAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      content: '🎉 Congratulations to Amina Al-Mansoor for crossing 200+ verified service hours this past week! Official Certificate & Golden Badge awarded.',
      timestamp: 'Yesterday at 4:30 PM',
      isAnnouncement: true
    }
  ],
  'ch-food-drive': [
    {
      id: 'msg-3',
      channelId: 'ch-food-drive',
      senderId: 'vol-1',
      senderName: 'Elena Rostova',
      senderRole: 'Team Lead',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      content: 'Hi Sarah, the pallets of fresh citrus and oats arrived from Regional Food Hub. Everything is staged in Cold Storage Unit 2.',
      timestamp: 'Today at 10:20 AM'
    },
    {
      id: 'msg-4',
      channelId: 'ch-food-drive',
      senderId: 'vol-6',
      senderName: 'David Cho',
      senderRole: 'Volunteer',
      senderAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      content: 'I verified the box counts—we have 320 family hampers ready. Need 2 more carts by Bay 3.',
      timestamp: 'Today at 11:05 AM'
    }
  ],
  'ch-leads': [
    {
      id: 'msg-5',
      channelId: 'ch-leads',
      senderId: 'leader-sarah',
      senderName: 'Sarah Jenkins (Leader)',
      senderRole: 'Volunteer Coordinator',
      senderAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      content: 'Quarterly review report is ready for the non-profit board. We logged 1,840 volunteer hours this quarter across 5 community initiatives!',
      timestamp: 'Yesterday at 2:00 PM'
    },
    {
      id: 'msg-6',
      channelId: 'ch-leads',
      senderId: 'vol-1',
      senderName: 'Elena Rostova',
      senderRole: 'Team Lead',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      content: 'Great news! Also, 3 of our new recruits completed their background clearances today.',
      timestamp: 'Yesterday at 3:12 PM'
    }
  ],
  'ch-vol-1': [
    {
      id: 'msg-7',
      channelId: 'ch-vol-1',
      senderId: 'vol-1',
      senderName: 'Elena Rostova',
      senderRole: 'Team Lead',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      content: 'Hi Sarah, can you verify the extra 2.5 hours from Tuesday night when we stayed to restock the distribution pantry?',
      timestamp: 'Today at 8:40 AM'
    }
  ],
  'ch-vol-2': [
    {
      id: 'msg-8',
      channelId: 'ch-vol-2',
      senderId: 'vol-2',
      senderName: 'Marcus Vance',
      senderRole: 'Volunteer',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      content: 'Van #3 has a full tank of gas and cargo straps are locked in. Ready for Saturday morning.',
      timestamp: 'Yesterday at 6:15 PM'
    }
  ],
  'ch-vol-3': [
    {
      id: 'msg-9',
      channelId: 'ch-vol-3',
      senderId: 'vol-3',
      senderName: 'Amina Al-Mansoor',
      senderRole: 'Specialist',
      senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      content: 'Thank you so much for the 200 Hours Service Certificate! I shared the digital milestone on LinkedIn!',
      timestamp: 'Yesterday at 5:02 PM'
    }
  ]
};

export const INITIAL_EMAIL_TEMPLATES: AutomatedEmailTemplate[] = [
  {
    id: 'tmpl-1',
    title: '24-Hour Shift Reminder & Directions',
    triggerType: 'shift_reminder_24h',
    subjectTemplate: 'Upcoming Service Shift Tomorrow: {{eventName}} at {{eventTime}}',
    bodyTemplate: 'Hi {{volunteerName}},\n\nThank you for volunteering with us! This is an automated reminder that your scheduled shift for "{{eventName}}" takes place tomorrow at {{eventTime}}.\n\n📍 Location: {{location}}\n👕 Attire: Comfortable clothing, closed-toe footwear.\n📞 Leader On-Site: Sarah Jenkins (555-019-2834)\n\nIf your availability has changed, please notify us immediately so we can open your slot.\n\nWith gratitude,\nCommunity Action Volunteer Leadership',
    enabled: true,
    lastTriggered: 'Today at 08:00 AM',
    sentCount: 148
  },
  {
    id: 'tmpl-2',
    title: '2-Hour Urgent Shift Alert & Parking Notes',
    triggerType: 'shift_reminder_2h',
    subjectTemplate: 'Reminder: Your shift starts in 2 hours - {{eventName}}',
    bodyTemplate: 'Hi {{volunteerName}},\n\nYour shift starts in two hours! Check-in table is located right at the north main entrance.\n\nWe look forward to working side-by-side today.',
    enabled: true,
    lastTriggered: 'Yesterday at 08:00 AM',
    sentCount: 132
  },
  {
    id: 'tmpl-3',
    title: 'Post-Event Verified Hours Confirmation',
    triggerType: 'hours_confirmed',
    subjectTemplate: 'Hours Verified: {{hoursCount}} service hours logged for {{eventName}}!',
    bodyTemplate: 'Dear {{volunteerName}},\n\nYour attendance at "{{eventName}}" has been officially verified by your Volunteer Leader. {{hoursCount}} hours have been added to your permanent service transcript.\n\nYour Total Verified Hours: {{totalVerifiedHours}} hrs.\n\nAccess your live recognition dashboard and certificates anytime.\n\nThank you for making a tangible difference!',
    enabled: true,
    lastTriggered: 'Sep 6, 2026',
    sentCount: 420
  },
  {
    id: 'tmpl-4',
    title: 'Milestone Achievement & Certificate Notification',
    triggerType: 'milestone_achieved',
    subjectTemplate: 'Congratulations {{volunteerName}}! You reached the {{milestoneName}} Milestone 🎉',
    bodyTemplate: 'Dear {{volunteerName}},\n\nOn behalf of our entire organization and board of directors, congratulations on reaching {{milestoneName}} with over {{hoursCount}} hours of dedicated service.\n\nAn official, leader-signed Certificate of Recognition has been generated for you in the Volunteer Portal along with your new digital badge.\n\nFeel free to share your impact on LinkedIn and social media!',
    enabled: true,
    lastTriggered: 'Yesterday at 4:35 PM',
    sentCount: 29
  },
  {
    id: 'tmpl-5',
    title: '30-Day Inactivity Check-in & Re-engagement',
    triggerType: 'inactivity_checkin',
    subjectTemplate: 'We miss you at Community Action Network, {{volunteerName}}!',
    bodyTemplate: 'Hi {{volunteerName}},\n\nWe noticed it has been a few weeks since your last volunteer shift. We have several exciting upcoming opportunities that match your skills ({{skills}}).\n\nCheck out the open roster calendar to sign up whenever you are ready.',
    enabled: true,
    lastTriggered: 'Sep 1, 2026',
    sentCount: 17
  },
  {
    id: 'tmpl-6',
    title: 'Emergency Schedule / Inclement Weather Broadcast',
    triggerType: 'emergency_broadcast',
    subjectTemplate: 'URGENT: Schedule update for {{eventName}}',
    bodyTemplate: 'Important notification regarding your upcoming shift {{eventName}}. Please review instructions from the volunteer leadership team.',
    enabled: false,
    sentCount: 3
  }
];

export const INITIAL_EMAIL_LOGS: EmailLogEntry[] = [
  {
    id: 'elog-1',
    recipientName: 'Elena Rostova',
    recipientEmail: 'elena.rostova@example.org',
    subject: 'Upcoming Service Shift Tomorrow: Saturday Community Food Distribution at 08:30',
    bodyHtml: '<p>Automated shift reminder sent for Downtown Hope Center warehouse distribution.</p>',
    timestamp: 'Today at 08:00 AM',
    status: 'Delivered',
    type: 'Shift Reminder'
  },
  {
    id: 'elog-2',
    recipientName: 'Amina Al-Mansoor',
    recipientEmail: 'amina.mansoor@example.org',
    subject: 'Congratulations Amina! You reached the Century Hero (100+ Hrs) Milestone 🎉',
    bodyHtml: '<p>Milestone recognition email dispatched with PDF Certificate and digital badge download.</p>',
    timestamp: 'Yesterday at 4:35 PM',
    status: 'Opened',
    type: 'Milestone Award'
  },
  {
    id: 'elog-3',
    recipientName: 'Marcus Vance',
    recipientEmail: 'marcus.v@example.org',
    subject: 'Hours Verified: 4.0 service hours logged for Emergency Cold Weather Shelter Setup!',
    bodyHtml: '<p>Verified service hours update sent automatically following event close-out.</p>',
    timestamp: 'Sep 3, 2026 at 09:12 AM',
    status: 'Opened',
    type: 'Hours Verified'
  },
  {
    id: 'elog-4',
    recipientName: 'Chloe Bennett',
    recipientEmail: 'chloe.bennett@example.org',
    subject: 'Welcome to Volunteer Service - Onboarding Next Steps',
    bodyHtml: '<p>Welcome email sent with background clearance portal access.</p>',
    timestamp: 'Sep 1, 2026 at 11:30 AM',
    status: 'Delivered',
    type: 'Onboarding'
  }
];

export const INITIAL_CERTIFICATES: CertificateRecord[] = [
  {
    id: 'cert-001',
    volunteerId: 'vol-3',
    volunteerName: 'Amina Al-Mansoor',
    hours: 200,
    organization: 'Community Action Network Alliance',
    issuedDate: '2026-09-07',
    signatoryLeader: 'Sarah Jenkins',
    signatoryTitle: 'Lead Volunteer Director',
    programFocus: 'Community Health & Senior Outreach',
    certificateNumber: 'CAN-2026-089'
  },
  {
    id: 'cert-002',
    volunteerId: 'vol-1',
    volunteerName: 'Elena Rostova',
    hours: 100,
    organization: 'Community Action Network Alliance',
    issuedDate: '2026-08-15',
    signatoryLeader: 'Sarah Jenkins',
    signatoryTitle: 'Lead Volunteer Director',
    programFocus: 'Food Security & Distribution Logistics',
    certificateNumber: 'CAN-2026-074'
  },
  {
    id: 'cert-003',
    volunteerId: 'vol-7',
    volunteerName: 'Priya Patel',
    hours: 100,
    organization: 'Community Action Network Alliance',
    issuedDate: '2026-07-28',
    signatoryLeader: 'Sarah Jenkins',
    signatoryTitle: 'Lead Volunteer Director',
    programFocus: 'Youth Literacy & STEM Education',
    certificateNumber: 'CAN-2026-061'
  }
];
