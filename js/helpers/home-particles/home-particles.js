
var background = {}
  
background.initializr = function (justone) {
  
  let $this = this;
 
  //option
  $this.id = "background_css3";
  $this.style = {bubbles_color:"#FF0000",stroke_width:0, stroke_color :"black"};

  if ($(window).innerWidth() >= 768) {
    $this.bubbles_number = 50;
  }
  else if ($(window).innerWidth() >= 450) {
    $this.bubbles_number = 30;
  }
  else {
    $this.bubbles_number = 5;
  }

  console.log($this.bubbles_number);
  

  $this.speed = [1500,5000]; //milliseconds
  $this.max_bubbles_height = $this.height;
  $this.shape = 2 // 1 : circle | 2 : triangle | 3 : rect | false :random
  
  if($("#" + $this.id).length > 0){

    $("#"+ $this.id).remove();

  }

  $this.object = $("<div style='z-index:auto;margin:0;padding:0;overflow:hidden;position:absolute;bottom:0' id='"+$this.id+"'> </div>'");

  $('#home').prepend($this.object);

  $this.object = $('#'+$this.id);

  //$this.object = $("#home").prepend($("<div style='z-index:-1;margin:0;padding:0;overflow:hidden;position:absolute;bottom:0' id='"+$this.id+"'> </div>'"));

  $this.ww = $(window).width();
  $this.wh = $(window).height();
  $this.width = $this.object.width($this.ww);
  $this.height = $this.object.height($this.wh);
  
  $("head").prepend("<style>.shape_background {transform-origin:center; width:80px; height:80px; background: "+ $this.style.bubbles_color + "; position: absolute}</style>");

  if (justone) {
    return;
  }
  for (i = 0; i < $this.bubbles_number; i++) {

      $this.generate_bubbles(true);

  }
  
}

background.generate_bubbles = function() {

    let $this = this;

    let base = $("<div class='shape_background'></div>");

    let shape_type = $this.shape ? $this.shape : Math.floor($this.rn(1,3));

    var bolla;

    if (shape_type == 1) {

        bolla = base.css({borderRadius: "50%"});

    }

    else if (shape_type == 2) {

        bolla = base.css({width:0, height:0, "border-style":"solid","border-width":"0 40px 69.3px 40px","border-color":"transparent transparent "+$this.style.bubbles_color+" transparent", background:"transparent"}); 

    }

    else {

        bolla = base; 

    } 

    let rn_size = $this.rn(.8,1.2);

    bolla.css({"transform":"scale("+rn_size+") rotate("+$this.rn(-360,360)+"deg)", top:$this.wh+100, left:$this.rn(-60, $this.ww+60)});        

    bolla.appendTo($this.object);

    bolla.transit({top: $this.rn($this.wh/4,($this.wh)-60), "transform":"scale("+rn_size+") rotate("+$this.rn(-360,360)+"deg)", opacity: 0},$this.rn($this.speed[0],$this.speed[1]), function(){

        $(this).remove();

        $this.generate_bubbles(true);

    })
     
}

background.rn = function(from, to, arr) {

    if (arr) {

        return Math.random() * (to - from + 1) + from;

    }
    else {

        return Math.floor(Math.random() * (to - from + 1) + from);

    }

}