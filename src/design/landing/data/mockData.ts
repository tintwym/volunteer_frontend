// @ts-nocheck

import { 
  Opportunity, 
  CommunityNews, 
  GalleryPhoto, 
  PhotoStory, 
  CommunityEvent, 
  VolunteerStory, 
  Organization, 
  FeedPost, 
  VolunteerUser,
  VolunteerApplication
} from '../types';

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'Weekend Urban Farm & Food Forest Caregiver',
    organization: 'Green Roots Urban Agriculture',
    organizationId: 'org-1',
    orgLogo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=120&auto=format&fit=crop&q=80',
    location: 'Eastside Community Gardens, Portland, OR',
    address: '1420 SE Belmont St, Portland, OR 97214',
    isRemote: false,
    date: 'Sat, Sep 19, 2026',
    timeCommitment: '3 hours (9:00 AM – 12:00 PM)',
    cause: 'Environment',
    skillsRequired: ['Gardening', 'Teamwork', 'Physical Stamina'],
    spotsAvailable: 8,
    totalSpots: 20,
    shortDescription: 'Help weed, mulch, and harvest seasonal fresh organic produce distributed directly to low-income neighborhood food pantries.',
    longDescription: 'Join our weekly soil and harvest circle! Eastside Community Gardens provides over 12,000 lbs of organic vegetables to families in need every season. We will be prepping winter cover crops, harvesting late heirloom tomatoes, and building composting bins. Gloves and tools provided, along with homegrown herbal tea and snacks at the break!',
    requirements: ['Comfortable standing and bending', 'Closed-toe shoes required', 'All experience levels welcome'],
    imageUrl: 'https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=900&auto=format&fit=crop&q=80',
    urgency: 'regular',
    createdAt: '2026-09-01',
    status: 'active',
  },
  {
    id: 'opp-2',
    title: 'After-School STEM & Reading Mentor for Youth',
    organization: 'Beacon Youth Collaborative',
    organizationId: 'org-2',
    orgLogo: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=120&auto=format&fit=crop&q=80',
    location: 'Downtown Learning Center & Online',
    address: '450 Oak St, Seattle, WA 98101',
    isRemote: true,
    date: 'Tuesdays & Thursdays, Starting Sep 22, 2026',
    timeCommitment: '2 hours / week',
    cause: 'Education',
    skillsRequired: ['Tutoring', 'Patience', 'Basic Coding or Math'],
    spotsAvailable: 5,
    totalSpots: 15,
    shortDescription: 'Work 1-on-1 with elementary and middle school students to spark joy in coding, robotics, and creative storytelling.',
    longDescription: 'Beacon Youth Collaborative partners with Title I schools to bridge the extracurricular opportunity gap. As a mentor, you will be paired with a student (grades 4-7) for an 8-week semester. You will guide them through hands-on scratch coding projects, science challenges, and dedicated reading comprehension sessions. Flexible hybrid model available (in-person or Zoom).',
    requirements: ['Background check required (fee covered)', 'Minimum 18 years old', 'Reliable internet connection if remote'],
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&auto=format&fit=crop&q=80',
    urgency: 'urgent',
    createdAt: '2026-09-03',
    status: 'active',
  },
  {
    id: 'opp-3',
    title: 'Emergency Community Kitchen & Nutrition Prep',
    organization: 'Open Table Food Network',
    organizationId: 'org-3',
    orgLogo: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=120&auto=format&fit=crop&q=80',
    location: 'Central Community Hall, Austin, TX',
    address: '812 Trinity St, Austin, TX 78701',
    isRemote: false,
    date: 'Daily shifts available',
    timeCommitment: '2.5 hours per shift',
    cause: 'Social Impact',
    skillsRequired: ['Food Prep', 'Kitchen Safety', 'Welcoming Smile'],
    spotsAvailable: 12,
    totalSpots: 30,
    shortDescription: 'Prepare hot, nourishing chef-designed meals and assemble family pantry care boxes for unhoused and displaced neighbors.',
    longDescription: 'Open Table serves over 650 dignified warm meals daily. Shift volunteers assist professional volunteer chefs with vegetable chopping, packing wholesome balanced trays, packaging family take-away boxes, and maintaining clean hygiene stations. You will experience firsthand how shared meals restore human dignity.',
    requirements: ['Hair net and apron provided', 'Ability to lift 15 lbs', 'No culinary degree needed'],
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900&auto=format&fit=crop&q=80',
    urgency: 'urgent',
    createdAt: '2026-09-05',
    status: 'active',
  },
  {
    id: 'opp-4',
    title: 'Riverfront Wetland Restoration & Native Tree Planting',
    organization: 'Cascadia Watershed Trust',
    organizationId: 'org-4',
    orgLogo: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=120&auto=format&fit=crop&q=80',
    location: 'Willamette River Greenway, OR',
    address: 'Greenway Milepost 4, Portland, OR',
    isRemote: false,
    date: 'Sun, Sep 27, 2026',
    timeCommitment: '4 hours (8:30 AM – 12:30 PM)',
    cause: 'Environment',
    skillsRequired: ['Outdoor Work', 'Conservation', 'Trail Work'],
    spotsAvailable: 14,
    totalSpots: 40,
    shortDescription: 'Remove invasive blackberry thickets, plant 300 native willow saplings, and monitor water filtration banks.',
    longDescription: 'Our river corridors are the lungs and cooling veins of our towns. This restoration day focuses on replacing choking invasive plants with native flora that stabilize riverbanks, prevent storm sediment runoff, and restore spawning grounds for native salmon.',
    requirements: ['Waterproof boots recommended', 'Dress for weather (rain or shine)', 'Youth accompanied by adult welcome'],
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=900&auto=format&fit=crop&q=80',
    urgency: 'regular',
    createdAt: '2026-09-02',
    status: 'active',
  },
  {
    id: 'opp-5',
    title: 'Senior Digital Literacy & Tech Companion',
    organization: 'Silver Bridges Elder Care',
    organizationId: 'org-5',
    orgLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&auto=format&fit=crop&q=80',
    location: 'Heritage Senior Residence & Virtual Phone Call',
    address: '320 Rosewood Ave, Denver, CO 80202',
    isRemote: true,
    date: 'Every Wednesday afternoon',
    timeCommitment: '1.5 hours / session',
    cause: 'Community',
    skillsRequired: ['Empathy', 'Smartphone / Tablet Basics', 'Active Listening'],
    spotsAvailable: 6,
    totalSpots: 10,
    shortDescription: 'Help older adults stay connected with grandchildren, navigate health apps, and practice fraud-safe web browsing.',
    longDescription: 'Isolation is one of the deepest challenges facing older adults today. As a Tech Companion, you gently guide seniors on their smartphones and tablets: setting up video calls with loved ones, accessing prescription portals, and identifying suspicious phishing emails, all over a warm cup of coffee.',
    requirements: ['Patient demeanor', 'Clear communication', 'Bilingual English/Spanish is a plus!'],
    imageUrl: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=900&auto=format&fit=crop&q=80',
    urgency: 'flexible',
    createdAt: '2026-09-04',
    status: 'active',
  },
  {
    id: 'opp-6',
    title: 'Rescue Animal Foster Care Assistant & Dog Socializer',
    organization: 'Paws & Hope Animal Rescue',
    organizationId: 'org-6',
    orgLogo: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=120&auto=format&fit=crop&q=80',
    location: 'Sunny Valley Shelter & Sanctuary',
    address: '105 Rescue Trail, San Jose, CA 95123',
    isRemote: false,
    date: 'Flexible weekday & weekend mornings',
    timeCommitment: '2 hours / week',
    cause: 'Charity',
    skillsRequired: ['Animal Care', 'Dog Walking', 'Gentle Handling'],
    spotsAvailable: 4,
    totalSpots: 12,
    shortDescription: 'Provide enriching sensory walks, gentle brushing, and playtime to dogs and cats awaiting their forever homes.',
    longDescription: 'Shelter environments can be stressful for abandoned pets. Our enrichment team ensures every dog gets a calming 30-minute nature walk along our private agility trail, and cats enjoy interactive play sessions. Your loving attention increases adoption rates dramatically!',
    requirements: ['Must be at least 16 years old', 'Orientation training (30 mins online)', 'Love for animals'],
    imageUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=900&auto=format&fit=crop&q=80',
    urgency: 'regular',
    createdAt: '2026-09-06',
    status: 'active',
  },
  {
    id: 'opp-7',
    title: 'Community Arts & Public Mural Assistant',
    organization: 'Colors of Tomorrow Collective',
    organizationId: 'org-7',
    orgLogo: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=120&auto=format&fit=crop&q=80',
    location: 'Underpass Cultural Plaza, Chicago, IL',
    address: '1200 S Michigan Ave, Chicago, IL 60605',
    isRemote: false,
    date: 'Oct 3–4, 2026',
    timeCommitment: '4-hour shifts',
    cause: 'Community',
    skillsRequired: ['Painting (Any Level)', 'Creativity', 'Community Spirit'],
    spotsAvailable: 15,
    totalSpots: 35,
    shortDescription: 'Transform a grey concrete transit underpass into a vibrant 120-foot mural celebrating neighborhood cultural diversity.',
    longDescription: 'Under the guidance of renowned local artist Elena Ramos, volunteers will prime walls, fill color-blocked sections, mix non-toxic acrylics, and facilitate painting activities for neighborhood children who drop in to leave their handprints.',
    requirements: ['Wear clothes you do not mind getting paint on', 'Sun hat and hydration'],
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=900&auto=format&fit=crop&q=80',
    urgency: 'regular',
    createdAt: '2026-09-07',
    status: 'active',
  },
  {
    id: 'opp-8',
    title: 'Disaster Relief Logistics & Hygiene Kit Assembler',
    organization: 'Cascadia Watershed Trust',
    organizationId: 'org-4',
    orgLogo: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=120&auto=format&fit=crop&q=80',
    location: 'Regional Relief Warehouse, Seattle, WA',
    address: '700 Industrial Way, Seattle, WA 98134',
    isRemote: false,
    date: 'Fridays, Ongoing',
    timeCommitment: '3 hours',
    cause: 'Social Impact',
    skillsRequired: ['Organization', 'Packaging', 'Detail Oriented'],
    spotsAvailable: 9,
    totalSpots: 25,
    shortDescription: 'Sort bulk supplies and pack rapid-deployment emergency hygiene and sanitization kits for storm and wildfire evacuees.',
    longDescription: 'When extreme weather events displace families, clean water, soaps, toothbrushes, and infant care supplies are critical within the first 24 hours. Join our warehouse assembly line to pack 1,500 kits every Friday afternoon.',
    requirements: ['Comfortable in a warehouse setting', 'Age 14+ with guardian'],
    imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=900&auto=format&fit=crop&q=80',
    urgency: 'urgent',
    createdAt: '2026-09-08',
    status: 'active',
  }
];

