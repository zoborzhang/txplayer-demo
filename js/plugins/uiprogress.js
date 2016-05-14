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
	
		module.exports = __webpack_require__(61);
	
	
	/***/ },
	
	/***/ 61:
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
		var htmlstr = __webpack_require__(62);
	
		function UiProgress(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiProgress.prototype = {
		  init: function(){
		    this.write();
		    this.addEventListerner();
		  },
		  write: function(){
		    var renderData = {
		      loadedProgress: 'txp-control-load-progress',
		      playedProgress: 'txp-control-play-progress',
		      playedPoint: 'txp-control-play-point',
		      progressList: 'txp-control-progress-list',
		      progressIndicator: 'txp-control-progress-indicator',
		      tabindex: Txplayer.dataset.tabindex++
		    };
		    this.dataset.renderData = renderData;
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.$mod.$progressmod.append(htmldata);
		    this.dataset.$loadedProgress = this.context.$mod.$progressmod.find('[data-role="'+renderData.loadedProgress+'"]');
		    this.dataset.$playprogress = this.context.$mod.$progressmod.find('[data-role="'+renderData.playedProgress+'"]');
		    this.dataset.$playpoint = this.context.$mod.$progressmod.find('[data-role="'+renderData.playedPoint+'"]');
		    this.dataset.$progressIndicator = this.context.$mod.$progressmod.find('[data-role="'+renderData.progressIndicator+'"]');
		    this.dataset.$progressList = this.context.$mod.$progressmod.find('[data-role="'+renderData.progressList+'"]');
		  },
		  remove: function(){
		    this.dataset.$loadedProgress.remove();
		    this.dataset.$playprogress.remove();
		    this.dataset.$playpoint.remove();
		    this.dataset.$progressIndicator.remove();
		    this.dataset.$progressList.remove();
		  },
		  progressOnMouseMove: function(){
		    var isMouseEnter = false;
		    var that = this;
		    var modWidth;
		    var pointWidth;
		    var per;
		    var x=-1;
		    var isMousePress = false;
		    var calcProgressByMousePosition = function(e){
		      if ( $(e.target).data('role')===that.dataset.renderData.progressList ||
		        $(e.target).data('role')==='txp-control-progress') {
		        x = e.offsetX;
		      }else if ($(e.target).data('role')===that.dataset.renderData.progressIndicator) {
		        x = e.target.offsetLeft + e.target.offsetParent.offsetLeft + e.offsetX;
		      }else if ($(e.target).data('role')===that.dataset.renderData.playedPoint ||
		        $(e.target).data('role')===that.dataset.renderData.playedProgress ||
		        $(e.target).data('role')===that.dataset.renderData.loadedProgress ||
		        $(e.target).hasClass('txp_interact_dot')) {
		        x = e.target.offsetLeft + e.offsetX;
		      }
		      if (x===-1) return;
		      per = parseInt((x/modWidth)*10000)/100;
		    };
		    var updateProgress = function(){
		      var progressPosition = parseInt((x/modWidth)*10000)/100;
		      var pointPosition = parseInt(((x - pointWidth/2)/modWidth)*10000)/100;
		      that.dataset.$playprogress.css('width', (progressPosition+'%'));
		      that.dataset.$playpoint.css('left', (pointPosition+'%'));
		    };
		    this.context.$mod.$progressmod
		    .on('mouseenter', function(){
		      // 播放广告不要显示了
		      if (that.context.superMsg.run(api.privateApi.isPlayingAd)) return;
		      isMouseEnter = true;
		      modWidth = that.dataset.$progressList.width();
		      pointWidth = that.dataset.$progressIndicator.width();
		      that.context.superMsg.broadcast(api.privateApi.showVideoPreview);
		    })
		    .on('mouseleave', function(){
		      if (that.context.superMsg.run(api.privateApi.isPlayingAd)) return;
		      // 鼠标是按下后离开的，继续播放
		      if (isMousePress){
		        that.context.superMsg.broadcast(api.publicApi.play);
		        isMousePress = false;
		      }
		      that.context.superMsg.broadcast(api.privateApi.hideVideoPreview);
		      isMouseEnter = false;
		    })
		    .on('mousedown', function(e){
		      if (that.context.superMsg.run(api.privateApi.isPlayingAd)) return;
		      isMousePress = true;
		      isMouseEnter = true;
		      that.context.superMsg.broadcast(api.publicApi.pause);
		      calcProgressByMousePosition(e);
		      updateProgress();
		    })
		    .on('mousemove', function(e){
		      if (that.context.superMsg.run(api.privateApi.isPlayingAd)) return;
		      calcProgressByMousePosition(e);
		      if (isMousePress && isMouseEnter){
		        updateProgress();
		      }
		      that.context.superMsg.broadcast('updateVideoPreview', {
		        x: x,
		        per: per,
		        progressWidth: modWidth,
		        duration: that.dataset.duration
		      });
		    })
		    .on('mouseup touchend', function(e){
		      if (!that.dataset.duration) return;
		      if (that.context.superMsg.run(api.privateApi.isPlayingAd)) return;
		      // pc上，如果鼠标没有按下，不做操作了
		      if (!isMousePress) return;
		      calcProgressByMousePosition(e);
		      var seekTime = parseInt(that.dataset.duration * (x/modWidth));
		      that.context.superMsg.run(api.publicApi.seekTo, seekTime);
		      updateProgress();
		      isMouseEnter = false;
		      isMousePress = false;
		    });
		  },
		  progressOnTouch: function(){
		    var that = this, offsetLeft, x, modWidth, pointWidth
		    var updateProgress = function(){
		      var progressPosition = parseInt((x/modWidth)*10000)/100;
		      var pointPosition = parseInt(((x - pointWidth/2)/modWidth)*10000)/100;
		      that.dataset.$playprogress.css('width', (progressPosition+'%'));
		      that.dataset.$playpoint.css('left', (pointPosition+'%'));
		    };
		    this.context.$mod.$progressmod
		    .on('touchstart', function(e){
		      if (that.context.superMsg.run(api.privateApi.isPlayingAd)) return;
		      e = !! e.originalEvent ? e.originalEvent : e;
		      if(!(e && e.touches && e.touches.length)){
		        return;
		      }
		      e = e.touches[0];
		      offsetLeft = that.dataset.$progressList.offset().left;
		      x = e.pageX - offsetLeft;
	
		      modWidth = that.dataset.$progressList.width();
		      pointWidth = that.dataset.$progressIndicator.width();
	
		      updateProgress();
		      that.context.superMsg.broadcast(api.publicApi.pause);
		    })
		    .on('touchmove', function(e){
		      if (that.context.superMsg.run(api.privateApi.isPlayingAd)) return;
		      e = !! e.originalEvent ? e.originalEvent : e;
		      if(!(e && e.touches && e.touches.length)){
		        return;
		      }
		      e = e.touches[0];
		      x = e.pageX - offsetLeft;
		      updateProgress();
		    })
		    .on('touchend', function(e){
		      if (that.context.superMsg.run(api.privateApi.isPlayingAd)) return;
		      var seekTime = parseInt(that.dataset.duration * (x/modWidth));
		      that.context.superMsg.run(api.publicApi.seekTo, seekTime);
		      updateProgress();
		      that.context.msg.broadcast(api.privateApi.disableHideControl, false);
		      that.context.superMsg.broadcast(api.privateApi.hidePlayerUiTools, 2000);
		    });
		  },
		  updateBufferedBar: function(time){
		    if (!this.dataset.duration) return;
		    if (!time) return;
		    var per = parseInt(time*100 / this.dataset.duration);
		    this.dataset.$loadedProgress.css({width: per + '%'});
		  },
		  addEventListerner: function(){
		    var that = this;
		    var duration = that.context.superMsg.run(api.publicApi.getDuration);
		    if(duration) that.dataset.duration = duration;
	
		    this.dataset.eventsList = {};
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onGetVideoUrlSuccess)] = function(){
		      var duration = that.context.superMsg.run(api.publicApi.getDuration);
		      that.dataset.duration = duration;
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionTimeupdate)] = function(){
		      // 控制栏不显示，不计算播放进度
		      if ( !that.context.superMsg.run(api.privateApi.isControlShow) ) return;
		      if (that.context.superMsg.run('isPlayingAd')) return;
		      if (!that.dataset.duration) {
		        util.showError('UiProgress Error', '找不到duration数据');
		        return;
		      }
		      var currenttime = that.context.superMsg.run(api.publicApi.getCurrentTime);
		      var per = currenttime/that.dataset.duration;
		      per = per * 100 + '%';
		      that.dataset.$playprogress.css('width', per);
		      that.dataset.$playpoint.css('left', per);
		      that.updateBufferedBar( that.context.superMsg.run(api.privateApi.getBufferedTime) );
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionProgress)] = function(){
		      // 控制栏不显示，不计算缓冲数据
		      if ( !that.context.superMsg.run(api.privateApi.isControlShow) ) return;
		      that.updateBufferedBar( that.context.superMsg.run(api.privateApi.getBufferedTime) );
		    }
		    $.each(this.dataset.eventsList,function(key, fn){
		      that.context.superMsg.on(key, fn);
		    });
		    if (!util.mobile){
		      this.progressOnMouseMove();
		    }else{
		      this.progressOnTouch();
		    }
		  }
		};
	
		Txplayer.register('UiProgress', UiProgress);
	
	/***/ },
	
	/***/ 62:
	/***/ function(module, exports) {
	
		module.exports = "<txpdiv class=\"txp_progress_list\" data-role=\"<%=progressList%>\">\n  <txpdiv class=\"txp_progress_load\" style=\"width:0%\" data-role=\"<%=loadedProgress%>\"></txpdiv>\n  <txpdiv class=\"txp_progress_play\" style=\"width:0%\" data-role=\"<%=playedProgress%>\"></txpdiv>\n</txpdiv>\n\n<txpdiv class=\"txp_btn_scrubber\" style=\"left:0%\" data-role=\"<%=playedPoint%>\">\n  <txpdiv class=\"txp_scrubber_indicator\" data-role=\"<%=progressIndicator%>\"></txpdiv>\n</txpdiv>";
	
	/***/ }
	
	/******/ });
