const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const hero = document.querySelector("[data-hero]");
const heroChoices = document.querySelectorAll("[data-hero-choice]");
const scrollAssistButtons = document.querySelectorAll("[data-scroll-assist]");
const galleryControls = document.querySelectorAll("[data-gallery-control]");
const contactForm = document.querySelector("[data-contact-form]");
const trialForm = document.querySelector("[data-trial-form]");
const languageButtons = document.querySelectorAll("[data-lang-choice]");
const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
const useScrollAssist = !isTouchDevice && new URLSearchParams(window.location.search).get("assist") === "1";

const kakaoChannels = {
  seongnam: "https://pf.kakao.com/_ZPbxmG",
  songpa: "https://pf.kakao.com/_xjiajs",
};

const branchPhones = {
  seongnam: "010-5775-9771",
  songpa: "010-5775-0314",
};

const getBranchKey = (branch) => (String(branch || "").includes("송파") ? "songpa" : "seongnam");

if (header) {
  const syncHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });
}

if (useScrollAssist) {
  document.body.classList.add("has-scroll-assist");

  const scrollPage = (amount) => {
    const direction = Math.sign(amount);
    if (direction === 0) return;

    const distance = Math.max(180, Math.abs(amount) * 4);
    window.scrollBy({ top: direction * distance, left: 0, behavior: "auto" });
  };

  const handleWheelScroll = (event) => {
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault();
      scrollPage(event.deltaY);
    }
  };

  document.addEventListener("wheel", handleWheelScroll, { passive: false, capture: true });
  document.addEventListener("mousewheel", handleWheelScroll, { passive: false, capture: true });

  window.addEventListener(
    "keydown",
    (event) => {
      const scrollKeys = {
        ArrowDown: 260,
        PageDown: window.innerHeight * 0.86,
        Space: window.innerHeight * 0.86,
        ArrowUp: -260,
        PageUp: window.innerHeight * -0.86,
        Home: -window.scrollY,
        End: document.documentElement.scrollHeight,
      };

      if (event.key in scrollKeys) {
        event.preventDefault();
        window.scrollBy({ top: scrollKeys[event.key], left: 0, behavior: "auto" });
      }
    },
    { passive: false },
  );

  scrollAssistButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = Number(button.dataset.scrollAssist);
      window.scrollBy({ top: direction * window.innerHeight * 0.82, left: 0, behavior: "smooth" });
    });
  });
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    const isEnglish = document.documentElement.lang === "en";
    header?.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? (isEnglish ? "Close menu" : "메뉴 닫기") : (isEnglish ? "Open menu" : "메뉴 열기"));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      nav.classList.remove("is-open");
      header?.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", document.documentElement.lang === "en" ? "Open menu" : "메뉴 열기");
    }
  });
}

