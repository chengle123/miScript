$(function(){
    var li = '<li>{text} {cargo} {result} {end}<li>';
    var timeing = null;
    var url = '';
    var num = 0;
    
    $('#stop').on('click',function(){
        clearInterval(timeing);
        $('#start').removeClass('active');
        $(this).addClass('active');
        num = 0;
        $('.banben li').on('click',liList);
    })
    $('#start').on('click',function(){
        clearInterval(timeing);
        timeing = setInterval(gain,30);
        //gain();
        $('#stop').removeClass('active');
        $(this).addClass('active');
        $('.banben li').off();
    })

    /*复制cookie
    $('.gain').on('click',function(){
      reloadCookies();
    })
    function reloadCookies() {
    $("tbody").html("");
    chrome.tabs.getSelected(null,
    function(e) {
        chrome.cookies.getAll({
            url: e.url
        },
        function(t) {
            $(t).each(function(t, n) {
                addItem(n, e.url)
            })
        })
    })
    }
    function addItem(e, t) {
        //$.cookie(e.name,e.value)
        document.cookie = e.name + '=' + e.value;
    }*/

    /*获取购买许可*/
    var xhr = new XMLHttpRequest();
    function gain(id){
      var gid = $('.banben li.active').attr('data-gid');
      var t = 'cn'+gid;
      var url = 'http://tp.hd.mi.com/hdget/cn?source=bigtap&product='+gid+'&addcart=1&m=1&_='+(new Date).getTime()+'&jsonpcallback='+t;
      xhr.open("GET", url, false);
      xhr.onreadystatechange = function() {
        //var data = $.parseJSON(xhr.responseText);
        var a = xhr.responseText.split('(');
        var b = a[1].split(')');
        var data = $.parseJSON(b[0]);
        console.log(data)
            var obj = data.status;
            var have = obj[gid].hdstart ? '<p>有货</p>' : '<p>无货</p>';
            num++;
            var text,cargo,result,end,liHTML;
              if (data.login) {
                text = num+'---'+JSON.stringify(obj);
                cargo = have;
              } else {
                text = num+'---'+"操作出现错误，请稍后重试！";
              }

              if(obj[gid].hdurl){
                result = '<p style="color:#f00;">抢中啦！！！</p>';
                getCart(obj[gid].hdurl);
              }else{
                result = '<p>排队中...</p>';
              }

              if(obj[gid].hdstart == true && obj[gid].hdstop == false){
                //clearInterval(timeing);
                //gain();
                end = '<p>'+$('.banben li.active').text()+' 继续</p>'
              }else{
                clearInterval(timeing);
                end = '<p style="color:#f00;">'+$('.banben li.active').text()+' 结束</p>';
                $('.banben li').off().on('click',liList);
              }
              liHTML = li.replace('{text}',text).replace('{cargo}',cargo).replace('{result}',result).replace('{end}',end);
              $('#data ul').prepend(liHTML);
      }
      xhr.send();
    }

    /*function gain(id){
      var gid = $('.banben li.active').attr('data-gid');
      var t = 'cn'+gid;
        $.ajax({
          type: 'GET',
          url: 'http://tp.hd.mi.com/hdget/cn?source=bigtap&product='+gid+'&addcart=1&m=1&_='+(new Date).getTime(),
          async: false,
           dataType: "jsonp",
           //dataType: "json",
           jsonp: "jsonpcallback",
          //json: "jsoncallback",
          jsonpCallback: t,
          //crossDomain: true,
          timeout: 5000,
          success: function(data) {
            //var html = $('#data ul').html();
            var obj = data.status;
            var have = obj[gid].hdstart ? '<p>有货</p>' : '<p>无货</p>';
            num++;
            var text,cargo,result,end,liHTML;
            //console.log(data)

              if (data.login) {
                // liHTML = li.replace('{text}',num+'---'+JSON.stringify(obj));
                // liHTML = li.replace('{cargo}',have);
                text = num+'---'+JSON.stringify(obj);
                cargo = have;
              } else {
                //liHTML = li.replace('{text}',num+'---'+"操作出现错误，请稍后重试！");
                text = num+'---'+"操作出现错误，请稍后重试！";
              }

              if(obj[gid].hdurl){
                //liHTML = li.replace('{result}','<p style="color:#f00;">抢中啦！！！</p>');
                result = '<p style="color:#f00;">抢中啦！！！</p>';
                getCart(obj[gid].hdurl);
              }else{
                //liHTML = li.replace('{result}','<p>排队中...</p>');
                result = '<p>排队中...</p>';
              }
              //html+=liHTML
              //$('#data ul').html(html);
              

              if(obj[gid].hdstart == true && obj[gid].hdstop == false){
                clearInterval(timeing);
                gain();
                end = '<p>继续</p>'
              }else{
                //liHTML = li.replace('{end}','<p style="color:#f00;">'+$('.banben li.active').text()+' 结束</p>');
                end = '<p style="color:#f00;">'+$('.banben li.active').text()+' 结束</p>';
                $('.banben li').off().on('click',liList);
              }
              liHTML = li.replace('{text}',text).replace('{cargo}',cargo).replace('{result}',result).replace('{end}',end);
              $('#data ul').append(liHTML);



              
              // 36---{
              //   "2160700017":{
              //     "hdstart":true,
              //     "hdstop":false,
              //     "hdurl":"eec45fbf4fb970c7a2100f50095a887ae74,79575627,2160700017,1460426409,1,1,000,bigtap,"
              //   }
              // }
              

          },
          error: function() {
          }
        });
    }*/
    /*加入购物车*/
    function getCart(t){
      var gid = $('.banben li.active').attr('data-gid');
      //console.log('cart.mi.com/cart/add/' + gid + "?source=bigtap&token=" + t)
      $.ajax({
          type: "GET",
          url: 'http://cart.mi.com/cart/add/' + gid + "?source=bigtap&token=" + t,
          dataType: "json",
          json: "jsoncallback",
          success: function(e) {
            console.log(e)
              //t.stopQueue(),
              //"function" == typeof t.config.callback && t.config.callback(e, t.config.obj),
              //MI.updateMiniCart()
          }
      })
    }
    $('.banben li').on('click',liList);
    function liList(){
      $('.banben li').removeClass('active');
      $(this).addClass('active');
    }
})