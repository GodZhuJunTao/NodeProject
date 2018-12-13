"use strict";

//主入口
//配置
require.config({
	//配置段路径（别名）
	paths: {
		"jq": "jquery-1.10.1.min",
		"common": "Common",
		"login": "login"
	},
	shim: {
		'login': ['jq', 'common']
	}
});
requirejs(['jq', 'common', 'login'], function ($) {
	console.log('登陆页成功');
});