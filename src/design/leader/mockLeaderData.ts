// @ts-nocheck

import {
  Volunteer,
  TeamTask,
  TodayAttendanceRecord,
  IncidentReport,
  TrainingModule,
  VolunteerTrainingStatus,
  OperationalRequest,
  VolunteerFeedbackRecord,
  OrganiserAnnouncement
} from './types';
import { INITIAL_BADGES } from './mockData';

// 20 Assigned Volunteers for Leader Sarah Jenkins's Team: "Team Alpha - Registration & Welcome"
export const LEADER_ASSIGNED_VOLUNTEERS: Volunteer[] = [
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
    skills: ['Check-in Systems', 'Spanish Bilingual', 'First Aid / CPR', 'Conflict Resolution'],
    emergencyContact: { name: 'Mikhail Rostova', phone: '(555) 998-1122', relationship: 'Spouse' },
    backgroundCheckStatus: 'Approved',
    badges: [INITIAL_BADGES[0], INITIAL_BADGES[1], INITIAL_BADGES[2], INITIAL_BADGES[4]],
    attendanceRate: 98,
    shiftsCompleted: 28,
    notes: 'Assistant lead for Counter A. Handles VIP check-ins and attendee inquiries.'
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
    skills: ['Badge Printing', 'Equipment Setup', 'Queue Flow'],
    emergencyContact: { name: 'Tanya Vance', phone: '(555) 782-9011', relationship: 'Sister' },
    backgroundCheckStatus: 'Approved',
    badges: [INITIAL_BADGES[0], INITIAL_BADGES[1], INITIAL_BADGES[5]],
    attendanceRate: 95,
    shiftsCompleted: 15,
    notes: 'Handles high-speed badge printing station.'
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
    joinedDate: '2023-11-05',
    skills: ['Arabic Bilingual', 'Queue Management', 'Attendee Assistance'],
    emergencyContact: { name: 'Farhan Mansoor', phone: '(555) 334-9988', relationship: 'Brother' },
    backgroundCheckStatus: 'Approved',
    badges: [INITIAL_BADGES[0], INITIAL_BADGES[1], INITIAL_BADGES[2], INITIAL_BADGES[3]],
    attendanceRate: 100,
    shiftsCompleted: 42,
    notes: 'Master of queue flow management and attendee direction.'
  },
  {
    id: 'vol-4',
    name: 'Jordan Rivera',
    email: 'jordan.rivera@example.org',
    phone: '(555) 671-2098',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'Volunteer',
    status: 'Active',
    totalHours: 45,
    verifiedHours: 40,
    pendingHours: 5,
    joinedDate: '2024-08-01',
    skills: ['Registration Desk', 'Mobile App Scanning', 'Crowd Direction'],
    emergencyContact: { name: 'Lucia Rivera', phone: '(555) 441-2099', relationship: 'Mother' },
    backgroundCheckStatus: 'Approved',
    badges: [INITIAL_BADGES[0]],
    attendanceRate: 92,
    shiftsCompleted: 9,
    notes: 'Assigned to Registration Counter B.'
  },
  {
    id: 'vol-5',
    name: 'Chloe Bennett',
    email: 'chloe.bennett@example.org',
    phone: '(555) 912-8834',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    role: 'New Recruit',
    status: 'On-boarding',
    totalHours: 12,
    verifiedHours: 8,
    pendingHours: 4,
    joinedDate: '2026-08-20',
    skills: ['Welcome Hospitality', 'Information Desk'],
    emergencyContact: { name: 'Samuel Bennett', phone: '(555) 231-0091', relationship: 'Brother' },
    backgroundCheckStatus: 'Approved',
    badges: [],
    attendanceRate: 100,
    shiftsCompleted: 2,
    notes: 'Pairing with Amina for queue flow orientation.'
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
    skills: ['Badge Printing', 'Technical Support', 'Korean Bilingual'],
    emergencyContact: { name: 'Grace Cho', phone: '(555) 887-1245', relationship: 'Spouse' },
    backgroundCheckStatus: 'Approved',
    badges: [INITIAL_BADGES[0], INITIAL_BADGES[1]],
    attendanceRate: 94,
    shiftsCompleted: 21,
    notes: 'Badge printer hardware specialist.'
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
    skills: ['Registration Software', 'Hindi Bilingual', 'VIP Hospitality'],
    emergencyContact: { name: 'Raj Patel', phone: '(555) 901-2233', relationship: 'Parent' },
    backgroundCheckStatus: 'Approved',
    badges: [INITIAL_BADGES[0], INITIAL_BADGES[1], INITIAL_BADGES[2]],
    attendanceRate: 97,
    shiftsCompleted: 34,
    notes: 'Lead for Speaker and VIP check-in station.'
  },
  {
    id: 'vol-8',
    name: 'Liam O\'Connor',
    email: 'liam.oconnor@example.org',
    phone: '(555) 678-4321',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    role: 'Volunteer',
    status: 'Active',
    totalHours: 32,
    verifiedHours: 28,
    pendingHours: 4,
    joinedDate: '2024-07-22',
    skills: ['Swag & Kit Assembly', 'Directional Ushering'],
    emergencyContact: { name: 'Brigid O\'Connor', phone: '(555) 678-4322', relationship: 'Mother' },
    backgroundCheckStatus: 'Approved',
    badges: [INITIAL_BADGES[0]],
    attendanceRate: 91,
    shiftsCompleted: 8,
    notes: 'Assigned to Welcome Kit & Lanyard Distribution Desk.'
  },
  {
    id: 'vol-9',
    name: 'Fatima Zahra',
    email: 'fatima.z@example.org',
    phone: '(555) 789-0123',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
    role: 'Volunteer',
    status: 'Active',
    totalHours: 54,
    verifiedHours: 50,
    pendingHours: 4,
    joinedDate: '2024-05-11',
    skills: ['French Bilingual', 'Information Desk', 'Accessibility Support'],
    emergencyContact: { name: 'Tariq Zahra', phone: '(555) 789-0124', relationship: 'Father' },
    backgroundCheckStatus: 'Approved',
    badges: [INITIAL_BADGES[0], INITIAL_BADGES[1]],
    attendanceRate: 96,
    shiftsCompleted: 14,
    notes: 'Accessibility & Special Assistance lead.'
  },
  {
    id: 'vol-10',
    name: 'Carlos Mendez',
    email: 'carlos.m@example.org',
    phone: '(555) 890-1234',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    role: 'Volunteer',
    status: 'Active',
    totalHours: 76,
    verifiedHours: 72,
    pendingHours: 4,
    joinedDate: '2024-02-14',
    skills: ['Spanish Bilingual', 'Check-in Desk', 'Scanner Maintenance'],
    emergencyContact: { name: 'Maria Mendez', phone: '(555) 890-1235', relationship: 'Spouse' },
    backgroundCheckStatus: 'Approved',
    badges: [INITIAL_BADGES[0], INITIAL_BADGES[1]],
    attendanceRate: 94,
    shiftsCompleted: 19,
    notes: 'Assigned to Registration Counter C.'
  },
  {
    id: 'vol-11',
    name: 'Grace Kim',
    email: 'grace.kim@example.org',
    phone: '(555) 901-2345',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    role: 'Volunteer',
    status: 'Active',
    totalHours: 68,
    verifiedHours: 64,
    pendingHours: 4,
    joinedDate: '2024-04-03',
    skills: ['Attendee Hospitality', 'Registration Desk', 'Signage Placement'],
    emergencyContact: { name: 'Jin Kim', phone: '(555) 901-2346', relationship: 'Brother' },
    backgroundCheckStatus: 'Approved',
    badges: [INITIAL_BADGES[0], INITIAL_BADGES[1]],
    attendanceRate: 95,
    shiftsCompleted: 16,
    notes: 'Assigned to General Registration Desk.'
  },
  {
    id: 'vol-12',
    name: 'Dante Rossi',
    email: 'dante.rossi@example.org',
    phone: '(555) 012-3456',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    role: 'Volunteer',
    status: 'Active',
    totalHours: 48,
    verifiedHours: 44,
    pendingHours: 4,
    joinedDate: '2024-06-25',
    skills: ['Queue Flow', 'Radios & Comms', 'Crowd Direction'],
    emergencyContact: { name: 'Giulia Rossi', phone: '(555) 012-3457', relationship: 'Sister' },
    backgroundCheckStatus: 'Approved',
    badges: [INITIAL_BADGES[0]],
    attendanceRate: 93,
    shiftsCompleted: 11,
    notes: 'Queue steward for main lobby entrance.'
  },
  {
    id: 'vol-13',
    name: 'Ananya Sharma',
    email: 'ananya.s@example.org',
    phone: '(555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    role: 'Volunteer',
    status: 'Active',
    totalHours: 58,
    verifiedHours: 54,
    pendingHours: 4,
    joinedDate: '2024-03-29',
    skills: ['Check-in Verification', 'Hindi Bilingual', 'Badge Distribution'],
    emergencyContact: { name: 'Sanjay Sharma', phone: '(555) 123-4568', relationship: 'Parent' },
    backgroundCheckStatus: 'Approved',
    badges: [INITIAL_BADGES[0], INITIAL_BADGES[1]],
    attendanceRate: 96,
    shiftsCompleted: 14,
    notes: 'Registration Counter A team member.'
  },
  {
    id: 'vol-14',
    name: 'Kofi Mensah',
    email: 'kofi.mensah@example.org',
    phone: '(555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80',
    role: 'Volunteer',
    status: 'Active',
    totalHours: 64,
    verifiedHours: 60,
    pendingHours: 4,
    joinedDate: '2024-05-18',
    skills: ['First Aid / CPR', 'Heavy Setup', 'Attendee Flow'],
    emergencyContact: { name: 'Abena Mensah', phone: '(555) 234-5679', relationship: 'Spouse' },
    backgroundCheckStatus: 'Approved',
    badges: [INITIAL_BADGES[0], INITIAL_BADGES[1], INITIAL_BADGES[4]],
    attendanceRate: 95,
    shiftsCompleted: 15,
    notes: 'First Aid certified anchor on duty in Welcome Lobby.'
  },
  {
    id: 'vol-15',
    name: 'Sarah Lindqvist',
    email: 'sarah.l@example.org',
    phone: '(555) 345-6789',
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&auto=format&fit=crop&q=80',
    role: 'Volunteer',
    status: 'Active',
    totalHours: 52,
    verifiedHours: 48,
    pendingHours: 4,
    joinedDate: '2024-06-10',
    skills: ['Welcome Bag Packing', 'Helpdesk Support'],
    emergencyContact: { name: 'Erik Lindqvist', phone: '(555) 345-6790', relationship: 'Father' },
    backgroundCheckStatus: 'Approved',
    badges: [INITIAL_BADGES[0]],
    attendanceRate: 94,
    shiftsCompleted: 12,
    notes: 'Welcome kit coordinator.'
  },
  {
    id: 'vol-16',
    name: 'Tariq Hassan',
    email: 'tariq.h@example.org',
    phone: '(555) 456-7890',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    role: 'Volunteer',
    status: 'Active',
    totalHours: 70,
    verifiedHours: 66,
    pendingHours: 4,
    joinedDate: '2024-02-28',
    skills: ['Check-in Verification', 'Arabic Bilingual', 'Technical Troubleshooting'],
    emergencyContact: { name: 'Layla Hassan', phone: '(555) 456-7891', relationship: 'Sister' },
    backgroundCheckStatus: 'Approved',
    badges: [INITIAL_BADGES[0], INITIAL_BADGES[1]],
    attendanceRate: 97,
    shiftsCompleted: 18,
    notes: 'Handles high-volume rush hours.'
  },
  {
    id: 'vol-17',
    name: 'Maya Lin',
    email: 'maya.lin@example.org',
    phone: '(555) 567-8901',
    avatar: 'https://images.unsplash.com/photo-1534751516642-a1714f5260ec?w=150&auto=format&fit=crop&q=80',
    role: 'Volunteer',
    status: 'Active',
    totalHours: 42,
    verifiedHours: 38,
    pendingHours: 4,
    joinedDate: '2024-07-05',
    skills: ['Mandarin Bilingual', 'VIP Greeting', 'Registration'],
    emergencyContact: { name: 'Wei Lin', phone: '(555) 567-8902', relationship: 'Mother' },
    backgroundCheckStatus: 'Approved',
    badges: [INITIAL_BADGES[0]],
    attendanceRate: 93,
    shiftsCompleted: 10,
    notes: 'Registration Desk B bilingual specialist.'
  },
  {
    id: 'vol-18',
    name: 'Lucas Silva',
    email: 'lucas.silva@example.org',
    phone: '(555) 678-9012',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    role: 'Volunteer',
    status: 'Active',
    totalHours: 38,
    verifiedHours: 34,
    pendingHours: 4,
    joinedDate: '2024-08-12',
    skills: ['Portuguese Bilingual', 'Queue Management', 'Event App Guide'],
    emergencyContact: { name: 'Beatriz Silva', phone: '(555) 678-9013', relationship: 'Spouse' },
    backgroundCheckStatus: 'Approved',
    badges: [INITIAL_BADGES[0]],
    attendanceRate: 92,
    shiftsCompleted: 9,
    notes: 'Lobby entry usher.'
  },
  {
    id: 'vol-19',
    name: 'Zoe Washington',
    email: 'zoe.w@example.org',
    phone: '(555) 789-0124',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
    role: 'Volunteer',
    status: 'Active',
    totalHours: 28,
    verifiedHours: 24,
    pendingHours: 4,
    joinedDate: '2024-08-25',
    skills: ['Welcome Hospitality', 'Registration'],
    emergencyContact: { name: 'Darnell Washington', phone: '(555) 789-0125', relationship: 'Brother' },
    backgroundCheckStatus: 'Approved',
    badges: [],
    attendanceRate: 88,
    shiftsCompleted: 6,
    notes: 'Today marked Late due to transit disruption (arrived at 08:15 AM).'
  },
  {
    id: 'vol-20',
    name: 'Ethan Huntley',
    email: 'ethan.h@example.org',
    phone: '(555) 890-1236',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&auto=format&fit=crop&q=80',
    role: 'Volunteer',
    status: 'Active',
    totalHours: 22,
    verifiedHours: 20,
    pendingHours: 0,
    joinedDate: '2024-09-01',
    skills: ['Logistics Support', 'Signage'],
    emergencyContact: { name: 'Karen Huntley', phone: '(555) 890-1237', relationship: 'Mother' },
    backgroundCheckStatus: 'Approved',
    badges: [],
    attendanceRate: 80,
    shiftsCompleted: 4,
    notes: 'Excused Absence today due to family emergency. Replacement requested from Organiser.'
  }
];

