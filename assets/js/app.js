/* Kindred — demo viewer console.
   Entirely simulated: no camera, no microphone, no network, no storage of anything real.
   Everything below is a timer, a canvas and some generated SVG. */

const $ = (sel) => document.querySelector(sel);

/* ------------------------------------------------------------------ state */
const state = {
  elapsed: 134,          // seconds
  viewers: 4,
  bitrate: 2.4,
  quality: '1080p',
  battery: 87,
  speed: 4.1,
  accuracy: 6,
  siren: false,
  scene: 'street',
  sceneIndex: 0,
  trail: [],
  pos: { x: 160, y: 160 },
  heading: -0.6,
  pins: [],
  clips: 6,
};

const SCENES = ['street', 'night', 'park', 'campus'];
const PLACES = ['Elm St & 4th Ave · Northside', 'Riverside Path · Mile 2', 'Transit Plaza · East Gate', 'Oak Row · Block 300'];

const MEMBERS = [
  { name: 'Maya R.',   role: 'Streaming now',         status: 'live', hue: 'linear-gradient(135deg,#f0384f,#ff6b81)' },
  { name: 'Rosa A.',   role: 'Watching · phone',      status: 'ok',   hue: 'linear-gradient(135deg,#6d47f5,#8b6cff)' },
  { name: 'Devon M.',  role: 'Watching · tablet',     status: 'ok',   hue: 'linear-gradient(135deg,#f5a623,#ffd479)' },
  { name: 'Priya K.',  role: 'Watching · web',        status: 'ok',   hue: 'linear-gradient(135deg,#16b97a,#3ddc97)' },
  { name: 'Sam O.',    role: 'Notified · no answer',  status: 'idle', hue: 'linear-gradient(135deg,#4cc4ff,#8b6cff)' },
  { name: 'Grandma J.', role: 'Offline since 18:20',  status: 'idle', hue: 'linear-gradient(135deg,#7f78a6,#b3acd8)' },
];

/* ------------------------------------------------------------------ helpers */
const pad = (n) => String(n).padStart(2, '0');
const mmss = (s) => `${pad(Math.floor(s / 60))}:${pad(Math.floor(s % 60))}`;
function clockNow(offsetMin = 0) {
  // Fixed clock so screenshots are reproducible; the demo isn't tied to real time.
  const base = 21 * 60 + 4 + offsetMin;
  return `${pad(Math.floor(base / 60) % 24)}:${pad(base % 60)}`;
}

/* ------------------------------------------------------------------ circle list */
function renderMembers() {
  $('#members').innerHTML = MEMBERS.map((m, i) => `
    <div class="member${i === 0 ? ' active' : ''}">
      <span class="avatar" style="background:${m.hue}">${m.name.slice(0, 1)}${m.name.split(' ')[1]?.[0] || ''}</span>
      <span>
        <span class="member__name">${m.name}</span><br>
        <span class="member__state">${m.role}</span>
      </span>
      <i class="pip pip--${m.status}"></i>
    </div>`).join('');
  $('#circle-count').textContent = `${MEMBERS.length} members`;
}

/* ------------------------------------------------------------------ alert feed */
const FEED_STYLES = {
  sos:    { bg: 'var(--rose-500)',  fg: '#fff',    icon: '!' },
  stream: { bg: 'var(--brand-500)', fg: '#fff',    icon: '▶' },
  geo:    { bg: 'var(--sky-400)',   fg: '#04203a', icon: '◎' },
  ok:     { bg: 'var(--mint-500)',  fg: '#04220f', icon: '✓' },
  warn:   { bg: 'var(--amber-500)', fg: '#2a1a03', icon: '▲' },
};

let feedSeq = 0;
function pushEvent(kind, title, detail) {
  const s = FEED_STYLES[kind] || FEED_STYLES.ok;
  const row = document.createElement('div');
  row.className = 'event';
  row.innerHTML = `
    <span class="event__icon" style="background:${s.bg};color:${s.fg}">${s.icon}</span>
    <span><b>${title}</b><br><span>${detail}</span></span>
    <span class="event__time">${clockNow(feedSeq++)}</span>`;
  const feed = $('#feed');
  feed.prepend(row);
  while (feed.children.length > 40) feed.lastChild.remove();
}

