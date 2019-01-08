let test = {
  "particles": {
    "number": {
      "value": 10,
      "density": {
        "enable": true,
        "value_area": 1000.0472365193136
      }
    },
    "color": {
      "value": "#FF0000"
    },
    "shape": {
      "type": "triangle",
      "stroke": {
        "width": 0,
        "color": "#000"
      },
      "polygon": {
        "nb_sides": 3
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.2,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": true
      }
    },
    "size": {
      "value": 200,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 10,
        "size_min": 50,
        "sync": true
      }
    },
    "line_linked": {
      "enable": false ,
      "distance": 500,
      "color": "#b91e1e",
      "opacity": 1,
      "width": 2.886141709557941
    },
    "move": {
      "enable": true,
      "speed": 5,
      "direction": "top-left",
      "random": false,
      "straight": true,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": true,
        "rotateX": 5130.918594769673,
        "rotateY": 5130.918594769673
      }
    }
  },
  "interactivity": {
    "detect_on": "window",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "bubble"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 587.4125874125874,
        "size": 59.940059940059946,
        "duration": 2,
        "opacity": 0.11369080972218831,
        "speed": 3
      },
      "repulse": {
        "distance": 560.3332764879281,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": false
}
// 1) Enables scrolling after a set delay in milliseconds.
const enableScrolling = delay => setTimeout(() => $('html').css('overflow', 'scroll'), delay);

// 2) Creates particles, as well as "speed/count up" feature.
const configureParticleAnim = options => {

  // a) Particle Configuration
  particlesJS(options.particleCanvasID,{particles:{number:{value:75,density:{enable:0,value_area:500}},color:{value:"#ff0000"},shape:{type:"triangle",stroke:{width:0,color:"#000000"},polygon:{nb_sides:3},image:{src:"img/github.svg",width:100,height:100}},opacity:{value:1,random:!0,anim:{enable:!0,speed:1,opacity_min:.1,sync:!1}},size:{value:15,random:true,anim:{enable:!1,speed:10,size_min:.1,sync:!1}},line_linked:{enable:!1,distance:150,color:"#ffffff",opacity:.4,width:1},move:{enable:!0,speed:0,direction:"none",random:!0,straight:!1,out_mode:"bounce",bounce:!1,attract:{enable:!1,rotateX:394.57382081613633,rotateY:157.82952832645452}}},interactivity:{detect_on:"canvas",events:{onhover:{enable:!0,mode:"grab"},onclick:{enable:!1,mode:"push"},resize:!0},modes:{grab:{distance:200,line_linked:{opacity:.2}},bubble:{distance:1500,size:40,duration:7.272727272727273,opacity:.3676323676323676,speed:3},repulse:{distance:50,duration:.4},push:{particles_nb:4},remove:{particles_nb:2}}},retina_detect:false});
  //particlesJS(options.particleCanvasID, test);
  
  // b) Count Up/Speed Up Effect
  setTimeout(() => {

      let count = 0;
      
      let countUp = setInterval(() => {

        $('#' + options.countUpID).text(count + '%');
        
        //$('.e-loadholder').css('border-radius', count + '%');
          
        window.pJSDom[0].pJS.particles.move.speed = count < 50 ? count * 2 : window.pJSDom[0].pJS.particles.move.speed - 2;

        count ++;
        
        if (count === 101) {
          
          clearInterval(countUp);

          window.pJSDom[0].pJS.particles.move.speed = 0;
          
          setTimeout(() => {

            $('#' + options.particleHolderID).addClass(options.disappearClass);

            setTimeout(() => {

              $('.' + options.hideRowClass).eq(0).removeClass(options.hideRowClass);

              $('.' + options.elsToAppearClass).addClass(options.appearClass);

            }, options.fadeDuration);
            

            setTimeout(() => {
              
              $('#' + options.particleHolderID).remove();

            }, options.removeLoaderDelay);

            enableScrolling(0);

            //background.initializr();  

          }, options.switchToHomeDelay);
          
        }
        
      }, options.countInterval);
      
    }, options.startDelay);

}


