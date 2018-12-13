"use strict";

//主入口
//配置
require.config({
	//配置段路径（别名）
	paths: {
		"jq": "jquery-1.10.1.min",
		"common": "Common",
		"detail": "detail"
	},
	shim: {
		'detail': ['jq', 'common']
	}
});
requirejs(['jq', 'common', 'detail'], function ($) {
	console.log('详情页成功');
});