/* ======================================================
   1️⃣ منطق تسجيل الدخول
====================================================== */
function handleLogin(event) {
  event.preventDefault();
  const btn = event.target.querySelector("button");
  const originalText = btn.innerText;

  btn.innerText = "جاري التحقق...";
  btn.disabled = true;

  setTimeout(() => {
    window.location.href = "studentDB.html";
    btn.innerText = originalText;
    btn.disabled = false;
  }, 1000);
}

/* ======================================================
   2️⃣ التحقق من صفحة الداشبورد
====================================================== */
function isDashboardPage() {
  return document.getElementById("lessons-container") !== null;
}

/* ======================================================
   3️⃣ بيانات الدروس
====================================================== */
const lessons = [
  { id: 1, title: "المحاضرة 1: مقدمة في التصنيف", status: "completed" },
  { id: 2, title: "المحاضرة 2: المملكة الأولية", status: "locked" },
  { id: 3, title: "المحاضرة 3: مملكة اللافقاريات", status: "locked" },
  { id: 4, title: "المحاضرة 4: طائفة الحلقيات", status: "locked" },
];

/* ======================================================
   4️⃣ رسم الدروس
====================================================== */
function renderLessons() {
  const container = document.getElementById("lessons-container");
  if (!container) return;

  container.innerHTML = "";

  lessons.forEach((lesson) => {
    const div = document.createElement("div");
    div.className = `lesson-item ${lesson.status}`;

    const icon =
      lesson.status === "completed"
        ? "fa-check-circle completed"
        : "fa-lock locked";

    div.innerHTML = `
            <div class="lesson-info">
                <i class="fas ${icon} status-icon"></i>
                <span>${lesson.title}</span>
            </div>
            <div>
                ${
                  lesson.status === "locked"
                    ? '<span style="color:#e74c3c;font-size:0.8rem">مغلق</span>'
                    : '<span style="color:#27ae60;font-size:0.8rem">تمت المشاهدة</span>'
                }
            </div>
        `;

    if (lesson.status === "completed") {
      div.onclick = () => toggleAttachments(lesson.id);
    }

    container.appendChild(div);

    if (lesson.id === 1 && lesson.status === "completed") {
      const att = document.createElement("div");
      att.id = "att-1";
      att.className = "attachments show";
      att.innerHTML = `
                <h4 style="margin-bottom:10px;color:var(--secondary-color)">ملحقات الدرس</h4>
                <div class="attachment-item">📄 ملخص المحاضرة</div>
                <div class="attachment-item">🖼 صور تشريحية</div>
                <div class="attachment-item">📝 واجب الدرس</div>
            `;
      container.appendChild(att);
    }
  });
}

function toggleAttachments(id) {
  const el = document.getElementById(`att-${id}`);
  if (el) el.classList.toggle("show");
}

/* ======================================================
   5️⃣ سلايدر الكورسات (مضمون وبسيط)
====================================================== */
function initCarousel() {
  const track = document.getElementById("carouselTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const viewport = document.querySelector(".carousel-viewport");

  if (!track || !prevBtn || !nextBtn || !viewport) return;

  const cardWidth = 270;
  let index = 0;
  let autoPlay;
  const total = track.children.length;

  function visibleCount() {
    return Math.max(1, Math.floor(viewport.offsetWidth / cardWidth));
  }

  function update() {
    const max = total - visibleCount();
    index = Math.max(0, Math.min(index, max));
    track.style.transform = `translateX(${index * cardWidth}px)`;
  }

  nextBtn.onclick = () => {
    index++;
    update();
  };

  prevBtn.onclick = () => {
    index--;
    update();
  };

  function startAuto() {
    stopAuto();
    autoPlay = setInterval(() => {
      index++;
      if (index > total - visibleCount()) index = 0;
      update();
    }, 3000);
  }

  function stopAuto() {
    if (autoPlay) clearInterval(autoPlay);
  }

  viewport.addEventListener("mouseenter", stopAuto);
  viewport.addEventListener("mouseleave", startAuto);
  window.addEventListener("resize", update);

  update();
  startAuto();
}

/* ======================================================
   6️⃣ Scroll Reveal Animation
====================================================== */
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.1 },
  );

  document
    .querySelectorAll(
      ".pricing-card, .hero-text, .hero-image, .login-container, .curriculum-card, .course-card, .section-title, h2, .btn",
    )
    .forEach((el) => {
      el.classList.add("reveal");
      observer.observe(el);
    });
}

/* ======================================================
   7️⃣ تشغيل كل حاجة
====================================================== */
document.addEventListener("DOMContentLoaded", () => {
  if (isDashboardPage()) {
    renderLessons();
    initCarousel();
  }

  initScrollReveal();
});
