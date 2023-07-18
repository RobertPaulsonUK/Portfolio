//Time-Count
document.addEventListener('DOMContentLoaded', () => {
    const setDay = new Date('Sep 10 2023 00:00:00');

    const daysVal = document.querySelector('.day-val');
    const hoursVal = document.querySelector('.hour-val');
    const minutesVal = document.querySelector('.minute-val');
    const secondsVal = document.querySelector('.second-val');

    const daysText = document.querySelector('.day-text');
    const hoursText = document.querySelector('.hour-text');
    const minutesText = document.querySelector('.minute-text');
    const secondsText = document.querySelector('.second-text');

    function declOfNum(number, titles) {  
        let cases = [2, 0, 1, 1, 1, 2];  
        return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
    }

    const timeCount = () => {
        let now = new Date();
        let leftUntil = setDay - now;
        let days = Math.floor( leftUntil / 1000 / 60 / 60 / 24 );
        let hours = Math.floor( leftUntil / 1000 / 60 / 60 ) % 24;
        let minutes = Math.floor( leftUntil / 1000 / 60 ) % 60;
        let seconds = Math.floor( leftUntil / 1000 ) % 60;

        daysVal.innerHTML = days;
        hoursVal.innerHTML = hours;
        minutesVal.innerHTML = minutes;
        secondsVal.innerHTML = seconds;

        daysText.textContent = declOfNum(days, ['день', 'дня', 'дней']);
        hoursText.textContent = declOfNum(hours, ['чвс', 'часа', 'часов']);
        minutesText.textContent = declOfNum(minutes, ['минута', 'минуты', 'минут']);
        secondsText.textContent = declOfNum(seconds, ['секунда', 'секунды', 'секунд']);
    };
    timeCount();
    setInterval(timeCount, 1000);


//Fill-line
    const progressAnimation = () => {
        let line = document.querySelector('.fill-line__element');
        let lineInner = document.querySelector('.fill-line__progress');
        let finish = document.querySelector('.fiil-line__end').textContent;
        let progress = document.querySelector('.fill-lane__done').textContent;

        let persentageProgress = Math.floor( progress / finish * 100);
        lineInner.style.width = `${persentageProgress}%`;
    };

    progressAnimation();

//Circle-anim
    const circleAnimation = () => {
        const circle = document.querySelector('.progress')
        let radius = circle.getAttribute('r');
        let circleLength = 2 * Math.PI * radius ;
        let scrollTop = window.scrollY;
        let windowHeight = window.innerHeight;
        let siteHeight = document.documentElement.scrollHeight;
        let percentageProgress = Math.floor( scrollTop / (siteHeight - windowHeight ) * 100 );

        circle.setAttribute('stroke-dasharray', circleLength);
        circle.setAttribute('stroke-dashoffset', - circleLength - circleLength * percentageProgress / 100 );
    };
    circleAnimation();
    window.addEventListener('scroll',() => {
        circleAnimation();
    }); 
//Arrow-up
    const moveUpAnimation = () => {
        const arrow = document.querySelector('.circle-arrow');
        const startElement = document.querySelector('.start__subtitle');
        let scrollTop = window.scrollY;
        let setHeight = startElement.offsetTop;
        
        if (scrollTop>= setHeight){
            arrow.classList.add('circle-arrow--active');
        }else{
            arrow.classList.remove('circle-arrow--active');
        };

    };
    moveUpAnimation ();
    window.addEventListener('scroll',() => {
        moveUpAnimation();
    });
    const arrow = document.querySelector('.circle-arrow');
    arrow.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
    //Scrollbar
    const scrollItems = document.querySelectorAll('.scroll-item');

    const scrollAnimation = () => {
        let windowCenter = (window.innerHeight / 2) + window.scrollY;
        scrollItems.forEach(el => {
            let scrollOffset = el.offsetTop;
            let scrollBackOffset = el.offsetTop - (window.innerHeight / 2);
            let scrollForwardOffset = el.offsetTop + el.offsetHeight + (window.innerHeight / 2);
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

    /* Gamburger--- */
    const menuHide = () => {
        const menuBtn = document.querySelector('.menu__btn');
        const menu = document.querySelector('.nav__list');
        menuBtn.addEventListener('click', () => {
            menu.classList.toggle('nav__list--active');
        });
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('menu__btn--active');
        });
    } ;
    menuHide();
});
