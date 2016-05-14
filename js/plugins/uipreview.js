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
	
		module.exports = __webpack_require__(59);
	
	
	/***/ },
	
	/***/ 59:
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
		var htmlstr = __webpack_require__(60);
	
		function UiPreview(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiPreview.prototype = {
		  init: function(){
		    this.write();
		    this.addEventListener();
		    this.exportsModuleApis();
		  },
		  write: function(){
		    var renderData = {
		      hideClass: Txplayer.dataset.hideClass,
		      previewMod: 'txp_preview_mod',
		      timeText: 'txp-preview-time-text',
		      previewImage: 'txp-preview-image'
		    };
		    this.dataset.renderData = renderData;
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.dataset.$playermod.append(htmldata);
		    this.dataset.$previewMod = this.context.dataset.$playermod.find('[data-role="'+renderData.previewMod+'"]');
		    this.dataset.$timeText = this.context.dataset.$playermod.find('[data-role="'+renderData.timeText+'"]');
		    this.dataset.$previewImage = this.context.dataset.$playermod.find('[data-role="'+renderData.previewImage+'"]');
		  },
		  remove: function(){
		    this.dataset.$previewMod.remove();
		  },
		  getPreviewData: function(cTime) {
		    cTime = cTime+1;
		    if (!this.dataset.duration) {
		      this.dataset.duration = this.context.msg.run(api.publicApi.getDuration);
		      if (!this.dataset.duration) return '';
		    }
		    var that = this;
		    // 显示100px,图片实际尺寸
		    var zoomRate = 100/160;
		    var duration = this.dataset.duration,
		      sTime;
		    if (duration < 60) {
		      sTime = 1;
		    } else if (duration < 300) {
		      sTime = 2;
		    } else if (duration < 600) {
		      sTime = 5;
		    } else {
		      sTime = 10;
		    }
		    function findPosition(imageData, cTime, sTime){
		      var whichPic = Math.ceil(cTime/sTime),
		        picCount = imageData[0].picCount,
		        whichItem = Math.ceil(whichPic / picCount)-1,
		        item = imageData[whichItem];
		      if (!item) return;
		      var imgUrl,
		        wherePic = whichPic - (picCount * whichItem),
		        x = wherePic%item.columnCount;
		      x = x===0 ? item.columnCount: x;
		      var y = Math.ceil(wherePic/item.columnCount),
		        pixY = (y-1) * item.picHeight,
		        pixX = (x-1) * item.picWidth;
		      imgUrl = item.path;
		      // 支持https
		      // imgUrl = imgUrl.replace(/^https?:/,'');
		      return {
		        url: imgUrl,
		        x: pixX*(-1)*zoomRate+ 'px',
		        y: pixY*(-1)*zoomRate+'px'
		      }
		    }
	
		    function findPreviewData(){
		      if (!that.dataset.getinfoJson) {
		        that.dataset.getinfoJson = that.context.msg.run(api.privateApi.getVideoInfoData);
		      }
		      if ($.type(that.dataset.getinfoJson)!=='object') return ;
		      var json = that.dataset.getinfoJson;
		      var item;
		      var tmpMax = 0;
		      var arrayItem=[];
		      var itemCount;
		      var picCount;
		      var i, len;
		      if (json &&
		        json.vl &&
		        json.vl.vi &&
		        json.vl.vi[0] &&
		        json.vl.vi[0].pl &&
		        json.vl.vi[0].pl[0] &&
		        json.vl.vi[0].pl[0].pd &&
		        json.vl.vi[0].pl[0].pd.length
		      ) {
		        var pd = json.vl.vi[0].pl[0].pd;
		        var obj = json.vl.vi[0];
		        for (i=0, len = pd.length; i<len; i++) {
		          if (pd[i].w > tmpMax) {
		            item = pd[i];
		            tmpMax = pd[i].w
		          }
		        }
		      }
		      if (!item) return ;
		      picCount = Math.floor( duration / sTime );
		      itemCount= Math.ceil(picCount / (item.r * item.c));
		      for(i=0; i<itemCount;i++){
		        var cItem = {
		          index: i,
		          path: item.url + obj.lnk + '.' + item.fn + '.' + (i+1)+'.jpg/0',
		          picCount: item.r*item.c,
		          picWidth: item.w,
		          picHeight: item.h,
		          rowCount: item.r,
		          columnCount: item.c,
		          filename: item.fn,
		          format: item.fmt
		        };
		        arrayItem.push(cItem);
		        that.dataset.previewData = arrayItem;
		      }
		    }
		    if ($.type(that.dataset.previewData)==='array' && that.dataset.previewData.length) {
		      return findPosition(that.dataset.previewData, cTime, sTime);
		    }
		    findPreviewData();
		    if ($.type(that.dataset.previewData)==='array' && that.dataset.previewData.length) {
		      return findPosition(that.dataset.previewData, cTime, sTime);
		    }
		    return '';
		  },
		  updateImage: function(time){
		    var imgInfo = this.getPreviewData(time);
		    if ( !(imgInfo && imgInfo.url && imgInfo.hasOwnProperty('x') && imgInfo.hasOwnProperty('y')) ) {
		      this.dataset.$previewMod.addClass('txp_tooltip_preview_tiny');
		      return;
		    }else{
		      this.dataset.$previewMod.removeClass('txp_tooltip_preview_tiny');
		    }
		    var cssData = {};
		    if (this.dataset.imageUrl) return;
		    this.dataset.$previewImage.css({
		      'background-image': 'url(' + imgInfo.url + ')',
		      'background-position': imgInfo.x + ' ' + imgInfo.y
		    });
		  },
		  addEventListener: function(){
		    var that = this;
		    this.dataset.eventsList = {};
		    this.dataset.eventsList[api.eventApi.onVidChange] = function(){
		      that.dataset.previewData = null;
		      that.dataset.duration = null;
		      that.dataset.getinfoJson = null;
		    };
		    $.each(this.dataset.eventsList,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
		  },
		  exportsModuleApis: function(){
		    var that = this;
		    this.dataset.privateApis = {};
		    this.dataset.privateApis[api.privateApi.showVideoPreview] = function(data){
		      if (!that.dataset.getinfoJson) return;
		      that.dataset.$previewMod.removeClass(Txplayer.dataset.hideClass);
		    };
		    this.dataset.privateApis[api.privateApi.hideVideoPreview] = function(data){
		      that.dataset.$previewMod.addClass(Txplayer.dataset.hideClass);
		    };
		    this.dataset.privateApis[api.privateApi.updateVideoPreview] = function(data){
		      if (!data) return;
		      if (data.hasOwnProperty('x')) {
		        var modWidth = that.dataset.$previewMod.width();
		        var halfModWidth = parseInt(modWidth/2);
		        var left = data.x - halfModWidth;
		        if (left <= 0)
		          left = 0;
		        else if ( data.progressWidth && (left>(data.progressWidth-modWidth)) )
		          left = data.progressWidth-modWidth;
		        that.dataset.$previewMod.css('left', left);
		      }
		      if (data.hasOwnProperty('x') && data.duration) {
		        var time = parseInt(data.duration * (data.x/data.progressWidth));
		        var showTime = util.formatPlayTime(time);
		        that.dataset.$timeText.html(showTime);
		        that.updateImage(time);
		      }
		    };
		    $.each(this.dataset.privateApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
		  }
		};
	
		Txplayer.register('UiPreview', UiPreview);
	
	/***/ },
	
	/***/ 60:
	/***/ function(module, exports) {
	
		module.exports = "<txpdiv data-role=\"<%=previewMod%>\" class=\"txp_tooltip_preview <%=hideClass%>\" style=\"left:0;\">\n  <txpdiv class=\"txp_tooltip_bg\" data-role=\"<%=previewImage%>\"></txpdiv>\n  <txpdiv class=\"txp_tooltip_text_wrapper\">\n    <txpdiv class=\"txp_tooltip_text\" data-role=\"<%=timeText%>\"></txpdiv>\n  </txpdiv>\n</txpdiv>";
	
	/***/ }
	
	/******/ });
