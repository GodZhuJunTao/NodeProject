"use strict";

//主入口
//配置
require.config({
	//配置段路径（别名）
	paths: {
		"jq": "jquery-1.10.1.min",
		"jqb": "jqbanner",
		"common": "Common",
		"index": "index"
	},
	shim: {
		'jqb': ['jq', 'common'],
		'index': ['jq', 'common']
	}
});
requirejs(['jq', 'jqb', 'common', 'index'], function ($) {
	console.log('首页成功');
});