export const INITIAL_NEWS: CommunityNews[] = [
  {
    id: 'news-1',
    headline: '10,000 Pounds of Organic Produce Donated in Record Harvest Season',
    summary: 'Grassroots urban farming collectives celebrate a historic harvest, delivering crisp produce to 32 neighborhood micro-pantries in under 48 hours.',
    content: `When morning fog rolled over the Eastside plots early Saturday, more than eighty volunteers were already gathering baskets. What began three years ago as an abandoned asphalt parking lot has officially become the neighborhood's most productive urban commons.

According to agricultural coordinator Marcus Vance, the soil regeneration efforts spearheaded by volunteers over the past 24 months generated a 45% increase in heirloom squash, kale, and root vegetable yields.

"Every single basket harvested today will be in a family's kitchen before sunset," Vance stated, pointing to a fleet of electric cargo bikes being loaded by teenage volunteers. "This isn't charity in the traditional distant sense—it is community resilience built from the ground up."

The initiative relies entirely on voluntary labor, neighborhood compost contributions, and localized rainwater catchment systems. With five additional neighborhood plots slated for conversion in spring 2027, coordinators are already recruiting community site managers and irrigation mentors.`,
    category: 'Environment',
    publicationDate: 'Sep 8, 2026',
    author: 'Aria Montgomery',
    authorRole: 'Community Environmental Reporter',
    organization: 'Green Roots Urban Agriculture',
    orgLogo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?w=1200&auto=format&fit=crop&q=80',
    readTime: '4 min read',
    relatedOpportunityIds: ['opp-1', 'opp-4'],
    relatedPhotoUrls: [
      'https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80'
    ],
    tags: ['Urban Agriculture', 'Food Security', 'Sustainability', 'Local News'],
    viewsCount: 1420,
    likesCount: 238,
    isFeatured: true,
  },
  {
    id: 'news-2',
    headline: 'Youth STEM Mentorship Program Expands to 15 New Community Libraries',
    summary: 'Supported by 120 dedicated tech volunteers, the free weekend coding and robotics initiative bridges the homework divide across the metro corridor.',
    content: `For 11-year-old Sophia and her mentor David, the highlight of Saturday morning is watching a miniature motorized rover navigate a cardboard maze. Sophia is one of 350 students participating in Beacon Youth Collaborative's expanded STEM labs.

The program, which provides refurbished laptops, microcontrollers, and one-on-one guidance, is designed for students who lack reliable computers or tech education at home.

"Our volunteers come from all walks of life—software engineers, college students, retired electricians, and teachers," says Program Director Maya Lin. "What matters most is not deep theoretical expertise, but showing a young mind that problem solving is fun, collaborative, and entirely accessible."`,
    category: 'Education',
    publicationDate: 'Sep 5, 2026',
    author: 'David Chen',
    authorRole: 'Education Feature Writer',
    organization: 'Beacon Youth Collaborative',
    orgLogo: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80',
    readTime: '3 min read',
    relatedOpportunityIds: ['opp-2'],
    relatedPhotoUrls: [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80'
    ],
    tags: ['Youth', 'STEM', 'Digital Literacy', 'Volunteer Updates'],
    viewsCount: 980,
    likesCount: 174,
    isFeatured: false,
  },
  {
    id: 'news-3',
    headline: 'Community Kitchen Serves Its 100,000th Dignified Hot Meal',
    summary: 'Volunteers and local farmers commemorate five years of providing warm, scratch-cooked nutritional dinners with zero barriers and maximum dignity.',
    content: `There was gentle live violin music in the central hall as guest of honor Mrs. Evelyn Davis was served a warm plate of rosemary braised lentils and freshly baked sourdough. It marked the 100,000th plate prepared by Open Table Food Network since opening its doors.

Unlike traditional institutional soup kitchens, Open Table operates with restaurant-style table service. Neighborhood volunteers act as hosts, servers, and dish washers, creating an atmosphere of true hospitality.

"When you sit down here, nobody asks for your financial papers, your ID, or your story," said lead volunteer chef Carlos Santana. "You are our neighbor, and you deserve a delicious, nutrient-dense meal served with respect."`,
    category: 'Social Impact',
    publicationDate: 'Aug 29, 2026',
    author: 'Carlos Santana',
    authorRole: 'Community Culinary Director',
    organization: 'Open Table Food Network',
    orgLogo: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&auto=format&fit=crop&q=80',
    readTime: '5 min read',
    relatedOpportunityIds: ['opp-3'],
    relatedPhotoUrls: [
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&auto=format&fit=crop&q=80'
    ],
    tags: ['Charity', 'Social Impact', 'Community Support'],
    viewsCount: 2150,
    likesCount: 420,
    isFeatured: false,
  },
  {
    id: 'news-4',
    headline: 'New River Protection Milestone: 5 Miles of Native Vegetation Restored',
    summary: 'Ecologists and hundreds of weekend volunteers celebrate the return of native kingfishers and otter families along rehabilitated urban tributaries.',
    content: `Five years of dedicated watershed weeding and sapling planting are showing remarkable ecological dividends. Water quality monitors recorded a 35% drop in summer water temperatures along the revitalized shaded banks, fostering prime conditions for returning salmon runs.

The Cascadia Watershed Trust credited over 1,800 registered volunteer hours logged during the 2026 spring and summer campaigns alone.`,
    category: 'Environment',
    publicationDate: 'Aug 22, 2026',
    author: 'Elena Rossi',
    authorRole: 'Ecologist & Contributor',
    organization: 'Cascadia Watershed Trust',
    orgLogo: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=120&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop&q=80',
    readTime: '3 min read',
    relatedOpportunityIds: ['opp-4'],
    relatedPhotoUrls: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80'
    ],
    tags: ['Ecology', 'Wildlife', 'River Cleanup', 'Local News'],
    viewsCount: 1670,
    likesCount: 310,
    isFeatured: false,
  }
];

