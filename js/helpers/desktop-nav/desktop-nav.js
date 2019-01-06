window.menuTracking.desktop.desktopNavOpen = false;
const enableDesktopNav = options => {

    let navigation = {

        $nav: document.querySelector('.' + options.desktopNavClass),
        $navTrigger: document.querySelector('.' + options.desktopNavTriggerClass), 
        $navContent: document.querySelector('.' + options.desktopNavContentClass),
        $navList: document.querySelector('.' + options.desktopNavListClass),
        transitionEnd: 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',

        init() {
            var self = this;
            
             function toggleDesktopNav(event) {

                event.stopPropagation();

                event.preventDefault();

                if (!self.$navTrigger.classList.contains(options.desktopNavActiveClass)) {
                    
                    self.$navTrigger.classList.add(options.desktopNavActiveClass);
                    
                    if (!self.$nav.classList.contains(options.desktopNavActiveClass)) {
                        self.$nav.classList.add(options.desktopNavActiveClass);
                        self.$nav.addEventListener('transitionend', function (e) {
                            if (e.propertyName == 'width' && self.$navTrigger.classList.contains(options.desktopNavActiveClass)) {
                                
                                self.$navContent.classList.add(options.desktopNavActiveClass);
                            }
                        });
                    } else {
                        self.$navContent.classList.add(options.desktopNavActiveClass);
                    }

                    
                    if (document.documentElement.classList.contains(options.desktopNavNoTransistionClass)) {
                        self.$navContent.classList.add(options.desktopNavActiveClass);
                    }
                } else {
                    
                    self.$navTrigger.classList.remove(options.desktopNavActiveClass);

                    
                    if (self.$navContent.classList.contains(options.desktopNavActiveClass)) {
                        self.$navContent.classList.remove(options.desktopNavActiveClass);
                        self.$navContent.addEventListener('transitionend', function (e) {
                            if (e.propertyName == 'opacity' && !self.$navTrigger.classList.contains(options.desktopNavActiveClass)) {
                                
                                self.$nav.classList.remove(options.desktopNavActiveClass);
                            }
                        });
                    } else {
                        self.$nav.classList.remove(options.desktopNavActiveClass);
                    }

                    
                    if (document.documentElement.classList.contains(options.desktopNavNoTransistionClass)) {
                        self.$nav.classList.remove(options.desktopNavActiveClass);
                    }
                }

                window.menuTracking.desktop.desktopNavOpen = window.menuTracking.desktop.desktopNavOpen ? false : true;

            }

            window.menuTracking.desktop.desktopNavToggle = function() {

                self.$navTrigger.click();
                
            };

            self.$navTrigger.addEventListener('click', toggleDesktopNav);

            self.$nav.addEventListener('click', () => self.$navTrigger.click());
            
        } 
    };

    navigation.init();

    fromItemClickScrollTo(options.scrollToOptions);

}