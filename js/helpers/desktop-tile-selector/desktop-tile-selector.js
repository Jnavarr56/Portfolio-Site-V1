const enableDesktopTileSelector = () => {

    let upArrow = $('<i class="fas fa-arrow-circle-up"></i>');

    upArrow.click(function() {

        $('.desktop-tile').each(function(x) {

            $(this)[0].className.split(' ').forEach(e => {

                if (e.includes('desktop-tile-shift-')) {

                    let indexToClick = $('.selector-bubble-desktop').index($('.selected-bubble-desktop')) === $('.selector-bubble-desktop').length - 1 ? 0 : $('.selector-bubble-desktop').index($('.selected-bubble-desktop')) + 1;

                    //Number(e[e.length - 1])

                    console.log(indexToClick);

                    $('.selector-bubble-desktop').eq(indexToClick).click();

                }

            });

        });
    });

    $('#work-row-selector').append(upArrow);

    for (let i = 0; i < Math.ceil($('.desktop-tile').length / 3); i++) {

        let bubble = $('<div class="selector-bubble-desktop"></div>');

        bubble.click(function() {

            $('.desktop-tile').each(function(x) {

                $(this)[0].className.split(' ').forEach(e => {

                    if (e.includes('desktop-tile-shift-')) {

                        $(this).removeClass(e);

                    }

                });

            });

            $('.selector-bubble-desktop').removeClass('selected-bubble-desktop');

            bubble.addClass('selected-bubble-desktop');

            $('.desktop-tile').each(function() {

                $(this).addClass(`desktop-tile-shift-${i}`);

            });

        });

        $('#work-row-selector').append(bubble);

    }

    let downArrow = $('<i class="fas fa-arrow-circle-down"></i>');

    downArrow.click(function() {

        $('.desktop-tile').each(function(x) {

            $(this)[0].className.split(' ').forEach(e => {

                if (e.includes('desktop-tile-shift-')) {

                    
                    //Number(e[e.length - 1])
                    let indexToClick = $('.selector-bubble-desktop').index($('.selected-bubble-desktop')) === 0 ? $('.selector-bubble-desktop').length - 1 : $('.selector-bubble-desktop').index($('.selected-bubble-desktop')) - 1;

                    console.log(indexToClick);

                    $('.selector-bubble-desktop').eq(indexToClick).click();

                }

            });

        });
    });

    $('#work-row-selector').append(downArrow);

    $('.selector-bubble-desktop').eq(0).click();

}