// Today's Attendance for Sarah's 20 Team Members:
// EXACT DASHBOARD REQUIREMENT: 18 Present, 1 Absent, 1 Late (Total 20)
export const INITIAL_TODAY_ATTENDANCE: TodayAttendanceRecord[] = [
  {
    volunteerId: 'vol-1',
    volunteerName: 'Elena Rostova',
    volunteerRole: 'Team Lead',
    avatar: LEADER_ASSIGNED_VOLUNTEERS[0].avatar,
    status: 'Present',
    checkInTime: '07:35 AM',
    remarks: 'Early arrival, assisted with equipment staging',
    isSubmittedToOrganiser: false
  },
  {
    volunteerId: 'vol-2',
    volunteerName: 'Marcus Vance',
    volunteerRole: 'Volunteer',
    avatar: LEADER_ASSIGNED_VOLUNTEERS[1].avatar,
    status: 'Present',
    checkInTime: '07:42 AM',
    remarks: 'Configured thermal badge printers',
    isSubmittedToOrganiser: false
  },
  {
    volunteerId: 'vol-3',
    volunteerName: 'Amina Al-Mansoor',
    volunteerRole: 'Specialist',
    avatar: LEADER_ASSIGNED_VOLUNTEERS[2].avatar,
    status: 'Present',
    checkInTime: '07:40 AM',
    remarks: 'Positioned stanchions and queue signs',
    isSubmittedToOrganiser: false
  },
  {
    volunteerId: 'vol-4',
    volunteerName: 'Jordan Rivera',
    volunteerRole: 'Volunteer',
    avatar: LEADER_ASSIGNED_VOLUNTEERS[3].avatar,
    status: 'Present',
    checkInTime: '07:45 AM',
    remarks: 'On duty at Counter B',
    isSubmittedToOrganiser: false
  },
  {
    volunteerId: 'vol-5',
    volunteerName: 'Chloe Bennett',
    volunteerRole: 'New Recruit',
    avatar: LEADER_ASSIGNED_VOLUNTEERS[4].avatar,
    status: 'Present',
    checkInTime: '07:44 AM',
    remarks: 'Paired with Amina for first live shift',
    isSubmittedToOrganiser: false
  },
  {
    volunteerId: 'vol-6',
    volunteerName: 'David Cho',
    volunteerRole: 'Volunteer',
    avatar: LEADER_ASSIGNED_VOLUNTEERS[5].avatar,
    status: 'Present',
    checkInTime: '07:38 AM',
    remarks: 'Printer firmware verified',
    isSubmittedToOrganiser: false
  },
  {
    volunteerId: 'vol-7',
    volunteerName: 'Priya Patel',
    volunteerRole: 'Specialist',
    avatar: LEADER_ASSIGNED_VOLUNTEERS[6].avatar,
    status: 'Present',
    checkInTime: '07:41 AM',
    remarks: 'VIP credentials pre-sorted',
    isSubmittedToOrganiser: false
  },
  {
    volunteerId: 'vol-8',
    volunteerName: 'Liam O\'Connor',
    volunteerRole: 'Volunteer',
    avatar: LEADER_ASSIGNED_VOLUNTEERS[7].avatar,
    status: 'Present',
    checkInTime: '07:47 AM',
    remarks: 'Stationed at Welcome Kit distribution',
    isSubmittedToOrganiser: false
  },
  {
    volunteerId: 'vol-9',
    volunteerName: 'Fatima Zahra',
    volunteerRole: 'Volunteer',
    avatar: LEADER_ASSIGNED_VOLUNTEERS[8].avatar,
    status: 'Present',
    checkInTime: '07:43 AM',
    remarks: 'Accessibility wheelchair lane open',
    isSubmittedToOrganiser: false
  },
  {
    volunteerId: 'vol-10',
    volunteerName: 'Carlos Mendez',
    volunteerRole: 'Volunteer',
    avatar: LEADER_ASSIGNED_VOLUNTEERS[9].avatar,
    status: 'Present',
    checkInTime: '07:46 AM',
    remarks: 'Counter C scanner activated',
    isSubmittedToOrganiser: false
  },
  {
    volunteerId: 'vol-11',
    volunteerName: 'Grace Kim',
    volunteerRole: 'Volunteer',
    avatar: LEADER_ASSIGNED_VOLUNTEERS[10].avatar,
    status: 'Present',
    checkInTime: '07:45 AM',
    remarks: 'On duty at general check-in desk',
    isSubmittedToOrganiser: false
  },
  {
    volunteerId: 'vol-12',
    volunteerName: 'Dante Rossi',
    volunteerRole: 'Volunteer',
    avatar: LEADER_ASSIGNED_VOLUNTEERS[11].avatar,
    status: 'Present',
    checkInTime: '07:48 AM',
    remarks: 'Lobby glass door queue control',
    isSubmittedToOrganiser: false
  },
  {
    volunteerId: 'vol-13',
    volunteerName: 'Ananya Sharma',
    volunteerRole: 'Volunteer',
    avatar: LEADER_ASSIGNED_VOLUNTEERS[12].avatar,
    status: 'Present',
    checkInTime: '07:44 AM',
    remarks: 'On duty at Counter A check-in desk',
    isSubmittedToOrganiser: false
  },
  {
    volunteerId: 'vol-14',
    volunteerName: 'Kofi Mensah',
    volunteerRole: 'Volunteer',
    avatar: LEADER_ASSIGNED_VOLUNTEERS[13].avatar,
    status: 'Present',
    checkInTime: '07:39 AM',
    remarks: 'First Aid kit checked and present',
    isSubmittedToOrganiser: false
  },
  {
    volunteerId: 'vol-15',
    volunteerName: 'Sarah Lindqvist',
    volunteerRole: 'Volunteer',
    avatar: LEADER_ASSIGNED_VOLUNTEERS[14].avatar,
    status: 'Present',
    checkInTime: '07:49 AM',
    remarks: 'Restocked lanyard supply bins',
    isSubmittedToOrganiser: false
  },
  {
    volunteerId: 'vol-16',
    volunteerName: 'Tariq Hassan',
    volunteerRole: 'Volunteer',
    avatar: LEADER_ASSIGNED_VOLUNTEERS[15].avatar,
    status: 'Present',
    checkInTime: '07:42 AM',
    remarks: 'On duty Counter A overflow',
    isSubmittedToOrganiser: false
  },
  {
    volunteerId: 'vol-17',
    volunteerName: 'Maya Lin',
    volunteerRole: 'Volunteer',
    avatar: LEADER_ASSIGNED_VOLUNTEERS[16].avatar,
    status: 'Present',
    checkInTime: '07:47 AM',
    remarks: 'Counter B check-in',
    isSubmittedToOrganiser: false
  },
  {
    volunteerId: 'vol-18',
    volunteerName: 'Lucas Silva',
    volunteerRole: 'Volunteer',
    avatar: LEADER_ASSIGNED_VOLUNTEERS[17].avatar,
    status: 'Present',
    checkInTime: '07:45 AM',
    remarks: 'Directional ushering in atrium',
    isSubmittedToOrganiser: false
  },
  // 1 LATE
  {
    volunteerId: 'vol-19',
    volunteerName: 'Zoe Washington',
    volunteerRole: 'Volunteer',
    avatar: LEADER_ASSIGNED_VOLUNTEERS[18].avatar,
    status: 'Late',
    checkInTime: '08:15 AM',
    remarks: 'Subway Red Line delay, notified Leader in advance',
    isSubmittedToOrganiser: false
  },
  // 1 ABSENT
  {
    volunteerId: 'vol-20',
    volunteerName: 'Ethan Huntley',
    volunteerRole: 'Volunteer',
    avatar: LEADER_ASSIGNED_VOLUNTEERS[19].avatar,
    status: 'Absent',
    remarks: 'Family emergency, replacement requested from Organiser pool',
    isSubmittedToOrganiser: false
  }
];

