'use strict';

//下拉菜单
selectMenu('jianyi', 2);
//回到顶部
ScrollToTOP('ad_top', 1);
//加减数量
$('.c02').click(function () {
	var num = $('#goodscount').val();
	num++;
	$('#goodscount').val(num);
});
$('.c01').click(function () {
	var num = $('#goodscount').val();
	num--;
	if (num < 1) {
		num = 1;
	}
	$('#goodscount').val(num);
});
//吸顶菜单
$(window).on('scroll', function () {
	if ($(window).scrollTop() >= 658) {
		$('#mod_goods_info_dw').addClass('xd');
	} else {
		$('#mod_goods_info_dw').removeClass('xd');
	}
});
//选项卡
$('.hd li').click(function () {
	console.log(789);
	//	$('.hd li h2 a').attr('class','other');//清空样式
	////	$(this).attr('class','on');//点击高亮
	//	$('.hd li h2 a').removeClass('other');//移除样式
	//	$('.hd li h2 a').addClass('on');//添加样式
	$('.mod_goods_cont .mod_box').css('display', 'none'); //清空
	$('.mod_goods_cont .mod_box').eq($(this).index()).css('display', 'block'); //对应的盒子跟着显示
});
//获取cookic,欢迎来到首页
function delcookie() {
	var name = Cookie.get('user');
	if (name) {
		$('.top_right ul li:last').html('欢迎&nbsp;' + '<a style="cursor:pointer;">' + name + '</a>' + '&nbsp;来到我的首页' + '<a style="cursor:pointer;color:blue;" id="exit">退出</a>');
	} else {
		$('.top_right ul li:last').html('您好&nbsp;,&nbsp;&nbsp;欢迎来到建一网网上药店！&nbsp;[<a href="javascript:;" id="login">登录</a>]&nbsp;[<a href="javascript:;" id="reg">注册</a>]');
	}
}
delcookie();
$('#exit').click(function () {
	Cookie.remove('user', '/ZhuJunTao/src/');
	delcookie();
});
$('#login').click(function () {
	window.open('login.html');
});
$('#reg').click(function () {
	window.open('reg.html');
});
//跳转到购物车
$('#tiaocar').click(function () {
	window.open('shopcar.html');
});
//放大镜
$(function () {
	(function () {
		//      var picimg = $(".imgpart .pic img");
		//      var objimg = $(".imgpart .bigpic img");
		$('#details_left').on('click', 'li', function () {
			var ulobj = $(".imglist ul");
			var picimg = $(".imgpart .pic img");
			var objimg = $(".imgpart .bigpic img");
			var pic = $(".imgpart .pic");
			var magnify = $(".imgpart .pic .magnify");
			var bigpic = $(".imgpart .bigpic");
			var objimg = $(".imgpart .bigpic img");
			var imgsrc = $(this).children("img").attr("src");
			$(this).addClass("active").siblings().removeClass("active");
			var picimg = $(".imgpart .pic img");
			var objimg = $(".imgpart .bigpic img");
			picimg.attr("src", imgsrc);
			objimg.attr("src", imgsrc);
		});
		//      var pic = $(".imgpart .pic");
		//      var magnify = $(".imgpart .pic .magnify");
		//      var bigpic = $(".imgpart .bigpic");
		//      var objimg = $(".imgpart .bigpic img");
		$('#details_left').on('mousemove', '.pic', function (e) {
			var ulobj = $(".imglist ul");
			var picimg = $(".imgpart .pic img");
			var objimg = $(".imgpart .bigpic img");
			var pic = $(".imgpart .pic");
			var magnify = $(".imgpart .pic .magnify");
			var bigpic = $(".imgpart .bigpic");
			var objimg = $(".imgpart .bigpic img");
			magnify.show();
			bigpic.show();
			var pagex = e.pageX;
			var pagey = e.pageY;
			var pictop = pic.offset().top;
			var picleft = pic.offset().left;
			var magnifyw = magnify.width();
			var magnifyh = magnify.height();
			var magnifytop = pagey - pictop - magnifyh / 2;
			var magnifyleft = pagex - picleft - magnifyw / 2;
			var picw = pic.width() - magnifyw;
			var pich = pic.height() - magnifyh;
			magnifytop = magnifytop < 0 ? 0 : magnifytop;
			magnifyleft = magnifyleft < 0 ? 0 : magnifyleft;
			magnifytop = magnifytop > pich ? pich : magnifytop;
			magnifyleft = magnifyleft > picw ? picw : magnifyleft;
			magnify.css({ top: magnifytop, left: magnifyleft });
			var minl = bigpic.width() - objimg.width();
			var mint = bigpic.height() - objimg.height();
			var objimgl = -magnifyleft * 2;
			var objimgt = -magnifytop * 2;
			objimgl = objimgl < minl ? minl : objimgl;
			objimgt = objimgt < mint ? mint : objimgt;
			objimg.css({ top: objimgt, left: objimgl });
		});
		$('#details_left').on('mouseleave', '.pic', function () {
			var ulobj = $(".imglist ul");
			var picimg = $(".imgpart .pic img");
			var objimg = $(".imgpart .bigpic img");
			var pic = $(".imgpart .pic");
			var magnify = $(".imgpart .pic .magnify");
			var bigpic = $(".imgpart .bigpic");
			var objimg = $(".imgpart .bigpic img");
			magnify.hide();
			bigpic.hide();
		});
	})();
});
//获取订单表的条数
function upcar() {
	var url = '../api/list_select.php';
	ajax('GET', url, '', function (str) {
		var arr = JSON.parse(str);
		$('.cartcount span').html(arr.length);
	});
}
upcar();
//渲染数据
var date = decodeURI(location.search);
var str = date.slice(1);
var oid = str.split('=')[1];
console.log(oid);
$.ajax({
	type: 'GET',
	url: '../api/03idSelectGoodlist.php',
	data: {
		'id': oid
	},
	success: function success(str) {
		var arr = JSON.parse(str);
		console.log(arr);
		var html = '<div class="imgdet wrap">\n\t\t\t\t        <!-- \u5DE6\u4FA7\u56FE\u7247\u5217\u8868 -->\n\t\t\t\t        <div class="imgpart">\n\t\t\t\t            <!-- \u56FE\u7247\u5C55\u793A -->\n\t\t\t\t            <div class="pic">\n\t\t\t\t                <img src="' + arr.list[0].url + '" alt="">\n\t\t\t\t                <!-- \u955C\u7247 -->\n\t\t\t\t                <div class="magnify"></div>\n\t\t\t\t            </div>\n\t\t\t\t            <!-- \u653E\u5927\u540E\u7684\u56FE\u7247, \u653E\u5927\u540E\u7684\u56FE\u7247\u7684\u5C3A\u5BF8\u8981\u8BBE\u7F6E\u4E3A\u5C55\u793A\u56FE\u7247\u7684\u500D\u6570\uFF082\u500D\uFF09-->\n\t\t\t\t            <div class="bigpic">\n\t\t\t\t                <img src="' + arr.list[0].url + '" alt="">\n\t\t\t\t            </div>\n\t\t\t\t        </div>\n\t\t\t\t        <div class="imglist">\n\t\t\t\t        \t<span class="prev"><</span>\n\t\t\t\t            <ul>\n\t\t\t\t                <li class="active">\n\t\t\t\t                    <img src="' + arr.list[0].url + '" alt="">\n\t\t\t\t                </li>\n\t\t\t\t                <li>\n\t\t\t\t                    <img src="' + arr.list[0].img_2 + '" alt="">\n\t\t\t\t                </li>\n\t\t\t\t                <li>\n\t\t\t\t                    <img src="' + arr.list[0].img_3 + '" alt="">\n\t\t\t\t                </li>\n\t\t\t\t                <li>\n\t\t\t\t                    <img src="' + arr.list[0].img_4 + '" alt="">\n\t\t\t\t                </li>\n\t\t\t\t            </ul>\n\t\t\t\t            <span class="next">></span>\n\t\t\t\t        </div>\n\t\t\t\t    </div>\n\t\t\t\t\t<div class="fl">\n\t\t\t\t\t\t<span>\u5546\u54C1\u7F16\u53F7\uFF1A</span>\n\t\t\t\t\t\t<span>06-04203</span>\n\t\t\t\t\t\t<span style="margin-left: 170px;">\u5206\u4EAB\u5230\uFF1A</span>\n\t\t\t\t\t</div>';
		var html2 = '<h1>\n                    \t<i class="df"></i>' + arr.list[0].shopname + '\n\t\t\t\t\t</h1>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t\uFF08\u5F53\u65E5\u8BA2\u5355\u9694\u65E5\u53D1\u8D27/\u8282\u5047\u65E5\u5747\u4E0D\u53D1\u8D27\uFF09\n\t\t\t\t\t</div>';
		$('#details_left').html(html);
		$('.detail_r_t').html(html2);
		$('#jianyiPrice').html('￥' + arr.list[0].price);
		$('.comment').html(arr.list[0].Comment + '人评价');
		$('.sales').html(arr.list[0].sales + '人评价');
	}
});
//加入购物车
$('#addShopCart').click(function () {
	var num = $('#goodscount').val();
	//	console.log(oid);
	$.ajax({
		type: 'GET',
		url: '../api/11newOrders.php',
		data: {
			'id': oid,
			'num': num
		},
		success: function success(str) {
			console.log(str);
		}
	});
	window.open('shopcar.html');
});