export const INITIAL_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-1',
    title: 'Morning Harvest in the Sunshine',
    caption: 'Volunteers smiling as they gather crisp chard and heirloom squash at the Eastside Community garden.',
    date: 'Sep 6, 2026',
    location: 'Portland, OR',
    organization: 'Green Roots Urban Agriculture',
    photographer: 'Taro Tanaka',
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1000&auto=format&fit=crop&q=80',
    category: 'Environment',
    albumTitle: 'Autumn Harvest Circle',
    aspectRatio: 'tall',
    likes: 142,
  },
  {
    id: 'photo-2',
    title: 'Code Sparks Joy',
    caption: 'Tutor Lucas guiding young Maya through her very first Python animation during our Saturday STEM open house.',
    date: 'Sep 5, 2026',
    location: 'Seattle, WA',
    organization: 'Beacon Youth Collaborative',
    photographer: 'Rachel Adams',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1000&auto=format&fit=crop&q=80',
    category: 'Education',
    albumTitle: 'Youth Tech Horizons',
    aspectRatio: 'wide',
    likes: 189,
  },
  {
    id: 'photo-3',
    title: 'Hands in the Soil, Hearts in the Work',
    caption: 'A circle of neighbors planting native trees along the riverbank trail to reinforce the wetlands.',
    date: 'Aug 30, 2026',
    location: 'Willamette River Trail',
    organization: 'Cascadia Watershed Trust',
    photographer: 'Liam O’Connor',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1000&auto=format&fit=crop&q=80',
    category: 'Environment',
    albumTitle: 'Community Cleanup Day 2026',
    aspectRatio: 'square',
    likes: 215,
  },
  {
    id: 'photo-4',
    title: 'Dignity in Every Plate',
    caption: 'Freshly assembled hot wholesome meals ready for dinner service at the community hall kitchen.',
    date: 'Sep 2, 2026',
    location: 'Austin, TX',
    organization: 'Open Table Food Network',
    photographer: 'Samantha Perez',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1000&auto=format&fit=crop&q=80',
    category: 'Social Impact',
    albumTitle: 'Dignity Kitchen Stories',
    aspectRatio: 'wide',
    likes: 278,
  },
  {
    id: 'photo-5',
    title: 'Paws & Purrs Adoption Day',
    caption: 'Volunteer Sarah introducing gentle rescue puppy Barnaby to his eager new adoptive family.',
    date: 'Sep 1, 2026',
    location: 'San Jose, CA',
    organization: 'Paws & Hope Animal Rescue',
    photographer: 'Kevin Liu',
    imageUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=1000&auto=format&fit=crop&q=80',
    category: 'Charity',
    albumTitle: 'Forever Homes Walk',
    aspectRatio: 'square',
    likes: 312,
  },
  {
    id: 'photo-6',
    title: 'Colors of Harmony Mural',
    caption: 'Over 40 neighborhood residents adding their vibrant brushstrokes to the unity transit underpass.',
    date: 'Aug 24, 2026',
    location: 'Chicago, IL',
    organization: 'Colors of Tomorrow Collective',
    photographer: 'Maya Henderson',
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1000&auto=format&fit=crop&q=80',
    category: 'Community',
    albumTitle: 'Urban Art Initiatives',
    aspectRatio: 'wide',
    likes: 195,
  },
  {
    id: 'photo-7',
    title: 'Senior Tech Coffee Morning',
    caption: 'Laughing over a first FaceTime call with great-grandchildren at the Heritage community lounge.',
    date: 'Aug 18, 2026',
    location: 'Denver, CO',
    organization: 'Silver Bridges Elder Care',
    photographer: 'Jessica Miller',
    imageUrl: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=1000&auto=format&fit=crop&q=80',
    category: 'Community',
    albumTitle: 'Silver Bridges Sessions',
    aspectRatio: 'tall',
    likes: 167,
  },
  {
    id: 'photo-8',
    title: 'Emergency Care Packages Ready',
    caption: 'Assembly line of students sorting emergency dental and hygiene care sets for storm shelters.',
    date: 'Aug 15, 2026',
    location: 'Seattle, WA',
    organization: 'Cascadia Watershed Trust',
    photographer: 'David Chen',
    imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1000&auto=format&fit=crop&q=80',
    category: 'Social Impact',
    albumTitle: 'Rapid Relief 2026',
    aspectRatio: 'square',
    likes: 153,
  }
];

