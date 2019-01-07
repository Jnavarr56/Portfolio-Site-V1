
window.menuTracking.mobile.mobileNavOpen = false;


const enableMobileNav = options => {

    $('#' + options.mobileToggleID).click(toggleMobNav);

    function toggleMobNav(event) {

        if ($('#mobile-menu').hasClass('odd-section-mobile-menu-colors2')) {

            $('#language-selector-body').removeClass('odd-section-language-selector-colors');

        }

        else {

            $('#language-selector-body').addClass('odd-section-language-selector-colors');

        }

        $('#' + options.mobileOverlayID).toggleClass('mobile-open');
    
        $('.' + options.mobileContainerClass).toggleClass('mobile-full-menu');
    
        $('.' + options.mobileIconClass).toggleClass('fa-plus');
    
        $('.' + options.mobileIconClass).toggleClass('fa-times');
    
        event.preventDefault();
    
        window.menuTracking.mobile.mobileNavOpen = window.menuTracking.mobile.mobileNavOpen ? false : true;
    }

    window.menuTracking.mobile.mobileNavToggle = function() {

        $('#' + options.mobileToggleID).click();

    }

    fromItemClickScrollTo(options.scrollToOptions);
}
