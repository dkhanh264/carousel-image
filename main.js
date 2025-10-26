const track = document.querySelector('.slide-track');
const slides = [...document.querySelectorAll('.slide')];
const REAL_SLIDES_COUNT = slides.length;
const firstClone = slides[0].cloneNode(true);
const endClone = slides[REAL_SLIDES_COUNT - 1].cloneNode(true);
track.prepend(endClone);
track.appendChild(firstClone);
let i = 1;
const INTERVAL = 2500;
let intervalId = null;
let isTransitioning = false;

const update = () => { 
    track.style.transform = `translateX(-${i * 100}%)`; 
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
    i = i - 1; 
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
    if (i === REAL_SLIDES_COUNT + 1) {
        track.style.transition = 'none';
        i = 1;
        update();     
    } else if (i === 0){
        track.style.transition = 'none';
        i = REAL_SLIDES_COUNT;
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