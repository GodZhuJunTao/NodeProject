"use strict";

//主入口
//配置
require.config({
	//配置段路径（别名）
	paths: {
		"jq": "jquery-1.10.1.min",
		"common": "Common",
		"reg": "reg"
	},
	shim: {
		'reg': ['jq', 'common']
	}
});
requirejs(['jq', 'common', 'reg'], function ($) {
	console.log('注册页成功');
});