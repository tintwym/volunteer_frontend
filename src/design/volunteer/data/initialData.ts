// @ts-nocheck

import { 
  VolunteerProfile, 
  VolunteerEvent, 
  ServiceRecord, 
  DigitalBadge, 
  Conversation, 
  AutomatedEmailNotification,
  VolunteerTask,
  TeamInfo,
  AttendanceRecord,
  TrainingCourse,
  EventDocument,
  SystemNotification,
  VolunteerRequest,
  IncidentReport,
  EventFeedback,
  AppSettings
} from '../types';

export const initialProfile: VolunteerProfile = {
  id: 'vol-8921',
  name: 'Maya Chen',
  email: 'maya.chen@example.org',
  role: 'Senior Event Volunteer',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  phone: '+1 (555) 234-8901',
  location: 'Seattle, WA',
  joinDate: 'March 14, 2025',
  totalHours: 52.5,
  pendingHours: 4.5,
  completedEventsCount: 14,
  impactScore: 98,
  bio: 'Dedicated community volunteer passionate about public civic events, youth literacy programs, and environmental coastal restoration. Reliable and safety-oriented.',
  emergencyContact: 'David Chen (Spouse) - +1 (555) 432-1100',
  skills: ['Registration & Check-in', 'Crowd Guidance', 'First Aid Certified (CPR)', 'Debris Sorting', 'Bilingual Translation', 'Logistics Inventory'],
  languages: ['English (Native)', 'Mandarin (Fluent)', 'Spanish (Conversational)'],
  experienceYears: 3,
  preferredActivities: ['Community Festivals', 'Youth Education', 'Food Packaging', 'Emergency Relief'],
  certifications: ['First Aid & Adult CPR (Red Cross 2025)', 'Food Handling Safety Level 1', 'Youth Safeguarding Clearance'],
  shareContactWithTeam: true,
  availability: {
    monday: ['Evening (5pm-9pm)'],
    tuesday: [],
    wednesday: ['Morning (8am-12pm)'],
    thursday: ['Evening (5pm-9pm)'],
    friday: ['Afternoon (1pm-5pm)', 'Evening (5pm-9pm)'],
    saturday: ['Morning (8am-12pm)', 'Afternoon (1pm-5pm)'],
    sunday: ['Morning (8am-12pm)']
  },
  notificationPreferences: {
    email: true,
    sms: true,
    inApp: true,
    reminder24h: true,
    urgentAlerts: true
  }
};

