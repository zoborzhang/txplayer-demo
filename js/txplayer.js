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
	
		module.exports = __webpack_require__(81);
	
	
	/***/ },
	
	/***/ 81:
	/***/ function(module, exports, __webpack_require__) {
	
		var uaMatch       = __webpack_require__(82);
		var report        = __webpack_require__(83);
		var api           = __webpack_require__(84);
		var util          = __webpack_require__(85);
		util.uaMatch      = uaMatch;
		uaMatch.call(util);
		util.report       = report;
	
	
		var defaultconfig = __webpack_require__(86);
		var dataset       = __webpack_require__(87);
		var Events        = __webpack_require__(88);
		var $             = __webpack_require__(90);
		var tmpl          = __webpack_require__(91);
		var xml2json   = __webpack_require__(92);
		var playerReport = __webpack_require__(93);
		$.tmpl            = tmpl;
		util.xml2json = xml2json;
	
		var defaultPluginsMap = {
		  vod: {
		    // 高清h5点播
		    html5hd: [
		      'HtmlFrame',
		      'HdPlayer',
		      'UiTips',
		      'HdPlayerAd',
		      'HdPlayerReport',
		      'HdPlayerHistory',
		      'UiControl',
		      'UiPreview',
		      'UiLoading',
		      'UiTitle',
		      // 'UiFavorite',
		      'UiPlayerAd',
		      'UiPoster',
		      'UiDialog',
		      'HdPlayerAdReport',
		      'HdHotKey',
		      'HdPlayerControl'
		    ],
		    // ipad
		    ipadh5: [
		      'HtmlFrame',
		      'UiTips',
		      'UiControl',
		      'UiLoading',
		      'UiTitle',
		      'UiPlay',
		      // 'UiFavorite',
		      'UiPlayerAd',
		      'HdPlayerReport',
		      'HdPlayerHistory',
		      'UiPoster',
		      'UiDialog',
		      'HdPlayerAd',
		      'HdPlayerAdReport',
		      'H5Player',
		      'H5PlayerControl'
		    ],
		    // flash播放器
		    'flash'      : ['HtmlFrame','FlashPlayer'],
		    // 三星合作商tizen
		    'tizen'      : ['TizenLoadingAd','TizenTV']
		  },
		  live: {
	
		  }
		};
	
		/**
		 * 核心框架
		 * @param {Object} config 配置参数
		 */
		function Txplayer(conf){
		  // 私有消息对象，供内部通信
		  var privateMsg = new Events();
		  // 用户消息对象，供用户事件监听回调
		  var userMsg   = new Events();
		  this.userMsg = userMsg;
		  if (conf.playType) conf.playerType = conf.playType;
		  // privite data
		  var config = $.extend({}, defaultconfig, conf);
		  var pluginsMaps = conf.pluginsMap || defaultPluginsMap;
		  var pluginsMap;
		  pluginsMap = pluginsMaps[config.videoType];
		  // 拓展settings
		  config.settings = $.extend({}, config.settings, config.extendSettings || {});
	
		  var context = {
		    config  : config,
		    msg     : privateMsg,
		    userMsg : userMsg,
		    dataset : {}
		  };
		  privateMsg.setMaxListeners(100);
		  userMsg.setMaxListeners(100);
		  var plugins                        = choosePlugins(config, pluginsMap);
		  // 拓展插件列表
		  if (conf.extendPluginsMap &&
		    conf.extendPluginsMap[config.videoType] &&
		    conf.extendPluginsMap[config.videoType][config.playerType]
		  ) {
		    plugins = plugins.concat(conf.extendPluginsMap[config.videoType][config.playerType]);
		  }
		  var that                           = this;
		  config.playerId                    = getPlayerId();
		  dataset._instance[config.playerId] = this;
		  if (config.playerType==='flash'){
		    dataset.flashVersion = util.getFlashVersion();
		  }
	
		  // 设置用户ID
		  getAndSetUserId();
		  userMsg.on(api.eventApi.onReady, function(){
		    playerReport.reportTxplayer(context, {
		      playType: config.playerType,
		      videoType: config.videoType
		    });
		  });
		  // 提供上报接口
		  playerReport.exportsReportApi(context);
	
		  // Txplayer给用户的API
		  for (var key in api.publicApi) {
		    (function(apiName, msgName){
		      that[apiName] = function(){
		        // 找不到指令则抛出错误
		        if (!privateMsg.listenerCount(msgName)) {
		          util.showError(msgName, 'API没有实现，请核对当前版本是否有提供这个API('+dataset.documentWebSite+')');
		          return 'error';
		        }
		        // 处理API参数, 第一个是消息名，之后是参数
		        var args = [msgName];
		        $.each(arguments, function(idx, item){
		          args.push(item);
		        });
		        return privateMsg.run.apply(privateMsg, args);
		      };
		    })(key, api.publicApi[key]);
		  }
	
		  // 判断API是否存在
		  this.isApiExist = function(apiName){
		    if (api.publicApi[apiName] && privateMsg.listenerCount(api.publicApi[apiName]) > 0){
		      return true;
		    }
		    return false;
		  };
	
		  // 存储播放容器DOM对象
		  privateMsg.on('setPlayerModel', function($dom){
		    if ($dom && $dom.length) {
		      context.dataset.$playermod = $dom;
		    }
		  });
	
		  // 拓展插件
		  function extend(objA, objB){
		    var obj = {};
		    for(var i in objA){
		      if (!objB.hasOwnProperty(i)){
		        obj[i] = objA[i];
		        continue;
		      }
		    }
		  }
	
		  // 设置和存储用户标识
		  function getAndSetUserId(){
		    var uid = util.getData(dataset.localStorageKey.userId);
		    if (!uid || uid.length !==32) {
		      uid = util.createGUID();
		      util.setData(dataset.localStorageKey.userId, uid);
		    }
		    context.msg.on(api.publicApi.getUserId, function(data, options){
		      options.data = uid;
		    });
		  }
	
		  // 获取播放ID
		  function getPlayerId(){
		    var pid = util.createGUID();
		    return pid;
		  }
	
		  // 插件过滤
		  function choosePlugins(config, pluginsMap){
		    function getPlayTypeFromData(){
		      var datastr = util.getData(dataset.localStorageKey.userSetting);
		      var data = {};
		      try{
		        if (window.JSON && $.type(JSON.parse)==='function'){
		          data = JSON.parse(datastr);
		        }else{
		          data = $.parseJSON(datastr);
		        }
		      }catch(e){
		        context.msg.broadcast(Txplayer.apiList.privateApi.reportError, {
		          msg: e.message,
		          code: '3000',
		          stack: e.stack
		        });
		      }
		      if (data && data.isUseFlash+'' === '1') return 'flash';
		      else if(data && data.isUseFlash+'' === '0') return 'html5hd';
		      return '';
		    }
		    var type;
		    // pc播放器，首先从本地数据读取
		    if (!util.mobile) {
		      type = getPlayTypeFromData();
		    }
		    // windows debug=true，可以使用h5播放器
		    if ((config.playerType==='html5hd' || type==='html5hd') &&
		      util.os.windows && !dataset.debug
		    ){
		      type = 'flash';
		    }
		    // ie浏览器强制使用flash
		    if (util.browser.ie) {
		      type = 'flash';
		    }
		    config.playerType = type ? type : (
		      config.playerType ? config.playerType : getPlayTypeByUA());
		    var pluginList = pluginsMap[config.playerType];
		    if (!pluginList || pluginList.length===0) return [];
		    return pluginList;
		  }
	
		  // 加载插件
		  function installPlugins(){
		    util.loadPlugins.call(that, plugins, context, config.settings, function(){
		      context.dataset.isReady = true;
		      if (config.playerType==='flash') return;
		      userMsg.broadcast(api.eventApi.onReady);
		      privateMsg.broadcast(api.eventApi.onReady);
		    });
		  }
	
		  // 根据UA选择播放类型
		  function getPlayTypeByUA(){
		    function getVodPlayType(){
		      if (util.os.mac){
		        return 'html5hd';
		      }
		      else if(util.os.windows){
		        return 'flash';
		      }
		      else if(util.os.ios){
		        if (util.os.ipad) return 'ipadh5';
		        return 'h5';
		      }
		      else if(util.os.android){
		        if (util.isSupportMP4()) return 'h5';
		        else return 'mp4link';
		      }
		      return 'h5';
		    }
	
		    function getLivePlayType(){}
		    if (config.videoType==='vod') return getVodPlayType();
		    else return getLivePlayType();
		  }
	
		  // CDN合并服务
		  function comboService(){
		    var list = [];
		    var urls = [];
		    var comboUrls = [];
		    var checkSub = function(obj){
		      if ($.type(obj)==='string'){
		        if(!config.settings[obj]){
		          list.push(obj);
		        }else if (config.settings.hasOwnProperty(obj) && !config.settings[obj].url){
		          list.push(obj);
		        }
		        if (config.settings[obj] && $.type(config.settings[obj].subPlugins)==='array'){
		          $(config.settings[obj].subPlugins).each(function(idx, item){
		            checkSub(item);
		          });
		        }
		      }
		    };
		    $(plugins).each(function(idx, item){
		      checkSub(item);
		    });
		    $(list).each(function(idx, item){
		      // if ( $.inArray(item.toLowerCase(), ['hdplayerreport', 'hdplayerhistory']) >-1) return;
		      if (Txplayer.plugins[item]) return;
		      urls.push('/tencentvideo/txp/js/plugins/'+ item.toLowerCase()+'.js');
		    });
		    while(urls.length>=20){
		      comboUrls.push( dataset.comboServiceRule + urls.splice(0,20) );
		    }
		    if (urls.length>0){
		      comboUrls.push( dataset.comboServiceRule + urls.splice(0,20) );
		    }
		    var loadComboScript = function(){
		      if (comboUrls.length===0){
		        installPlugins();
		        return;
		      }
		      var url = comboUrls.shift();
		      util.loadScript(url).done(function(){
		        loadComboScript();
		      }).fail(function(){
		        loadComboScript();
		      });
		      // util.loadScript(url, function(){
		      //   loadComboScript();
		      // }, function(){
		      //   loadComboScript();
		      // });
		    };
		    loadComboScript();
		  }
	
		  if (config.useComboService){
		    comboService();
		  }else{
		    installPlugins();
		  }
	
		  userMsg.on(api.publicApi.isReady, function(data, options){
		    options.data = !!context.dataset.isReady;
		  });
		  privateMsg.on(api.publicApi.getPlayerType, function(data, options){
		    options.data = config.playerType;
		  });
		  privateMsg.on(api.publicApi.getVideoType, function(data, options){
		    options.data = config.videoType;
		  });
	
		  // 销毁机制
		  context.msg.on(Txplayer.apiList.privateApi.destroyPlugin, function(data, options){
		    if (data) {
		      var key = '_' + data;
		      if (that[key]){
		        that[key] = null;
		        delete that[key];
		      }
		      return;
		    }
		    for(var i in that){
		      that[i] = null;
		      delete that[i];
		    }
		    dataset.maxId--;
		  });
	
		  // 添加事件
		  this.on = function(evtName, fn){
		    if (typeof evtName!=='string') {
		      util.error('player.on(evtName, fn), evtName must be a String');
		      return this;
		    }
		    if (typeof fn!=='function') {
		      util.error('player.on(evtName, fn), fn must be a Function');
		      return this;
		    }
		    // set this point to Txplayer instance
		    var that = this;
		    userMsg.on(evtName, function(){
		      fn.apply(that, arguments);
		    });
		    return this;
		  };
		  // 触发事件
		  this.trigger = function(evtName, data){
		    if (typeof evtName!=='string') return false;
		    // 支持拓展多个参数
		    var args = [evtName, data];
		    $.each(arguments, function(idx, item){
		      if (idx<2) return;
		      args.push(item);
		    });
		    // return userMsg.broadcast(evtName, data);
		    return userMsg.broadcast.apply(userMsg, args);
		  };
		  // 移除事件
		  this.off = function(evtName){
		    if (typeof evtName!=='string') {
		      util.error('player.off("evtName"):evtName must be a string');
		      return false;
		    }
		    userMsg.off(evtName);
		    return this;
		  };
		}
	
		// global api
		Txplayer.register = function(pluginName, fn){
		  if (typeof pluginName!=='string') {
		    util.error('player.register(pluginName, fn), pluginName must be a String');
		    return this;
		  }
		  if (typeof fn!=='function') {
		    util.error('player.register(pluginName, fn), fn must be a Function');
		    return this;
		  }
		  Txplayer.plugins[pluginName] = fn;
		};
	
		$(document).trigger(dataset.jsApiReady);
		Txplayer.msg           = new Events();
		Txplayer.dataset       = dataset;
		Txplayer.defaultconfig = defaultconfig;
		Txplayer.util          = util;
		Txplayer.Events        = Events;
		Txplayer.plugins       = {};
		Txplayer.$             = $;
		Txplayer.apiList       = api;
		window.Txplayer        = Txplayer;
	
	/***/ },
	
	/***/ 82:
	/***/ function(module, exports) {
	
		function uaMatch(ua){
		  ua = ua || navigator.userAgent;
		  ua = ua.toLowerCase();
		  if (!this.browser) this.browser = {};
		  if (!this.os) this.os = {};
		  if (!this.phone) this.phone = {};
		  if (!this.mobile) this.mobile = false;
	
		  // $.mobile
		  if (ua.indexOf('mobile')>-1) this.mobile = true;
	
	
		  // $.os
		  var osDetect = {
		    android_1: /android[\s\/]([\d\.]+)/i,
		    android_2: /android/i,
		    android_3: /MIDP-/i,
		    ipod_1: /iPod\stouch;\sCPU\siPhone\sos\s([\d_]+)/i,
		    ipod_100: /iPod.*os\s?([\d_\.]+)/i,
		    iphone: /iPhone;\sCPU\siPhone\sos\s([\d_]+)/i,
		    iphone_100: /iPhone.*os\s?([\d_\.]+)/i,
		    ipad_1: /ipad;\scpu\sos\s([\d_]+)/i,
		    ipad_2: /ipad([\d]+)?/i,
		    windows: /windows\snt\s([\d\.]+)/i,
		    mac: /Macintosh.*mac\sos\sx\s([\d_\.]+)/i
		  };
		  var osMatch;
		  for(var i in osDetect){
		    osMatch = osDetect[i].exec(ua);
		    if (!osMatch) continue;
		    this.os[ i.replace(/_\d+/,'') ] = true;
		    if (osMatch[1]) this.os.version = osMatch[1].replace(/_/g,'.');
		    break;
		  }
		  // $.os.ios
		  if (this.os.iphone || this.os.ipad || this.os.ipod) {
		    this.os.ios = true;
		  }
	
	
		  // $.browser
		  var browserDetect = {
		    wechat: /MicroMessenger\/([\d\.]+)/i,
		    ipadqq: /IPadQQ\/([\d\.]+)/i,
		    mqq: /qq\/([\d\.]+)/i,
		    chrome_1: /CriOS\/([\d\.]+)/i,
		    chrome_2: /Chrome\/([\d\.]+)/i,
		    qzone: /QZONEJSSDK\/([\d\.]+)/i,
		    mqqbrowser: /mqqbrowser\/([\d\.]+)/i,
		    qqbrowser: /[^m]QQBrowser\/([\d\.]+)/i,
		    x5: /tbs\/(\d+)/i,
		    uc: /UCBrowser\/([\d\.]+)/i,
		    safari: /Safari\/([\d\.]+)/i,
		    firefox: /Firefox\/([\d\.]+)/i,
		    ie: /MSIE\s([\d\.]+)/i,
		    weibo: /weibo__([\d\.]+)/i,
		    qqnews: /qqnews\/([\d\.]+)/i,
		    qqlive: /QQLiveBrowser\/([\d\.]+)/i,
		    kuaibao: /qnreading\/([\d\.]+)/i,
		    liebao: /LieBaoFast\/([\d\.]+)/i,
		    douban: /com\.douban\.frodo\/([\d\.]+)/i,
		    miuibrowser: /MiuiBrowser/i,
		    baidu: /baiduboxapp/i,
		    browser360: /360browser/i,
		    oppobrowser: /OppoBrowser/i
		  };
		  var browserMatch;
		  for(var j in browserDetect){
		    browserMatch = browserDetect[j].exec(ua);
		    if (!browserMatch) continue;
		    this.browser[ j.replace(/_\d+/,'') ] = {
		      version: browserMatch[1]
		    };
		  }
		  if (this.os.android && this.browser.safari) delete this.browser.safari;
		  if (this.browser.chrome && this.browser.safari) delete this.browser.safari;
	
	
		  // $.phone
		  var phoneDetect = {
		    ipod: /iPod/i,
		    ipad: /iPad/i,
		    iphone: /iPhone/i,
		    huawei_1: /HUAWEI([\w_-]+)/i,
		    huawei_2: /(CHM-\w+)/i,
		    huawei_3: /(HonorChe)/i,
		    huawei_4: /HONORPLK/i,
		    huawei_5: /(Che\d+-CL\d+)/i,
		    huawei_6: /(H\d+-L\d+)/i,
		    huawei_100: /HUAWEI/i,
		    xiaomi_1: /(HM\sNOTE)/i,
		    xiaomi_2: /(HM\s\w+)/i,
		    xiaomi_3: /(MI\s\w+)/i,
		    xiaomi_4: /(MI-ONE\sPlus)/i,
		    xiaomi_5: /(M1)\sBuild/i,
		    xiaomi_6: /(HM\d+)/i,
		    xiaomi_7: /Xiaomi[\s_]?([\w_]+)/i,
		    samsung_1: /(GT-\w+)/i,
		    samsung_2: /(SCH-\w+)/i,
		    samsung_3: /(SM-\w+)/i,
		    vivo: /vivo\s(\w+)/i,
		    oneplus: /ONEPLUS-([a-z0-9]+)/i,
		    lenovo_1: /Lenovo[\s-]?([\w-]+)/i,
		    lenovo_100: /Lenovo/i,
		    zte_1: /ZTE\s?(\w+)?/i,
		    zte_2: /ZTE/i,
		    coolpad_1: /Coolpad\s(\w+)/i,
		    coolpad_100: /Coolpad/i,
		    oppo_1: /OPPO\s?(\w+)/i,
		    oppo_2: /(R7Plus|R8007|R801|R831S|R8205)/i,
		    oppo_100: /OPPO/i,
		    meizu_1: /(MX\d+)/i,
		    meizu_2: /(m\d+\snote)\sBuild/i,
		    htc_1: /HTC\s?(\w+)/i,
		    htc_100: /HTC/i,
		    tcl: /TCL\s(\w+)/i,
		    lephone: /lephone\s(\w+)/i,
		    lg: /LG[\s-]?(\w+)/i,
		    galaxy: /(galaxy\d+)/,
		    hisense_1: /Hisense/i,
		    hisense_2: /HS-(\w+)/i,
		    philips: /Philips\s?(\w+)?/i,
		    '金立': /(GN\w+)\sBuild/i,
		    sonny: /sonny/i,
		    '天语': /K-Touch/i
		  };
		  var phoneMatch;
		  for(var k in phoneDetect){
		    phoneMatch = phoneDetect[k].exec(ua);
		    if (!phoneMatch) continue;
		    this.phone.name = k.replace(/_\d+/,'')
		    if (phoneMatch[1]) this.phone.version = phoneMatch[1].replace(/^[_-]/ig,'');
		    break;
		  }
		}
		module.exports = uaMatch;
	
	/***/ },
	
	/***/ 83:
	/***/ function(module, exports) {
	
		var list = [];
		var timer;
		var imgObj;
		function report(url) {
		  if (timer) {
		    list.push(url);
		    return;
		  }
		  timer = setTimeout(function(){
		    timeoutHandler();
		  }, 1000);
		  imgObj = document.createElement("img");
		  imgObj.onerror = timeoutHandler;
		  imgObj.src = url;
		}
		function timeoutHandler(){
		  if (list.length===0){
		    imgObj = null;
		    timer = null;
		    return;
		  }
		  clearTimeout(timer);
		  timer = null;
		  report(list.shift());
		}
	
		module.exports = report;
	
	/***/ },
	
	/***/ 84:
	/***/ function(module, exports) {
	
		var publicApi = {
		  'isReady'                 : 'isReady',
		  'play'                    : 'setVideoPlay',
		  'pause'                   : 'setVideoPause',
		  'playNext'                : 'playNext',
		  'stop'                    : 'setVideoStop',
		  'mute'                    : 'setVideoMute',
		  'unMute'                  : 'setVideoUnMute',
		  'volumeUp'                : 'setVideoVolumeUp',
		  'volumeDown'              : 'setVideoVolumeDown',
		  'getVolume'               : 'getVideoVolume',
		  'setVolume'               : 'setVideoVolume',
		  'isMuted'                 : 'isVideoMuted',
		  'setPoster'               : 'setVideoPoster',
		  'getPoster'               : 'getVideoPoster',
		  'getDuration'             : 'getVideoDuration',
		  'getFileSize'             : 'getVideoFileSize',
		  'getCurrentTime'          : 'getVideoCurrentTime',
		  'getDefinition'           : 'getCurrentVideoDefinition',
		  'getDefinitionList'       : 'getVideoDefinitionList',
		  'setDefinition'           : 'setVideoDefinition',
		  'getVideoSize'            : 'getVideoWidthHeight',
		  'seekTo'                  : 'setVideoSeekTo',
		  'resize'                  : 'resize',
		  'autoResize'              : 'autoResize',
		  'getUserId'               : 'getUserId',
		  'getPlayerId'             : 'getPlayerId',
		  'isPlaying'               : 'isVideoPlaying',
		  'getVid'                  : 'getVid',
		  'setNextVid'              : 'setNextVid',
		  'getPlayerState'          : 'getPlayerState',
		  'isBrowserFullscreen'     : 'isBrowserFullscreen',
		  'isWindowFullscreen'      : 'isWindowFullscreen',
		  'enterBrowserFullscreen'  : 'enterBrowserFullscreen',
		  'enterWindowFullscreen'   : 'enterWindowFullscreen',
		  'exitWindowFullscreen'    : 'exitWindowFullscreen',
		  'exitBrowserFullscreen'   : 'exitBrowserFullscreen',
		  'toggleWindowFullScreen'  : 'toggleWindowFullScreen',
		  'toggleBrowserFullScreen' : 'toggleBrowserFullScreen',
		  'smallWindow'             : 'smallWindow',
		  'follow'                  : 'follow',
		  'cancelFollow'            : 'cancelFollow',
		  'isFollow'                : 'isFollow',
		  'resizeFlashForChrome'    : 'resizeFlashForChrome',
		  'getPlaybackRate'         : 'getPlaybackRate',
		  'setPlaybackRate'         : 'setPlaybackRate',
		  'destroy'                 : 'destroy',
		  'getPlayerType'           : 'getPlayerType',
		  'getVideoType'            : 'getVideoType',
		  'setNextEnable'           : 'setNextEnable',
		  'bulletSwitch'            : 'bulletSwitch',
		  'transferMyBullet'        : 'transferMyBullet',
		  'postBullet'              : 'postBullet',
		  'setSmallWindowMode'      : 'setSmallWindowMode',
		  'callPlayerExtendMethod'  : 'callPlayerExtendMethod'
		};
	
		var privateApi = {
		  // core frame
		  'reportError'     : 'reportError',
		  'reportUsrAction' : 'reportUsrAction',
		  'reportGetinfo'   : 'reportGetinfo',
	
		  // HD Player
		  'play'                                 : 'setPlay',
		  'setFocusVideoPlay'                    : 'setFocusVideoPlay',
		  'setFocusVideoPause'                   : 'setFocusVideoPause',
		  'getNextVideoMp4Url'                   : 'getNextVideoMp4Url',
		  'getNextVideoUrlByVid'                 : 'getNextVideoUrlByVid',
		  'isFocusVideoBufferComplete'           : 'isFocusVideoBufferComplete',
		  'setFocusVideoUrl'                     : 'setFocusVideoUrl',
		  'clearFocusVideoUrl'                   : 'clearFocusVideoUrl',
		  'setPreloadVideoUrl'                   : 'setPreloadVideoUrl',
		  'setPreloadVideoPlay'                  : 'setPreloadVideoPlay',
		  'isPreloadVideoUrlInsert'              : 'isPreloadVideoUrlInsert',
		  'setVideoUrl'                          : 'setVideoUrl',
		  'getCurrentPlayListType'               : 'getCurrentPlayListType',
		  'getFocusVideoCurrentTime'             : 'getFocusVideoCurrentTime',
		  'getFocusVideoDuration'                : 'getFocusVideoDuration',
		  'setFocusVideoCurrentTime'             : 'setFocusVideoCurrentTime',
		  'getFocusVideoWidthHeight'             : 'getFocusVideoWidthHeight',
		  'getPlayerConfig'                      : 'getPlayerConfig',
		  'isSkipPrelude'                        : 'isSkipPrelude',
		  'addUrls2Player'                       : 'addUrls2Player',
		  'lockAndPreloadNext'                   : 'lockAndPreloadNext',
		  'getVideoInfoData'                     : 'getVideoInfoData',
		  'clearPlaylist'                        : 'clearPlaylist',
		  'getPlayListIndex'                     : 'getPlayListIndex',
		  'isTheLastOfPlayList'                  : 'isTheLastOfPlayList',
		  'getVideosOriginData'                  : 'getVideosOriginData',
		  'getDefinitionFormat'                  : 'getDefinitionFormat',
		  'getRequestId'                         : 'getRequestId',
		  'calcTotalPlaylist'                    : 'calcTotalPlaylist',
		  'getFocusVideoBufferedTime'            : 'getFocusVideoBufferedTime',
		  'getBufferedTime'                      : 'getBufferedTime',
		  'setPreloadVideoKeepSpaceToFocusVideo' : 'setPreloadVideoKeepSpaceToFocusVideo',
		  'playTheNext'                          : 'playTheNext',
		  'destroyPlugin'                        : 'destroyPlugin',
		  'getConnectionPlayTime'                : 'getConnectionPlayTime',
		  'isVideoSeeking'                       : 'isVideoSeeking',
		  'isFocusVideoSeeking'                  : 'isFocusVideoSeeking',
	
		  // H5 Player
		  'videoRequestFullScreen':'videoRequestFullScreen',
	
		  // 广告相关
		  'loadingAdEnd'      : 'loadingAdEnd',
		  'isPlayingAd'       : 'isPlayingAd',
		  'getAdCurrentTime'  : 'getAdCurrentTime',
		  'getAdDuration'     : 'getAdDuration',
		  'getCurrentAdInfo'  : 'getCurrentAdInfo',
		  'isAdCanNotSkip'    : 'isAdCanNotSkip',
		  'pauseAd'           : 'pauseAd',
		  'playAd'            : 'playAd',
		  'requestLoadingAd'  : 'requestLoadingAd',
		  'requestPauseAd'    : 'requestPauseAd',
		  'hasLoadingAd'      : 'hasLoadingAd',
		  'getPlayAdJsonData' : 'getPlayAdJsonData',
		  'skipAd'            : 'skipAd',
		  'hidePlayAdUI'      : 'hidePlayAdUI',
	
		  // UI-控制栏
		  'hideUiControl'              : 'hideUiControl',
		  'hideUiTitle'                : 'hideUiTitle',
		  'hideUiFavorite'             : 'hideUiFavorite',
		  'showUiControl'              : 'showUiControl',
		  'showUiFavorite'             : 'showUiFavorite',
		  'updateVideoPreview'         : 'updateVideoPreview',
		  'showVideoPreview'           : 'showVideoPreview',
		  'hideVideoPreview'           : 'hideVideoPreview',
		  'hideUiTitle'                : 'hideUiTitle',
		  'showUiTitle'                : 'showUiTitle',
		  'disableHideControl'         : 'disableHideControl',
		  'showPlayerUiTools'          : 'showPlayerUiTools',
		  'hidePlayerUiTools'          : 'hidePlayerUiTools',
		  'togglePlayerUiTools'        : 'togglePlayerUiTools',
		  'showUiTips'                 : 'showUiTips',
		  'hideUiTips'                 : 'hideUiTips',
		  'getHistoryDefinition'       : 'getHistoryDefinition',
		  'showErrorUiTips'            : 'showErrorUiTips',
		  'openAtTencentVideo'         : 'openAtTencentVideo',
		  'disableShowControl'         : 'disableShowControl',
		  'hideUiSettingLayerOnMobile' : 'hideUiSettingLayerOnMobile',
		  'isControlShow'              : 'isControlShow',
	
		  // flash
		  'isFlashNeedResize'          : 'isFlashNeedResize',
		  'isUserOpenBullet'           : 'isUserOpenBullet',
		  'isServerOpenBullet'         : 'isServerOpenBullet',
		  'isShowBulletInput'          : 'isShowBulletInput',
		  'getBulletLikeNumber'        : 'getBulletLikeNumber',
		  'isBulletOpenDefault'        : 'isBulletOpenDefault',
		  'getFlashBulletSwitchStatus' : 'getFlashBulletSwitchStatus',
	
		  // Tizen
		  'getTizenTVApi':'getTizenTVApi'
	
		};
	
		var eventApi = {
		  // 播放相关
		  'onWrite'                 : 'write',
		  'onReady'                 : 'ready',
		  'onEnded'                 : 'ended',
		  'onPlaying'               : 'playing',
		  'onPlay'                  : 'play',
		  'onPause'                 : 'pause',
		  'onResume'                : 'resume',
		  'onError'                 : 'error',
		  'onWaiting'               : 'waiting',
		  'onVolumeChange'          : 'volumeChange',
		  'onTimeUpdate'            : 'timeupdate',
		  'onSectionCanplay'        : 'sectionCanplay',
		  'onSectionLoadstart'      : 'sectionLoadstart',
		  'onSectionSeeking'        : 'sectionSeeking',
		  'onSectionSeeked'         : 'sectionSeeked',
		  'onSectionPlay'           : 'sectionPlay',
		  'onSectionPlaying'        : 'sectionPlaying',
		  'onSectionWaiting'        : 'sectionWaiting',
		  'onSectionPause'          : 'sectionPause',
		  'onSectionTimeupdate'     : 'sectionTimeupdate',
		  'onSectionProgress'       : 'sectionProgress',
		  'onSectionEnded'          : 'sectionEnded',
		  'onSectionBufferEnd'      : 'sectionBufferEnd',
		  'onGetVideoUrlSuccess'    : 'getVideoUrlSuccess',
		  'onGetVideoUrlFail'       : 'getVideoUrlFail',
		  'onPlayStateChange'       : 'playStateChange',
		  'onDefinitionChange'      : 'definitionChange',
		  'onVidChange'             : 'vidChange',
		  'onSetDefinitionStart'    : 'setDefinitionStart',
		  'onSetDefinitionDone'     : 'onSetDefinitionDone',
		  'onSetDefinitionFail'     : 'setDefinitionFail',
		  'onPreloadListChange'     : 'preloadListChange',
		  'onGetinfoStart'          : 'getinfoStart',
		  'onGetinfoEnded'          : 'getinfoEnded',
		  'onGetvkeyEnded'          : 'getvkeyEnded',
		  'onGetvkeyStart'          : 'getvkeyStart',
		  'onSeekStart'             : 'seekStart',
		  'onSeekEnded'             : 'seekEnded',
		  'onPlayStart'             : 'playStart',
		  'onUserPausePlayer'       : 'userPausePlayer',
		  'onNetworkBadStart'       : 'networkBadStart',
		  'onNetworkBadEnd'         : 'networkBadEnd',
		  'onPlaybackRateChange'    : 'playbackRateChange',
		  'onVideoInterruptByError' : 'videoInterruptByError',
		  'beforeVideoPlay'         : 'beforeVideoPlay',
	
		  // 广告相关
		  'onLoadingAdDataReady'    : 'loadingAdDataReady',
		  'onEndingAdDataReady'     : 'endingAdDataReady',
		  'onPauseAdDataReady'      : 'pauseAdDataReady',
		  'onLoadingadIsEmpty'      : 'loadingadIsEmpty',
		  'onInsertAdDataReady'     : 'insertAdDataReady',
		  'onInsertAdEnded'         : 'insertAdEnded',
		  'onInsertAdStart'         : 'insertAdStart',
		  'onLoadingAdEnded'        : 'loadingAdEnded',
		  'onLoadingAdStart'        : 'loadingAdStart',
		  'onLoadingAdRequestError' : 'onLoadingAdRequestError',
		  'onLoadingAdPlayError'    : 'onLoadingAdPlayError',
		  'onOpenAdLink'            : 'openAdLink',
		  'onPuaseAdShow'           : 'puaseAdShow',
		  'onAdStart'               : 'adStart',
		  'onAdEnd'                 : 'adEnd',
	
		  // UI相关
		  'onToggleSideBar'           : 'toggleSideBarBtnClick',
		  'onWindowFullscreenChange'  : 'windowFullscreenChange',
		  'onBrowserFullscreenChange' : 'browserFullscreenChange',
		  'onFollow'                  : 'userDoFollow',
		  'onCancelFollow'            : 'userCancelFollow',
		  'onClickCloseLight'         : 'clickCloseLight',
		  'onBeforePlayNext'          : 'beforePlayNext',
		  'showUIVipGuide'            : 'showUIVipGuide',
		  'onToggleHotBarrage'        : 'toggleHotBarrage',
		  'onShowLogin'               : 'showLogin',
		  'onAfterLogin'              : 'afterLogin',
		  'onAfterLogout'             : 'afterLogout',
	
		  // Tizen
		  'onTizenLoadingAdEnded' : 'tizenLoadingAdEnded',
		  'onTizenLoadingIsEmpty' : 'tizenLoadingIsEmpty',
		  'onTizenLoadingOnError' : 'tizenLoadingOnError',
	
		  // Flash
		  'onBulletReady'                 : 'bulletReady',
		  'onBulletLikeNumberUpdate'      : 'bulletLikeNumberUpdate',
		  'onFlashBulletSwitchStatusChange' : 'flashBulletSwitchStatusChange'
		};
	
		// 检查EventName是否重复
		var tmp = {},key, showError = function(msg){
		  if (window.Txplayer && Txplayer.util && Txplayer.util.error) Txplayer.error(msg);
		  else throw msg;
		}
		for (key in publicApi) {
		  if ( tmp.hasOwnProperty(publicApi[key]) ) showError('EventName is already exist:' + publicApi[key]);
		  tmp[publicApi[key]] = null;
		}
		for (key in privateApi) {
		  if ( tmp.hasOwnProperty(privateApi[key]) ) showError('EventName is already exist:' + privateApi[key]);
		  tmp[privateApi[key]] = null;
		}
		for (key in eventApi) {
		  if ( tmp.hasOwnProperty(eventApi[key]) ) showError('EventName is already exist:' + eventApi[key]);
		  tmp[eventApi[key]] = null;
		}
		tmp = showError = null;
	
		module.exports = {
		  publicApi: publicApi,
		  privateApi: privateApi,
		  eventApi: eventApi
		};
	
	/***/ },
	
	/***/ 85:
	/***/ function(module, exports) {
	
		/**
		 * @fileOverview 统一播放器全局工具函数
		 * @author zoborzhang
		 */
	
		/**
		 * @constructor
		 * @type {Object}
		 */
		var dataset = {};
		var util = {
		  /**
		   * 抛出错误
		   * @param  {String} msg 消息内容
		   * @return {Object}     Error对象
		   */
		  error: function(msg) {
		    if (!window.console) return;
		    if (!window.console.error) return;
		    try{
		      throw msg;
		    }catch(e){
		      window.console.error(msg);
		    }
		  },
		  log: function(){
		    if (!window.console) return;
		    if (!window.console.log) return;
		    if (Txplayer && Txplayer.dataset && Txplayer.dataset.debug && window.console.log.apply){
		      window.console.log.apply(window.console, arguments);
		    }
		  },
		  showInfo: function(info, data){
		    if (!window.console) return;
		    if (!window.console.log) return;
		    if (typeof data ==='object') data = JSON.stringify(data);
		    util.log('%c'+info+': %c \t\t'+data,'background: gray;color:#fff;', 'color:green;');
		  },
		  showError: function(info, data){
		    if (!window.console) return;
		    if (!window.console.log) return;
		    util.log('%c'+info+': %c '+data,'background: red;color:#fff;', 'color: red;');
		  },
		  cookie: {
		    /**
		     * 设置一个cookie
		     * @param {String} name   cookie名称
		     * @param {String} value  cookie值
		     * @param {String} domain 所在域名 默认为window.location.host的值
		     * @param {String} path   所在路径 默认为是"\"
		     * @param {Number} hour   存活时间，单位:小时
		     * @return {Boolean} 是否成功
		     */
		    set: function(name, value, domain, path, hour) {
		      if (hour) {
		        var today = new Date();
		        var expire = new Date();
		        expire.setTime(today.getTime() + 3600000 * hour);
		      }
		      document.cookie = name + "=" + value + "; " + (hour ? ("expires=" + expire.toGMTString() + "; ") : "") + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + window.location.host + ";"));
		      return true;
		    },
	
		    /**
		     * 获取指定名称的cookie值
		     * @param {String} name cookie名称
		     * @return {String} 获取到的cookie值
		     */
		    get: function(name) {
		      var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)");
		      var m = document.cookie.match(r);
		      return (!m ? "" : m[1]);
		    },
	
		    /**
		     * 删除指定cookie,复写为过期
		     *
		     * @param {String} name cookie名称
		     * @param {String} domain 所在域 默认为 window.location.host的值
		     * @param {String} path 所在路径 默认为是"\"
		     */
		    del: function(name, domain, path) {
		      var exp = new Date();
		      exp.setTime(exp.getTime() - 1);
		      document.cookie = name + "=; expires=" + exp.toGMTString() + ";" + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + window.location.host + ";"));
		    }
		  },
		  /**
		   * 对象数据转换成字符串
		   * @param  {Object} obj 数据对象
		   * @return {String}     转换的结果
		   */
		  object2string: function(obj, combine) {
		    combine = typeof combine !== 'undefined' ? combine : '&';
		    var data = [];
		    for (var i in obj) {
		      data.push(i + '=' + obj[i]);
		    }
		    return data.join(combine);
		  },
		  /**
		   * url后面追加参数
		   * @param  {String} url url
		   * @param  {Object} obj 参数对象
		   * @return {String}     拼接后的url
		   */
		  appendParamsToUrl: function(url, obj) {
		    if (url.indexOf('?') > -1) {
		      url += '&' + util.object2string(obj);
		    } else {
		      url += '?' + util.object2string(obj);
		    }
		    return url;
		  },
		  removeUrlParams: function(url){
		    if (typeof url!=='string') return;
		    var link = document.createElement('a');
		    link.href = url;
		    return link.protocol + '//' + link.host + link.pathname;
		  },
		  /**
		   * 通过url加载css
		   * @param  {String} url css地址
		   */
		  loadCss: function(url) {
		    var defer = Txplayer.$.Deferred();
		    var tryTimes = 1, hasLoadCss = false;
		    // 加载css，如果失败在重试2次
		    var requestCss = function(cssUrl){
		      var style = document.createElement('link');
		      style.rel = 'stylesheet';
		      style.type = 'text/css';
		      style.onload = function(){
		        defer.resolve();
		      };
		      style.onerror = function(){
		        if (tryTimes>=3){
		          defer.reject();
		          return;
		        }
		        tryTimes++;
		        style.parentNode.removeChild(style);
		        var config = {};
		        config['__t' + tryTimes] = +new Date();
		        requestCss( util.appendParamsToUrl(cssUrl, config) );
		      };
		      style.href = cssUrl;
		      document.head.appendChild(style);
		    };
		    var cssRealUrl = util.removeUrlParams(url);
		    Txplayer.$('link[rel="stylesheet"]').each(function(idx, item){
		      var href = item.href;
		      if (href && href.indexOf(cssRealUrl)>-1) {
		        hasLoadCss = true;
		        return false;
		      }
		    });
		    if (!hasLoadCss){
		      url = util.appendParamsToUrl(url, {
		        '_': (window.Txplayer&&Txplayer.dataset.ts) || (+new Date())
		      });
		      requestCss(url);
		    }else{
		      defer.resolve();
		    }
		    return defer;
		  },
		  /**
		   * 获取点播默认封面图
		   * @param {String} vid 点播视频vid
		   */
		  getDefaultPosterByVid: function(vid) {
		    var sizeArr = ['496_280'],
		      url = 'http://shp.qpic.cn/qqvideo_ori/0/{vid}_{index}/0';
		    return url.replace('{vid}', vid).replace('{index}', sizeArr[0]);
		  },
		  /**
		   * 获取直播默认封面图
		   */
		  loadScript: function(src) {
		    var script = document.createElement('script'),
		      head = document.getElementsByTagName("head")[0],
		      READY_STATE_RE = /^(?:loaded|complete|undefined)$/;
		    var defer;
	
		    if (!src) return;
		    if (Txplayer.dataset.loadScriptDefer[src]){
		      return Txplayer.dataset.loadScriptDefer[src];
		    }
		    defer = Txplayer.$.Deferred();
		    Txplayer.dataset.loadScriptDefer[src] = defer;
	
		    script.async = "async";
		    script.src = src;
		    script.charset = 'utf-8';
		    script.setAttribute('crossorigin','');
		    script.onload = script.onerror = script.onreadystatechange = function() {
		      if (READY_STATE_RE.test(script.readyState)) {
		        // Ensure only run once and handle memory leak in IE
		        script.onload = script.onerror = script.onreadystatechange = null;
		        // Dereference the script
		        script = null;
		        defer.resolve();
		      }
		    };
		    script.onerror = function() {
		      script.onload = script.onerror = script.onreadystatechange = null;
		      script = null;
		      defer.reject();
		    };
		    head.appendChild(script);
		    return defer;
		  },
		  getFlashVersion: function(){
		    var vflash = Txplayer.dataset.flashVersion;
		    if (vflash != "0.0.0") {
		      return vflash;
		    }
		    var swf = null,
		      ab = null,
		      ag = [],
		      S = "Shockwave Flash",
		      t = navigator,
		      q = "application/x-shockwave-flash";
		    if (!!Txplayer.util.browser.ie) {
		      try {
		        swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
		        if (swf) {
		          ab = swf.GetVariable("$version");
		          if (ab) {
		            ab = ab.split(" ")[1].split(",");
		            ag = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)];
		          }
		        }
		      } catch (err) {}
		    } else if (typeof t.plugins!=='undefined' && typeof t.plugins[S] == "object") {
		      ab = t.plugins[S].description;
		      if (ab && !(typeof t.mimeTypes==='undefined' && t.mimeTypes[q] && !t.mimeTypes[q].enabledPlugin)) {
		        ab = ab.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
		        ag[0] = parseInt(ab.replace(/^(.*)\..*$/, "$1"), 10);
		        ag[1] = parseInt(ab.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
		        ag[2] = /[a-zA-Z]/.test(ab) ? parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0;
		      }
		    }
		    vflash = ag.join(".");
		    return vflash;
		  },
		  /**
		   * 对比版本号
		   * @param  {String} n
		   * @param  {String} k
		   * @return {Number}   1:n>k, 0:n=k, -1:n<k
		   */
		  compareVersion: function(n, k) {
		    n = String(n).split(".");
		    k = String(k).split(".");
		    try {
		      for (var o = 0, j = Math.max(n.length, k.length); o < j; o++) {
		        var m = isFinite(n[o]) && Number(n[o]) || 0,
		          p = isFinite(k[o]) && Number(k[o]) || 0;
		        if (m < p) {
		          return -1;
		        } else {
		          if (m > p) {
		            return 1;
		          }
		        }
		      }
		    } catch (q) {
		      return -1;
		    }
		    return 0;
		  },
		  /**
		   * 判断Flash是否合适
		   * @return {Boolean}
		   */
		  isFlashFit: function(){
		    if (this.compareVersion(this.getFlashVersion(), '10.0')>-1) {
		      return true;
		    }
		    return false;
		  },
		  getJsonpCallbackName: function(cgiName){
		    return [
		      'txplayerJsonpCallBack',
		      cgiName,
		      parseInt(Math.random()*1000000)
		    ].join('_');
		  },
		  getStdfrom: function(){
		    var isInews = location.hostname === 'view.inews.qq.com';
		    var isCaixin = location.hostname.indexOf('caixin.com')>-1;
		    if ( isCaixin ) {
		      return 'v1093';
		    }
		    if (Txplayer.util.os.iphone || Txplayer.util.os.ipod) {
		      return isInews ? "v3110" : "v3010";
		    }
	
		    if (Txplayer.util.os.ipad) {
		      return isInews ? "v4110" : "v4010";
		    }
		    if (Txplayer.util.os.android) {
		      if (Txplayer.util.os.tablet) {
		        return "v6010";
		      }
		      return isInews ? "v5110" : "v5010";
		    }
		    if (Txplayer.util.browser.IEMobile) {
		      return "v7010";
		    }
		    return "v1010";
		  },
		  getDeviceId: function(){
		    var ua = navigator.userAgent;
		    if (util.os.ipad) return 1;
		    if (util.os.windows) {
		      //windows pad userAgent like this: Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; WOW64; Trident/6.0; Touch)
		      if (/Touch/i.test(ua)) return 8;
		      //windows phone userAgent like this:
		      //Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)
		      if (/Phone/i.test(ua)) return 7;
		      return 2;
		    }
		    if (util.os.android) {
		      if (!util.mobile) return 5;
		      return 3;
		    }
		    if (util.os.iphone) return 4;
		    if (util.os.mac) return 9;
	
		    //未知设备
		    return 10;
		  },
		  getBusinessId: function(){
		    //任何页面只要是在微信里打开，都算到微信的头上
		    if ( !! util.browser.wechat) {
		      return 6;
		    }
	
		    if ( !! util.browser.mqq) {
		      return 17;
		    }
	
		    var host = "";
		    //如果是使用的统一播放器iframe版本，则需要获取顶部的url，由于可能跨域所以从referrer里取
		    //被iframe的页面的referrer是其父页面的url
		    if (document.location.href.indexOf("http://v.qq.com/iframe/") >= 0 && window != top) {
		      var l = document.referrer;
		      if (l !== "") {
		        var link = document.createElement("a");
		        link.href = l;
		        host = link.hostname;
		        link = null;
		      }
		    }
		    if (host === "") {
		      host = document.location.hostname || document.location.host;
		    }
		    var keys = [{
		        r: /(\w+\.)?weixin\.qq\.com$/i,
		        v: 6
		      },
		      //腾讯视频
		      {
		        r: /^(v|film)\.qq\.com$/i,
		        v: 1
		      },
		      //腾讯新闻
		      {
		        r: /^news\.qq\.com$/i,
		        v: 2
		      },
		      //Qzone
		      {
		        r: /(\w+\.)?qzone\.qq\.com$/i,
		        v: 3
		      },
		      //腾讯微博
		      {
		        r: /(\w+\.)?t\.qq\.com$/i,
		        v: 5
		      },
		      //3g.v.qq.com
		      {
		        r: /^3g\.v\.qq\.com$/i,
		        v: 8
		      },
		      //m.v.qq.com
		      {
		        r: /^m\.v\.qq\.com$/i,
		        v: 10
		      },
		      //*.3g.qq.com
		      {
		        r: /3g\.qq\.com$/i,
		        v: 12
		      }
		    ];
		    host = host.toLowerCase();
		    for (var i = 0, len = keys.length; i < len; i++) {
		      var key = keys[i];
		      if (key.r.test(host)) {
		        return key.v;
		      }
		    }
		    return 7; //7表示其他，固定值
		  },
		  getPlatform: function() {
		    //编号方式  业务编号×10000+设备编号×100+播放方式
		    var bussId = util.getBusinessId(),
		      deviceId = util.getDeviceId();
		    return bussId * 10000 + deviceId * 100 + 1; //播放方式 1表示HTML5，写死
		  },
		  isQQBuLuoHost: function(){
		    if( Txplayer.util.browser.MQQClient &&
		        ( window.location.hostname==='xiaoqu.qq.com' || window.location.hostname==='buluo.qq.com')
		    ){
		      return true;
		    }
		    return false;
		  },
		  /**
		   * 获取手机上视频的视频截图
		   * @param  {String} vid
		   * @param  {Number} index 0,1,2
		   * @return {String}       视频截图url
		   */
		  getMobileVideoPosterByVid: function(vid,index){
		    index = index || 2;
		    var sizeArr = ['496_280', '360_204', '228_128'],
		      url = '//shp.qpic.cn/qqvideo_ori/0/{vid}_{index}/0';
		    if (index >= sizeArr.length) index = sizeArr.length-1;
		    return url.replace('{vid}',vid).replace('{index}',sizeArr[index]);
		  },
		  /**
		   * 获取PC上视频的视频截图
		   * @param  {String} vid
		   * @param  {String} type .png|.jpg
		   * @return {String}      视频截图url
		   */
		  getPcVideoPosterByVid: function(vid, type){
		    type = type || '.png';
		    if(!vid) return "";
		    var url = "//vpic.video.qq.com/" + get_vpic_hash(vid) + "/" + vid + type;
		    function get_vpic_hash(vid){
		      var hash_bucket = 10000 * 10000;
		      var tot = 0;
		      for (var i = 0; i < vid.length; i++) tot = (tot << 5) + tot + vid.charCodeAt(i);
		      return tot % hash_bucket;
		    }
		    return url;
		  },
		  getHostNameByUrl: function(url){
		    url = url || location.href;
		    var a = document.createElement('a');
		    a.href = url;
		    return a.hostname;
		  },
		  getQQFromCookie: function(){
		    var uin = util.cookie.get('luin') || util.cookie.get('uin');
		    if (uin) uin = uin.replace(/\D/g, '');
		    return uin;
		  },
		  createGUID: function(len) {
		    len = len || 32;
		    var guid = "";
		    for (var i = 1; i <= len; i++) {
		      var n = Math.floor(Math.random() * 16.0).toString(16);
		      guid += n;
		    }
		    return guid;
		  },
		  filterXSS: function(str) {
		    if (typeof str !== 'string')
		      return str;
		    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&apos;");
		  },
		  getData: function(name) {
		    if (window.localStorage) {
		      return window.localStorage[name];
		    }
		  },
		  setData: function(name, value) {
		    if (window.localStorage) {
		      window.localStorage[name] = value;
		      return true;
		    }
		  },
		  delData: function(name) {
		    if (window.localStorage) {
		      window.localStorage.removeItem(name);
		      return true;
		    }
		  },
		  isSupportM3u8: function(){
		    var video = document.createElement("video");
		    var list = [
		      'application/x-mpegURL',
		      'audio/mpegurl',
		      'vnd.apple.mpegURL',
		      'application/vnd.apple.mpegURL'
		    ];
		    var rs = false;
		    if (typeof video.canPlayType == "function") {
		      for(var i =0, len = list.length; i<len; i++){
		        if (video.canPlayType( list[i] )) {
		          rs = true;
		          break;
		        }
		      }
		    }
		    video = null;
		    return rs;
		  },
		  isSupportMP4: function() {
		    var video = document.createElement("video");
		    if (typeof video.canPlayType == "function") {
		      //MP4
		      if (video.canPlayType('video/mp4; codecs="mp4v.20.8"') == "probably") {
		        return true;
		      }
		      //H.264
		      if (video.canPlayType('video/mp4; codecs="avc1.42E01E"') == "probably" || video.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"') == "probably") {
		        return true;
		      }
		    }
		    return false;
		  },
		  isSupportSVG: function() {
		    if (!document.implementation || !Txplayer.$.isFunction(document.implementation.hasFeature)) {
		      return false;
		    }
		    return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
		  },
		  isSupportMute: function(){
		    if (Txplayer.util.os) return false;
		    if (Txplayer.util.mobile) return false;
		    return true;
		  },
		  getDomNodeOffsetInPage: function(elm){
		    var x = elm.offsetLeft, y = elm.offsetTop, p = elm.offsetParent;
		    while (p !== null) {
		      x += p.offsetLeft;
		      y += p.offsetTop;
		      p = p.offsetParent;
		    }
		    return {x: x,y: y};
		  },
		  whenWechatIsReady: function(options){
		    var defer = Txplayer.$.Deferred(), timeout = options.timeout || 5000;
		    if (!Txplayer.ua.browser.wechat) {
		    }else if (typeof WeixinJSBridge != "undefined" && WeixinJSBridge.on) {
		      defer.resolve();
		    } else {
		      document.addEventListener('WeixinJSBridgeReady', function() {
		        defer.resolve();
		      });
		      setTimeout(function(){
		        defer.reject();
		      }, timeout);
		    }
		    return defer;
		  },
		  getMainHostName: function() {
		    var _host = window.location.hostname || window.location.host,
		      _sarray = location.host.split(".");
		    if (_sarray.length > 1) {
		      _host = _sarray.slice(_sarray.length - 2).join(".");
		    }
		    return _host;
		  },
		  getUrlParam: function(p, u) {
		    u = u || document.location.toString();
		    var reg = new RegExp("(^|&|\\\\?)" + p + "=([^&]*)(&|$|#)"),
		      r = null;
		    r = u.match(reg);
		    if (r) {
		      return r[2];
		    }
		    return "";
		  },
		  getAdChannelId: function(){
		    var chid = '';
		    if((/(.*\.)3g\.qq\.com$/i).test(document.location.hostname)) chid = 13;
		    else if(document.location.hostname==='v.qq.com' || util.browser.qqlive) chid=0;
		    else if(util.browser.wechat) chid=3;
		    else if(util.browser.mqq) chid=10;
		    else if(util.browser.qqnews) chid=2;
		    return chid;
		  },
		  insert2Array: function(list, index, arr){
		    if (index>=arr.length) return arr;
		    var m = arr.slice(0,index), n = arr.slice(index, arr.length);
		    var c = [];
		    c=c.concat(m,list,n);
		    return c;
		  },
		  formatPlayTime: function(time){
		    if (typeof time==='string') time = parseInt(time);
		    if (typeof time!=='number') return;
		    time = parseInt(time);
		    var h, m ,s;
		    var formatZero = function(num){
		      if (num<10) return '0' + num;
		      else return num;
		    };
		    h = parseInt(time/3600);
		    m = parseInt( (time - h*3600)/60 );
		    s = parseInt( time - h*3600 - m*60 );
		    if (h===0) {
		      return [formatZero(m),formatZero(s)].join(':');
		    }else{
		      return [h,formatZero(m),formatZero(s)].join(':');
		    }
		  },
		  dateFormat: function(fmt, time){
		    time = time || new Date();
		    fmt = fmt || 'yyyy-MM-dd hh:mm:ss';
		    var o = {
		      "M+": time.getMonth() + 1, //月份
		      "d+": time.getDate(), //日
		      "h+": time.getHours(), //小时
		      "m+": time.getMinutes(), //分
		      "s+": time.getSeconds(), //秒
		      "q+": Math.floor((time.getMonth() + 3) / 3), //季度
		      "S": time.getMilliseconds() //毫秒
		    };
		    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
		    for (var k in o)
		    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		    return fmt;
		  },
		  isTencentDomain: function(domain){
		    domain = domain || document.domain;
		    if (domain==='qq.com') return true;
		    var arr = domain.split('.');
		    if ( !(arr && arr.length>2) ) return false;
		    if ( arr[arr.length-2] === 'qq' && arr[arr.length-1]==='com') return true;
		    else return false;
		  },
		  loadPlugins: function(plugins, context, settings, callback){
		    settings = settings || {};
		    callback = callback || function(){};
		    if (Txplayer.$.type(plugins)!=='array') {
		      util.showError('loadPlugins error', 'plugins的参数应该是数组');
		      return;
		    }
		    if (!context) {
		      util.showError('loadPlugins error', 'context是必要参数');
		      return;
		    }
		    var _plugins = plugins.slice(0);
		    var that = this;
		    var defer;
		    loadPluginsOneByOne();
		    // 按顺序加载插件
		    function loadPluginsOneByOne () {
		      if (_plugins.length===0) {
		        callback();
		        return;
		      }
		      var plugin = _plugins.shift(), url, pluginName, retryTimes = 0;
		      pluginName = plugin;
		      if (settings && settings.hasOwnProperty(pluginName) && settings[pluginName].url){
		        url = settings[pluginName].url;
		      }
		      if (!url) {
		        url = Txplayer.dataset.jsBasePath + 'plugins/' + pluginName.toLowerCase() + '.js';
		      }
		      // 如果插件已经加载，就可以直接初始化了
		      if (Txplayer.plugins.hasOwnProperty(pluginName)) {
		        execPluginSync(pluginName);
		      }else{
		        loadScriptAndExcute();
		      }
		      // 加载并初始化插件
		      function loadScriptAndExcute(){
		        var onSuccess = function(){
		          execPluginSync(pluginName);
		        };
		        var onFail = function(){
		          // 失败了就重试一次吧
		          if (retryTimes>=1) {
		            util.showError('plugin load failed', url);
		            loadPluginsOneByOne();
		            return;
		          }
		          retryTimes ++;
		          loadScriptAndExcute();
		        };
		        // 加载插件并初始化
		        if (url.indexOf('?')>-1){
		          url += '&_ts=' + Txplayer.dataset.ts;
		        }else{
		          url += '?_ts=' + Txplayer.dataset.ts;
		        }
		        // util.loadScript(url, onSuccess, onFail);
		        util.loadScript(url).done(onSuccess).fail(onFail);
		      }
		    }
	
		    // 等插件初始化完成，再去加载下一个
		    function execPluginSync(pluginName){
		      defer = pluginExcute(pluginName);
		      if (defer && defer.done && defer.fail){
		        defer.done(function(){
		          loadPluginsOneByOne();
		        });
		      }else{
		        loadPluginsOneByOne();
		      }
		    }
	
		    // 插件初始化
		    function pluginExcute(pluginName) {
		      var msg, errMsg;
		      if (!Txplayer.plugins.hasOwnProperty(pluginName)) return false;
		      if (settings[pluginName]) {
		        context.pluginConfig = settings[pluginName];
		      }else{
		        context.pluginConfig = {};
		      }
		      // util.showInfo('插件初始化', pluginName);
		      try{
		        that['_' + pluginName] = new Txplayer.plugins[pluginName](context);
		      }catch(e){
		        errMsg = e.message;
		        util.showError('JS有异常:' + pluginName , errMsg);
		        util.log(e.stack);
		        msg = context.superMsg || context.msg;
		        msg.broadcast &&
		        msg.broadcast(Txplayer.apiList.privateApi.reportError, {
		          msg: errMsg,
		          code: '3000',
		          stack: e.stack
		        });
		      }
		      // 销毁机制
		      if ('HtmlFrame'!==pluginName){
		        (function(pluginInstance, pluginName, player){
		          if (!pluginInstance) return;
		          pluginInstance.addDestroyToPlugin = function(){
		            var eventMsg = this.context.superMsg || this.context.msg;
		            eventMsg.on(Txplayer.apiList.privateApi.destroyPlugin, function(data, options){
		              if (data && data!==pluginName) return;
		              // 清理html
		              if (Txplayer.$.type(pluginInstance.remove)==='function'){
		                pluginInstance.remove();
		              }
		              // 清理内部消息
		              if (pluginInstance &&
		                pluginInstance.dataset &&
		                (pluginInstance.dataset.mudoleApis ||
		                 pluginInstance.dataset.privateApis ||
		                 pluginInstance.dataset.eventsList)
		              ){
		                pluginInstance.dataset.mudoleApis && Txplayer.$.each(pluginInstance.dataset.mudoleApis, function(key, fn){
		                  eventMsg.off(key);
		                });
		                pluginInstance.dataset.privateApis && Txplayer.$.each(pluginInstance.dataset.privateApis, function(key, fn){
		                  eventMsg.off(key);
		                });
		                pluginInstance.dataset.eventsList && Txplayer.$.each(pluginInstance.dataset.eventsList, function(key, fn){
		                  eventMsg.off(key);
		                });
		              }
		              // 清理定时器
		              if (pluginInstance && pluginInstance.dataset){
		                Txplayer.$.each(pluginInstance.dataset, function(key, val){
		                  if ( !(/_TIMER/.test(key) && val) ) return;
		                  clearInterval(val);
		                  clearTimeout(val);
		                });
		              }
		              // 清理子对象
		              Txplayer.$.each(pluginInstance, function(idx, val){
		                val = null;
		              });
		              // 清理插件引用
		              player[pluginName] = null;
		              delete player[pluginName];
		            });
		          };
		          pluginInstance.addDestroyToPlugin();
		        })(that['_' + pluginName], pluginName, that);
		      }
		      return that['_' + pluginName];
		    }
		  },
		  getUniqueMsgKey: function(key){
		    return key + '.' + util.createGUID();
		  },
		  /**
		   * 根据skey计算出hashcode
		   *
		   * @param {string}
		   *          skey
		   * @return {string}
		   */
		  time33: function(skey) {
		    // 哈希time33算法
		    for (var i = 0, len = skey.length, hash = 5381; i < len; ++i) {
		      hash += (hash << 5) + skey.charAt(i).charCodeAt();
		    };
		    return hash & 0x7fffffff;
		  },
		  /**
		   * 获取CSRF 的 token
		   *
		   * @return {String}
		   */
		  getToken: function() {
		    var skey = Txplayer.$.trim(util.cookie.get("skey")) || Txplayer.$.trim(util.cookie.get("lskey")),
		      token = !!skey ? util.time33(skey) : "";
		    return token;
		  },
		  getWXToken: function() {
		    var vu = Txplayer.$.trim(util.cookie.get("vusession")),
		      token = !!vu ? util.time33(vu) : "";
		    return token;
		  }
		};
		module.exports = util;
	
	/***/ },
	
	/***/ 86:
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * @fileOverview 统一播放器默认配置
		 * @author zoborzhang
		 */
		/**
		 * @constructor
		 * @type {Object}
		 */
		var util = __webpack_require__(85);
		var defaultConfig = {
		  /**
		   * 正片是否自动播放
		   * @type {Boolean}
		   */
		  autoplay: false,
		  /**
		   * 播放器类型
		   * @type {String}
		   */
		  playerType: '',
		  /**
		   * 视频类型
		   * @type {String} vod:点播，live:直播
		   */
		  videoType: 'vod',
		  /**
		   * 点播视频ID
		   * @type {String}
		   */
		  vid: '',
		  /**
		   * 点播视频专辑ID
		   * @type {String}
		   */
		  coverId: '',
		  /**
		   * 播放器DOM容器id
		   * @type {String}
		   */
		  containerId: '',
		  /**
		   * 播放器的宽度
		   * @type {String}
		   */
		  width: '0',
		  /**
		   * 播放器的高度
		   * @type {String}
		   */
		  height: '0',
		  /**
		   * 是否显示封面图
		   * @type {Boolean}
		   */
		  showPoster: true,
		  /**
		   * 默认清晰度
		   * @type {String}
		   */
		  defaultDefinition: '',
		  /**
		   * 是否用小窗口播放
		   * @type {Boolean}
		   */
		  isUseWebkitPlayinline: true,
		  /**
		   * 是否开启aireplay
		   * @type {Boolean}
		   */
		  isUseWebkitAirplay: true,
		  /**
		   * 是否可以跨域
		   * @type {Boolean}
		   */
		  isUseWebkitCrossOrigin: false,
		  /**
		   * 是否开启预加载
		   * @type {Boolean}
		   */
		  isUseWebkitPreload: false,
		  /**
		   * 是否使用webview video的原生控制栏
		   * @type {Boolean}
		   */
		  isUseWebkitControl: false,
		  /**
		   * 是否开启Html5皮肤
		   * @type {Boolean}
		   */
		  isUseHtml5UI: true,
		  /**
		   * 是否初始化时静音
		   * @type {Boolean}
		   */
		  muted: false,
		  volume: 100,
		  loop: false,
		  settings: {
		    UiControl: {
		      subPlugins: (function(){
		        var list = [];
		        if (util.mobile) {
		          list = ['UiProgress', 'UiControlPlay', 'UiPlayNext', 'UiShowTime', 'UiSettings', 'UiToggleSidebar', 'UiBrowserFullScreen', 'UiWindowFullScreen', 'UiLogo'];
		        }else{
		          list = ['UiProgress', 'UiControlPlay', 'UiPlayNext', 'UiShowTime', 'UiVolume', 'UiDefinition', 'UiSettings', 'UiToggleSidebar', 'UiBrowserFullScreen', 'UiWindowFullScreen', 'UiLogo'];
		        }
		        return list;
		      })()
		    },
		    UiSettings:{},
		    HdPlayer: {
		      'subPlugins': ['UiShadow']
		    },
		    H5Player: {
		      'subPlugins': ['UiShadow']
		    },
		    TizenLoadingAd: {
		      url: 'http://ra.gtimg.com/tv/samsung/tizenloadingad.js'
		    }
		  },
		  isNeedPay: false,
		  loadingadAutoplay: true,
		  hdloadingadAutoplay: true,
		  autoplayAfterHdLoadingad: true,
		  playStartTime: 0,
		  skipPrelude: true,
		  useConnectionPlay: false,
		  connectionPlayTime: 0,
		  // 播放中是否显示进度条
		  hideControlOnPlaying: true,
		  otherVideoLink: 'http://v.qq.com/',
		  useComboService: true,
		  showLogo: location.hostname!=='v.qq.com',
		  showTitle: location.hostname!=='v.qq.com',
		  showToggleSideBar: false,
		  // flash config
		  flashWmode: 'window',
		  showBrowserFullScreen: false,
		  showSettings: true,
		  showShare: true,
		  showCloseLight: false,
		  showSmallWindowButton: false,
		  showBullet: false,
		  bulletId: '',
		  showImageBullet: false,
		  // 是否显示弹幕输入
		  showBulletInput: true,
		  showFlashBulletInput: false,
		  openBulletDefault: true
		};
	
		module.exports = defaultConfig;
	
	/***/ },
	
	/***/ 87:
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * @fileOverview 数据集,用于当前播放器内部的一些全局变量存储
		 */
		/**
		 * @constructor
		 * @type {Object}
		 */
	
		var util = __webpack_require__(85);
		var dataset = {
		  /**
		   * 全局播放器实例索引ID, 新建播放器就+1
		   * @type {Number}
		   */
		  maxId: 0,
		  /**
		   * 存储获取播放器在线配置请求的状态
		   * @type {Object}
		   */
		  deferGetPlayerScript: {},
		  /**
		   * 隐藏dom节点的css class
		   * @type {String}
		   */
		  hideClass: 'txp_none',
		  /**
		   * js api 根目录
		   * @type {String}
		   */
		  jsBasePath: '//vm.gtimg.cn/tencentvideo/txp/js/',
		  /**
		   * 浏览器的flash版本号
		   * @type {String}
		   */
		  flashVersion: '0.0.0',
		  /**
		   * flash直播swf地址
		   * @type {String}
		   */
		  flashLiveSwf: '//imgcache.qq.com/minivideo_v1/vd/res/TencentPlayerLive.swf?max_age=86400',
		  /**
		   * flash点播swf地址
		   * @type {String}
		   */
		  flashVodSwf: (function(){
		    if (location.hostname==='v.qq.com'){
		      return '//imgcache.qq.com/tencentvideo_v1/playerv3/TencentPlayer.swf?max_age=86400';
		    }
		    return '//imgcache.qq.com/tencentvideo_v1/playerv3/TPout.swf?max_age=86400';
		  })(),
		  /**
		   * 播放器实例对象
		   * @type {Object}
		   */
		  _instance: {},
		  documentWebSite: 'http://tvp.oa.com/',
		  jsApiReady: 'TxPlayerJSBrageReady',
		  tabindex: 1,
		  // h5播放器css样式对应文件路径
		  H5PlayerStyleUrl: {
		    ipadh5: '//vm.gtimg.cn/tencentvideo/txp/style/txp_pad.css',
		    html5hd: '//vm.gtimg.cn/tencentvideo/txp/style/txp_desktop.css'
		  },
		  // 合并服务
		  comboServiceRule: '//vm.gtimg.cn/c/=',
		  // 点击事件名
		  clickEventName: (function(){
		    return 'click';
		    if (util.mobile) return 'touchend';
		  })(),
		  // 加载js回调对象哈希表
		  loadScriptDefer: {},
		  // 切换清晰度超时数据
		  switchDefinitionTimeout: 0
		};
		dataset.localStorageKey = {
		  userId: 'txp-userid',
		  userSetting: 'txp-user-setting',
		  playTime: 'txp-playtime',
		  adRfid: 'txp-ad-rfid',
		  historyPlayTime: 'txp-history-playtime',
		  historyDefinition: 'tvp-history-definition'
		};
		module.exports = dataset;
	
	/***/ },
	
	/***/ 88:
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * 拓展Events
		 */
		var Events        = __webpack_require__(89);
		Events.prototype.on = function(evtName, listener){
		  if (!evtName) {
		    window.Txplayer && Txplayer.util.error('on error:evtName不能为空:' + evtName);
		    return;
		  }
		  this.addListener.call(this, evtName, listener);
		}
	
		// 运行消息指令获取返回数据
		Events.prototype.run = function(evtName, data){
		  if (typeof evtName!=='string') return false;
		  var config = {
		    data: null,
		    async: false
		  };
		  var args = [evtName, data, config];
		  for(var i=0, len=arguments.length;i<len;i++){
		    if (i<2) continue;
		    args.push(arguments[i]);
		  }
		  this.emit.apply(this, args);
		  // this.emit(evtName, data, config);
		  if (!!config.async) return config.async;
		  else return config.data;
		}
		// Events.off = Events.remveAllListeners
		Events.prototype.off = function(evtName){
		  if (!evtName) return this;
		  // this.removeAllListeners.apply(this, arguments);
	
		  // 子消息不用触发主消息
		  if (evtName.indexOf('.') > -1) {
		    this.removeAllListeners.call(this, evtName);
		    return this;
		  }
		  // 主消息得遍历所有的子消息并发送指令
		  for (name in this._events) {
		    if ( name===evtName ) {
		      this.removeAllListeners.call(this, evtName);
		      continue;
		    }
		    if (name && name.indexOf('.')===-1) continue;
		    if ( evtName!== name.split('.')[0] ) continue;
		    this.removeAllListeners.call(this, name);
		  }
		  return this;
		};
	
		// 消息广播
		Events.prototype.broadcast = function(evtName, data){
		  if (!evtName) {
		    window.Txplayer && Txplayer.util.error('broadcast error:evtName不能为空:' + evtName);
		    return;
		  }
		  if (typeof evtName !=='string') return this;
		  // 主消息参数
		  var args = [evtName];
		  for(var i=0, len=arguments.length;i<len;i++){
		    if (i===0) continue;
		    args.push(arguments[i]);
		  }
		  // 子消息专用参数
		  var subMsgArgs = args.slice(0);
		  // 子消息不用触发主消息
		  if (evtName.indexOf('.') > -1) {
		    // this.emit.call(this, evtName, data);
		    this.emit.apply(this, args);
		    return this;
		  }
		  // 主消息得遍历所有的子消息并发送指令
		  for (msgName in this._events) {
		    if ( msgName===evtName ) {
		      // this.emit.call(this, evtName, data);
		      this.emit.apply(this, args);
		      continue;
		    }
		    if (msgName && msgName.indexOf('.')===-1) continue;
		    if ( evtName!== msgName.split('.')[0] ) continue;
		    // this.emit.call(this, msgName, data);
		    subMsgArgs[0] = msgName;
		    this.emit.apply(this, subMsgArgs);
		  }
		  return this;
		}
	
		module.exports = Events;
	
	/***/ },
	
	/***/ 89:
	/***/ function(module, exports) {
	
		// Copyright Joyent, Inc. and other Node contributors.
		//
		// Permission is hereby granted, free of charge, to any person obtaining a
		// copy of this software and associated documentation files (the
		// "Software"), to deal in the Software without restriction, including
		// without limitation the rights to use, copy, modify, merge, publish,
		// distribute, sublicense, and/or sell copies of the Software, and to permit
		// persons to whom the Software is furnished to do so, subject to the
		// following conditions:
		//
		// The above copyright notice and this permission notice shall be included
		// in all copies or substantial portions of the Software.
		//
		// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
		// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
		// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
		// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
		// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
		// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
		// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
		function EventEmitter() {
		  this._events = this._events || {};
		  this._maxListeners = this._maxListeners || undefined;
		}
		module.exports = EventEmitter;
	
		// Backwards-compat with node 0.10.x
		EventEmitter.EventEmitter = EventEmitter;
	
		EventEmitter.prototype._events = undefined;
		EventEmitter.prototype._maxListeners = undefined;
	
		// By default EventEmitters will print a warning if more than 10 listeners are
		// added to it. This is a useful default which helps finding memory leaks.
		EventEmitter.defaultMaxListeners = 10;
	
		// Obviously not all Emitters should be limited to 10. This function allows
		// that to be increased. Set to zero for unlimited.
		EventEmitter.prototype.setMaxListeners = function(n) {
		  if (!isNumber(n) || n < 0 || isNaN(n))
		    throw TypeError('n must be a positive number');
		  this._maxListeners = n;
		  return this;
		};
	
		EventEmitter.prototype.emit = function(type) {
		  var er, handler, len, args, i, listeners;
	
		  if (!this._events)
		    this._events = {};
	
		  // If there is no 'error' event listener then throw.
		  if (type === 'error') {
		    if (!this._events.error ||
		        (isObject(this._events.error) && !this._events.error.length)) {
		      er = arguments[1];
		      if (er instanceof Error) {
		        throw er; // Unhandled 'error' event
		      }
		      throw TypeError('Uncaught, unspecified "error" event.');
		    }
		  }
	
		  handler = this._events[type];
	
		  if (isUndefined(handler))
		    return false;
	
		  if (isFunction(handler)) {
		    switch (arguments.length) {
		      // fast cases
		      case 1:
		        handler.call(this);
		        break;
		      case 2:
		        handler.call(this, arguments[1]);
		        break;
		      case 3:
		        handler.call(this, arguments[1], arguments[2]);
		        break;
		      // slower
		      default:
		        args = Array.prototype.slice.call(arguments, 1);
		        handler.apply(this, args);
		    }
		  } else if (isObject(handler)) {
		    args = Array.prototype.slice.call(arguments, 1);
		    listeners = handler.slice();
		    len = listeners.length;
		    for (i = 0; i < len; i++)
		      listeners[i].apply(this, args);
		  }
	
		  return true;
		};
	
		EventEmitter.prototype.addListener = function(type, listener) {
		  var m;
	
		  if (!isFunction(listener))
		    throw TypeError('listener must be a function');
	
		  if (!this._events)
		    this._events = {};
	
		  // To avoid recursion in the case that type === "newListener"! Before
		  // adding it to the listeners, first emit "newListener".
		  if (this._events.newListener)
		    this.emit('newListener', type,
		              isFunction(listener.listener) ?
		              listener.listener : listener);
	
		  if (!this._events[type])
		    // Optimize the case of one listener. Don't need the extra array object.
		    this._events[type] = listener;
		  else if (isObject(this._events[type]))
		    // If we've already got an array, just append.
		    this._events[type].push(listener);
		  else
		    // Adding the second element, need to change to array.
		    this._events[type] = [this._events[type], listener];
	
		  // Check for listener leak
		  if (isObject(this._events[type]) && !this._events[type].warned) {
		    if (!isUndefined(this._maxListeners)) {
		      m = this._maxListeners;
		    } else {
		      m = EventEmitter.defaultMaxListeners;
		    }
	
		    if (m && m > 0 && this._events[type].length > m) {
		      this._events[type].warned = true;
		      console.error('(node) warning: possible EventEmitter memory ' +
		                    'leak detected. %d listeners added. ' +
		                    'Use emitter.setMaxListeners() to increase limit.',
		                    this._events[type].length);
		      if (typeof console.trace === 'function') {
		        // not supported in IE 10
		        console.trace();
		      }
		    }
		  }
	
		  return this;
		};
	
		EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
		EventEmitter.prototype.once = function(type, listener) {
		  if (!isFunction(listener))
		    throw TypeError('listener must be a function');
	
		  var fired = false;
	
		  function g() {
		    this.removeListener(type, g);
	
		    if (!fired) {
		      fired = true;
		      listener.apply(this, arguments);
		    }
		  }
	
		  g.listener = listener;
		  this.on(type, g);
	
		  return this;
		};
	
		// emits a 'removeListener' event iff the listener was removed
		EventEmitter.prototype.removeListener = function(type, listener) {
		  var list, position, length, i;
	
		  if (!isFunction(listener))
		    throw TypeError('listener must be a function');
	
		  if (!this._events || !this._events[type])
		    return this;
	
		  list = this._events[type];
		  length = list.length;
		  position = -1;
	
		  if (list === listener ||
		      (isFunction(list.listener) && list.listener === listener)) {
		    delete this._events[type];
		    if (this._events.removeListener)
		      this.emit('removeListener', type, listener);
	
		  } else if (isObject(list)) {
		    for (i = length; i-- > 0;) {
		      if (list[i] === listener ||
		          (list[i].listener && list[i].listener === listener)) {
		        position = i;
		        break;
		      }
		    }
	
		    if (position < 0)
		      return this;
	
		    if (list.length === 1) {
		      list.length = 0;
		      delete this._events[type];
		    } else {
		      list.splice(position, 1);
		    }
	
		    if (this._events.removeListener)
		      this.emit('removeListener', type, listener);
		  }
	
		  return this;
		};
	
		EventEmitter.prototype.removeAllListeners = function(type) {
		  var key, listeners;
	
		  if (!this._events)
		    return this;
	
		  // not listening for removeListener, no need to emit
		  if (!this._events.removeListener) {
		    if (arguments.length === 0)
		      this._events = {};
		    else if (this._events[type])
		      delete this._events[type];
		    return this;
		  }
	
		  // emit removeListener for all listeners on all events
		  if (arguments.length === 0) {
		    for (key in this._events) {
		      if (key === 'removeListener') continue;
		      this.removeAllListeners(key);
		    }
		    this.removeAllListeners('removeListener');
		    this._events = {};
		    return this;
		  }
	
		  listeners = this._events[type];
	
		  if (isFunction(listeners)) {
		    this.removeListener(type, listeners);
		  } else if (listeners) {
		    // LIFO order
		    while (listeners.length)
		      this.removeListener(type, listeners[listeners.length - 1]);
		  }
		  delete this._events[type];
	
		  return this;
		};
	
		EventEmitter.prototype.listeners = function(type) {
		  var ret;
		  if (!this._events || !this._events[type])
		    ret = [];
		  else if (isFunction(this._events[type]))
		    ret = [this._events[type]];
		  else
		    ret = this._events[type].slice();
		  return ret;
		};
	
		EventEmitter.prototype.listenerCount = function(type) {
		  if (this._events) {
		    var evlistener = this._events[type];
	
		    if (isFunction(evlistener))
		      return 1;
		    else if (evlistener)
		      return evlistener.length;
		  }
		  return 0;
		};
	
		EventEmitter.listenerCount = function(emitter, type) {
		  return emitter.listenerCount(type);
		};
	
		function isFunction(arg) {
		  return typeof arg === 'function';
		}
	
		function isNumber(arg) {
		  return typeof arg === 'number';
		}
	
		function isObject(arg) {
		  return typeof arg === 'object' && arg !== null;
		}
	
		function isUndefined(arg) {
		  return arg === void 0;
		}
	
	
	/***/ },
	
	/***/ 90:
	/***/ function(module, exports) {
	
		/**
		 * Txplayer.$ 模块，依赖第三方的zepto|jquery|jqmobile
		 * @author zoborzhang
		 */
		var $;
		if (typeof window.Zepto === 'function') {
		  $ = window.Zepto;
		} else if (typeof window.jQuery === 'function') {
		  $ = window.jQuery;
		} else if (typeof window.jq === 'function') {
		  $ = window.jq;
		}else{
		  throw ReferenceError('$ is not defined!');
		}
		module.exports = $;
	
	/***/ },
	
	/***/ 91:
	/***/ function(module, exports) {
	
		/**
		 * JavaScript Micro-Templating
		 * http://ejohn.org/blog/javascript-micro-templating/
		 * @constructor
		 * @param  {String} str  模板
		 * @param  {Object} data 数据
		 * @return {String}      模板替换后的数据
		 */
		var tmpl = (function(cache, $) {
		  return function(str, data) {
		    var fn = !/\s/.test(str) ? cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML) : function(data) {
		      var i, variable = [$],
		        value = [
		          []
		        ];
		      for (i in data) {
		        variable.push(i);
		        value.push(data[i]);
		      };
		      return (new Function(variable, fn.$)).apply(data, value).join("");
		    };
		    fn.$ = fn.$ || $ + ".push('" + str.replace(/\\/g, "\\\\")
		      .replace(/[\r\t\n]/g, " ")
		      .split("<%")
		      .join("\t")
		      .replace(/((^|%>)[^\t]*)'/g, "$1\r")
		      .replace(/\t=(.*?)%>/g, "',$1,'")
		      .split("\t")
		      .join("');")
		      .split("%>")
		      .join($ + ".push('")
		      .split("\r")
		      .join("\\'") + "');return " + $;
	
		    return data ? fn(data) : fn;
		  };
		})({}, '$' + (+new Date()));
	
		module.exports = tmpl;
	
	/***/ },
	
	/***/ 92:
	/***/ function(module, exports) {
	
		/**
		 * jQuery plugin to convert a given $.ajax response xml object to json.
		 *
		 * @example var json = $.xml2json(response);
		 */
		(function() {
	
		   // default options based on https://github.com/Leonidas-from-XIV/node-xml2js
		   var defaultOptions = {
		      attrkey: '$',
		      charkey: '_',
		      normalize: false,
		      explicitArray: false
		   };
	
		   // extracted from jquery
		   function parseXML(data) {
		      var xml, tmp;
		      if (!data || typeof data !== "string") {
		         return null;
		      }
		      try {
		         if (window.DOMParser) { // Standard
		            tmp = new DOMParser();
		            xml = tmp.parseFromString(data, "text/xml");
		         } else { // IE
		            xml = new ActiveXObject("Microsoft.XMLDOM");
		            xml.async = "false";
		            xml.loadXML(data);
		         }
		      } catch (e) {
		         xml = undefined;
		      }
		      if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
		         throw new Error("Invalid XML: " + data);
		      }
		      return xml;
		   }
	
		   function normalize(value, options){
		      if (!!options.normalize){
		         return (value || '').trim();
		      }
		      return value;
		   }
	
		   function xml2jsonImpl(xml, options) {
	
		      var i, result = {}, attrs = {}, node, child, name;
		      result[options.attrkey] = attrs;
	
		      if (xml.attributes && xml.attributes.length > 0) {
		         for (i = 0; i < xml.attributes.length; i++){
		            var item = xml.attributes.item(i);
		            attrs[item.nodeName] = item.value;
		         }
		      }
	
		      // element content
		      if (xml.childElementCount === 0) {
		         result[options.charkey] = normalize(xml.textContent, options);
		      }
	
		      for (i = 0; i < xml.childNodes.length; i++) {
		         node = xml.childNodes[i];
		         if (node.nodeType === 1) {
	
		            if (node.attributes.length === 0 && node.childElementCount === 0){
		               child = normalize(node.textContent, options);
		            } else {
		               child = xml2jsonImpl(node, options);
		            }
	
		            name = node.nodeName;
		            if (result.hasOwnProperty(name)) {
		               // For repeating elements, cast/promote the node to array
		               var val = result[name];
		               if (!Array.isArray(val)) {
		                  val = [val];
		                  result[name] = val;
		               }
		               val.push(child);
		            } else if(options.explicitArray === true) {
		               result[name] = [child];
		            } else {
		               result[name] = child;
		            }
		         }
		      }
	
		      return result;
		   }
	
		   /**w
		    * Converts an xml document or string to a JSON object.
		    *
		    * @param xml
		    */
		   function xml2json(xml, options) {
		      var n;
	
		      if (!xml) {
		         return xml;
		      }
	
		      options = options || {};
	
		      for(n in defaultOptions) {
		         if(defaultOptions.hasOwnProperty(n) && options[n] === undefined) {
		            options[n] = defaultOptions[n];
		         }
		      }
	
		      if (typeof xml === 'string') {
		         xml = parseXML(xml).documentElement;
		      }
	
		      var root = {};
		      if (typeof xml.attributes === 'undefined' || xml.attributes === null) {
		         root[xml.nodeName] = xml2jsonImpl(xml, options);
		      } else if (xml.attributes && xml.attributes.length === 0 && xml.childElementCount === 0){
		         root[xml.nodeName] = normalize(xml.textContent, options);
		      } else {
		         root[xml.nodeName] = xml2jsonImpl(xml, options);
		      }
	
		      return root;
		   }
	
		   // if (typeof jQuery !== 'undefined') {
		   //    jQuery.extend({xml2json: xml2json});
		   // } else if (typeof module !== 'undefined') {
		   //    module.exports = xml2json;
		   // } else if (typeof window !== 'undefined') {
		   //    window.xml2json = xml2json;
		   // }
		   module.exports = xml2json;
		})();
	
	/***/ },
	
	/***/ 93:
	/***/ function(module, exports) {
	
		// 错误上报
		// bossid: 3720
		function reportError(params){
		  var playType = this.run(Txplayer.apiList.publicApi.getPlayerType);
		  var videoType = this.run(Txplayer.apiList.publicApi.getVideoType);
		  var data = {
		    version: Txplayer.dataset.ver,
		    uid: this.run(Txplayer.apiList.publicApi.getUserId),
		    pid: this.run(Txplayer.apiList.publicApi.getPlayerId),
		    vid: this.run(Txplayer.apiList.publicApi.getVid),
		    player_type: playType,
		    video_type: videoType==='vod'?1:2,
		    platform: Txplayer.util.getPlatform(),
		    url: document.URL,
		    filename: Txplayer.dataset.filename,
		    sub_version: Txplayer.dataset.flashVersion,
		    error_code: params.code,
		    error_msg: params.msg,
		    error_stack: params.stack,
		    file_lastupdate: Txplayer.dataset.lastModify,
		    qq_openid: getQQ_openid()
		  };
		  Txplayer.util.showInfo('错误上报', data);
		  var url = 'http://btrace.video.qq.com/kvcollect?BossId=3720&Pwd=1814753491&';
		  url += Txplayer.$.param(data);
		  Txplayer.util.report(url);
		}
	
		// 上报window.onerror错误
		function reportWindowOnError(e){
		  // 没有错误信息的就不要上报了，上报了也没用
		  if (!e || !e.filename || !e.message){
		    return ;
		  }
		  // 只上报播放器自身的错误
		  if (e.filename.indexOf('//vm.gtimg.cn/tencentvideo/txp/js/')===-1) {
		    return;
		  }
		  function getPlayer(){
		    var player;
		    if ( !(Txplayer && Txplayer.dataset && Txplayer.dataset._instance) ) return player;
		    for(var i in Txplayer.dataset._instance){
		      player = Txplayer.dataset._instance[i];
		      break;
		    }
		    return player;
		  }
		  var player = getPlayer();
		  var uid, pid, vid, playerType, videoType;
		  if (player && player.constructor === Txplayer){
		    uid = player.getUserId();
		    pid = player.getPlayerId();
		    vid = player.getVid();
		    playerType = player.getPlayerType();
		    videoType = player.getVideoType();
		  }
		  var stack = [
		    'line=' + e.lineno,
		    'column='+ e.colno
		  ].join(' ');
		  var data = {
		    version: Txplayer.dataset.ver,
		    uid: uid,
		    pid: pid,
		    vid: vid,
		    player_type: playerType,
		    video_type: videoType==='vod'?1:2,
		    platform: Txplayer.util.getPlatform(),
		    url: document.URL,
		    filename: e.filename,
		    sub_version: Txplayer.dataset.flashVersion,
		    error_code: '3000',
		    error_msg: e.message,
		    error_stack: stack,
		    file_lastupdate: Txplayer.dataset.lastModify,
		    qq_openid: getQQ_openid()
		  };
		  Txplayer.util.showInfo('错误上报', data);
		  var url = 'http://btrace.video.qq.com/kvcollect?BossId=3720&Pwd=1814753491&';
		  url += Txplayer.$.param(data);
		  Txplayer.util.report(url);
		}
	
		// 获取QQ号或者openid
		function getQQ_openid(){
		  var uin = Txplayer.util.cookie.get('openid') || Txplayer.util.getQQFromCookie();
		  return uin;
		}
	
		// 播放器调用次数上报
		// bossid: 3721
		function reportTxplayer(context, params){
		  var data = {
		    version: Txplayer.dataset.ver,
		    uid: context.msg.run(Txplayer.apiList.publicApi.getUserId),
		    pid: context.msg.run(Txplayer.apiList.publicApi.getPlayerId),
		    vid: context.msg.run(Txplayer.apiList.publicApi.getVid),
		    player_type: params.playType,
		    video_type: params.videoType==='vod'?1:2,
		    platform: Txplayer.util.getPlatform(),
		    url: document.URL,
		    filename: Txplayer.dataset.filename,
		    sub_version: Txplayer.dataset.flashVersion,
		    _dc:  Math.random()
		  };
		  var url = 'http://btrace.video.qq.com/kvcollect?BossId=3721&Pwd=1636975887&'
		  url += Txplayer.$.param(data);
		  Txplayer.util.showInfo('播放器调用', data);
		  Txplayer.util.report(url);
		}
	
		// 用户行为上报
		// bossid： 3717
		function reportUsrAction(params){
		  var playType = this.run(Txplayer.apiList.publicApi.getPlayerType);
		  var videoType = this.run(Txplayer.apiList.publicApi.getVideoType);
		  var data = {
		    version: Txplayer.dataset.ver,
		    uid: this.run(Txplayer.apiList.publicApi.getUserId),
		    pid: this.run(Txplayer.apiList.publicApi.getPlayerId),
		    vid: this.run(Txplayer.apiList.publicApi.getVid),
		    player_type: playType,
		    video_type: videoType==='vod'?1:2,
		    platform: Txplayer.util.getPlatform(),
		    url: document.URL,
		    usr_action: params.usr_action,
		    usr_action_detail: params.usr_action_detail
		  };
		  Txplayer.util.showInfo('用户行为上报', data);
		  var url = 'http://btrace.video.qq.com/kvcollect?BossId=3717&Pwd=1055758521&';
		  url += Txplayer.$.param(data);
		  Txplayer.util.report(url);
		}
	
		// getinfo上报
		// bossid: 2594
		function reportGetinfo(params){
		  var playType = this.run(Txplayer.apiList.publicApi.getPlayerType);
		  var videoType = this.run(Txplayer.apiList.publicApi.getVideoType);
		  var data = {
		    gid: this.run(Txplayer.apiList.publicApi.getUserId),
		    plt: Txplayer.util.getPlatform(),
		    uin: Txplayer.util.getQQFromCookie(),
		    vid: this.run(Txplayer.apiList.publicApi.getVid),
		    cts: Txplayer.$.now(),
		    sdt: Txplayer.util.getStdfrom(),
		    fne: params.filename,
		    dip: params.cdnIp,
		    cdn: params.cdnId,
		    vky: params.vkey
		  };
		  Txplayer.util.showInfo('getinfo上报', data);
		  var url = 'http://btrace.video.qq.com/kvcollect?BossId=2594&Pwd=0&';
		  url += Txplayer.$.param(data);
		  Txplayer.util.report(url);
		}
	
		// 提供上报api
		function exportsReportApi(context){
		  // 错误上报
		  context.msg.on(Txplayer.apiList.privateApi.reportError, reportError);
		  // 用户行为上报
		  context.msg.on(Txplayer.apiList.privateApi.reportUsrAction, reportUsrAction);
		  context.msg.on(Txplayer.apiList.privateApi.reportGetinfo, reportGetinfo);
		}
	
	
		if(window.addEventListener){
		  window.addEventListener('error', reportWindowOnError);
		}else if(window.attachEvent){
		  window.attachEvent('onerror',reportWindowOnError);
		}
	
		module.exports = {
		  reportTxplayer: reportTxplayer,
		  reportError: reportError,
		  exportsReportApi: exportsReportApi
		};
	
	/***/ }
	
	/******/ });
/**
 * @fileOverview 包裹播放器内核文件
 * @author zoborzhang
 */
(function() {

  if (!window.Txplayer || !Txplayer.dataset || !Txplayer.$) return;
  Txplayer.$.extend(Txplayer.dataset, {
    // 当前播放器内核的cdn文件名
    filename: "txplayer.js",
    // 上次修改时间
    lastModify: "Sat May 14 2016 10:19:16 GMT+0800 (CST)",
    // 上次修改时间的时间戳，异步加载模块会带上?t=ts
    ts: "1463192356018",
    // 播放器的版本号
    ver: "3.0.0"
  });

})();