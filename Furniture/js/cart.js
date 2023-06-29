
//Корзина товаров
//Функция добавления в корзину и полет
function addToCart(productButton, productId) {
    if (!productButton.classList.contains('hold')) {
        productButton.classList.add('hold');
        productButton.classList.add('fly');
        const cartIcon = document.querySelector('.cart-header__icon');
        const product = document.querySelector(`[data-pid="${productId}"]`)
        const productImage = product.querySelector('.item-product__img');

        const productImageFly = productImage.cloneNode(true);
        const productImageFlyWidth = productImage.offsetWidth;
        const productImageFlyHeight = productImage.offsetHeight;
        const productImageFlyTop = productImage.getBoundingClientRect().top;
        const productImageFlyLeft = productImage.getBoundingClientRect().left;
        

        productImageFly.setAttribute('class', '_flyImage');
        productImageFly.style.cssText =
            `
        left : ${productImageFlyLeft}px;
        top : ${productImageFlyTop}px;
        width : ${productImageFlyWidth}px;
        height : ${productImageFlyHeight}px;
        `;
        document.body.append(productImageFly);
        const cloneFlyLeft = cartIcon.getBoundingClientRect().left;
        const cloneFlyTop = cartIcon.getBoundingClientRect().top;

        productImageFly.style.cssText = 
            `
        left : ${cloneFlyLeft}px;
        top : ${cloneFlyTop}px;
        width : 0px;
        height : 0px;
        opacity : 0;
        `;
        productImageFly.addEventListener('transitionend', function() {
            if (productButton.classList.contains('fly')) {
                productImageFly.remove();
                updateCart(productButton, productId);
                productButton.classList.remove('fly');
            }
        }) 
    };
};
//Генерация в саму корзину
function updateCart(productButton, productId, productAdd = true) {
    const cart = document.querySelector('.cart-header');
    const cartIcon = cart.querySelector('.cart-header__icon');
    const cartQuantity = cartIcon.querySelector('span');
    const cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`);
    const cartList = document.querySelector('.cart-list');
    //Добавляем
    if (productAdd) {
        if (cartQuantity){
            cartQuantity.innerHTML = ++cartQuantity.innerHTML;
        } else {
            cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
        }
        if (!cartProduct) {
            const product = document.querySelector(`[data-pid="${productId}"]`)
            const cartProductImage = product.querySelector('.item-product__image').innerHTML;
            const cartProductTitle = product.querySelector('.item-product__title').innerHTML;
            const cartProductPrice = product.querySelector('.item-product__price').innerHTML; 
            const cartProductContent = 
            `
            <a href="#" class="cart-list__image">${cartProductImage}</a>
            <div class="cart-list__body">
            <a class="cart-list__title" href"#">${cartProductTitle}</a>
            <div class="cart-list__price">${cartProductPrice}</div>
            <div class="cart-list__quantity">Quantity: <span>1</span></div>
            <a class="cart-list__delete" href="#">Delete</a>
            </div>
            `;
            cartList.insertAdjacentHTML('beforeend',`<li data-cart-pid="${productId}" class="cart-list__item">${cartProductContent}</li>`)
        } else {
            const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
            cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML; 
            
        }
        productButton.classList.remove('hold');
    } else {
        const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
        cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
        if (!parseInt(cartProductQuantity.innerHTML)) {
            cartProduct.remove();
        }
        const cartQuantityValue = --cartQuantity.innerHTML;
        if (cartQuantityValue) {
            cartQuantity.innerHTML = cartQuantityValue;
        } else {
            cartQuantity.remove();
            const cartBody = document.querySelector('.cart-header__body');
            cartBody.classList.remove('cart-header__body--active');
        }
    };
}