export const initialEvents: VolunteerEvent[] = [
  {
    id: 'evt-101',
    title: 'Community Festival 2026',
    organization: 'Seattle Civic Events & Arts Commission',
    category: 'Community Aid',
    description: 'Annual city festival featuring live musical performances, cultural food pavilions, interactive artisan stalls, and family activity zones. Volunteers support greeting, check-in, and crowd assistance.',
    location: 'Seattle Center Plaza & Exhibition Hall, Gate 2',
    isVirtual: false,
    date: '2026-09-12',
    formattedDate: 'Saturday, Sep 12, 2026',
    startTime: '08:00 AM',
    endTime: '12:00 PM',
    hours: 4.0,
    duration: '4 hours',
    spotsTotal: 30,
    spotsFilled: 26,
    isSignedUp: true,
    signupDate: '2026-09-01',
    participationStatus: 'Approved',
    selectedRole: 'Registration & Check-in Specialist',
    teamName: 'Registration Team',
    requirements: [
      'Sturdy comfortable footwear',
      'Festival lanyard & Volunteer T-shirt (provided on arrival)',
      'Ages 18+',
      'Completed Customer Service & Crowd Safety training module'
    ],
    skillsNeeded: ['Customer Service', 'Check-in Desk', 'Crowd Guidance', 'Communication'],
    trainingRequirements: ['Customer Service & Crowd Assistance', 'Volunteer Safety & Emergency Response'],
    instructions: 'Arrive by 7:45 AM at the Volunteer Hub Tent located next to Gate 2. Collect your official badge and radio headset from Team Leader Marcus Reed.',
    availablePositions: [
      { id: 'pos-1', title: 'Registration & Check-in Specialist', spotsTotal: 10, spotsFilled: 9, requirements: 'Friendly demeanor, basic tablet usage for QR scanning' },
      { id: 'pos-2', title: 'Crowd Assistance & Wayfinding', spotsTotal: 12, spotsFilled: 10, requirements: 'Good walking endurance, knowledge of festival map' },
      { id: 'pos-3', title: 'Logistics & Booth Setup', spotsTotal: 8, spotsFilled: 7, requirements: 'Ability to lift up to 25 lbs, early arrival' }
    ],
    shifts: [
      { id: 'sh-1', date: '2026-09-12', formattedDate: 'Saturday, Sep 12, 2026', startTime: '08:00 AM', endTime: '12:00 PM', activity: 'Registration & Setup Shift', location: 'Gate 2 Entrance Hall', breakTimes: '10:00 AM - 10:15 AM (15m refreshment break)' },
      { id: 'sh-2', date: '2026-09-12', formattedDate: 'Saturday, Sep 12, 2026', startTime: '12:30 PM', endTime: '04:30 PM', activity: 'Afternoon Crowd Support', location: 'Main Plaza Stage Area', breakTimes: '02:30 PM - 02:45 PM' }
    ],
    organizer: {
      name: 'Marcus Reed',
      role: 'Festival Operations Director',
      email: 'm.reed@seattlecivic.org',
      phone: '+1 (555) 301-4492',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    }
  },
  {
    id: 'evt-102',
    title: 'Weekend Fresh Food Pantry & Meal Packaging',
    organization: 'Cascadia Community Food Relief',
    category: 'Food Relief',
    description: 'Sort organic fresh produce donations from local farms, assemble 300 emergency grocery hampers for underserved families, and coordinate curbside pickup.',
    location: 'Cascadia Warehouse Hub, 1420 8th Ave',
    isVirtual: false,
    date: '2026-09-19',
    formattedDate: 'Saturday, Sep 19, 2026',
    startTime: '10:00 AM',
    endTime: '02:30 PM',
    hours: 4.5,
    duration: '4.5 hours',
    spotsTotal: 16,
    spotsFilled: 14,
    isSignedUp: true,
    signupDate: '2026-09-05',
    participationStatus: 'Approved',
    selectedRole: 'Produce Sorter & Quality Inspector',
    teamName: 'Food Logistics & Packaging Squad',
    requirements: ['Comfortable standing for shifts', 'Food hygiene orientation on arrival'],
    skillsNeeded: ['Sorting & Packaging', 'Inventory Logging', 'Team Coordination'],
    trainingRequirements: ['Food Handling & Hygiene Certification'],
    instructions: 'Enter via loading dock door 3. Aprons, hairnets, and nitrile food-grade gloves will be provided.',
    availablePositions: [
      { id: 'pos-4', title: 'Produce Sorter & Quality Inspector', spotsTotal: 8, spotsFilled: 7, requirements: 'Visual inspection of fresh produce' },
      { id: 'pos-5', title: 'Hamper Packaging Line Specialist', spotsTotal: 8, spotsFilled: 7, requirements: 'Pacing assembly line with items checklist' }
    ],
    shifts: [
      { id: 'sh-3', date: '2026-09-19', formattedDate: 'Saturday, Sep 19, 2026', startTime: '10:00 AM', endTime: '02:30 PM', activity: 'Hamper Packing & Loading', location: 'Warehouse Packing Line B', breakTimes: '12:00 PM - 12:30 PM (Lunch Provided)' }
    ],
    organizer: {
      name: 'Sarah Jenkins',
      role: 'Volunteer Logistics Director',
      email: 's.jenkins@cascadiafood.org',
      phone: '+1 (555) 789-2211',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    }
  },
  {
    id: 'evt-103',
    title: 'After-School STEM Coding & Robotics Mentorship',
    organization: 'Youth Horizons Foundation',
    category: 'Education & Youth',
    description: 'Guide middle school students through scratch robotics exercises, basic circuits, and problem-solving puzzles in an interactive laboratory workshop.',
    location: 'Franklin Community Center, Lab B',
    isVirtual: false,
    date: '2026-09-24',
    formattedDate: 'Thursday, Sep 24, 2026',
    startTime: '03:30 PM',
    endTime: '06:30 PM',
    hours: 3.0,
    duration: '3 hours',
    spotsTotal: 10,
    spotsFilled: 6,
    isSignedUp: false,
    participationStatus: 'Applied',
    requirements: ['Background check on file', 'Enthusiasm for youth education'],
    skillsNeeded: ['Introductory Python/Scratch', 'Patience', 'Mentoring'],
    trainingRequirements: ['Youth Mentoring Safeguards'],
    instructions: 'Sign in with front desk security. Bring your own laptop or use lab workstations.',
    availablePositions: [
      { id: 'pos-6', title: 'Robotics Workshop Co-Facilitator', spotsTotal: 6, spotsFilled: 4, requirements: 'Assisting small groups of 3 students with hardware kit wiring' },
      { id: 'pos-7', title: 'Coding Logic Tutor', spotsTotal: 4, spotsFilled: 2, requirements: 'Debugging beginner block-code scripts' }
    ],
    shifts: [
      { id: 'sh-4', date: '2026-09-24', formattedDate: 'Thursday, Sep 24, 2026', startTime: '03:30 PM', endTime: '06:30 PM', activity: 'After-school Lab Mentoring', location: 'Franklin Community Center, Lab B' }
    ],
    organizer: {
      name: 'Elena Rostova',
      role: 'Youth Program Coordinator',
      email: 'elena@youthhorizons.org',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    }
  },
  {
    id: 'evt-104',
    title: 'Emerald Bay Coastline & Marine Habitat Restoration',
    organization: 'Puget Sound Environmental Trust',
    category: 'Environment',
    description: 'Help restore coastal dune habitats, collect marine plastic debris, and catalog species indicators along the Puget Sound coastline.',
    location: 'Emerald Bay State Park, Trailhead 4',
    isVirtual: false,
    date: '2026-09-27',
    formattedDate: 'Sunday, Sep 27, 2026',
    startTime: '09:00 AM',
    endTime: '01:00 PM',
    hours: 4.0,
    duration: '4 hours',
    spotsTotal: 25,
    spotsFilled: 19,
    isSignedUp: false,
    requirements: ['Sturdy closed-toe shoes', 'Reusable water bottle', 'Ages 16+'],
    skillsNeeded: ['Debris sorting', 'Trail walking', 'Eco-awareness'],
    trainingRequirements: ['Volunteer Safety & Emergency Response'],
    instructions: 'Free volunteer parking in Lot B. Meet near the ranger information kiosk.',
    availablePositions: [
      { id: 'pos-8', title: 'Trail Cleanup & Native Replanting Volunteer', spotsTotal: 20, spotsFilled: 15, requirements: 'Trail walking, outdoor debris collection' },
      { id: 'pos-9', title: 'Waste Cataloger & Weigh Station Lead', spotsTotal: 5, spotsFilled: 4, requirements: 'Recording weights of debris types in field binder' }
    ],
    shifts: [
      { id: 'sh-5', date: '2026-09-27', formattedDate: 'Sunday, Sep 27, 2026', startTime: '09:00 AM', endTime: '01:00 PM', activity: 'Trailhead 4 Coastline Sweep', location: 'Emerald Bay Park' }
    ],
    organizer: {
      name: 'Marcus Reed',
      role: 'Head of Coastal Operations',
      email: 'm.reed@pugetenvironment.org',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    }
  },
  {
    id: 'evt-105',
    title: 'Mobile Community Health Clinic & Wellness Fair',
    organization: 'Hope & Wellness Community Health',
    category: 'Healthcare & Wellness',
    description: 'Welcome clinic attendees, help patients fill out intake forms, hand out sanitary hygiene kits, and coordinate bilingual translation assistance.',
    location: 'Rainier Community Center Plaza',
    isVirtual: false,
    date: '2026-10-03',
    formattedDate: 'Saturday, Oct 03, 2026',
    startTime: '08:00 AM',
    endTime: '01:00 PM',
    hours: 5.0,
    duration: '5 hours',
    spotsTotal: 15,
    spotsFilled: 11,
    isSignedUp: false,
    requirements: ['Medical confidentiality agreement', 'Masks provided and required'],
    skillsNeeded: ['Customer service', 'Intake check-in', 'Compassionate communication'],
    trainingRequirements: ['Customer Service & Crowd Assistance', 'Volunteer Safety & Emergency Response'],
    instructions: 'Check in at tent A near the mobile medical van. Badges will be issued on arrival.',
    availablePositions: [
      { id: 'pos-10', title: 'Patient Welcome & Intake Host', spotsTotal: 10, spotsFilled: 8, requirements: 'Warm interpersonal communication, tablet form assistance' },
      { id: 'pos-11', title: 'Hygiene Kit Distribution Specialist', spotsTotal: 5, spotsFilled: 3, requirements: 'Managing supplies and inventory distribution' }
    ],
    shifts: [
      { id: 'sh-6', date: '2026-10-03', formattedDate: 'Saturday, Oct 03, 2026', startTime: '08:00 AM', endTime: '01:00 PM', activity: 'Intake and Welcome Desk', location: 'Tent A Plaza' }
    ],
    organizer: {
      name: 'Dr. Arthur Vance',
      role: 'Medical Outreach Director',
      email: 'dr.vance@hopehealth.org',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=120&auto=format&fit=crop&q=80',
    }
  }
];

// 3.6 Tasks
export const initialTasks: VolunteerTask[] = [
  {
    id: 'task-101',
    eventId: 'evt-101',
    eventTitle: 'Community Festival 2026',
    title: 'Registration Desk & Welcome Tablet Setup',
    instructions: 'Unpack 4 digital check-in tablets from secure storage crate B, plug in backup battery packs, test WiFi connectivity to "CivicFest-Staff", and align attendee line barriers at Gate 2 entrance.',
    location: 'Gate 2 Registration Desk, Main Hall Entrance',
    deadline: '08:30 AM (Saturday)',
    status: 'Completed',
    priority: 'High',
    assignedLeader: 'Marcus Reed',
    progress: 100
  },
  {
    id: 'task-102',
    eventId: 'evt-101',
    eventTitle: 'Community Festival 2026',
    title: 'Attendee Badge Check-in & QR Scanning',
    instructions: 'Greet arriving ticket holders with festival maps, scan their digital event QR passes on the volunteer tablets, apply physical color-coded wristbands, and answer general amenity inquiries.',
    location: 'Gate 2 Entrance Turnstiles (Lanes 1-3)',
    deadline: '11:00 AM (Saturday)',
    status: 'In Progress',
    priority: 'High',
    assignedLeader: 'Marcus Reed',
    progress: 60
  },
  {
    id: 'task-103',
    eventId: 'evt-101',
    eventTitle: 'Community Festival 2026',
    title: 'Crowd Assistance & Information Booth Wayfinding',
    instructions: 'Direct visitors to restrooms, main stage performance zones, accessible seating ramps, and first aid stations. Hand out schedule brochures and water refill guides.',
    location: 'Central Fountain Information Kiosk',
    deadline: '12:00 PM (Saturday)',
    status: 'Accepted',
    priority: 'Medium',
    assignedLeader: 'Marcus Reed',
    progress: 15
  },
  {
    id: 'task-104',
    eventId: 'evt-102',
    eventTitle: 'Weekend Fresh Food Pantry & Meal Packaging',
    title: 'Organic Produce Inspection & Sortation',
    instructions: 'Inspect crates of apples, potatoes, and greens donated by local organic farms. Discard spoiled produce into green compost bins and grade intact produce for hamper packaging.',
    location: 'Cascadia Warehouse Sorting Station 3',
    deadline: '11:30 AM (Next Saturday)',
    status: 'Assigned',
    priority: 'Medium',
    assignedLeader: 'Sarah Jenkins',
    progress: 0
  }
];

