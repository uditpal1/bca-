/* =============================================
   BCA Notes Platform - Main App JavaScript
   ============================================= */

const CONFIG = {

  semesters: 6,

  semesterSubjects: {

    1: [
      'Fundamentals Of Computers',
      'Mathematics For Computing',
      'Programming With C',
      'Digital Logic',
      'C Programming Laboratory',
      'Office Tools Laboratory',
      'General English',
      'Programming Fundamentals'
    ],

    2: [
      'Multimedia Tools',
      'Object Oriented Programming with C++',
      'Data Structure And Algorithms',
      'System Analysis and Design',
      'C++ Laboratory',
      'DSA Laboratory',
      'General Hindi',
      'Hardware and Networking'
    ],

    3: [
      'Database Management System',
      'Computer Networks',
      'Introduction to JAVA Programming',
      'Computer Graphics',
      'DBMS Laboratory',
      'Java Laboratory'
    ],

    4: [
      'Introduction to Internet Technology',
      'Operating System',
      'Introduction to Python Programming',
      'Client Server Computing',
      'Python Programming Laboratory',
      'Internet Technology Laboratory'
    ],

    5: [
      'Artificial Intelligence and Machine Learning',
      'Design and Analysis of Algorithms',
      'Computer System Architecture',
      'Compiler Design',
      'Software Engineering',
      'Linux Operating System',
      'Mobile Application Development',
      'R Programming',
      'Mobile App Development Laboratory',
      'R Programming Laboratory',
      'Seminar'
    ],

    6: [
      'Data Science',
      'Computer Oriented Statistical Techniques',
      'Web Programming Using C#',
      'VB.NET',
      'Cyber Security',
      'Principles of Management',
      'Cloud Computing',
      'Introduction to IoT',
      'Web Programming Laboratory',
      'VB.NET Laboratory',
      'Minor Project'
    ]

  },

  semLabels: ['I','II','III','IV','V','VI'],

  semEmojis: ['💻','🖥️','🌐','⚙️','🤖','☁️'],

  units: 5

};

// ---- Utilities ----

function qs(sel, ctx = document) {

  return ctx.querySelector(sel);

}

function getParam(key) {

  return (
    new URLSearchParams(window.location.search)
      .get(key) || ''
  );

}

function slugify(str) {

  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

}

function showToast(msg, duration = 3000) {

  let el = qs('.toast');

  if (!el) {

    el = document.createElement('div');

    el.className = 'toast';

    document.body.appendChild(el);

  }

  el.textContent = msg;

  el.classList.add('show');

  clearTimeout(el._t);

  el._t = setTimeout(() => {

    el.classList.remove('show');

  }, duration);

}

// ---- Background ----

function initBg() {

  if (!qs('.bg-mesh')) {

    const bg = document.createElement('div');

    bg.className = 'bg-mesh';

    document.body.prepend(bg);

  }

  ['blob-1','blob-2','blob-3'].forEach(cls => {

    if (!qs('.' + cls)) {

      const b = document.createElement('div');

      b.className = `blob ${cls}`;

      document.body.prepend(b);

    }

  });

}

// ---- Search ----

function initSearch() {

  const input   = qs('#nav-search-input');

  const results = qs('#search-results');

  if (!input || !results) return;

  const all = [];

  for (let s = 1; s <= CONFIG.semesters; s++) {

    CONFIG.semesterSubjects[s].forEach(sub => {

      for (let u = 1; u <= CONFIG.units; u++) {

        all.push({

          label: `${sub} Unit ${u}`,

          sub: `Semester ${s}`,

          url: `notes.html?sem=${s}&subject=${encodeURIComponent(sub)}&note=unit${u}`,

          icon: '📘'

        });

      }

    });

  }

  input.addEventListener('input', () => {

    const q = input.value.trim().toLowerCase();

    if (!q) {

      results.style.display = 'none';

      return;

    }

    const hits = all.filter(i =>

      i.label.toLowerCase().includes(q) ||

      i.sub.toLowerCase().includes(q)

    ).slice(0, 10);

    if (!hits.length) {

      results.style.display = 'none';

      return;

    }

    results.innerHTML = hits.map(h => `

      <a href="${h.url}" class="search-result-item">

        <div class="search-result-icon">
          ${h.icon}
        </div>

        <div>

          <div style="
            font-weight:600;
            color:var(--gray-800);
            font-size:13px
          ">
            ${h.label}
          </div>

          <div style="
            font-size:11px;
            color:var(--gray-400)
          ">
            ${h.sub}
          </div>

        </div>

      </a>

    `).join('');

    results.style.display = 'block';

  });

  document.addEventListener('click', e => {

    if (
      !input.contains(e.target) &&
      !results.contains(e.target)
    ) {

      results.style.display = 'none';

    }

  });

}

// ---- Semester Grid ----

function renderSemGrid(container) {

  if (!container) return;

  container.innerHTML = '';

  for (let i = 1; i <= CONFIG.semesters; i++) {

    const card = document.createElement('a');

    card.href = `semester.html?sem=${i}`;

    card.className = 'sem-card glass-card';

    card.innerHTML = `

      <div class="sem-card-icon">
        ${CONFIG.semEmojis[i - 1]}
      </div>

      <div class="sem-card-title">
        Semester ${CONFIG.semLabels[i - 1]}
      </div>

      <div class="sem-card-sub">
        ${CONFIG.semesterSubjects[i].length} Subjects
      </div>

    `;

    container.appendChild(card);

  }

}