export const INITIAL_PHOTO_STORIES: PhotoStory[] = [
  {
    id: 'story-cleanup-2026',
    title: 'Community Cleanup Day 2026: Restoring the River Corridor',
    subtitle: 'How 340 neighbors turned a polluted gravel shoreline into a thriving public sanctuary in just six hours.',
    coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1400&auto=format&fit=crop&q=80',
    date: 'Saturday, August 29, 2026',
    location: 'Willamette Greenway, Oregon',
    organization: 'Cascadia Watershed Trust',
    intro: 'It began at 7:30 AM with steam rising off thermos mugs and a sea of yellow work gloves. Families, teenagers, retirees, and local university students arrived with one common goal: clearing decades of plastic debris and restoring natural oxygen levels to our town’s main waterway.',
    quote: 'When you stand on a riverbank with 300 people who care as much as you do, cynicism completely evaporates. You realize we can actually fix things together.',
    quoteAuthor: 'Elena Rossi',
    quoteRole: 'Volunteer Team Captain & Biologist',
    impactStats: [
      { label: 'Debris Removed', value: '4,200 lbs' },
      { label: 'Volunteers Joined', value: '340' },
      { label: 'Native Trees Planted', value: '520' },
      { label: 'Miles Restored', value: '3.8 miles' },
    ],
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1000&auto=format&fit=crop&q=80',
        caption: 'Digging planting troughs for alder and willow saplings alongside the river bank.',
        credit: 'Liam O’Connor'
      },
      {
        url: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=1000&auto=format&fit=crop&q=80',
        caption: 'Sorting collected materials for recycling and responsible hazardous disposal.',
        credit: 'Taro Tanaka'
      },
      {
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000&auto=format&fit=crop&q=80',
        caption: 'The restored view looking upstream towards Mt. Hood at late afternoon.',
        credit: 'Elena Rossi'
      }
    ],
    fullStory: `Throughout the morning, teams spread out across four distinct zones. High school science clubs manned the water quality testing stations, testing for dissolved oxygen and sediment turbidity. Meanwhile, heavy-lifting teams extracted submerged tires and tangled wire fences that had long threatened waterfowl.

By noon, the community pavilion was filled with laughter and the aroma of local food trucks providing complimentary wood-fired pizzas to every volunteer. The real triumph was emotional: neighbors who had lived on the same street for a decade finally learned one another's names.`,
    relatedNewsIds: ['news-4'],
    relatedOpportunityIds: ['opp-4', 'opp-1']
  },
  {
    id: 'story-urban-harvest',
    title: 'Urban Garden Harvest & Community Workshop',
    subtitle: 'Cultivating soil, dignity, and generational wisdom in the heart of the city.',
    coverImage: 'https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=1400&auto=format&fit=crop&q=80',
    date: 'Sunday, September 6, 2026',
    location: 'Eastside Community Gardens, Portland',
    organization: 'Green Roots Urban Agriculture',
    intro: 'Between brick apartment complexes and light-rail tracks sits two acres of emerald green vitality. This photo story chronicles the 2026 autumn harvest celebration, where 15 heirloom crop varieties were gathered and shared.',
    quote: 'A seed doesn’t care what your background is. It only needs water, care, and hands that believe in tomorrow.',
    quoteAuthor: 'Marcus Vance',
    quoteRole: 'Head Community Gardener',
    impactStats: [
      { label: 'Fresh Veggies Distributed', value: '1,850 lbs' },
      { label: 'Pantry Partners Supplied', value: '14 sites' },
      { label: 'Kids Attending Workshop', value: '45' },
      { label: 'Compost Diverted', value: '3,200 lbs' },
    ],
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?w=1000&auto=format&fit=crop&q=80',
        caption: 'Heirloom tomatoes being sorted by color and ripeness for pantry delivery.',
        credit: 'Taro Tanaka'
      },
      {
        url: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=1000&auto=format&fit=crop&q=80',
        caption: 'Master gardener Mrs. Wilson teaching seed-saving techniques to young neighbors.',
        credit: 'Rachel Adams'
      }
    ],
    fullStory: `The day concluded with a community feast under strings of solar festoon bulbs. Musicians from the neighborhood played acoustic guitars as families enjoyed warm vegetable stews cooked right at the outdoor garden hearth. It was proof that real food sovereignty starts with simple shared trust.`,
    relatedNewsIds: ['news-1'],
    relatedOpportunityIds: ['opp-1']
  }
];

