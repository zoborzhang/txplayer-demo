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
	
		module.exports = __webpack_require__(23);
	
	
	/***/ },
	
	/***/ 23:
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * 高清视频+3Video
		 */
		var htmlstr         = __webpack_require__(24);
		var $               = Txplayer.$;
		var util            = Txplayer.util;
		var api             = Txplayer.apiList;
		var videoStatusMaps = {
		  IDLE: 1,
		  PLAY: 2,
		  PLAYING: 2.1,
		  PAUSE: 2.2,
		  LOCK: 2.2,
		  PRELOAD: 3,
		  PRELOADING: 3.1
		};
	
		function HdPlayer(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
		HdPlayer.prototype = {
		  init: function(){
		    this.dataset.index =0;
		    this.dataset.playbackRate = 1;
		    if ( $.type(this.context.config.volume)==='string' && /^\d+$/.test(this.context.config.volume) ){
		      this.context.config.volume = parseInt(this.context.config.volume);
		    }
		    if ($.type(this.context.config.volume)!=='number' ||
		      this.context.config.volume > 100 || this.context.config.volume < 0) {
		      util.showError('播放器默认参数错误','volume必须为0-100的整数');
		      return;
		    }
		    this.playStateInit();
		    this.write();
		    this.loadSubPlugins();
		    this.resetVideoStatus();
		    this.setVolume(this.context.config.volume);
		  },
		  playStateInit: function(){
		    // -1（未开始）
		    // 0（已结束）
		    // 1（正在播放）
		    // 2（已暂停）
		    // 3（正在缓冲）
		    // this.dataset.playState = -1;
		    this.setPlayState(-1);
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
		        '$videomod': this.dataset.$videomod
		      }
		    };
		    util.loadPlugins(plugins, context);
		  },
		  write: function(){
		    this.dataset.hasVideoHtmlWrited = true;
		    this.context.dataset.$playermod.append(this.buildHTML());
		    this.dataset.$videomod = this.context.dataset.$playermod.find('[data-role="'+this.dataset.renderData.videomod+'"]');
		    this.dataset.$video = this.dataset.$videomod.find('video');
		    this.addEventListener();
		    this.exportsModuleApis();
		    this.context.userMsg.emit(api.eventApi.onWrite);
		  },
		  remove: function(){
		    this.dataset.$videomod.remove();
		  },
		  buildHTML: function(){
		    var that = this;
		    var renderData = {
		      videomod: 'txp-video-wrapper',
		      data:{
		        attrs: that.getAttrs().join(' '),
		        videoStyle: that.getVideoStyles()
		      }
		    };
		    this.dataset.renderData = renderData;
		    var htmldata = $.tmpl(htmlstr, renderData);
		    return htmldata;
		  },
		  // 获取用户参数的video相关属性
		  getAttrs: function(){
		    var videoAttrMap = {
		      'isUseWebkitPlayinline'  : 'webkit-playsinline',
		      'isUseWebkitAirplay'     : 'x-webkit-airplay',
		      'isUseWebkitControl'     : 'controls="controls"',
		      'isUseWebkitPreload'     : ['preload="auto"', 'preload="none"'],
		      'muted'                  : 'muted',
		      // 'loop'                   : 'loop', // 兼容性不好
		      'isUseWebkitCrossOrigin' : 'crossOrigin="anonymous"'
		    };
		    var attrs = [];
		    for (var key in videoAttrMap) {
		      if (Txplayer.$.isArray(videoAttrMap[key])) {
		        if (this.context.config[key] === true) {
		          attrs.push(videoAttrMap[key][0]);
		        } else {
		          attrs.push(videoAttrMap[key][1]);
		        }
		      } else {
		        if (this.context.config[key] === true) {
		          attrs.push(videoAttrMap[key]);
		        }
		      }
		    }
		    return attrs;
		  },
		  getVideoStyles: function(){
		    var arr = [], that = this;
		    arr.push('background-color:#000');
		    arr.push('width:100%');
		    arr.push('height:100%');
		    return arr.join(';');
		  },
	
		  /*** 当前播放部分 ***/
		  // 获取当前显示的那个视频对象
		  getFocusVideoTag: function(){
		    var video;
		    this.dataset.$video.each(function(idx, videoTag){
		      if (videoTag.isFocus) {
		        video = videoTag;
		        return false;
		      }
		    });
		    return video;
		  },
		  // 获取当前显示的视频的缓冲进度
		  getFocusVideoBuffer: function(vd){
		    var video = vd || this.getFocusVideoTag();
		    if (!video || !video.buffered || !video.buffered.length) {
		      return 0;
		    }
		    return video.buffered.end(video.buffered.length-1);
		  },
		  // 设置当前显示的视频的url
		  setFocusVideoUrl: function(options){
		    if ($.type(options)==='string') {
		      options = {
		        url: options
		      };
		    }
		    options.preload = options.preload || true;
		    options.autoplay = options.autoplay || false;
		    var video = this.getFocusVideoTag();
		    var that = this;
		    var setUrlAndPlay = function(src){
		      if ($.type(options.updateIndex)==='number') that.dataset.index = options.updateIndex;
		      $(video).attr('src', src);
		      if(options.preload) {
		        video.pause();
		        // video.load();
		        try{
		          video.load();
		        }catch(e){
		          // 待上报
		          util.showInfo(e, e.stack);
		        }
		      }
		      // 设置播放时间点，使用setVideoPlayTime
		      if(options.currentTime) {
		        that.setVideoPlayTime(video, options.currentTime, options.autoplay);
		      }
		      // 直接开始播放
		      else if (options.autoplay) {
		        video.play();
		      }
		    };
		    if ($.type(options.url)==='string') {
		      setUrlAndPlay(options.url);
		    }
		    else if($.type(options.getUrlSync)==='function'){
		      options.getUrlSync()
		      .done(function(data){
		        that.dataset.requestPreloadUrlFail = false;
		        setUrlAndPlay(data);
		      })
		      .fail(function(err){
		        that.dataset.requestPreloadUrlFail = true;
		        that.context.msg.broadcast(api.eventApi.onVideoInterruptByError)
		      });
		    }
		    else{
		      util.error('setFocusVideoUrl参数错误, 找不到getUrlSync');
		    }
		  },
		  playTheNext: function(){
		    if (this.isTheLastOfPlayList()) return;
		    this.dataset.index++;
		    var data = this.dataset.playList[this.dataset.index];
		    data.autoplay = true;
		    this.setFocusVideoUrl(data);
		  },
		  clearFocusVideoUrl: function(){
		    var video = this.getFocusVideoTag();
		    video.pause();
		    video.src = '';
		    $(video).removeAttr('src');
		  },
		  // 判断当前显示的视频是否可以播放/是否有url
		  isFocusVideoReady: function(){
		    var video = this.getFocusVideoTag();
		    return !!(video && video.src);
		  },
		  // 执行当前显示的视频播放操作
		  setFocusVideoPlay: function(){
		    var video = this.getFocusVideoTag();
		    if (video.src) {
		      video.play();
		      video.status = videoStatusMaps.PLAYING;
		    }else{
		      util.error('play fail, video.src is null!');
		    }
		  },
		  // 执行当前显示的视频暂停操作
		  setFocusVideoPause: function(){
		    var video = this.getFocusVideoTag();
		    if (video.src) {
		      video.pause();
		      video.status = videoStatusMaps.PAUSE;
		    }else{
		      util.error('play fail, video.src is null!');
		    }
		  },
		  // 判断当前显示的视频是否缓冲完成
		  isFocusVideoBufferComplete: function(vd){
		    var video = vd || this.getFocusVideoTag();
		    var buffered = this.getFocusVideoBuffer(vd);
		    return video.duration === buffered;
		  },
		  // 兼容各个浏览器设置播放时间点
		  // firefox下，canplay没有触发，设置video.currentTime=xx会报如下错误：
		  // An attempt was made to use an object that is not, or is no longer, usable
		  setVideoPlayTime: function(video, time, autoplay){
		    autoplay = $.type(autoplay)==='undefined'?true:autoplay;
		    var isChrome = util.browser.chrome;
		    if (util.browser.chrome){
		      video.currentTime = time;
		      if (autoplay) video.play();
		      // video.currentTime = time;
		      $(video).one('canplay.setFocusVideoCurrentTime', function(){
		        video.currentTime = time;
		        video.play();
		      });
		    }else if (util.browser.firefox) {
		      try{
		        video.currentTime = time;
		        if (autoplay) video.play();
		      }catch(e){
		        $(video).one('canplay.setFocusVideoCurrentTime', function(){
		          video.currentTime = time;
		          video.play();
		        });
		      }
		    }
		    else {
		      $(video).one('canplay.setFocusVideoCurrentTime', function(){
		        video.currentTime = time;
		        video.play();
		      });
		    }
		  },
		  // 设置当前显示的视频的播放时间
		  setFocusVideoCurrentTime: function(time, autoplay){
		    var video = this.getFocusVideoTag();
		    var that = this;
		    if (time > video.duration) {
		      util.showError('setFocusVideoCurrentTime Error', 'time=' + time + ',duration=' + video.duration);
		      return;
		    }
		    this.setVideoPlayTime(video, time);
		  },
		  // 获取当前显示的视频的播放时间
		  getFocusVideoCurrentTime: function(){
		    var video = this.getFocusVideoTag();
		    return video.currentTime;
		  },
		  // 获取当前显示的视频的时长
		  getFocusVideoDuration: function(){
		    var video = this.getFocusVideoTag();
		    return video.duration;
		  },
		  getFocusVideoBufferedTime: function(){
		    var buffer = 0;
		    var video = this.getFocusVideoTag();
		    if ( !(video && video.buffered && video.buffered.length) ) return 0;
		    return video.buffered.end(video.buffered.length-1);
		  },
	
		  /*** 预加载部分 ***/
		  // 获取预加载的视频对象
		  getPreloadVideoTag: function(){
		    var focusVideo = this.getFocusVideoTag();
		    var videosCount = this.dataset.$video.length;
		    var idx = focusVideo.index;
		    var preloadVideo;
		    var that = this;
		    var findNext = function(){
		      idx ++;
		      if (idx > videosCount) idx=1;
		      return that.dataset.$video[idx-1];
		    };
		    preloadVideo = findNext();
		    if (!preloadVideo.isFocus && preloadVideo.status !== videoStatusMaps.LOCK) {
		      return preloadVideo;
		    }
		    preloadVideo = findNext();
		    if (!preloadVideo.isFocus && preloadVideo.status !== videoStatusMaps.LOCK) {
		      return preloadVideo;
		    }
		    preloadVideo = findNext();
		    if (!preloadVideo.isFocus && preloadVideo.status !== videoStatusMaps.LOCK) {
		      return preloadVideo;
		    }
		  },
		  // 判断预加载视频的视频状态
		  checkPreloadVideoStatus: function(){
		    var video = this.getPreloadVideoTag();
		    if (!video){
		      util.error('checkPreloadVideoStatus error: can not find preload video!');
		      return ;
		    }
		    return parseInt( video.status );
		  },
		  // 设置预加载视频的url并自动预加载
		  setPreloadVideoUrl: function(options){
		    var url, that = this;
		    var isArgumentsHasUrl = function(){
		      if ($.type(options)==='string') return true;
		      if ($.type(options)==='object' && options.url) return true;
		      return false;
		    };
		    if (this.isTheLastOfPlayList() && !isArgumentsHasUrl()) return;
		    options = options || {};
		    var video = this.getPreloadVideoTag();
		    var index = this.dataset.index + 1;
		    var setUrlAndPlay = function(src){
		      video.status = videoStatusMaps.PRELOAD;
		      $(video).attr('src', src);
		      video.pause();
		      // video.load();
		      try{
		        video.load();
		      }catch(e){
		        // 待上报
		        util.showInfo(e, e.stack);
		      }
		      if (options.autoplay) that.setPreloadVideoPlay();
		    };
		    url = options.url || this.dataset.playList[index];
		    if ($.type(url)==='string') {
		      setUrlAndPlay(url);
		    }
		    else if(url && url.url){
		      setUrlAndPlay(url.url);
		    }
		    else if($.type(url.getUrlSync)==='function'){
		      video.status = videoStatusMaps.PRELOADING;
		      url.getUrlSync()
		      .done(function(data){
		        that.dataset.requestPreloadUrlFail = false;
		        url.url = data;
		        setUrlAndPlay(data);
		      })
		      .fail(function(err){
		        that.dataset.requestPreloadUrlFail = true;
		      });
		    }
		  },
		  // 执行预加载视频的播放操作
		  setPreloadVideoPlay: function(options){
		    options = options || {};
		    var preloadVideo = this.getPreloadVideoTag();
		    var currentVideo = this.getFocusVideoTag();
		    var preloadCurrentTime = preloadVideo.currentTime;
		    if (!preloadVideo || !currentVideo) return;
		    if (!preloadVideo.src) {
		      util.error('播放失败：预加载的视频没找到播放地址');
		      return;
		    }
		    if (!preloadCurrentTime && options.currentTime){
		      preloadCurrentTime = options.currentTime;
		    }
	
		    preloadVideo.isFocus = true;
		    preloadVideo.status = videoStatusMaps.PLAYING;
		    if (options.reload) {
		      preloadVideo.pause();
		      // preloadVideo.load();
		      try{
		        preloadVideo.load();
		      }catch(e){
		        // 待上报
		        util.showInfo(e, e.stack);
		      }
		    }
		    if (preloadCurrentTime){
		      this.setVideoPlayTime(preloadVideo, preloadCurrentTime, true);
		    }
	
		    currentVideo.isFocus = false;
		    currentVideo.status = videoStatusMaps.IDLE;
		    currentVideo.pause();
		    // currentVideo.src = null;
		    // $(currentVideo).removeAttr('src');
		    try{
		      $(currentVideo).removeAttr('src');
		    }catch(e){
		      // 待上报
		      util.showInfo(e, e.stack);
		    }
		    if (!options.notNeedUpdateIndex) this.dataset.index ++;
		    this.updateVideoDisplay();
		  },
		  // 设置预加载视频和正在播放的视频保持currentTime同步
		  setPreloadVideoKeepSpaceToFocusVideo: function( cb ){
		    cb = cb || function(){};
		    var preloadVideo = this.getPreloadVideoTag(),
		      focusVideo = this.getFocusVideoTag(),
		      that = this;
		    var stopTimer = function(){
		      if (that.dataset.keepSpace_TIMER) {
		        clearInterval(that.dataset.keepSpace_TIMER);
		        that.dataset.keepSpace_TIMER = null;
		      }
		    };
		    var playPreloadVideo = function(){
		      that.setVideoPlayTime(preloadVideo, focusVideo.currentTime);
		      // 预加载的视频直接播放
		      that.setPreloadVideoPlay({
		        notNeedUpdateIndex: true,
		        reload: false
		      });
		      var hasSwitchDefinition = false;
		      var eventName = '.switch_definition_cb';
		      eventName = api.eventApi.onSectionPlaying + eventName;
		      that.context.msg.once(eventName, function(){
		        hasSwitchDefinition = true;
		        cb(true);
		      });
		      setTimeout(function(){
		        stopTimer();
		        if (hasSwitchDefinition) return;
		        that.context.msg.off(eventName);
		        cb(false);
		      },30000);
		    };
		    if (!focusVideo || !focusVideo.src) return;
		    stopTimer();
		    // 切换清晰度已经超时次数超过3次，暂停保证切换速度
		    if (Txplayer.dataset.switchDefinitionTimeout>=1){
		      playPreloadVideo();
		      return;
		    }
		    // 启动定时器，保持两个video播放时间同步
		    that.dataset.keepSpace_TIMER = setInterval(function(){
		      if (!preloadVideo || !preloadVideo.src) return;
		      if ( (focusVideo.duration - focusVideo.currentTime) < 5 && !focusVideo.paused ) {
		        focusVideo.pause();
		      }
		      that.setVideoPlayTime(preloadVideo, focusVideo.currentTime);
		      var bf = preloadVideo.buffered, len = preloadVideo.buffered.length;
		      // 足够播放4秒，开始切换清晰度分片
		      if (preloadVideo.buffered &&
		          preloadVideo.buffered.length &&
		          ( bf.end(len-1) - focusVideo.currentTime > 4)
		      ) {
		        that.setPreloadVideoPlay({notNeedUpdateIndex: true});
		        stopTimer();
		        cb(true);
		        // 切换清晰度超时标记-1
		        Txplayer.dataset.switchDefinitionTimeout -= 1;
		      }
		    }, 50);
		    //
		    // 尝试切换失败
		    var whenSwitchFail = function(errorMsg){
		      Txplayer.dataset.switchDefinitionTimeout ++;
		      util.showError('切换清晰度超时', errorMsg);
		      // 显示失败提示给用户
		      that.context.msg.broadcast(api.privateApi.showUiTips, {
		        text: errorMsg,
		        time: 30
		      });
		      playPreloadVideo();
		    };
		    // 切换超时，失败处理
		    that.dataset.keepSpaceTimeout_TIMER = setTimeout(function(){
		      if (!that.dataset.keepSpace_TIMER) return;
		      // 切换清晰度超时标记+1
		      Txplayer.dataset.switchDefinitionTimeout += 1;
		      stopTimer();
		      var errorMsg;
		      if (!preloadVideo || !preloadVideo.src) {
		        errorMsg = '预加载的视频没有找到播放地址';
		        cb(errorMsg);
		      }else{
		        errorMsg = '切换清晰度失败，正在为您重试';
		        whenSwitchFail(errorMsg);
		      }
		    },30*1000);
		  },
	
		  /*** LOCK部分 ***/
		  getLockVideoTag: function(){
		    var video;
		    this.dataset.$video.each(function(idx, videoTag){
		      if (videoTag.status === videoStatusMaps.LOCK) {
		        video = videoTag;
		        return false;
		      }
		    });
		    return video;
		  },
		  lockAndPreloadNext: function(options){
		    options = options || {};
		    var focusVideo = this.getFocusVideoTag();
		    var preloadVideo = this.getPreloadVideoTag();
		    var that = this;
		    var index = this.dataset.index;
		    var msgKeyError = api.eventApi.onError + '.lockAndPreloadNext';
		    this.setPreloadVideoUrl();
		    this.dataset.index ++;
		    var switchLock = function(){
		      focusVideo.isFocus = false;
		      focusVideo.status = videoStatusMaps.LOCK;
		      focusVideo.pause();
		      preloadVideo.play();
		      preloadVideo.isFocus = true;
		      preloadVideo.status = videoStatusMaps.PLAYING;
		      that.updateVideoDisplay();
		      var msgKeyEnded = api.eventApi.onSectionEnded + '.lockAndPreloadNext';
		      var msgKeyPlaying = api.eventApi.onSectionPlaying + '.lockAndPreloadNext';
		      that.context.msg.on(msgKeyEnded, function(data){
		        if (data.playListTypeEnd && data.playListType) {
		          var lastPlayVideo = that.getFocusVideoTag();
		          that.context.msg.off(msgKeyEnded);
		          // 预加载的视频设置空闲状态
		          preloadVideo.isFocus = false;
		          preloadVideo.src = null;
		          $(preloadVideo).removeAttr('src');
		          preloadVideo.status = videoStatusMaps.IDLE;
	
		          // 最后播放的视频设置空闲状态
		          lastPlayVideo.isFocus = false;
		          lastPlayVideo.src = null;
		          $(lastPlayVideo).removeAttr('src');
		          lastPlayVideo.status = videoStatusMaps.IDLE;
	
		          // lock住的视频设置继续聚焦并继续播放
		          focusVideo.isFocus = true;
		          focusVideo.status = videoStatusMaps.PLAYING;
		          that.updateVideoDisplay();
		          var msgKeyUnlock = api.eventApi.onSectionPlaying + '.lockAndPreloadNext_unlock';
		          that.context.msg.once(msgKeyUnlock, function(){
		            that.dataset.disablePreload = false;
		          });
		          focusVideo.play();
		          that.dataset.index = index;
		        }
		      });
		      that.context.msg.on(msgKeyPlaying, function(){
		        var isLast = that.isTheLastOfPlayList(that.getCurrentType())
		        if (isLast) {
		          that.dataset.disablePreload = true;
		          that.context.msg.off(msgKeyPlaying);
		        }
		      });
		    };
		    // 广告播放失败
		    that.context.msg.once(msgKeyError, function(){
		      that.dataset.index = index;
		    });
		    this.dataset.lockPreload_TIMER = setInterval(function(){
		      if ( !(preloadVideo.buffered && preloadVideo.buffered.length) ) return;
		      var len = preloadVideo.buffered.length;
		      if (preloadVideo.buffered.end(len-1) > 1) {
		        switchLock();
		        clearInterval(that.dataset.lockPreload_TIMER);
		      }
		    },200);
		  },
	
		  /*** 视频时序控制部分 ***/
		  isTheLastOfPlayList: function(type){
		    if (!this.dataset.playList || this.dataset.playList.length===0) {
		      return true;
		    }
		    var maxLength = this.dataset.playList.length;
		    var index = this.dataset.index;
		    if (type) {
		      var currentMaxLength = this.calcTotalPlaylist(type);
		      var currentIndex = this.getPlayListIndex(type);
		      return (currentIndex+1) >= currentMaxLength;
		    }
		    return (index+1) >= maxLength;
		  },
		  // 计算（某类）播放列表总数
		  calcTotalPlaylist: function(type){
		    if (!type) return this.dataset.playList.length;
		    var count = 0;
		    $(this.dataset.playList).each(function(idx, item){
		      if (item.type===type) count++;
		    });
		    return count;
		  },
		  // 清空（某类）播放列表
		  clearPlaylist: function(type){
		    if (!type) this.dataset.playList = [];
		    var tmp = [];
		    var currentList = this.dataset.playList[ this.dataset.index ];
		    var newIndex = this.dataset.index;
		    $(this.dataset.playList).each(function(idx, item){
		      if (item.type===type) return;
		      tmp.push(item);
		      if (item===currentList) newIndex = tmp.length-1;
		    });
		    this.dataset.playList = tmp;
		    if (!type) {
		      this.dataset.index = 0;
		    }else{
		      this.dataset.index = newIndex;
		    }
		  },
		  // 获取（某类）播放列表当前索引
		  getPlayListIndex: function(type){
		    var count = 0, that = this;
		    if (type) {
		      $(that.dataset.playList).each(function(idx, item){
		        if (that.dataset.index===idx) return false;
		        if (item.type===type) return;
		        count ++;
		      });
		    }
		    return that.dataset.index - count;
		  },
		  // 获取当前播放的类型
		  getCurrentType: function(){
		    if (!this.dataset.playList) return;
		    var data = this.dataset.playList[this.dataset.index];
		    return data && data.type;
		  },
		  // 重置视频的默认初始状态
		  resetVideoStatus: function(){
		    this.dataset.$video.each(function(idx, videoTag){
		      videoTag.index = idx;
		      if (idx===2) {
		        videoTag.isFocus = true;
		      }else{
		        videoTag.isFocus = false;
		      }
		      videoTag.status = videoStatusMaps.IDLE;
		    });
		    this.updateVideoDisplay();
		  },
		  // 更新多个视频的交替显示和隐藏
		  updateVideoDisplay: function(){
		    this.dataset.$video.each(function(idx, videoTag){
		      if (videoTag.isFocus) videoTag.style.display = 'block';
		      else videoTag.style.display = 'none';
		    });
		  },
		  // 是否正在播放
		  isPlaying: function(){
		    var video = this.getFocusVideoTag();
		    return !video.paused;
		  },
	
		  /*** 视频操作相关 ***/
	
		  // 播放
		  play: function(options){
		    if (!this.dataset.playList || !this.dataset.playList.length) {
		      util.error('can not find urls data, please addURLSData first!');
		      return;
		    }
		    if (options && $.type(options.updateIndex)==='number') this.dataset.index = options.updateIndex;
		    if ($.type(options)!=='undefined') {
		      if ($.type(options)==='string') {
		        options = {
		          url: options,
		          autoplay: true
		        };
		      }
		      this.setFocusVideoUrl(options);
		    }else if (!this.isFocusVideoReady()) {
		      var data = this.dataset.playList[ this.dataset.index ];
		      data.autoplay = true;
		      this.setFocusVideoUrl(data);
		    }
		  },
		  // 设置音量
		  setVolume: function(volume){
		    if (isNaN(volume) || $.type(volume)!=='number' || (volume > 100 && volume < 0) ) {
		      util.showError('getVolume失败','player.setVolume(volume),volume必须为0-100的整数');
		      return;
		    }
		    if (volume===this.dataset.volume) return;
		    this.unMute();
		    this.dataset.$video.each(function(idx, vd){
		      vd.volume = volume/100;
		    });
		    this.dataset.volume = volume;
		    // 初始化不触发音量变化事件
		    if ($.type(this.dataset.volume)!=='undefined') {
		      this.context.msg.broadcast(api.eventApi.onVolumeChange, volume);
		      this.context.userMsg.broadcast(api.eventApi.onVolumeChange, volume);
		      this.context.msg.broadcast(api.privateApi.showUiTips, {
		        text: '当前音量: <a>' + this.dataset.volume + '</a>',
		        time: 3,
		        hideClose: true
		      });
		    }
		  },
		  // 获取音量
		  getVolume: function(){
		    return this.dataset.volume;
		  },
		  // 静音
		  mute: function(options){
		    options = options || {};
		    if (!options.hasOwnProperty('showTips')) options.showTips = true;
		    this.dataset.$video.each(function(idx, vd){
		      vd.muted = true;
		    });
		    this.dataset.muted = true;
		    this.context.userMsg.broadcast(api.eventApi.onVolumeChange, 0);
		    this.context.msg.broadcast(api.eventApi.onVolumeChange, 0);
		    if (options.showTips){
		      this.context.msg.broadcast(api.privateApi.showUiTips, {
		        text: '视频静音',
		        time: 2,
		        hideClose: true
		      });
		    }
		  },
		  // 取消静音
		  unMute: function(options){
		    options = options || {};
		    if (!options.hasOwnProperty('showTips')) options.showTips = true;
		    this.dataset.$video.each(function(idx, vd){
		      vd.muted = false;
		    });
		    this.dataset.muted = false;
		    this.context.userMsg.broadcast(api.eventApi.onVolumeChange, this.dataset.volume);
		    this.context.msg.broadcast(api.eventApi.onVolumeChange, this.dataset.volume);
		    if (options.showTips){
		      this.context.msg.broadcast(api.privateApi.showUiTips, {
		        text: '取消视频静音',
		        time: 2,
		        hideClose: true
		      });
		    }
		  },
		  // 获取视频的封面图
		  getVideoPoster: function(){
		    return this.dataset.poster;
		  },
		  // 设置视频播放状态
		  setPlayState: function(state){
		    // 0: 已结束
		    // 1: 正在播放
		    // 2: 暂停
		    // 3: 缓冲中
		    if ($.type(state)!=='number') return;
		    if (state===this.dataset.playState) return;
		    this.dataset.playState = state;
		    this.context.userMsg.broadcast(api.eventApi.onPlayStateChange, {
		      state: state,
		      vid: this.context.msg.run(api.publicApi.getVid)
		    });
		  },
		  // 获取视频播放状态
		  getPlayState: function(){
		    return this.dataset.playState;
		  },
		  // 设置播放速度
		  setPlaybackRate: function(speed){
		    if (speed>=4) {
		      this.context.msg.broadcast(api.privateApi.showUiTips, {
		        text: '播放速度已经达到最高值',
		        time: 3,
		        hideClose: true
		      });
		      return;
		    }
		    if (speed <=0.4) {
		      this.context.msg.broadcast(api.privateApi.showUiTips, {
		        text: '播放速度已经达到最低值',
		        time: 3,
		        hideClose: true
		      });
		      return;
		    }
		    if (this.dataset.playbackRate!==speed){
		      speed = Math.round(speed*10)/10;
		      this.setVideoPlaybackRate(speed);
		      this.context.msg.broadcast(api.privateApi.showUiTips, {
		        text: '当前播放速度:<a>' + speed + '</a>',
		        time: 3,
		        hideClose: true
		      });
		      this.dataset.playbackRate = speed;
		      this.context.userMsg.broadcast(api.eventApi.onPlaybackRateChange, 0);
		      this.context.msg.broadcast(api.eventApi.onPlaybackRateChange, 0);
		    }
		  },
		  setVideoPlaybackRate: function(speed){
		    this.dataset.$video.each(function(idx, vd){
		      vd.playbackRate = speed;
		    });
		  },
		  getPlaybackRate: function(){
		    return this.dataset.playbackRate;
		  },
		  resetPlaybackRate: function(){
		    this.setPlaybackRate(1);
		  },
		  getFileInfoBySrc: function(src){
		    if (!this.dataset.fileSizeMap) this.dataset.fileSizeMap = {};
		    if (this.dataset.fileSizeMap[src]) return this.dataset.fileSizeMap[src];
		    var that = this;
		    $(this.dataset.playList).each(function(idx, item){
		      if (item.url === src){
		        if (item && item.data && item.data.bytesTotal){
		          that.dataset.fileSizeMap[src] = {
		            type: item.type,
		            index: idx,
		            filesize: parseInt(item.data.bytesTotal/1024)
		          };
		        }
		        return false;
		      }
		    });
		    return this.dataset.fileSizeMap[src];
		  },
	
		  calcDownloadSpeed: function(){
		    var that = this;
		    var bufferData = {};
		    var speedData = {};
		    var speedResult = {};
		    var calcSpeed = function(list, src){
		      if (list.length<2) return;
		      var start = list[list.length-2],
		        end = list[list.length-1];
		      if (!end.filesize) return;
		      if (start.filesize!==end.filesize || start.duration !== end.duration) return;
		      if (end.time === start.time) return;
		      var timeLoaded = end.buffered - start.buffered;
		      var timeInterval = (end.time - start.time)/1000;
		      var per = timeLoaded / end.duration;
		      var fileSizeLoaded = per * end.filesize;
		      var speed = fileSizeLoaded / timeInterval;
		      speed = parseInt(speed*10)/10;
		      if ($.type(speed)==='number' && !isNaN(speed)){
		        pushSpeed({
		          src: src,
		          speed: speed
		        });
		      }
		    };
		    var pushData = function(data){
		      if ( !data || !data.src) return;
		      if (!bufferData[data.src]) bufferData[data.src] = [];
		      bufferData[data.src].push(data);
		    };
		    var pushSpeed = function(data){
		      if ( !data || !data.src) return;
		      if (!speedData[data.src]) speedData[data.src]=[];
		      speedData[data.src].push(data.speed);
		    };
		    var calcAverageSpeed = function(src){
		      if (!src || $.type(speedData[src])!=='array' || !speedData[src].length) return;
		      if (speedResult[src]) return;
		      var list = speedData[src];
		      var sum = 0;
		      var maxSpeed = -1;
		      var minSpeed = -1;
		      var averageSpeed;
		      var info = that.getFileInfoBySrc(src);
		      var index = 0;
		      $(that.dataset.playList).each(function(idx, item){
		        if (item.type!==info.type) return;
		        if (item.url === src) return false;
		        index ++;
		      });
		      $(speedData[src]).each(function(idx, val){
		        sum += val;
		        if (minSpeed===-1) minSpeed = val;
		        if (maxSpeed===-1) maxSpeed = val;
		        if (val < minSpeed) minSpeed = val;
		        if (val > maxSpeed) maxSpeed = val;
		      });
		      averageSpeed = parseInt(sum*10 / speedData[src].length)/10;
		      speedResult[src] = {
		        name: info.type+'_'+index,
		        maxSpeed: maxSpeed,
		        minSpeed: minSpeed,
		        averageSpeed: averageSpeed,
		        playListType: info.type,
		        index: that.getPlayListIndex(that.getCurrentType())
		      };
		      util.showInfo('加载完成，速度统计', JSON.stringify(speedResult[src]));
		      speedData[src] = null;
		      bufferData[src] = null;
		      delete speedData[src];
		      delete bufferData[src];
		      that.context.msg.broadcast(api.eventApi.onSectionBufferEnd,speedResult[src]);
		    };
		    this.dataset.$video.on('progress', function(){
		      var buffered = this.buffered;
		      if (!buffered.length) return;
		      var info = that.getFileInfoBySrc(this.src);
		      if (!info) {
		        return;
		      }
		      pushData({
		        time: (+ new Date()),
		        filesize: info.filesize,
		        type: info.type,
		        src: this.src,
		        buffered: this.buffered.end(this.buffered.length-1),
		        duration: this.duration
		      });
		      calcSpeed( bufferData[this.src], this.src );
		    });
		    this.dataset.$video.on('timeupdate', function(){
		      if (!this.isFocus) return;
		      var buffered = this.buffered;
		      if (!buffered.length) return;
		      // 缓冲完成 计算平均速度
		      if (buffered.end( buffered.length -1) === this.duration){
		        calcAverageSpeed(this.src);
		      }
		    });
		  },
		  startWaitingFinder: function(video){
		    if (this.dataset.waitingFinder_TIMER) return;
		    if (!video || video.paused) return;
		    var prevTime;
		    var that = this;
		    this.dataset.waitingFinder_TIMER = setInterval(function(){
		      // 暂停不计
		      if (video.paused) return;
		      // 播放结束不计
		      if (video.ended) return;
		      if (prevTime===video.currentTime) {
		        if (that.dataset.isBadNetWork) return;
		        util.showInfo('onNetworkBadStart','');
		        that.context.msg.broadcast(api.eventApi.onNetworkBadStart,{
		          videoTag: video,
		          playListType: that.getCurrentType(),
		          isOnWaiting: that.getPlayState()===3,
		          index: that.getPlayListIndex(that.getCurrentType())
		        });
		        that.dataset.isBadNetWork = true;
		      }else{
		        if (that.dataset.isBadNetWork){
		          util.showInfo('onNetworkBadEnd','');
		          that.context.msg.broadcast(api.eventApi.onNetworkBadEnd,{
		            videoTag: video,
		            playListType: that.getCurrentType(),
		            index: that.getPlayListIndex(that.getCurrentType())
		          });
		          // that.stopWaitingFinder();
		        }
		        that.dataset.isBadNetWork = false;
		      }
		      prevTime = video.currentTime;
		    },1500);
		  },
		  stopWaitingFinder: function(){
		    if (!this.dataset.waitingFinder_TIMER) return;
		    clearInterval(this.dataset.waitingFinder_TIMER);
		    this.dataset.waitingFinder_TIMER = null;
		  },
	
	
		  // 添加事件监听
		  addEventListener: function(){
		    this.calcDownloadSpeed();
		    var that = this, prevCurrentTime=-1, prevBuffered = 0;
		    this.dataset.$video
		    .on('canplay', function(){
		      that.context.msg.broadcast(api.eventApi.onSectionCanplay, this);
		    })
		    .on('play', function(){
		      if (!this.isFocus) return;
		      that.context.msg.broadcast(api.eventApi.onSectionPlay, {
		        videoTag: this,
		        playListType: that.getCurrentType(),
		        index: that.getPlayListIndex(that.getCurrentType())
		      });
		      var info = that.getFileInfoBySrc(this.src);
		    })
		    .on('playing', function(){
		      if (!this.isFocus) return;
		      that.startWaitingFinder(this);
		      if (that.getCurrentType()==='film') that.setPlayState(1);
		      var type = that.getCurrentType();
		      that.context.msg.broadcast(api.eventApi.onSectionPlaying, {
		        videoTag: this,
		        playListType: type,
		        index: that.getPlayListIndex(that.getCurrentType())
		      });
		      if (type==='film'){
		        that.setVideoPlaybackRate(that.dataset.playbackRate);
		      }
		    })
		    .on('progress', function(){
		      if (!this.isFocus) return;
		      that.context.msg.broadcast(api.eventApi.onSectionProgress, {
		        videoTag: this
		      });
		      if (this.buffered && this.buffered.length) {
		        if (this.buffered.end(this.buffered.length-1) === this.duration &&
		          // 缓冲完成了还在触发，这里做下去重
		          prevBuffered !==this.buffered.end(this.buffered.length-1)
		        ){
		          prevBuffered =this.buffered.end(this.buffered.length-1);
		          var info = that.getFileInfoBySrc(this.src);
		          info && util.showInfo('缓冲完成', info.type+'_'+info.index+' '+util.dateFormat());
		        }
		      }
		    })
		    .on('pause', function(){
		      if (!this.isFocus) return;
		      // that.stopWaitingFinder();
		      that.context.msg.broadcast(api.eventApi.onSectionPause, {
		        videoTag: this,
		        playListType: that.getCurrentType()
		      });
		      if (that.getCurrentType()==='film' && !this.ended) {
		        that.setPlayState(2);
		      }
		    })
		    .on('timeupdate', function(){
		      if (!this.isFocus) return;
		      that.startWaitingFinder(this);
		      var currentTime = parseInt(this.currentTime);
		      var type = that.getCurrentType();
		      // 1s内只触发一次，节约性能好
		      if (currentTime!==prevCurrentTime) {
		        that.context.msg.broadcast(api.eventApi.onSectionTimeupdate, {
		          videoTag: this,
		          playListType: type
		        });
		        if ( type==='film' ){
		          that.context.userMsg.broadcast(api.eventApi.onTimeUpdate, {
		            videoTag: this
		          });
		        }
		        prevCurrentTime = currentTime;
		      }
		      // 禁用预加载
		      if (that.dataset.disablePreload) return;
		      // 最后15秒开始预加载
		      if ((this.duration - this.currentTime) > 15) return;
		      if (that.isTheLastOfPlayList()) return;
		      if ( that.isFocusVideoBufferComplete() ) {
		        if (parseInt(that.checkPreloadVideoStatus()) === videoStatusMaps.PRELOAD) {
		          return;
		        }else{
		          that.setPreloadVideoUrl();
		        }
		      }
		    })
		    .on('ended', function(){
		      if (!this.isFocus) return;
		      that.stopWaitingFinder();
		      var type = that.getCurrentType();
		      // 首先触发statechange
		      if (type==='film'){
		        that.setPlayState(0);
		      }
		      // 再广播视频播放结束
		      that.context.msg.broadcast(api.eventApi.onSectionEnded, {
		        videoTag: this,
		        index: that.getPlayListIndex(type),
		        playListType: type,
		        isAllEnd: that.isTheLastOfPlayList(),
		        playListTypeEnd: that.isTheLastOfPlayList( type )
		      });
		      if (that.dataset.disablePreload) return;
	
		      // 播放结束，执行播放或者预加载
		      if (that.isTheLastOfPlayList()) return;
		      if (that.checkPreloadVideoStatus() === videoStatusMaps.PRELOAD) {
		        if (that.dataset.requestPreloadUrlFail){
		          that.context.msg.broadcast(api.eventApi.onVideoInterruptByError);
		        }else{
		          that.setPreloadVideoPlay();
		        }
		        return;
		      }else{
		        that.setPreloadVideoUrl({autoplay: true});
		      }
		    })
		    .on('error', function(e){
		      if (!this.isFocus) return;
		      var hasRetry = false;
		      var currentTime = this.currentTime;
		      if (!that.dataset.errorRetryTimes) that.dataset.errorRetryTimes = 0;
		      that.dataset.errorRetryTimes ++;
		      if (that.dataset.errorRetryTimes>5){
		        hasRetry = true;
		        delete that.dataset.errorRetryTimes;
		      }else{
		        this.pause();
		        try{
		          this.load();
		        }catch(e){
		          // 待上报
		          util.showInfo(e, e.stack);
		        }
		        that.setVideoPlayTime(this, currentTime, true);
		        // this.play();
		      }
		      if (!hasRetry) return;
		      var err = {};
		      var errMaps = {
		        1: 'MEDIA_ERR_ABORTED[取回过程被用户中止]',
		        2: 'MEDIA_ERR_NETWORK[当下载时发生错误]',
		        3: 'MEDIA_ERR_DECODE[当解码时发生错误]',
		        4: 'MEDIA_ERR_SRC_NOT_SUPPORTED[不支持音频/视频]'
		      };
		      if (this && this.error) {
		        err.code = this.error.code;
		        err.msg = errMaps[err.code];
		      }
		      err.type = that.getCurrentType();
		      err.videoTag = this;
		      that.context.msg.broadcast(api.eventApi.onError,err);
		      that.context.userMsg.broadcast(api.eventApi.onError, err);
	
		      var errCode = 3000 + err.code, stack = [];
		      stack = [
		        'videoType:' + err.type,
		        'videoSrc:' + this.src
		      ];
		      that.context.msg.broadcast(Txplayer.apiList.privateApi.reportError, {
		        msg: err.msg,
		        code: errCode,
		        stack: stack.join('\n')
		      });
		    })
		    .on('waiting', function(){
		      if (!this.isFocus) return;
		      util.showInfo('$video wating', {
		        time: +new Date(),
		        isPlaying: !this.paused,
		        seeking: this.seeking
		      });
		      that.context.msg.broadcast(api.eventApi.onSectionWaiting,{
		        videoTag: this,
		        index: that.getPlayListIndex(that.getCurrentType()),
		        playListType: that.getCurrentType(),
		        seeking: this.seeking
		      });
		      if (that.getCurrentType()==='film') that.setPlayState(3);
		    })
		    .on('loadstart', function(){
		      if (!this.isFocus) return;
		      that.context.msg.broadcast(api.eventApi.onSectionLoadstart);
		    })
		    .on('seeking', function(){
		      if (!this.isFocus) return;
		      that.context.msg.broadcast(api.eventApi.onSectionSeeking);
		    })
		    .on('seeked', function(){
		      if (!this.isFocus) return;
		      that.context.msg.broadcast(api.eventApi.onSectionSeeked);
		    })
	
		    // add Data
		    this.context.msg.on(api.privateApi.addUrls2Player, function(param, options){
		      var data = {};
		      if ($.type(param)==='array') data.data = param;
		      if ($.type(param)==='object' && $.type(param.data)==='array') data = param;
		      if ($.type(data.data)!=='array') {
		        util.error('addUrls2Player 参数错误');
		        return;
		      }
		      if (!that.dataset.playList || data.clear) {
		        that.dataset.playList = [];
		        that.dataset.index = 0;
		      }
		      if (data.data && data.type && data.repalcePlayList===true) {
		        if (data.data.length === that.calcTotalPlaylist(data.type)) {
		          var realIndex = 0;
		          $(that.dataset.playList).each(function(idx, item){
		            if (item.type!==data.type) return;
		            that.dataset.playList[idx] = data.data[realIndex];
		            realIndex ++;
		          });
		        }
		      }else if(data.data && data.type && data.hasOwnProperty('startIndex')){
		        that.dataset.playList = util.insert2Array(data.data, data.startIndex, that.dataset.playList);
		      }else{
		        that.dataset.playList = that.dataset.playList.concat(data.data);
		      }
		    });
		    this.context.msg.on(api.eventApi.onSectionEnded, function(data){
		      // 全部播放完成，重置index
		      if (data.isAllEnd){
		        that.dataset.index = 0;
		      }
		    });
		    this.context.msg.on(api.privateApi.clearPlaylist, function(data, options){
		      that.clearPlaylist(data);
		    });
		    this.context.msg.on(api.privateApi.lockAndPreloadNext, function(data){
		      that.lockAndPreloadNext(data);
		    });
		    this.context.msg.on(api.privateApi.getCurrentPlayListType, function(data, options){
		      options.data = that.getCurrentType();
		    });
		    this.context.msg.on(api.privateApi.isTheLastOfPlayList, function(data, options){
		      options.data = that.isTheLastOfPlayList(data);
		    });
		    this.context.msg.on(api.privateApi.clearFocusVideoUrl, function(data, options){
		      that.clearFocusVideoUrl();
		    });
		    this.context.msg.on(api.eventApi.beforeVideoPlay, function(data, options){
		      that.setPlayState(-1);
		    });
		  },
		  // 对外提供的接口
		  exportsModuleApis: function(){
		    var that = this;
		    // 用户API
		    this.dataset.moduleApis = {};
		    this.dataset.moduleApis[api.publicApi.mute] = function(data, options){
		      that.mute(data);
		    };
		    this.dataset.moduleApis[api.publicApi.unMute] = function(data, options){
		      that.unMute(data);
		    };
		    this.dataset.moduleApis[api.publicApi.isMuted] = function(data, options){
		      options.data = !!that.dataset.muted;
		    };
		    this.dataset.moduleApis[api.publicApi.getPlayerState] = function(data, options){
		      options.data = that.getPlayState();
		    };
		    this.dataset.moduleApis[api.publicApi.isPlaying] = function(data, options){
		      options.data = that.isPlaying();
		    };
		    this.dataset.moduleApis[api.publicApi.getPoster] = function(data, options){
		      options.data = that.getVideoPoster();
		    };
		    this.dataset.moduleApis[api.publicApi.setVolume] = function(data, options){
		      that.setVolume(data);
		    };
		    this.dataset.moduleApis[api.publicApi.getVolume] = function(data, options){
		      options.data = that.getVolume(data);
		    };
		    this.dataset.moduleApis[api.publicApi.setPlaybackRate] = function(data, options){
		      that.setPlaybackRate(data);
		    };
		    this.dataset.moduleApis[api.publicApi.getPlaybackRate] = function(data, options){
		      options.data = that.getPlaybackRate();
		    };
		    $.each(this.dataset.moduleApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
	
		    // 私有API
		    this.dataset.privateApis = {};
		    this.dataset.privateApis[api.privateApi.play] = function(data, options){
		      that.play(data);
		    };
		    this.dataset.privateApis[api.privateApi.getPlayListIndex] = function(data, options){
		      options.data = that.getPlayListIndex(data);
		    };
		    this.dataset.privateApis[api.privateApi.setPreloadVideoUrl] = function(data, options){
		      if (!data) return;
		      that.setPreloadVideoUrl({
		        url: data
		      });
		    };
		    this.dataset.privateApis[api.privateApi.setPreloadVideoKeepSpaceToFocusVideo] = function(data, options){
		      options.async = $.Deferred();
		      that.setPreloadVideoKeepSpaceToFocusVideo(function(isSuccess){
		        if (isSuccess===true) {
		          options.async.resolve();
		        } else {
		          options.async.reject(isSuccess);
		        }
		      });
		    };
		    this.dataset.privateApis[api.privateApi.getFocusVideoCurrentTime] = function(data, options){
		      options.data = that.getFocusVideoCurrentTime();
		    };
		    this.dataset.privateApis[api.privateApi.setFocusVideoCurrentTime] = function(data, options){
		      that.setFocusVideoCurrentTime(data.time, data.autoplay);
		    };
		    this.dataset.privateApis[api.privateApi.setFocusVideoUrl] = function(data, options){
		      that.setFocusVideoUrl(data);
		    };
		    this.dataset.privateApis[api.privateApi.setFocusVideoPlay] = function(){
		      that.setFocusVideoPlay();
		    };
		    this.dataset.privateApis[api.privateApi.setFocusVideoPause] = function(){
		      that.setFocusVideoPause();
		    };
		    this.dataset.privateApis[api.privateApi.calcTotalPlaylist] = function(data, options){
		      options.data = that.calcTotalPlaylist(data);
		    };
		    this.dataset.privateApis[api.privateApi.getFocusVideoBufferedTime] = function(data, options){
		      options.data = that.getFocusVideoBufferedTime();
		    };
		    this.dataset.privateApis[api.privateApi.getFocusVideoWidthHeight] = function(data, options){
		      var video = that.getFocusVideoTag();
		      options.data = {
		        width: video.videoWidth,
		        height: video.videoHeight
		      }
		    };
		    this.dataset.privateApis[api.privateApi.getFocusVideoDuration] = function(data, options){
		      options.data = that.getFocusVideoDuration();
		    };
		    this.dataset.privateApis[api.privateApi.playTheNext] = function(data, options){
		      that.playTheNext();
		    };
		    this.dataset.privateApis[api.privateApi.isFocusVideoSeeking] = function(data, options){
		      var video = that.getFocusVideoTag();
		      options.data = video.seeking;
		    };
		    $.each(this.dataset.privateApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
		  }
		};
	
		Txplayer.register('HdPlayer', HdPlayer);
	
	/***/ },
	
	/***/ 24:
	/***/ function(module, exports) {
	
		module.exports = "<txpdiv data-role=\"<%=videomod%>\" class=\"txp_video_container\">\n  <video style=\"<%=data.videoStyle%>\" <%=data.attrs%> data-role=\"txp_video_tag\" />\n  <video style=\"<%=data.videoStyle%>\" <%=data.attrs%> data-role=\"txp_video_tag\" />\n  <video style=\"<%=data.videoStyle%>\" <%=data.attrs%> data-role=\"txp_video_tag\" />\n</txpdiv>";
	
	/***/ }
	
	/******/ });
