/* ================================================================
   DATA — Common passwords, keyboard patterns, common names
================================================================ */
const COMMON_PASSWORDS = [
  'password','123456','123456789','12345678','12345','1234567','qwerty',
  'abc123','football','monkey','letmein','dragon','111111','baseball',
  'iloveyou','master','sunshine','princess','welcome','shadow','michael',
  'superman','696969','123123','batman','admin','login','hello','pass',
  'test','1234','password1','qwerty123','iloveyou1','trustno1','hello123'
];

const KEYBOARD_PATTERNS = [
  'qwerty','asdfgh','zxcvbn','qazwsx','123456','234567','345678',
  '456789','qwertyuiop','asdfghjkl','abcdef','123abc','1qaz','2wsx',
  'qweasd','poiuyt','lkjhgf','mnbvcx','098765','987654'
];

const COMMON_NAMES = [
  'john','jane','mike','michael','sarah','emma','james','robert','mary',
  'william','david','richard','joseph','charles','thomas','daniel','mark',
  'alex','chris','jessica','ashley','amanda','melissa','stephanie','nicole'
];

/* ================================================================
   THEME
================================================================ */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const themeLabel  = document.getElementById('themeLabel');
const root        = document.documentElement;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('sp_theme', theme);
  if (theme === 'dark') {
    themeIcon.className = 'bi bi-sun-fill';
    themeLabel.textContent = 'Light';
  } else {
    themeIcon.className = 'bi bi-moon-fill';
    themeLabel.textContent = 'Dark';
  }
  // Only update chart after it has been initialized
  if (typeof strengthChart !== 'undefined' && strengthChart) {
    updateChart(lastScores);
  }
}

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

/* ================================================================
   CHART.JS SETUP
================================================================ */
const chartCtx    = document.getElementById('strengthChart').getContext('2d');
const chartLabels = ['Length', 'Uppercase', 'Lowercase', 'Numbers', 'Symbols', 'Uniqueness'];
let lastScores    = [0, 0, 0, 0, 0, 0];

function getChartColors() {
  const isDark = root.getAttribute('data-theme') === 'dark';
  return {
    barColors: [
      isDark ? 'rgba(56,189,248,0.75)'  : 'rgba(79,70,229,0.75)',
      isDark ? 'rgba(129,140,248,0.75)' : 'rgba(124,58,237,0.75)',
      isDark ? 'rgba(52,211,153,0.75)'  : 'rgba(5,150,105,0.75)',
      isDark ? 'rgba(251,191,36,0.75)'  : 'rgba(217,119,6,0.75)',
      isDark ? 'rgba(248,113,113,0.75)' : 'rgba(220,38,38,0.75)',
      isDark ? 'rgba(99,179,237,0.75)'  : 'rgba(99,102,241,0.75)',
    ],
    borderColors: [
      isDark ? '#38bdf8' : '#4f46e5',
      isDark ? '#818cf8' : '#7c3aed',
      isDark ? '#34d399' : '#059669',
      isDark ? '#fbbf24' : '#d97706',
      isDark ? '#f87171' : '#dc2626',
      isDark ? '#63b3ed' : '#6366f1',
    ],
    gridColor: isDark ? 'rgba(148,163,184,0.08)' : 'rgba(99,102,241,0.08)',
    tickColor: isDark ? '#64748b' : '#7c8bbd',
    textColor: isDark ? '#94a3b8' : '#4338ca',
  };
}

const strengthChart = new Chart(chartCtx, {
  type: 'bar',
  data: {
    labels: chartLabels,
    datasets: [{
      label: 'Score',
      data: [0, 0, 0, 0, 0, 0],
      backgroundColor: getChartColors().barColors,
      borderColor:     getChartColors().borderColors,
      borderWidth:     1.5,
      borderRadius:    7,
      borderSkipped:   false,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500, easing: 'easeOutQuart' },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15,23,42,0.95)',
        titleColor:      '#f1f5f9',
        bodyColor:       '#94a3b8',
        borderColor:     'rgba(148,163,184,0.15)',
        borderWidth:     1,
        cornerRadius:    8,
        padding:         10,
        callbacks: {
          label: ctx => `Score: ${ctx.parsed.y}/100`
        }
      }
    },
    scales: {
      y: {
        min: 0, max: 100,
        grid:   { color: getChartColors().gridColor },
        ticks:  { color: getChartColors().tickColor, font: { family: "'DM Mono'" }, stepSize: 25 },
        border: { display: false },
      },
      x: {
        grid:   { display: false },
        ticks:  { color: getChartColors().textColor, font: { family: "'DM Sans'", weight: '600', size: 11 } },
        border: { display: false },
      }
    }
  }
});