export const INITIAL_EVENTS: CommunityEvent[] = [
  {
    id: 'event-1',
    name: 'Metropolitan Great Park Tree Planting & Bird Count',
    date: 'Saturday, Sep 19, 2026',
    time: '9:00 AM – 1:00 PM',
    location: 'South Meadow Entrance, City Park',
    isOnline: false,
    organizer: 'Cascadia Watershed Trust',
    organizerLogo: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=120&auto=format&fit=crop&q=80',
    description: 'Join wildlife biologists and fellow nature lovers to plant native oak saplings and catalog migratory bird sightings using our digital tablet trackers.',
    attendeesCount: 68,
    maxAttendees: 100,
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
    category: 'Environment',
    isJoined: false,
  },
  {
    id: 'event-2',
    name: 'Community Food Security Summit & Volunteer Mixer',
    date: 'Wednesday, Sep 23, 2026',
    time: '6:30 PM – 8:30 PM',
    location: 'Civic Commons Atrium (and Livestream)',
    isOnline: true,
    organizer: 'Open Table Food Network',
    organizerLogo: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=120&auto=format&fit=crop&q=80',
    description: 'Keynote conversations on zero-waste logistics, micro-farming grants, and networking drinks with 40+ local nonprofit directors.',
    attendeesCount: 142,
    maxAttendees: 200,
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=80',
    category: 'Social Impact',
    isJoined: true,
  },
  {
    id: 'event-3',
    name: 'Autumn Youth Robotics & Coding Showcase',
    date: 'Saturday, Oct 3, 2026',
    time: '11:00 AM – 3:00 PM',
    location: 'Downtown Tech Hub Pavilion',
    isOnline: false,
    organizer: 'Beacon Youth Collaborative',
    organizerLogo: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=120&auto=format&fit=crop&q=80',
    description: 'Over 60 middle school students present solar-powered robots, interactive video games, and automated plant waterers built with their volunteer mentors.',
    attendeesCount: 95,
    maxAttendees: 150,
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
    category: 'Education',
    isJoined: false,
  },
  {
    id: 'event-4',
    name: 'Adopt-A-Pet Walk & Shelter Benefit Carnival',
    date: 'Sunday, Oct 11, 2026',
    time: '10:00 AM – 2:00 PM',
    location: 'Riverside Amphitheater Grounds',
    isOnline: false,
    organizer: 'Paws & Hope Animal Rescue',
    organizerLogo: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=120&auto=format&fit=crop&q=80',
    description: 'A festive day featuring a 2-mile community dog walk, pet costume contest, foster information booths, live bluegrass music, and local artisan stalls.',
    attendeesCount: 230,
    maxAttendees: 500,
    imageUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&auto=format&fit=crop&q=80',
    category: 'Charity',
    isJoined: false,
  }
];

