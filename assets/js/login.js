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
    const layer=layui.layer
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


    // 监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        // 阻止默认提交
        e.preventDefault()
        // 发起ajax请求
        const data={username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()}
        $.post('/api/reguser',data,function(res){
            if(res.status!==0) {
                // return console.log(res.message);
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登陆')
            // 模拟点击，跳转到登陆页面
            $('#link_login').click()
        })
    })

    // 监听登陆表单提交事件
    $('#form_login').submit(function(e){
        // 阻止默认提交行为
        e.preventDefault()
        // 发起ajax请求
        $.ajax({
            url:'/api/login',
            method:'POST',
            // 快速获取表单数据
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0) return layer.msg('登陆失败')
                layer.msg('登陆成功')
                // 将登陆成功后的token保存到localStorage中
                localStorage.setItem('token',res.token)
                // 跳转到后台主页
                location.href='/nodejs/big_event/大事件项目/index.html'
            }
        })
    })
})