function updateChart(scores) {
  lastScores = scores;
  const colors = getChartColors();
  strengthChart.data.datasets[0].data            = scores;
  strengthChart.data.datasets[0].backgroundColor = colors.barColors;
  strengthChart.data.datasets[0].borderColor     = colors.borderColors;
  strengthChart.options.scales.y.grid.color      = colors.gridColor;
  strengthChart.options.scales.y.ticks.color     = colors.tickColor;
  strengthChart.options.scales.x.ticks.color     = colors.textColor;
  strengthChart.update();
}

// Apply saved theme AFTER chart is initialized
applyTheme(localStorage.getItem('sp_theme') || 'dark');

/* ================================================================
   PASSWORD VISIBILITY TOGGLE
================================================================ */
const passwordInput    = document.getElementById('passwordInput');
const toggleVisibility = document.getElementById('toggleVisibility');
const eyeIcon          = document.getElementById('eyeIcon');

toggleVisibility.addEventListener('click', () => {
  const isHidden = passwordInput.type === 'password';
  passwordInput.type = isHidden ? 'text' : 'password';
  eyeIcon.className  = isHidden ? 'bi bi-eye-slash' : 'bi bi-eye';
});

/* ================================================================
   PASSWORD GENERATOR
================================================================ */
document.getElementById('generateBtn').addEventListener('click', () => {
  const upper   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower   = 'abcdefghijklmnopqrstuvwxyz';
  const digits  = '0123456789';
  const special = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const charset = upper + lower + digits + special;
  const length  = Math.floor(Math.random() * 4) + 16; // 16–19 chars

  // Guarantee at least one of each type
  let pw = '';
  pw += upper[Math.floor(Math.random()   * upper.length)];
  pw += lower[Math.floor(Math.random()   * lower.length)];
  pw += digits[Math.floor(Math.random()  * digits.length)];
  pw += special[Math.floor(Math.random() * special.length)];

  for (let i = pw.length; i < length; i++) {
    pw += charset[Math.floor(Math.random() * charset.length)];
  }

  // Shuffle so guaranteed chars aren't always at the start
  pw = pw.split('').sort(() => Math.random() - 0.5).join('');

  passwordInput.value = pw;
  passwordInput.type  = 'text';
  eyeIcon.className   = 'bi bi-eye-slash';
  analyze(pw);
});

/* ================================================================
   ENTROPY CALCULATION
================================================================ */
function calcEntropy(pw) {
  let pool = 0;
  if (/[a-z]/.test(pw))       pool += 26;
  if (/[A-Z]/.test(pw))       pool += 26;
  if (/[0-9]/.test(pw))       pool += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) pool += 32;
  return pool > 0 ? (pw.length * Math.log2(pool)).toFixed(1) : 0;
}

/* ================================================================
   CRACK TIME ESTIMATOR  (assumes 10 billion guesses/sec)
================================================================ */
function estimateCrackTime(entropy) {
  const seconds = Math.pow(2, entropy) / 1e10;
  if (seconds < 1)          return '< 1 second';
  if (seconds < 60)         return `${Math.round(seconds)} seconds`;
  if (seconds < 3600)       return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400)      return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 2592000)    return `${Math.round(seconds / 86400)} days`;
  if (seconds < 31536000)   return `${Math.round(seconds / 2592000)} months`;
  if (seconds < 3153600000) return `${Math.round(seconds / 31536000)} years`;
  if (seconds < 3.154e12)   return `${(seconds / 3153600000).toFixed(0)} centuries`;
  return 'Practically forever';
}

/* ================================================================
   SECURITY SCORE  (weighted across 6 categories)
================================================================ */
function calcSecurityScore(pw) {
  const scores = { length: 0, upper: 0, lower: 0, number: 0, symbol: 0, unique: 0 };

  // Length (max weight 25%)
  const l = pw.length;
  if      (l >= 20) scores.length = 100;
  else if (l >= 16) scores.length = 85;
  else if (l >= 12) scores.length = 65;
  else if (l >= 8)  scores.length = 40;
  else              scores.length = Math.round((l / 8) * 40);

  // Character-type scores
  scores.upper  = Math.min(100, (pw.match(/[A-Z]/g)       || []).length * 20);
  scores.lower  = Math.min(100, (pw.match(/[a-z]/g)       || []).length * 15);
  scores.number = Math.min(100, (pw.match(/[0-9]/g)        || []).length * 20);
  scores.symbol = Math.min(100, (pw.match(/[^a-zA-Z0-9]/g) || []).length * 25);

  // Uniqueness
  const unique = new Set(pw).size;
  scores.unique = Math.min(100, Math.round((unique / Math.max(pw.length, 1)) * 100));

  const total = Math.min(100, Math.round(
    scores.length * 0.25 +
    scores.upper  * 0.15 +
    scores.lower  * 0.15 +
    scores.number * 0.15 +
    scores.symbol * 0.20 +
    scores.unique * 0.10
  ));

  return { total, breakdown: scores };
}

