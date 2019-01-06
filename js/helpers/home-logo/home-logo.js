const enableLogoHover = logoClass => {

    $('.' + logoClass).each(function() {

        $(this).click(function() {

            window.location = $(this).attr('data-link');

        });

    });
}