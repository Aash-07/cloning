function showMenu(){
  const menu = document.querySelector('.menu-box');
  menu.style.display = 'flex';
}

function hideMenu(){
  const menu = document.querySelector('.menu-box');
  menu.style.display = 'none';
}


const track = document.querySelector('.carousel-track');
const cards = Array.from(document.querySelectorAll('.carousel-card'));
const visibleCards = 2; // Show 2 cards at a time
let currentIndex = 0;

// Clone first and last cards for infinite effect
for (let i = 0; i < visibleCards; i++) {
  track.appendChild(cards[i].cloneNode(true));
  track.insertBefore(cards[cards.length - 1 - i].cloneNode(true), track.firstChild);
}

let cardWidth = cards[0].offsetWidth + 40; // 40px margin
let totalCards = cards.length;
let position = -(cardWidth * visibleCards);
track.style.transform = `translateX(${position}px)`;

let startX = 0, isDragging = false, moved = false;
let autoplayInterval;

function setTrackPosition(animate = true) {
  track.style.transition = animate ? 'transform 0.5s cubic-bezier(.77,0,.18,1)' : 'none';
  track.style.transform = `translateX(${position}px)`;
}

function handleLoop() {
  if (currentIndex < 0) {
    currentIndex = totalCards - 1;
    position = -(cardWidth * (currentIndex + visibleCards));
    setTimeout(() => setTrackPosition(false), 500);
  } else if (currentIndex >= totalCards) {
    currentIndex = 0;
    position = -(cardWidth * visibleCards);
    setTimeout(() => setTrackPosition(false), 500);
  }
}

// Autoplay function
function startAutoplay() {
  autoplayInterval = setInterval(() => {
    if (!isDragging) {
      currentIndex++;
      position -= cardWidth;
      setTrackPosition();
      handleLoop();
    }
  }, 3000); // Change interval (3000ms = 3 seconds)
}

// Start autoplay
startAutoplay();

// Pause autoplay on interaction
track.addEventListener('mousedown', () => clearInterval(autoplayInterval));
track.addEventListener('touchstart', () => clearInterval(autoplayInterval));

// Restart autoplay after interaction
track.addEventListener('mouseup', () => startAutoplay());
track.addEventListener('touchend', () => startAutoplay());

/* Keep your existing event listeners below */
track.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX;
  moved = false;
});

track.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].pageX;
  moved = false;
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  moved = true;
  let dx = e.pageX - startX;
  track.style.transition = 'none';
  track.style.transform = `translateX(${position + dx}px)`;
});

document.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  moved = true;
  let dx = e.touches[0].pageX - startX;
  track.style.transition = 'none';
  track.style.transform = `translateX(${position + dx}px)`;
});

document.addEventListener('mouseup', (e) => {
  if (!isDragging) return;
  isDragging = false;
  let dx = e.pageX - startX;
  if (dx < -50) {
    currentIndex++;
    position -= cardWidth;
  } else if (dx > 50) {
    currentIndex--;
    position += cardWidth;
  }
  setTrackPosition();
  handleLoop();
});

document.addEventListener('touchend', (e) => {
  if (!isDragging) return;
  isDragging = false;
  let dx = e.changedTouches[0].pageX - startX;
  if (dx < -50) {
    currentIndex++;
    position -= cardWidth;
  } else if (dx > 50) {
    currentIndex--;
    position += cardWidth;
  }
  setTrackPosition();
  handleLoop();
});




document.querySelectorAll('.accordion-btn').forEach(function(btn, idx) {
  btn.addEventListener('click', function() {
    // Close all
    document.querySelectorAll('.accordion-btn').forEach(function(otherBtn, i) {
      if (otherBtn !== btn) {
        otherBtn.classList.remove('active');
        let otherContent = otherBtn.nextElementSibling;
        if (otherContent && otherContent.classList.contains('accordion-content')) {
          otherContent.style.display = 'none';
        }
      }
    });
    // Toggle this one
    btn.classList.toggle('active');
    let content = btn.nextElementSibling;
    if (content && content.classList.contains('accordion-content')) {
      content.style.display = btn.classList.contains('active') ? 'block' : 'none';
    }
  });
});