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
//Отслеживания клика
    function documentActions(e) {
        const targetElement = e.target;
        if(window.innerWidth > 768 && isMobile.any()) {
            if (targetElement.classList.contains('menu__arrow')){
                let menuItem = targetElement.closest('.menu__item');
                menuItem.classList.toggle('_hover');
            }
            if(!targetElement.classList.contains('menu__item') && !targetElement.classList.contains('menu__arrow') && document.querySelectorAll('.menu__item._hover').length > 0)  {
                let menuItems = document.querySelectorAll('.menu__item._hover');
                menuItems.forEach(function (item) {
                    item.classList.remove('_hover');
                })
            }
        };
        if (window.innerWidth < 769) {
            //Footer spoller
            if (targetElement.classList.contains('footer__inner-btn')) {
                let spollerItems = targetElement.closest('.footer__inner-column').children;
                spollerItemsArray = Array.from(spollerItems);
                spollerItemsArray.forEach(card => {
                    acarddeonAddClass(card, 'list-footer', 'list-footer--active')
                })
            };
            //Menu spoller
            if (targetElement.classList.contains('menu__arrow')){
                let menuItem = targetElement.closest('.menu__item');
                menuItem.classList.toggle('_hover');
            }
            if(!targetElement.classList.contains('menu__item') && !targetElement.classList.contains('menu__arrow') && document.querySelectorAll('.menu__item._hover').length > 0)  {
                let menuItems = document.querySelectorAll('.menu__item._hover');
                menuItems.forEach(function (item) {
                    item.classList.remove('_hover');
                })
            };
            function acarddeonAddClass (item, param, paramActive) {
                if(item.classList.contains(param)) {
                    item.classList.toggle(paramActive)
                }
            };
        };
        //Cart
        if (targetElement.classList.contains('add-btn')) {
            const productId = targetElement.closest('.item-product').dataset.pid;
            e.preventDefault();
            addToCart(targetElement,productId);
        };
        if (targetElement.classList.contains('cart-header__icon') || targetElement.closest('.cart-header__icon') || targetElement.classList.contains('close-btn')) {
            e.preventDefault();
            const cartList = document.querySelector('.cart-header__body');
            cartList.classList.toggle('cart-header__body--active');
        };
        if (targetElement.classList.contains('cart-list__delete')) {
            e.preventDefault();
            const productId = targetElement.closest('.cart-list__item').dataset.cartPid;
            updateCart(targetElement, productId, false);
        };
        //Gamburger
        if (targetElement.classList.contains('menu-btn') || targetElement.closest('.menu-btn')) {
            const menuItem = document.querySelector('.header__main');
            const menuBtn = document.querySelector('.menu-btn')
            menuBtn.classList.toggle('menu-btn--active');
            menuItem.classList.toggle('header__main--active');
        } else {
            if (!targetElement.classList.contains('header__main') && !targetElement.closest('.header__main') && !targetElement.closest('.menu')){
                const menuItem = document.querySelector('.header__main'); 
                const menuBtn = document.querySelector('.menu-btn')
                menuBtn.classList.remove('menu-btn--active');
                menuItem.classList.remove('header__main--active');
            }
        }
        //Search-button
        const searchForm = document.querySelector(".search-form__item");
        const promoSection = document.querySelector('.promo');
        if (targetElement.classList.contains('search-form__icon')) {
            searchForm.classList.toggle('search-form__item--active');
            promoSection.classList.toggle('promo--active');
        } else {
            if (!targetElement.classList.contains('search-form__input') || !targetElement.classList.contains('search-form__btn') || !targetElement.classList.contains('search-form__item')) {
                searchForm.classList.remove('search-form__item--active');
                promoSection.classList.remove('promo--active');
            }
        }
    }
    //Header
    const headerElement = document.querySelector('.header');
    const menuBtn = document.querySelector('.menu-btn');
    const callback = function (entries, observer) {
        if (entries[0].isIntersecting) {
            headerElement.classList.remove('scroll');
            menuBtn.classList.remove('scroll');
        } else {
            headerElement.classList.add('scroll');
            menuBtn.classList.add('scroll');
        }
    }
    const headerObserver = new IntersectionObserver(callback);
    headerObserver.observe(headerElement);
    const menuObserver = new IntersectionObserver(callback);
    menuObserver.observe(menuBtn);
}
//Furnitura Gallery
const furniture = document.querySelector('.gallery__body');
if (furniture && !isMobile.any()) {
    
    const furnitureItems = document.querySelector('.gallery__items');
    const furnitureColumn = document.querySelectorAll('.gallery__column');

    //Скорость анимации
    const speed = furniture.dataset.speed;

    let positionX = 0;
    let cordXprocent = 0;

    function setMouseGalleryStyle() {
        let furnitureItemWidth = 0;
        furnitureColumn.forEach(element => {
            furnitureItemWidth += element.offsetWidth;
        });
        const furnitureDifferent = furnitureItemWidth - furniture.offsetWidth;
        const distX = Math.floor(cordXprocent - positionX);

        positionX = positionX + (distX * speed);
        let position = furnitureDifferent / 200 * positionX;

        furnitureItems.style.cssText = `transform: translate3d(${-position}px,0,0);`;
        if (Math.abs(distX) > 0) {
            requestAnimationFrame(setMouseGalleryStyle);
        } else {
            furniture.classList.remove('init');
        }
        
    }

    furniture.addEventListener("mousemove", function(e) {
        //Получение ширины
        const furnitureWidth = furniture.offsetWidth;
        //Ноль на середине
        const cordX = e.pageX - furnitureWidth / 2;
            cordXprocent = cordX / furnitureWidth * 200;
        if (!furniture.classList.contains('init')) {
            requestAnimationFrame(setMouseGalleryStyle);
            furniture.classList.add('init')
        }
    })
}


