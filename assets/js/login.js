$(function () {
  //点击去注册账号的链接

  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  //去登录的界面
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 自定义校验规则
  //从layui找出form对象 layui类似于 $
  var form = layui.form
  var layer = layui.layer
  form.verify({
    pass: [/^[\S]{6,12}$/, '密码必须6~12位且必须没有空格'],
    repwd: function (value) {
      //通过形参拿到的是确认密码框的内容 拿到密码框的内容 进行一次判断
      var pwd = $('#userPwd').val()
      if (pwd !== value) {
        return '两次密码不匹配'
      }
    },
  })
  //监听注册提交事件
  $('#form_reg').on('submit', function (e) {
    //
    e.preventDefault()
    console.log(1)
    var data = {
      username: $('#userName').val(),
      password: $('#userPwd').val(),
    }
    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return layer.msg('注册失败')
      }
      layer.msg('注册成功请登录')
      $('#link_login').click()
    })
  })

  $('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'POST',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败')
        }
        layer.msg('登录成功')
        //将登录成功得到的token字符串保存到本地
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      },
    })
  })
})
