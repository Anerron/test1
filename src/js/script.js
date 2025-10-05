$(document).ready(function(){
    $('.product__slider').slick({
        dots: true,
        arrows: true,
        appendDots: $('.product__text'),
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/chevron-left-solid-full.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/chevron-right-solid-full.svg"></button>',
    });
});