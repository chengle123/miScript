// ==UserScript==
// @name         小米抢购
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://item.mi.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if($('#J_buyBtnBox').length > 0){
        var timeTime1;
        $('body').append('<div style="height:100px;width:420px;position: fixed;top: 50%;left: 50%;margin-left: -210px;margin-top: -50px;z-index: 99999;"><a id="setTime1" href="javascript:;" style="float: left;display:block;width:200px;height:100px;margin-right:20px;background: #000;text-align: center;line-height: 100px;font-size: 20px;color: #f00;">开始请求</a><a id="clertTime1" href="javascript:;" style="float: left;display:block;width:200px;height:100px;background: #000;text-align: center;line-height: 100px;font-size: 20px;color: #f00;">停止请求</a></div>');
        $('body').on('click','#clertTime1',function(){
            clearInterval(timeTime1);
        });
        $('body').on('click','#setTime1',function(){
            clearInterval(timeTime1);
            timeTime1 = setInterval(()=>{
                // timeTime1 = setTimeout(()=>{
                inter();
            },500);
        });
        function inter(){
            $('#J_proAddcart').remove();
            $('#J_bigtapSoldout,.modal-backdrop.fade.in').css('display','none');
            $('#J_buyBtnBox li').eq(0).append('<a href="javascript:void(0);" class="btn btn-primary  btn-biglarge J_proBuyBtn" id="J_proAddcart" data-type="bigtap" data-isbigtap="true" data-name="加入购物车">加入购物车</a>');
            $('#J_proAddcart').click();
            console.log(123);
        }
        //timeTime1 = setInterval(()=>{
        // timeTime1 = setTimeout(()=>{
        //    inter()
        //},600);

    }
    // Your code here...
})();