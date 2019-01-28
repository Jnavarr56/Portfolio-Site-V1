//@koala-prepend '../helpers/helpers.js'

var globalTilePos, canSlide = true, mobileShiftCount = 0;

if (window.location.href.match("#")) {
    
    window.location.href = window.location.href.slice(0, window.location.href.indexOf('#'));

}

window.onbeforeunload = () => window.scrollTo(0, 0);

$(document).ready(function() {

    

    //------------------CREATE-CONTENT----------------------------
    HTMLMap.createMultiple([
        {   
            elID: 'about-bio',
            english: `
            Master of Science in Comp Sci student looking for first developer internship.
            ${HTMLMap.chars('break')(2)}
            I'm a 23 year old NYC based bilingual Full-Stack developer with an Economics degree
            currently looking for junior/entry level roles in development or QA. I began with
            Bootstrap/Rails but I'm expanding to work with React.JS/Redux and Node.JS. I'm highly 
            adaptable and never shy away from a challenge or unfamiliar technology. Take a look a
            around here for more info and some of my featured work.
            ${HTMLMap.chars('break')(2)}
            Think I could be your next great hire? Feel free to contact me for this or anything 
            at all. 
            ${HTMLMap.chars('break')(2)}
            You can download my resume <a href="resume.pdf" download>here</a>. 
            ${HTMLMap.chars('break')(2)}
            This site runs mostly on Bootstrap and jQuery.`,
            spanish: `
            Soy un adicto a los datos que se convirtió en un desarrollador con una pasión por resolver problemas.
            ${HTMLMap.chars('break')(2)}
            Soy un desarrollador bilingüe Full-Stack de 23 años con base en la Ciudad de Nueva York con un diploma de Economia.
            Actualmente en busca de roles de nivel junior / entrada en desarrollo o control de calidad. Comencé con
            Bootstrap / Rails pero me estoy expandiendo para trabajar con React.JS / Redux y Node.JS. Soy altamente
            Adaptable y nunca huir de un desafío o tecnología desconocida. Echar un vistazo a
            por aquí para más información y algunos de mis trabajos destacados. 
            ${HTMLMap.chars('break')(2)}
            Creo que podría ser tu próximo gran ¿alquiler? No dude en ponerse en contacto conmigo para esto o cualquier cosa en absoluto. 
            ${HTMLMap.chars('break')(2)}
            PD tú puedes descargar mi curriculum vitae <a href="resume.pdf" download>aqui</a>. 
            ${HTMLMap.chars('break')(2)}
            Este sitio se ejecuta completamente en Bootstrap / jQuery.`
        }
    ]);
    //-----------------/CREATE-CONTENT----------------------------


    //-----------------MODALS-------------------------------------
    createModal(
        {
            keyword: 'commit',
            triggerID: 'view-latest-commit-trigger',
            parseChildrenEl: true,
            parseEl: 'latest-commit',
        },
        `<h1 
            id="latest-commit" 
            class="has-alt-text" 
            data-eng="GITHUB API:${HTMLMap.chars('break')(2)}latest commit:${HTMLMap.chars('break')(2)}could not obtain github data" 
            data-sp="GITHUB API:${HTMLMap.chars('break')(2)}commit más nuevo:${HTMLMap.chars('break')(2)}no se pudo conseguir gitbhub datos">
            GITHUB API:${HTMLMap.chars('break')(2)}latest commit:${HTMLMap.chars('break')(2)}could not obtain github data<span class="blinking-cursor-red">|</span>
        </h1>`
    );

    createModal(
        {
            keyword: 'ifbuddy',
            triggerID: 'ifbuddy-modal-trigger',
            parseChildrenEl: false,
            parseEl: null,
        },
        `<h1 
            id="ifbuddy-content" 
            class="" 
        </h1>`
    );
    //-----------------/MODALS------------------------------------


    // Set up the Particle/Intro Animation.
    configureParticleAnim({
        countInterval: 40,
        startDelay: 100,
        homeSectionID: 'home',
        particleCanvasID: 'particle-canvas',
        particleHolderID: 'load-holder',
        elsToAppearClass: 'landing-fade-in',
        disappearClass: 'fade-out-loader',
        appearClass: 'fade-in-home-text',
        countUpID: 'count-up-text',
        switchToHomeDelay: 250,
        removeLoaderDelay: 500,
        fadeDuration: 500,
        hideRowClass: 'hide-second-row'
    });

    // Set up the Language Selector Animation/Translation Functionality.
    configureLanguageSelector({
        buttonMainID: 'language-selector-body',
        toggleBody: 'toggle-body',
        toggleBtn: 'toggle-btn',
        backgroundOn: 'background--on',
        toggleBodyOn: 'toggle-body--on',
        toggleBtnOn: 'toggle-btn--on',
        toggleBtnScale: 'toggle-btn--scale',
        elsToTranslateClass: 'has-alt-text',
        translationDelay: 500,
        spanishTextAttr: 'data-sp',
        englishTextAttr: 'data-eng',
        fadeOutOldLanguageClass: 'fade-out-old-language',
        fadeInNewLanguageClass: 'fade-in-new-language',
        fadingDuration: 500,
        otherLanguageIndicatorID: 'other-language',
        toggleDuration: 1500,
    });

    // Enables the mobile navigation menu.

    enableMobileNav({
        mobileToggleID: 'mobile-toggle',
        mobileOverlayID: 'mobile-overlay',
        mobileContainerClass: 'mobile-menu-container',
        mobileIconClass: 'mobile-i',
        scrollToOptions: {
            toggleID: 'mobile-toggle',
            navItemsClass: 'mobile-nav-item',
            delay: 1000,
            scrollSpeed: 500
        }
    });
    
    // Enable desktop navigation menu.
    enableDesktopNav({
        desktopNavClass: 'desktop-nav',
        desktopNavTriggerClass: 'desktop-nav-trigger',
        desktopNavContentClass : 'desktop-nav-content',
        desktopNavListClass: 'desktop-nav-list',
        desktopNavActiveClass: 'desktop-is-active',
        desktopNavNoTransistionClass: 'no-csstransitions',
        scrollToOptions: {
            toggleID: 'desktop-nav-trigger',
            navItemsClass: 'desktop-nav-item-click',
            delay: 750,
            scrollSpeed: 500
        }
    });

    // Retrieve Github data to display in desktop menu.
    getGithubData('jnavarr56', 'latest-commit', false);
    
    // Behaviors related to scrolling go here------------------------|
    $(window).scroll(function() {

        // Make nav elements + language selector change color based on current background.
        setColorScrollResponseMult(        
            [
                {
                    elID: 'language-selector-body', 
                    sectionTag: 'section',
                    triggerColor: 'rgb(255, 0, 0)',
                    altStyleClass: 'odd-section-language-selector-colors'
                },
                {
                    elID: 'mobile-menu-icon', 
                    sectionTag: 'section',
                    triggerColor: 'rgb(255, 0, 0)',
                    altStyleClass: 'odd-section-mobile-menu-colors',
                },
                {
                    elID: 'desktop-bars',
                    sectionTag: 'section',
                    triggerColor: 'rgb(255, 0, 0)',
                    altStyleClass: 'desktop-bars-alt-style',
                },
                {
                    elID: 'mobile-menu',
                    sectionTag: 'section',
                    triggerColor: 'rgb(255, 0, 0)',
                    altStyleClass: 'odd-section-mobile-menu-colors2',
                }
            ]
        );

        if ($('#mobile-table').css('display') === 'none') {

            $('#mobile-table').attr('data-scroll', $('#main-skills-table').attr('data-scroll'));

        }

        if ($('#main-skills-table').css('display') === 'none') {

            $('#main-skills-table').attr('data-scroll', $('#mobile-table').attr('data-scroll'));

        }

    });

    // Behaviors related to window resizing go here------------------------|
    $(window).resize(function() {

        //Make sure to close a menu if already open when resizing menu.
        ensureMenuClosure();

        //Automatically scroll to closest section on resize
        resizeFindSection();

    });

    // Set section title falling animation.
    setFallingTitles();

    //Set logo hover.
    enableLogoHover('home-logo');

    //Male Mobile Table Turn into Slide open menu;
    enableMobileTableInteractive();

    //Enable desktop portfolio section functionality.
    enableDesktopTileSelector();


    //Enable mobile tile selector
    enableMobileTileSelector();


   

    

});


// 1) Fix Mobile menu sizing.
// 2) Add Content