// Tasks: EXACT DASHBOARD REQUIREMENT: 8 Tasks (6 Completed, 2 In Progress)
// With sub-assignments: Volunteer A Check-in, Volunteer B Registration, Volunteer C Queue Management
export const INITIAL_TEAM_TASKS: TeamTask[] = [
  {
    id: 'task-1',
    title: 'Registration Counter A: Primary Attendee Processing',
    description: 'Manage main morning attendee arrivals with barcode scanner check-in, name badge issuance, and queue control.',
    zone: 'Zone A - Lobby',
    location: 'Main Entrance - Counter A',
    priority: 'Urgent',
    status: 'In Progress',
    assignments: [
      { volunteerId: 'vol-1', volunteerName: 'Elena Rostova', subRole: 'Check-in Desk' },
      { volunteerId: 'vol-2', volunteerName: 'Marcus Vance', subRole: 'Badge Printing' },
      { volunteerId: 'vol-3', volunteerName: 'Amina Al-Mansoor', subRole: 'Queue Line Management' }
    ],
    deadline: 'Today at 12:30 PM',
    notes: 'Expect peak rush between 08:30 AM and 09:30 AM. Keep stanchion lanes single-file.',
    issuesReported: ['Printer ribbon jammed at 08:10 AM (cleared by Marcus)'],
    isEscalated: false
  },
  {
    id: 'task-2',
    title: 'Registration Counter B: Mobile App Scan & Helpdesk',
    description: 'Assist attendees with digital QR codes, troubleshoot registration discrepancies, and handle name corrections.',
    zone: 'Zone A - Lobby',
    location: 'Main Entrance - Counter B',
    priority: 'High',
    status: 'In Progress',
    assignments: [
      { volunteerId: 'vol-4', volunteerName: 'Jordan Rivera', subRole: 'Mobile QR Scanning' },
      { volunteerId: 'vol-17', volunteerName: 'Maya Lin', subRole: 'Discrepancy Desk' },
      { volunteerId: 'vol-5', volunteerName: 'Chloe Bennett', subRole: 'Queue Greeter' }
    ],
    deadline: 'Today at 01:00 PM',
    notes: 'Redirect unresolved registrations to Event Helpdesk in room 102.',
    issuesReported: [],
    isEscalated: false
  },
  {
    id: 'task-3',
    title: 'Badge Printing & Hardware Station Calibration',
    description: 'Set up 4 thermal printers, verify network IP addresses, and load 1,000 blank cardstocks.',
    zone: 'Zone A - Tech Table',
    location: 'Behind Registration Desks',
    priority: 'High',
    status: 'Completed',
    assignments: [
      { volunteerId: 'vol-6', volunteerName: 'David Cho', subRole: 'Hardware Calibration' },
      { volunteerId: 'vol-2', volunteerName: 'Marcus Vance', subRole: 'Network Sync' }
    ],
    deadline: 'Today at 07:30 AM',
    completedAt: 'Today at 07:25 AM',
    notes: 'All 4 printers connected to CAN-Event-Mesh. Speed test passed.',
    issuesReported: [],
    isEscalated: false
  },
  {
    id: 'task-4',
    title: 'Stanchion & Queue Directional Flow Setup',
    description: 'Erect retractable belt barriers, place overhead directional signage for General, VIP, and Accessibility lanes.',
    zone: 'Zone A - Lobby',
    location: 'Main Atrium Entrance',
    priority: 'Medium',
    status: 'Completed',
    assignments: [
      { volunteerId: 'vol-3', volunteerName: 'Amina Al-Mansoor', subRole: 'Queue Layout' },
      { volunteerId: 'vol-12', volunteerName: 'Dante Rossi', subRole: 'Stanchion Assembly' },
      { volunteerId: 'vol-18', volunteerName: 'Lucas Silva', subRole: 'Signage Placement' }
    ],
    deadline: 'Today at 07:45 AM',
    completedAt: 'Today at 07:40 AM',
    notes: 'ADA compliant 48-inch clear pathway maintained to ramps.',
    issuesReported: [],
    isEscalated: false
  },
  {
    id: 'task-5',
    title: 'Welcome Kits & Lanyard Bagging Assembly',
    description: 'Unbox and assemble 500 conference kits with badge pouches, event schedule booklets, and sponsored pens.',
    zone: 'Zone A - Storage Bay',
    location: 'Storage Bay 3',
    priority: 'Medium',
    status: 'Completed',
    assignments: [
      { volunteerId: 'vol-8', volunteerName: 'Liam O\'Connor', subRole: 'Kit Assembly' },
      { volunteerId: 'vol-15', volunteerName: 'Sarah Lindqvist', subRole: 'Lanyard Sorting' }
    ],
    deadline: 'Today at 08:00 AM',
    completedAt: 'Today at 07:55 AM',
    notes: '500 kits staged at distribution tables behind Counter A and B.',
    issuesReported: [],
    isEscalated: false
  },
  {
    id: 'task-6',
    title: 'VIP & Keynote Speaker Check-In Readiness',
    description: 'Verify VIP special badge credentials, green room access passes, and parking validation vouchers.',
    zone: 'Zone A - VIP Desk',
    location: 'Counter D (Private Alcove)',
    priority: 'High',
    status: 'Completed',
    assignments: [
      { volunteerId: 'vol-7', volunteerName: 'Priya Patel', subRole: 'VIP Credentials' },
      { volunteerId: 'vol-1', volunteerName: 'Elena Rostova', subRole: 'Green Room Escort Liaison' }
    ],
    deadline: 'Today at 08:00 AM',
    completedAt: 'Today at 07:50 AM',
    notes: 'Keynote speakers arriving between 08:15 and 08:45 AM. Escort ready.',
    issuesReported: [],
    isEscalated: false
  },
  {
    id: 'task-7',
    title: 'Accessibility & Special Assistance Staging',
    description: 'Set up wheelchair accessible registration desk, audio hearing loop devices, and large-print agenda books.',
    zone: 'Zone A - Accessibility Lane',
    location: 'Counter E (Ramp Access)',
    priority: 'High',
    status: 'Completed',
    assignments: [
      { volunteerId: 'vol-9', volunteerName: 'Fatima Zahra', subRole: 'Accessibility Host' },
      { volunteerId: 'vol-14', volunteerName: 'Kofi Mensah', subRole: 'Mobility Assistance' }
    ],
    deadline: 'Today at 08:00 AM',
    completedAt: 'Today at 07:45 AM',
    notes: '3 hearing loop kits tested and operational.',
    issuesReported: [],
    isEscalated: false
  },
  {
    id: 'task-8',
    title: 'Morning Team Safety & Logistics Briefing',
    description: 'Assemble all 20 team members, review emergency exits, fire alarms, walkie-talkie channel 4, and lunch rotations.',
    zone: 'Zone A - Team Circle',
    location: 'Registration Atrium Center',
    priority: 'Urgent',
    status: 'Completed',
    assignments: [
      { volunteerId: 'vol-1', volunteerName: 'Elena Rostova', subRole: 'Attendance Roll Call' },
      { volunteerId: 'vol-14', volunteerName: 'Kofi Mensah', subRole: 'First Aid Safety Review' }
    ],
    deadline: 'Today at 07:50 AM',
    completedAt: 'Today at 07:50 AM',
    notes: 'Leader Sarah Jenkins conducted briefing. Relay sent to team chat.',
    issuesReported: [],
    isEscalated: false
  }
];

