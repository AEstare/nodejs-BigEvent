$(function(){
    const form=layui.form
    const layer=layui.layer

    // 验证规则
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须为6-12位，且不能出现空格'],
        samepwd:function(value){
            if(value===$('[name=oldPwd]').val()){
                return '新旧密码不能相同！'
            }
        },
        repwd:function(value){
            if(value!==$('[name=newPwd]').val()){
                return '两次密码不一致！'
            }
        },
    })

    // 重置表单数据
    $('#btnReset').on('click',function(e){
        // 阻止表单默认重置
        e.preventDefault()
        $('.layui-form')[0].reset()
    })

    // 监听表单提交事件
    $('.layui-form').on('submit',function(e){
        // 阻止表单默认提交
        e.preventDefault()
        // 发起ajax请求
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('修改密码失败')
                }
                layer.msg('修改密码成功')
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})