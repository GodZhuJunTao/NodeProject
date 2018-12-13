"use strict";

//主入口
//配置
require.config({
	//配置段路径（别名）
	paths: {
		"jq": "jquery-1.10.1.min",
		"common": "Common",
		"shopcar": "shopcar"
	},
	shim: {
		'shopcar': ['jq', 'common']
	}
});
requirejs(['jq', 'common', 'shopcar'], function ($) {
	console.log('购物车页成功');
});