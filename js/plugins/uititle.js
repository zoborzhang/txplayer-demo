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
	
		module.exports = __webpack_require__(73);
	
	
	/***/ },
	
	/***/ 73:
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
		var htmlstr = __webpack_require__(74);
	
		function UiTitle(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiTitle.prototype = {
		  init: function(){
		    this.dataset.playerConfig = this.context.config;
		    this.write();
		    this.initDisplay();
		    this.addEventListener();
		    this.exportsModuleApis();
		  },
		  write: function(){
		    var renderData = {
		      hideClass: Txplayer.dataset.hideClass,
		      title: 'txp-ui-title-mod',
		      titleText: 'txp-ui-title-text'
		    };
		    this.dataset.renderData = renderData;
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.dataset.$playermod.append(htmldata);
		    this.dataset.$title = this.context.dataset.$playermod.find('[data-role="'+renderData.title+'"]');
		    this.dataset.$titleText = this.context.dataset.$playermod.find('[data-role="'+renderData.titleText+'"]');
		  },
		  remove: function(){
		    this.dataset.$title.remove();
		  },
		  initDisplay: function(){
		    if (this.dataset.playerConfig.showTitle) {
		      this.dataset.$title.removeClass(Txplayer.dataset.hideClass);
		    }else{
		      this.dataset.$title.addClass(Txplayer.dataset.hideClass);
		    }
		  },
		  updateTile: function(){
		    var title = '';
		    var json = this.context.msg.run(api.privateApi.getVideoInfoData);
		    if (json && json.vl &&
		      json.vl.vi && json.vl.vi[0] &&
		      json.vl.vi[0].ti) {
		      title = json.vl.vi[0].ti;
		    }
		    if (!title) return;
		    this.dataset.$titleText.html(title);
		  },
		  addEventListener: function(){
		    var that = this;
		    that.updateTile();
	
		    this.dataset.eventsList = {};
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onGetVideoUrlSuccess)] = function(){
		      that.updateTile();
		    }
		    $.each(this.dataset.eventsList,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
	
		    this.dataset.$title.on('mouseenter', function(){
		      that.context.msg.broadcast(api.privateApi.disableHideControl, true);
		    }).on('mouseleave', function(){
		      that.context.msg.broadcast(api.privateApi.disableHideControl, false);
		    });
		  },
		  exportsModuleApis: function(){
		    var that = this;
		    this.dataset.privateApis = {};
		    this.dataset.privateApis[api.privateApi.hideUiTitle] = function(){
		      that.dataset.$title.addClass(Txplayer.dataset.hideClass);
		    }
		    this.dataset.privateApis[api.privateApi.showUiTitle] = function(){
		      if (!that.dataset.playerConfig.showTitle) return;
		      that.dataset.$title.removeClass(Txplayer.dataset.hideClass);
		    }
		    $.each(this.dataset.privateApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
		  }
		};
	
		Txplayer.register('UiTitle', UiTitle);
	
	/***/ },
	
	/***/ 74:
	/***/ function(module, exports) {
	
		module.exports = "<txpdiv data-role=\"<%=title%>\" class=\"txp_video_title <%=hideClass%>\">\n  <a data-role=\"<%=titleText%>\" class=\"txp_title_link\"></a>\n</txpdiv>";
	
	/***/ }
	
	/******/ });
