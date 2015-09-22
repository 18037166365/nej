/*
 * ------------------------------------------
 * ��Ҫƽ̨����Ľӿ�ʵ���ļ�
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
NEJ.define([
    'base/util',
    'base/event'
],function(u,v,p){
    /**
     * �����ļ���Ϣ
     * @param file
     * @param ret
     * @param callback
     * @private
     */
    p.__doDumpFile = function(file,ret,config){
        ret.content = file;
        ret.url = URL.createObjectURL(file);
        if (!!config.dataurl){
            var reader = new FileReader();
            reader.onload = function(event){
                ret.dataurl = event.target.result;
                config.onpaste(ret);
            };
            reader.readAsDataURL(file);
        }else{
            config.onpaste(ret);
        }
    };
    /**
     * ����������Ϣ
     * @param event
     * @private
     */
    p.__doDumpContent = (function(){
        var pmap = {
            string:function(it,ret,event){
                it.getAsString(function(content){
                    event.content = content||'';
                    ret.onpaste(event);
                });
            },
            file:function(it,ret,event){
                p.__doDumpFile(it.getAsFile(),event,ret);
            }
        };
        return function(ret,event){
            var accept = ret.accept||'',
                board = event.clipboardData||{};
            u._$forEach(board.items,function(it){
                if (!accept||it.type.indexOf(accept)==0){
                    v._$stop(event);
                    var ev = {type:it.kind},
                        func = pmap[ev.type];
                    if (u._$isFunction(func)){
                        func(it,ret,ev);
                    }
                    return !0;
                }
            });
        };
    })();

    return p;
});