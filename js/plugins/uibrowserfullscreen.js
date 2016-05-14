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
	
		module.exports = __webpack_require__(34);
	
	
	/***/ },
	
	/***/ 34:
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
		var htmlstr = __webpack_require__(35);
	
		function UiBrowserFullScreen(context) {
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiBrowserFullScreen.prototype = {
		  init: function() {
		    this.dataset.browserFullscreenClass = 'txp_mode_fullscreen';
		    this.dataset.isBrowserFullscreen = false;
		    this.dataset.isWindowFullscreen = false;
		    this.dataset.playerConfig = this.context.msg.run(api.privateApi.getPlayerConfig);
		    this.write();
		    this.addEventListerner();
		    this.exportsModuleApis();
		  },
		  write: function() {
		    var renderData = {
		      fakeBtn: 'txp-ui-control-fakebtn',
		      toolTip: 'browser-fullscreen',
		      tabindex: Txplayer.dataset.tabindex++
		    };
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.$mod.$buttonsrightmod.append(htmldata);
		    this.dataset.$fakebtn = this.context.$mod.$buttonsrightmod.find('[data-role="' + renderData.fakeBtn + '"]');
		    this.dataset.$txp_tooltip = this.dataset.$fakebtn.find('[data-role="' + renderData.toolTip + '"]');
		    this.dataset.$playermod = this.context.$mod.$playermod;
		    this.initDisplay();
		  },
		  remove: function(){
		    this.dataset.$fakebtn.remove();
		  },
		  initDisplay: function(){
		    if (this.dataset.playerConfig.showBrowserFullScreen){
		      this.dataset.$fakebtn.removeClass(Txplayer.dataset.hideClass);
		    }else{
		      this.dataset.$fakebtn.addClass(Txplayer.dataset.hideClass);
		    }
		  },
		  toggleBrowserFullScreen: function(){
		    if (this.dataset.isBrowserFullscreen) {
		      this.context.superMsg.broadcast(api.publicApi.exitBrowserFullscreen);
		    } else {
		      this.context.superMsg.broadcast(api.publicApi.enterBrowserFullscreen);
		    }
		  },
		  addEventListerner: function() {
		    var that = this;
		    this.dataset.$fakebtn.on(Txplayer.dataset.clickEventName, function() {
		      that.toggleBrowserFullScreen();
		    });
		  },
		  exportsModuleApis: function(){
		    var that = this;
		    this.dataset.moduleApis = {};
		    this.dataset.moduleApis[api.publicApi.toggleBrowserFullScreen] = function(){
		      that.toggleBrowserFullScreen();
		    }
		    this.dataset.moduleApis[api.publicApi.enterBrowserFullscreen] = function() {
		      var enterFullscreen = function(){
		        that.context.$mod.$playermod.addClass(that.dataset.browserFullscreenClass);
		        that.dataset.$fakebtn.attr('data-status', 'true');
		        that.dataset.isBrowserFullscreen = true;
		        that.dataset.$txp_tooltip.html('退出网页全屏');
		        $("html").addClass('txp_html_fullscreen');
		        that.context.userMsg.broadcast(api.eventApi.onBrowserFullscreenChange,that.dataset.isBrowserFullscreen);
		      };
		      if(that.context.superMsg.run(api.publicApi.isWindowFullscreen)){
		        that.context.msg.once(api.eventApi.onWindowFullscreenChange, function(isFullScreen){
		            setTimeout(function(){
		              enterFullscreen();
		            },10);
		        });
		      }else{
		        enterFullscreen();
		      }
		      that.context.superMsg.broadcast(api.publicApi.exitWindowFullscreen);
		    }
		    this.dataset.moduleApis[api.publicApi.exitBrowserFullscreen] = function(data, options) {
		      data = data || {};
		      //退出浏览器全屏
		      if (!data.noUpdateClass){
		        that.context.$mod.$playermod.removeClass(that.dataset.browserFullscreenClass);
		        that.context.superMsg.broadcast(api.publicApi.exitWindowFullscreen);
		      }
		      that.dataset.$fakebtn.attr('data-status', false);
		      that.dataset.isBrowserFullscreen = false;
		      that.dataset.$txp_tooltip.html('网页全屏');
		      $("html").removeClass('txp_html_fullscreen');
		      that.context.userMsg.broadcast(api.eventApi.onBrowserFullscreenChange, that.dataset.isBrowserFullscreen);
		      that.dataset.$playermod.focus();
		    }
		    this.dataset.moduleApis[api.publicApi.isBrowserFullscreen] = function(data, options) {
		      options.data = that.dataset.isBrowserFullscreen;
		    }
		    $.each(this.dataset.moduleApis,function(key, fn){
		      that.context.superMsg.on(key, fn);
		    })
		  }
		};
	
		Txplayer.register('UiBrowserFullScreen', UiBrowserFullScreen);
	
	
	/***/ },
	
	/***/ 35:
	/***/ function(module, exports) {
	
		module.exports = "<button class=\"txp_btn txp_btn_fake txp_none\" data-role=\"<%=fakeBtn%>\" data-status=\"false\" data-report=\"browser-fullscreen\">\n  <svg class=\"txp_icon txp_icon_fake\" version=\"1.1\" viewBox=\"0 0 24 24\">\n    <use class=\"txp_svg_symbol txp_svg_fake\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_fake\"></use>\n    <use class=\"txp_svg_symbol txp_svg_fake_true\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_fake_true\"></use>\n  </svg>\n  <txpdiv class=\"txp_tooltip\" data-role=\"<%=toolTip%>\">网页全屏</txpdiv>\n</button>\n";
	
	/***/ }
	
	/******/ });
