const tabItem = document.querySelectorAll('.tabs__btn');
const tabContent = document.querySelectorAll('.tabs__content-item');


tabItem.forEach(function (element) {
    element.addEventListener('click', open);

});
function open(evt) {
    const tabTarget = evt.currentTarget;
    const button = tabTarget.dataset.button;


    tabItem.forEach(function(item){
        item.classList.remove('tabs__btn--active');
    })
    tabTarget.classList.add('tabs__btn--active');
    tabContent.forEach(function(item){
        item.classList.remove('tabs__content-item--active');
    })
    document.querySelector(`#${button}`).classList.add('tabs__content-item--active');
};
//Scrollbar
document.addEventListener('DOMContentLoaded', () => {
    const scrollItems = document.querySelectorAll('.scroll-item');

    const scrollAnimation = () => {
        let windowCenter = (window.innerHeight / 2) + window.scrollY;
        scrollItems.forEach(el => {
            let scrollOffset = el.offsetTop + (el.offsetHeight / 2);
            let scrollBackOffset = el.offsetTop + (el.offsetHeight / 2) - (window.innerHeight / 2);
            let scrollForwardOffset = el.offsetTop + (el.offsetHeight / 2) + (window.innerHeight / 2);
            if (windowCenter >= scrollOffset) {
                el.classList.add('animation-class');
            }if (windowCenter<= scrollBackOffset){
                el.classList.remove('animation-class');
            }if (windowCenter>= scrollForwardOffset){
                el.classList.remove('animation-class');
            }
        });
    };

    scrollAnimation();
    window.addEventListener('scroll',() => {
        scrollAnimation();
    });
});
window.onload = function () {
    document.addEventListener('click', documentActions);
}
//Отслеживания клика
function documentActions(e) {
    e.preventDefault();
    const targetElement = e.target;
    
    if (targetElement.classList.contains('header__footer-link')) {
        const modalCookies = document.querySelector('.header__footer');
        modalCookies.style.display = 'none';
    }
}
/* Gamburger--- */
const menuBtn = document.querySelector('.menu__btn');
const menu = document.querySelector('.nav__list');

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('nav__list--active');
});

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('menu__btn--active');
});