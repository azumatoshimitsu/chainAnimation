chainAnimation
==============

chainAnimation.js は JSON データを受け取ってアニメーションをつなげるライブラリです。

##Install
```javascript
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery.transit/0.9.9/jquery.transit.min.js"></script>
<script src="chainAnimation.js"></script>
```

##Example
```javascript
var seen = [{
	'self'          : 'target object', //Animation target 
	'startState'    : { 'CSS Selector' : 'CSS Property' }, //Start CSS Style
	'endState'      : { 'CSS Selector' : 'CSS Property' }, //End CSS Style
	'type'          : String 'jQueryAnimate' or 'customFunc' or 'static' default = 'jQueryAnimate',
	'delay'         : Number,
	'duration'      : Number,
	'easing'        : String 'jQuery easing'
	'listenerObj'   : 'trigger object', //Trigger Object
	'listenerEvt'   : String, // Trigger Event
	'completeFunc'  : Function, //jQuery animation complete Event function
	'customFunc'    : Function //Custom funtion name
}];
chainAnimation(seen);
```
