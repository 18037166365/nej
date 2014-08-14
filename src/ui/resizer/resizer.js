/*
 * ------------------------------------------
 * 范围裁剪控件封装实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
NEJ.define([
    '{lib}base/global.js',
    '{lib}base/klass.js',
    '{lib}base/constant.js',
    '{lib}base/element.js',
    '{lib}base/util.js',
    '{lib}ui/base.js',
    '{lib}util/resize/resize.js',
    '{lib}util/template/tpl.js',
    '{lib}util/template/jst.js'
],function(NEJ,_k,_g,_e,_u,_i,_t0,_t1,_t2,_p,_o,_f,_r){
    var _pro,
        _seed_css,
        _seed_html,
        _seed_point;
    /**
     * 范围裁剪控件封装
     *
     * @class   {nej.ui._$$Range}
     * @extends {nej.ui._$$Abstract}
     * @param   {Object}  可选配置参数，其他参数见nej.ut._$$Resize控件所示
     * @config  {Object}  size 初始大小，输入任意两个值，其中ratio为width/height，{width:100,height:200,ratio:0.5}
     * @config  {Object}  max  最大款高限制，{width:300,height:400}
     */
    _p._$$Resizer = _k._$klass();
    _pro = _p._$$Resizer._$extend(_i._$$Abstract);
    /**
     * 控件初始化
     * @return {Void}
     */
    _pro.__init = function(){
        this.__ropt = {
            onbeforeresize:this.__onBeforeResize._$bind(this),
            onresizestart:this._$dispatchEvent._$bind(this,'onresizestart'),
            onresizeend:this._$dispatchEvent._$bind(this,'onresizeend'),
            onresize:this._$dispatchEvent._$bind(this,'onresize'),
            onmove:this._$dispatchEvent._$bind(this,'onmove')
        };
        this.__super();
    };
    /**
     * 控件重置
     * @protected
     * @method {__reset}
     * @param  {Object} 配置参数
     * @return {Void}
     */
    _pro.__reset = (function(){
        var _doParseSize = function(_size,_max){
            if (!_size) return;
            var _result,
                _width = _size.width,
                _height = _size.height,
                _ratio = _size.ratio;
            if (!!_width&&!!_height){
                _result = {
                    width:_width-2,
                    height:_height-2
                };
            }else if(!!_ratio){
                if (!!_width){
                    _result = {
                        width:_width-2,
                        height:Math.floor(_width/_ratio)-2
                    };
                }else if(!!_height){
                    _result = {
                        height:_height-2,
                        width:Math.floor(_height*_ratio)-2
                    };
                }
            }
            // fix max limit
            if (!!_max){
                var _maxw = _max.width-2,
                    _maxh = _max.height-2,
                    _orgw = _result.width,
                    _orgh = _result.height,
                    _delta = _maxw/_maxh-_orgw/_orgh;
                if (_delta>0&&_orgh>_maxh){
                    _result.height = _maxh;
                    _result.width = Math.floor(_orgw*_maxh/_orgh);
                }else if(_delta<0&&_orgw>_maxw){
                    _result.width = _maxw;
                    _result.height = Math.floor(_maxw*_orgh/_orgw);
                }
            }
            _result.width += 'px';
            _result.height += 'px';
            return _result;
        };
        return function(_options){
            this.__super(_options);
            var _opt = _u._$merge(_u._$fetch({
                lock:!1,
                min:null
            },_options),this.__ropt);
            _opt.view = this.__parent;
            _opt.body = this.__body;
            _e._$style(
                this.__nsize,
                _doParseSize(_options.size,_options.max)
            );
            this.__resize = _t0._$$Resize._$allocate(_opt);
        };
    })();
    /**
     * 控件销毁
     * @protected
     * @method {__destroy}
     * @return {Void}
     */
    _pro.__destroy = function(){
        if (!!this.__resize)
            this.__resize = this.__resize._$recycle();
        this.__super();
    };
    /**
     * 初始化外观信息
     * @protected
     * @method {__initXGui}
     * @return {Void}
     */
    _pro.__initXGui = function(){
        this.__seed_css = _seed_css;
        this.__seed_html = _seed_html;
    };
    /**
     * 动态构建控件节点模板
     * @protected
     * @method {__initNodeTemplate}
     * @return {Void}
     */
    _pro.__initNodeTemplate = (function(){
        var _clazz = ['znt','znr','znb','znl','zpc zntl','zpc zntr','zpc znbr','zpc znbl'];
        return function(){
            _seed_html = _t1._$addNodeTemplate(
                '<div class="'+_seed_css+'"><div class="zln">'+
                   _t2._$getHtmlTemplate(_seed_point,{clazz:_clazz})+
                '</div></div>'
            );
            this.__seed_html = _seed_html;
        };
    })();
    /**
     * 初始化节点
     * @return {Void}
     */
    _pro.__initNode = function(){
        this.__super();
        this.__nsize = _e._$getChildren(this.__body)[0];
    };
    /**
     * 大小变化之前触发事件
     * @return {Void}
     */
    _pro.__onBeforeResize = function(_event){
        _event.stopped = !0;
        _e._$style(
            this.__nsize,{
                width:_event.width-2+'px',
                height:_event.height-2+'px'
            }
        );
        _e._$style(
            this.__body,{
                top:_event.top+'px',
                left:_event.left+'px'
            }
        );
        this._$dispatchEvent('onresize',_event);
    };
    /**
     * 取裁剪信息
     * @return {Object} 信息
     * @cofnig {Number} top    距离上
     * @cofnig {Number} left   距离左
     * @cofnig {Number} width  宽
     * @cofnig {Number} height 高
     */
    _pro._$getResizeBox = function(){
        return this.__resize._$getResizeBox();
    };
    // ui css text
    _seed_css = _e._$pushCSSText('\
        .#<uispace>-parent{position:relative;}\
        .#<uispace>{position:absolute;top:0;left:0;border:1px solid #aaa;cursor:move;$<user-select>:none;z-index:1000;}\
        .#<uispace> .zln{width:48px;height:48px;border:1px solid #fff;background:url('+_g._$BLANK_IMAGE+');}\
        .#<uispace> .zpc{border:1px solid #aaa;}\
        .#<uispace> .zpt{position:absolute;width:5px;height:5px;font-size:1px;overflow:hidden;}\
        .#<uispace> .znt{top:-1px;left:-1px;width:100%;cursor:n-resize;}\
        .#<uispace> .znr{top:-1px;right:-1px;height:100%;cursor:e-resize;}\
        .#<uispace> .znb{bottom:-1px;left:-1px;width:100%;cursor:s-resize;}\
        .#<uispace> .znl{top:-1px;left:-1px;height:100%;cursor:w-resize;}\
        .#<uispace> .zntl{top:-1px;left:-1px;cursor:nw-resize;}\
        .#<uispace> .zntr{top:-1px;right:-1px;cursor:ne-resize;}\
        .#<uispace> .znbr{bottom:-1px;right:-1px;cursor:se-resize;}\
        .#<uispace> .znbl{bottom:-1px;left:-1px;cursor:sw-resize;}\
    ');
    // html code
    _seed_point = _t2._$addHtmlTemplate('\
        {list 1..8 as x}\
        <div class="zpt ${clazz[x-1]} js-rs-${x}">&nbsp;</div>\
        {/list}\
    ');
});