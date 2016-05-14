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
	
		module.exports = __webpack_require__(43);
	
	
	/***/ },
	
	/***/ 43:
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
		var htmlstr = __webpack_require__(44);
	
		function UiDialog(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiDialog.prototype = {
		  init: function(){
		    this.write();
		    this.addEventListerner();
		    this.exportsModuleApis();
		  },
		  write: function(){
		    var renderData = {
		      dialog: 'txp-ui-dialog',
		      dialogText: 'txp-ui-dialog-text',
		      dialogErrCode: 'txp-ui-dialog-errcode',
		      dialogBtn: 'txp-ui-dialog-button',
		      hide: Txplayer.dataset.hideClass
		    };
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.dataset.$playermod.append(htmldata);
		    this.dataset.$dialog = this.context.dataset.$playermod.find('[data-role="'+renderData.dialog+'"]');
		    this.dataset.$dialogText = this.context.dataset.$playermod.find('[data-role="'+renderData.dialogText+'"]');
		    this.dataset.$dialogErrCode = this.context.dataset.$playermod.find('[data-role="'+renderData.dialogErrCode+'"]');
		    this.dataset.$dialogBtn = this.context.dataset.$playermod.find('[data-role="'+renderData.dialogBtn+'"]');
		  },
		  remove: function(){
		    this.dataset.$dialog.remove();
		  },
		  addEventListerner: function(){
		    var that = this;
		    this.dataset.$dialogBtn.on('click', function(){
		      if (that.dataset.$dialogBtn.data('type')==='link'){
		        var url = that.context.config.otherVideoLink;
		        if (url) window.open(url);
		      }
		    });
		    this.context.msg.on(api.eventApi.onError, function(data){
		      if (data && (data.type!=='film' && data.type!=='cgi')) return;
		      that.context.msg.broadcast(api.privateApi.showErrorUiTips, data);
		    });
		  },
		  exportsModuleApis: function(){
		    var that = this;
		    this.dataset.privateApis = {};
		    this.dataset.privateApis[api.privateApi.showErrorUiTips] = function(data){
		      that.dataset.$dialog.removeClass(Txplayer.dataset.hideClass);
		      that.dataset.$dialogText.html(data.msg);
		      that.dataset.$dialogErrCode.html('[错误码:' + data.code+ ' ]');
		      // 禁止显示控制栏
		      that.context.msg.broadcast(api.privateApi.disableShowControl, true);
		    }
		    $.each(this.dataset.privateApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    })
		  }
		};
	
		Txplayer.register('UiDialog', UiDialog);
	
	/***/ },
	
	/***/ 44:
	/***/ function(module, exports) {
	
		module.exports = "<txpdiv data-role=\"<%=dialog%>\" class=\"txp_overlay_dialog <%=hide%>\">\n  <txpdiv class=\"txp_dialog\">\n    <txpdiv class=\"txp_dialog_body\">\n      <txpdiv data-role=\"<%=dialogText%>\" class=\"txp_text\">呃~Sorry，您要观看的节目不存在！</txpdiv>\n      <txpdiv data-role=\"<%=dialogErrCode%>\" class=\"txp_error_code\">[错误码：001]</txpdiv>\n    </txpdiv>\n    <txpdiv class=\"txp_dialog_footer\">\n      <button data-type=\"link\" data-role=\"<%=dialogBtn%>\" class=\"txp_btn txp_btn_primary\">点击观看其他精彩节目</button>\n    </txpdiv>\n  </txpdiv>\n</txpdiv>";
	
	/***/ }
	
	/******/ });
