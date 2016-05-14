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
	
		module.exports = __webpack_require__(36);
	
	
	/***/ },
	
	/***/ 36:
	/***/ function(module, exports, __webpack_require__) {
	
		var htmlstr = __webpack_require__(37);
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api             = Txplayer.apiList;
		function UiControl(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
		UiControl.prototype = {
		  init: function(){
		    this.dataset.controlHideClass = 'txp_autohide';
		    this.write();
		    this.addEventListener();
		    this.exportsModuleApis();
		    this.loadSubPlugins();
		  },
		  write: function(){
		    var renderData = {
		      controlWrap: 'txp-control-wrap',
		      progressRole: 'txp-control-progress',
		      buttonsLeftRole: 'txp-control-left',
		      buttonsRightRole: 'txp-control-right',
		      hide: Txplayer.dataset.hideClass,
		      autoHide: this.dataset.controlHideClass
		    };
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.dataset.$playermod.append(htmldata);
		    this.dataset.$playermod = this.context.dataset.$playermod;
		    this.dataset.$controlWrap = this.context.dataset.$playermod.find('[data-role="'+renderData.controlWrap+'"]')
		    this.dataset.$progressmod = this.context.dataset.$playermod.find('[data-role="'+renderData.progressRole+'"]');
		    this.dataset.$buttonsleftmod = this.context.dataset.$playermod.find('[data-role="'+renderData.buttonsLeftRole+'"]');
		    this.dataset.$buttonsrightmod = this.context.dataset.$playermod.find('[data-role="'+renderData.buttonsRightRole+'"]');
		    this.context.dataset.$playermod.addClass(this.dataset.controlHideClass);
		  },
		  remove: function(){
		    this.dataset.$controlWrap.remove();
		  },
		  loadSubPlugins: function(){
		    var plugins = [];
		    var that = this;
		    if (this.context.pluginConfig &&
		      $.type(this.context.pluginConfig.subPlugins)==='array') {
		      plugins = this.context.pluginConfig.subPlugins.slice(0);
		    }
		    var context = {
		      'superMsg': this.context.msg,
		      'userMsg': this.context.userMsg,
		      'msg': this.msg,
		      '$mod': {
		        '$playermod': this.dataset.$playermod,
		        '$progressmod': this.dataset.$progressmod,
		        '$buttonsleftmod': this.dataset.$buttonsleftmod,
		        '$buttonsrightmod': this.dataset.$buttonsrightmod
		      }
		    };
		    util.loadPlugins.call(this, plugins, context, this.context.config.settings);
		  },
		  getPlayerConfig: function(){
		    return this.context.config;
		  },
		  handlerMouse: function(){
		    var that = this;
		    this.dataset.$controlWrap.on('mouseenter touchstart', function(){
		      that.context.msg.broadcast(api.privateApi.disableHideControl, true);
		    }).on('mouseleave touchend', function(){
		      that.context.msg.broadcast(api.privateApi.disableHideControl, false);
		    });
		  },
		  handlerControlShowOnMobile: function(){
		    var that = this;
		    this.dataset.$controlWrap.on('touchend', function(e){
		      // 点击控制栏，延时3秒隐藏
		      that.context.msg.broadcast(api.privateApi.showPlayerUiTools);
		      that.context.msg.broadcast(api.privateApi.hidePlayerUiTools, 3000);
		      that.context.msg.broadcast(api.privateApi.hideUiSettingLayerOnMobile,{
		        targetElem: e.target
		      });
		    });
		  },
		  isControlShow: function(){
		    if (this.dataset.$controlWrap.hasClass(Txplayer.dataset.hideClass)) return false;
		    if (this.context.dataset.$playermod.hasClass(this.dataset.controlHideClass)) {
		      if (this.context.dataset.$playermod.hasClass('txp_autohide_progress')) {
		        return false;
		      }
		      return true;
		    }
		    return true;
		  },
		  addEventListener: function(){
		    if (!util.mobile) this.handlerMouse();
		    if (util.mobile) this.handlerControlShowOnMobile();
		  },
		  exportsModuleApis: function(){
		    var that = this;
		    this.dataset.privateApis = {};
		    this.dataset.privateApis[api.privateApi.hideUiControl] = function(data,options){
		      data = data || {isMoveBelow: true};
		      if (data.isMoveBelow) {
		        that.context.dataset.$playermod.addClass(that.dataset.controlHideClass);
		      }else {
		        that.dataset.$controlWrap.addClass(Txplayer.dataset.hideClass);
		      }
		    }
		    this.dataset.privateApis[api.privateApi.showUiControl] = function(data, options){
		      data = data || {isMoveBelow: true};
		      if (data.isMoveBelow) {
		        that.context.dataset.$playermod.removeClass(that.dataset.controlHideClass);
		      }else {
		        that.dataset.$controlWrap.removeClass(Txplayer.dataset.hideClass);
		      }
		    }
		    this.dataset.privateApis[api.privateApi.isControlShow] = function(data, options){
		      options.data = that.isControlShow();
		    }
		    $.each(this.dataset.privateApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
	
		    this.dataset.selfApis = {};
		    this.dataset.selfApis[api.privateApi.getPlayerConfig] = function(data, options){
		      options.data = that.getPlayerConfig();
		    }
		    $.each(this.dataset.selfApis,function(key, fn){
		      that.msg.on(key, fn);
		    })
		  }
		};
	
		Txplayer.register('UiControl', UiControl);
	
	/***/ },
	
	/***/ 37:
	/***/ function(module, exports) {
	
		module.exports = "<txpdiv data-role=\"<%=controlWrap%>\" class=\"txp_bottom\">\n  <txpdiv class=\"txp_progress_bar_container\" data-role=\"<%=progressRole%>\"></txpdiv>\n  <txpdiv class=\"txp_controls\">\n    <txpdiv class=\"txp_left_controls\" data-role=\"<%=buttonsLeftRole%>\"></txpdiv>\n    <txpdiv class=\"txp_right_controls\" data-role=\"<%=buttonsRightRole%>\"></txpdiv>\n  </txpdiv>\n</txpdiv>";
	
	/***/ }
	
	/******/ });
