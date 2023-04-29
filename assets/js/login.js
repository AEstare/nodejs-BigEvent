$(function(){
    // 点击‘去注册’的链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击‘去登陆’链接
    $('#link_login').on('click',function(){
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 从layui获取form对象
    const form=layui.form
    // 通过form.verify()来自定义校验规则
    form.verify({
        // 自定义一个叫做pwd的校验规则
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'], 
        // 校验两次密码是否一致
        repwd:function(value){
            // 通过行参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行判断
            // 判断失败return一个错误提示
            const pwd=$('.reg-box [name=password]').val()
            if(pwd!==value){
                return '两次密码不一致'
            }
        }
    })
})