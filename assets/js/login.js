$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    let form = layui.form
    var layer = layui.layer
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            let val = $('.reg-box [name=password]').val()
            if (val != value) {
                return '两次密码不一致!'
            }
        }
    })
    $('#reg').on('submit', function (e) {
        e.preventDefault()
        let reg = $(this).serialize()
        // console.log(reg);
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#reg [name=username]').val(),
                password: $('#reg [name=password]').val()
            },
            success: function (res) {
                if (res.status != 0) {
                    return console.log(layer.msg(res.message));

                }
                console.log(layer.msg('注册成功！'));
                $('#link_login').click()
            }
        })
    })
    $('#login').on('submit', function (e) {
        e.preventDefault()
        var data = $(this).serialize()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: data,
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                localStorage.setItem('token',res.token)
                location.href='/index.html'
            }
        })
    })
})