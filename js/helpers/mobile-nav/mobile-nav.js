
window.menuTracking.mobile.mobileNavOpen = false;


const enableMobileNav = options => {

    $('#' + options.mobileToggleID).click(toggleMobNav);

    function toggleMobNav(event) {

        $('#' + options.mobileOverlayID).toggleClass('mobile-open');
    
        $('.' + options.mobileContainerClass).toggleClass('mobile-full-menu');
    
        $('.' + options.mobileIconClass).toggleClass('fa-bars');
    
        $('.' + options.mobileIconClass).toggleClass('fa-times');
    
        event.preventDefault();
    
        window.menuTracking.mobile.mobileNavOpen = window.menuTracking.mobile.mobileNavOpen ? false : true;
    }

    window.menuTracking.mobile.mobileNavToggle = function() {

        $('#' + options.mobileToggleID).click();

    }

    fromItemClickScrollTo(options.scrollToOptions);
}
