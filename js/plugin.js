
layui.define(['jquery','table'], function(exports) {
    var $ = layui.jquery,
        table = layui.table;
    var obj={
        seTable:function seTable(opt) {
            var htl="<div class='select-table-box ' style='display:none;height: 260px;background-color:white;border:1px solid #e6e6e6;position: absolute;z-index: 999;'>" ;
            if(opt.search==true){
                htl+="<div class='demoTable' style='margin: 10px'><div class='layui-inline'><input class='layui-input' name='id' id='demoReload' placeholder='请输入老人姓名' autocomplete='off'>" +
                    "</div> <button class='layui-btn' data-type='reload' id='search'><i class='layui-icon'>&#xe615;</i>搜索</button></div>";
            }
            htl+="<table  class='layui-table' id='Aid' lay-filter='Acon'></table></div>";
            $(opt.elm).after(htl);
            if(opt.related==true){
                for(var i=0;i<opt.relateds.length;i++){
                    if(opt.relateds[i].val==undefined){

                    }else {
                        $(opt.relateds[i].cs).before("<input type='hidden' name='"+opt.relateds[i].val+"'/>");
                    }
                }
                if(opt.elmval!=undefined){
                    $(opt.elm).before("<input type='hidden' name='"+opt.elmval+"'/>");
                }
            }else{
                if(opt.elmval!=undefined){
                    $(opt.elm).before("<input type='hidden' name='"+opt.elmval+"'/>");
                }
            }
            var t=table.render({
                elem: '#Aid'
                ,url:opt.url
                ,cols: opt.cols
                ,page: true
            });
            $("#search").on("click",function () {////搜索
                var demoReload = $('#demoReload').val();
                //执行重载
                table.reload('Aid', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    }
                    , where: {
                        key: demoReload
                    }
                });
                return false;
            })
            $(opt.elm).focus(function () {
                $(".select-table-box").slideDown();
            })

            var $Aid = $("#Aid").next('.layui-table-view').find('table.layui-table');
            table.on('checkbox(Acon)', function(obj){
                var data=obj.data;
                function getjson(key) {
                    for(var q in data){
                        if(q==key){  //item 表示Json串中的属性，如'name'
                            return data[q];
                        }
                    }
                }
                var ch=$Aid.find(".layui-form-checkbox");
                ch.each(function () {
                    if($(this).hasClass("layui-form-checked")){
                        $(this).removeClass("layui-form-checked");
                    }
                })
                $(this).addClass("layui-form-checked");
                if(opt.related==true){
                    for(var i=0;i<opt.relateds.length;i++){
                        if(opt.relateds[i].val==undefined){//直接提交数据
                            $(opt.relateds[i].cs).val(getjson(opt.relateds[i].cs_data));
                        }else {//提交对应的值
                            $(opt.relateds[i].cs).val(getjson(opt.relateds[i].cs_data));
                            $("input[name='"+opt.relateds[i].val+"']").val(getjson(opt.relateds[i].val_data));
                        }
                    }
                    if(opt.elmval==undefined){
                        $(opt.elm).val(getjson(opt.elm_data));
                    }else {
                        $(opt.elm).val(getjson(opt.elm_data));
                        $("input[name="+opt.elmval+"]").val(getjson(opt.elmval_data));
                    }
                }else{
                    if(opt.elmval!=undefined){
                        $(opt.elm).val(getjson(opt.elm_data));
                        console.log(getjson(opt.elm_data));
                        $("input[name='"+opt.elmval+"']").val(getjson(opt.elmval_data));
                    }else {
                        $(opt.elm).val(getjson(opt.elmval_data));
                    }
                }
                $(".select-table-box").slideUp();
            });
             $(document).on("click",function(){//点击页面其他地方隐藏
                $(".select-table-box").slideUp();
            });
            $(".select-table-box>div").on("click",function(event){//阻止事件冒泡
                event.stopPropagation();
            });
            $(opt.elm).on("click",function(event){//防止点击input隐藏
                event.stopPropagation();
            });
            $Aid.dblclick(function(event){
                var checkStatus = table.checkStatus('Aid')
                console.log(checkStatus.data);
                console.log($(event.target).closest("tr").data("index"))
            });
        }
    }
    //输出接口
    exports('plugin',obj);
});
