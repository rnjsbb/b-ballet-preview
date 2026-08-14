const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const languageButtons = document.querySelectorAll("[data-lang-choice]");
const trialForm = document.querySelector("[data-trial-form]");
const programCards = document.querySelectorAll("[data-program]");
const programDetail = document.querySelector("[data-program-detail]");
let activeProgramKey = null;

const programDetails = {
  kids: {
    number: "PROGRAM 01", image: "assets/brand-kids-class.jpg", contain: false,
    ko: { title: "유아발레", alt: "비발레 유아발레 수업", lead: "발레를 처음 만나는 아이가 놀이와 음악 속에서 몸의 감각을 자연스럽게 발견하는 과정입니다.", audience: "발레를 처음 접하는 유아", focus: ["기초 자세와 바른 수업 태도", "리듬과 음악에 반응하는 움직임", "균형감각과 신체 인지 발달"] },
    en: { title: "Kids Ballet", alt: "Kids ballet class at B-BALLET", lead: "A joyful first encounter with ballet, helping young children discover body awareness through music and movement.", audience: "Young children beginning ballet", focus: ["Foundational posture and classroom habits", "Movement in response to rhythm and music", "Balance and body awareness"] },
  },
  junior: {
    number: "PROGRAM 02", image: "assets/seongnam-junior-training.jpg", contain: false,
    ko: { title: "초등발레", alt: "비발레 초등발레 수업", lead: "성장기 몸의 특성을 고려하며 발레의 기본기와 올바른 정렬을 차근차근 쌓아갑니다.", audience: "초등학생 · 단계별 수업", focus: ["성장기 몸에 맞는 정렬과 중심", "바와 센터의 기본 테크닉", "집중력과 음악성 향상"] },
    en: { title: "Junior Ballet", alt: "Junior ballet training at B-BALLET", lead: "Step-by-step training in ballet fundamentals and alignment, designed with growing bodies in mind.", audience: "Elementary students · Classes by level", focus: ["Alignment and balance for growing bodies", "Fundamentals at the barre and center", "Focus and musicality"] },
  },
  preprofessional: {
    number: "PROGRAM 03", image: "assets/gallery-solo-window-arabesque.jpg", contain: true,
    ko: { title: "전공·입시", alt: "비발레 전공 입시 발레 에튀튜드", lead: "전공과 입시 목표에 맞춰 기본기, 작품, 표현력과 무대 감각을 체계적으로 지도합니다.", audience: "발레 전공 준비 · 예중·예고·대학 입시", focus: ["개인별 기초 테크닉 점검", "작품과 표현력 지도", "입시·콩쿠르·무대 준비"] },
    en: { title: "Pre-Professional", alt: "Pre-professional ballet étude at B-BALLET", lead: "Structured coaching in technique, repertoire, expression, and stage presence for each student's professional goals.", audience: "Pre-professional and audition preparation", focus: ["Individual technique assessment", "Repertoire and artistic expression", "Audition, competition, and stage preparation"] },
  },
  adult: {
    number: "PROGRAM 04", image: "assets/brand-gallery-adult-class.jpg", contain: false,
    ko: { title: "성인발레", alt: "비발레 성인발레 수업", lead: "처음 시작하는 입문자부터 단계별 수강생까지, 자신의 몸을 이해하며 오래 즐길 수 있도록 지도합니다.", audience: "성인 입문 · 기초 · 단계별 레벨", focus: ["기초 정렬과 바 워크", "유연성·근력·중심의 균형", "음악과 함께하는 움직임"] },
    en: { title: "Adult Ballet", alt: "Adult ballet class at B-BALLET", lead: "From complete beginners to continuing students, classes build understanding of the body and a lasting enjoyment of ballet.", audience: "Adult beginner · Foundation · Levels", focus: ["Foundational alignment and barre work", "A balance of mobility, strength, and control", "Movement with musicality"] },
  },
  pointe: {
    number: "PROGRAM 05", image: "assets/seongnam-pointe-detail.webp", contain: true,
    ko: { title: "토슈즈", alt: "비발레 토슈즈 수업", lead: "충분한 기초를 바탕으로 발과 발목의 정렬, 중심 이동과 토슈즈에 필요한 힘을 섬세하게 익힙니다.", audience: "기초 테크닉을 갖춘 수강생 · 상담 후 참여", focus: ["발과 발목의 안전한 정렬", "토슈즈를 위한 근력과 중심", "단계적인 동작 연결"] },
    en: { title: "Pointe", alt: "Pointe training at B-BALLET", lead: "Careful training in foot and ankle alignment, weight transfer, and the strength required for pointe work.", audience: "Students with sufficient foundation · Consultation required", focus: ["Safe foot and ankle alignment", "Strength and balance for pointe", "Progressive movement combinations"] },
  },
  repertoire: {
    number: "PROGRAM 06", image: "assets/brand-gallery-performance-line.jpg", contain: false,
    ko: { title: "작품반", alt: "비발레 작품반 공연", lead: "클래식 발레 작품의 안무를 배우며 음악성, 표현력과 움직임의 완성도를 함께 높입니다.", audience: "작품과 안무를 경험하고 싶은 수강생", focus: ["클래식 작품의 안무 습득", "음악성과 예술적 표현", "그룹 호흡과 무대 구성"] },
    en: { title: "Repertoire", alt: "B-BALLET repertoire performance", lead: "Learn classical choreography while developing musicality, expression, and a more complete quality of movement.", audience: "Students interested in repertoire and choreography", focus: ["Classical choreography", "Musicality and artistic expression", "Ensemble awareness and staging"] },
  },
  private: {
    number: "PROGRAM 07", image: "assets/hero-main-guidance.jpg", contain: false,
    ko: { title: "개인레슨", alt: "비발레 개인레슨 지도", lead: "현재의 몸 상태와 경험, 구체적인 목표를 살펴 개인에게 필요한 내용을 1:1로 집중 지도합니다.", audience: "개인 목표와 세밀한 교정이 필요한 수강생", focus: ["개인별 자세와 움직임 분석", "목표에 맞춘 맞춤 커리큘럼", "집중적인 피드백과 교정"] },
    en: { title: "Private Lessons", alt: "Private ballet instruction at B-BALLET", lead: "Focused one-on-one instruction based on the student's current condition, experience, and individual goals.", audience: "Students seeking individual goals and detailed correction", focus: ["Personal posture and movement assessment", "A curriculum tailored to individual goals", "Focused feedback and correction"] },
  },
  smallgroup: {
    number: "PROGRAM 08", image: "assets/gallery-trio-line.jpg", contain: true,
    ko: { title: "소그룹 레슨", alt: "세 명이 함께하는 비발레 소그룹 레슨", lead: "소수 인원이 함께 배우는 집중도 높은 수업으로, 개인별 피드백과 그룹의 에너지를 함께 경험합니다.", audience: "친구·가족 또는 비슷한 목표의 소수 그룹", focus: ["소수 정원으로 세밀한 지도", "개인별 피드백과 그룹 연습", "목표와 수준에 맞춘 수업 구성"] },
    en: { title: "Small-Group Lessons", alt: "Three students in a B-BALLET small-group lesson", lead: "A focused class for a small number of students, combining individual feedback with the energy of learning together.", audience: "Friends, family, or small groups with similar goals", focus: ["Detailed instruction in a small group", "Individual feedback and group practice", "Training shaped around level and goals"] },
  },
  performance: {
    number: "PROGRAM 09", image: "assets/gallery-performance-group.jpg", contain: false,
    ko: { title: "공연·무대 경험", alt: "비발레 공연 출연진", lead: "수업에서 배운 움직임을 작품과 무대로 확장하며, 준비 과정부터 공연의 순간까지 함께 완성합니다.", audience: "작품과 실제 무대 경험을 원하는 수강생", focus: ["작품 연습과 리허설", "무대 동선과 그룹 호흡", "표현력과 공연 경험"] },
    en: { title: "Performance & Stage", alt: "B-BALLET performance and stage experience", lead: "Extend classroom learning into repertoire and performance, from the preparation process through the moment on stage.", audience: "Students interested in repertoire and stage experience", focus: ["Repertoire practice and rehearsal", "Stage patterns and ensemble awareness", "Expression and performance experience"] },
  },
};

