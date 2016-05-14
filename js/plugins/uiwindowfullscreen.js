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
	
		module.exports = __webpack_require__(79);
	
	
	/***/ },
	
	/***/ 79:
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
		var htmlstr = __webpack_require__(80);
	
		function UiWindowFullScreen(context) {
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiWindowFullScreen.prototype = {
		  init: function() {
		    this.dataset.browserFullscreenClass = 'txp_mode_fullscreen';
		    this.dataset.isBrowserFullscreen = false;
		    this.dataset.isWindowFullscreen = false;
		    this.write();
		    this.addEventListerner();
		    this.exportsModuleApis();
		  },
		  write: function() {
		    var renderData = {
		      fullscreenBtn: 'txp-ui-control-fullscreenbtn',
		      toolTip: 'window-fullscreen',
		      tabindex: Txplayer.dataset.tabindex++
		    };
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.$mod.$buttonsrightmod.append(htmldata);
		    this.dataset.$fullscreenBtn = this.context.$mod.$buttonsrightmod.find('[data-role="' + renderData.fullscreenBtn + '"]');
		    this.dataset.$txp_tooltip = this.dataset.$fullscreenBtn.find('[data-role="' + renderData.toolTip + '"]');
		    this.dataset.$playermod = this.context.$mod.$playermod;
		    this.dataset.$fullscreenContainer = this.context.$mod.$playermod[0];
		  },
		  remove: function(){
		    this.dataset.$fullscreenBtn.remove();
		  },
		  toggleWindowFullScreen: function(){
		    if (this.dataset.isWindowFullscreen) {
		      this.context.superMsg.broadcast(api.publicApi.exitWindowFullscreen);
		    } else {
		      this.context.superMsg.broadcast(api.publicApi.enterWindowFullscreen);
		    }
		  },
		  requestFullScreen: function(elem, mode, fn){
		    elem = elem || this.dataset.$fullscreenContainer;
		    mode = mode || 'enter';
		    if (mode==='enter'){
		      fn = elem.requestFullscreen || elem.mozRequestFullScreen || elem.webkitRequestFullscreen || elem.webkitRequestFullscreen;
		      if (!fn){
		        elem = document;
		        fn = elem.requestFullscreen || elem.mozRequestFullScreen || elem.webkitRequestFullscreen || elem.webkitRequestFullscreen;
		      }
		    }else{
		      fn = elem.cancelFullScreen || elem.mozCancelFullScreen || elem.webkitCancelFullScreen || elem.exitFullscreen || elem.webkitExitFullscreen;
		      if (!fn){
		        elem = document;
		        fn = elem.cancelFullScreen || elem.mozCancelFullScreen || elem.webkitCancelFullScreen || elem.exitFullscreen || elem.webkitExitFullscreen;
		      }
		    }
		    try{
		      if (fn) {
		        fn.call(elem);
		      }
		      // dom节点不能支持全屏模式，video进入全屏模式
		      else if(!fn && mode==='enter'){
		        this.context.superMsg.broadcast(api.privateApi.videoRequestFullScreen);
		      }
		    }catch(e){
		      util.showError('requestFullScreen error', e);
		      this.context.superMsg.broadcast(api.privateApi.reportError, {
		        msg: e.message,
		        code: '3000',
		        stack: e.stack
		      });
		    }
		  },
		  isFullScreen: function(){
		    if ($.type(document.webkitIsFullScreen)!=='undefined'){
		      return document.webkitIsFullScreen;
		    }
		  },
		  exitWindowFullscreen: function(){
		    var that = this;
		    that.dataset.$fullscreenBtn.attr('data-status', false);
		    that.dataset.isWindowFullscreen = false;
		    that.dataset.$txp_tooltip.html('全屏');
		    that.requestFullScreen(null, 'exit');
		  },
		  enterWindowFullscreen: function(){
		    var that = this;
		    that.context.superMsg.broadcast(api.publicApi.exitBrowserFullscreen, {noUpdateClass: true});
		    that.dataset.$fullscreenBtn.attr('data-status', true);
		    that.dataset.isWindowFullscreen = true;
		    that.dataset.$txp_tooltip.html('退出全屏');
		    that.requestFullScreen(null, 'enter');
		  },
		  addEventListerner: function() {
		    var that = this;
		    this.dataset.$fullscreenBtn.on(Txplayer.dataset.clickEventName, function() {
		      that.toggleWindowFullScreen();
		    });
	
		    //监听全屏变化事件
		    $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', function(e) {
		      that.context.userMsg.broadcast(api.eventApi.onWindowFullscreenChange,that.dataset.isWindowFullscreen);
		      that.context.msg.broadcast(api.eventApi.onWindowFullscreenChange,that.dataset.isWindowFullscreen);
		      if(that.isFullScreen()){
		        that.enterWindowFullscreen();
		        that.context.$mod.$playermod.addClass(that.dataset.browserFullscreenClass);
		      }else{
		        that.exitWindowFullscreen();
		        that.context.$mod.$playermod.removeClass(that.dataset.browserFullscreenClass);
		      }
		    });
		  },
		  exportsModuleApis: function(){
		    var that = this;
		    this.dataset.moduleApis = {};
		    this.dataset.moduleApis[api.publicApi.toggleWindowFullScreen] = function(){
		      that.toggleWindowFullScreen();
		    }
		    this.dataset.moduleApis[api.publicApi.enterWindowFullscreen] = function() {
		      that.enterWindowFullscreen();
		    }
		    this.dataset.moduleApis[api.publicApi.exitWindowFullscreen] = function() {
		      that.exitWindowFullscreen();
		    }
		    this.dataset.moduleApis[api.publicApi.isWindowFullscreen] = function(data, options) {
		      options.data = that.dataset.isWindowFullscreen;
		    }
		    $.each(this.dataset.moduleApis,function(key, fn){
		      that.context.superMsg.on(key, fn);
		    });
		  }
	
		};
	
		Txplayer.register('UiWindowFullScreen', UiWindowFullScreen);
	
	
	/***/ },
	
	/***/ 80:
	/***/ function(module, exports) {
	
		module.exports = "<button class=\"txp_btn txp_btn_fullscreen\" data-role=\"<%=fullscreenBtn%>\" data-status=\"false\" data-report=\"window-fullscreen\">\n  <svg class=\"txp_icon txp_icon_fullscreen\" version=\"1.1\" viewBox=\"0 0 24 24\">\n    <use class=\"txp_svg_symbol txp_svg_fullscreen\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_fullscreen\"></use>\n    <use class=\"txp_svg_symbol txp_svg_fullscreen_true\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_fullscreen_true\"></use>\n  </svg>\n  <txpdiv class=\"txp_tooltip\" data-role=\"<%=toolTip%>\">全屏</txpdiv>\n</button>\n";
	
	/***/ }
	
	/******/ });