const languageTargets = [
  { selector: ".nav a[href='#about']", en: "Philosophy" },
  { selector: ".nav a[href='#programs']", en: "Programs" },
  { selector: ".nav a[href='#faculty']", en: "Faculty" },
  { selector: ".nav a[href='#gallery']", en: "Studio" },
  { selector: ".nav a[href='#contact']", en: "Locations" },
  { selector: ".nav .nav-cta", en: "Book a Trial" },
  { selector: ".brand-headline", en: "<span>LOVE YOUR BODY.</span><span>BE BALLET.</span>" },
  { selector: ".hero-actions .button.primary", en: "Book a Trial Class" },
  { selector: ".hero-actions .button.ghost", en: "Kakao Inquiry by Branch" },
  { selector: ".brand-about .section-heading .eyebrow", en: "Our Philosophy" },
  {
    selector: ".brand-about .section-heading h2",
    en: 'A Philosophical<br /><span class="text-accent">Cultural Movement</span>',
  },
  {
    selector: ".brand-about .story-lead",
    en: "B-BALLET positions itself as a premium educational space that prioritizes the internal experience and physical health of the dancer over mere technical speed, bridging the gap between casual hobby and professional training through expert-led instruction.",
  },
  {
    selector: ".brand-about .story-copy p:nth-of-type(2)",
    en: "Whether you are pursuing ballet as a hobby or a professional career, we help our students find balance and beauty through movement.",
  },
  {
    selector: ".brand-about .story-copy p:nth-of-type(3)",
    en: "From children to adults, every student is guided with professional care and respect for the body.",
  },
  { selector: ".principles-label", en: "B-BALLET VALUES" },
  { selector: ".story-principles div:nth-of-type(1) p", en: "Understand how the body moves and feels." },
  { selector: ".story-principles div:nth-of-type(2) p", en: "Value the process of growth over quick results." },
  { selector: ".story-principles div:nth-of-type(3) p", en: "Train with respect for the body and long-term growth." },
  { selector: ".story-principles div:nth-of-type(4) p", en: "Discover a personal voice through movement." },
  {
    selector: ".brand-statement p",
    en: "Inspiring. Professional.<br />Mindful. Encouraging.",
  },
  {
    selector: ".brand-statement span",
    en: "Bridging the gap between casual hobby and professional training.",
  },
  {
    selector: ".brand-programs .section-heading h2",
    en: "Specialized Training",
  },
  { selector: ".brand-programs .section-summary", en: "Offering specialized training for toddlers, students, and adults at our Seongnam and Songpa locations." },
  { selector: ".program-card:nth-child(1) h3", en: "Kids Ballet" },
  { selector: ".program-card:nth-child(1) p", en: "A playful introduction to body awareness, focus, and classroom habits." },
  { selector: ".program-card:nth-child(2) h3", en: "Junior Ballet" },
  { selector: ".program-card:nth-child(2) p", en: "A class that develops alignment, balance, and focus for growing bodies." },
  { selector: ".program-card:nth-child(3) h3", en: "Pre-Professional" },
  { selector: ".program-card:nth-child(3) p", en: "Focused training in basics, repertoire, and stage awareness." },
  { selector: ".program-card:nth-child(4) h3", en: "Adult Ballet" },
  { selector: ".program-card:nth-child(4) p", en: "A time to relearn movement for yourself." },
  { selector: ".program-card:nth-child(5) h3", en: "Pointe" },
  { selector: ".program-card:nth-child(5) p", en: "A focused class for building pointe alignment and strength." },
  { selector: ".program-card:nth-child(6) h3", en: "Repertoire" },
  { selector: ".program-card:nth-child(6) p", en: "Develop musicality and expression through choreography." },
  { selector: ".program-card:nth-child(7) h3", en: "Private Lessons" },
  { selector: ".program-card:nth-child(7) p", en: "One-on-one instruction tailored to your body and goals." },
  { selector: ".program-card:nth-child(8) h3", en: "Small-Group Lessons" },
  { selector: ".program-card:nth-child(8) p", en: "Personalized guidance in a focused small-group setting." },
  { selector: ".program-card:nth-child(9) h3", en: "Performance & Stage Experience" },
  { selector: ".program-card:nth-child(9) p", en: "Extending movement learned in class into repertoire and meaningful stage experience." },
  {
    selector: ".program-note p:nth-of-type(1)",
    en: "Kids, junior, adult, and pre-professional classes are guided by the same B-BALLET standard.",
  },
  {
    selector: ".program-note p:nth-of-type(2)",
    en: "From beginner classes to levels, pointe, repertoire, and private lessons, each step is carefully guided.",
  },
  { selector: ".level-flow h3", en: "From beginner class to repertoire, continue at your own pace." },
  { selector: ".level-steps span:nth-child(1)", en: "Beginner" },
  { selector: ".level-steps span:nth-child(2)", en: "Level 0.5" },
  { selector: ".level-steps span:nth-child(3)", en: "Level 1" },
  { selector: ".level-steps span:nth-child(4)", en: "Center Focus" },
  { selector: ".level-steps span:nth-child(5)", en: "Level 2" },
  { selector: ".program-stage-note strong", en: "Stage Experience" },
  {
    selector: ".program-stage-note p",
    en: "Movement learned in class can naturally extend to adult performances and children's stage experiences.",
  },
  { selector: ".faculty .eyebrow", en: "Director & Faculty" },
  {
    selector: ".faculty .section-heading h2",
    en: '<span class="text-accent">Good movement</span> begins with good guidance.',
  },
  { selector: ".director-copy h3", en: "Director Kwon Bobin" },
  {
    selector: ".director-copy p:nth-of-type(2)",
    en: 'B-BALLET began with a question: how can ballet become something that can <span class="text-on-dark">continue for a long time</span>, not only something performed well for a moment? Drawing on more than 10 years of ballet education, performance production, and arts management, we shape every class and stage experience with care.',
  },
  {
    selector: ".director-copy p:nth-of-type(3)",
    en: "We value process over results, awareness over technique, and direction over speed. We hope B-BALLET becomes a new challenge, a moment of rest, and a starting point for each person's dream.",
  },
  { selector: ".director-profile li:nth-child(1)", en: "Operates Seongnam and Songpa studios" },
  { selector: ".director-profile li:nth-child(2)", en: "Over 10 years of ballet education experience" },
  { selector: ".director-profile li:nth-child(3)", en: "University teaching and external lectures" },
  { selector: ".director-profile li:nth-child(4)", en: "Performance production and stage coaching" },
  { selector: ".director-profile li:nth-child(5)", en: "Doctoral studies in Arts Management" },
  { selector: ".teacher-branch:nth-of-type(1) h3", en: "Seongnam Studio" },
  { selector: ".teacher-branch:nth-of-type(2) h3", en: "Songpa Faculty" },
  { selector: ".teacher-branch:nth-of-type(1) .teacher-list article:nth-child(1) span", en: "Instructor Kim Min-jin" },
  { selector: ".teacher-branch:nth-of-type(1) .teacher-list article:nth-child(2) span", en: "Instructor Yeom Gyu-jeong" },
  { selector: ".teacher-branch:nth-of-type(1) .teacher-list article:nth-child(3) span", en: "Instructor Ji Ho-yong" },
  { selector: ".teacher-branch:nth-of-type(1) .teacher-list article:nth-child(4) span", en: "Instructor Park Mi-joo" },
  { selector: ".teacher-branch:nth-of-type(1) .teacher-list article:nth-child(5) span", en: "Instructor Jo Hyun-soo" },
  { selector: ".teacher-branch:nth-of-type(1) .teacher-list article:nth-child(6) span", en: "Instructor Kim Jin-ah" },
  { selector: ".teacher-branch:nth-of-type(1) .teacher-list article:nth-child(7) span", en: "Manager Yoo Mi-ran" },
  { selector: ".teacher-branch:nth-of-type(2) .teacher-list article:nth-child(1) span", en: "Deputy Director Lee Ji-hye" },
  { selector: ".teacher-branch:nth-of-type(2) .teacher-list article:nth-child(2) span", en: "Instructor Won Da-bin" },
  { selector: ".teacher-branch:nth-of-type(2) .teacher-list article:nth-child(3) span", en: "Instructor Yeom Gyu-jeong" },
  { selector: ".teacher-branch:nth-of-type(2) .teacher-list article:nth-child(4) span", en: "Instructor Ji Ho-yong" },
  { selector: ".brand-gallery .eyebrow", en: "The Studio" },
  {
    selector: ".brand-gallery .section-heading h2",
    en: "Ethereal &amp; Disciplined",
  },
  { selector: ".mobile-quick-actions a[href='#programs']", en: "Classes" },
  { selector: ".mobile-quick-actions a[href='#contact']", en: "Contact" },
  { selector: ".contact .eyebrow", en: "Contact" },
  {
    selector: ".contact h2",
    en: 'Begin your <span class="text-on-dark">first scene</span> at B-BALLET.',
  },
  {
    selector: ".contact-intro > p:nth-of-type(2)",
    en: "Choose your studio and preferred class. We will guide trial schedules, registration, and payment by email or Kakao.",
  },
  { selector: ".contact-main-cta", en: "Book a Trial Class Consultation" },
  { selector: ".contact-branch-card:nth-child(1) h3", en: "Seongnam Inquiry" },
  { selector: ".contact-branch-card:nth-child(1) > p:not(.branch-label)", en: "Guidance for growth-stage classes, pre-professional training, and adult ballet." },
  { selector: ".contact-branch-card:nth-child(1) .branch-consult-cta", en: "Text Seongnam Studio" },
  { selector: ".contact-branch-card:nth-child(2) h3", en: "Songpa Inquiry" },
  { selector: ".contact-branch-card:nth-child(2) > p:not(.branch-label)", en: "Guidance for beginner, level, pointe, private, and repertoire classes." },
  { selector: ".contact-branch-card:nth-child(2) .branch-consult-cta", en: "Text Songpa Studio" },
  { selector: ".contact-branch-card .contact-details > div:nth-child(1) dt", en: "Phone" },
  { selector: ".contact-branch-card .contact-details > div:nth-child(2) dt", en: "Kakao Channel" },
  { selector: ".contact-branch-card .contact-details > div:nth-child(3) dt", en: "Instagram" },
  { selector: ".contact-branch-card .contact-details > div:nth-child(4) dt", en: "Map" },
  { selector: ".contact-branch-card:nth-child(1) .contact-details > div:nth-child(2) a", en: "B-BALLET Academy Seongnam" },
  { selector: ".contact-branch-card:nth-child(2) .contact-details > div:nth-child(2) a", en: "B-BALLET Academy Songpa" },
  { selector: ".contact-branch-card .contact-details > div:nth-child(4) a", en: "View on Google Maps" },
  { selector: ".registration-guide strong", en: "Trial Class Flow" },
  { selector: ".registration-guide li:nth-child(1)", en: "Select your preferred studio and class." },
  { selector: ".registration-guide li:nth-child(2)", en: "Confirm available schedules and levels through Kakao consultation." },
  { selector: ".registration-guide li:nth-child(3)", en: "Receive individual guidance for registration and payment." },
  { selector: ".faq .eyebrow", en: "FAQ" },
  { selector: ".faq h2", en: "Questions often asked by first-time students." },
  { selector: ".faq article:nth-child(1) h3", en: "Can I start with no ballet experience?" },
  { selector: ".faq article:nth-child(1) p", en: "Yes. No ballet experience is required. Body type and flexibility are not conditions for starting; we begin with your body as it is now." },
  { selector: ".faq article:nth-child(2) h3", en: "Can adult beginners join classes?" },
  { selector: ".faq article:nth-child(2) p", en: "Yes. We guide students step by step from introductory and beginner classes, continuing levels at each person's pace." },
  { selector: ".faq article:nth-child(3) h3", en: "Which studio should I choose, Seongnam or Songpa?" },
  { selector: ".faq article:nth-child(3) p", en: "You may choose the studio closer to home, or we can guide you by preferred schedule and class level through consultation." },
  { selector: ".faq article:nth-child(4) h3", en: "Are private or small-group lessons available?" },
  { selector: ".faq article:nth-child(4) p", en: "Yes. Private and small-group lessons can be discussed according to your goals, body condition, and available time." },
  { selector: ".faq article:nth-child(5) h3", en: "Are there performance or stage opportunities?" },
  { selector: ".faq article:nth-child(5) p", en: "We prepare adult performances and children's stage experiences, helping movement learned in class continue onto the stage." },
  { selector: ".sticky-cta a[href='#contact']", en: "Consultation" },
  { selector: ".trial-nav a[href='index.html#contact']", en: "Contact" },
  { selector: ".trial-nav .nav-cta", en: "Home" },
  { selector: ".trial-hero .eyebrow", en: "Trial Class" },
  { selector: ".trial-hero h1", en: "Trial Class Consultation" },
  {
    selector: ".trial-hero p:not(.eyebrow)",
    en: "Select your preferred studio, class, and time. We will prepare your inquiry so you can send it by email or Kakao.",
  },
  { selector: ".trial-form .trial-grid:nth-of-type(1) label:nth-child(1) span", en: "Name" },
  { selector: ".trial-form .trial-grid:nth-of-type(1) label:nth-child(2) span", en: "Phone" },
  { selector: ".trial-form fieldset:nth-of-type(1) legend", en: "Preferred Studio" },
  { selector: ".trial-form fieldset:nth-of-type(2) legend", en: "Preferred Class" },
  { selector: ".trial-form .trial-grid:nth-of-type(2) label:nth-child(1) span", en: "Preferred Day / Time" },
  { selector: ".trial-form .trial-grid:nth-of-type(2) label:nth-child(2) span", en: "Ballet Experience" },
  { selector: ".trial-form option:nth-child(1)", en: "This is my first time" },
  { selector: ".trial-form option:nth-child(2)", en: "I have some basic experience" },
  { selector: ".trial-form option:nth-child(3)", en: "I have more than 1 year of experience" },
  { selector: ".trial-form option:nth-child(4)", en: "I have pre-professional experience" },
  { selector: ".trial-form > label span", en: "Message" },
  { selector: ".trial-submit", en: "Prepare Inquiry Message" },
  {
    selector: ".trial-help",
    en: "After pressing the button, choose Email or Kakao Channel to send your prepared inquiry.",
  },
  { selector: "[data-trial-result-title]", en: "Your consultation message is ready." },
  {
    selector: "[data-trial-copy-note]",
    en: "Copy the message below and paste it into the Kakao Channel chat.",
  },
  { selector: "[data-copy-trial-message]", en: "Copy Again" },
  { selector: "[data-trial-kakao]", en: "Open Kakao Channel" },
  { selector: "[data-trial-email]", en: "Send by Email" },
  { selector: ".footer strong", en: "B-BALLET" },
  { selector: ".footer span", en: "love your body. be ballet." },
];

