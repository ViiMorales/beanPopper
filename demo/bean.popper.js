(function($) {
  $.fn.showPopUp = function(o) {

    var options = {
      bgColor:"#ffffff", // str:default #ffffff, accepts colorname, hex, rgb, rgba, hsl & hsla in css format
      closeBtnColor: ["red", '#ffffff'], // array:default ["red", '#ffffff'] => [fore,background]color
      height: 500, // int:default 500 value in pixels
      width: 500, // int:default 500 value in pixels
      content: "", // str:default "", any html
      animationType: "elastic", // str:default "elastic", accepts "ease" & "elastic"
      onAfterOpen: undefined, // func:default undefined, to initialize anything related to the injected html content; like event listeners or plugins.
      onAfterClose: undefined, // func:default undefined
      animation: { //internal Use
        popTime: 800,
        popEase: "easeOutElastic"
      }
    };

    $.extend( options, o ); // merge user and default parameters

    // setting values for animation timing
    if (options.animationType == "elastic") {
      options.animation.popTime = 800;
      options.animation.popEase = "easeOutElastic"
    } else if (options.animationType == "ease") {
      options.animation.popTime = 300;
      options.animation.popEase = "easeOutExpo"
    } 

    this.on('click', function(e){ //item event listener
      $( ".popUp" ).remove(); //destroying any displayed popUp
      var $item = $(e.currentTarget); //caching current clicked element

      //PopUp Scaffolding
      var popUp = $("<div class='popUp'><div class='popUpContent' style='display:none;margin:20px;overflow:hidden;'>" + // hiding the content to prevent overflow issues
        options.content + //inserting user content
        "</div></div>")
        .offset({ //setting popup position based on clicked element position
          top: $item.offset().top + ($item.height()/2),
          left: $item.offset().left + ($item.width()/2)
        })
        .css({ //initial style
          'box-sizing':'border-box',
          position: 'absolute',
          height: '0px',
          width: '0px',
          'background-color': options.bgColor,
          'z-index': '99999999',
          'border-radius': '200px'
        })
        .appendTo($('body')); //inserting the element to the DOM @ the end of the page

        $("<span class='close'><i class='fa fa-times'></i><span>") //creating the close button
        .css({
          width: "0px",
          height: "0px",
          overflow: "hidden",
          "background-color": options.closeBtnColor[0],
          "border-radius": "50%",
          display: "block",
          position: "absolute",
          "line-height": "0px",
          "text-align": "center",
          "font-size": "0px",
          top: "0px",
          right: "0px",
          color: options.closeBtnColor[1],
        })
        .appendTo($('.popUp')); //inserting the close button to the DOM @ the end of the popup



        popUp.animate( //incrementing the size of the popup before moving it into the center.
          {
            height: '100px',
            width: '100px',
            'margin-top': '-50px',
            'margin-left': '-50px',
          },
          100,
          'easeInExpo'
        );

        popUp.animate( //step one of an "arc" kind of movement, the mess on the left coordinate os to get a mean from the initial location to the center of the screen
          {
            top: $(window).height() / 2 + window.pageYOffset - 50,
            left: (($(window).width() / 2) > $('.popUp').offset().left) ? (($(window).width() / 2) + (($('.popUp').offset().left) - ($(window).width() / 2)) * 0.50) : ($('.popUp').offset().left + (($(window).width() / 2) - $('.popUp').offset().left) * 0.50)
          },
          100,
          'linear'
        )
        .animate( //step two of the arc movement, just centering the popup and making it a little less round to prevent the roundness to "POP" with the bounce animation
          {
            top: $(window).height() / 2 + window.pageYOffset,
            left: $(window).width() / 2,
            'border-radius': '20px'
          },
          150,
          'linear',
          function(){
            $( ".popUp .popUpContent" ).fadeIn(); // start to show the user content so it appears as it was already there.
            
          }
        )
        .animate( // final step of the animation, just increase the size, changing the top and left to viewport units.
          {
            height: options.height + "px",
            width: options.width+ "px",
            top:'50vh',
            left: '50vw',
            'margin-top': (-options.height/2) + "px",
            'margin-left': (-options.width/2) + "px",
            'border-radius': '20px'
          },
          options.animation.popTime,
          options.animation.popEase,
          function() { // showing the close button when the popup animation ends.
            $( ".popUp span.close" ).animate({
              width: "50px",
              height: "50px",
              "line-height": "50px",
              "font-size": "32px",
              top: "-15px",
              right: "-15px",
            }, 300,
            'easeOutElastic'
            );

        if (options.onAfterOpen !== undefined) { // Callback when popup finishes opening.
           options.onAfterOpen(e);
        }

        $(".popUp span.close").on('click', function(e) { //creating event listener for close button
          //close popup
              $( ".popUp span.close" ).animate({ // hiding the button first becase it overflows from the container
                  width: "0px",
                  height: "0px",
                  "line-height": "0px",
                  "font-size": "0px",
                  top: "0px",
                  right: "0px",
              },
              150,
              'easeInOutExpo',
              function(){ // closing the popup
                $( ".popUp *" ).fadeOut(); // fading out all the content first so the animation will be less expensive and more smooth
                $( ".popUp" ).animate({ //animating to 0 before destroying the element
                    height: '0px',
                    width: '0px',
                    'margin-top': "0px",
                    'margin-left': "0px",
                  },
                  300,
                  'easeOutExpo',
                  function(){ //last callback
                    $( ".popUp" ).remove(); //destroying the popUp
                    if (options.onAfterClose !== undefined) { // Callback when popup finishes closing.
                        options.onAfterClose(e);
                    }
                  }
                );
              }
            );
          });
        }
      );
    });
  };
})(jQuery);