export const INITIAL_STORIES: VolunteerStory[] = [
  {
    id: 'story-1',
    name: 'Maya Henderson',
    volunteerRole: 'Weekly Food Prep & Kitchen Host',
    volunteerPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    organization: 'Open Table Food Network',
    storyTitle: 'One Saturday Changed the Way I See My Community',
    shortIntroduction: 'When Maya moved to the city for a demanding accounting job, she felt alienated and lonely. Joining a weekend kitchen shift transformed her entire connection to her neighbors.',
    fullStory: `I remember sitting in my high-rise apartment on Friday nights feeling completely detached from the street below. In a city of two million people, I barely exchanged words with anyone outside my office cubicle.

One morning, I signed up on a whim for an 8:00 AM breakfast shift at Open Table. I was nervous—I didn't know how to cook for 200 people, and I felt out of place. But the moment Chef Carlos handed me an apron and introduced me to Mrs. Gable, a volunteer grandmother who has been cutting onions here for 12 years, my anxieties melted.

We laughed, we diced 40 pounds of celery, and we set tables with cloth napkins and fresh wildflowers. When our guests walked in, there were no barriers. I served coffee, had conversations about old jazz records, and realized that true wealth is sitting across from someone and listening.

Now, Saturday morning is the anchor of my week. I’ve made lifelong friends, and when I walk through my neighborhood, I don’t see strangers anymore—I see familiar smiles and shared memories.`,
    quote: 'Volunteering didn’t just help the people eating at our tables; it rescued me from my own isolation.',
    timeServed: '2 years (180+ hours)',
    impactCreated: 'Over 2,400 meals prepared and served with compassion',
    relatedOpportunityIds: ['opp-3']
  },
  {
    id: 'story-2',
    name: 'David Okafor',
    volunteerRole: 'STEM & Robotics Youth Mentor',
    volunteerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    organization: 'Beacon Youth Collaborative',
    storyTitle: 'Seeing a Child Realize: ‘I Can Build This Too’',
    shortIntroduction: 'David, a senior systems architect, spends two hours every Thursday night mentoring sixth graders in block coding and basic circuitry.',
    fullStory: `A lot of people in the tech sector think that giving back means donating money or writing high-level code for a charity app. While that’s valuable, nothing compares to the human moment of sitting beside an 11-year-old who thinks coding is only for geniuses in movies.

I remember working with a quiet student named Julian. For three weeks, his robotic car wouldn't turn when triggered by the light sensor. He was on the verge of tears and wanted to quit. Instead of fixing it for him, we took a deep breath, mapped the circuit on graph paper, and found a loose ground wire.

When that rover spun around and lit up green, Julian leaped out of his chair, cheered, and said, 'David, I want to build rockets when I grow up.' That single moment was worth ten years of corporate promotions.

Being a mentor reminded me why I fell in love with technology in the first place: curiosity, perseverance, and the thrill of creation.`,
    quote: 'You don’t need to be an expert to change a kid’s horizon. You just need to show up consistently.',
    timeServed: '14 months (75 hours)',
    impactCreated: 'Mentored 12 elementary students through completed STEM graduation showcases',
    relatedOpportunityIds: ['opp-2']
  },
  {
    id: 'story-3',
    name: 'Elena & Mateo Santos',
    volunteerRole: 'River Stewardship Crew Leaders',
    volunteerPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    organization: 'Cascadia Watershed Trust',
    storyTitle: 'Planting Roots for Our Children’s Tomorrow',
    shortIntroduction: 'Elena and Mateo bring their two children to monthly watershed restoration cleanups, turning community service into a cherished family tradition.',
    fullStory: `We wanted our kids to understand where our drinking water comes from and that nature is not something on a television screen—it’s the park two blocks from our school.

Five years ago, the wetland bank behind the recreation center was choked with trash and invasive brambles. We started attending Cascadia Trust workdays with our daughter who was only six at the time. She helped carry willow saplings in little buckets.

Today, those very willows stand twelve feet tall, providing shade for swimming ducks and songbirds. Our kids run down the trail and point proudly: 'Mom, Dad, that’s the tree we planted together!'

Volunteering as a family has given our children resilience, environmental ethics, and an unshakable sense that they have the agency to improve the world around them.`,
    quote: 'Passing down a tradition of active community care is the greatest legacy we can leave our children.',
    timeServed: '4 years (240 hours)',
    impactCreated: 'Contributed to planting over 800 native trees and restoring 2 miles of shoreline',
    relatedOpportunityIds: ['opp-4', 'opp-1']
  }
];

