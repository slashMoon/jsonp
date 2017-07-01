/**
 * 
 * @param {*请求路径} url 
 * @param {*请求参数} params 
 * @param {*回调函数} callback 
 */ 
 
 function jsonp(url, params, callback) {
        url += '?';
        for (var k in params) {
          url += k + '=' + params[k] + '&';
        }

        var callbackName = 'moon_' + (new Date() - 0);
        url += 'callback=' + callbackName;

        // 现在随机生成的函数名字： callbackName 这个变量，来创建一个全局函数
        // window[callbackName] = callback;
        window[callbackName] = function (data) {
          callback(data);

          // 将追加到 head 中的script标签删除
          document.head.removeChild(script);
          delete window[callbackName];
        };

        // 动态创建script标签
        var script = document.createElement('script');
        script.src = url;
        // 只有添加到页面中，浏览器才会发送请求
        document.head.appendChild(script);
      }