// Open Incidents: EXACT DASHBOARD REQUIREMENT: 1 Open Incident (+ 2 resolved history)
export const INITIAL_INCIDENTS: IncidentReport[] = [
  {
    id: 'inc-01',
    category: 'Equipment / Supplies',
    title: 'Barcode Scanner #2 Hardware Failure at Counter B',
    description: 'Handheld laser scanner at Counter B is intermittently failing to read mobile barcodes, causing a 10-person line backlog during the morning influx.',
    severity: 'Medium',
    affectedTeam: 'Team Alpha - Registration',
    affectedVolunteerId: 'vol-4',
    affectedVolunteerName: 'Jordan Rivera',
    location: 'Main Entrance - Counter B',
    timestamp: 'Today at 08:12 AM',
    status: 'In Review',
    reportedBy: 'Sarah Jenkins (Leader)',
    notes: 'Swapped temporarily with manual name lookup. Requested spare scanner from Organiser equipment pool.',
    organiserResponse: 'Organiser Tech Support dispatching spare Zebra scanner from Room 104.'
  },
  {
    id: 'inc-02',
    category: 'Staffing Shortage',
    title: 'Unplanned Volunteer Absence for Welcome Desk',
    description: 'Ethan Huntley called in with family emergency. Welcome desk down 1 team member.',
    severity: 'Low',
    affectedTeam: 'Team Alpha - Registration',
    affectedVolunteerId: 'vol-20',
    affectedVolunteerName: 'Ethan Huntley',
    location: 'Welcome Desk',
    timestamp: 'Today at 07:15 AM',
    status: 'Resolved',
    reportedBy: 'Sarah Jenkins (Leader)',
    notes: 'Submitted replacement request to Organiser. Organiser assigned float volunteer Maya Lin.',
    organiserResponse: 'Reassigned Maya Lin to cover Ethan Huntley shift.'
  },
  {
    id: 'inc-03',
    category: 'Safety / Hazard',
    title: 'Liquid Spill Near Main Atrium Queue',
    description: 'Spilled coffee creating slip hazard along the main general attendee queue line.',
    severity: 'Medium',
    affectedTeam: 'Team Alpha - Registration',
    location: 'Lobby Atrium - Stanchion Lane 2',
    timestamp: 'Yesterday at 02:40 PM',
    status: 'Resolved',
    reportedBy: 'Sarah Jenkins (Leader)',
    notes: 'Kofi Mensah set out wet floor cone. Janitorial mopped area within 8 minutes.',
    organiserResponse: 'Hazard cleared and signed off.'
  }
];