export const INITIAL_ORGANIZATIONS: Organization[] = [
  {
    id: 'org-1',
    name: 'Green Roots Urban Agriculture',
    logo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=160&auto=format&fit=crop&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=1200&auto=format&fit=crop&q=80',
    mission: 'Transforming vacant urban plots into productive, educational community food forests that nourish neighborhoods.',
    about: 'Founded in 2018, Green Roots operates six community farming sites across Portland. We believe healthy, chemical-free food is a basic human right. Through volunteer stewardship and educational workshops, we cultivate both produce and community solidarity.',
    location: 'Portland, OR',
    website: 'https://greenroots-demo.org',
    email: 'hello@greenroots-demo.org',
    phone: '(503) 555-0142',
    opportunitiesCount: 3,
    causes: ['Environment', 'Food Security', 'Community'],
    verified: true,
    impactStats: [
      { label: 'Annual Produce Donated', value: '18,500 lbs' },
      { label: 'Volunteers Engaged', value: '1,200+' },
      { label: 'Active Urban Plots', value: '6' }
    ]
  },
  {
    id: 'org-2',
    name: 'Beacon Youth Collaborative',
    logo: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=160&auto=format&fit=crop&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80',
    mission: 'Empowering under-resourced youth through holistic STEM mentorship, arts, and college readiness.',
    about: 'Beacon Youth Collaborative bridges the educational opportunity gap by matching passionate community mentors with young scholars. We provide hands-on robotics kits, creative coding classes, and literacy tutoring in safe, joyful community hubs.',
    location: 'Seattle, WA',
    website: 'https://beaconyouth-demo.org',
    email: 'info@beaconyouth-demo.org',
    phone: '(206) 555-0199',
    opportunitiesCount: 2,
    causes: ['Education', 'Youth', 'Technology'],
    verified: true,
    impactStats: [
      { label: 'Youth Mentored', value: '850+' },
      { label: 'High School Grad Rate', value: '98%' },
      { label: 'Active Volunteer Tutors', value: '180' }
    ]
  },
  {
    id: 'org-3',
    name: 'Open Table Food Network',
    logo: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=160&auto=format&fit=crop&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&auto=format&fit=crop&q=80',
    mission: 'Providing chef-prepared, dignified warm meals and emergency pantry supplies with radical hospitality.',
    about: 'At Open Table, nobody eats alone. We reclaim surplus fresh ingredients from regional organic farms and prepare restaurant-quality meals served with warm hospitality. We believe sharing a wholesome meal is the first step toward stability and health.',
    location: 'Austin, TX',
    website: 'https://opentable-demo.org',
    email: 'volunteer@opentable-demo.org',
    phone: '(512) 555-0187',
    opportunitiesCount: 4,
    causes: ['Social Impact', 'Hunger Relief', 'Community'],
    verified: true,
    impactStats: [
      { label: 'Meals Served To Date', value: '100,000+' },
      { label: 'Weekly Volunteers', value: '250+' },
      { label: 'Pounds Rescued Annually', value: '95,000' }
    ]
  },
  {
    id: 'org-4',
    name: 'Cascadia Watershed Trust',
    logo: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=160&auto=format&fit=crop&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop&q=80',
    mission: 'Protecting and restoring wild river corridors, wetlands, and urban greenways through grassroots action.',
    about: 'Dedicated to the scientific stewardship of our river systems, Cascadia Watershed Trust organizes thousands of citizens each year to plant native riparian buffers, monitor salmon habitats, and remove invasive species from vulnerable public watersheds.',
    location: 'Pacific Northwest',
    website: 'https://cascadiawatershed-demo.org',
    email: 'action@cascadiawatershed-demo.org',
    phone: '(503) 555-0111',
    opportunitiesCount: 2,
    causes: ['Environment', 'Conservation', 'Climate Action'],
    verified: true,
    impactStats: [
      { label: 'River Miles Restored', value: '42' },
      { label: 'Trees Planted', value: '65,000' },
      { label: 'Clean Water Days', value: '120+' }
    ]
  }
];

