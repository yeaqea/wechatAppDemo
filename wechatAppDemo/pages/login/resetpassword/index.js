Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  handleRegister: function() {
    // 直接跳转到登录界面，不需要任何验证
    wx.redirectTo({
      url: '/pages/login/login/index',
      success: function() {
        console.log('跳转到登录界面成功');
      },
      fail: function(err) {
        console.error('跳转失败:', err);
        // 如果 redirectTo 失败，尝试其他方式
        wx.navigateBack({
          delta: 2 // 返回两级页面到登录页
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