if (document.querySelector('.promo__wrapper')) {
    new Swiper('.promo__wrapper', {
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        initialSlide: 2,
        spaceBetween: 32,
        watchOverflow: true,
        speed: 800,
        loop: true,
        loopAdditionalSlides: 5,
        preloadImages: false,
        parallax: true,
        pagination: {
            el: ('.controls-promo__dots'),
            clickable: true,
        },
        navigation: {
            nextEl: ('.controls-promo__arrows .arrow-next'),
            prevEl: ('.controls-promo__arrows .arrow-prev'),
        }
    })
};
if (document.querySelector('.rooms__slider')) {
    new Swiper('.rooms__slider', {
        observer: true,
        observeParents: true,
        initialSlide: 1,
        slidesPerView: 2,
        slidesPerGroup: 1,
        spaceBetween: 24,
        watchOverflow: true,
        speed: 1000,
        loop: true,
        preloadImages: false,
        parallax: true,
        pagination: {
            el: ('.rooms__slider-pagination'),
            clickable: true,
        },
        navigation: {
            nextEl: ('.rooms__slider .arrow-next'),
            prevEl: ('.rooms__slider .arrow-prev'),
        },
        breakpoints: {
            700: {
                slidesPerView: 2,
            },
            300: {
                slidesPerView: 1,
            },
        },
    })
};
if (document.querySelector('.tips__slider')) {
    new Swiper('.tips__slider', {
        slidesPerView: 3,
        slidesPerGroup: 1,
        freeMode: true,
        spaceBetween: 32,
        watchOverflow: true,
        speed: 800,
        loop: false,
        preloadImages: false,
        parallax: true,
        pagination: {
            el: ('.tips__slider-pagination'),
            clickable: true,
        },
        navigation: {
            nextEl: ('.tips__slider .arrow-next'),
            prevEl: ('.tips__slider .arrow-prev'),
        },
        breakpoints: {
            1100: {
                slidesPerView: 3,
            },
            800: {
                slidesPerView: 2,
            },
            300: {
                slidesPerView: 1,
            },
        },
    })

};


