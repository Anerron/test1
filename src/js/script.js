$(document).ready(function(){
    //Код слайдера
    $('.product__slider').slick({
        dots: true,
        arrows: true,
        appendDots: $('.product__text'),
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/chevron-left-solid-full.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/chevron-right-solid-full.svg"></button>',
    });

    //Код валидатора форм
    $('.contacts__forms').validate({
        rules: {
            name: "required",
            message: "required",
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: "Please specify your name",
            message: "Please enter your message",
            email: {
                required: "We need your email address to contact you",
                email: "Your email address must be in the format of name@domain.com"
            }
        }
    });

    //Код модальных окон
    $('[data-modal=login__main]').on('click', function() {
        $('.overlay').addClass('active').fadeIn();
    });

    $('.login-form__cross').on('click', function() {
        $('.overlay').fadeOut("slow", function() {
            $(this).removeClass('active');
        });
    });
});