const renderProgramDetail = () => {
  if (!programDetail || !activeProgramKey) return;
  const program = programDetails[activeProgramKey];
  const language = document.documentElement.lang === "en" ? "en" : "ko";
  const content = program[language];
  programDetail.querySelector("[data-program-number]").textContent = program.number;
  programDetail.querySelector("[data-program-title]").textContent = content.title;
  programDetail.querySelector("[data-program-lead]").textContent = content.lead;
  programDetail.querySelector("[data-program-audience-label]").textContent = language === "en" ? "For" : "추천 대상";
  programDetail.querySelector("[data-program-audience]").textContent = content.audience;
  programDetail.querySelector("[data-program-focus-title]").textContent = language === "en" ? "Training Focus" : "주요 교육 내용";
  const image = programDetail.querySelector("[data-program-image]");
  image.src = program.image;
  image.alt = content.alt;
  const focusList = programDetail.querySelector("[data-program-focus]");
  focusList.replaceChildren(...content.focus.map((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    return li;
  }));
  programDetail.classList.toggle("is-contain", program.contain);
  const closeButton = programDetail.querySelector("[data-program-close]");
  closeButton.setAttribute("aria-label", language === "en" ? "Close program details" : "프로그램 상세 내용 닫기");
};

if (header) {
  const syncHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 16);
  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? (document.documentElement.lang === "en" ? "Close menu" : "메뉴 닫기") : (document.documentElement.lang === "en" ? "Open menu" : "메뉴 열기"));
  });

  nav.addEventListener("click", (event) => {
    if (!event.target.closest("a")) return;
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
}

const translatable = document.querySelectorAll("[data-en]");
const placeholderTargets = document.querySelectorAll("[data-en-placeholder]");

translatable.forEach((element) => {
  element.dataset.ko = element.innerHTML;
});

placeholderTargets.forEach((element) => {
  element.dataset.koPlaceholder = element.getAttribute("placeholder") || "";
});

const setLanguage = (language) => {
  const nextLanguage = language === "en" ? "en" : "ko";
  document.documentElement.lang = nextLanguage;

  translatable.forEach((element) => {
    element.innerHTML = nextLanguage === "en" ? element.dataset.en : element.dataset.ko;
  });

  placeholderTargets.forEach((element) => {
    element.setAttribute("placeholder", nextLanguage === "en" ? element.dataset.enPlaceholder : element.dataset.koPlaceholder);
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.langChoice === nextLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (menuToggle) {
    const isOpen = nav?.classList.contains("is-open");
    menuToggle.setAttribute("aria-label", isOpen ? (nextLanguage === "en" ? "Close menu" : "메뉴 닫기") : (nextLanguage === "en" ? "Open menu" : "메뉴 열기"));
  }

  document.title = nextLanguage === "en" ? "B-BALLET | Seongnam & Songpa" : (trialForm ? "B-BALLET | 체험수업 상담 신청" : "B-BALLET | 비발레");

  renderProgramDetail();

  try { window.localStorage.setItem("bballet-language", nextLanguage); } catch {}
};

if (languageButtons.length) {
  let savedLanguage = "ko";
  try { savedLanguage = window.localStorage.getItem("bballet-language") || "ko"; } catch {}
  setLanguage(savedLanguage);
  languageButtons.forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.langChoice)));
}

