// index.js
Page({
  data: {
    studyDays: 0,
    accuracy: 0,
    ranking: 0,
    currentTab: 'index',
    currentPage: 0,
    menuItems: [
      { id: 1, name: '顺序练习', icon: '📝', iconClass: 'icon-1', page: 'trains' },
      { id: 2, name: '我的错题', icon: '❌', iconClass: 'icon-2', page: 'mistakes' },
      { id: 3, name: '题型刷题', icon: '📊', iconClass: 'icon-3', page: 'exercise' },
      { id: 4, name: '模拟考试', icon: '⏱️', iconClass: 'icon-4', page: 'exam' },
      { id: 5, name: '历年真题', icon: '📄', iconClass: 'icon-5', page: 'past' },
      { id: 6, name: '我的收藏', icon: '⭐', iconClass: 'icon-6', page: 'favorites' }
    ],
    username: '张三',
    signature: '',
    avatar: '/images/mine_icons/default_photo.png',
  },

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

  updateUserInfo: function(userData) {
    this.setData({
      username: userData.username,
      signature: userData.signature,
      avatar: userData.avatar
    });
  },

  onLoad() {
    // 从全局获取用户信息
    const app = getApp()
    this.loadUserInfo();
    
    // 模拟加载学习数据
    this.loadStudyData()
  },

  onShow() {
    // 页面显示时刷新数据
    this.loadStudyData()
    this.loadUserInfo();
  },

  loadStudyData() {
    // 模拟从缓存或服务器加载数据
    const studyDays = wx.getStorageSync('studyDays') || 0
    const accuracy = wx.getStorageSync('accuracy') || 0
    const ranking = wx.getStorageSync('ranking') || 0
    
    this.setData({
      studyDays,
      accuracy,
      ranking
    })
  },

  // 导航到功能页面
  navigateToPage(e) {
    const page = e.currentTarget.dataset.page
    if (page ==='trains') {
      wx.navigateTo({
        url: '/pages/index/trains/trains'
      })
    }
    else if (page ==='exercise') {
      wx.navigateTo({
        url: '/pages/index/exercise/exercise'
      })
    }
    else if (page ==='exam') {
      wx.navigateTo({
        url: '/pages/index/exam/exam'
      })

    }
    else if (page ==='past') {
      wx.navigateTo({
        url: '/pages/index/past/past'
      })
    }
    else if (page ==='favorites') {
      wx.navigateTo({
        url: '/pages/index/favorites/favorites'
      })
    }
    else if (page ==='mistakes') {
      wx.navigateTo({
        url: '/pages/index/mistakes/mistakes'
      })
    }
    // 实际开发中可以跳转到对应页面
    // wx.navigateTo({
    //   url: `/pages/${page}/${page}`
    // })
  },

  // 切换页面
  switchPage(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      currentPage: index
    })
  },

  // 切换标签页
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({
      currentTab: tab
    })
    
    if (tab !== 'index') {
      wx.showToast({
        title: `切换到${this.getTabName(tab)}`,
        icon: 'none'
      })
    }
  },

  // 查看全部
  navigateToAll() {
    wx.showToast({
      title: '查看全部功能',
      icon: 'none'
    })
  },

  // 查看更多考试
  navigateToExams() {
    wx.showToast({
      title: '查看更多考试',
      icon: 'none'
    })
  },

  // 获取页面名称
  getPageName(page) {
    const names = {
      'sequence': '顺序练习',
      'mistakes': '我的错题',
      'type': '题型刷题',
      'exam': '模拟考试',
      'past': '历年真题',
      'favorites': '我的收藏'
    }
    return names[page] || '未知页面'
  },

  // 获取标签页名称
  getTabName(tab) {
    const names = {
      'index': '首页',
      'report': '学习报告',
      'question': '题库',
      'profile': '个人中心'
    }
    return names[tab] || '未知标签'
  }
})