// 3.7 Team Module
export const initialTeams: TeamInfo[] = [
  {
    id: 'team-reg-101',
    eventId: 'evt-101',
    eventTitle: 'Community Festival 2026',
    teamName: 'Registration & Welcome Team',
    leader: {
      name: 'Marcus Reed',
      role: 'Team Leader & Operations Lead',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      phone: '+1 (555) 301-4492',
      email: 'm.reed@seattlecivic.org'
    },
    meetingPoint: 'Volunteer Hub Tent, Gate 2 (Next to Info Desk)',
    responsibilities: [
      'Operate digital ticketing & check-in tablets seamlessly',
      'Distribute festival map lanyards and wristbands',
      'Provide warm, courteous welcome to community families and VIP guests',
      'Coordinate with security and medical teams in case of urgent assistance'
    ],
    announcements: [
      {
        id: 'ann-1',
        author: 'Marcus Reed',
        role: 'Team Leader',
        text: 'Welcome team! Please remember to collect your volunteer uniform polo and radio headset at 07:45 AM sharp. Complimentary breakfast bagels and coffee will be waiting for us!',
        date: 'Today at 07:15 AM',
        priority: 'normal'
      },
      {
        id: 'ann-2',
        author: 'Marcus Reed',
        role: 'Team Leader',
        text: 'URGENT: Gate 1 is undergoing quick power maintenance, so attendee arrivals are being routed towards our Gate 2 entrance for the first 30 minutes.',
        date: 'Today at 08:05 AM',
        priority: 'urgent'
      }
    ],
    members: [
      {
        id: 'vol-8921',
        name: 'Maya Chen (You)',
        role: 'Lead Volunteer & Check-in Specialist',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        phone: '+1 (555) 234-8901',
        email: 'maya.chen@example.org',
        allowContactShare: true,
        isLeader: false
      },
      {
        id: 'vol-302',
        name: 'Carlos Mendez',
        role: 'Crowd Wayfinding Lead',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
        phone: '+1 (555) 882-9912',
        email: 'carlos.m@example.org',
        allowContactShare: true,
        isLeader: false
      },
      {
        id: 'vol-303',
        name: 'Aisha Patel',
        role: 'Accessibility & Special Needs Host',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
        phone: '+1 (555) 441-2900',
        email: 'aisha.patel@example.org',
        allowContactShare: true,
        isLeader: false
      },
      {
        id: 'vol-304',
        name: 'Liam O’Connor',
        role: 'Equipment & Badge Coordinator',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
        phone: 'Hidden by volunteer request',
        email: 'Hidden by volunteer request',
        allowContactShare: false,
        isLeader: false
      }
    ]
  },
  {
    id: 'team-food-102',
    eventId: 'evt-102',
    eventTitle: 'Weekend Fresh Food Pantry & Meal Packaging',
    teamName: 'Food Logistics & Packaging Squad',
    leader: {
      name: 'Sarah Jenkins',
      role: 'Logistics Supervisor',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      phone: '+1 (555) 789-2211',
      email: 's.jenkins@cascadiafood.org'
    },
    meetingPoint: 'Cascadia Warehouse Hub, Loading Dock Door 3',
    responsibilities: [
      'Pack 300 balanced grocery hampers according to dietary labels',
      'Maintain strict cold-chain and food safety standards',
      'Assist clients with curbside vehicle loading'
    ],
    announcements: [
      {
        id: 'ann-3',
        author: 'Sarah Jenkins',
        role: 'Supervisor',
        text: 'Great news: Local orchards sent a double delivery of fresh Honeycrisp apples today! Extra packaging cartons have been pre-staged.',
        date: 'Yesterday at 4:20 PM',
        priority: 'normal'
      }
    ],
    members: [
      {
        id: 'vol-8921',
        name: 'Maya Chen (You)',
        role: 'Produce Sorter & Quality Lead',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        phone: '+1 (555) 234-8901',
        email: 'maya.chen@example.org',
        allowContactShare: true,
        isLeader: false
      },
      {
        id: 'vol-401',
        name: 'Derek Wu',
        role: 'Hamper Packaging Specialist',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
        phone: '+1 (555) 678-9102',
        email: 'derek.wu@example.org',
        allowContactShare: true,
        isLeader: false
      }
    ]
  }
];

// 3.8 Attendance
export const initialAttendance: AttendanceRecord[] = [
  {
    id: 'att-201',
    eventId: 'evt-101',
    eventTitle: 'Community Festival 2026',
    shiftDate: '2026-09-12',
    scheduledStart: '08:00 AM',
    scheduledEnd: '12:00 PM',
    checkInTime: '08:02 AM',
    checkOutTime: null,
    totalHours: 3.5,
    method: 'QR Code',
    status: 'Checked In',
    verificationCode: 'ATT-FEST-0802',
    locationValidationStatus: 'Verified GPS',
    notes: 'Checked in at Gate 2 entrance terminal via QR scan. Shift currently active.'
  },
  {
    id: 'att-202',
    eventId: 'evt-prev-1',
    eventTitle: 'Urban Canopy Reforestation & Tree Planting',
    shiftDate: '2026-08-28',
    scheduledStart: '08:00 AM',
    scheduledEnd: '01:00 PM',
    checkInTime: '07:55 AM',
    checkOutTime: '01:02 PM',
    totalHours: 5.1,
    method: 'Location GPS',
    status: 'Completed',
    verificationCode: 'ATT-TREE-7712',
    locationValidationStatus: 'Verified GPS',
    notes: 'Check-in and check-out validated via Park Trailhead geofence.'
  },
  {
    id: 'att-203',
    eventId: 'evt-prev-2',
    eventTitle: 'Evening Soup Kitchen Service & Distribution',
    shiftDate: '2026-08-21',
    scheduledStart: '05:00 PM',
    scheduledEnd: '09:30 PM',
    checkInTime: '04:58 PM',
    checkOutTime: '09:35 PM',
    totalHours: 4.6,
    method: 'Event Code',
    status: 'Completed',
    verificationCode: 'ATT-MEAL-9930',
    locationValidationStatus: 'Venue WiFi',
    notes: 'Verified by Supervisor Sarah Jenkins code entry #KITCHEN26.'
  },
  {
    id: 'att-204',
    eventId: 'evt-prev-3',
    eventTitle: 'Elementary Literacy Reading Circles',
    shiftDate: '2026-08-14',
    scheduledStart: '09:00 AM',
    scheduledEnd: '01:00 PM',
    checkInTime: '09:02 AM',
    checkOutTime: '01:05 PM',
    totalHours: 4.05,
    method: 'Leader Confirmation',
    status: 'Completed',
    verificationCode: 'ATT-LITR-4410',
    notes: 'Leader signed off in mobile terminal.'
  }
];

