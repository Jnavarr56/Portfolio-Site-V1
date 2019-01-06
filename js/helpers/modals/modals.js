const createModal = (options, content) => {

    let modal = 
    `<div class="modal-overlay ${options.keyword}-modal-overlay">
        <div class="modal ${options.keyword}-modal">        
            <a id="${options.keyword}-modal-close" class="close-modal">
                <svg viewBox="0 0 20 20">
                    <path 
                        fill="#000000" 
                        d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
                </svg>
            </a>   
            <div class="custom-modal-content ${options.keyword}-modal-content">
                ${content}
            </div>
        </div>
    </div>`;

    /* Three Classes:
        1) keyword-modal-overlay
        2) keyword-modal
        3) keyword-modal-content
    */

    $('body').append(modal);

    $('#' + options.triggerID).click(() => {

        $(`.${options.keyword}-modal-overlay, .${options.keyword}-modal`).addClass('active');

        if (options.parseChildrenEl) {

            if ($(`#${options.parseEl}`).children().not('br')) {

                $(`#${options.parseEl}`).children().each(function() {

                    (new TextScramble($(this)[0])).setText($(this).html());
    
                });

            }

            else {

                (new TextScramble($(this)[0])).setText($(this).html());

            }

        }

    });

    $(`#${options.keyword}-modal-close`).click(() => {

        $(`.${options.keyword}-modal-overlay, .${options.keyword}-modal`).removeClass('active');

    });

}   