// Operational Requests: EXACT DASHBOARD REQUIREMENT: 2 Pending Requests (+ 1 approved history)
export const INITIAL_OPERATIONAL_REQUESTS: OperationalRequest[] = [
  {
    id: 'req-01',
    type: 'Equipment',
    title: 'Request 1 Backup Handheld Barcode Scanner & USB Cable',
    description: 'Need 1 additional barcode scanner to replace failing unit at Registration Counter B and prevent attendee bottleneck.',
    urgency: 'Urgent',
    status: 'Pending',
    submittedAt: 'Today at 08:15 AM',
    leaderId: 'leader-sarah',
    leaderName: 'Sarah Jenkins',
    teamName: 'Team Alpha - Registration',
    organiserFeedback: 'Under review by Tech Equipment Logistics desk.'
  },
  {
    id: 'req-02',
    type: 'Team member replacement',
    title: 'Request 1 Relief Volunteer for Registration Counter B (Afternoon Shift)',
    description: 'Ethan Huntley had an emergency absence. Need 1 relief volunteer from general float pool for 12:30 PM - 04:30 PM shift.',
    urgency: 'Normal',
    status: 'Pending',
    submittedAt: 'Today at 07:30 AM',
    leaderId: 'leader-sarah',
    leaderName: 'Sarah Jenkins',
    teamName: 'Team Alpha - Registration',
    organiserFeedback: 'Organiser reviewing available reserve volunteer pool.'
  },
  {
    id: 'req-03',
    type: 'Additional volunteers',
    title: 'Request 2 Additional Lanyard Packers for Morning Setup',
    description: 'Extra help needed to pack 500 attendee welcome kits before doors open.',
    urgency: 'Urgent',
    status: 'Approved',
    submittedAt: 'Yesterday at 04:00 PM',
    leaderId: 'leader-sarah',
    leaderName: 'Sarah Jenkins',
    teamName: 'Team Alpha - Registration',
    allocatedResources: 'Approved: Float volunteers Liam & Sarah assigned to Team Alpha.',
    organiserFeedback: 'Approved and dispatched.'
  }
];

