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

    //Код мэйлера (не работает)
    console.log('Form handler initialized');
    console.log('Forms found:', $('form').length);
    
    // Обработчик для формы с классом contacts__forms
    $('.contacts__forms').on('submit', function(e) {
        e.preventDefault();
        console.log('✅ Form submitted!');
        var $form = $(this);

        // логируем сериализованные данные перед отправкой
        var serialized = $form.serialize();
        console.log('Form serialized:', serialized);

        // используем абсолютный путь на случай, если корень домена не тот
        var ajaxUrl = window.location.origin + '/mailer/smart.php';
        console.log('Posting to:', ajaxUrl);

        $.ajax({
            type: 'POST',
            url: ajaxUrl,
            data: serialized,
            dataType: 'json',
            timeout: 10000
        })
        .done(function(resp) { console.log('Server response:', resp); /* ...existing code... */ })
        .fail(function(jqXHR, textStatus, errorThrown) { console.error('AJAX error', textStatus, jqXHR.status, jqXHR.responseText); })
        .always(function() { /* ...existing code... */ });

        return false;
    });

    //Кнопка вверх
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
});