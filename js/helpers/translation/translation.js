// 1) Get flag icon language from URL.
const getFlagIconLang = element => {

    let arrFromPath = element.css('background-image').split('/');

    return arrFromPath[arrFromPath.length-1].split('-')[0]

}

// 2) Sets animation feature for language selector as well as translation functionality.    
// * All elements to translate must have the elsToTranslateClass
// * as well as data-sp and data-eng attributes containing the
// * respective language versions of the content text.
const configureLanguageSelector = options => {

    $('#' + options.buttonMainID).click(function() {

        $(this).toggleClass(options.backgroundOn);

        $('.' + options.toggleBody).toggleClass(options.toggleBodyOn);

        $('.' + options.toggleBtn).toggleClass(options.toggleBtnOn);

        $('.' + options.toggleBtn).toggleClass(options.toggleBtnScale);

        $('#' + options.otherLanguageIndicatorID).removeClass(options.fadeInNewLanguageClass);

        $('#' + options.otherLanguageIndicatorID).addClass(options.fadeOutOldLanguageClass);

        setTimeout(() => {

            $('#' + options.otherLanguageIndicatorID).removeClass(options.fadeOutOldLanguageClass);

            $('#' + options.otherLanguageIndicatorID).addClass(options.fadeInNewLanguageClass);

            let flagLang = getFlagIconLang($('.' + options.toggleBtn).eq(0))

            $('#' + options.otherLanguageIndicatorID).text(flagLang);

            let degree = flagLang == 'esp' ? 180 : 0;

            let offset = flagLang == 'esp' ? 50 : -50;
          
            setCSSPropsWithPrefix(

                $('#' + options.otherLanguageIndicatorID),

                [
                    ['transform', `rotate(${degree}deg) translateY(${offset}%)`]
                ]
            );

        }, options.toggleDuration - options.fadingDuration);

        setTimeout(() => {

            $('.' + options.elsToTranslateClass).each(function() {

                $(this).removeClass(options.fadeInNewLanguageClass);

                $(this).addClass(options.fadeOutOldLanguageClass);
                
                setTimeout(() => {

                    if ($('.' + options.toggleBtn).eq(0).hasClass(options.toggleBtnScale)) {

                        $(this).html($(this).attr('data-sp'));

                        $(this).attr('style', $(this).attr('data-sp-style'));
                
                    }
                    else {
                
                        $(this).html($(this).attr('data-eng'));

                        $(this).attr('style', $(this).attr('data-eng-style'));
                
                    }

                    $(this).removeClass(options.fadeOutOldLanguageClass);

                    $(this).addClass(options.fadeInNewLanguageClass);

                    setTimeout(() => {

                        window.ScrollingMain.teardown();

                        window.ScrollingMain = ScrollOut({
                            targets: ['.word', '.about-content'],
                            scrollingElement: '.page',
                            threshold: .9
                        });

                    }, options.fadingDuration);

                }, options.fadingDuration);
                
            });

        }, options.translationDelay);
        
    });

}
