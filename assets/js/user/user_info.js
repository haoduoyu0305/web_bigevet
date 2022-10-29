$(function () {
  var form = layui.form
  var layer = layui.layer
  form.verify({
    nikename: function (value) {
      if (value.length > 6) {
        return '昵称长度必须在1~6个字符'
      }
    },
  })
  initUserInfo()
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败')
        }
        console.log(res)
        //调用form.val()快速为表单赋值
        form.val('formUserInfo', res.data)
      },
    })
  }
  //重置表单的数据
  $('#btnReset').on('click', function (e) {
    e.preventDefault()
    initUserInfo()
  })

  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新失败')
        }
        layer.msg('更新成功')
        //调用父页面的方法
        window.parent.getUserInfo()
      },
    })
  })
})
