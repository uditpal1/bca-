/* =============================================
   BCANotes — notes.js
   ============================================= */

// ── Supabase ──────────────────────────────────

const SUPABASE_URL =
  'https://bxxessffogadjgtlyhdc.supabase.co';

const SUPABASE_KEY =
  'sb_publishable_JVdXqEEWRniljUZVzaLWRg_jHakF3rZ';

let _sb = null;

function initSupabase() {

  try {

    if (
      window.supabase &&
      SUPABASE_URL !== 'YOUR_SUPABASE_URL'
    ) {

      _sb = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
      );

    }

  } catch(e) {}

}

// ── Helpers ───────────────────────────────────

const $ = (sel, ctx) =>
  (ctx || document).querySelector(sel);

const getP = key =>
  new URLSearchParams(location.search)
    .get(key) || '';

function toast(msg) {

  let el = $('.toast');

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

  }, 3000);

}

// ── Semester Subjects ─────────────────────────

const SEMESTER_SUBJECTS = {

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

};

const SEMS = [
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI'
];

// ── State ─────────────────────────────────────

const S = {

  sem:
    parseInt(getP('sem')) || 1,

  sub:
    decodeURIComponent(
      getP('subject')
    ) || 'Programming With C',

  note:
    getP('note') || 'unit1',

  lang: 'en',

  md: '',

  title: ''

};

// ── Unlock System ─────────────────────────────

const GLOBAL_UNLOCK_KEY =
  'bcanotes_unlocked';

function unlocked() {

  return (
    localStorage.getItem(
      GLOBAL_UNLOCK_KEY
    ) === '1'
  );

}

function setUnlock() {

  localStorage.setItem(
    GLOBAL_UNLOCK_KEY,
    '1'
  );

}

// ── Base Path ─────────────────────────────────

function basePath() {

  const p =
    location.pathname.replace(
      /\/[^/]*$/,
      '/'
    );

  return location.origin + p;

}

// ── Convert subject to folder name ───────────

function slugify(str) {

  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

}

// ── Markdown Render ───────────────────────────

function mdToHTML(src, partial) {

  if (partial) {

    const lines = src.split('\n');

    src = lines.slice(
      0,
      Math.max(
        12,
        Math.floor(lines.length * 0.3)
      )
    ).join('\n');

  }

  if (typeof marked !== 'undefined') {

    try {

      marked.setOptions({
        breaks: true,
        gfm: true
      });

      return marked.parse(src);

    } catch(e) {}

  }

  return `

    <pre style="
      white-space:pre-wrap;
      font-size:14px;
      line-height:1.7;
      font-family:inherit;
      color:inherit
    ">

${src
  .replace(/&/g,'&amp;')
  .replace(/</g,'&lt;')
  .replace(/>/g,'&gt;')}

    </pre>

  `;

}

// ── Enhance HTML ──────────────────────────────

function enhance(wrap) {

  wrap.querySelectorAll('pre')
    .forEach(pre => {

      if (
        pre.querySelector(
          '.copy-code-btn'
        )
      ) return;

      const btn =
        document.createElement('button');

      btn.className =
        'copy-code-btn';

      btn.textContent = 'Copy';

      btn.onclick = () => {

        const code =
          pre.querySelector('code');

        navigator.clipboard
          .writeText(
            (code || pre).textContent
          )
          .then(() => {

            btn.textContent = 'Copied!';

            setTimeout(() => {

              btn.textContent = 'Copy';

            }, 2000);

          });

      };

      pre.style.position = 'relative';

      pre.appendChild(btn);

    });

}

// ── TOC ───────────────────────────────────────

function buildTOC(wrap) {

  const toc = $('#toc-list');

  if (!toc) return;

  const hs =
    wrap.querySelectorAll('h2, h3');

  if (!hs.length) {

    const tw = $('.notes-toc');

    if (tw) tw.style.display = 'none';

    return;

  }

  toc.innerHTML = '';

  hs.forEach((h, i) => {

    h.id = h.id || 'h' + i;

    const li =
      document.createElement('li');

    li.className =
      'toc-item ' +
      h.tagName.toLowerCase();

    li.innerHTML = `
      <a href="#${h.id}">
        ${h.textContent}
      </a>
    `;

    toc.appendChild(li);

  });

}

