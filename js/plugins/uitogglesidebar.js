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
	
		module.exports = __webpack_require__(75);
	
	
	/***/ },
	
	/***/ 75:
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
		var htmlstr = __webpack_require__(76);
	
		function UiToggleSidebar(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiToggleSidebar.prototype = {
		  init: function(){
		    this.dataset.playerConfig = this.context.msg.run(api.privateApi.getPlayerConfig);
		    this.write();
		    this.initDisplay();
		    this.addEventListener();
		  },
		  initDisplay: function(){
		    if (this.dataset.playerConfig.showToggleSideBar) {
		      this.dataset.$btn.removeClass(Txplayer.dataset.hideClass);
		    }else{
		      this.dataset.$btn.addClass(Txplayer.dataset.hideClass);
		    }
		  },
		  write: function(){
		    var renderData = {
		      btn: 'txp-ui-control-sidebar',
		      tooltips: 'txp-ui-control-sidebar-tooltips',
		      tabindex: Txplayer.dataset.tabindex++,
		      hideClass: Txplayer.dataset.hideClass
		    };
		    this.dataset.renderData = renderData;
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.$mod.$buttonsrightmod.append(htmldata);
		    this.dataset.$btn = this.context.$mod.$buttonsrightmod.find('[data-role=' + renderData.btn +']');
		    this.dataset.$tooltips = this.context.$mod.$buttonsrightmod.find('[data-role=' + renderData.tooltips +']');
		  },
		  remove: function(){
		    this.dataset.$btn.remove();
		  },
		  addEventListener: function(){
		    var that = this;
		    this.dataset.$btn.on(Txplayer.dataset.clickEventName, function(){
		      var action = '';
		      if (that.dataset.$btn.attr('data-status')==='true') {
		        action = 'show';
		      }else{
		        action = 'hide';
		      }
		      that.context.userMsg.broadcast(api.eventApi.onToggleSideBar, action);
		    });
		    this.context.userMsg.on(api.eventApi.onToggleSideBar, function(data){
		      if(data==='show'){
		        that.dataset.$btn.attr('data-status', 'false');
		        that.dataset.$tooltips.html('收起侧栏');
		      }else{
		        that.dataset.$btn.attr('data-status', 'true');
		        that.dataset.$tooltips.html('展开侧栏');
		      }
		    });
		  }
		};
	
		Txplayer.register('UiToggleSidebar', UiToggleSidebar);
	
	/***/ },
	
	/***/ 76:
	/***/ function(module, exports) {
	
		module.exports = "<button data-role=\"<%=btn%>\" class=\"txp_btn txp_btn_size <%=hideClass%>\" data-status=\"false\" data-report=\"sidebar-toggle\">\n  <svg class=\"txp_icon txp_icon_size\" version=\"1.1\" viewBox=\"0 0 24 24\">\n    <use class=\"txp_svg_symbol txp_svg_size\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_size\"></use>\n    <use class=\"txp_svg_symbol txp_svg_size_true\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_size_true\"></use>\n  </svg>\n  <txpdiv data-role=\"<%=tooltips%>\" class=\"txp_tooltip\">收起侧栏</txpdiv>\n</button>";
	
	/***/ }
	
	/******/ });
