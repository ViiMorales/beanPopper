$(document).ready(function(){
  $(".owl-carousel").owlCarousel();

  $('.modalPopUp').showPopUp({
  	bgColor:"#ffffff", // str:default #ffffff, accepts colorname, hex, rgb, rgba, hsl & hsla in css format
  	closeBtnColor: ["red", '#ffffff'], // array:default ["red", '#ffffff'] => [fore,background]color
  	height: 300, // int:default 500 value in pixels
  	width: 500, // int:default 500 value in pixels
  	content: "<h1>Selecciona una Opción</h1><p>lorem ipsum de que uu...</p>", // str:default "", any html
  	animationType: "elastic", // str:default "elastic", accepts "ease" & "elastic"
  	onAfterOpen : function(){ // func:default undefined, to initialize anything related to the injected html content; like event listeners or plugins.
  		console.log('After Open Callback')
  	},
  	onAfterClose : function(){ // func:default undefined
  		console.log('After Close Callback')
  	}
  });

  $('.testModal').showPopUp({
  	bgColor:"lavender",
  	closeBtnColor: ["lavenderblush", 'indigo'],
  	height: 400,
  	width: 400,
  	content: "prueba",
  	animationType: "ease"
  });

    $('.testModal2').showPopUp({
  	bgColor:"pink",
  	closeBtnColor: ["aliceblue", 'coral'],
  	height: 400,
  	width: 300,
  	content: "<h1>prueba</h1>",
  	animationType: "ease"
  });

});




