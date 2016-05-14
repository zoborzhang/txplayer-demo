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
	
		module.exports = __webpack_require__(40);
	
	
	/***/ },
	
	/***/ 40:
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
		var htmlstr = __webpack_require__(41);
		var definitionListStr = __webpack_require__(42);
	
		function UiDefinition(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiDefinition.prototype = {
		  init: function(){
		    this.dataset.currentClass = 'txp_current';
		    this.write();
		    this.addEventListener();
		  },
		  write: function(){
		    var renderData = {
		      definition: 'txp-ui-control-definition',
		      hoverBtn: 'txp-ui-control-definition-hover',
		      list: 'txp-ui-control-definition-list',
		      tabindex: Txplayer.dataset.tabindex++
		    };
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.$mod.$buttonsrightmod.append(htmldata);
		    this.dataset.$definition = this.context.$mod.$buttonsrightmod.find('[data-role="'+renderData.definition+'"]');
		    this.dataset.$hover = this.context.$mod.$buttonsrightmod.find('[data-role="'+renderData.hoverBtn+'"]');
		    this.dataset.$list = this.context.$mod.$buttonsrightmod.find('[data-role="'+renderData.list+'"]');
		  },
		  remove: function(){
		    this.dataset.$definition.remove();
		    this.dataset.$list.remove()
		  },
		  getCurrentDefinitionName: function(){
		    var list = this.context.superMsg.run(api.publicApi.getDefinitionList);
		    var currentDefinition = this.context.superMsg.run(api.publicApi.getDefinition);
		    if ( $.type(list)!=='array' ) return '';
		    if (!currentDefinition) return '';
		    var cname= '';
		    $(list).each(function(idx, item){
		      if (item.name===currentDefinition) {
		        cname = item.cname;
		        return false;
		      }
		    });
		    cname = cname.replace(/\d+P?/g,'');
		    return cname;
		  },
		  updateDefinitionList: function(isGetinfoCallback){
		    var that = this;
		    var list = that.context.superMsg.run(api.publicApi.getDefinitionList);
		    var currentDefinition = that.context.superMsg.run(api.publicApi.getDefinition);
		    // var hasFHDDefinition = false;;
		    if ( isGetinfoCallback && $.type(list)!=='array' || ($.type(list)==='array' && !list.length)) {
		      that.dataset.$definition.addClass(Txplayer.dataset.hideClass);
		      return;
		    }
		    if (!isGetinfoCallback && !list && ($.type(list)==='array') && !list.length){
		      return;
		    }
		    $(list).each(function(idx, item){
		      if (item.name==='fhd'){
		        if (item.lmt===1 || item.lmt===3) item.viplogo = 1;
		        return;
		      }
		    });
		    if (!currentDefinition && (!list || list.length<=1)) {
		      that.dataset.$definition.addClass(Txplayer.dataset.hideClass);
		      return ''
		    }
		    var renderData = {
		      list: list,
		      currentDefinition: currentDefinition,
		      currentClass: that.dataset.currentClass
		    };
		    var currentDefName = that.getCurrentDefinitionName();
		    var htmldata = $.tmpl(definitionListStr,renderData);
		    that.dataset.$list.html(htmldata);
		    if (currentDefName) that.dataset.$hover.html( currentDefName );
		    that.dataset.$definition.removeClass(Txplayer.dataset.hideClass);
		  },
		  addEventListener: function(){
		    var that = this;
		    that.updateDefinitionList(false);
	
		    this.dataset.eventsList = {};
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onGetVideoUrlSuccess)] = function(){
		      that.updateDefinitionList(true);
		    }
		    $.each(this.dataset.eventsList,function(key, fn){
		      that.context.superMsg.on(key, fn);
		    });
		    this.dataset.$list.on('click', function(e){
		      if (that.context.superMsg.run(api.privateApi.isPlayingAd)) return;
		      var $this = $(e.target);
		      var defn = $this.data('definition');
		      if (!defn) return;
		      if ($this.hasClass(that.dataset.currentClass)) return;
		      that.context.superMsg.run(api.publicApi.setDefinition, defn);
		    });
		    // for firefox BUG:
		    // Children of button does not respond to :hover
		    // https://bugzilla.mozilla.org/show_bug.cgi?id=843003
		    this.dataset.$definition.on('mouseenter', function(){
		      if (that.dataset.hasHandlerFirfox) return;
		      if (!util.browser.firefox) return;
		      var $layer = that.dataset.$list;
		      var $parent = $layer.parent();
		      $layer.css({
		        'left': $parent.position().left - $layer.width()/2 + $parent.width()/2
		      });
		      $parent.after($layer);
		      that.dataset.hasHandlerFirfox = true;
		    });
		  }
		};
	
		Txplayer.register('UiDefinition', UiDefinition);
	
	/***/ },
	
	/***/ 41:
	/***/ function(module, exports) {
	
		module.exports = "<button data-role=\"<%=definition%>\" class=\"txp_btn txp_btn_definition\">\n  <txpdiv class=\"txp_label\" data-role=\"<%=hoverBtn%>\">自适应</txpdiv>\n  <txpdiv class=\"txp_popup txp_popup_definition\" data-role=\"<%=list%>\"></txpdiv>\n</button>";
	
	/***/ },
	
	/***/ 42:
	/***/ function(module, exports) {
	
		module.exports = "<% for(var len = list.length,i=len-1; i>=0; i--){%>\n  <txpdiv class=\"txp_menuitem <% if(list[i].name===currentDefinition) {%><%=currentClass%><% } %>\" data-definition=\"<%=list[i].name%>\" data-report=\"switch-definition\">\n    <%=list[i].cname%>\n    <% if(list[i].viplogo){ %>\n      <txpdiv class=\"txp_icon_vip\">会员</txpdiv>\n    <% } %>\n  </txpdiv>\n<% } %>";
	
	/***/ }
	
	/******/ });
