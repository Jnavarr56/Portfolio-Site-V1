const enableMobileTableInteractive = () => {

    $('.mobile-table-content').click(function() {

        let currentlyClicked = $(this);

        currentlyClicked.next().click(() => currentlyClicked.click());

        if (currentlyClicked.hasClass('open-mobile-table')) {

            $('.mobile-table-content').removeClass('non-select-mobile-table-above');

            $('.mobile-table-content').removeClass('non-select-mobile-table-below');

            currentlyClicked.removeClass('open-mobile-table');

            return;
            
        }

        $('.mobile-table-content').each(function() {

            if (currentlyClicked[0] === $(this)[0]) {

                $(this).addClass('open-mobile-table');

                $(this).removeClass('non-select-mobile-table-above');

                $(this).removeClass('non-select-mobile-table-below');

            }

            else {

                $(this).removeClass('open-mobile-table');
                
                $(this).addClass(`non-select-mobile-table-${$(this).index() < currentlyClicked.index() ? 'above' : 'below'}`);

            }

        });

    });
    
}