// 3.9 Training Module
export const initialTraining: TrainingCourse[] = [
  {
    id: 'trn-1',
    title: 'Customer Service & Crowd Assistance',
    category: 'Operational Skills',
    duration: '25 mins',
    description: 'Learn best practices for de-escalation, accessible wayfinding, effective festival attendee communication, and managing busy entrance queues.',
    status: 'Completed',
    progressPercent: 100,
    passingScore: 80,
    score: 95,
    dueDate: '2026-09-10',
    completedDate: '2026-09-04',
    certificateId: 'TRN-CERT-CROWD-951',
    materials: [
      { title: 'De-escalation & Courteous Greeting Manual (PDF)', type: 'pdf', readTime: '8 mins', summary: 'Principles of active listening, respectful non-verbal cues, and helping confused visitors.' },
      { title: 'Festival Venue Accessibility & ADA Guide', type: 'doc', readTime: '6 mins', summary: 'Wheelchair routes, accessible seating, service animal regulations.' }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What is the first step when an attendee approaches with a lost child or emergency?',
        options: [
          'Direct them to the nearest public exit',
          'Immediately contact the Team Leader on radio channel 1 and stay with the attendee',
          'Leave your post to search the venue alone',
          'Ask them to wait until your shift break'
        ],
        correctAnswer: 1,
        explanation: 'Volunteers must never leave their post alone; use the dedicated team radio channel to report child loss or medical needs immediately.'
      },
      {
        id: 'q2',
        question: 'Which lanyard color designates accredited staff and emergency responders?',
        options: [
          'Yellow with Red Stripe',
          'Bright Neon Green',
          'All White',
          'Dark Navy'
        ],
        correctAnswer: 0,
        explanation: 'Yellow with Red Stripe is the universal badge lanyard for festival security and medical leads.'
      }
    ]
  },
  {
    id: 'trn-2',
    title: 'Volunteer Safety & Emergency Response',
    category: 'Safety & Compliance',
    duration: '35 mins',
    description: 'Essential health, safety, fire egress, severe weather procedures, and basic first-aid protocol for all on-site volunteer personnel.',
    status: 'Completed',
    progressPercent: 100,
    passingScore: 85,
    score: 100,
    dueDate: '2026-09-08',
    completedDate: '2026-09-03',
    certificateId: 'TRN-CERT-SAFE-882',
    materials: [
      { title: 'Emergency Evacuation & Fire Wardens Map', type: 'pdf', readTime: '10 mins', summary: 'Primary and secondary assembly points across all four park quadrants.' },
      { title: 'First Aid Incident Protocol', type: 'doc', readTime: '7 mins', summary: 'Heat exhaustion recognition, hydration reminders, and notifying paramedics.' }
    ],
    quiz: [
      {
        id: 'q3',
        question: 'Where is the main emergency assembly point for Seattle Center Gate 2?',
        options: [
          'Under the covered grandstand',
          'The open lawn field opposite Exhibition Hall Gate B',
          'Inside the kitchen pantry',
          'In the subterranean parking garage'
        ],
        correctAnswer: 1,
        explanation: 'Open lawns provide maximum distance from structures and unobstructed access for emergency vehicles.'
      }
    ]
  },
  {
    id: 'trn-3',
    title: 'Food Handling & Hygiene Certification',
    category: 'Food Safety',
    duration: '30 mins',
    description: 'Guidelines for safe food storage, cross-contamination prevention, glove changing standards, and packaging perishable items for food banks.',
    status: 'In Progress',
    progressPercent: 65,
    passingScore: 80,
    dueDate: '2026-09-18',
    materials: [
      { title: 'Safe Food Storage Temperatures & Expiry Guidelines', type: 'pdf', readTime: '12 mins', summary: 'Cold holding at 40°F or below, inspecting seal integrity of packaged items.' }
    ],
    quiz: [
      {
        id: 'q4',
        question: 'When must food-grade gloves be changed?',
        options: [
          'Only at the end of the entire 4-hour shift',
          'Immediately after touching trash, handling raw produce, or if torn',
          'Gloves are optional when packaging dry lentils',
          'Every 10 minutes regardless of task'
        ],
        correctAnswer: 1,
        explanation: 'Gloves must be changed immediately when contaminated, switching between produce types, or if torn.'
      }
    ]
  },
  {
    id: 'trn-4',
    title: 'Youth Mentoring Safeguards & Code of Conduct',
    category: 'Child Protection',
    duration: '40 mins',
    description: 'Mandatory ethical guidelines, one-on-one interaction rules, privacy considerations, and reporting requirements when working with minors.',
    status: 'Not Started',
    progressPercent: 0,
    passingScore: 90,
    dueDate: '2026-09-23',
    materials: [
      { title: 'Child Protection Policy & Two-Adult Rule Handout', type: 'pdf', readTime: '15 mins', summary: 'Always maintain visibility in open spaces; never be in isolated rooms with a minor alone.' }
    ],
    quiz: [
      {
        id: 'q5',
        question: 'What is the "Two-Adult Rule" in youth educational workshops?',
        options: [
          'Two adults must sit next to each other at lunch',
          'At least two cleared adult volunteers/staff must be present in every student workroom at all times',
          'Students must bring two parents to class',
          'Two adults must grade every assignment'
        ],
        correctAnswer: 1,
        explanation: 'The two-adult rule ensures child safety and transparent oversight during mentoring.'
      }
    ]
  }
];

// 3.10 Documents
export const initialDocuments: EventDocument[] = [
  {
    id: 'doc-1',
    eventId: 'evt-101',
    eventTitle: 'Community Festival 2026',
    title: 'Volunteer Handbook & Operational Guidelines',
    category: 'Handbook',
    description: 'Comprehensive guide to volunteer code of conduct, dress codes, punctuality, meal break policies, and organizational hierarchy.',
    version: 'v4.2 (Aug 2026)',
    updatedDate: 'August 24, 2026',
    fileSize: '2.4 MB',
    fileType: 'PDF',
    contentPreview: 'Welcome to the 2026 Civic Festival volunteer crew. This manual outlines professional conduct, respectful interactions with attendees, radio protocols, and safety expectations.'
  },
  {
    id: 'doc-2',
    eventId: 'evt-101',
    eventTitle: 'Community Festival 2026',
    title: 'Gate 2 Detailed Venue Map & Emergency Exits',
    category: 'Venue Map',
    description: 'High-resolution layout schematic marking registration lanes, accessible ramps, first-aid kiosks, radio dispatch, and public transit drop-offs.',
    version: 'v2.0 (Sep 2026)',
    updatedDate: 'September 01, 2026',
    fileSize: '3.8 MB',
    fileType: 'PDF',
    contentPreview: 'Detailed blueprint showing Exhibition Hall, Main Lawn, Gate 1, Gate 2, Volunteer Tent, Restrooms, Paramedic Station, and Electrical Supply points.'
  },
  {
    id: 'doc-3',
    eventId: 'evt-101',
    eventTitle: 'Community Festival 2026',
    title: 'Emergency Action Procedures & Evacuation Plan',
    category: 'Emergency',
    description: 'Standard operating procedures for severe weather warning, medical emergencies, lost children, and fire alarms.',
    version: 'v3.1 (Jul 2026)',
    updatedDate: 'July 15, 2026',
    fileSize: '1.2 MB',
    fileType: 'PDF',
    contentPreview: 'Emergency Dispatch Hotline: Dial #99 on festival handsets. Medical tent located at Quadrant B. Evacuation assembly point at North Pavilion Lawn.'
  },
  {
    id: 'doc-4',
    eventId: 'evt-101',
    eventTitle: 'Community Festival 2026',
    title: 'Registration Shift Instructions & Tablet Guide',
    category: 'Shift Instructions',
    description: 'Step-by-step instructions for operating the digital QR scanner app, wristband issuance, and handling offline ticket inquiries.',
    version: 'v1.5 (Sep 2026)',
    updatedDate: 'September 05, 2026',
    fileSize: '890 KB',
    fileType: 'PDF',
    contentPreview: '1. Power on tablet. 2. Open "CivicPass Scan". 3. Scan ticket QR from 6-8 inches distance. 4. Tap "Confirm Check-in" and attach wristband.'
  },
  {
    id: 'doc-5',
    title: 'General Volunteer Code of Conduct & Ethics Policy',
    category: 'Code of Conduct',
    description: 'Universal standard of mutual respect, harassment prevention, non-discrimination, and privacy protection across all events.',
    version: 'v5.0 (Jan 2026)',
    updatedDate: 'January 10, 2026',
    fileSize: '1.1 MB',
    fileType: 'PDF',
    contentPreview: 'VolunteerHub promotes an inclusive, respectful environment. Zero tolerance for harassment, discrimination, or unauthorized disclosure of participant data.'
  }
];