// ---- Subject Grid ----

function renderSubjectGrid(container, sem) {

  if (!container) return;

  container.innerHTML = '';

  CONFIG.semesterSubjects[sem].forEach(sub => {

    const card = document.createElement('a');

    card.href =
      `subject.html?sem=${sem}&subject=${encodeURIComponent(sub)}`;

    card.className = 'subject-card glass-card';

    card.innerHTML = `

      <div class="subject-icon bg-physics">
        💻
      </div>

      <div class="subject-name">
        ${sub}
      </div>

      <div class="subject-meta">
        5 Units • Sem ${CONFIG.semLabels[sem - 1]}
      </div>

      <div class="subject-arrow">
        ›
      </div>

    `;

    container.appendChild(card);

  });

}

// ---- Unit List ----

function renderUnitList(container, sem, subject) {

  if (!container) return;

  container.innerHTML = '';

  const list = document.createElement('div');

  list.className = 'unit-list';

  for (let u = 1; u <= CONFIG.units; u++) {

    const item = document.createElement('a');

    item.href =
      `notes.html?sem=${sem}&subject=${encodeURIComponent(subject)}&note=unit${u}`;

    item.className = 'unit-item';

    item.innerHTML = `

      <div class="unit-num">
        ${u}
      </div>

      <div class="unit-info">

        <div class="unit-title">
          Unit ${u}
        </div>

        <div class="unit-desc">
          ${subject} • Semester ${sem}
        </div>

      </div>

      <div class="unit-badge">
        Read →
      </div>

    `;

    list.appendChild(item);

  }

  container.appendChild(list);

}

// ---- Breadcrumb ----

function renderBreadcrumb(container, parts) {

  if (!container) return;

  container.innerHTML = parts.map((p, i) =>

    i < parts.length - 1

      ? `
        <a href="${p.url}">
          ${p.label}
        </a>
        <span>›</span>
      `

      : `
        <span class="current">
          ${p.label}
        </span>
      `

  ).join('');

}

// ---- Init ----

document.addEventListener('DOMContentLoaded', () => {

  initBg();

  initSearch();

  const page = document.body.dataset.page;

  // HOME

  if (page === 'home') {

    renderSemGrid(qs('#sem-grid'));

  }

  // SEMESTER

  if (page === 'semester') {

    const sem =
      parseInt(getParam('sem')) || 1;

    renderSubjectGrid(
      qs('#subject-grid'),
      sem
    );

    renderSemGrid(qs('#sem-grid'));

    renderBreadcrumb(
      qs('#breadcrumb'),
      [
        {
          label: 'Home',
          url: 'index.html'
        },
        {
          label: `Semester ${CONFIG.semLabels[sem - 1]}`,
          url: '#'
        }
      ]
    );

    const title = qs('.page-title');

    if (title) {

      title.textContent =
        `Semester ${CONFIG.semLabels[sem - 1]}`;

    }

    document.title =
      `Semester ${sem} | BCANotes`;

  }

  // SUBJECT

  if (page === 'subject') {

    const sem =
      parseInt(getParam('sem')) || 1;

    const subject =
      getParam('subject') ||
      'Programming With C';

    renderUnitList(
      qs('#unit-list'),
      sem,
      subject
    );

    renderBreadcrumb(
      qs('#breadcrumb'),
      [
        {
          label: 'Home',
          url: 'index.html'
        },
        {
          label: `Semester ${CONFIG.semLabels[sem - 1]}`,
          url: `semester.html?sem=${sem}`
        },
        {
          label: subject,
          url: '#'
        }
      ]
    );

    const title = qs('.page-title');

    if (title) {

      title.innerHTML =
        `💻 ${subject}`;

    }

    const subtitle =
      qs('.page-subtitle');

    if (subtitle) {

      subtitle.textContent =
        `Semester ${CONFIG.semLabels[sem - 1]} • 5 Units`;

    }

    document.title =
      `${subject} | Sem ${sem} | BCANotes`;

  }

});
/* =========================================
   RESUME BUILDER POPUP
========================================= */

document.addEventListener("DOMContentLoaded", function () {

  const popup =
    document.getElementById("resume-popup");

  const closeBtn =
    document.getElementById("resume-popup-close");

  const laterBtn =
    document.getElementById("resume-popup-later");


  // Safety check
  if (!popup) return;


  /* -----------------------------------------
     SHOW POPUP
     
     Popup 2 seconds after page loads
  ----------------------------------------- */

  setTimeout(function () {

    popup.classList.add("show");

  }, 2000);


  /* -----------------------------------------
     CLOSE BUTTON
  ----------------------------------------- */

  closeBtn.addEventListener("click", function () {

    popup.classList.remove("show");

  });


  /* -----------------------------------------
     MAYBE LATER
  ----------------------------------------- */

  laterBtn.addEventListener("click", function () {

    popup.classList.remove("show");

  });


  /* -----------------------------------------
     CLICK OUTSIDE POPUP
  ----------------------------------------- */

  popup.addEventListener("click", function (event) {

    if (event.target === popup) {

      popup.classList.remove("show");

    }

  });

});
