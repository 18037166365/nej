/*
 * ------------------------------------------
 * 音频播放控件实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
var f = function(){
    // variable declaration
    var _  = NEJ.P,
        _c = _('nej.c'),
        _e = _('nej.e'),
        _p = _('nej.ut'),
        _pro;
    if (!!_p._$$MediaFlash) return;
    /**
     * 音频播放控件<br />
     * 脚本举例
     * [code]
     *   // 首先生成播放对象,只负责逻辑部分，要配合UI来使用
     *   // preload：是否预加载
     *   // url：音频地址
     *   var _mda = _p._$$MediaFlash._$allocate({
     *       preload:false,
     *       url:'http://127.0.0.1:8000/nej-baseline/res/test.mp3',
     *       onstatechange:function(_event){
     *           // 状态改变的回调
     *           // 0 | 当前停止状态
     *           // 1 | 当前缓冲状态
     *           // 2 | 当前播放状态
     *           // 3 | 当前暂停状态
     *       }
     *   });
     *   // 开始播放
     *   _mda._$play();
     *   // 暂停播放
     *   _mda._$pause();
     *   // 停止播放
     *   _mda._$stop();
     * [/code]
     * @class   {nej.ut._$$MediaFlash} 音频播放控件
     * @extends {nej.ut._$$Media}
     * @param   {Object} 可选配置参数，已处理参数列表如下所示
     * @config  {String} url 音频地址
     */
    _p._$$MediaFlash = NEJ.C();
    _pro = _p._$$MediaFlash._$extend(_p._$$Media);
    /**
     * 控件初始化
     * @return {Void}
     */
    _pro.__init = (function(){
        var _onReady = function(_flash){
            this.__audio = _flash;
        };
        return function(){
            this.__supInit();
            _e._$flash({
                hidden:!0,
                src:_c._$get('audio.swf'),
                onready:_onReady._$bind(this)
            });
        };
    })();
    /**
     * 取多媒体实体控件
     * @protected
     * @method {__getMedia}
     * @return {Node} 多媒体实体控件
     */
    _pro.__getMedia = function(){
        return this.__audio;
    };
    /**
     * 执行预加载操作
     * @protected
     * @method {__doPreload}
     * @return {Void}
     */
    _pro.__doPreload = function(){
        // TODO
    };
    /**
     * 执行播放操作
     * @protected
     * @method {__doPlay}
     * @return {Void}
     */
    _pro.__doPlay = function(){
        if (!!this.__audio){
            this.__audio.play();
        }
    };
    /**
     * 执行暂停操作
     * @protected
     * @method {__doPause}
     * @return {Void}
     */
    _pro.__doPause = function(){
        if (!!this.__audio){
            this.__audio.pause();
        }
    };
    /**
     * 执行停止操作
     * @protected
     * @method {__doStop}
     * @return {Void}
     */
    _pro.__doStop = function(){
        if (!!this.__audio){
            this.__audio.stop();
        }
    };
    /**
     * 文件载入触发事件
     * @protected
     * @method {__onLoading}
     * @return {Void}
     */
    _pro.__onLoading = function(){
        // TODO
    };
    /**
     * 暂停触发事件
     * @protected
     * @method {__onPause}
     * @return {Void}
     */
    _pro.__onPause = function(){
        // TODO
    };
    /**
     * 播放过程触发事件
     * @protected
     * @method {__onPlaying}
     * @return {Void}
     */
    _pro.__onPlaying = function(){
        // TODO
    };
};
NEJ.define(
    '{lib}util/media/flash.js',[
    '{patch}config.js',
    '{lib}base/event.js',
    '{lib}util/media/media.js',
    '{lib}util/flash/flash.js'
],f);