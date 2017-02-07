function move (obj,object1,duration,fn) {
//				alert(1)
		    	var startTime = new Date();
		    	var d = duration;
		    	var j = {};
		    	for( var a in object1){
		    		j[a] = {};
		    		j[a].b = parseFloat(getComputedStyle(obj)[a]);
		    		j[a].c = object1[a] - j[a].b; 
		    	}
//		    	console.log( j );
//		    	clearInterval( obj.timer );
				
		    	obj.timer = setInterval(function(){
		    		
		    		var t = new Date() - startTime;
		    		if(t>=d){
		    			t = d;
		    		}
		    		for(var a in j){
		    			var c = j[a].c;
		    			var b = j[a].b;
						var v = c/d*t+b;
		    			if(a == "opacity"){
		    				obj.style[a] = v ;
		    			}else{
		    				obj.style[a] = v + "px";
		    			}
		    		}
		    		if(t==d){
		    			clearInterval(obj.timer);
		    			fn&&fn();
		    		}
		    	},16 )}