const languageTextTargets = [
  { selector: ".trial-form fieldset:nth-of-type(1) .trial-option-grid label:nth-child(1)", en: " Seongnam Studio" },
  { selector: ".trial-form fieldset:nth-of-type(1) .trial-option-grid label:nth-child(2)", en: " Songpa Studio" },
  { selector: ".trial-form fieldset:nth-of-type(2) .trial-option-grid label:nth-child(1)", en: " Kids" },
  { selector: ".trial-form fieldset:nth-of-type(2) .trial-option-grid label:nth-child(2)", en: " Junior" },
  { selector: ".trial-form fieldset:nth-of-type(2) .trial-option-grid label:nth-child(3)", en: " Pre-Professional" },
  { selector: ".trial-form fieldset:nth-of-type(2) .trial-option-grid label:nth-child(4)", en: " Adult Beginner" },
  { selector: ".trial-form fieldset:nth-of-type(2) .trial-option-grid label:nth-child(5)", en: " Adult Level 0.5" },
  { selector: ".trial-form fieldset:nth-of-type(2) .trial-option-grid label:nth-child(6)", en: " Adult Level 1" },
  { selector: ".trial-form fieldset:nth-of-type(2) .trial-option-grid label:nth-child(7)", en: " Center Focus" },
  { selector: ".trial-form fieldset:nth-of-type(2) .trial-option-grid label:nth-child(8)", en: " Adult Level 2" },
  { selector: ".trial-form fieldset:nth-of-type(2) .trial-option-grid label:nth-child(9)", en: " Pointe" },
  { selector: ".trial-form fieldset:nth-of-type(2) .trial-option-grid label:nth-child(10)", en: " Repertoire" },
  { selector: ".trial-form fieldset:nth-of-type(2) .trial-option-grid label:nth-child(11)", en: " Private Lesson" },
  { selector: ".trial-form fieldset:nth-of-type(2) .trial-option-grid label:nth-child(12)", en: " Small-Group Lesson" },
];