// Mandatory Training Modules & Volunteer Statuses
export const INITIAL_TRAINING_MODULES: TrainingModule[] = [
  {
    id: 'tr-01',
    title: 'Event Safety & Emergency Evacuation Protocols',
    description: 'Fire alarm procedures, medical emergency dispatch, AED locations, and active safety guidelines.',
    isMandatory: true,
    durationMinutes: 45,
    category: 'Safety & Compliance'
  },
  {
    id: 'tr-02',
    title: 'Registration Software & Scanner Setup',
    description: 'Check-in barcode scanning, name badge thermal printing, and attendee database lookups.',
    isMandatory: true,
    durationMinutes: 30,
    category: 'Operational Systems'
  },
  {
    id: 'tr-03',
    title: 'Customer Service & Accessibility Hospitality',
    description: 'De-escalating attendee friction, assisting attendees with disabilities, and inclusive language.',
    isMandatory: true,
    durationMinutes: 40,
    category: 'Customer Service'
  },
  {
    id: 'tr-04',
    title: 'Crowd Flow & Queue Safety Management',
    description: 'Stanchion layouts, maintaining 48-inch ADA pathways, and managing queue bottlenecks.',
    isMandatory: false,
    durationMinutes: 25,
    category: 'Queue Management'
  }
];

