isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
window.onload = function () {
    document.addEventListener('click', documentActions);

}
//Отслеживания клика
function documentActions(e) {
    const targetElement = e.target;
    //Input-Radio
    if (targetElement.classList.contains('input-title')) {
        const allRadioElements = document.querySelectorAll('.form-top__item');
        const radioElement = targetElement.closest('.form-top__item');
        const radioInput = radioElement.querySelector('.contacts-form__radio');
        const allRadioInputs = document.querySelectorAll('.contacts-form__radio');
        allRadioElements.forEach(elem => {
            elem.classList.remove('_active');
        });
        allRadioInputs.forEach(elem => {
            elem.removeAttribute('checked');
        });
        radioInput.checked == true;
        radioElement.classList.add('_active');
    };
    if (targetElement.classList.contains('menu-btn') || targetElement.closest('.menu-btn')) {
        const menu = document.querySelector('.header__inner-body');
        const menuBtn = document.querySelector('.menu-btn');
        menu.classList.toggle('_active');
        menuBtn.classList.toggle('_active');
    }
}
//Radio-checked set
const radioInputs = document.querySelectorAll('.contacts-form__radio');
radioInputs.forEach(input => {
    if(input.checked) {
        input.closest('.form-top__item').classList.add('_active');
    }
});
//Promo-swipe-element
if (window.innerWidth <= 1000) {
    const promoTitle = document.querySelector('.promo__title');
    const newPromoPlace = document.querySelector('.promo__inner')
    newPromoPlace.append(promoTitle)
}
// SWIPE FOOTER ELEMENT
if (window.innerWidth <= 768) {
    const footerElem = document.querySelector('.top-footer__links') ;
    const footerPlace = document.querySelector('.main-footer');
    footerPlace.append(footerElem);
}
//Accordion
const accordionItem = document.querySelectorAll('.accordion-btn');
const accordionContent = document.querySelectorAll('.accordion__content');

accordionItem.forEach(function (element) {
    element.addEventListener('click', open);

});
function open(evt) {
    const accordionTarget = evt.currentTarget;
    const button = accordionTarget.dataset.button;
    const accordion = document.querySelector(`#${button}`).closest('.work-accordion');

    accordionTarget.classList.toggle('_active');
    document.querySelector(`#${button}`).classList.toggle('_active');
    accordion.classList.toggle('_active');
};

//Swiper
if (document.querySelector('.test__slider')) {
    new Swiper('.test__slider', {
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        initialSlide: 2,
        spaceBetween: 50,
        watchOverflow: true,
        speed: 800,
        loop: false,
        loopAdditionalSlides: 5,
        preloadImages: false,
        pagination: {
            el: ('.test__slider-pagination'),
            clickable: true,
        },
        navigation: {
            nextEl: ('.test__slider .arrow-next'),
            prevEl: ('.test__slider .arrow-prev'),
        }
    });
    const bullets = document.querySelectorAll('.test__slider-pagination span');
    bullets.forEach(bullet => {
        bullet.classList.add('_icon-star');
    })
}
//ANIMATION
const text = document.querySelector('.promo__subtitle');
const splitText = (el) => {
	el.innerHTML = el.textContent.replace(/(\S*)/g, m => {
    return `<div class="word">` +
			m.replace(/(-|#|@)?\S(-|#|@)?/g, "<div class='letter'>$&</div>") +
			`</div>`;
	});
	return el;
};
const split = splitText(text);
function random(min, max) {
    return (Math.random() * (max - min)) + min;
}
Array.from(document.querySelectorAll('.letter')).forEach((el, ind) => {
    gsap.from(el, 2, {
		opacity: 0,
		scale: .1,
		x: random(-500, 500),
		y: random(-500, 500),
		z: random(-500, 500),
		delay: ind * 0.02,
		repeat: 0,
	})
})
let tl = gsap.timeline();
tl.from('.header', {opacity: 0, y: -100, duration : 1.5})
    .from('.promo__title', {y : -200, opacity: 0, duration: .5})
    .from('.promo-image', {X: 100, opacity: 0, scale: .2, duration: .5}, "+=1.5")
    .from('.link-promo_favourite', {scale: .3, opacity: 0, x: random(-500, 500), y: random(-500, 500), z: random(-500, 500), duration:1})
    .from('.link-promo_share', {scale: .3, opacity: 0, x: random(-500, 500), y: random(-500, 500), z: random(-500, 500), duration:1})
    .from('.link-promo_play', {scale: .3, opacity: 0, x: random(-500, 500), y: random(-500, 500), z: random(-500, 500), duration:1})
    .from('.link-promo_location', {scale: .3, opacity: 0, x: random(-500, 500), y: random(-500, 500), z: random(-500, 500), duration:1})
    .fromTo('.promo__inner .main-btn', {scale: .2, y : 200, opacity: 0},{scale: 1, y : 0, opacity: 1, duration: 1}, "-=4")