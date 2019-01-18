const enableDesktopTileSelector = () => {

    let upArrow = $('<i class="fas fa-arrow-up"></i>');

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

    let downArrow = $('<i class="fas fa-arrow-down"></i>');

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

    $('.desktop-tile').each(function() {

        $(this).hover(

            function(e) {

                $('.desktop-tile').removeClass('hover-work-tile');

                console.log(`MOUSEIN ${e.pageX} ${e.pageY}`);
                
                globalTilePos = {

                    xi: $(this).offset().left,
                    yi: $(this).offset().top,
                    xE: e.pageX,
                    yE: e.pageY

                }

                $(this).addClass('hover-work-tile');

            }, 
            function(e) {

                console.log(`MOUSEOUT ${e.pageX} ${e.pageY}`);
                console.log(`X LIMS ${globalTilePos.xi} ${globalTilePos.xi + $(this).width()}`)
                console.log(`Y LIMS ${globalTilePos.yi} ${globalTilePos.yi + $(this).height()}`)

                if (e.pageX === globalTilePos.xE && e.pageY === globalTilePos.yE) {

                    return;

                }


                if (
                    (e.pageX < globalTilePos.xi || e.pageX > globalTilePos.xi + $(this).width()) ||
                    (e.pageY < globalTilePos.yi || e.pageY > globalTilePos.yi + $(this).height())) {

                    $(this).removeClass('hover-work-tile');

                }

            }
        );

    });

    upArrow.hover(
        function() {
            
            $(this).removeClass('fa-arrow-up').addClass('fa-arrow-circle-up');

        }, 
        function() {

            $(this).removeClass('fa-arrow-circle-up').addClass('fa-arrow-up');

        }
    );

    downArrow.hover(
        function() {

            $(this).removeClass('fa-arrow-down').addClass('fa-arrow-circle-down');

        }, 
        function() {

            $(this).removeClass('fa-arrow-circle-down').addClass('fa-arrow-down');

        }
    );

    console.log(upArrow);
    console.log(downArrow);

}