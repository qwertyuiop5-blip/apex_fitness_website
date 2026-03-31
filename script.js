/* ===== PAGE NAVIGATION ===== */
const PAGES = ['home', 'workouts', 'bmi', 'classes'];

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
}

/* ===== WORKOUTS DATA ===== */
const workouts = [
  {
    id: 1,
    name: 'Full Body Blast',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
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
    img: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&q=80',
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
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
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
    img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80',
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
    img: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80',
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
    img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80',
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
    img: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80',
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
    img: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80',
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