// 3.11 System Notifications
export const initialSystemNotifications: SystemNotification[] = [
  {
    id: 'snotif-1',
    title: 'Emergency Drill: Evacuation Siren at 11:30 AM',
    message: 'Notice to all festival volunteers: A scheduled 2-minute safety siren test will be conducted at 11:30 AM. No action required, please reassure nearby visitors.',
    type: 'Emergency',
    category: 'Safety Alert',
    timestamp: '15 mins ago',
    isRead: false,
    actionLink: 'documents',
    actionLabel: 'View Safety Protocol'
  },
  {
    id: 'snotif-2',
    title: 'Shift Change Request Approved',
    message: 'Your shift assignment for Community Festival 2026 (08:00 AM - 12:00 PM) was successfully signed off by Team Leader Marcus Reed.',
    type: 'Important',
    category: 'Schedule',
    timestamp: '1 hour ago',
    isRead: false,
    actionLink: 'schedule',
    actionLabel: 'View Shifts'
  },
  {
    id: 'snotif-3',
    title: 'Upcoming Shift Reminder: Community Festival Today',
    message: 'Your shift begins at 08:00 AM at Gate 2 Entrance Hall. Please check in with your Team Leader upon arrival.',
    type: 'Reminder',
    category: 'Shift Reminder',
    timestamp: '2 hours ago',
    isRead: true,
    actionLink: 'attendance',
    actionLabel: 'Open Check-in'
  },
  {
    id: 'snotif-4',
    title: 'New Training Module Available: Food Handling Certification',
    message: 'You have been enrolled in Food Handling & Hygiene Certification ahead of your Cascadia Food Bank shift next week.',
    type: 'Informational',
    category: 'Training',
    timestamp: 'Yesterday at 3:15 PM',
    isRead: true,
    actionLink: 'training',
    actionLabel: 'Start Course'
  }
];

// 3.12 Requests
export const initialRequests: VolunteerRequest[] = [
  {
    id: 'req-1',
    type: 'Shift Change',
    subject: 'Request 30-min earlier start on Community Festival shift',
    details: 'I would like to arrive at 07:30 AM to assist Marcus with initial tent setup and tablet testing, extending shift from 4.0h to 4.5h.',
    status: 'Approved',
    submittedDate: '2026-09-06',
    eventId: 'evt-101',
    eventTitle: 'Community Festival 2026',
    leaderResponse: 'Approved! Extra help during setup is greatly appreciated. See you at 7:30 AM at Gate 2. — Marcus',
    urgency: 'Normal'
  },
  {
    id: 'req-2',
    type: 'Task Clarification',
    subject: 'Wristband color coding for VIP vs General Admission',
    details: 'Could you confirm if VIP attendees receive the Gold metallic wristband while General Admission receives the Green fabric one?',
    status: 'Approved',
    submittedDate: '2026-09-08',
    eventId: 'evt-101',
    eventTitle: 'Community Festival 2026',
    leaderResponse: 'Correct! Gold is VIP lounge access, Green is GA. Blue is for artist/stage crew.',
    urgency: 'Normal'
  },
  {
    id: 'req-3',
    type: 'Schedule Conflict',
    subject: 'Cascadia Food Pantry shift - requested afternoon swap',
    details: 'Family appointment Saturday morning; requesting swap from 10:00 AM shift to 1:00 PM shift if a slot is open.',
    status: 'Under Review',
    submittedDate: '2026-09-07',
    eventId: 'evt-102',
    eventTitle: 'Weekend Fresh Food Pantry & Meal Packaging',
    leaderResponse: 'Checking with afternoon team members to coordinate slot availability. — Sarah',
    urgency: 'High'
  }
];

// 3.13 Incident Reporting
export const initialIncidents: IncidentReport[] = [
  {
    id: 'inc-1',
    category: 'Safety issue',
    title: 'Tripping hazard near Gate 2 ticket booth cord protector',
    description: 'The rubber cord bridge covering the heavy-duty power cables running to the tablet charging hub has become dislodged by heavy foot traffic, creating a 1-inch lip.',
    location: 'Gate 2 Entrance Hall, 5 feet east of Turnstile 2',
    urgency: 'Medium',
    isRestrictedAccess: false,
    status: 'Resolved',
    submittedDate: 'Today at 08:35 AM',
    incidentTime: '08:30 AM',
    resolutionNotes: 'Maintenance crew taped down high-visibility yellow caution grip tape over the bridge at 08:42 AM.'
  },
  {
    id: 'inc-2',
    category: 'Equipment problem',
    title: 'Tablet Scanner #3 battery drain and intermittent WiFi drops',
    description: 'Check-in tablet #3 dropped below 15% charge despite being plugged into portable pack; touch screen is lagging on QR scans.',
    location: 'Gate 2 Welcome Desk Lane 3',
    urgency: 'Low',
    isRestrictedAccess: false,
    status: 'Investigating',
    submittedDate: 'Today at 08:50 AM',
    incidentTime: '08:45 AM',
    resolutionNotes: 'Spare iPad mini dispatched from storage crate B by Liam.'
  }
];

// 3.15 Feedback
export const initialFeedback: EventFeedback[] = [
  {
    id: 'fb-1',
    eventId: 'evt-prev-1',
    eventTitle: 'Urban Canopy Reforestation & Tree Planting',
    submittedDate: '2026-08-29',
    ratings: {
      eventOrganisation: 5,
      teamLeader: 5,
      taskSuitability: 5,
      communication: 4,
      training: 5,
      venue: 5,
      schedule: 4,
      overallExperience: 5
    },
    comments: 'Superbly well-organized event! Marcus gave very clear planting instructions and safety demonstrations. Tools were in great condition.',
    suggestions: 'Could use more high-visibility flags to demarcate where saplings have already been watered.'
  },
  {
    id: 'fb-2',
    eventId: 'evt-prev-2',
    eventTitle: 'Evening Soup Kitchen Service & Distribution',
    submittedDate: '2026-08-22',
    ratings: {
      eventOrganisation: 5,
      teamLeader: 5,
      taskSuitability: 4,
      communication: 5,
      training: 4,
      venue: 4,
      schedule: 5,
      overallExperience: 5
    },
    comments: 'Very moving experience serving local families. Team camaraderie was wonderful.',
    suggestions: 'Provide extra kitchen non-slip shoe covers for volunteers working near the dishwashing sink.'
  }
];

