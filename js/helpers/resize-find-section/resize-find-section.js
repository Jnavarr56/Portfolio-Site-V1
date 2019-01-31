const resizeFindSection = () => {

    $('section').each(function() {

        if  (
                (
                    $(this).offset().top - $(window).scrollTop() >= 0
                    &&
                    $(this).offset().top - $(window).scrollTop() < $(this).height() / 2
                )
                ||
                (
                    $(this).offset().top + $(this).height() - $(window).scrollTop() >= $(this).height() / 2
                    &&
                    $(this).offset().top + $(this).height() - $(window).scrollTop() < $(this).height()

                )
                
            ) {

                $(window)[0].scroll({

                    top: $(this).offset().top,

                    behavior: 'smooth'

                });

        }


    });

}