const languageAttributeTargets = [
  { selector: "img[src='assets/bballet-logo.png']", attribute: "alt", en: "B-BALLET" },
  { selector: "img[src='assets/brand-statement-detail.jpg']", attribute: "alt", en: "B-BALLET barre and movement" },
  { selector: "img[src='assets/director-kwon-bobin.jpg']", attribute: "alt", en: "Director Kwon Bobin" },
  { selector: "img[src='assets/gallery-kids-barre-guidance.jpg']", attribute: "alt", en: "Children's barre instruction at B-BALLET" },
  { selector: "img[src='assets/philosophy-reference.png']", attribute: "alt", en: "Young ballet student practicing pointe at B-BALLET" },
  { selector: "img[src='assets/brand-studio-empty.jpg']", attribute: "alt", en: "Sunlit B-BALLET studio" },
  { selector: "img[src='assets/brand-hero-performance-wide.jpg']", attribute: "alt", en: "B-BALLET stage performance" },
  { selector: "img[src='assets/brand-gallery-kids.jpg']", attribute: "alt", en: "Children's ballet class at B-BALLET" },
  { selector: "img[src='assets/gallery-adult-barre-class.jpg']", attribute: "alt", en: "Adult ballet barre class at B-BALLET" },
  { selector: "img[src='assets/brand-gallery-pointe-detail.jpg']", attribute: "alt", en: "Pointe shoes and studio detail at B-BALLET" },
  { selector: "img[src='assets/gallery-line-detail.jpg']", attribute: "alt", en: "Burgundy leotard and ballet line detail" },
  { selector: "img[src='assets/gallery-mirror-class-wide.jpg']", attribute: "alt", en: "Group ballet class in front of the mirror" },
  { selector: "img[src='assets/gallery-adult-ensemble-soft.jpg']", attribute: "alt", en: "Adult ballet ensemble pose" },
  { selector: "img[src='assets/gallery-large-barre-class.jpg']", attribute: "alt", en: "Large ballet barre class" },
  { selector: "img[src='assets/brand-gallery-performance-pink.jpg']", attribute: "alt", en: "Stage performance in pink costumes" },
  { selector: "img[src='assets/gallery-mat-class.jpg']", attribute: "alt", en: "Ballet mat stretching class" },
  { selector: "img[src='assets/gallery-performance-group.jpg']", attribute: "alt", en: "B-BALLET group performance" },
  { selector: "img[src='assets/gallery-kids-christmas-mirror.jpg']", attribute: "alt", en: "Children's Christmas ballet class" },
  { selector: "img[src='assets/gallery-kids-barre-guidance.jpg']", attribute: "alt", en: "Children's ballet barre instruction" },
  { selector: "img[src='assets/gallery-detail-pointe-close.jpg']", attribute: "alt", en: "Pointe shoe detail" },
  { selector: "img[src='assets/gallery-detail-barre-dress.jpg']", attribute: "alt", en: "Ballet barre and costume detail" },
  { selector: "img[src='assets/program-adult-stretch-band.jpg']", attribute: "alt", en: "Adult stretching-band class" },
  { selector: "input[name='time']", attribute: "placeholder", en: "e.g. weekday evening / Saturday morning" },
  { selector: "textarea[name='memo']", attribute: "placeholder", en: "Write any questions or details you would like to discuss." },
  { selector: ".menu-toggle", attribute: "aria-label", en: "Open menu" },
  { selector: ".level-flow", attribute: "aria-label", en: "Adult ballet level guide" },
  { selector: ".teacher-branch:nth-of-type(1)", attribute: "aria-label", en: "Seongnam team" },
  { selector: ".teacher-branch:nth-of-type(2)", attribute: "aria-label", en: "Songpa faculty" },
  { selector: ".gallery-control.prev", attribute: "aria-label", en: "Previous photo" },
  { selector: ".gallery-control.next", attribute: "aria-label", en: "Next photo" },
  { selector: ".registration-guide", attribute: "aria-label", en: "Trial class consultation guide" },
  { selector: ".faq", attribute: "aria-label", en: "Frequently asked questions" },
  { selector: ".trial-nav", attribute: "aria-label", en: "Trial class consultation" },
  { selector: ".trial-form-section", attribute: "aria-label", en: "Trial class consultation form" },
  { selector: ".mobile-quick-actions", attribute: "aria-label", en: "Quick mobile actions" },
  { selector: ".scroll-assist", attribute: "aria-label", en: "Page navigation" },
  { selector: "[data-scroll-assist='-1']", attribute: "aria-label", en: "Scroll up" },
  { selector: "[data-scroll-assist='1']", attribute: "aria-label", en: "Scroll down" },
  { selector: ".contact-branch-card:nth-child(1) .contact-details > div:nth-child(4) a", attribute: "href", en: "https://www.google.com/maps/search/?api=1&query=B-BALLET%20Academy%20Seongnam" },
  { selector: ".contact-branch-card:nth-child(2) .contact-details > div:nth-child(4) a", attribute: "href", en: "https://www.google.com/maps/search/?api=1&query=B-BALLET%20Academy%20Songpa" },
];