export const INITIAL_VOLUNTEER_TRAINING: VolunteerTrainingStatus[] = [
  { volunteerId: 'vol-1', volunteerName: 'Elena Rostova', moduleId: 'tr-01', moduleTitle: 'Event Safety Protocols', status: 'Completed', completedDate: '2026-08-10', score: 100 },
  { volunteerId: 'vol-1', volunteerName: 'Elena Rostova', moduleId: 'tr-02', moduleTitle: 'Registration Software', status: 'Completed', completedDate: '2026-08-11', score: 98 },
  { volunteerId: 'vol-1', volunteerName: 'Elena Rostova', moduleId: 'tr-03', moduleTitle: 'Customer Service & Accessibility', status: 'Completed', completedDate: '2026-08-12', score: 96 },

  { volunteerId: 'vol-2', volunteerName: 'Marcus Vance', moduleId: 'tr-01', moduleTitle: 'Event Safety Protocols', status: 'Completed', completedDate: '2026-08-15', score: 94 },
  { volunteerId: 'vol-2', volunteerName: 'Marcus Vance', moduleId: 'tr-02', moduleTitle: 'Registration Software', status: 'Completed', completedDate: '2026-08-16', score: 100 },

  { volunteerId: 'vol-3', volunteerName: 'Amina Al-Mansoor', moduleId: 'tr-01', moduleTitle: 'Event Safety Protocols', status: 'Completed', completedDate: '2026-08-01', score: 100 },
  { volunteerId: 'vol-3', volunteerName: 'Amina Al-Mansoor', moduleId: 'tr-04', moduleTitle: 'Crowd Flow & Queue Safety', status: 'Completed', completedDate: '2026-08-05', score: 100 },

  { volunteerId: 'vol-4', volunteerName: 'Jordan Rivera', moduleId: 'tr-01', moduleTitle: 'Event Safety Protocols', status: 'Completed', completedDate: '2026-08-22', score: 90 },
  { volunteerId: 'vol-4', volunteerName: 'Jordan Rivera', moduleId: 'tr-02', moduleTitle: 'Registration Software', status: 'Completed', completedDate: '2026-08-23', score: 92 },

  // Overdue Training for New Recruit Chloe Bennett
  { volunteerId: 'vol-5', volunteerName: 'Chloe Bennett', moduleId: 'tr-01', moduleTitle: 'Event Safety Protocols', status: 'Completed', completedDate: '2026-08-28', score: 95 },
  { volunteerId: 'vol-5', volunteerName: 'Chloe Bennett', moduleId: 'tr-02', moduleTitle: 'Registration Software', status: 'In Progress' },
  { volunteerId: 'vol-5', volunteerName: 'Chloe Bennett', moduleId: 'tr-03', moduleTitle: 'Customer Service & Accessibility', status: 'Overdue' }
];

