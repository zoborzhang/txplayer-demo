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
	
		module.exports = __webpack_require__(29);
	
	
	/***/ },
	
	/***/ 29:
	/***/ function(module, exports) {
	
		/**
		 * html5 高清播放器上报
		 */
		var $             = Txplayer.$;
		var api           = Txplayer.apiList;
		var util          = Txplayer.util;
	
		function HdPlayerHistory(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		HdPlayerHistory.prototype = {
		  init: function(){
		    this.dataset.dataKey_historyPlayTime = Txplayer.dataset.localStorageKey.historyPlayTime;
		    this.dataset.dataKey_historyDefinition = Txplayer.dataset.localStorageKey.historyDefinition;
		    this.dataset.maxHistoryPlayTimeList = 50;
		    this.dataset.useConnectionPlay = this.context.config.useConnectionPlay;
		    this.addEventListener();
		    this.exportsModuleApis();
		  },
		  savePlaytimeData: function(time){
		    var jsonstr = util.getData(this.dataset.dataKey_historyPlayTime);
		    var data;
		    var vid = this.context.msg.run(api.publicApi.getVid);
		    var count = 0;
		    if (!jsonstr) {
		      data = {};
		    }else{
		      try{
		        data = JSON.parse(jsonstr);
		      }catch(e){
		        data = {};
		      }
		    }
		    if (!vid){
		      util.showError('savePlaytimeData Error', '找不到vid');
		      return;
		    }
		    for(var i in data){
		      count++;
		    }
		    if (count>=this.dataset.maxHistoryPlayTimeList) data = {};
		    data[vid] = time;
		    util.setData(this.dataset.dataKey_historyPlayTime, JSON.stringify(data));
		  },
		  getPlaytimeData: function(){
		    var jsonstr = util.getData(this.dataset.dataKey_historyPlayTime);
		    var data;
		    var vid = this.context.msg.run(api.publicApi.getVid);
		    if (!jsonstr) {
		      data = {};
		    }else{
		      try{
		        data = JSON.parse(jsonstr);
		      }catch(e){
		        data = {};
		      }
		    }
		    if (!vid){
		      util.showError('savePlaytimeData Error', '找不到vid');
		      return;
		    }
		    return data[vid];
		  },
		  clearPlaytimeData: function(){
		    var jsonstr = util.getData(this.dataset.dataKey_historyPlayTime);
		    var data;
		    var vid = this.context.msg.run(api.publicApi.getVid);
		    if (!jsonstr) {
		      data = {};
		    }else{
		      try{
		        data = JSON.parse(jsonstr);
		      }catch(e){
		        data = {};
		      }
		    }
		    if (!vid){
		      util.showError('savePlaytimeData Error', '找不到vid');
		      return;
		    }
		    delete data[vid];
		    util.setData(this.dataset.dataKey_historyPlayTime, JSON.stringify(data));
		  },
		  saveDefinitionData: function(definition){
		    if (!definition) return;
		    util.setData(this.dataset.dataKey_historyDefinition, definition);
		  },
		  getDefinitionData: function(){
		    return util.getData(this.dataset.dataKey_historyDefinition);
		  },
		  addEventListener: function(){
		    var that = this;
		    this.dataset.eventsList = {};
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPlay)] = function(data, options){
		      if (!that.dataset.useConnectionPlay) return;
		      if (data.playListType!=='film') return;
		      if (that.dataset.hasPlayed) return;
		      var historyTime = that.getPlaytimeData();
		      var connectionPlayTime = that.context.msg.run(api.privateApi.getConnectionPlayTime);
		      if (connectionPlayTime) historyTime = connectionPlayTime;
		      var textTime = '<a>' + util.formatPlayTime(historyTime) + '</a>';
		      if (historyTime){
		        that.context.msg.run(api.publicApi.seekTo, historyTime);
		        util.showInfo('1','您上次观看至 '+textTime+' 处，正在为您续播')
		        that.context.msg.broadcast(api.privateApi.showUiTips, {
		          text: '您上次观看至 '+textTime+' 处，正在为您续播',
		          time: 5
		        });
		        that.dataset.hasPlayed = true;
		      }
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPlaying)] = function(data, options){
		      if (data.playListType!=='film') return;
		      if (!that.dataset.hasPlayed){
		        var definition = that.context.msg.run(api.publicApi.getDefinition);
		        that.saveDefinitionData(definition);
		      }
		      that.dataset.hasPlayed = true;
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionTimeupdate)] = function(data, options){
		      if (data.playListType!=='film') return;
		      if (data && data.videoTag && data.videoTag.currentTime && parseInt(data.videoTag.currentTime)%3===0) {
		        var currentTime = that.context.msg.run(api.publicApi.getCurrentTime);
		        that.savePlaytimeData(parseInt(currentTime));
		      }
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionEnded)] = function(data, options){
		      if (data.playListType!=='film') return;
		      if (!data.isAllEnd) return;
		      that.clearPlaytimeData();
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onDefinitionChange)] = function(data){
		      that.saveDefinitionData(data);
		    }
		    $.each(this.dataset.eventsList,function(key, fn){
		      that.context.msg.on(key, fn);
		    })
		  },
		  exportsModuleApis: function(){
		    var that = this;
		    this.dataset.privateApis = {};
		    this.dataset.privateApis[api.privateApi.getHistoryDefinition] = function(data, options){
		      options.data = that.getDefinitionData();
		    }
		    $.each(this.dataset.privateApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    })
		  }
		};
	
	
		Txplayer.register('HdPlayerHistory', HdPlayerHistory);
	
	/***/ }
	
	/******/ });