export const INITIAL_FEED_POSTS: FeedPost[] = [
  {
    id: 'post-1',
    authorName: 'Marcus Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    authorType: 'organization',
    authorOrg: 'Green Roots Urban Agriculture',
    content: 'Huge shoutout to the 30 brave volunteers who showed up through the light morning drizzle today! We officially loaded 1,200 lbs of fresh rainbow chard and sweet potatoes into the pantry van. You all make our city feel like a real family. 🌱💚',
    imageUrl: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?w=800&auto=format&fit=crop&q=80',
    category: 'Volunteer Updates',
    date: '2 hours ago',
    likes: 47,
    isLiked: true,
    commentsCount: 6,
    sharesCount: 12,
    comments: [
      {
        id: 'c-1',
        authorName: 'Aria Montgomery',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        content: 'Loved every minute! The herbal mint tea at break was so comforting.',
        date: '1 hour ago'
      },
      {
        id: 'c-2',
        authorName: 'David Okafor',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        content: 'Incredible work team. Count me in for next Saturday!',
        date: '45 mins ago'
      }
    ]
  },
  {
    id: 'post-2',
    authorName: 'David Okafor',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    authorType: 'volunteer',
    content: 'Proud mentor moment: My student Julian just completed his custom weather forecasting app using live sensor feeds! Seeing the confidence in his eyes is why community service will always be my greatest priority. Never underestimate what a kid can do when someone believes in them.',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
    category: 'Success Stories',
    date: '5 hours ago',
    likes: 83,
    isLiked: false,
    commentsCount: 9,
    sharesCount: 18,
    comments: [
      {
        id: 'c-3',
        authorName: 'Maya Lin',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
        content: 'Julian spoke so highly of you in the lab debrief David. Thank you for your tireless dedication!',
        date: '3 hours ago'
      }
    ]
  },
  {
    id: 'post-3',
    authorName: 'Open Table Food Network',
    authorAvatar: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=200&auto=format&fit=crop&q=80',
    authorType: 'organization',
    authorOrg: 'Open Table Food Network',
    content: '🚨 Urgent Call for Friday Evening Kitchen Helpers: We are catering a special community dinner for 150 elderly neighbors this Friday from 4:30 PM - 7:30 PM. We need 4 more prep helpers and 2 dish hosts! Tap the Volunteer tab to sign up directly.',
    category: 'Announcements',
    date: 'Yesterday at 4:15 PM',
    likes: 34,
    isLiked: false,
    commentsCount: 4,
    sharesCount: 22,
    comments: []
  }
];

export const INITIAL_USER: VolunteerUser = {
  id: 'user-demo-1',
  name: 'Alex Rivera',
  email: 'alex.rivera@community.org',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  bio: 'Community advocate, weekend tree planter, and passionate youth STEM mentor. Believer in collective kindness and local neighborhood resilience.',
  availability: 'Saturdays & Thursday Evenings',
  location: 'Portland, OR',
  role: 'volunteer',
  interests: ['Urban Gardening', 'Youth Mentorship', 'Emergency Relief', 'River Ecology'],
  skills: ['Project Coordination', 'First Aid', 'Python / Scratch', 'Gardening'],
  causesSupported: ['Environment', 'Education', 'Social Impact'],
  volunteerHours: 74,
  totalHoursLogged: 74,
  completedOpportunitiesCount: 16,
  badges: [
    {
      id: 'b-1',
      title: '50-Hour Milestone',
      iconName: 'Award',
      description: 'Logged over 50 verified hours of selfless community service.',
      earnedDate: 'July 2026',
      color: 'emerald'
    },
    {
      id: 'b-2',
      title: 'Green Thumb Steward',
      iconName: 'Sprout',
      description: 'Completed 6 environmental restoration & urban farm projects.',
      earnedDate: 'August 2026',
      color: 'teal'
    },
    {
      id: 'b-3',
      title: 'Youth Champion',
      iconName: 'GraduationCap',
      description: 'Mentored students across 8 consecutive STEM coding sessions.',
      earnedDate: 'June 2026',
      color: 'indigo'
    },
    {
      id: 'b-4',
      title: 'Community Pillar',
      iconName: 'HeartHandshake',
      description: 'Maintained an active volunteer streak for 4 continuous months.',
      earnedDate: 'September 2026',
      color: 'amber'
    }
  ],
  savedOpportunityIds: ['opp-1', 'opp-2'],
  registeredOpportunityIds: ['opp-1', 'opp-3'],
  upcomingActivityIds: ['opp-1'],
  contributedPhotos: [
    'https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80'
  ],
  impactProfile: {
    hoursThisMonth: 12,
    impactScore: 480,
    mealsPacked: 340,
    treesPlanted: 18,
    studentsTutored: 6
  },
  notificationSettings: {
    emailUpdates: true,
    pushEnabled: true,
    opportunityAlerts: true,
    eventReminders: true,
    impactDigest: true,
    sound: true
  }
};

export const INITIAL_APPLICATIONS: VolunteerApplication[] = [
  {
    id: 'app-1',
    opportunityId: 'opp-1',
    opportunityTitle: 'Weekend Urban Farm & Food Forest Caregiver',
    name: 'Maya Lin',
    email: 'maya.lin@example.com',
    phone: '(503) 555-0144',
    note: 'Excited to bring my background in urban composting and help out with raised beds!',
    status: 'confirmed',
    submittedAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'app-2',
    opportunityId: 'opp-2',
    opportunityTitle: 'Robotics & STEM Weekend Mentorship',
    name: 'Marcus Vance',
    email: 'marcus.v@example.com',
    phone: '(206) 555-0182',
    note: 'Software engineer eager to guide high school students on their robotics projects.',
    status: 'confirmed',
    submittedAt: new Date(Date.now() - 86400000).toISOString()
  }
];
