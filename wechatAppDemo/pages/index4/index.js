Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: '张三',
    signature: '',
    avatar: '/images/mine_icons/default_photo.png',
    aboutVisible: false
  },

  onLoad: function(options) {
    this.loadUserInfo();
  },

  onShow: function() {
    this.loadUserInfo();
  },

  /**
   * 加载用户信息
   */
  loadUserInfo: function() {
    const app = getApp();
    const userInfo = app.globalData.userInfo;
    
    if (userInfo) {
      this.setData({
        username: userInfo.username || '张三',
        signature: userInfo.signature || '',
        avatar: userInfo.avatar || '/images/mine_icons/default_photo.png'
      });
    }
  },

  /**
   * 更新用户信息（供设置页面调用）
   */
  updateUserInfo: function(userData) {
    this.setData({
      username: userData.username,
      signature: userData.signature,
      avatar: userData.avatar
    });
  },

  /**
   * 跳转到我的考试页面
   */
  goToExam: function() {
    wx.navigateTo({
      url: '/pages/index4/exam/exam'
    })
  },

  /**
   * 跳转到我的勋章页面
   */
  goToMedal: function() {
    wx.navigateTo({
      url: '/pages/index4/medal/medal'
    })
  },

  /**
   * 跳转到我的收藏页面
   */
  goToStar: function() {
    wx.navigateTo({
      url: '/pages/index4/star/star'
    })
  },

  /**
   * 跳转到用户反馈页面
   */
  goToFeedback: function() {
    wx.openPrivacyContract();
  },

  /**
   * 跳转到关于我们页面
   */
  goToAbout: function() {
    wx.navigateTo({
      url: '/pages/index4/about/about'
    })
  },

  /**
   * 跳转到个人设置页面
   */
  goToSetting: function() {
    wx.navigateTo({
      url: '/pages/index4/setting/setting'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  handleCatch: function() {

  },

  /**
   * 关于我们
   */
  handleAbout: function() {
    this.setData({ aboutVisible: true });
  },

  /**
   * 关闭关于我们
   */
  handleCloseAbout: function() {
    this.setData({ aboutVisible: false });
  }
})