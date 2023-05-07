$(function(){
    const layer=layui.layer
    // 1.1获取裁剪区域的DOM元素
    const $image = $('#image')
    // 1.2配置选项
    const options = {
        // 纵横比 
        // 指定裁剪框大小
        aspectRatio: 1,
        //指定预览区域
        preview: ".img-preview"
    }
    // 1.3创建裁剪区域
    $image.cropper(options)

    // 为上传绑定点击事件
    $('#btnChooseImage').on('click',function(){
        $('#file').click()
    })

    // 为文件选择框添加change事件
    $('#file').on('change',function(e){
        // 获取用户上传的图片
        const filelist=e.target.files
        if(filelist.length===0){
            return layer.msg('请选择照片！')
        }
        const file=e.target.files[0]
        const newImgURL=URL.createObjectURL(file)
        //销毁就的裁剪区域        重新设置图片路径        重新初始化裁剪区域
        $image.cropper('destroy').attr('src',newImgURL).cropper(options)
    })

    // 为确定按钮绑定点击提交事件
    $('#btnUpload').on('click',function(){
        // 拿到用户裁剪后的头像
        const dataURL=$image.cropper('getCroppedCanvas',{
            // 创建一个canvas画布
            width:100,
            height:100
        }).toDataURL('image/png')  //将canvas画布上的内容，转换为base64格式的字符串
        // 调用接口，把头像上传服务器
        $.ajax({
            method:'POST',
            url:'/my/update/avatar',
            data:{
                avatar:dataURL,
            },
            success:function(res){
                if(res.status!==0){
                    return layer.msg('更换头像失败')
                }
                layer.msg('更换头像成功')
                window.parent.getUserInfo()
            }
        })
    })
})