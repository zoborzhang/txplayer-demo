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
	
		module.exports = __webpack_require__(12);
	
	
	/***/ },
	
	/***/ 12:
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * 高清视频+3Video
		 */
		var htmlstr         = __webpack_require__(13);
		var $               = Txplayer.$;
		var util            = Txplayer.util;
		var api             = Txplayer.apiList;
	
		function H5Player(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
		H5Player.prototype = {
		  init: function(){
		    this.dataset.index =0;
		    this.playStateInit();
		    this.write();
		    this.loadSubPlugins();
		  },
		  playStateInit: function(){
		    // -1（未开始）
		    // 0（已结束）
		    // 1（正在播放）
		    // 2（已暂停）
		    // 3（正在缓冲）
		    this.dataset.playState = -1;
		  },
		  write: function(){
		    this.dataset.hasVideoHtmlWrited = true;
		    this.context.dataset.$playermod.append(this.buildHTML());
		    this.dataset.$videomod = this.context.dataset.$playermod.find('[data-role="'+this.dataset.renderData.videomod+'"]');
		    this.dataset.$video = this.dataset.$videomod.find('video');
		    this.dataset.videoTag = this.dataset.$video[0];
		    this.addEventListener();
		    this.exportsModuleApis();
		    this.context.userMsg.emit(api.eventApi.onWrite);
		  },
		  remove: function(){
		    this.dataset.$videomod.remove();
		  },
		  loadSubPlugins: function(){
		    var plugins = [];
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
		    var arr = [];
		    arr.push('background-color:#000');
		    arr.push('width:100%');
		    arr.push('height:100%');
		    return arr.join(';');
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
		    this.context.userMsg.broadcast(api.eventApi.onPlayStateChange, state);
		  },
		  // 获取视频播放状态
		  getPlayState: function(){
		    return this.dataset.playState;
		  },
		  // 设置当前显示的视频的播放时间
		  setFocusVideoCurrentTime: function(time, autoplay){
		    var video = this.dataset.videoTag;
		    if ($.type(time)!=='number'){
		      return;
		    }
		    if (time<0) {
		      return;
		    }
		    if (time > video.duration) {
		      util.showError('setFocusVideoCurrentTime Error', 'time=' + time + ',duration=' + video.duration);
		      return;
		    }
		    video.currentTime = time;
		    if (autoplay) video.play();
		  },
	
	
		  playTheNext: function(){
		    if (this.isTheLastOfPlayList()) return;
		    this.dataset.index++;
		    var data = this.dataset.playList[this.dataset.index];
		    if (data && data.url){
		      this.dataset.videoTag.src = data.url;
		      this.dataset.videoTag.load();
		      this.dataset.videoTag.play();
		    }
		  },
		  isPlaying: function(){
		    return !this.dataset.videoTag.paused;
		  },
		  pause: function(){
		    this.dataset.videoTag.pause();
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
		  clearFocusVideoUrl: function(){
		    var video = this.dataset.videoTag;
		    video.pause();
		    video.src = '';
		    $(video).removeAttr('src');
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
		  videoRequestFullScreen: function(){
		    var video = this.dataset.videoTag;
		    if (video.webkitEnterFullscreen){
		      video.webkitEnterFullscreen();
		    }else if(video.webkitRequestFullScreen){
		      video.webkitRequestFullScreen();
		    }else{
		      util.showError('videoRequestFullScreen', 'not support');
		    }
		  },
	
		  // 播放
		  play: function(options){
		    if (!this.dataset.playList || !this.dataset.playList.length) {
		      util.error('can not find urls data, please addURLSData first!');
		      return;
		    }
		    if (options && $.type(options.updateIndex)==='number') this.dataset.index = options.updateIndex;
		    if ($.type(options)!=='undefined') {
		      if ($.type(options)==='string') {
		        this.dataset.videoTag.src = options;
		        this.dataset.videoTag.load();
		        this.dataset.videoTag.play();
		      }
		    }else if(!this.dataset.videoTag.src){
		      var data = this.dataset.playList[ this.dataset.index ];
		      if (data && data.url){
		        this.dataset.videoTag.src = data.url;
		        this.dataset.videoTag.load();
		        this.dataset.videoTag.play();
		      }
		    }else{
		      // alert(this.dataset.videoTag.src)
		      this.dataset.videoTag.src && this.dataset.videoTag.play();
		    }
		  },
		  // 添加事件监听
		  addEventListener: function(){
		    var that = this, prevCurrentTime=-1;
		    this.dataset.$video
		    .on('canplay', function(){
		      that.context.msg.broadcast(api.eventApi.onSectionCanplay, this);
		    })
		    .on('play', function(){
		      that.context.msg.broadcast(api.eventApi.onSectionPlay, {
		        videoTag: this,
		        playListType: that.getCurrentType(),
		        index: that.getPlayListIndex(that.getCurrentType())
		      });
		    })
		    .on('playing', function(){
		      var type = that.getCurrentType();
		      that.context.msg.broadcast(api.eventApi.onSectionPlaying, {
		        videoTag: this,
		        playListType: type,
		        index: that.getPlayListIndex(that.getCurrentType())
		      });
		    })
		    .on('progress', function(){
		      that.context.msg.broadcast(api.eventApi.onSectionProgress, {
		        videoTag: this
		      });
		    })
		    .on('pause', function(){
		      that.context.msg.broadcast(api.eventApi.onSectionPause, {
		        videoTag: this,
		        playListType: that.getCurrentType()
		      });
		      if (that.getCurrentType()==='film') that.setPlayState(2);
		    })
		    .on('timeupdate', function(){
		      var currentTime = parseInt(this.currentTime);
		      // 1s内只触发一次，节约性能好
		      if (currentTime!==prevCurrentTime) {
		        that.context.msg.broadcast(api.eventApi.onSectionTimeupdate, {
		          videoTag: this,
		          playListType: that.getCurrentType()
		        });
		        prevCurrentTime = currentTime;
		      }
		    })
		    .on('ended', function(){
		      var type = that.getCurrentType();
		      var playListTypeEnd = that.isTheLastOfPlayList( type );
		      that.context.msg.broadcast(api.eventApi.onSectionEnded, {
		        videoTag: this,
		        index: that.getPlayListIndex(type),
		        playListType: type,
		        isAllEnd: that.isTheLastOfPlayList(),
		        playListTypeEnd: playListTypeEnd
		      });
	
		      // 播放结束，执行播放或者预加载
		      if (that.isTheLastOfPlayList()) return;
		      if (playListTypeEnd && that.getCurrentType()==='film'){
		        that.setPlayState(0);
		      }
		      that.playTheNext();
		    })
		    .on('error', function(e){
		      var hasRetry = false;
		      if (!that.dataset.errorRetryTimes) that.dataset.errorRetryTimes = 0;
		      that.dataset.errorRetryTimes ++;
		      if (that.dataset.errorRetryTimes>5){
		        hasRetry = true;
		        delete that.dataset.errorRetryTimes;
		      }else{
		        this.load();
		        this.play();
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
		      that.context.msg.broadcast(api.eventApi.onSectionWaiting,{
		        videoTag: this,
		        index: that.getPlayListIndex(that.getCurrentType()),
		        playListType: that.getCurrentType()
		      });
		      if (that.getCurrentType()==='film') that.setPlayState(3);
		    })
		    .on('loadstart', function(){
		    })
		    .on('seeking', function(){
		      that.context.msg.broadcast(api.eventApi.onSectionSeeking);
		    })
		    .on('seeked', function(){
		      that.context.msg.broadcast(api.eventApi.onSectionSeeked);
		    })
		    // iso 独有，因为不会触发但不会触发上述onwebkitfullscreenchange
		    // document:
		    // http://developer.apple.com/library/safari/#documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/ControllingMediaWithJavaScript/ControllingMediaWithJavaScript.html#//apple_ref/doc/uid/TP40009523-CH3-SW1
		    .on('webkitendfullscreen', function(){
		      that.context.msg.broadcast(api.publicApi.exitWindowFullscreen);
		    });
	
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
		    this.context.msg.on(api.privateApi.getCurrentPlayListType, function(data, options){
		      options.data = that.getCurrentType();
		    });
		    this.context.msg.on(api.privateApi.isTheLastOfPlayList, function(data, options){
		      options.data = that.isTheLastOfPlayList(data);
		    });
		  },
		  // 对外提供的接口
		  exportsModuleApis: function(){
		    var that = this;
		    // 用户API
		    this.dataset.moduleApis = {};
		    this.dataset.moduleApis[api.publicApi.getPlayerState] = function(data, options){
		      options.data = that.getPlayState();
		    };
		    this.dataset.moduleApis[api.publicApi.isPlaying] = function(data, options){
		      options.data = that.isPlaying();
		    };
		    $.each(this.dataset.moduleApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
	
		    // 私有API
		    this.dataset.privateApis = {};
		    this.dataset.privateApis[api.privateApi.play] = function(data, options){
		      that.play(data);
		    };
		    this.dataset.privateApis[api.privateApi.setFocusVideoPause] = function(data, options){
		      that.pause();
		    };
		    this.dataset.privateApis[api.privateApi.setFocusVideoPlay] = function(data, options){
		      that.dataset.videoTag.play();
		    };
		    this.dataset.privateApis[api.privateApi.getPlayListIndex] = function(data, options){
		      options.data = that.getPlayListIndex(data);
		    };
		    this.dataset.privateApis[api.privateApi.playTheNext] = function(data, options){
		      that.playTheNext();
		    };
		    this.dataset.privateApis[api.privateApi.clearFocusVideoUrl] = function(data, options){
		      that.clearFocusVideoUrl();
		    };
		    this.dataset.privateApis[api.privateApi.getFocusVideoCurrentTime] = function(data, options){
		      options.data = that.dataset.videoTag.currentTime;
		    };
		    this.dataset.privateApis[api.privateApi.videoRequestFullScreen] = function(data, options){
		      that.videoRequestFullScreen();
		    };
		    this.dataset.privateApis[api.privateApi.setFocusVideoCurrentTime] = function(data, options){
		      that.setFocusVideoCurrentTime(data.time, data.autoplay);
		    };
	
		    $.each(this.dataset.privateApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
		  }
		};
	
		Txplayer.register('H5Player', H5Player);
	
	/***/ },
	
	/***/ 13:
	/***/ function(module, exports) {
	
		module.exports = "<txpdiv data-role=\"<%=videomod%>\" class=\"txp_video_container\">\n  <video style=\"<%=data.videoStyle%>\" <%=data.attrs%> data-role=\"txp_video_tag\" />\n</txpdiv>";
	
	/***/ }
	
	/******/ });
