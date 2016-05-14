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
	
		module.exports = __webpack_require__(71);
	
	
	/***/ },
	
	/***/ 71:
	/***/ function(module, exports, __webpack_require__) {
	
		var htmlstr = __webpack_require__(72);
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api             = Txplayer.apiList;
		function UiTips(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
		UiTips.prototype = {
		  init: function(){
		    this.write();
		    this.addEventListener();
		    this.exportsModuleApis();
		  },
		  write: function(){
		    var renderData = {
		      hide: Txplayer.dataset.hideClass,
		      tips: 'txp-ui-tips',
		      text: 'txp-ui-tips-text',
		      close: 'txp-ui-tips-close',
		    };
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.dataset.$playermod.append(htmldata);
		    this.dataset.$tips = this.context.dataset.$playermod.find('[data-role="'+renderData.tips+'"]');
		    this.dataset.$text = this.context.dataset.$playermod.find('[data-role="'+renderData.text+'"]');
		    this.dataset.$close = this.context.dataset.$playermod.find('[data-role="'+renderData.close+'"]');
		  },
		  remove: function(){
		    this.dataset.$tips.remove();
		  },
		  addEventListener: function(){
		    var that = this;
		    this.dataset.$close.on('click', function(){
		      that.context.msg.broadcast(api.privateApi.hideUiTips);
		    });
		  },
		  exportsModuleApis: function(){
		    var that = this;
		    this.dataset.privateApis = {};
		    this.dataset.privateApis[api.privateApi.showUiTips]  = function(data){
		      if ( !(data && data.text) ) return;
		      data.time = data.time || 4;
		      if($.type(data.hideClose)==='undefined') data.hideClose = false;
		      if (data.hideClose) that.dataset.$close.addClass(Txplayer.dataset.hideClass);
		      else that.dataset.$close.removeClass(Txplayer.dataset.hideClass);
		      that.dataset.$tips.removeClass(Txplayer.dataset.hideClass);
		      that.dataset.$text.html(data.text);
		      if (that.dataset.hide_TIMER) clearTimeout(that.dataset.hide_TIMER);
		      that.dataset.hide_TIMER = setTimeout(function(){
		        that.context.msg.broadcast(api.privateApi.hideUiTips);
		      },data.time * 1000);
		    }
		    this.dataset.privateApis[api.privateApi.hideUiTips]  = function(data){
		      that.dataset.$tips.addClass(Txplayer.dataset.hideClass);
		    }
		    $.each(this.dataset.privateApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
		  }
		};
	
		Txplayer.register('UiTips', UiTips);
	
	/***/ },
	
	/***/ 72:
	/***/ function(module, exports) {
	
		module.exports = "<txpdiv data-role=\"<%=tips%>\" class=\"txp_alert_info <%=hide%>\">\n  <txpdiv class=\"txp_alert_content\">\n    <txpdiv data-role=\"<%=text%>\" class=\"txp_alert_text\"></txpdiv>\n    <button data-role=\"<%=close%>\" class=\"txp_btn txp_btn_close\" title=\"关闭\"></button>\n  </txpdiv>\n</txpdiv>";
	
	/***/ }
	
	/******/ });
