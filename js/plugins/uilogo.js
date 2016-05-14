/*! TenVideoPlayer_V3 - v3.0.0 
* Update Sat May 14 2016 10:19:16 GMT+0800 (CST)
* Copyright (c) 2016
* Powered by Tencent-Video Web Front End Team
*/
	/******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	
	
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ({
	
	/***/ 0:
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = __webpack_require__(49);
	
	
	/***/ },
	
	/***/ 49:
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
		var htmlstr = __webpack_require__(50);
	
		function UiLogo(context) {
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiLogo.prototype = {
		  init: function(){
		    this.dataset.playerConfig = this.context.msg.run(api.privateApi.getPlayerConfig);
		    this.dataset.vidsList = this.dataset.playerConfig.vidsList;
		    this.dataset.homepage = 'http://v.qq.com/'
		    this.write();
		    this.initDisplay();
		    this.addEventListerner();
		    this.exportsModuleApis();
		  },
		  initDisplay: function(){
		    if (this.dataset.playerConfig.showLogo) {
		      this.dataset.$logo.removeClass(Txplayer.dataset.hideClass);
		    }else{
		      this.dataset.$logo.addClass(Txplayer.dataset.hideClass);
		    }
		  },
		  write: function(){
		    var renderData = {
		      logo: 'txp-ui-control-logo',
		      hideClass: Txplayer.dataset.hideClass,
		      tabindex: Txplayer.dataset.tabindex++
		    };
		    this.dataset.renderData = renderData;
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.$mod.$buttonsrightmod.append(htmldata);
		    this.dataset.$logo = this.context.$mod.$buttonsrightmod.find('[data-role="'+renderData.logo+'"]');
		  },
		  remove: function(){
		    this.dataset.$logo.remove();
		  },
		  getPlayUrlFromVid: function(vid, exstr, start){
		    if(exstr!="0") exstr = "_" + exstr;
		    else exstr = '';
		    if (!vid) return '';
		    var url = this.dataset.homepage + "page/"+vid.substr(0,1)+"/"+vid.substr(vid.length-2,1)+"/"+vid.substr(vid.length-1,1)+"/"+vid+exstr+".html";
		    if(start){
		      url += '?start=' + parseInt(start);
		    }
		    return url;
		  },
		  openAtTencentVideo: function(){
		    var vid = this.context.superMsg.run(api.publicApi.getVid);
		    var start = this.context.superMsg.run(api.publicApi.getCurrentTime);
		    if (!vid) return;
		    var url = this.getPlayUrlFromVid(vid, 0, start);
		    if (url){
		      util.showInfo('到 腾讯视频 播放', url);
		      window.open(url);
		      // 点击logo上报
		    }
		  },
		  addEventListerner: function() {
		    var that = this;
		    this.dataset.$logo.on('click', function(){
		      that.openAtTencentVideo();
		    });
		  },
		  exportsModuleApis: function(){
		    var that = this;
		    this.dataset.privateApis = {};
		    this.dataset.privateApis[api.privateApi.openAtTencentVideo] = function(){
		      that.openAtTencentVideo();
		    }
		    $.each(this.dataset.privateApis, function(key, fn){
		      that.context.superMsg.on(key, fn);
		    })
		  }
		};
	
		Txplayer.register('UiLogo', UiLogo);
	
	
	/***/ },
	
	/***/ 50:
	/***/ function(module, exports) {
	
		module.exports = "<a data-role=\"<%=logo%>\" class=\"txp_btn txp_btn_logo <%=hideClass%>\" data-report=\"click-logo\">\n  <span class=\"txp_logo\"></span>\n  <txpdiv class=\"txp_tooltip\">到腾讯视频观看此视频</txpdiv>\n</a>";
	
	/***/ }
	
	/******/ });
