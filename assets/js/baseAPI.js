// 每次调用$.get()或$.post或$.ajax时
// 会先调用ajaxPrefilter这个函数
// 这个函数可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options){
    // 在发起真正的ajax之前统一拼接请求的根路径
    options.url='http://127.0.0.1:8080'+options.url
    
    // 统一为有权限的接口设置headers请求头
    if(options.url.indexOf('/my/') !== -1){
        options.headers={
            Authorization:localStorage.getItem('token') || ''
        }
    }
    
    // 全局统一挂载compltet回调函数
    options.complete=function(res){
        // console.log('执行了');
        // console.log(res);
        // 在complete回调函数中可以使用res.responseJSON获取服务器的响应信息
        if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败'){
            // 1.强制清空本地存储的token
            localStorage.removeItem('token')
            // 2.重新跳转登录页
            location.href='/nodejs/big_event/大事件项目/login.html'
        }
        
    }
})