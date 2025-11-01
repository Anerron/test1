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
        // убрать активные состояния у всех форм перед показом нужной
        $('.login-form, .contacts-form').removeClass('active').hide();
        $('.overlay').addClass('active').fadeIn();
        $('.login-form').addClass('active').fadeIn();
    });

    $('.login-form__cross').on('click', function() {
        $('.overlay').fadeOut("slow", function() {
            $(this).removeClass('active');
            // при закрытии убрать класс active у форм
            $('.login-form, .contacts-form').removeClass('active').hide();
        });
    });

    $('[data-modal=contacts]').on('click', function (e) {
        e.preventDefault();
        var $form = $('.contacts__forms').first();
        if (!$form.length || !$form.valid()) {
            $form.validate();
            return;
        }
        $('.login-form, .contacts-form').removeClass('active').hide();
        $('.overlay').addClass('active').fadeIn();
        $('.contacts-form').addClass('active').fadeIn();
    });

    $('.contacts-form__cross').on('click', function() {
        $('.overlay').fadeOut("slow", function() {
            $(this).removeClass('active');
            $('.login-form, .contacts-form').removeClass('active').hide();
        });
    });

    //Код мэйлера
    $('form').submit(function (e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: 'POST',
            url: 'mailer/smar.php',
            data: $(this).serialize()
        }).done(function () {
            $(this).find('input').val('');


            $('form').trigger('reset');
        });
        return false;
    });
});