function seedFeed() {
  pushEvent('ok', 'Left home', 'Safe place “Home” · departed on foot');
  pushEvent('stream', 'Stream started', 'Maya R. · rear camera · 1080p');
  pushEvent('geo', 'Circle notified', '4 of 6 members opened the stream');
  pushEvent('warn', 'Weak signal', 'Bitrate dropped to 1.6 Mbps for 12s');
  pushEvent('ok', 'Signal recovered', 'Back to 1080p · buffered 9s uploaded');
}

/* ------------------------------------------------------------------ clips */
const CLIP_SCENES = ['street', 'night', 'park', 'campus', 'night', 'street'];
const CLIP_TITLES = [
  ['Walk home from shift', '2:41 · Elm St'],
  ['Late run, riverside', '11:08 · Riverside'],
  ['Waiting for the 22 bus', '4:15 · Transit Plaza'],
  ['Campus to car park', '6:32 · East Gate'],
  ['Cab ride check-in', '18:04 · Downtown'],
  ['Test broadcast', '0:38 · Home'],
];

function renderClips() {
  $('#clips').innerHTML = CLIP_TITLES.map(([t, sub], i) => `
    <article class="clip">
      <div class="clip__thumb"><canvas data-clip="${CLIP_SCENES[i]}"></canvas><span>${t.length % 3 + 1}:${pad((i * 17) % 60)}</span></div>
      <div class="clip__body"><b>${t}</b><span>${sub}</span></div>
    </article>`).join('');
  document.querySelectorAll('canvas[data-clip]').forEach((c) => {
    c.style.width = '100%'; c.style.height = '100%';
    window.KindredScene(c, c.dataset.clip);
  });
  $('#clip-count').textContent = String(CLIP_TITLES.length);
}

/* ------------------------------------------------------------------ map */
function stepPosition() {
  state.heading += (Math.sin(state.elapsed / 9) * 0.16);
  const stride = 3.2;
  state.pos.x += Math.cos(state.heading) * stride;
  state.pos.y += Math.sin(state.heading) * stride;
  // keep inside the tile
  state.pos.x = Math.max(18, Math.min(302, state.pos.x));
  state.pos.y = Math.max(18, Math.min(302, state.pos.y));
  if (state.pos.x <= 18 || state.pos.x >= 302) state.heading = Math.PI - state.heading;
  if (state.pos.y <= 18 || state.pos.y >= 302) state.heading = -state.heading;

  state.trail.push([Math.round(state.pos.x), Math.round(state.pos.y)]);
  if (state.trail.length > 90) state.trail.shift();

  $('#trail').setAttribute('points', state.trail.map((p) => p.join(',')).join(' '));
  $('#dot').setAttribute('cx', state.pos.x); $('#dot').setAttribute('cy', state.pos.y);
  $('#ping-ring').setAttribute('cx', state.pos.x); $('#ping-ring').setAttribute('cy', state.pos.y);
}

function dropPin() {
  const { x, y } = state.pos;
  state.pins.push([Math.round(x), Math.round(y)]);
  $('#pins').innerHTML = state.pins.map(([px, py]) =>
    `<g transform="translate(${px} ${py})">
       <path d="M0 2 L5 -8 A5.6 5.6 0 1 0 -5 -8 Z" fill="var(--amber-500)"/>
       <circle cx="0" cy="-10" r="2.2" fill="#2a1a03"/>
     </g>`).join('');
  pushEvent('geo', 'Pin dropped', `Marker ${state.pins.length} saved at the current position`);
}

/* ------------------------------------------------------------------ stage */
function mountStage() {
  const cv = $('#stage-canvas');
  cv.style.width = '100%'; cv.style.height = '100%';
  window.KindredScene(cv, state.scene);
}

