
//All instances of HTMLMap class.
const allHTMLMapInst = [];

//Class with method to easily set spanish/english HTML.
class HTMLMap { 

    static chars(char) {

        return {
    
            tab: num => '&nbsp;'.repeat(num),
            break: num => '<br>'.repeat(num),
            esLeftQuote: '&laquo;',
            esRightQuote: '&raquo;',
            enQuote: '&quot'

        }[char]

    }

    static createMultiple(arr) {

        arr.forEach(textOpt => {

            new HTMLMap(textOpt);

        });

    }

    constructor(input) {

        this.spanish = input.spanish;

        this.english = input.english;

        this.elID = input.elID;

        $('#' + this.elID).html(this.english);

        $('#' + this.elID).attr({

            'data-sp': this.spanish,
            'data-eng': this.english,

        });

        if (input.url) {

            this.url = input.url;

            $('#' + this.elID).attr('href', this.url);

        }

        allHTMLMapInst.push(this);

    }

}