// Service Records (Historic contributions)
export const initialServiceRecords: ServiceRecord[] = [
  {
    id: 'rec-501',
    eventId: 'evt-prev-1',
    eventTitle: 'Urban Canopy Reforestation & Tree Planting',
    organization: 'Puget Sound Environmental Trust',
    category: 'Environment',
    date: '2026-08-28',
    hours: 5.0,
    status: 'verified',
    supervisorName: 'Marcus Reed',
    supervisorEmail: 'm.reed@pugetenvironment.org',
    verificationCode: 'VER-TREE-8910',
    notes: 'Planted 42 native conifers and spread organic mulch across sector C. Excellent leadership.',
  },
  {
    id: 'rec-502',
    eventId: 'evt-prev-2',
    eventTitle: 'Evening Soup Kitchen Service & Distribution',
    organization: 'Cascadia Community Food Relief',
    category: 'Food Relief',
    date: '2026-08-21',
    hours: 4.5,
    status: 'verified',
    supervisorName: 'Sarah Jenkins',
    supervisorEmail: 's.jenkins@cascadiafood.org',
    verificationCode: 'VER-MEAL-4102',
    notes: 'Prepared 180 hot meals and organized food trays. Punctual and deeply supportive with clients.',
  },
  {
    id: 'rec-503',
    eventId: 'evt-prev-3',
    eventTitle: 'Elementary Literacy Reading Circles',
    organization: 'Youth Horizons Foundation',
    category: 'Education & Youth',
    date: '2026-08-14',
    hours: 4.0,
    status: 'verified',
    supervisorName: 'Elena Rostova',
    supervisorEmail: 'elena@youthhorizons.org',
    verificationCode: 'VER-READ-7731',
    notes: 'Conducted guided reading groups for 3rd graders struggling with English as a second language.',
  },
  {
    id: 'rec-504',
    eventId: 'evt-prev-4',
    eventTitle: 'Community Blood Drive Logistics & Intake',
    organization: 'Hope & Wellness Community Health',
    category: 'Healthcare & Wellness',
    date: '2026-08-07',
    hours: 6.0,
    status: 'verified',
    supervisorName: 'Dr. Arthur Vance',
    supervisorEmail: 'dr.vance@hopehealth.org',
    verificationCode: 'VER-BLOD-3319',
    notes: 'Managed post-donation snack area and donor check-ins during peak turnout.',
  },
  {
    id: 'rec-505',
    eventId: 'evt-prev-5',
    eventTitle: 'River Basin Habitat Weed Pull & Debris Removal',
    organization: 'Puget Sound Environmental Trust',
    category: 'Environment',
    date: '2026-07-29',
    hours: 5.0,
    status: 'verified',
    supervisorName: 'Marcus Reed',
    supervisorEmail: 'm.reed@pugetenvironment.org',
    verificationCode: 'VER-RIVR-9042',
    notes: 'Removed invasive Himalayan blackberry bushes along 400m of salmon spawning tributary.',
  },
  {
    id: 'rec-506',
    eventId: 'evt-prev-6',
    eventTitle: 'Summer Youth Book Fair Sorting & Cataloging',
    organization: 'Youth Horizons Foundation',
    category: 'Education & Youth',
    date: '2026-07-16',
    hours: 4.5,
    status: 'verified',
    supervisorName: 'Elena Rostova',
    supervisorEmail: 'elena@youthhorizons.org',
    verificationCode: 'VER-BOOK-2201',
    notes: 'Sorted 1,200 donated children books into reading levels and loaded bookmobile bins.',
  },
  {
    id: 'rec-507',
    eventId: 'evt-prev-7',
    eventTitle: 'Senior Wellness Check & Grocery Delivery Run',
    organization: 'Silver Bridges Outreach',
    category: 'Community Aid',
    date: '2026-07-02',
    hours: 3.5,
    status: 'verified',
    supervisorName: 'David Nguyen',
    supervisorEmail: 'd.nguyen@silverbridges.org',
    verificationCode: 'VER-SENR-8812',
    notes: 'Delivered groceries to 6 homebound elderly residents across North Seattle. Extremely compassionate.',
  },
  {
    id: 'rec-508',
    eventId: 'evt-prev-8',
    eventTitle: 'Animal Sanctuary Kennel Socialization & Clean',
    organization: 'Paws & Compassion Animal Haven',
    category: 'Animal Welfare',
    date: '2026-06-19',
    hours: 4.0,
    status: 'verified',
    supervisorName: 'Chloe Bennett',
    supervisorEmail: 'chloe@pawsandcompassion.org',
    verificationCode: 'VER-PAWS-5541',
    notes: 'Cleaned shelter yards, brushed rescue hounds, and prepared behavioral enrichment toys.',
  },
  {
    id: 'rec-509',
    eventId: 'evt-prev-9',
    eventTitle: 'Urban Community Garden Planting & Composting',
    organization: 'Puget Sound Environmental Trust',
    category: 'Environment',
    date: '2026-06-05',
    hours: 5.5,
    status: 'verified',
    supervisorName: 'Marcus Reed',
    supervisorEmail: 'm.reed@pugetenvironment.org',
    verificationCode: 'VER-GARD-6632',
    notes: 'Built 3 raised garden beds for neighborhood seniors and mixed 2 tons of rich compost.',
  },
  {
    id: 'rec-510',
    eventId: 'evt-prev-10',
    eventTitle: 'Community Food Bank Saturday Hamper Assembly',
    organization: 'Cascadia Community Food Relief',
    category: 'Food Relief',
    date: '2026-05-22',
    hours: 4.5,
    status: 'verified',
    supervisorName: 'Sarah Jenkins',
    supervisorEmail: 's.jenkins@cascadiafood.org',
    verificationCode: 'VER-FOOD-1194',
    notes: 'Packed 220 food packages for weekend distribution. High efficiency and positive team spirit.',
  },
  {
    id: 'rec-511',
    eventId: 'evt-prev-11',
    eventTitle: 'School District STEM Fair Setup & Logistics',
    organization: 'Youth Horizons Foundation',
    category: 'Education & Youth',
    date: '2026-05-09',
    hours: 3.5,
    status: 'verified',
    supervisorName: 'Elena Rostova',
    supervisorEmail: 'elena@youthhorizons.org',
    verificationCode: 'VER-STEM-3388',
    notes: 'Directed science fair exhibitors and tested electrical power strips for 45 student booths.',
  },
  {
    id: 'rec-512',
    eventId: 'evt-prev-12',
    eventTitle: 'Mobile Dental Van Patient Check-in Assistant',
    organization: 'Hope & Wellness Community Health',
    category: 'Healthcare & Wellness',
    date: '2026-04-25',
    hours: 5.0,
    status: 'verified',
    supervisorName: 'Dr. Arthur Vance',
    supervisorEmail: 'dr.vance@hopehealth.org',
    verificationCode: 'VER-DNTL-7749',
    notes: 'Greeted 38 dental patients and coordinated bilingual intake documentation.',
  },
  {
    id: 'rec-513',
    eventId: 'evt-prev-13',
    eventTitle: 'Earth Month Puget Sound Beach Plastics Sweep',
    organization: 'Puget Sound Environmental Trust',
    category: 'Environment',
    date: '2026-04-18',
    hours: 4.5,
    status: 'verified',
    supervisorName: 'Marcus Reed',
    supervisorEmail: 'm.reed@pugetenvironment.org',
    verificationCode: 'VER-EART-9921',
    notes: 'Collected 85 lbs of non-biodegradable debris and micro-plastics along Alki Point.',
  },
  {
    id: 'rec-514',
    eventId: 'evt-prev-14',
    eventTitle: 'Spring Produce Harvest & Food Hub Transport',
    organization: 'Cascadia Community Food Relief',
    category: 'Food Relief',
    date: '2026-04-03',
    hours: 4.0,
    status: 'verified',
    supervisorName: 'Sarah Jenkins',
    supervisorEmail: 's.jenkins@cascadiafood.org',
    verificationCode: 'VER-HARV-8822',
    notes: 'Harvested organic root vegetables at urban partner farm and loaded transport van.',
  }
];

