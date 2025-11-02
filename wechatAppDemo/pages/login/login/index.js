Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  handleLogin: function() {
    // 直接跳转到首页，不需要验证账号密码
    wx.switchTab({
      url: '/pages/index/index',
      success: function() {
        console.log('跳转到首页成功');
      },
      fail: function(err) {
        console.error('跳转失败:', err);
        // 如果 switchTab 失败，尝试使用 navigateTo
        wx.navigateTo({
          url: '/pages/index/index'
        });
      }
    });
  },
  gotoRegister: function() {
    // 跳转到注册页面
    wx.navigateTo({
      url: '/pages/login/register/index',
      success: function() {
        console.log('跳转到注册页面成功');
      },
      fail: function(err) {
        console.error('跳转到注册页面失败:', err);
        wx.showToast({
          title: '跳转失败',
          icon: 'none'
        });
      }
    });
  },

  gotoForgot: function() {
    // 跳转到忘记密码页面
    wx.navigateTo({
      url: '/pages/login/phone-verification/index',
      success: function() {
        console.log('跳转到忘记密码页面成功');
      },
      fail: function(err) {
        console.error('跳转到忘记密码页面失败:', err);
        wx.showToast({
          title: '跳转失败',
          icon: 'none'
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})