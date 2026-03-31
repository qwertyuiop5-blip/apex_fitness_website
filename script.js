/* ===== PAGE NAVIGATION ===== */
const PAGES = ['home', 'workouts', 'bmi', 'classes', 'progress'];

function showPage(id) {
  // Hide all pages
  PAGES.forEach(p => {
    document.getElementById(p).classList.remove('active');
  });
  // Show the selected page
  document.getElementById(id).classList.add('active');
  // Update active nav link
  document.querySelectorAll('.nav-links a').forEach((a, i) => {
    a.classList.toggle('active', PAGES[i] === id);
  });
  // Render page content on demand
  if (id === 'workouts') renderWorkouts();
  if (id === 'classes') renderClasses();
  if (id === 'progress') renderProgress();
}

/* ===== WORKOUTS DATA ===== */
const workouts = [
  {
    id: 1,
    name: 'Full Body Blast',
    img: 'images/full-body-blast.jpg',
    category: 'Strength',
    difficulty: 'Beginner',
    duration: '30 min',
    calories: '280',
    exercises: [
      { name: 'Squat',        sets: '3×12' },
      { name: 'Push-Up',      sets: '3×10' },
      { name: 'Dumbbell Row', sets: '3×10' },
      { name: 'Plank',        sets: '3×30s' },
      { name: 'Glute Bridge', sets: '3×15' }
    ]
  },
  {
    id: 2,
    name: 'HIIT Cardio',
    img: 'images/hiit-cardio.jpg',
    category: 'Cardio',
    difficulty: 'Intermediate',
    duration: '25 min',
    calories: '350',
    exercises: [
      { name: 'Burpees',           sets: '4×10' },
      { name: 'Jump Squats',       sets: '4×15' },
      { name: 'Mountain Climbers', sets: '4×20' },
      { name: 'High Knees',        sets: '4×30s' },
      { name: 'Box Jump',          sets: '3×8' }
    ]
  },
  {
    id: 3,
    name: 'Core Crusher',
    img: 'images/core-crusher.jpg',
    category: 'Core',
    difficulty: 'Intermediate',
    duration: '20 min',
    calories: '200',
    exercises: [
      { name: 'Crunches',      sets: '3×20' },
      { name: 'Leg Raise',     sets: '3×15' },
      { name: 'Russian Twist', sets: '3×20' },
      { name: 'Side Plank',    sets: '3×25s' },
      { name: 'Dead Bug',      sets: '3×10' }
    ]
  },
  {
    id: 4,
    name: 'Upper Body Power',
    img: 'images/upper-body-power.jpg',
    category: 'Strength',
    difficulty: 'Advanced',
    duration: '45 min',
    calories: '400',
    exercises: [
      { name: 'Bench Press',      sets: '4×8' },
      { name: 'Pull-Up',          sets: '4×8' },
      { name: 'OHP',              sets: '4×8' },
      { name: 'Dips',             sets: '3×12' },
      { name: 'Bicep Curl',       sets: '3×12' },
      { name: 'Tricep Extension', sets: '3×12' }
    ]
  },
  {
    id: 5,
    name: 'Yoga Flow',
    img: 'images/yoga-flow.jpg',
    category: 'Flexibility',
    difficulty: 'Beginner',
    duration: '40 min',
    calories: '150',
    exercises: [
      { name: 'Sun Salutation',  sets: '5 rounds' },
      { name: 'Warrior I & II',  sets: 'Hold 30s' },
      { name: 'Downward Dog',    sets: 'Hold 45s' },
      { name: 'Pigeon Pose',     sets: 'Hold 40s' },
      { name: "Child's Pose",    sets: 'Rest 1 min' }
    ]
  },
  {
    id: 6,
    name: 'Leg Day',
    img: 'images/leg-day.jpg',
    category: 'Strength',
    difficulty: 'Advanced',
    duration: '50 min',
    calories: '450',
    exercises: [
      { name: 'Barbell Squat',       sets: '5×5' },
      { name: 'Romanian Deadlift',   sets: '4×8' },
      { name: 'Leg Press',           sets: '4×12' },
      { name: 'Lunge',               sets: '3×12' },
      { name: 'Calf Raise',          sets: '4×20' }
    ]
  },
  {
    id: 7,
    name: 'Morning Stretch',
    img: 'images/morning-stretch.jpg',
    category: 'Flexibility',
    difficulty: 'Beginner',
    duration: '15 min',
    calories: '80',
    exercises: [
      { name: 'Neck Roll',          sets: '2 min' },
      { name: 'Shoulder Stretch',   sets: '1 min' },
      { name: 'Hip Flexor Stretch', sets: '1 min' },
      { name: 'Hamstring Stretch',  sets: '1 min' },
      { name: 'Spinal Twist',       sets: '1 min' }
    ]
  },
  {
    id: 8,
    name: 'Sprint Intervals',
    img: 'images/sprint-intervals.jpg',
    category: 'Cardio',
    difficulty: 'Advanced',
    duration: '30 min',
    calories: '500',
    exercises: [
      { name: 'Warm-up Jog',      sets: '5 min' },
      { name: 'Sprint',           sets: '8×30s' },
      { name: 'Walking Recovery', sets: '8×90s' },
      { name: 'Cool-down',        sets: '5 min' }
    ]
  }
];

