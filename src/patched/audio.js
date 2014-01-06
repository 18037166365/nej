/**
 * ------------------------------------------
 * 语音接口实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
var f = function(){
    var _  = NEJ.P,
        _f = NEJ.F,
        _e = _('nej.e'),
        _h = _('nej.h'),
        _t = _('nej.ut');
    /**
     * 取音频播放器实例
     * @return {Object} 配置信息
     * @return {nej.ut._$$Media} 音频播放器实例
     */
    _h.__getAudioInst = function(_options){
        return _t._$$MediaAudio._$allocate(_options);
    };
    /**
     * 单例播放音频，代码示例
     * [code]
     *     // 播放音频
     *     // 如果之前有音频在播放
     *     // 则会先触发之前音频的0状态onstatechange事件
     *     nej.e._$playBgSound(
     *         'http://a.b.com/a/a.mp3',{
     *             extra:'xxx_id',
     *             onstatechange:function(_event){
     *                 // _event.state -> 状态值
     *                 // _event.data  -> extra值
     *             },
     *             onerror:function(_event){
     *                 // _event.code  -> 错误类型
     *             }
     *         }
     *     );
     *     // 停止音频播放
     *     // 如果有音频在播放
     *     // 则会触发0状态的onstatechange事件
     *     nej.e._$stopBgSound();
     * [/code]
     * @api    {nej.e._$playBgSound}
     * @param  {String} 音频文件地址
     * @param  {Object} 可选配置参数
     * @config {Variable} extra         onstatechange时传回数据
     * @config {Number}   retry         出错重试次数，0表示不重试，默认为0
     * @config {Number}   interval      如果设置了retry则通过此参数指定每次重试间隔，单位毫秒，默认500
     * @config {Function} onstatechange 播放状态变化回调事件，state值为
     *  [ntb]
     *  0 - 当前停止状态
     *  1 - 当前缓冲状态
     *  2 - 当前播放状态
     *  3 - 当前暂停状态
     *  [/ntb]
     * @config  {Function} onerror      播放异常回调事件
     * @return {Void}
     */
    _e._$playBgSound = (function(){
        var _playing,_audio,_timer;
        // state change callback
        var _doStateChangeCallback = function(_state){
            if (!_playing) return;
            var _func = _playing.onstatechange||_f,
                _extr = _playing.extra;
            if (_state==0) _playing = null;
            _func({state:_state,data:_extr});
        };
        // error callback
        var _doErrorCallback = function(_code){
            if (!_playing) return;
            var _func = _playing.onerror||_f,
                _extr = _playing.extra;
            _playing = null;
            _func({code:_code,data:_extr});
        };
        // state change action
        var _doStateChangeAction = function(_event){
            if (_event.state==0){
                _doStopAction();
            }
            _doStateChangeCallback(_event.state);
        };
        // play action
        var _doPlayAction = function(){
            if (!_playing) return;
            _audio = _h.__getAudioInst({
                url:_playing.url,
                onerror:_doErrorAction,
                onstatechange:_doStateChangeAction
            });
            _audio._$play();
        };
        // stop action
        var _doStopAction = function(){
            if (!!_audio){
                _audio = _audio._$recycle();
            }
            if (!!_timer){
                _timer = window.clearTimeout(_timer);
            }
        };
        // error action
        var _doErrorAction = function(_event){
            if (!_playing) return;
            _doStopAction();
            if (_playing.retry>0){
                _playing.retry--;
                _timer = window.setTimeout(
                    _doPlayAction._$bind(null),
                    _playing.interval||500
                );
            }else{
                _doErrorCallback(_event.code);
            }
        };
        /**
         * 停止单例音频播放
         * @api    {nej.e._$stopBgSound}
         * @see    {nej.e._$playBgSound}
         * @return {Void}
         */
        _e._$stopBgSound = function(){
            if (!!_audio){
                _audio._$stop();
            }
        };
        return function(_url,_options){
            _doStopAction();
            _doStateChangeCallback(0);
            _playing = NEJ.X({
                url:_url
            },_options);
            _doPlayAction();
        };
    })();
};
NEJ.define(
    '{lib}patched/audio.js',[
    '{lib}base/platform.js',
    '{lib}util/media/audio.js'
],f);