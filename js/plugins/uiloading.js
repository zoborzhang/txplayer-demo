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
	
		module.exports = __webpack_require__(47);
	
	
	/***/ },
	
	/***/ 47:
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
		var htmlstr = __webpack_require__(48);
	
		function UiLoading(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiLoading.prototype = {
		  init: function(){
		    this.write();
		    this.addEventListerner();
		  },
		  write: function(){
		    var renderData = {
		      loading: 'txp-ui-loading',
		      hide: Txplayer.dataset.hideClass
		    };
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.dataset.$playermod.append(htmldata);
		    this.dataset.$loading = this.context.dataset.$playermod.find('[data-role="'+renderData.loading+'"]');
		  },
		  remove: function(){
		    this.dataset.$loading.remove();
		  },
		  addEventListerner: function(){
		    var that = this;
		    this.dataset.eventsList = {};
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPlaying)] = function(){
		      that.dataset.$loading.addClass(Txplayer.dataset.hideClass);
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionSeeked)] = function(){
		      that.dataset.$loading.addClass(Txplayer.dataset.hideClass);
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onNetworkBadEnd)] = function(){
		      that.dataset.$loading.addClass(Txplayer.dataset.hideClass);
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionLoadstart)] = function(){
		      that.dataset.$loading.removeClass(Txplayer.dataset.hideClass);
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionSeeking)] = function(){
		      that.dataset.$loading.removeClass(Txplayer.dataset.hideClass);
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionWaiting)] = function(){
		      that.dataset.$loading.removeClass(Txplayer.dataset.hideClass);
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onNetworkBadStart)] = function(){
		      that.dataset.$loading.removeClass(Txplayer.dataset.hideClass);
		    }
		    $.each(this.dataset.eventsList,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
		  }
		};
	
		Txplayer.register('UiLoading', UiLoading);
	
	/***/ },
	
	/***/ 48:
	/***/ function(module, exports) {
	
		module.exports = "<txpdiv data-role=\"<%=loading%>\" class=\"txp_overlay_loading <%=hide%>\">\n  <txpdiv class=\"txp_icon_loading\"></txpdiv>\n</txpdiv>";
	
	/***/ }
	
	/******/ });