const categories = ['All', 'Strength', 'Cardio', 'Core', 'Flexibility'];
let activeFilter = 'All';

/* Render workout filter buttons and cards */
function renderWorkouts() {
  const filterEl = document.getElementById('workout-filters');
  // Only build filter buttons once
  if (!filterEl.innerHTML) {
    filterEl.innerHTML = categories.map(c =>
      `<button class="filter-btn${c === activeFilter ? ' active' : ''}" onclick="setFilter('${c}')">${c}</button>`
    ).join('');
  }
  // Filter workouts by active category
  const filtered = activeFilter === 'All'
    ? workouts
    : workouts.filter(w => w.category === activeFilter);

  // Build card HTML for each workout
  document.getElementById('workout-grid').innerHTML = filtered.map(w => `
    <div class="workout-card" onclick="openWorkout(${w.id})">
      <div class="workout-thumb">
        <img src="${w.img}" alt="${w.name}" loading="lazy">
        <div class="workout-thumb-overlay"></div>
        <span class="workout-difficulty diff-${w.difficulty.toLowerCase()}">${w.difficulty}</span>
      </div>
      <div class="workout-body">
        <div class="workout-name">${w.name}</div>
        <div class="workout-meta">
          <span>⏱ ${w.duration}</span>
          <span>🔥 ${w.calories} kcal</span>
          <span>${w.category}</span>
        </div>
      </div>
    </div>
  `).join('');
}

/* Update active filter and re-render */
function setFilter(cat) {
  activeFilter = cat;
  document.querySelectorAll('.filter-btn').forEach((b, i) => {
    b.classList.toggle('active', categories[i] === cat);
  });
  renderWorkouts();
}

/* Open workout detail modal */
function openWorkout(id) {
  const w = workouts.find(x => x.id === id);
  document.getElementById('modal-content').innerHTML = `
    <img src="${w.img}" alt="${w.name}" style="width:100%;height:160px;object-fit:cover;border-radius:10px;margin-bottom:1.2rem;display:block;">
    <div class="modal-title">${w.name}</div>
    <div class="modal-tags">
      <span class="tag">${w.category}</span>
      <span class="tag">⏱ ${w.duration}</span>
      <span class="tag">🔥 ${w.calories} kcal</span>
      <span class="workout-difficulty diff-${w.difficulty.toLowerCase()}">${w.difficulty}</span>
    </div>
    <ul class="exercise-list">
      ${w.exercises.map((e, i) => `
        <li>
          <span class="ex-num">${i + 1}</span>
          <span>${e.name}</span>
          <span class="ex-sets">${e.sets}</span>
        </li>
      `).join('')}
    </ul>
    <button class="btn-primary" style="width:100%;margin-top:1.5rem">Start Workout</button>
  `;
  document.getElementById('modal-overlay').classList.add('open');
}

/* Close modal */
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
}