/* ================================================================
   STRENGTH METER
================================================================ */
function updateStrengthMeter(score) {
  const strengthLabel = document.getElementById('strengthLabel');
  let level, cls, color;

  if      (score === 0) { level = '—';           cls = '';              color = 'var(--text-muted)'; }
  else if (score < 35)  { level = 'Weak';        cls = 'active-weak';   color = 'var(--danger)'; }
  else if (score < 65)  { level = 'Medium';      cls = 'active-medium'; color = 'var(--warning)'; }
  else if (score < 85)  { level = 'Strong';      cls = 'active-strong'; color = 'var(--success)'; }
  else                  { level = 'Very Strong'; cls = 'active-strong'; color = 'var(--success)'; }

  const activeCount = score === 0 ? 0 : score < 35 ? 1 : score < 65 ? 2 : score < 85 ? 3 : 4;

  ['seg1','seg2','seg3','seg4'].forEach((id, i) => {
    const el = document.getElementById(id);
    el.className = 'strength-segment';
    if (i < activeCount) el.classList.add(cls);
  });

  strengthLabel.textContent = level;
  strengthLabel.style.color = color;
}

/* ================================================================
   SCORE RING
================================================================ */
function updateScoreRing(score) {
  const ring        = document.getElementById('scoreRing');
  const num         = document.getElementById('scoreNum');
  const badge       = document.getElementById('secLevelBadge');
  const circumference = 2 * Math.PI * 45;
  ring.style.strokeDashoffset = circumference - (score / 100) * circumference;

  let color, level;
  if      (score < 35) { color = 'var(--danger)';  level = 'Vulnerable'; }
  else if (score < 65) { color = 'var(--warning)'; level = 'Moderate'; }
  else if (score < 85) { color = 'var(--accent)';  level = 'Secure'; }
  else                 { color = 'var(--success)'; level = 'Excellent'; }

  ring.style.stroke   = color;
  badge.textContent   = score === 0 ? '—' : level;
  badge.style.color   = color;

  // Animated counter
  const current = parseInt(num.textContent) || 0;
  const diff = score - current;
  let step = 0;
  const interval = setInterval(() => {
    step++;
    num.textContent = Math.round(current + (diff * step / 20));
    if (step >= 20) clearInterval(interval);
  }, 20);
}

/* ================================================================
   PASSWORD REQUIREMENTS
================================================================ */
function updateRequirements(pw) {
  const checks = {
    'req-length':  pw.length >= 8,
    'req-upper':   /[A-Z]/.test(pw),
    'req-lower':   /[a-z]/.test(pw),
    'req-number':  /[0-9]/.test(pw),
    'req-special': /[^a-zA-Z0-9]/.test(pw),
  };

  const defaultIcons = {
    'req-length':  'bi-rulers',
    'req-upper':   'bi-fonts',
    'req-lower':   'bi-type-italic',
    'req-number':  'bi-123',
    'req-special': 'bi-asterisk',
  };

  for (const [id, met] of Object.entries(checks)) {
    const el    = document.getElementById(id);
    const icon  = el.querySelector('.req-icon i');
    const badge = el.querySelector('.req-badge');

    if (met) {
      el.classList.add('req-met');
      icon.className  = 'bi bi-check2';
      badge.className = 'req-badge req-badge-pass';
      badge.textContent = 'Pass';
    } else {
      el.classList.remove('req-met');
      icon.className  = `bi ${defaultIcons[id]}`;
      badge.className = 'req-badge req-badge-fail';
      badge.textContent = 'Fail';
    }
  }
}