/* ------------------------------------------------------------------ ticker */
function tick() {
  state.elapsed += 1;
  state.battery = Math.max(4, +(state.battery - 0.0035).toFixed(3));
  state.speed = +(3.2 + Math.sin(state.elapsed / 7) * 1.6).toFixed(1);
  state.accuracy = Math.max(3, Math.round(6 + Math.sin(state.elapsed / 11) * 3));
  state.bitrate = +(state.quality === '1080p'
    ? 2.4 + Math.sin(state.elapsed / 5) * 0.35
    : 0.9 + Math.sin(state.elapsed / 5) * 0.2).toFixed(1);

  $('#kpi-time').textContent = mmss(state.elapsed);
  $('#hud-clock').textContent = mmss(state.elapsed);
  $('#kpi-viewers').textContent = state.viewers;
  $('#kpi-bitrate').textContent = state.bitrate;
  $('#kpi-battery').textContent = Math.round(state.battery) + '%';
  $('#kpi-speed').textContent = state.speed;
  $('#kpi-acc').textContent = state.accuracy + 'm';
  $('#hud-quality').textContent = `${state.quality} · ${state.bitrate} Mbps`;
  $('#hud-gps').textContent = `GPS lock · ${state.accuracy} m`;
  $('#map-updated').textContent = `updated ${state.elapsed % 3}s ago`;

  stepPosition();

  // occasional ambient events so the feed feels alive
  if (state.elapsed % 23 === 0) pushEvent('geo', 'Location updated', `Moving ${state.speed} km/h · accuracy ${state.accuracy} m`);
  if (state.elapsed % 61 === 0) pushEvent('ok', 'Viewer joined', 'Priya K. opened the stream on web');
}

/* ------------------------------------------------------------------ controls */
function wireControls() {
  $('#btn-scene').addEventListener('click', () => {
    state.sceneIndex = (state.sceneIndex + 1) % SCENES.length;
    state.scene = SCENES[state.sceneIndex];
    mountStage();
    $('#hud-place').textContent = PLACES[state.sceneIndex];
    pushEvent('stream', 'Camera switched', `Now showing ${state.sceneIndex % 2 ? 'front' : 'rear'} camera · ${PLACES[state.sceneIndex]}`);
  });

  $('#btn-quality').addEventListener('click', (e) => {
    const low = state.quality === '1080p';
    state.quality = low ? '480p' : '1080p';
    e.currentTarget.textContent = low ? 'Back to 1080p' : 'Drop to 480p';
    pushEvent('warn', low ? 'Quality reduced' : 'Quality restored',
      low ? 'Low-power mode · 480p, ~7% battery per hour' : 'Full quality · 1080p, ~12% battery per hour');
  });

  $('#btn-siren').addEventListener('click', (e) => {
    state.siren = !state.siren;
    $('#hud-siren').hidden = !state.siren;
    $('#hud-siren').className = 'chip ' + (state.siren ? 'chip--warn' : '');
    e.currentTarget.classList.toggle('siren-on', state.siren);
    e.currentTarget.textContent = state.siren ? 'Silence siren' : 'Sound siren';
    pushEvent(state.siren ? 'sos' : 'ok', state.siren ? 'Panic siren on' : 'Panic siren off',
      state.siren ? '110 dB · screen strobing · stream continues in background' : 'Siren stopped by the streamer');
  });

  $('#btn-pin').addEventListener('click', dropPin);

  $('#btn-clip').addEventListener('click', () => {
    state.clips += 1;
    pushEvent('ok', 'Clip saved', `${mmss(state.elapsed)} of footage encrypted and archived`);
  });

  $('#btn-sos').addEventListener('click', () => {
    state.viewers = MEMBERS.length;
    pushEvent('sos', 'SOS triggered', 'All 6 members alerted · push + SMS fallback sent');
    pushEvent('geo', 'Location attached', `${PLACES[state.sceneIndex]} · accuracy ${state.accuracy} m`);
    MEMBERS.forEach((m) => { if (m.status === 'idle') { m.status = 'ok'; m.role = 'Alerted · opening stream'; } });
    renderMembers();
    document.querySelector('.stage').animate(
      [{ boxShadow: 'inset 0 0 0 0 rgba(240,56,79,0)' },
       { boxShadow: 'inset 0 0 0 10px rgba(240,56,79,.85)' },
       { boxShadow: 'inset 0 0 0 0 rgba(240,56,79,0)' }],
      { duration: 1400, iterations: 3 });
  });

  $('#btn-clear').addEventListener('click', () => { $('#feed').innerHTML = ''; });
  $('#btn-theme-demo').addEventListener('click', () => document.querySelector('[data-theme-toggle]')?.click());
}

/* ------------------------------------------------------------------ boot */
window.addEventListener('load', () => {
  renderMembers();
  renderClips();
  seedFeed();
  mountStage();
  wireControls();
  // seed a short trail so the map isn't empty on first paint
  for (let i = 0; i < 26; i++) stepPosition();
  setInterval(tick, 1000);
});