const getAttributeCacheKey = (attribute) => `koAttr${attribute.replace(/[^a-z0-9]/gi, "")}`;

const cacheOriginalContent = () => {
  languageTargets.forEach(({ selector }) => {
    document.querySelectorAll(selector).forEach((element) => {
      if (!element.dataset.koHtml) {
        element.dataset.koHtml = element.innerHTML;
      }
    });
  });

  languageTextTargets.forEach(({ selector }) => {
    document.querySelectorAll(selector).forEach((element) => {
      const textNode = Array.from(element.childNodes).find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
      if (textNode && !element.dataset.koText) {
        element.dataset.koText = textNode.textContent;
      }
    });
  });

  languageAttributeTargets.forEach(({ selector, attribute }) => {
    document.querySelectorAll(selector).forEach((element) => {
      const key = getAttributeCacheKey(attribute);
      if (!element.dataset[key]) {
        element.dataset[key] = element.getAttribute(attribute) || "";
      }
    });
  });
};

const setLanguage = (language) => {
  cacheOriginalContent();
  const nextLanguage = language === "en" ? "en" : "ko";

  languageTargets.forEach(({ selector, en }) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.innerHTML = nextLanguage === "en" ? en : element.dataset.koHtml;
    });
  });

  languageTextTargets.forEach(({ selector, en }) => {
    document.querySelectorAll(selector).forEach((element) => {
      const textNode = Array.from(element.childNodes).find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
      if (textNode) {
        textNode.textContent = nextLanguage === "en" ? en : element.dataset.koText;
      }
    });
  });

  languageAttributeTargets.forEach(({ selector, attribute, en }) => {
    document.querySelectorAll(selector).forEach((element) => {
      const key = getAttributeCacheKey(attribute);
      element.setAttribute(attribute, nextLanguage === "en" ? en : element.dataset[key]);
    });
  });

  document.documentElement.lang = nextLanguage;
  languageButtons.forEach((button) => {
    const isActive = button.dataset.langChoice === nextLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  try {
    window.localStorage.setItem("bballet-language", nextLanguage);
  } catch {
    // Private browsing can disable localStorage.
  }
};

if (languageButtons.length > 0) {
  cacheOriginalContent();

  let savedLanguage = "ko";
  try {
    savedLanguage = window.localStorage.getItem("bballet-language") || "ko";
  } catch {
    savedLanguage = "ko";
  }

  setLanguage(savedLanguage);

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.langChoice);
    });
  });
}

