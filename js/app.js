$(function () {
    $('.js-navbar-show-btn').click(function () {
        $(document).find('.navbar').addClass('navbar--active');
        disableScrollInActiveModal();
    });

    $('.js-navbar-close-btn').click(function () {
        $(document).find('.navbar').removeClass('navbar--active');
        enableScrollInActiveModal();
    });


    $(window).resize(function () {
        if ($(this).width() > 639 && $(document).find('.navbar').hasClass('navbar--active')) {
            $(document).find('.navbar').removeClass('navbar--active');
            enableScrollInActiveModal();
        }
    });

    // Lang switcher
    $('#lang-picker').click(function(){
        $(document).find('#lang-picker-modal').toggleClass("lang-picker-modal--active");
    });

    $("body").click(function(e){
        if ($(e.target).closest('.lang-picker')[0] !== $('#lang-picker')[0]) $('#lang-picker-modal').removeClass("lang-picker-modal--active");
    });

    $('#lang-picker-modal').click(function(e){
        e.stopPropagation();
    });


    function disableScrollInActiveModal() {
        let body = document.body,
            windowScrollY = window.scrollY;
        body.style.position = 'fixed';
        body.style.top = `-${windowScrollY}px`;
    }

    function enableScrollInActiveModal() {
        let body = document.body,
            scrollY = body.style.top;
        body.style.position = '';
        body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    let isValidMask = false;

    $('.phone-mask').mask('+7 (000) 000-00-00', {
        onComplete: function (cep) {
            isValidMask = true;
        },
        onInvalid: function (cep) {
            isValidMask = false;
        },

    });

    // Отправка заявки
    $('.js-zayavka').submit(function (e) {
        e.preventDefault();

        if (isValidMask) {
            ym(70783414,'reachGoal','mama_lead')
            VK.Goal('lead')
            fbq('track', 'Lead')

            $.post('/mail.php', $(this).serialize(), function (response) {
                if (response && response.status === false) {
                    alert(response.error);
                } else if (response && response.status === true) {
                    //alert(response.msg)
                    location.href = '/thanks'
                } else {
                    alert('Ошибка отправки. Пожалуйста свяжитесь с администратором!')
                }
            })
        }
    })
});
