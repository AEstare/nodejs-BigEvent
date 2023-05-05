$(function(){
    // 调用获取用户基本信息
    getUserInfo()

    const layer=layui.layer

    // 点击按钮实现退出功能
    $('#btnLogout').on('click',function(){
        // 提示用户时候退出
        layer.confirm('确定退出登陆?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 1.清空本地存储的token
            localStorage.removeItem('token')
            // 2.重新跳转登录页
            location.href='/nodejs/big_event/大事件项目/login.html'
            
            // 官迷confirm询问框
            layer.close(index);
          });
    })
})

// 获取用户基本信息
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // 请求头配置对象
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success:function(res){
            if(res.status!==0){
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用renderavatar渲染用户头像
            renderAvatar(res.data)
        },

        // 不论成功还是失败都会调用complete回调函数
        // complete:function(res){
        //     // console.log('执行了');
        //     // console.log(res);
        //     // 在complete回调函数中可以使用res.responseJSON获取服务器的响应信息
        //     if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败'){
        //         // 1.强制清空本地存储的token
        //         localStorage.removeItem('token')
        //         // 2.重新跳转登录页
        //         location.href='/nodejs/big_event/大事件项目/login.html'
        //     }
            
        // }
    })
}

// 渲染用户头像
function renderAvatar(user){
    // 获取用户名称
    const name=user.nickname||user.username
    // 设置欢迎的文本
    $('#welcome').html(`欢迎&nbsp;&nbsp;${name}`)
    // 按需渲染用户头像
    if(user.user_pic!==null){
        // 渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        // 渲染文本头像
        $('.layui-nav-img').hide()
        const first=name[0]
        $('.text-avatar').html(first).show()
    }
}