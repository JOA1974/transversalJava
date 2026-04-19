const words = [...document.querySelectorAll('.word')];
const pulseButton = document.getElementById('pulseButton');
const themeButton = document.getElementById('themeButton');
const root = document.documentElement;
const cursorGlow = document.querySelector('.cursor-glow');
const particles = document.querySelector('.particles');

//Modificaciones para commit como anotaciones

let activeIndex = 0;
let theme = 'dark';

function activateWord(index) {
  words.forEach((word, i) => word.classList.toggle('active', i === index));
}

function cycleWords() {
  activateWord(activeIndex);
  activeIndex = (activeIndex + 1) % words.length;
}

function createParticles() {
  const count = 20;
  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.bottom = `${-10 - Math.random() * 40}px`;
    particle.style.animationDuration = `${8 + Math.random() * 8}s`;
    particle.style.animationDelay = `${Math.random() * 6}s`;
    particle.style.opacity = `${0.2 + Math.random() * 0.5}`;
    particle.style.transform = `scale(${0.7 + Math.random() * 1.4})`;
    particles.appendChild(particle);
  }
}

words.forEach((word, index) => {
  word.addEventListener('mouseenter', () => activateWord(index));
  word.addEventListener('focus', () => activateWord(index));
});

pulseButton.addEventListener('click', () => {
  words.forEach((word, index) => {
    setTimeout(() => {
      activateWord(index);
      word.animate(
        [
          { transform: 'translateY(0) scale(1)', filter: 'brightness(1)' },
          { transform: 'translateY(-10px) scale(1.08)', filter: 'brightness(1.35)' },
          { transform: 'translateY(0) scale(1)', filter: 'brightness(1)' }
        ],
        { duration: 650, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
      );
    }, index * 120);
  });
});

themeButton.addEventListener('click', () => {
  theme = theme === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', theme);
});

window.addEventListener('pointermove', (event) => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

createParticles();
cycleWords();
setInterval(cycleWords, 1400);