
const cursor = document.querySelector('.cursor');
const cursorInner = document.querySelector('.cursor-move-inner');
const cursorOuter = document.querySelector('.cursor-move-outer');
let navlinks = document.querySelectorAll('.sk-flex li');
let footerlink = document.querySelectorAll('.sk-footer li');
const trigger = document.querySelector('button');
let headerText = document.querySelector('.sk-main-text h1');
let but = document.querySelectorAll('.sk-but');
let svg = document.querySelector('.sk-svg');
let svgCircle = document.querySelector('.sk-circle');
let bechance = document.querySelector('.sk-behance-text');
let workText = document.querySelectorAll('.sk-header a');
let github = document.querySelector('.github');
let section = document.querySelector('.sk-contianer');
let githubCrad = document.querySelectorAll('.sk-github-card-container');
let behanceCard = document.querySelectorAll('.sk-card-behance-container');
let mouseX = 0;
let mouseY = 0;
let mouseA = 0;

let innerX = 0;
let innerY = 0;

let outerX = 0;
let outerY = 0;

let loop = null;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (!loop) {
    loop = window.requestAnimationFrame(render);
  }
});
behanceCard.forEach(card => {
  card.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor----hover');
  });
  card.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor----hover');
  });
});
githubCrad.forEach(card => {
  card.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor----hover');
  });
  card.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor----hover');
  });
});
bechance.addEventListener('mouseenter', () => {
  cursor.classList.add('cursor--hover');
  bechance.classList.add('bechance-hover');
});
bechance.addEventListener('mouseleave', () => {
  cursor.classList.remove('cursor--hover');
  bechance.classList.remove('bechance-hover');
});
github.addEventListener('mouseenter', () => {
  cursor.classList.add('cursor---hover');
  github.classList.add('github-hover');
});
github.addEventListener('mouseleave', () => {
  cursor.classList.remove('cursor---hover');
  github.classList.remove('github-hover');
});
let workTextSize = workText.length;
for (let i = 1; i < workTextSize - 1; i++) {
  workText[i].addEventListener('mouseenter', () => {
    cursor.classList.add('cursor--hover');
    workText[i].classList.add('work-text-hover');
  });
  workText[i].addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor--hover');
    workText[i].classList.remove('work-text-hover');
  });
};
footerlink.forEach(link => {
  link.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor--hover');
    link.classList.add('hover-links');
  });
  link.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor--hover');
    link.classList.remove('hover-links');
  });
});
but.forEach(but => {

  but.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor-----hover');
    but.classList.add('but-hover');
  });
  but.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor-----hover');
    but.classList.remove('but-hover');
  });

});
navlinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor--hover');
    link.classList.add('hover-links');
  });
  link.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor--hover');
    link.classList.remove('hover-links');
  });

});
function render() {
  // stats.begin();

  loop = null;

  innerX = lerp(innerX, mouseX, 0.15);
  innerY = lerp(innerY, mouseY, 0.15);

  outerX = lerp(outerX, mouseX, 0.13);
  outerY = lerp(outerY, mouseY, 0.13);

  const angle = Math.atan2(mouseY - outerY, mouseX - outerX) * 180 / Math.PI;

  const normalX = Math.min(Math.floor((Math.abs(mouseX - outerX) / outerX) * 1000) / 1000, 1);
  const normalY = Math.min(Math.floor((Math.abs(mouseY - outerY) / outerY) * 1000) / 1000, 1);
  const normal = normalX + normalY * .5;
  const skwish = normal * .7;

  cursorInner.style.transform = `translate3d(${innerX}px, ${innerY}px, 0)`;
  cursorOuter.style.transform = `translate3d(${outerX}px, ${outerY}px, 0) rotate(${angle}deg) scale(${1 + skwish}, ${1 - skwish})`;

  // stats.end();

  // Stop loop if interpolation is done.
  if (normal !== 0) {
    loop = window.requestAnimationFrame(render);
  }
}

function lerp(s, e, t) {
  return (1 - t) * s + t * e;
}
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};