/* ===== BMI CALCULATOR ===== */
let bmiState = { weight: 70, height: 175 };

/* Sync slider value to state and recalculate */
function syncBMI(field, val) {
  bmiState[field] = parseFloat(val);
  document.getElementById(field + '-val').textContent = val;
  calcBMI();
}

/* Calculate and display BMI */
function calcBMI() {
  const { weight, height } = bmiState;
  const bmi = weight / ((height / 100) ** 2);
  document.getElementById('bmi-num').textContent = bmi.toFixed(1);

  // Map BMI to position on gradient bar (scale: 15 to 40)
  const minB = 15, maxB = 40;
  const pct = Math.min(Math.max((bmi - minB) / (maxB - minB) * 100, 2), 98);
  document.getElementById('bmi-marker').style.left = pct + '%';

  // Determine category and tip
  let cat, tip;
  if (bmi < 18.5) {
    cat = 'Underweight';
    tip = 'Consider increasing caloric intake with nutrient-dense foods and consult a dietitian.';
  } else if (bmi < 25) {
    cat = 'Normal weight';
    tip = 'Your BMI is in a healthy range. Keep up your current routine and balanced nutrition.';
  } else if (bmi < 30) {
    cat = 'Overweight';
    tip = 'Aim for 150 min of moderate activity per week and reduce processed food intake.';
  } else {
    cat = 'Obese';
    tip = 'We recommend consulting a healthcare professional for a personalised plan.';
  }

  document.getElementById('bmi-cat').textContent = cat;
  document.getElementById('bmi-tip').textContent = tip;
}

/* ===== CLASSES DATA ===== */
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const classData = {
  Mon: [
    { time: '06:30', name: 'Morning HIIT',  instructor: 'Sarah K.',  duration: '45 min', spots: '12 / 20', icon: '⚡', status: 'open' },
    { time: '08:00', name: 'Yoga Flow',     instructor: 'Priya M.',  duration: '60 min', spots: '5 / 15',  icon: '🧘', status: 'few'  },
    { time: '12:00', name: 'Core Power',    instructor: 'James L.',  duration: '30 min', spots: '0 / 12',  icon: '💪', status: 'full' },
    { time: '18:30', name: 'Spin Class',    instructor: 'Alex R.',   duration: '50 min', spots: '8 / 18',  icon: '🚴', status: 'open' }
  ],
  Tue: [
    { time: '07:00', name: 'Pilates',   instructor: 'Nina S.',   duration: '55 min', spots: '3 / 10',  icon: '🤸', status: 'few'  },
    { time: '09:30', name: 'Bootcamp',  instructor: 'Marcus T.', duration: '60 min', spots: '9 / 20',  icon: '🔥', status: 'open' },
    { time: '19:00', name: 'Zumba',     instructor: 'Carmen V.', duration: '45 min', spots: '11 / 22', icon: '💃', status: 'open' }
  ],
  Wed: [
    { time: '06:00', name: 'CrossFit',      instructor: 'Dan H.',   duration: '60 min', spots: '0 / 15',  icon: '🏋️', status: 'full' },
    { time: '10:00', name: 'Morning Stretch', instructor: 'Priya M.', duration: '30 min', spots: '7 / 12', icon: '🌅', status: 'open' },
    { time: '17:30', name: 'HIIT Cardio',   instructor: 'Sarah K.', duration: '45 min', spots: '2 / 20',  icon: '⚡', status: 'few'  },
    { time: '19:30', name: 'Yoga Flow',     instructor: 'Priya M.', duration: '60 min', spots: '10 / 15', icon: '🧘', status: 'open' }
  ],
  Thu: [
    { time: '07:30', name: 'Spin Class', instructor: 'Alex R.',   duration: '50 min', spots: '4 / 18',  icon: '🚴', status: 'few'  },
    { time: '12:00', name: 'Core Blast', instructor: 'James L.',  duration: '30 min', spots: '6 / 12',  icon: '💪', status: 'open' },
    { time: '18:00', name: 'Bootcamp',   instructor: 'Marcus T.', duration: '60 min', spots: '14 / 20', icon: '🔥', status: 'open' }
  ],
  Fri: [
    { time: '06:30', name: 'Morning HIIT', instructor: 'Sarah K.',  duration: '45 min', spots: '16 / 20', icon: '⚡',  status: 'open' },
    { time: '08:00', name: 'Pilates',      instructor: 'Nina S.',   duration: '55 min', spots: '1 / 10',  icon: '🤸',  status: 'few'  },
    { time: '17:00', name: 'Zumba',        instructor: 'Carmen V.', duration: '45 min', spots: '0 / 22',  icon: '💃',  status: 'full' },
    { time: '19:00', name: 'CrossFit',     instructor: 'Dan H.',    duration: '60 min', spots: '8 / 15',  icon: '🏋️', status: 'open' }
  ],
  Sat: [
    { time: '08:00', name: 'Weekend Warriors', instructor: 'Marcus T.', duration: '75 min', spots: '5 / 25',  icon: '🏅', status: 'few'  },
    { time: '10:00', name: 'Family Yoga',      instructor: 'Priya M.',  duration: '60 min', spots: '9 / 20',  icon: '🧘', status: 'open' },
    { time: '11:30', name: 'Spin Class',       instructor: 'Alex R.',   duration: '50 min', spots: '12 / 18', icon: '🚴', status: 'open' }
  ],
  Sun: [
    { time: '09:00', name: 'Recovery Flow', instructor: 'Nina S.',  duration: '60 min', spots: '4 / 15', icon: '🌿', status: 'few'  },
    { time: '11:00', name: 'Light Stretch', instructor: 'Priya M.', duration: '40 min', spots: '8 / 15', icon: '🌅', status: 'open' }
  ]
};