if (programCards.length && programDetail) {
  const openProgram = (card) => {
    activeProgramKey = card.dataset.program;
    programCards.forEach((item) => {
      const isActive = item === card;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-expanded", String(isActive));
    });
    renderProgramDetail();
    programDetail.hidden = false;
    window.requestAnimationFrame(() => programDetail.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  programCards.forEach((card) => {
    card.addEventListener("click", () => openProgram(card));
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openProgram(card);
    });
  });

  programDetail.querySelector("[data-program-close]")?.addEventListener("click", () => {
    const activeCard = document.querySelector(".program-card.is-active");
    programDetail.hidden = true;
    activeProgramKey = null;
    programCards.forEach((card) => {
      card.classList.remove("is-active");
      card.setAttribute("aria-expanded", "false");
    });
    activeCard?.focus();
  });
}

const kakaoChannels = {
  seongnam: "https://pf.kakao.com/_ZPbxmG",
  songpa: "https://pf.kakao.com/_xjiajs",
};

const getBranchKey = (branch) => String(branch || "").includes("송파") ? "songpa" : "seongnam";

if (trialForm) {
  const result = document.querySelector("[data-trial-result]");
  const messageBox = document.querySelector("[data-trial-message]");
  const resultTitle = document.querySelector("[data-trial-result-title]");
  const copyNote = document.querySelector("[data-trial-copy-note]");
  const copyButton = document.querySelector("[data-copy-trial-message]");
  const kakaoLink = document.querySelector("[data-trial-kakao]");
  const emailLink = document.querySelector("[data-trial-email]");

  const copyMessage = async (message) => {
    if (!navigator.clipboard?.writeText) return false;
    try { await navigator.clipboard.writeText(message); return true; } catch { return false; }
  };

  const buildTrialMessage = (formData) => {
    const isEnglish = document.documentElement.lang === "en";
    const value = (name, fallback = isEnglish ? "Not specified" : "미정") => String(formData.get(name) || "").trim() || fallback;

    if (!isEnglish) {
      return [
        "비발레 체험수업 상담 신청", "",
        `이름: ${value("name")}`, `연락처: ${value("phone")}`,
        `희망 지점: ${value("branch")}`, `희망 수업: ${value("program")}`,
        `희망 요일/시간: ${value("time")}`, `발레 경험: ${value("experience")}`,
        `문의 내용: ${value("memo", "없음")}`,
      ].join("\n");
    }

    const branches = { 성남점: "Seongnam Studio", 송파점: "Songpa Studio" };
    const programs = { 유아: "Kids Ballet", 초등: "Junior Ballet", "전공/입시": "Pre-Professional", "성인 기초반": "Adult Beginner", "성인 0.5반": "Adult Level 0.5", "성인 레벨 1": "Adult Level 1", "센터 집중반": "Center Focus", "성인 레벨 2": "Adult Level 2", 토슈즈: "Pointe", 작품반: "Repertoire", 개인레슨: "Private Lesson", "소그룹 레슨": "Small-Group Lesson" };
    const experience = { 처음입니다: "This is my first time", "조금 배워봤습니다": "I have some basic experience", "1년 이상 경험이 있습니다": "I have more than one year of experience", "전공/입시 경험이 있습니다": "I have pre-professional experience" };
    return [
      "B-BALLET Trial Class Inquiry", "",
      `Name: ${value("name")}`, `Phone: ${value("phone")}`,
      `Preferred studio: ${branches[value("branch")] || value("branch")}`,
      `Preferred class: ${programs[value("program")] || value("program")}`,
      `Preferred day/time: ${value("time")}`,
      `Ballet experience: ${experience[value("experience")] || value("experience")}`,
      `Message: ${value("memo", "None")}`,
    ].join("\n");
  };

  trialForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!trialForm.reportValidity()) return;

    const formData = new FormData(trialForm);
    const isEnglish = document.documentElement.lang === "en";
    const message = buildTrialMessage(formData);
    const copied = await copyMessage(message);
    const kakaoUrl = kakaoChannels[getBranchKey(formData.get("branch"))];

    if (messageBox) messageBox.value = message;
    if (kakaoLink) kakaoLink.href = kakaoUrl;
    if (emailLink) emailLink.href = `mailto:b-ballet@naver.com?subject=${encodeURIComponent(isEnglish ? "B-BALLET Trial Class Inquiry" : "B-BALLET 체험수업 문의")}&body=${encodeURIComponent(message)}`;
    if (resultTitle) resultTitle.textContent = isEnglish ? (copied ? "Your message has been copied." : "Your consultation message is ready.") : (copied ? "상담 내용이 복사되었습니다." : "상담 내용이 정리되었습니다.");
    if (copyNote) copyNote.textContent = isEnglish ? (copied ? "Paste it into the Kakao Channel chat, or send it by email." : "Review the message below, then choose Kakao or email.") : (copied ? "열린 카카오 채널 채팅창에 붙여넣어 전송해 주세요." : "아래 내용을 복사해 카카오 채널 채팅창에 붙여넣어 주세요.");
    if (result) { result.hidden = false; result.scrollIntoView({ behavior: "smooth", block: "start" }); }
    if (!isEnglish) window.open(kakaoUrl, "_blank", "noopener");
  });

  copyButton?.addEventListener("click", async () => {
    const copied = await copyMessage(messageBox?.value || "");
    if (copyNote) copyNote.textContent = document.documentElement.lang === "en" ? (copied ? "Copied." : "Please select and copy the message manually.") : (copied ? "상담 내용이 다시 복사되었습니다." : "내용을 직접 선택해 복사해 주세요.");
  });
}
