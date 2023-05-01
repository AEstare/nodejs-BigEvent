// 每次调用$.get()或$.post或$.ajax时
// 会先调用ajaxPrefilter这个函数
// 这个函数可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options){
    // 在发起真正的ajax之前统一拼接请求的根路径
    options.url='http://127.0.0.1:8080'+options.url
    console.log(options.url);
})