/* ================================================================
   SMART SUGGESTIONS
================================================================ */
function updateSuggestions(pw) {
  const list = document.getElementById('suggestionsList');

  if (!pw) {
    list.innerHTML = `<div class="empty-state"><i class="bi bi-shield-slash"></i>Enter a password to see suggestions</div>`;
    return;
  }

  const sug = [];

  if (pw.length < 8)       sug.push({ type: 'danger', icon: 'bi-exclamation-triangle-fill', text: 'Password is too short. Aim for at least 12 characters.' });
  else if (pw.length < 12) sug.push({ type: 'warn',   icon: 'bi-arrow-up-circle-fill',      text: 'Consider increasing length to 12+ characters for better security.' });

  if (!/[0-9]/.test(pw))         sug.push({ type: 'info', icon: 'bi-123',      text: 'Add numbers to increase complexity significantly.' });
  if (!/[^a-zA-Z0-9]/.test(pw))  sug.push({ type: 'info', icon: 'bi-asterisk', text: 'Include special characters (!@#$…) to boost your score.' });
  if (!/[A-Z]/.test(pw))         sug.push({ type: 'info', icon: 'bi-fonts',    text: 'Add uppercase letters to improve character diversity.' });

  if (/(.)\1{2,}/.test(pw))
    sug.push({ type: 'danger', icon: 'bi-repeat', text: 'Avoid repeating the same character 3+ times in a row (e.g., aaa, 111).' });

  if (/(?:012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i.test(pw))
    sug.push({ type: 'warn', icon: 'bi-sort-alpha-down', text: 'Avoid sequential patterns (e.g., 123, abc). They are easily guessed.' });

  const uniqueRatio = new Set(pw).size / pw.length;
  if (uniqueRatio < 0.5 && pw.length > 5)
    sug.push({ type: 'warn', icon: 'bi-pie-chart-fill', text: 'Low character diversity detected. Use more varied characters.' });

  if (sug.length === 0)
    sug.push({ type: 'ok', icon: 'bi-shield-fill-check', text: 'Excellent password! No obvious weaknesses detected.' });

  list.innerHTML = sug.map(s => `
    <div class="suggestion-item sug-${s.type}">
      <i class="bi ${s.icon} sug-icon"></i>
      <span class="sug-text">${s.text}</span>
    </div>
  `).join('');
}

/* ================================================================
   THREAT DETECTION
================================================================ */
function updateThreat(id, isThreat, safeMsg, dangerMsg, dangerClass = 'threat-danger') {
  const card     = document.getElementById(id);
  const statusEl = card.querySelector('.threat-status');
  const msgEl    = card.querySelector('.threat-msg');
  card.className      = `threat-card ${isThreat ? dangerClass : 'threat-safe'}`;
  statusEl.textContent = isThreat ? 'Detected' : 'Clear';
  msgEl.textContent    = isThreat ? dangerMsg : safeMsg;
}

function detectThreats(pw) {
  const lower = pw.toLowerCase();

  // Common password
  updateThreat(
    'threatCommon',
    COMMON_PASSWORDS.includes(lower),
    'Not found in common password database.',
    `"${pw}" is in the top common passwords list. Change it immediately!`
  );

  // Keyboard pattern
  updateThreat(
    'threatKeyboard',
    KEYBOARD_PATTERNS.some(p => lower.includes(p)),
    'No keyboard pattern sequences detected.',
    'Sequential keyboard pattern detected (e.g., qwerty, 123456). Avoid these!',
    'threat-warn'
  );

  // Repeated characters
  updateThreat(
    'threatRepeated',
    /(.)\1{2,}/.test(pw),
    'No excessive repeated characters detected.',
    'Repeated character sequence found (e.g., aaa, 111). Reduces entropy significantly.',
    'threat-warn'
  );

  // Personal information
  const hasName = COMMON_NAMES.some(n => lower.includes(n));
  const hasYear = /\b(19[5-9]\d|20[0-2]\d)\b/.test(pw);
  updateThreat(
    'threatPersonal',
    hasName || hasYear,
    'No common names or birth years detected.',
    hasYear
      ? 'Possible birth year detected in password. Avoid predictable personal data.'
      : 'Common name detected in password. Avoid using names.'
  );
}

/* ================================================================
   MAIN ANALYSIS — called on every keystroke
================================================================ */
function analyze(pw) {
  // Char count badge
  document.getElementById('charCountBadge').textContent = `${pw.length} chars`;

  // Score
  const { total, breakdown } = calcSecurityScore(pw);
  updateScoreRing(total);
  updateStrengthMeter(total);

  // Metrics
  const entropy = calcEntropy(pw);
  document.getElementById('entropyVal').textContent = pw ? `${entropy} bits` : '—';
  document.getElementById('crackTime').textContent  = pw ? estimateCrackTime(parseFloat(entropy)) : '—';
  document.getElementById('pwLength').textContent   = pw ? `${pw.length} chars` : '—';

  let pool = 0;
  if (/[a-z]/.test(pw))        pool += 26;
  if (/[A-Z]/.test(pw))        pool += 26;
  if (/[0-9]/.test(pw))        pool += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) pool += 32;
  document.getElementById('charPool').textContent = pw ? `${pool} chars` : '—';

  // Requirements & Suggestions
  updateRequirements(pw);
  updateSuggestions(pw);

  // Chart
  updateChart([
    breakdown.length,
    breakdown.upper,
    breakdown.lower,
    breakdown.number,
    breakdown.symbol,
    breakdown.unique,
  ]);

  // Threats
  if (pw) {
    detectThreats(pw);
  } else {
    ['threatCommon','threatKeyboard','threatRepeated','threatPersonal'].forEach(id => {
      const card = document.getElementById(id);
      card.className = 'threat-card threat-neutral';
      card.querySelector('.threat-status').textContent = 'Analyzing…';
    });
  }
}

/* ================================================================
   EVENT LISTENER + INIT
================================================================ */
passwordInput.addEventListener('input', () => analyze(passwordInput.value));
analyze(''); // Run once on load to set initial state
