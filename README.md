# beanPopper
Jquery popUp Plugin

Requirements:
- [jQuery](https://jquery.com)
- [jQuery Easing](http://gsgd.co.uk/sandbox/jquery/easing/)
- [Font Awesome](https://jquery.com)

Usage

initialize element with selector:
```javascript
$(selector).showPopUp(options);
```

Like
```javascript
$('.modalPopUp').showPopUp();
```

Current Available Options:
```javascript
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
```

