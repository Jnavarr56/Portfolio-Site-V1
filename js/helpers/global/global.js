// Sort in asending order based on a given property.
const sortAscend = (prop) => (a,b) => new Date(b[prop]) - new Date(a[prop]);

// Sets CSS properies for a given element.
// Takes an array of arrays - ex: ['color', 'red'];
const setCSSPropsWithPrefix = (element, arrOfValues) => {

    let prefixes = ['webkit', 'moz', 'ms', 'o'], props = {};

    arrOfValues.forEach(arrPair => {

        props[arrPair[0]] = arrPair[1];

        prefixes.forEach(prefix => {

            props[`-${prefix}-${arrPair[0]}`] = arrPair[1];

        });

    });

    element.css(props);

}

// Checks if an element is under the top AND above the bottom of another element.
const isWithin = (el1, el2) => {

    let el1UpperBound = el1.offset().top, el1LowerBound = el1UpperBound + el1.height();
    
    let el2UpperBound = el2.offset().top, el2LowerBound = el2UpperBound + el2.height();

    if (el1UpperBound > el2UpperBound && 
        el1LowerBound < el2LowerBound) {
        
        return true;

    }

    return false;
    
}

// Makes element A change in style based on background-color of
// element B (that is part of a series) IF element A is scrolled
// 'in front of' element B.
const setColorScrollResponse = options => {

    $(options.sectionTag).each(function() {
        
        if(isWithin($('#' + options.elID), $(this))) {

            if ($(this).css('background-color') === options.triggerColor) {

                $('#' + options.elID).addClass(options.altStyleClass);

                return false;

            }

            else {

                $('#' + options.elID).removeClass(options.altStyleClass);

                return false;
    
            }

        }
        
    });

}

// Perform setColorScrollResponse on an array of objects.
const setColorScrollResponseMult = arr => arr.forEach(options => setColorScrollResponse(options));


// After clicking an item of a certain class scroll to that item's href.

const fromItemClickScrollTo = (options) => {

    $('.' + options.navItemsClass).each(function() {

        $(this).click(function(e) {

            let changeSelector = $('#mobile-menu').css('display') !== 'none';

            console.log(changeSelector);

            if (changeSelector) {

                setTimeout(() => {

                    $('#language-selector-body').removeClass('odd-section-language-selector-colors');

                }, 500);

            }

            e.preventDefault();
    
            let item = $(this);

            $('#'+ options.toggleID).click();

            setTimeout(() => {
    
                $('body')[0].scrollBy({

                    top: $(item.attr('href')).offset().top,

                    behavior: 'smooth'

                });
    
    
            }, options.delay);
    
        });
    
    });
    
}


const setDisplayResponse = options => {

    $(options.sectionTag).each(function() {

        let section =  $(this);

        if(isWithin($('#language-selector'), section)) {

            $('.' + options.trackingClass).each(function() {

                if($(this).attr(options.trackingClassAttr) === section.attr(options.tagAttr)) {

                    $(this).css('display', 'block');

                } 
                else {
                    $(this).css('display', 'none');
                }

            });

        } 
        
    });

}

const setFallingTitles = () => {

    let cloneTrack = [];

    let cloneTrackIDNum = 0;

    $('.has-alt-text').each(function() {

        if ($(this).hasClass('text')) {

            let clone = $(this).clone();

            clone.html(clone.attr('data-sp'));

            clone.attr('id','cTIN' + cloneTrackIDNum);

            cloneTrack.push({

                orig: $(this),
                clID: 'cTIN' + cloneTrackIDNum,
                
            });

            $('#splitting-clones').append(clone);

            cloneTrackIDNum ++;
        }
    });

    Splitting();

    cloneTrack.forEach(pair => {

        pair.orig.attr('data-eng', pair.orig.html());

        pair.orig.attr('data-eng-style',  pair.orig.attr('style'));

        pair.orig.attr('data-sp',  $('#' + pair.clID).html());

        pair.orig.attr('data-sp-style',  $('#' + pair.clID).attr('style'));

    });
        
    window.ScrollingMain = ScrollOut({
        targets: ['.word', '.about-content'],
        scrollingElement: '.page',
        threshold: .9
    });
    
    $('#splitting-clones').remove();

}

window.menuTracking = {
    desktop = {},
    mobile = {},
};

const ensureMenuClosure = () => {

    if ($(window).innerWidth() > 900 && window.menuTracking.desktop.shouldClose) {

        window.menuTracking.desktop.shouldClose = false;

        window.menuTracking.desktop.desktopNavToggle();

        return;

    }

    if ($(window).innerWidth() > 900 && window.menuTracking.mobile.shouldClose) {

        window.menuTracking.mobile.shouldClose = false;

        window.menuTracking.mobile.mobileNavToggle();

        return;

    }

    if ($(window).innerWidth() <= 900 && window.menuTracking.desktop.desktopNavOpen) {

        window.menuTracking.desktop.shouldClose = true;

        return;

    }

    if ($(window).innerWidth() > 900 && window.menuTracking.mobile.mobileNavOpen) {

        window.menuTracking.mobile.shouldClose = true;

        return;

    }

}