let activeDay = 'Mon';

/* Render day tabs and class cards */
function renderClasses() {
  const tabsEl = document.getElementById('day-tabs');
  // Only build day tabs once
  if (!tabsEl.innerHTML) {
    tabsEl.innerHTML = days.map(d =>
      `<button class="day-tab${d === activeDay ? ' active' : ''}" onclick="setDay('${d}')">${d}</button>`
    ).join('');
  }

  // Build class card HTML for the active day
  const classes = classData[activeDay] || [];
  document.getElementById('class-list').innerHTML = classes.map(c => {
    const spotClass = c.status === 'open' ? 'spots-open' : c.status === 'few' ? 'spots-few' : 'spots-full';
    const spotLabel = c.status === 'open' ? `${c.spots} spots` : c.status === 'few' ? 'Few spots left' : 'Full';
    return `
      <div class="class-card">
        <div class="class-time">${c.time}</div>
        <div class="class-divider"></div>
        <div class="class-icon">${c.icon}</div>
        <div class="class-info">
          <div class="class-name">${c.name}</div>
          <div class="class-meta">${c.instructor} · ${c.duration}</div>
        </div>
        <span class="class-spots ${spotClass}">${spotLabel}</span>
        <button class="class-book" ${c.status === 'full' ? 'disabled' : ''} onclick="bookClass(this, '${c.name}')">
          ${c.status === 'full' ? 'Full' : 'Book'}
        </button>
      </div>
    `;
  }).join('');
}

/* Switch active day tab and re-render */
function setDay(d) {
  activeDay = d;
  document.querySelectorAll('.day-tab').forEach((btn, i) => {
    btn.classList.toggle('active', days[i] === d);
  });
  renderClasses();
}

/* Confirm a class booking (UI only) */
function bookClass(btn, name) {
  btn.textContent = 'Booked ✓';
  btn.style.background = 'rgba(29,158,117,0.15)';
  btn.style.color = '#1D9E75';
  btn.style.borderColor = 'rgba(29,158,117,0.4)';
  btn.disabled = true;
}

/* ===== PROGRESS / STREAK TRACKER ===== */

// Load saved workouts from localStorage, fallback to empty array
let workoutLog = JSON.parse(localStorage.getItem('apexfit-log') || '[]');

function saveLog() {
  localStorage.setItem('apexfit-log', JSON.stringify(workoutLog));
}

