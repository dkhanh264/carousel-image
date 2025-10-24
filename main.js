const track = document.querySelector('.slide-track');
const slides = [...document.querySelectorAll('.slide')];
const REAL_SLIDES_COUNT = slides.length;
const firstClone = slides[0].cloneNode(true);
track.appendChild(firstClone);
let i = 0;
const INTERVAL = 2500;
let intervalId = null;
let isTransitioning = false;

const update = () => { 
    track.style.transform = `translateX(-${i * 100}%)`; 
};



const goToSlide = (n) => {
    if (isTransitioning) return; 
    i = n;
    track.style.transition = 'transform 0.4s ease';
    update();
};

document.getElementById('next').onclick = () => { 
    if (isTransitioning) return;
    isTransitioning = true;
    i = i + 1; 
    track.style.transition = 'transform 0.4s ease';
    update(); 
};

document.getElementById('prev').onclick = () => { 
    if (isTransitioning) return;
    isTransitioning = true;
   i = (i - 1 + REAL_SLIDES_COUNT) % REAL_SLIDES_COUNT;
    
    track.style.transition = 'transform 0.4s ease';
    update(); 
};

const startAuto = () => { 
    stopAuto(); 
    intervalId = setInterval(() => {
        document.getElementById('next').click();
    }, INTERVAL);
};

const stopAuto  = () => { 
    if (intervalId) { 
        clearInterval(intervalId); 
        intervalId = null; 
    } 
};

track.addEventListener('transitionend', () => {
    if (i === REAL_SLIDES_COUNT) {
        track.style.transition = 'none';
        i = 0;
        update();     
    }
    requestAnimationFrame(() => {
        isTransitioning = false;
    });
});

const carousel = document.querySelector('.carousel-image');
carousel.addEventListener('mouseenter', stopAuto);
carousel.addEventListener('mouseleave', startAuto);

update();
startAuto();