// ── Render Content ────────────────────────────

function renderContent(md) {

  const body = $('#notes-body');

  if (!body) return;

  if (unlocked()) {

    body.innerHTML = `

      <div class="notes-markdown"
           id="md-content">

        ${mdToHTML(md)}

      </div>

    `;

    enhance(body);

    buildTOC(body);

  } else {

    body.innerHTML = `

      <div class="content-preview">

        <div class="notes-markdown">

          ${mdToHTML(md, true)}

        </div>

        <div class="content-blur-overlay"></div>

      </div>

      <div class="unlock-popup">

        <div class="unlock-card">

          <div class="unlock-icon">
            🔓
          </div>

          <div class="unlock-title">
            Unlock Full Notes
          </div>

          <div class="unlock-desc">

            Enter your details for
            instant access.

          </div>

          <div class="unlock-form">

            <div class="form-group">

              <label>Your Name</label>

              <input
                class="form-input"
                id="uname"
                type="text"
                placeholder="Enter your name"
              />

            </div>

            <div class="form-group">

              <label>Mobile Number</label>

              <input
                class="form-input"
                id="umob"
                type="tel"
                placeholder="10-digit number"
                maxlength="10"
              />

            </div>

            <button
              class="unlock-submit"
              id="ubtn">

              Unlock Full Notes →

            </button>

          </div>

        </div>

      </div>

    `;

    $('#umob')
      .addEventListener('input', e => {

        e.target.value =
          e.target.value
            .replace(/\D/g, '')
            .slice(0, 10);

      });

    $('#ubtn')
      .addEventListener('click', async () => {

        const name =
          ($('#uname').value || '').trim();

        const mob =
          ($('#umob').value || '').trim();

        if (!name) {

          toast('Please enter your name');

          return;

        }

        if (!/^\d{10}$/.test(mob)) {

          toast('Enter valid mobile number');

          return;

        }

        $('#ubtn').disabled = true;

        $('#ubtn').textContent =
          'Unlocking…';

        try {

          if (_sb) {

            await _sb
              .from('leads')
              .insert([{

                name,
                mobile: mob,

                semester: S.sem,

                subject: S.sub,

                note_title:
                  S.title || S.note

              }]);

          }

        } catch(e) {}

        setUnlock();

        toast('Notes unlocked! 🎉');

        renderContent(S.md);

      });

  }

}

// ── Progress Bar ──────────────────────────────

function initProgress() {

  const bar =
    document.createElement('div');

  bar.className =
    'reading-progress';

  document.body.prepend(bar);

  window.addEventListener(
    'scroll',
    () => {

      const nb = $('.notes-body');

      if (!nb) return;

      const scrolled =
        Math.max(
          0,
          -nb.getBoundingClientRect().top
        );

      const total =
        Math.max(
          1,
          nb.offsetHeight - window.innerHeight
        );

      bar.style.width =
        Math.min(
          100,
          (scrolled / total) * 100
        ) + '%';

    },
    { passive: true }
  );

}

// ── Zoom Modal ────────────────────────────────

function initZoom() {

  const modal = $('#img-modal');

  const img =
    modal &&
    modal.querySelector('img');

  const close =
    $('#img-modal-close');

  if (!modal || !img) return;

  document.addEventListener('click', e => {

    if (
      e.target.tagName === 'IMG' &&
      e.target.closest('.notes-markdown')
    ) {

      img.src = e.target.src;

      modal.classList.add('open');

    }

  });

  close?.addEventListener('click', () => {

    modal.classList.remove('open');

  });

}

// ── Background ────────────────────────────────

function initBg() {

  if (!$('.bg-mesh')) {

    const bg =
      document.createElement('div');

    bg.className = 'bg-mesh';

    document.body.prepend(bg);

  }

}

// ── Language Toggle ───────────────────────────