function renderProgress() {
  renderWeekGrid();
  renderStats();
  renderHistory();
  // Set today's date as default in date picker
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('log-date').value = today;
  document.getElementById('log-msg').textContent = '';
}

/* Build the Mon–Sun grid for the current week */
function renderWeekGrid() {
  const grid = document.getElementById('week-grid');
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  // Get Monday of the current week
  const dayOfWeek = (today.getDay() + 6) % 7; // 0=Mon
  const monday = new Date(today);
  monday.setDate(today.getDate() - dayOfWeek);

  grid.innerHTML = dayNames.map((name, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    const isToday = dateStr === today.toISOString().split('T')[0];
    const done = workoutLog.some(e => e.date === dateStr);
    return `
      <div class="week-day ${done ? 'done' : ''} ${isToday ? 'today' : ''}">
        <div class="day-name">${name}</div>
        <div class="day-dot"></div>
      </div>
    `;
  }).join('');
}

/* Calculate and display streak + total stats */
function renderStats() {
  const dates = [...new Set(workoutLog.map(e => e.date))].sort();
  const total = workoutLog.length;

  // Current streak — count consecutive days ending today or yesterday
  let current = 0;
  const today = new Date();
  let check = new Date(today);
  // allow streak if worked out today or yesterday
  while (true) {
    const str = check.toISOString().split('T')[0];
    if (dates.includes(str)) {
      current++;
      check.setDate(check.getDate() - 1);
    } else {
      // allow one gap for "today not yet logged"
      if (current === 0) {
        check.setDate(check.getDate() - 1);
        const y = check.toISOString().split('T')[0];
        if (dates.includes(y)) { current++; check.setDate(check.getDate() - 1); }
        else break;
      } else break;
    }
  }

  // Best streak ever
  let best = 0, run = 0;
  for (let i = 0; i < dates.length; i++) {
    if (i === 0) { run = 1; }
    else {
      const prev = new Date(dates[i - 1]);
      const curr = new Date(dates[i]);
      const diff = (curr - prev) / (1000 * 60 * 60 * 24);
      run = diff === 1 ? run + 1 : 1;
    }
    if (run > best) best = run;
  }

  document.getElementById('current-streak').textContent = current;
  document.getElementById('best-streak').textContent = best;
  document.getElementById('total-workouts').textContent = total;
}

/* Render workout history list, newest first */
function renderHistory() {
  const el = document.getElementById('workout-history');
  if (workoutLog.length === 0) {
    el.innerHTML = '<div class="no-history">No workouts logged yet. Log your first one above!</div>';
    return;
  }
  const sorted = [...workoutLog].sort((a, b) => b.date.localeCompare(a.date));
  el.innerHTML = sorted.map((entry, i) => `
    <div class="history-item">
      <div class="history-date">${formatDate(entry.date)}</div>
      <div class="history-name">${entry.workout}</div>
      <button class="history-delete" onclick="deleteLog(${entry.id})" title="Remove">✕</button>
    </div>
  `).join('');
}

/* Log a new workout entry */
function logWorkout() {
  const name = document.getElementById('log-workout-name').value;
  const date = document.getElementById('log-date').value;
  const msg = document.getElementById('log-msg');

  if (!name) { msg.style.color = '#e24b4a'; msg.textContent = 'Please select a workout.'; return; }
  if (!date) { msg.style.color = '#e24b4a'; msg.textContent = 'Please pick a date.'; return; }

  workoutLog.push({ id: Date.now(), workout: name, date });
  saveLog();
  msg.style.color = '#1D9E75';
  msg.textContent = `✓ ${name} logged for ${formatDate(date)}!`;
  document.getElementById('log-workout-name').value = '';
  renderWeekGrid();
  renderStats();
  renderHistory();
}

/* Delete a log entry by id */
function deleteLog(id) {
  workoutLog = workoutLog.filter(e => e.id !== id);
  saveLog();
  renderWeekGrid();
  renderStats();
  renderHistory();
}

/* Format date string to e.g. "Mon 31 Mar" */
function formatDate(str) {
  const d = new Date(str + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}
