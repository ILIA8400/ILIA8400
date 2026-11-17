/* ============================================================
   Centralized translation dictionary — Persian (fa) / English (en)
   Note: \u200E (LRM) keeps Latin tokens such as ".NET" intact
   inside RTL sentences.
   ============================================================ */

const translations = {
  fa: {
    name: 'ایلیا اصغرحری',
    meta: {
      title: 'ایلیا اصغرحری — توسعه‌دهنده \u200E.NET',
      description: 'وب‌سایت شخصی ایلیا اصغرحری؛ کارشناس توسعه نرم‌افزار با تمرکز بر توسعه بک‌اند و اکوسیستم \u200E.NET.'
    },
    a11y: {
      skip: 'پرش به محتوای اصلی',
      nav: 'ناوبری اصلی',
      brand: 'ایلیا اصغرحری — بازگشت به بالا',
      menu: 'باز کردن منوی ناوبری',
      menuClose: 'بستن منوی ناوبری',
      themeToLight: 'تغییر پوسته به حالت روشن',
      themeToDark: 'تغییر پوسته به حالت تیره',
      langFA: 'نمایش وب‌سایت به فارسی',
      langEN: 'نمایش وب‌سایت به انگلیسی',
      copyEmail: 'کپی کردن آدرس ایمیل',
      emailLink: 'ارسال ایمیل به ایلیا اصغرحری',
      githubLink: 'مشاهده پروفایل GitHub ایلیا اصغرحری',
      linkedinLink: 'مشاهده پروفایل LinkedIn ایلیا اصغرحری'
    },
    nav: {
      about: 'درباره من',
      experience: 'تجربه کاری',
      projects: 'پروژه‌ها',
      skills: 'مهارت‌ها',
      contact: 'تماس'
    },
    hero: {
      title: 'توسعه‌دهنده \u200E.NET | تمرکز بر بک‌اند',
      intro: 'توسعه‌دهنده نرم‌افزار با تمرکز بر توسعه بک‌اند و اکوسیستم \u200E.NET، علاقه‌مند به طراحی سیستم‌های مقیاس‌پذیر، معماری نرم‌افزار و توسعه راهکارهای قابل نگهداری.',
      viewProjects: 'مشاهده پروژه‌ها',
      contactMe: 'تماس با من',
      resume: 'دانلود رزومه',
      company: 'شرکت راهکارهای نرم‌افزاری پارسان',
      location: 'تهران، ایران',
      education: 'کارشناسی مهندسی کامپیوتر — در حال تحصیل'
    },
    about: {
      heading: 'درباره من',
      p1: 'من یک توسعه‌دهنده نرم‌افزار با تمرکز بر توسعه بک‌اند در اکوسیستم \u200E.NET هستم. در حال حاضر روی توسعه و نگهداری یک سیستم ERP سازمانی فعالیت می‌کنم و تجربه کار با منطق‌های پیچیده کسب‌وکار، APIها، پایگاه داده و معماری نرم‌افزار را دارم.',
      p2: 'به یادگیری مفاهیم عمیق مهندسی نرم‌افزار، طراحی سیستم‌های قابل توسعه و نوشتن کدهای تمیز و قابل نگهداری علاقه‌مندم.',
      factsTitle: 'در یک نگاه',
      f1l: 'موقعیت',
      f1v: 'تهران، ایران',
      f2l: 'نقش فعلی',
      f2v: 'کارشناس توسعه نرم‌افزار — پارسان',
      f3l: 'حوزه تمرکز',
      f3v: 'توسعه بک‌اند در اکوسیستم \u200E.NET',
      f4l: 'تحصیلات',
      f4v: 'کارشناسی مهندسی کامپیوتر (در حال تحصیل)'
    },
    experience: {
      heading: 'تجربه کاری',
      role: 'کارشناس توسعه نرم‌افزار / توسعه‌دهنده \u200E.NET',
      company: 'شرکت راهکارهای نرم‌افزاری پارسان',
      period: 'آذر ۱۴۰۳ — اکنون',
      location: 'تهران، ایران',
      s1v: 'ERP',
      s1l: 'پلتفرم سازمانی',
      s2v: '+۵۰',
      s2l: 'زیرسیستم کسب‌وکاری',
      s3v: '≈۱۰٬۰۰۰',
      s3l: 'کاربر',
      modulesTitle: 'ماژول‌ها و حوزه‌های کاری',
      m1: 'کارها و مدیریت جلسات',
      m2: 'CRM',
      m3: 'امور حقوقی',
      m4: 'مجامع',
      m5: 'حاکمیت شرکتی',
      m6: 'سهامداری',
      m7: 'منابع انسانی',
      m8: 'حقوق و دستمزد',
      m9: 'اجزای مشترک ERP',
      dutiesTitle: 'مسئولیت‌ها و مشارکت‌های فنی',
      d1: 'توسعه قابلیت‌های کسب‌وکار و پیاده‌سازی منطق کسب‌وکار در زیرسیستم‌های مختلف ERP.',
      d2: 'توسعه APIها، کنترلرها و سرویس‌های کاربردی مبتنی بر ASP.NET و معماری لایه‌ای.',
      d3: 'کار با SQL Server و توسعه، نگهداری و دیباگ Stored Procedureهای پیچیده.',
      d4: 'استفاده از Entity Framework برای توسعه و مدیریت داده‌ها.',
      d5: 'پیاده‌سازی ارتباط بلادرنگ (Real-Time) با استفاده از فناوری‌های مبتنی بر WebSocket.',
      d6: 'طراحی و توسعه تقویم سازمانی برای مدیریت جلسات، رویدادها و وظایف.',
      d7: 'توسعه کامپوننت‌ها و Helperهای قابل استفاده مجدد جهت بهبود قابلیت نگهداری سیستم.',
      d8: 'مشارکت در ماژولار کردن زیرسیستم‌ها و بهبود ساختار معماری لایه‌ای.',
      d9: 'همکاری در فرآیند مهاجرت تدریجی سامانه از \u200E.NET Framework 4.5 به \u200E.NET 10.',
      d10: 'بازطراحی بخش‌هایی از رابط کاربری شامل صفحه ورود، منوها و گریدهای برخی زیرسیستم‌ها.',
      d11: 'همکاری با تیم‌های توسعه کوچک.'
    },
    projects: {
      heading: 'پروژه‌های منتخب',
      view: 'مشاهده در GitHub',
      p1: 'اپلیکیشن شخصی بهره‌وری و مدیریت مطالعه با تمرکز بر برنامه‌ریزی، سازمان‌دهی و پیگیری فعالیت‌های یادگیری.',
      p2: 'پروژه مدیریت مخاطبین با رویکرد بک‌اند؛ نمونه‌ای از معماری نرم‌افزار و توسعه ساخت‌یافته اپلیکیشن.',
      p3: 'اپلیکیشن مطالعه و مدیریت کتاب‌ها.',
      aria1: 'مشاهده مخزن Momentum.ASP در GitHub',
      aria2: 'مشاهده مخزن PhoneBook در GitHub',
      aria3: 'مشاهده مخزن ReadBox در GitHub'
    },
    skills: {
      heading: 'مهارت‌های فنی',
      c1: 'توسعه بک‌اند',
      c2: 'پایگاه داده',
      c3: 'مهندسی نرم‌افزار',
      c4: 'فرانت‌اند',
      c5: 'ابزارها و توسعه'
    },
    learning: {
      heading: 'در حال یادگیری',
      note: 'موضوعات زیر حوزه‌هایی هستند که در حال حاضر در حال کاوش و یادگیری آن‌ها هستم و لزوماً در حد تخصص حرفه‌ای من نیستند.',
      l1: 'معماری پیشرفته نرم‌افزار',
      l2: 'طراحی دامنه‌محور (DDD)',
      l3: 'معماری میکروسرویس‌ها',
      l4: 'سیستم‌های توزیع‌شده',
      l5: 'RabbitMQ و معماری پیام‌محور',
      l6: 'Docker',
      l7: 'تست خودکار',
      l8: 'مشاهده‌پذیری (Observability)'
    },
    education: {
      heading: 'تحصیلات و گواهینامه‌ها',
      typeEdu: 'مدرک تحصیلی',
      degree: 'کارشناسی مهندسی کامپیوتر',
      college: 'دانشکده فنی و حرفه‌ای شهید شمسی‌پور',
      eduPeriod: 'مهر ۱۴۰۲ — در حال تحصیل',
      typeCourse: 'دوره آموزشی',
      course: 'نقشه راه مهندسی نرم‌افزار',
      provider: 'NikAmooz',
      coursePeriod: 'مهر ۱۴۰۴ — فروردین ۱۴۰۵',
      credential: 'شناسه گواهینامه:'
    },
    contact: {
      heading: 'تماس با من',
      lead: 'برای گفت‌وگو درباره فرصت‌های همکاری، پیشنهادها یا موضوعات فنی، از راه‌های زیر با من در ارتباط باشید.',
      emailL: 'ایمیل',
      githubL: 'GitHub',
      linkedinL: 'LinkedIn',
      locL: 'موقعیت',
      copied: 'آدرس ایمیل کپی شد.',
      copyFailed: 'کپی انجام نشد؛ لطفاً به‌صورت دستی کپی کنید.'
    },
    footer: {
      tagline: 'توسعه‌دهنده \u200E.NET | تمرکز بر بک‌اند',
      rights: '© {year} ایلیا اصغرحری — تمامی حقوق محفوظ است.',
      built: 'طراحی و توسعه با HTML، CSS و JavaScript'
    }
  },

  en: {
    name: 'Ilia Asgharhorri',
    meta: {
      title: 'Ilia Asgharhorri — .NET Developer',
      description: 'Personal website of Ilia Asgharhorri — a software developer focused on backend development and the .NET ecosystem.'
    },
    a11y: {
      skip: 'Skip to main content',
      nav: 'Main navigation',
      brand: 'Ilia Asgharhorri — back to top',
      menu: 'Open navigation menu',
      menuClose: 'Close navigation menu',
      themeToLight: 'Switch to light theme',
      themeToDark: 'Switch to dark theme',
      langFA: 'View website in Persian',
      langEN: 'View website in English',
      copyEmail: 'Copy email address',
      emailLink: 'Send an email to Ilia Asgharhorri',
      githubLink: "View Ilia Asgharhorri's GitHub profile",
      linkedinLink: "View Ilia Asgharhorri's LinkedIn profile"
    },
    nav: {
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact'
    },
    hero: {
      title: '.NET Developer | Backend-Focused',
      intro: 'Software Developer focused on backend development and the .NET ecosystem, interested in software architecture, scalable systems, and building maintainable solutions.',
      viewProjects: 'View Projects',
      contactMe: 'Contact Me',
      resume: 'Download Resume',
      company: 'Parsan Software Solutions',
      location: 'Tehran, Iran',
      education: 'B.Sc. in Computer Engineering — in progress'
    },
    about: {
      heading: 'About',
      p1: 'I am a software developer focused on backend development within the .NET ecosystem. I currently work on developing and maintaining an enterprise ERP system, gaining experience with complex business logic, APIs, databases, and software architecture.',
      p2: 'I am passionate about learning software engineering principles, designing extensible systems, and writing clean, maintainable code.',
      factsTitle: 'At a glance',
      f1l: 'Location',
      f1v: 'Tehran, Iran',
      f2l: 'Current role',
      f2v: 'Software Developer — Parsan',
      f3l: 'Focus area',
      f3v: 'Backend development in the .NET ecosystem',
      f4l: 'Education',
      f4v: 'B.Sc. in Computer Engineering (in progress)'
    },
    experience: {
      heading: 'Experience',
      role: 'Software Developer / .NET Developer',
      company: 'Parsan Software Solutions',
      period: 'Dec 2024 — Present',
      location: 'Tehran, Iran',
      s1v: 'ERP',
      s1l: 'Enterprise platform',
      s2v: '50+',
      s2l: 'business subsystems',
      s3v: '≈10,000',
      s3l: 'users',
      modulesTitle: 'Modules & Areas',
      m1: 'Work Items & Meetings',
      m2: 'CRM',
      m3: 'Legal Affairs',
      m4: 'Assemblies',
      m5: 'Corporate Governance',
      m6: 'Stockholders',
      m7: 'Human Resources',
      m8: 'Payroll',
      m9: 'Shared ERP components',
      dutiesTitle: 'Responsibilities & Contributions',
      d1: 'Developing and maintaining business logic and backend functionality.',
      d2: 'Implementing and maintaining APIs, controllers, and services.',
      d3: 'Working with SQL Server and complex stored procedures.',
      d4: 'Using Entity Framework for database operations.',
      d5: 'Implementing real-time communication using WebSocket-based technologies.',
      d6: 'Developing an organizational calendar for meetings, events, and tasks.',
      d7: 'Creating reusable components and helper utilities.',
      d8: 'Contributing to improved modularity and layered architecture.',
      d9: 'Contributing to the gradual migration from .NET Framework 4.5 to .NET 10.',
      d10: 'Participating in UI improvements and redesigns when needed.',
      d11: 'Collaborating with small development teams.'
    },
    projects: {
      heading: 'Featured Projects',
      view: 'View on GitHub',
      p1: 'A personal productivity and study management application focused on planning, organizing, and tracking learning activities.',
      p2: 'A backend-oriented contact management project demonstrating software architecture and structured application development.',
      p3: 'A book reading and management application.',
      aria1: 'View the Momentum.ASP repository on GitHub',
      aria2: 'View the PhoneBook repository on GitHub',
      aria3: 'View the ReadBox repository on GitHub'
    },
    skills: {
      heading: 'Technical Skills',
      c1: 'Backend Development',
      c2: 'Database',
      c3: 'Software Engineering',
      c4: 'Frontend',
      c5: 'Tools & Development'
    },
    learning: {
      heading: 'Currently Learning',
      note: 'The following are areas I am actively exploring and learning about — not necessarily areas of professional expertise.',
      l1: 'Advanced Software Architecture',
      l2: 'Domain-Driven Design (DDD)',
      l3: 'Microservices Architecture',
      l4: 'Distributed Systems',
      l5: 'RabbitMQ & Message-Driven Architecture',
      l6: 'Docker',
      l7: 'Automated Testing',
      l8: 'Observability'
    },
    education: {
      heading: 'Education & Certifications',
      typeEdu: 'Degree',
      degree: "Bachelor's Degree in Computer Engineering",
      college: 'Shahid Shamsipour Technical and Vocational College',
      eduPeriod: 'Oct 2023 — Present',
      typeCourse: 'Course',
      course: 'The Roadmap of Software Engineering',
      provider: 'NikAmooz',
      coursePeriod: 'Oct 2025 — Apr 2026',
      credential: 'Credential ID:'
    },
    contact: {
      heading: 'Contact',
      lead: 'For collaboration opportunities, proposals, or technical discussions, feel free to reach out through any of the channels below.',
      emailL: 'Email',
      githubL: 'GitHub',
      linkedinL: 'LinkedIn',
      locL: 'Location',
      copied: 'Email address copied.',
      copyFailed: 'Copy failed — please copy it manually.'
    },
    footer: {
      tagline: '.NET Developer | Backend-Focused',
      rights: '© {year} Ilia Asgharhorri — All rights reserved.',
      built: 'Designed & built with HTML, CSS & JavaScript'
    }
  }
};

/* Expose for the browser (main.js) and for Node-based QA checks. */
if (typeof window !== 'undefined') { window.translations = translations; }
if (typeof module !== 'undefined' && module.exports) { module.exports = { translations: translations }; }
