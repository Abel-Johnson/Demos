//萨达阿萨德 只有一页

//当前页码
var nowP = 0;
var now = 1;
//总页数
var totalP;
var listStr = '<li>\
						<h3 class="li-title"><%=title%></h3>\
						<div class="li-detail">\
							<div class="detail-left">\
								<img class="pic" src="<%=image%>" />\
							</div>\
							<div class="detail-right">\
								<strong class="writer">\
								<%=author.join(" ")%>\
								 / <%=publisher%></strong>\
								<p class="intro"><%=summary%></p>\
							</div>\
						</div>\
					</li>'
var lsFn = template.render(listStr);

function charge(data) {
	console.log(data);
	$('body script').remove('#scriptCg');
	$('.index').text(now);
	
	$('.content-list').html((data.books[0]?lsFn(data.books[0]):"")+(data.books[1]?lsFn(data.books[1]):""));
}
function abc(data) {
	console.log(data);
	$('.content-loading').hide();
	$('body script').remove('#scriptId');
	if(!data.books.length) {
		$('.noResult').show();
		$(".content-list").html("");
		$(".content-info").hide();
		$("#pg-box").hide();
		return;
	}
	
	//总页数
	totalP = Math.ceil(data.total/2)
	var initP;
	console.log(totalP);
	//写页码
	initP = totalP>5 ? 5 : totalP;
	var str = '';
	for (var i = 0; i < initP; i++) {
		str+='<a href="javascript:;">'+(i+1)+'</a>\
		';
	};
	$('.pages').html(str)
	$(".content-info").show();
	$("#pg-box").show();
	$('.search-inp').blur();
	$('.noResult').hide();
	
	
	$('.items_n').text(data.total);
	$('.pages_n').text(totalP);
	$('.index').text(data.start+1);
	nowP = data.start;
	console.log(nowP);
	$('.pages a').eq(nowP).replaceWith('<strong class="nowP">'+(nowP+1)+'</strong>')
	
	
	
	$('.content-list').html((data.books[0]?lsFn(data.books[0]):"")+(data.books[1]?lsFn(data.books[1]):""));
}




function submit(ev) {
	if(ev.originalEvent.keyCode&&ev.originalEvent.keyCode !== 13) {
		return;
	}
	$('#suggest').hide();
		$('.noResult').hide();
	keyWord = $(".search-inp")[0].value;
	if(!keyWord) {
		alert('请输入关键字');
		$('.search-inp').focus();
		return;	
	}
	
	
	$('.content-loading').show();
	$(".content-list").html("");
	$(".content-info").hide();
	$("#pg-box").hide();
	
	var scriptEle = $('<script></script>').attr('src','https://api.douban.com/v2/book/search?q='+keyWord+'&fields=status,title,image,author,publisher,summary&count=2&callback=abc');
	scriptEle.attr('id',"scriptId");
	
	$('body').append(scriptEle)
}


$('.search-btn').on("click",submit);
$('.search-inp').on("keydown",submit).on('dblclick',function() {this.select();})




//getPgArr(5, 1) //12345
//getPgArr(5, 2) //12345
//getPgArr(5, 3) //12345
//getPgArr(5, 4) //12345
//getPgArr(5, 5) //12345
//
//
//
//getPgArr(8, 8) //45678
//getPgArr(8, 7) //45678
//getPgArr(8, 6) //45678
//
//getPgArr(8, 5) //34567
//getPgArr(8, 4) //23456
//
//getPgArr(8, 3) //12345
//getPgArr(8, 2) //12345
//getPgArr(8, 1) //12345


function getPgArr(all, now) {
	//返回一个数组[1,2,3,4,5],并完成渲染
	//all 总页数
	//now 当前页数(从1开始)
	
	var arr = [];
	
	if(all<=5) {
		for (var i = 1; i < all+1; i++) {
			arr.push(i);
		}
	} else {
		if(now >= all-2) {
			for (var i = 1; i <= 5; i++) {
				arr.push(all-5+i);
			}
		} else if(now<=3) {
			arr = [1,2,3,4,5];
		} else {
			for (var i = 1; i <= 5; i++) {
				arr.push(now-3+i);
			}
		}
	} 
	
//	if(now == 1) {
//		$('.prev').hide();
//	} else {
//		$('.prev').show();
//	}
//	
//	if(now == all) {
//		$('.next').hide();
//	} else {
//		$('.next').show();
//	}
//	
//	if(arr.indexOf(1)!==-1) {
//		$('.home').hide();
//	} else {
//		$('.home').show();
//	}
//	
//	if(arr.indexOf(all)!==-1) {
//		$('.end').hide();
//	} else {
//		$('.end').show();
//	}
	
	console.log(arr);
	str = '';
	for (var i = 0; i < arr.length; i++) {
		if(now == arr[i]) {
			str += '<strong class="nowP">'+arr[i]+'</strong>\
			'
		} else {
			str += '<a href="javascript:;">'+arr[i]+'</a>\
			'
		}
	}
	
	 $('.pages').html(str)
	return arr;
	
}

//搜索建议
function suggest(data) {
	console.log(data);
	var ls = data.books.map(function(value,index) {
		return {
			title:value.title,
			id:value.id
		}
	});
	if(!ls.length) {
		$('#suggest').hide();
		return;	
	}
	$('#suggest').show();
	var str = '';
	console.log(ls);
	for( var i = 0; i < ls.length; i++ ){
		str += "<li><a href='https://book.douban.com/subject/"+ls[i].id+"'>"+ls[i].title+"</a></li>"
	}
	$('#suggest').html(str);
	$('#scriptSg').remove();
}
$('.search-inp').on("input", function() {
	if(!this.value) {
		$('#suggest').hide();
		return;
	}
	var scriptSg = $('<script></script>').attr('src','https://api.douban.com/v2/book/search?q='+this.value+'&fields=title,id&count=6&callback=suggest');
	scriptSg.attr('id',"scriptSg");
	
	$('body').append(scriptSg)
})


//添加翻页按钮点击事件
$('#pg-box').on('click','a', function(ev) {
	
	console.log($('a').not($(".pages a")));
//	console.log(ev);
//	console.log(ev.target);	
	var target = ev.target;
	
	if($(target).is($(".pages a"))) { 
		now = $(target).text().trim();
	} else {
		switch (target.className){
			case "home":
				now = 1;
				break;
			case "end":
				now = totalP;
				break;
			case "prev":
				if(now == 1) break;
				now--;
				break;
			case "next":
				if(now == totalP) break;
				now++;
				break;
		}
	}
	console.log(totalP,now);
	getPgArr(totalP, now)
	
	var scriptEle = $('<script></script>').attr('src','https://api.douban.com/v2/book/search?q='+keyWord+'&start='+(now-1)*2+'&fields=status,title,image,author,publisher,summary&count=2&callback=charge');
	scriptEle.attr('id',"scriptCg");
	
	$('body').append(scriptEle)
	
})