// Volunteer Feedback & Ratings (2.11)
export const INITIAL_FEEDBACK_RECORDS: VolunteerFeedbackRecord[] = [
  {
    id: 'fb-01',
    volunteerId: 'vol-1',
    volunteerName: 'Elena Rostova',
    leaderName: 'Sarah Jenkins',
    date: '2026-09-07',
    ratings: {
      attendance: 5,
      reliability: 5,
      teamwork: 5,
      communication: 5,
      taskPerformance: 5,
      leadership: 5,
      professionalism: 5
    },
    comments: 'Elena is an extraordinary leader on our team. She consistently anticipates queue bottlenecks, mentors new recruits, and handles VIP check-ins flawlessly.',
    recommendation: 'Recommend for Team Lead'
  },
  {
    id: 'fb-02',
    volunteerId: 'vol-2',
    volunteerName: 'Marcus Vance',
    leaderName: 'Sarah Jenkins',
    date: '2026-09-06',
    ratings: {
      attendance: 5,
      reliability: 5,
      teamwork: 4,
      communication: 4,
      taskPerformance: 5,
      leadership: 4,
      professionalism: 5
    },
    comments: 'Marcus solved the printer jamming issue in record time and kept badge generation running smoothly under pressure.',
    recommendation: 'Exceeds Expectations'
  },
  {
    id: 'fb-03',
    volunteerId: 'vol-3',
    volunteerName: 'Amina Al-Mansoor',
    leaderName: 'Sarah Jenkins',
    date: '2026-09-05',
    ratings: {
      attendance: 5,
      reliability: 5,
      teamwork: 5,
      communication: 5,
      taskPerformance: 5,
      leadership: 5,
      professionalism: 5
    },
    comments: 'Amina’s queue management kept attendee wait times under 3 minutes during peak morning rush. Outstanding poise and hospitality.',
    recommendation: 'Recommend for Team Lead'
  },
  {
    id: 'fb-04',
    volunteerId: 'vol-5',
    volunteerName: 'Chloe Bennett',
    leaderName: 'Sarah Jenkins',
    date: '2026-09-07',
    ratings: {
      attendance: 5,
      reliability: 4,
      teamwork: 4,
      communication: 4,
      taskPerformance: 3,
      leadership: 3,
      professionalism: 4
    },
    comments: 'Eager and enthusiastic new recruit. Needs additional practice with the barcode scanning terminal. Paired with Amina for mentoring.',
    recommendation: 'Consistent Contributor'
  }
];

// Organiser Announcements (with the exact example from 2.6)
export const INITIAL_ORGANISER_ANNOUNCEMENTS: OrganiserAnnouncement[] = [
  {
    id: 'org-ann-1',
    title: 'Mandatory Main Hall Assembly at 8:00 AM',
    message: 'All volunteers must report to the main hall by 8:00 AM for the general event keynote welcome and safety sweep.',
    organiserName: 'Director Robert Martinez (Lead Organiser)',
    timestamp: 'Today at 07:10 AM',
    priority: 'High',
    relayedToTeam: true,
    suggestedTeamAction: 'Registration Team, please assemble at Counter A by 7:45 AM.'
  },
  {
    id: 'org-ann-2',
    title: 'VIP Keynote Arrival Time Shifted',
    message: 'Mayor and Keynote delegation arriving 15 minutes earlier at 08:15 AM. Ensure VIP entrance door 2 is unlocked.',
    organiserName: 'Alice Chen (Operations Coordinator)',
    timestamp: 'Today at 07:40 AM',
    priority: 'Urgent',
    relayedToTeam: false,
    suggestedTeamAction: 'Elena & Priya: VIP escort team please be in position at Door 2 by 08:10 AM.'
  },
  {
    id: 'org-ann-3',
    title: 'Lunch Catering Delivery Staging',
    message: 'Volunteer boxed lunches will arrive at West Conference Lounge at 11:45 AM. Stagger team breaks in 30-minute shifts.',
    organiserName: 'Catering Lead',
    timestamp: 'Today at 07:00 AM',
    priority: 'Normal',
    relayedToTeam: false,
    suggestedTeamAction: 'Shift A lunch break: 11:45 AM. Shift B lunch break: 12:15 PM.'
  }
];
