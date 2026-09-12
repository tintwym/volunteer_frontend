// @ts-nocheck

import { Language } from './types';

export interface Translations {
  nav: {
    home: string;
    volunteer: string;
    organizations: string;
    news: string;
    photos: string;
    events: string;
    stories: string;
    signIn: string;
    join: string;
    signInSignUp: string;
    myProfile: string;
    orgDashboard: string;
    signOut: string;
  };
  hero: {
    badge: string;
    headline: string;
    supporting: string;
    primaryCta: string;
    secondaryCta: string;
    searchPrompt: string;
    searchInterest: string;
    searchLocation: string;
    searchDate: string;
    searchButton: string;
  };
  impact: {
    title: string;
    subtitle: string;
    volunteers: string;
    organizations: string;
    opportunities: string;
    hours: string;
    projects: string;
  };
  sections: {
    featuredOpportunities: string;
    featuredOpportunitiesSubtitle: string;
    viewAllOpportunities: string;
    volunteerNow: string;
    spotsLeft: string;
    communityNews: string;
    communityNewsSubtitle: string;
    viewAllNews: string;
    readMore: string;
    communityInAction: string;
    communityInActionSubtitle: string;
    exploreGallery: string;
    upcomingEvents: string;
    upcomingEventsSubtitle: string;
    joinEvent: string;
    storiesThatInspire: string;
    storiesSubtitle: string;
    storiesThatInspireSubtitle: string;
    readVolunteerStories: string;
    trustedOrganizations: string;
    trustedOrganizationsSubtitle: string;
    featuredOrganizations: string;
    featuredOrganizationsSubtitle: string;
    viewOrganization: string;
    finalCtaHeadline: string;
    finalCtaSubtitle: string;
    findOpportunity: string;
    joinCommunity: string;
  };
  cta: {
    headline: string;
    subtitle: string;
    findOpportunity: string;
    joinCommunity: string;
  };
  common: {
    all: string;
    filter: string;
    cause: string;
    location: string;
    date: string;
    skills: string;
    timeCommitment: string;
    remote: string;
    inPerson: string;
    today: string;
    thisWeek: string;
    thisMonth: string;
    search: string;
    close: string;
    save: string;
    saved: string;
    share: string;
    notifications: string;
    darkMode: string;
    lightMode: string;
  };
}

