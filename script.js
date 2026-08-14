const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const languageButtons = document.querySelectorAll("[data-lang-choice]");
const trialForm = document.querySelector("[data-trial-form]");

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

  try { window.localStorage.setItem("bballet-language", nextLanguage); } catch {}
};

if (languageButtons.length) {
  let savedLanguage = "ko";
  try { savedLanguage = window.localStorage.getItem("bballet-language") || "ko"; } catch {}
  setLanguage(savedLanguage);
  languageButtons.forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.langChoice)));
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
