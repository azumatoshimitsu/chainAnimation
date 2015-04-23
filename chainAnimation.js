//chainAnimation.js JSONを受け取ってアニメーションを繋げる
//MIT license. 
//Copyright (c) 2014 Azuma Toshimitsu
//vosegus.org

function chainAnimation(json, option) {
	var isAnimation = true;
	var seenLen = json.length;
	var animationCount = 0;
	var isChain = (option && option.isChain)? option.isChain : false;
	var isStop = false;
	//プロパティリセット
	setStartState(json);

	$.each(json, function(index, value) {
		var obj = json[index];
			obj.duration  = obj.duration || 350;
			obj.delay     = obj.delay || 0;
			obj.easing    = obj.easing || 'linear';
			obj.endState  = obj.endState;
			obj.type      = obj.type || 'jQueryAnimate';
			obj.listenerEvt = obj.listenerEvt || 'end';
			obj.triggerEvt = obj.triggerEvt || 'end';

		//指定したオブジェクトのアニメーションが終わったら実行
		if(obj.listenerObj) {
			$(obj.listenerObj).one(obj.listenerEvt, function(){
				if(obj.type === 'jQueryAnimate') {
					animate(obj, index);
				}
				if(obj.type === 'customFunc') {
					runCustomFunction(obj, index);
				}//.customFunction
			});//.on
		}//.customEvent
		else {//そのまま実行
			if(obj.type === 'jQueryAnimate') {
				animate(obj, index);
			}
			if(obj.type === 'customFunc') {
				runCustomFunction(obj, index);
			}//.customFunction
		}// end if
			
	});// end each

	function runCustomFunction(obj) {
		animationCount += 1;
		obj.customFunc(obj);
	};

	function animate(obj, index) {
		if(!isStop) {
			$(obj.self).stop(true, true).delay(obj.delay).animate(obj.endState,
				{
					duration : obj.duration,
					easing   : obj.easing,
					complete : function() {
						if(obj.completeFunc) {
							if(obj.completeParam)
								obj.completeFunc(obj.completeParam);
							else
								obj.completeFunc();
						}
						$(obj.self).trigger(obj.triggerEvt, this);
						animationCount += 1;
						if(index === seenLen - 1) {
							$(window).trigger('chainAnimationEnd', this);
						}
					}
				}
			);
		}
	};

	function setStartState(json){
		$.each(json, function(index, value) {
			if(json[index].startState)
				$(json[index].self).css(json[index].startState);
		});
	};

	return {
		stop : function() {
			isStop = true;
		}
	}
};