export const initialBadges: DigitalBadge[] = [
  {
    id: 'badge-1',
    title: 'First Step Volunteer',
    category: 'Milestone',
    description: 'Completed your very first certified community service shift.',
    requirement: '1+ Verified Hours',
    rarity: 'Bronze',
    iconName: 'Compass',
    earned: true,
    earnedDate: 'March 14, 2025',
    currentProgress: 1,
    targetProgress: 1,
    progressUnit: 'hours',
    colorTheme: {
      bg: 'bg-amber-50',
      border: 'border-amber-300',
      text: 'text-amber-800',
      accent: 'bg-amber-600'
    }
  },
  {
    id: 'badge-2',
    title: 'Bronze Helper',
    category: 'Milestone',
    description: 'Surpassed 10 hours of active civic support in the community.',
    requirement: '10+ Verified Hours',
    rarity: 'Bronze',
    iconName: 'Award',
    earned: true,
    earnedDate: 'May 09, 2025',
    currentProgress: 10,
    targetProgress: 10,
    progressUnit: 'hours',
    colorTheme: {
      bg: 'bg-amber-50',
      border: 'border-amber-300',
      text: 'text-amber-900',
      accent: 'bg-amber-700'
    }
  },
  {
    id: 'badge-3',
    title: 'Community Pillar',
    category: 'Milestone',
    description: 'Reached 25 verified hours across diverse non-profit organizations.',
    requirement: '25+ Verified Hours',
    rarity: 'Silver',
    iconName: 'ShieldCheck',
    earned: true,
    earnedDate: 'June 19, 2025',
    currentProgress: 25,
    targetProgress: 25,
    progressUnit: 'hours',
    colorTheme: {
      bg: 'bg-slate-100',
      border: 'border-slate-300',
      text: 'text-slate-800',
      accent: 'bg-slate-600'
    }
  },
  {
    id: 'badge-4',
    title: 'Golden Heart Champion',
    category: 'Milestone',
    description: 'Achieved over 50 hours of verified community service excellence.',
    requirement: '50+ Verified Hours',
    rarity: 'Gold',
    iconName: 'HeartHandshake',
    earned: true,
    earnedDate: 'August 28, 2026',
    currentProgress: 52.5,
    targetProgress: 50,
    progressUnit: 'hours',
    colorTheme: {
      bg: 'bg-amber-100/60',
      border: 'border-amber-400',
      text: 'text-amber-900',
      accent: 'bg-yellow-500'
    }
  },
  {
    id: 'badge-5',
    title: 'Century Legend',
    category: 'Milestone',
    description: 'The premier volunteer honor for contributing 100+ lifetime verified hours.',
    requirement: '100+ Verified Hours',
    rarity: 'Platinum',
    iconName: 'Sparkles',
    earned: false,
    currentProgress: 52.5,
    targetProgress: 100,
    progressUnit: 'hours',
    colorTheme: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-300',
      text: 'text-indigo-900',
      accent: 'bg-indigo-600'
    }
  },
  {
    id: 'badge-6',
    title: 'Earth Guardian',
    category: 'Cause Impact',
    description: 'Contributed 20+ hours toward environmental stewardship and coastal ecology.',
    requirement: '20 Environmental Hours',
    rarity: 'Gold',
    iconName: 'Trees',
    earned: true,
    earnedDate: 'August 28, 2026',
    currentProgress: 24.5,
    targetProgress: 20,
    progressUnit: 'hours',
    colorTheme: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-300',
      text: 'text-emerald-900',
      accent: 'bg-emerald-600'
    }
  },
  {
    id: 'badge-7',
    title: 'Food Security Advocate',
    category: 'Cause Impact',
    description: 'Logged 15+ hours fighting food insecurity and assembling nutritious meals.',
    requirement: '15 Food Relief Hours',
    rarity: 'Silver',
    iconName: 'Apple',
    earned: true,
    earnedDate: 'August 21, 2026',
    currentProgress: 17.5,
    targetProgress: 15,
    progressUnit: 'hours',
    colorTheme: {
      bg: 'bg-orange-50',
      border: 'border-orange-300',
      text: 'text-orange-900',
      accent: 'bg-orange-600'
    }
  },
  {
    id: 'badge-8',
    title: 'Reliability Star',
    category: 'Performance',
    description: 'Maintained 100% attendance rate with zero no-shows across 10+ consecutive shifts.',
    requirement: '10 Consecutive Attended Shifts',
    rarity: 'Platinum',
    iconName: 'Flame',
    earned: true,
    earnedDate: 'July 16, 2026',
    currentProgress: 14,
    targetProgress: 10,
    progressUnit: 'shifts',
    colorTheme: {
      bg: 'bg-purple-50',
      border: 'border-purple-300',
      text: 'text-purple-900',
      accent: 'bg-purple-600'
    }
  }
];

export const initialConversations: Conversation[] = [
  {
    id: 'conv-1',
    name: 'Marcus Reed',
    role: 'Team Leader • Community Festival',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    type: 'direct',
    isOnline: true,
    unreadCount: 1,
    lastMessage: 'All set for Gate 2! Bring a jacket as the morning breeze off the sound is crisp.',
    lastTimestamp: '08:15 AM',
    messages: [
      {
        id: 'msg-1',
        senderId: 'organizer-marcus',
        senderName: 'Marcus Reed',
        senderRole: 'Team Leader',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        text: 'Hi Maya! Thanks for stepping up for the Gate 2 Registration Lead role today.',
        timestamp: '07:30 AM',
        isVolunteer: false,
      },
      {
        id: 'msg-2',
        senderId: 'vol-8921',
        senderName: 'Maya Chen',
        senderRole: 'Volunteer',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        text: 'Good morning Marcus! Tablets are booted up and battery packs tested. Ready for crowd arrivals.',
        timestamp: '07:45 AM',
        isVolunteer: true,
      },
      {
        id: 'msg-3',
        senderId: 'organizer-marcus',
        senderName: 'Marcus Reed',
        senderRole: 'Team Leader',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        text: 'All set for Gate 2! Bring a jacket as the morning breeze off the sound is crisp.',
        timestamp: '08:15 AM',
        isVolunteer: false,
      }
    ]
  },
  {
    id: 'conv-2',
    name: 'Sarah Jenkins',
    role: 'Volunteer Coordinator • Cascadia Food Bank',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    type: 'direct',
    isOnline: false,
    unreadCount: 0,
    lastMessage: 'Your hours from the evening kitchen shift were verified and logged. Thank you!',
    lastTimestamp: 'Yesterday',
    messages: [
      {
        id: 'msg-4',
        senderId: 'organizer-sarah',
        senderName: 'Sarah Jenkins',
        senderRole: 'Coordinator',
        senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
        text: 'Your hours from the evening kitchen shift were verified and logged. Thank you!',
        timestamp: 'Yesterday at 04:15 PM',
        isVolunteer: false,
      }
    ]
  },
  {
    id: 'conv-3',
    name: 'Registration Team Dispatch',
    role: 'Team Channel • Community Festival 2026',
    avatar: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=120&auto=format&fit=crop&q=80',
    type: 'channel',
    isOnline: true,
    unreadCount: 2,
    lastMessage: 'Marcus: Gate 1 reroute in effect until 8:40 AM. Please welcome arriving guests.',
    lastTimestamp: '08:08 AM',
    messages: [
      {
        id: 'msg-5',
        senderId: 'organizer-marcus',
        senderName: 'Marcus Reed',
        senderRole: 'Team Leader',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        text: 'Good morning crew! Please radio channel 1 if you need extra wristband boxes.',
        timestamp: '07:50 AM',
        isVolunteer: false,
      },
      {
        id: 'msg-6',
        senderId: 'organizer-marcus',
        senderName: 'Marcus Reed',
        senderRole: 'Team Leader',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        text: 'Marcus: Gate 1 reroute in effect until 8:40 AM. Please welcome arriving guests.',
        timestamp: '08:08 AM',
        isVolunteer: false,
      }
    ]
  }
];