function initLang() {

  const en = $('#lang-en');

  const hi = $('#lang-hi');

  if (!en || !hi) return;

  en.addEventListener('click', () => {

    S.lang = 'en';

    en.classList.add('active');

    hi.classList.remove('active');

    loadNotes('en');

  });

  hi.addEventListener('click', () => {

    S.lang = 'hi';

    hi.classList.add('active');

    en.classList.remove('active');

    loadNotes('hi');

  });

}

// ── Load Notes ────────────────────────────────

async function loadNotes(lang) {

  lang = lang || 'en';

  const body = $('#notes-body');

  if (!body) return;

  const subjectFolder =
    slugify(S.sub);

  const url = `

${basePath()}notes/sem${S.sem}/${subjectFolder}/${S.note}-${lang}.md

  `.trim();

  body.innerHTML = `

    <div class="notes-loading">

      <div class="spinner"></div>

      <div class="loading-text">
        Loading notes…
      </div>

    </div>

  `;

  try {

    const res = await fetch(
      url,
      { cache: 'no-cache' }
    );

    if (!res.ok) {

      throw new Error(
        'HTTP ' + res.status
      );

    }

 /*   const md = await res.text();

    if (!md || !md.trim()) {

      throw new Error(
        'File is empty'
      );

    } */
    /* const md = await res.text();

// EMPTY FILE
if (!md || !md.trim()) {

  throw new Error(
    'File is empty'
  );

}

// GITHUB PAGES FALLBACK DETECT
if (

  md.includes('<!DOCTYPE html>') ||
  md.includes('<html') ||
  md.includes('<head>') ||
  md.includes('<body')

) {

  throw new Error(
    'Markdown file not found'
  );

} */
     const md = await res.text();

if (!md || !md.trim()) {

  throw new Error(
    'File is empty'
  );

}

// Detect GitHub fallback HTML page
if (

  md.includes('<title>') &&
  md.includes('BCANotes')

) {

  throw new Error(
    'Markdown file not found'
  );

}

    S.md = md;

    S.lang = lang;

    const m =
      md.match(/^#\s+(.+)/m);

    S.title = m
      ? m[1]
      : `${S.sub} ${S.note}`;

    const tel = $('#notes-title');

    if (tel) {

      tel.textContent = S.title;

    }

    document.title =
      S.title + ' | BCANotes';

    renderContent(md);

  } catch(err) {

    const u =
      S.note.replace('unit', '');

    body.innerHTML = `

      <div class="notes-error">

        <div class="error-icon">
          📄
        </div>

        <div class="error-title">
          Notes Not Found
        </div>

        <div class="error-desc">

          <strong>
            ${S.sub} — Unit ${u}
          </strong>

          <br><br>

          Expected file:

          <br>

          <code style="
            font-size:12px;
            background:#f0f2f7;
            padding:4px 10px;
            border-radius:6px;
            display:inline-block;
            margin:6px 0;
            word-break:break-all
          ">

            notes/sem${S.sem}/${subjectFolder}/unit${u}-${lang}.md

          </code>

        </div>

      </div>

    `;

  }

}

// ── Init ──────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

  initBg();

  initSupabase();

  initProgress();

  initZoom();

  initLang();

  const semL =
    SEMS[S.sem - 1] || S.sem;

  const uNum =
    S.note.replace('unit', '');

  // Breadcrumb

  const bc = $('#breadcrumb');

  if (bc) {

    bc.innerHTML = `

      <a href="index.html">
        Home
      </a>

      <span>›</span>

      <a href="semester.html?sem=${S.sem}">
        Semester ${semL}
      </a>

      <span>›</span>

      <a href="subject.html?sem=${S.sem}&subject=${encodeURIComponent(S.sub)}">
        ${S.sub}
      </a>

      <span>›</span>

      <span class="current">
        Unit ${uNum}
      </span>

    `;

  }

  // Meta Tags

  const meta = $('#notes-meta');

  if (meta) {

    meta.innerHTML = `

      <span class="meta-tag">
        Sem ${semL}
      </span>

      <span class="meta-tag">
        ${S.sub}
      </span>

      <span class="meta-tag">
        Unit ${uNum}
      </span>

    `;

  }

  document.title =
    `${S.sub} Unit ${uNum} | BCANotes`;

  // Load English Notes

  loadNotes('en');

});
