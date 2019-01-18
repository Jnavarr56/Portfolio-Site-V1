const enableMobileTileSelector = () => {

    let workMobileShiftClasses = [];

    while (workMobileShiftClasses.length < $('.gallery-moduleSlide').length) {

        workMobileShiftClasses.push(`mobile-tile-shift-${mobileShiftCount}`);

        mobileShiftCount ++;

    }

    mobileShiftCount = 0;

    console.log(workMobileShiftClasses);

    $(".mobile-shift-arrow").each(function() {

        $(this).click(function() {

            if ($(this).attr('id') === "left-work") {

                mobileShiftCount = mobileShiftCount === 0 ? $('.gallery-moduleSlide').length - 1 : mobileShiftCount - 1;

            }
            else {

                mobileShiftCount = mobileShiftCount === $('.gallery-moduleSlide').length - 1 ? 0 : mobileShiftCount + 1;

            }

            $('.gallery-moduleSlide').each(function() {

                $(this)[0].className.split(' ').forEach(e => {

                    if (e.includes('mobile-tile-shift-')) {

                        $(this).removeClass(e);

                    }

                });

            });

            $('.banner-ball').removeClass('selected-banner-ball');

            $('.banner-ball').eq(workMobileShiftClasses[mobileShiftCount].match(/[0-9]+/)[0]).addClass('selected-banner-ball');

            
            $('.gallery-moduleSlide').addClass(workMobileShiftClasses[mobileShiftCount]);

            console.log(mobileShiftCount);

        });

    });

    for (let i = 0; i < Math.ceil($('.gallery-moduleSlide').length); i++) {

        let bubble = $('<div class="banner-ball"></div>');

        bubble.click(function() {

            $('.gallery-moduleSlide').each(function(x) {

                $(this)[0].className.split(' ').forEach(e => {

                    if (e.includes('mobile-tile-shift-')) {

                        $(this).removeClass(e);

                    }

                });

            });

            $('.banner-ball').removeClass('selected-banner-ball');

            bubble.addClass('selected-banner-ball');

            $('.gallery-moduleSlide').each(function() {

                $(this).addClass(`mobile-tile-shift-${i}`);

            });

        });

        $('#banner-tracking').append(bubble);

    }

    $('#right-work').click();
    $('#left-work').click();

    $('.gallery-moduleSlide').swipe( {
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
          if (direction === "left") {
            $('#right-work').click();
          }
          else if (direction === "right") {
            $('#left-work').click();
          }
        },
        threshold:0,
        fingers:'all'
      });

}