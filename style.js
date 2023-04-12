
const images = document.querySelectorAll('.slider-slide');
const sliderLine = document.querySelector('.slider-line');

let count = 0;
let width;

function init() {
  console.log('resize');
  width = document.querySelector('.slider-slide').offsetWidth;
  sliderLine.style.width = width * images.lenght + 'px';

  images.forEach(item => {
    item.style.width = width + 'px';
    item.style.height = 'auto';
  });
}

window.addEventListener('resize', init);
init();

document.querySelector('.prev').addEventListener('click', function () {
  count++;
  if (count >= images.length) {
    count = 0;
  }
  rollSlider();
});

document.querySelector('.next').addEventListener('click', function () {
  count--;
  if (count < 0) {
    count = images.length - 1;
  }
  rollSlider();
});


function rollSlider() {
  sliderLine.style.transform = 'translate(-' + count * width + 'px)';
}



const header = document.querySelector('.header');

window.onscroll = () =>{
  if(window.pageYOffset > 200){ 
    header.classList.add("sticky");
  }else{
    header.classList.remove("sticky");
  }
};




header.addEventListener('click', event => {
  if (event.target.classList.contains('menu-link')) {
    event.preventDefault();

    const targetId = event.target.getAttribute('href').slice(1);
    const targetElement = document.getElementById(targetId);
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;

    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, 600);
      window.scrollTo(0, run);
      if (timeElapsed < 600) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }
});



const sections = document.querySelectorAll("section");
  const menuLinks = document.querySelectorAll(".menu-link");

  const activateMenuItem = () => {
    for (const section of sections) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
  
      if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
        currentSection = section;
      } else {
        break;
      }
    }

    menuLinks.forEach((link) => {
      link.classList.toggle("active", link.hash === `#${currentSection.id}`);
    });
  };
  window.addEventListener("scroll", activateMenuItem);
 



const burger = document.querySelector('.burger-menu');
const menu = document.querySelector('.menu');

burger.addEventListener('click',()=>{
  burger.classList.toggle('is-active');
  menu.classList.toggle('open');
});