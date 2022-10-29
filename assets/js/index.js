$(function () {
  getUserInfo()

  //退出
  var layer = layui.layer
  $('#btnLogout').on('click', function () {
    //提示用户是否退出
    layer.confirm(
      '确定退出登录?',
      { icon: 3, title: '提示' },
      function (index) {
        //退出要做两件事
        //1、清空本地存储的东西 2、跳转登录
        localStorage.removeItem('token')
        location.href = '/login.html'
        layer.close(index)
      }
    )
  })
})

//获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers:请求的配置对象
    // headers: {
    //   Authorization: localStorage.getItem('token'),
    // },
    success: function (res) {
      //console.log(res)
      if (res.status !== 0) {
        return layui.layer.msg('获取失败')
      }

      renderAvatar(res.data)
    },
    // complete: function (res) {
    //   console.log(res)
    //   //回调函数 responseJSON
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === '身份认证失败！'
    //   ) {
    //     console.log(1)
    //     localStorage.removeItem('token')
    //     location.href = '/login.html'
    //   }
    // },
  })
}
//渲染头像
function renderAvatar(user) {
  // 获取名称
  console.log(user)
  var name = user.nickname || user.username
  $('#welcom').html('欢迎&nbsp;&nbsp;' + name)
  //按需要渲染用户头像
  if (user.user_pic !== null) {
    //渲染图片图像
    $('.layui-nav-img').attr('src',user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    //获取首字母
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}
