const track = document.querySelector('.slide-track');
const slides = [...document.querySelectorAll('.slide')];
let i = 0;
const INTERVAL = 2500;
let intervalId = null;

const update = () => { 
    track.style.transform = `translateX(-${i * 100}%)`; 
};

const goToSlide = (n) => {
  if (n >= slides.length) {
        i = 0;
    } else if (n < 0) {
        i = slides.length - 1;
    } else {
        i = n;
    }
  update();
};

document.getElementById('next').onclick = () => { 
    i = i + 1; 
    if (i >= slides.length) {
        i = 0;
    }
    update(); 
};

document.getElementById('prev').onclick = () => { 
    i = i - 1;
    if (i < 0) {
        i = slides.length - 1;
    }
    update(); 
};

const startAuto = () => { 
    stopAuto(); 
    intervalId = setInterval(() => goToSlide(i + 1), INTERVAL); 
};

const stopAuto  = () => { 
    if (intervalId) { 
        clearInterval(intervalId); 
        intervalId = null; 
    } 
};

const carousel = document.querySelector('.carousel-image');
carousel.addEventListener('mouseenter', stopAuto);
carousel.addEventListener('mouseleave', startAuto);

update();
startAuto();