if (trialForm) {
  const result = document.querySelector("[data-trial-result]");
  const messageBox = document.querySelector("[data-trial-message]");
  const resultTitle = document.querySelector("[data-trial-result-title]");
  const copyNote = document.querySelector("[data-trial-copy-note]");
  const copyButton = document.querySelector("[data-copy-trial-message]");
  const kakaoLink = document.querySelector("[data-trial-kakao]");
  const emailLink = document.querySelector("[data-trial-email]");

  const copyMessage = async (message) => {
    if (!navigator.clipboard?.writeText) {
      return false;
    }

    try {
      await navigator.clipboard.writeText(message);
      return true;
    } catch {
      return false;
    }
  };

  const buildTrialMessage = (formData) => {
    const isEnglish = document.documentElement.lang === "en";
    const value = (name, fallback = isEnglish ? "Not specified" : "미정") => {
      const item = String(formData.get(name) || "").trim();
      return item || fallback;
    };

    if (isEnglish) {
      const branchNames = { 성남점: "Seongnam Studio", 송파점: "Songpa Studio" };
      const programNames = {
        유아: "Kids Ballet",
        초등: "Junior Ballet",
        "전공/입시": "Pre-Professional",
        "성인 기초반": "Adult Beginner",
        "성인 0.5반": "Adult Level 0.5",
        "성인 레벨 1": "Adult Level 1",
        "센터 집중반": "Center Focus",
        "성인 레벨 2": "Adult Level 2",
        토슈즈: "Pointe",
        작품반: "Repertoire",
        개인레슨: "Private Lesson",
        "소그룹 레슨": "Small-Group Lesson",
      };
      const experienceNames = {
        처음입니다: "This is my first time",
        "조금 배워봤습니다": "I have some basic experience",
        "1년 이상 경험이 있습니다": "I have more than 1 year of experience",
        "전공/입시 경험이 있습니다": "I have pre-professional experience",
      };

      return [
        "B-BALLET Trial Class Inquiry",
        "",
        `Name: ${value("name")}`,
        `Phone: ${value("phone")}`,
        `Preferred studio: ${branchNames[value("branch")] || value("branch")}`,
        `Preferred class: ${programNames[value("program")] || value("program")}`,
        `Preferred day/time: ${value("time")}`,
        `Ballet experience: ${experienceNames[value("experience")] || value("experience")}`,
        `Message: ${value("memo", "None")}`,
      ].join("\n");
    }

    return [
      "비발레 체험수업 상담 신청",
      "",
      `이름: ${value("name")}`,
      `연락처: ${value("phone")}`,
      `희망 지점: ${value("branch")}`,
      `희망 수업: ${value("program")}`,
      `희망 요일/시간: ${value("time")}`,
      `발레 경험: ${value("experience")}`,
      `문의 내용: ${value("memo", "없음")}`,
    ].join("\n");
  };

  trialForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!trialForm.reportValidity()) {
      return;
    }

    const formData = new FormData(trialForm);
    const branchKey = getBranchKey(formData.get("branch"));
    const kakaoUrl = kakaoChannels[branchKey];
    const message = buildTrialMessage(formData);
    const copied = await copyMessage(message);

    if (messageBox) {
      messageBox.value = message;
    }

    if (resultTitle) {
      resultTitle.textContent = copied ? "상담 내용이 복사되었습니다." : "상담 내용이 정리되었습니다.";
    }

    if (copyNote) {
      copyNote.textContent = copied
        ? "열린 카카오 채널 채팅창에 붙여넣어 전송해 주세요."
        : "아래 내용을 복사해 카카오 채널 채팅창에 붙여넣어 전송해 주세요.";
    }

    if (kakaoLink) {
      kakaoLink.href = kakaoUrl;
    }

    if (emailLink) {
      const subject = document.documentElement.lang === "en" ? "B-BALLET Trial Class Inquiry" : "B-BALLET 체험수업 문의";
      emailLink.href = `mailto:b-ballet@naver.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    }

    if (document.documentElement.lang === "en") {
      if (resultTitle) {
        resultTitle.textContent = copied ? "Your consultation message has been copied." : "Your consultation message is ready.";
      }

      if (copyNote) {
        copyNote.textContent = copied
          ? "Choose Email or Kakao Channel below to send your inquiry."
          : "Review the message below, then choose Email or Kakao Channel to send it.";
      }

      if (copyButton) {
        copyButton.textContent = copied ? "Copied" : "Copy Again";
      }
    }

    if (result) {
      result.hidden = false;
      result.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (document.documentElement.lang !== "en") {
      window.open(kakaoUrl, "_blank", "noopener");
    }
  });

  copyButton?.addEventListener("click", async () => {
    const message = messageBox?.value || "";
    const copied = await copyMessage(message);

    if (copyNote) {
      copyNote.textContent = copied
        ? "상담 내용이 다시 복사되었습니다."
        : "복사가 자동으로 되지 않으면 내용을 직접 선택해서 복사해 주세요.";
    }
  });
  copyButton?.addEventListener("click", () => {
    if (document.documentElement.lang !== "en" || !copyNote) {
      return;
    }

    window.setTimeout(() => {
      copyNote.textContent = "If automatic copy is unavailable, select and copy the message manually.";
    }, 0);
  });
}

if (hero && heroChoices.length > 0) {
  heroChoices.forEach((button) => {
    button.addEventListener("click", () => {
      const nextHero = button.dataset.heroChoice;
      hero.dataset.hero = nextHero;
      heroChoices.forEach((choice) => {
        choice.classList.toggle("is-active", choice === button);
      });
    });
  });
}

if (hero && heroChoices.length === 0 && !hero.hasAttribute("data-hero-static") && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const heroSequence = ["experience", "guidance", "stage"];
  let heroIndex = Math.max(0, heroSequence.indexOf(hero.dataset.hero));

  window.setInterval(() => {
    hero.classList.add("is-switching");

    window.setTimeout(() => {
      heroIndex = (heroIndex + 1) % heroSequence.length;
      hero.dataset.hero = heroSequence[heroIndex];
      hero.classList.remove("is-switching");
    }, 550);
  }, 6200);
}

galleryControls.forEach((button) => {
  button.addEventListener("click", () => {
    const gallery = button.closest("[data-gallery]");
    const track = gallery?.querySelector(".gallery-track");

    if (!track) {
      return;
    }

    const direction = Number(button.dataset.galleryControl) || 1;
    const firstItem = track.querySelector(".gallery-item");
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const distance = firstItem ? firstItem.getBoundingClientRect().width + gap : track.clientWidth * 0.84;

    track.scrollBy({ left: direction * distance, behavior: "smooth" });
  });
});

if (contactForm) {
  const note = contactForm.querySelector("[data-form-note]");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    const formData = new FormData(contactForm);
    const branchKey = getBranchKey(formData.get("branch"));
    const phone = branchPhones[branchKey] || branchPhones.seongnam;
    const message = [
      "비발레 상담 신청",
      `이름: ${formData.get("name")}`,
      `연락처: ${formData.get("phone")}`,
      `희망 지점: ${formData.get("branch")}`,
      `관심 프로그램: ${formData.get("program")}`,
    ].join("\n");

    if (note) {
      note.textContent = `문자 상담으로 연결합니다. 문자 앱이 열리지 않으면 ${phone}로 연락해 주세요.`;
      note.classList.add("is-ready");
    }

    window.location.href = `sms:${phone}?body=${encodeURIComponent(message)}`;
  });
}