export const translations: Record<Language, Translations> = {
  // English
  en: {
    nav: {
      home: 'Home',
      volunteer: 'Volunteer',
      organizations: 'Organizations',
      news: 'News',
      photos: 'Photos',
      events: 'Events',
      stories: 'Stories',
      signIn: 'Log In',
      join: 'Sign Up',
      signInSignUp: 'Log In / Sign Up',
      myProfile: 'My Profile',
      orgDashboard: 'Org Dashboard',
      signOut: 'Sign Out',
    },
    hero: {
      badge: 'Community Action In Motion',
      headline: 'Make a Difference. Be Part of Something Bigger.',
      supporting: 'Discover volunteer opportunities, connect with your community, stay informed, and see the impact people are making every day.',
      primaryCta: 'Find Volunteer Opportunities',
      secondaryCta: 'Join the Community',
      searchPrompt: 'Find Your Calling',
      searchInterest: 'What are you interested in?',
      searchLocation: 'City, zip code, or remote',
      searchDate: 'Any time',
      searchButton: 'Search Opportunities',
    },
    impact: {
      title: 'Our Collective Impact in Action',
      subtitle: 'Real hours, genuine hands, and lasting change created together across neighborhoods.',
      volunteers: 'Volunteers Engaged',
      organizations: 'Partner Organizations',
      opportunities: 'Active Opportunities',
      hours: 'Volunteer Hours Given',
      projects: 'Community Projects Completed',
    },
    sections: {
      featuredOpportunities: 'Featured Volunteer Opportunities',
      featuredOpportunitiesSubtitle: 'Find purposeful initiatives matching your passion, schedule, and hometown.',
      viewAllOpportunities: 'View All Opportunities',
      volunteerNow: 'Volunteer Now',
      spotsLeft: 'spots available',
      communityNews: 'Community News & Journal',
      communityNewsSubtitle: 'Follow grassroots progress, changemaker profiles, and community wins.',
      viewAllNews: 'View All News',
      readMore: 'Read Full Story',
      communityInAction: 'Community in Action',
      communityInActionSubtitle: 'Real moments captured by neighbors and volunteers across our cities.',
      exploreGallery: 'Explore Action Gallery',
      upcomingEvents: 'Upcoming Community Events',
      upcomingEventsSubtitle: 'Join local cleanups, townhalls, youth workshops, and neighborhood galas.',
      joinEvent: 'Register for Event',
      storiesThatInspire: 'Stories That Inspire',
      storiesSubtitle: 'Meet the dedicated people giving their hearts to strengthen their neighborhoods.',
      storiesThatInspireSubtitle: 'Meet the dedicated people giving their hearts to strengthen their neighborhoods.',
      readVolunteerStories: 'Read Volunteer Stories',
      trustedOrganizations: 'Trusted Nonprofits & Community Partners',
      trustedOrganizationsSubtitle: 'We partner with accredited organizations and community-led initiatives.',
      featuredOrganizations: 'Featured Organizations',
      featuredOrganizationsSubtitle: 'Discover organizations creating deep local impact.',
      viewOrganization: 'View Profile',
      finalCtaHeadline: 'Ready to Make an Impact in Your Community?',
      finalCtaSubtitle: 'Whether you have one afternoon or want to lead an ongoing project, your community needs your hands and your heart.',
      findOpportunity: 'Find an Opportunity',
      joinCommunity: 'Create Volunteer Account',
    },
    cta: {
      headline: 'Ready to Make an Impact in Your Community?',
      subtitle: 'Whether you have one afternoon or want to lead an ongoing project, your community needs your hands and your heart.',
      findOpportunity: 'Find an Opportunity',
      joinCommunity: 'Join the Community',
    },
    common: {
      all: 'All',
      filter: 'Filter',
      cause: 'Cause',
      location: 'Location',
      date: 'Date',
      skills: 'Skills',
      timeCommitment: 'Time Commitment',
      remote: 'Remote',
      inPerson: 'In-Person',
      today: 'Today',
      thisWeek: 'This Week',
      thisMonth: 'This Month',
      search: 'Search',
      close: 'Close',
      save: 'Save',
      saved: 'Saved',
      share: 'Share',
      notifications: 'Push Notifications',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
    },
  },

  // Mandarin Chinese (中文)
  zh: {
    nav: {
      home: '首页',
      volunteer: '志愿服务',
      organizations: '公益机构',
      news: '社区资讯',
      photos: '行动图集',
      events: '社区活动',
      stories: '感人故事',
      signIn: '登录',
      join: '注册',
      signInSignUp: '登录 / 注册',
      myProfile: '个人中心',
      orgDashboard: '机构后台',
      signOut: '退出登录',
    },
    hero: {
      badge: '社区行动 汇聚爱心',
      headline: '奉献爱心，共创美好温暖社区。',
      supporting: '探索有意义的志愿服务机会，连接社区伙伴，了解身边好人好事，见证每天汇聚的温暖力量。',
      primaryCta: '寻找志愿服务机会',
      secondaryCta: '加入爱心社区',
      searchPrompt: '开启你的志愿之旅',
      searchInterest: '您对什么领域感兴趣？',
      searchLocation: '城市、邮编或远程服务',
      searchDate: '任何时间',
      searchButton: '搜索机会',
    },
    impact: {
      title: '我们共同创造的社区影响力',
      subtitle: '每一份真诚付出，每一双温暖援手，共同构筑坚韧互助的社区家园。',
      volunteers: '注册志愿者',
      organizations: '合作公益伙伴',
      opportunities: '活跃志愿项目',
      hours: '累计志愿工时',
      projects: '已完成社区项目',
    },
    sections: {
      featuredOpportunities: '精选志愿服务机会',
      featuredOpportunitiesSubtitle: '根据您的兴趣、时间与专长，匹配最契合的公益倡议。',
      viewAllOpportunities: '查看全部机会',
      volunteerNow: '立即报名',
      spotsLeft: '个剩余名额',
      communityNews: '社区新闻与动态',
      communityNewsSubtitle: '关注基层进展、先锋榜样专访与社区暖心成果。',
      viewAllNews: '查看所有资讯',
      readMore: '阅读全文',
      communityInAction: '社区行动风采',
      communityInActionSubtitle: '定格温情瞬间，见证志愿者在社区各个角落的真诚付出。',
      exploreGallery: '浏览行动图集',
      upcomingEvents: '近期社区活动',
      upcomingEventsSubtitle: '参与社区环保、邻里互助、公益工作坊与志愿培训。',
      joinEvent: '报名参加活动',
      storiesThatInspire: '温暖人心的志愿故事',
      storiesSubtitle: '聆听身边志愿者倾注爱心、点亮他人的真实心声与感动历程。',
      storiesThatInspireSubtitle: '聆听身边志愿者倾注爱心、点亮他人的真实心声与感动历程。',
      readVolunteerStories: '阅读志愿故事',
      trustedOrganizations: '认证合作公益组织',
      trustedOrganizationsSubtitle: '携手经过严格核验的非营利机构与社区公益团体。',
      featuredOrganizations: '精选特邀机构',
      featuredOrganizationsSubtitle: '深耕各领域的优质公益组织与社区伙伴。',
      viewOrganization: '查看机构详情',
      finalCtaHeadline: '准备好为社区增添一份力量了吗？',
      finalCtaSubtitle: '无论您有一小时还是整个周末，您的参与都能点亮他人的生活。',
      findOpportunity: '探索志愿项目',
      joinCommunity: '立即注册账号',
    },
    cta: {
      headline: '让每一次付出都更有意义',
      subtitle: '连接有需要的邻里与有爱心的您，携手共创美好明天。',
      findOpportunity: '浏览志愿机会',
      joinCommunity: '加入爱心社区',
    },
    common: {
      all: '全部',
      filter: '筛选',
      cause: '公益领域',
      location: '服务地点',
      date: '服务日期',
      skills: '所需技能',
      timeCommitment: '服务时长',
      remote: '线上/远程',
      inPerson: '现场参与',
      today: '今天',
      thisWeek: '本周',
      thisMonth: '本月',
      search: '搜索',
      close: '关闭',
      save: '收藏',
      saved: '已收藏',
      share: '分享',
      notifications: '消息提醒',
      darkMode: '深色模式',
      lightMode: '浅色模式',
    },
  },

  // Malay (Bahasa Melayu)
  ms: {
    nav: {
      home: 'Utama',
      volunteer: 'Sukarelawan',
      organizations: 'Organisasi',
      news: 'Berita',
      photos: 'Galeri Foto',
      events: 'Acara',
      stories: 'Kisah Inspirasi',
      signIn: 'Log Masuk',
      join: 'Daftar',
      signInSignUp: 'Log Masuk / Daftar',
      myProfile: 'Profil Saya',
      orgDashboard: 'Papan Pemuka Org',
      signOut: 'Log Keluar',
    },
    hero: {
      badge: 'Tindakan Komuniti Sejagat',
      headline: 'Cipta Perubahan. Jadi Sebahagian Daripada Sesuatu Yang Bermakna.',
      supporting: 'Temui peluang sukarelawan, eratkan silaturahim komuniti, ikuti perkembangan semasa, dan saksikan impak murni setiap hari.',
      primaryCta: 'Cari Peluang Sukarelawan',
      secondaryCta: 'Sertai Komuniti',
      searchPrompt: 'Cari Panggilan Anda',
      searchInterest: 'Apakah minat anda?',
      searchLocation: 'Bandar, poskod atau jarak jauh',
      searchDate: 'Bila-bila masa',
      searchButton: 'Cari Peluang',
    },
    impact: {
      title: 'Impak Kolektif Bersama',
      subtitle: 'Masa yang diluangkan dan tangan yang menghulur bantuan membina komuniti yang sejahtera dan berdaya tahan.',
      volunteers: 'Sukarelawan Terlibat',
      organizations: 'Rakan Organisasi',
      opportunities: 'Peluang Aktif',
      hours: 'Jam Khidmat Disumbang',
      projects: 'Projek Selesai',
    },
    sections: {
      featuredOpportunities: 'Peluang Sukarelawan Pilihan',
      featuredOpportunitiesSubtitle: 'Cari inisiatif bermakna yang sepadan dengan minat, jadual dan kemahiran anda.',
      viewAllOpportunities: 'Lihat Semua Peluang',
      volunteerNow: 'Sertai Sekarang',
      spotsLeft: 'tempat kekosongan',
      communityNews: 'Berita & Jurnal Komuniti',
      communityNewsSubtitle: 'Ketahui perkembangan terkini, profil penggerak perubahan dan kejayaan sekitar komuniti.',
      viewAllNews: 'Lihat Semua Berita',
      readMore: 'Baca Kisah Penuh',
      communityInAction: 'Komuniti Dalam Aksi',
      communityInActionSubtitle: 'Rakaman detik ikhlas sukarelawan dan jiran berbakti kepada masyarakat.',
      exploreGallery: 'Terokai Galeri Aksi',
      upcomingEvents: 'Acara Komuniti Akan Datang',
      upcomingEventsSubtitle: 'Sertai bengkel kebajikan, gotong-royong, program belia dan latihan sukarelawan.',
      joinEvent: 'Daftar Acara',
      storiesThatInspire: 'Kisah Yang Menginspirasikan',
      storiesSubtitle: 'Hayati pengalaman dan keikhlasan insan-insan yang menyumbang bakti kepada kejiranan.',
      storiesThatInspireSubtitle: 'Hayati pengalaman dan keikhlasan insan-insan yang menyumbang bakti kepada kejiranan.',
      readVolunteerStories: 'Baca Kisah Sukarelawan',
      trustedOrganizations: 'Organisasi Bukan Kerajaan Yang Dipercayai',
      trustedOrganizationsSubtitle: 'Kami bekerjasama dengan organisasi berdaftar dan inisiatif kejiranan yang diiktiraf.',
      featuredOrganizations: 'Organisasi Pilihan',
      featuredOrganizationsSubtitle: 'Kenali organisasi yang membawakan impak bermakna kepada komuniti.',
      viewOrganization: 'Lihat Profil',
      finalCtaHeadline: 'Bersedia Membuat Perubahan Dalam Komuniti Anda?',
      finalCtaSubtitle: 'Sama ada anda mempunyai masa satu petang atau ingin memimpin projek berterusan, sumbangan anda amat berharga.',
      findOpportunity: 'Cari Peluang',
      joinCommunity: 'Daftar Akaun Sukarelawan',
    },
    cta: {
      headline: 'Bersedia Membuat Perubahan Hari Ini?',
      subtitle: 'Hulurkan tangan dan buka hati untuk menyokong mereka yang memerlukan.',
      findOpportunity: 'Terokai Peluang',
      joinCommunity: 'Sertai Komuniti',
    },
    common: {
      all: 'Semua',
      filter: 'Tapis',
      cause: 'Kategori Khidmat',
      location: 'Lokasi',
      date: 'Tarikh',
      skills: 'Kemahiran',
      timeCommitment: 'Komitmen Masa',
      remote: 'Jarak Jauh / Dalam Talian',
      inPerson: 'Bersemuka',
      today: 'Hari Ini',
      thisWeek: 'Minggu Ini',
      thisMonth: 'Bulan Ini',
      search: 'Cari',
      close: 'Tutup',
      save: 'Simpan',
      saved: 'Disimpan',
      share: 'Kongsi',
      notifications: 'Pemberitahuan',
      darkMode: 'Mod Gelap',
      lightMode: 'Mod Cerah',
    },
  },

  // Tamil (தமிழ்)
  ta: {
    nav: {
      home: 'முகப்பு',
      volunteer: 'தன்னார்வப்பணி',
      organizations: 'அமைப்புகள்',
      news: 'செய்திகள்',
      photos: 'புகைப்படங்கள்',
      events: 'நிகழ்வுகள்',
      stories: 'கதைகள்',
      signIn: 'உள்நுழைக',
      join: 'பதிவு செய்க',
      signInSignUp: 'உள்நுழை / பதிவு செய்க',
      myProfile: 'என் சுயவிவரம்',
      orgDashboard: 'அமைப்பு டாஷ்போர்டு',
      signOut: 'வெளியேறுக',
    },
    hero: {
      badge: 'சமூக நற்பணி இயக்கம்',
      headline: 'மாற்றத்தை உருவாக்குங்கள். ஒரு பெரும் பணியின் அங்கமாகுங்கள்.',
      supporting: 'அர்த்தமுள்ள தன்னார்வ வாய்ப்புகளைக் கண்டறியுங்கள், சமூகத்துடன் இணையுங்கள், மற்றும் தினசரி நற்செயல்களின் தாக்கத்தைக் காணுங்கள்.',
      primaryCta: 'தன்னார்வ வாய்ப்புகளைக் காண்க',
      secondaryCta: 'சமூகத்தில் இணைக',
      searchPrompt: 'உங்கள் விருப்பத்தைத் தேர்ந்தெடுங்கள்',
      searchInterest: 'உங்கள் ஆர்வம் என்ன?',
      searchLocation: 'நகரம், அஞ்சல் குறியீடு அல்லது தொலைநிலை',
      searchDate: 'எந்த நேரமும்',
      searchButton: 'வாய்ப்புகளைத் தேடு',
    },
    impact: {
      title: 'நம் கூட்டு சமூகத் தாக்கம்',
      subtitle: 'அர்ப்பணித்த மணிநேரங்களும் உதவும் கரங்களும் சேர்ந்து நம் சமூகத்தில் நிலைத்த மாற்றத்தை உருவாக்குகின்றன.',
      volunteers: 'பதிவுசெய்த தன்னார்வலர்கள்',
      organizations: 'இணை அமைப்புகள்',
      opportunities: 'செயல்பாட்டு வாய்ப்புகள்',
      hours: 'வழங்கப்பட்ட தன்னார்வ நேரம்',
      projects: 'நிறைவுற்ற திட்டங்கள்',
    },
    sections: {
      featuredOpportunities: 'சிறப்பு தன்னார்வ வாய்ப்புகள்',
      featuredOpportunitiesSubtitle: 'உங்கள் ஆர்வம், நேரம் மற்றும் திறன்களுக்கு ஏற்ற உன்னதத் திட்டங்களைக் கண்டறியுங்கள்.',
      viewAllOpportunities: 'அனைத்து வாய்ப்புகளையும் காண்க',
      volunteerNow: 'இப்போதே தன்னார்வலராகுங்கள்',
      spotsLeft: 'இடங்கள் மீதமுள்ளன',
      communityNews: 'சமூகச் செய்திகள் & இதழ்',
      communityNewsSubtitle: 'சமூக முன்னேற்றங்கள், சாதனைகள் மற்றும் நிகழ்வுக் குறிப்புகளைத் தெரிந்து கொள்ளுங்கள்.',
      viewAllNews: 'அனைத்து செய்திகளையும் காண்க',
      readMore: 'முழுமையாகப் படிக்க',
      communityInAction: 'களத்தில் சமூகம்',
      communityInActionSubtitle: 'மக்களுக்கு உதவும் தன்னார்வலர்களின் நெகிழ்ச்சியான தருணங்கள்.',
      exploreGallery: 'படத்தொகுப்பைக் காண்க',
      upcomingEvents: 'வரவிருக்கும் சமூக நிகழ்வுகள்',
      upcomingEventsSubtitle: 'பயிலரங்குகள், துப்புரவுப் பணிகள், மற்றும் சமூகக் கூட்டங்களில் பங்கேற்கவும்.',
      joinEvent: 'நிகழ்வில் பதிவுசெய்க',
      storiesThatInspire: 'ஊக்கமளிக்கும் கதைகள்',
      storiesSubtitle: 'சமூக வளர்ச்சிக்கு அர்ப்பணிப்புடன் உழைக்கும் தன்னார்வலர்களின் அனுபவங்கள்.',
      storiesThatInspireSubtitle: 'சமூக வளர்ச்சிக்கு அர்ப்பணிப்புடன் உழைக்கும் தன்னார்வலர்களின் அனுபவங்கள்.',
      readVolunteerStories: 'தன்னார்வலர் கதைகளைப் படிக்க',
      trustedOrganizations: 'நம்பகமான அரசு சாரா அமைப்புகள்',
      trustedOrganizationsSubtitle: 'அங்கீகரிக்கப்பட்ட அமைப்புகளுடனும் சமூகக் குழுக்களுடனும் இணைந்து பணியாற்றுகிறோம்.',
      featuredOrganizations: 'சிறப்பு அமைப்புகள்',
      featuredOrganizationsSubtitle: 'சமூகத்தில் ஆழமான மாற்றத்தை ஏற்படுத்தும் அமைப்புகளை அறியுங்கள்.',
      viewOrganization: 'சுயவிவரத்தைப் பார்க்க',
      finalCtaHeadline: 'சமூகத்தில் ஒரு மாற்றத்தை ஏற்படுத்த நீங்கள் தயாரா?',
      finalCtaSubtitle: 'ஒரு மணிநேரமாயினும் சரி, வார இறுதியாயினும் சரி, உங்கள் பங்களிப்பு பிறருக்கு ஒளியூட்டும்.',
      findOpportunity: 'வாய்ப்புகளைக் கண்டறிக',
      joinCommunity: 'தன்னார்வலர் கணக்கு உருவாக்குக',
    },
    cta: {
      headline: 'ஒன்றாக இணைந்து சிறந்த சமூகத்தை உருவாக்குவோம்',
      subtitle: 'உதவி தேவைப்படுபவர்களோடு உங்கள் அன்புக்கரங்களை இணையுங்கள்.',
      findOpportunity: 'வாய்ப்புகளைப் பார்க்க',
      joinCommunity: 'இன்றே இணையுங்கள்',
    },
    common: {
      all: 'அனைத்தும்',
      filter: 'வடிகட்டு',
      cause: 'பணி வகை',
      location: 'இடம்',
      date: 'தேதி',
      skills: 'திறன்கள்',
      timeCommitment: 'நேர அர்ப்பணிப்பு',
      remote: 'தொலைநிலை',
      inPerson: 'நேரில்',
      today: 'இன்று',
      thisWeek: 'இந்த வாரம்',
      thisMonth: 'இந்த மாதம்',
      search: 'தேடு',
      close: 'மூடு',
      save: 'சேமி',
      saved: 'சேமிக்கப்பட்டது',
      share: 'பகிர்',
      notifications: 'அறிவிப்புகள்',
      darkMode: 'இருண்ட பயன்முறை',
      lightMode: 'வெளிச்ச பயன்முறை',
    },
  },
};
