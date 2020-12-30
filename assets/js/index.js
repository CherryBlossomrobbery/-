$(function () {
    getUserInfo()
    $('#tuichu').click(function () {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = '/login.html'

            // 关闭 confirm 询问框
            layer.close(index)
        })
    })
})
// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 请求头配置对象
        success: function (res) {
            if (res.status != 0) {
                return console.log('请求失败');
            }
            console.log(res);
            renderAvatar(res.data)
        },
       
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic != null) {
        $('.text-avatar').hide()
        $('.layui-nav-img').prop('src', user.user_pic).show()
    } else {
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').prop('src', user.user_pic).hide()
    }
}