export const initialEmailNotifications: AutomatedEmailNotification[] = [
  {
    id: 'mail-1',
    type: 'badge_unlocked',
    subject: 'Milestone Achieved: You earned the Golden Heart Champion Badge (50 Hours)!',
    recipientEmail: 'maya.chen@example.org',
    senderName: 'VolunteerHub Automated Milestone Service',
    senderEmail: 'awards@volunteerhub.org',
    timestamp: 'August 28, 2026, 05:12 PM',
    isRead: false,
    previewText: 'Congratulations Maya! You have officially exceeded 50 hours of verified civic contribution in our community...',
    htmlContent: `
      <div style="font-family: sans-serif; line-height: 1.6; color: #1e293b;">
        <h2 style="color: #d97706; margin-bottom: 8px;">🌟 Congratulations, Maya!</h2>
        <p>You have unlocked the <strong>Golden Heart Champion</strong> digital badge by surpassing <strong>50 verified service hours</strong>!</p>
        <div style="background: #fef3c7; border: 1px solid #fde68a; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p style="margin: 0; font-weight: bold; color: #92400e;">Milestone: 52.5 Total Verified Hours</p>
          <p style="margin: 4px 0 0 0; color: #b45309; font-size: 14px;">Your service has contributed directly to emergency food hampers, coastline ecology, and youth education.</p>
        </div>
        <p>You can now download your updated Official Certificate of Service and share your digital badge milestone directly on LinkedIn and X.</p>
      </div>
    `,
    actionLabel: 'View Certificate & Badges',
    actionUrlTab: 'certificates'
  },
  {
    id: 'mail-2',
    type: 'event_signup',
    subject: 'Shift Confirmed: Community Festival 2026',
    recipientEmail: 'maya.chen@example.org',
    senderName: 'Seattle Civic Events via VolunteerHub',
    senderEmail: 'notifications@volunteerhub.org',
    timestamp: 'September 01, 2026, 09:30 AM',
    isRead: true,
    previewText: 'Your registration for Community Festival 2026 is confirmed for Saturday, Sep 12, 2026 (08:00 AM - 12:00 PM)...',
    htmlContent: `
      <div style="font-family: sans-serif; line-height: 1.6; color: #1e293b;">
        <h2 style="color: #059669; margin-bottom: 8px;">✅ Shift Registration Confirmed</h2>
        <p>Dear Maya, your spot for <strong>Community Festival 2026</strong> is locked in.</p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0; background: #f8fafc; border-radius: 8px;">
          <tr><td style="padding: 8px 12px; font-weight: bold; width: 140px;">Date & Time:</td><td style="padding: 8px 12px;">Saturday, Sep 12, 2026 (08:00 AM - 12:00 PM)</td></tr>
          <tr><td style="padding: 8px 12px; font-weight: bold;">Location:</td><td style="padding: 8px 12px;">Seattle Center Plaza & Exhibition Hall, Gate 2</td></tr>
          <tr><td style="padding: 8px 12px; font-weight: bold;">Team / Role:</td><td style="padding: 8px 12px;">Registration Team / Check-in Specialist</td></tr>
          <tr><td style="padding: 8px 12px; font-weight: bold;">Supervisor:</td><td style="padding: 8px 12px;">Marcus Reed (m.reed@seattlecivic.org)</td></tr>
        </table>
        <p style="font-size: 14px; color: #64748b;">An automated reminder will be dispatched 24 hours prior to shift commencement.</p>
      </div>
    `,
    actionLabel: 'View Schedule',
    actionUrlTab: 'schedule'
  },
  {
    id: 'mail-3',
    type: 'hours_verified',
    subject: 'Hours Approved: +5.0 Hours logged for Urban Canopy Reforestation',
    recipientEmail: 'maya.chen@example.org',
    senderName: 'Volunteer Verification Engine',
    senderEmail: 'verification@volunteerhub.org',
    timestamp: 'August 29, 2026, 02:40 PM',
    isRead: true,
    previewText: 'Supervisor Marcus Reed has verified your 5.0 hours of service. Verification Code: VER-TREE-8910...',
    htmlContent: `
      <div style="font-family: sans-serif; line-height: 1.6; color: #1e293b;">
        <h2 style="color: #2563eb; margin-bottom: 8px;">🎖️ Service Hours Approved</h2>
        <p>Supervisor Marcus Reed has approved your service record for <strong>Urban Canopy Reforestation & Tree Planting</strong>.</p>
        <p><strong>Approved Hours:</strong> +5.0 Hours<br/><strong>Verification Code:</strong> VER-TREE-8910</p>
        <p><em>"Planted 42 native conifers and spread organic mulch across sector C. Excellent leadership."</em> — Marcus Reed</p>
        <p>These hours have been automatically added to your lifetime service transcript.</p>
      </div>
    `,
    actionLabel: 'View Service Records',
    actionUrlTab: 'reports'
  }
];

export const initialSettings: AppSettings = {
  timezone: 'America/Los_Angeles (Pacific Time, UTC-7)',
  dateFormat: 'MMM DD, YYYY',
  timeFormat: '12h',
  preferredLanguage: 'English (US)',
  travelRadiusMiles: 15,
  maxWeeklyHours: 20,
  transportationMode: 'driving',
  calendarSyncEnabled: true,

  emailShiftConfirmation: true,
  emailReminders24h: true,
  emailMonthlyDigest: true,
  smsShiftAlerts: true,
  smsEmergencyBroadcasts: true,
  inAppSounds: true,
  quietHoursEnabled: true,
  quietHoursStart: '21:30',
  quietHoursEnd: '07:30',

  shareContactWithTeam: true,
  showOnCommunityLeaderboard: true,
  allowDirectMessagingFromVolunteers: true,
  emergencyContactVisibility: 'all_supervisors',

  autoPromptGeofenceCheckin: true,
  vibrateOnScan: true,
  defaultCheckInMethod: 'QR',

  themeMode: 'system',
  highContrastMode: false,
  compactView: false,
  fontSizeScale: 'normal',

  twoFactorAuth: true,
  sessionTimeoutMinutes: 60,
  backgroundCheckStatus: 'Cleared',
  backgroundCheckDate: 'January 18, 2026',
  liabilityWaiverSigned: true,
  codeOfConductAccepted: true
};

