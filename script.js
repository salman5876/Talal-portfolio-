// Cursor glow (desktop only)
const glow = document.getElementById('glow');
if (matchMedia('(pointer:fine)').matches) {
  addEventListener('pointermove', e => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; });
} else { glow.style.display = 'none'; }

// Viewfinder timecode
const tc = document.getElementById('tc'), t0 = Date.now();
setInterval(() => {
  const ms = Date.now() - t0, p = n => String(n).padStart(2, '0');
  tc.textContent = `${p(Math.floor(ms/3600000))}:${p(Math.floor(ms/60000)%60)}:${p(Math.floor(ms/1000)%60)}:${p(Math.floor(ms%1000/41.7))}`;
}, 41);

// Hide the "add video" placeholder once a video file loads
document.querySelectorAll('video').forEach(v => {
  const ph = v.parentElement.querySelector('.vf-empty');
  const show = () => { if (ph) ph.style.display = 'none'; v.style.display = ''; };
  v.style.display = 'none';
  v.addEventListener('loadeddata', show);
  v.addEventListener('error', () => { v.style.display = 'none'; });
  if (v.readyState >= 2) show();
});

// Contact form: opens the visitor's mail app addressed to Talal
// (To get messages straight to your inbox without a mail app, swap this for Formspree or EmailJS.)
const form = document.getElementById('form'), status = document.getElementById('status');
form.addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(form), name = d.get('name').trim(), mail = d.get('mail').trim(), msg = d.get('message').trim();
  status.className = 'status mono';
  if (!name || !/^\S+@\S+\.\S+$/.test(mail) || !msg) {
    status.classList.add('err');
    status.textContent = 'Add your name, a valid email and a message.';
    return;
  }
  const body = `${msg}\n\nFrom: ${name} (${mail})`;
  location.href = `mailto:talal.nadeem038@gmail.com?subject=${encodeURIComponent('Portfolio message from ' + name)}&body=${encodeURIComponent(body)}`;
  status.textContent = 'Opening your mail app. Press send there to finish.';
});

document.getElementById('yr').textContent = new Date().getFullYear();

// Hero video sound. Browsers only allow sound after a click, so it starts muted and this button turns it on.
const reel = document.getElementById('reel'), snd = document.getElementById('snd');
function setSound(on){ reel.muted = !on; snd.setAttribute('aria-pressed', on); snd.textContent = on ? 'Sound on' : 'Sound off'; if (on) reel.play().catch(()=>{}); }
snd.addEventListener('click', () => setSound(reel.muted));
// Mute the hero video when a case study video starts playing
document.querySelectorAll('.case video').forEach(v => v.addEventListener('play', () => setSound(false)));

