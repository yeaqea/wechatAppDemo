Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeTab: 'today', // 默认选中今日错题
    todayErrors: [], // 今日错题数据
    allErrors: [], // 全部错题数据
    currentCount: 0 // 当前选中标签的错题数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('页面加载参数：', options);
    // 初始化模拟数据
    this.initErrorData();
  },

  /**
   * 初始化错题数据
   */
  initErrorData() {
    // 模拟今日错题数据（2道）
    const todayErrors = [
      {
        type: '选择题',
        time: '今天 09:23',
        question: '以下哪个不是微信小程序的配置文件格式？',
        yourAnswer: 'C. .vue',
        correctAnswer: 'D. .react'
      },
      {
        type: '判断题',
        time: '今天 14:15',
        question: '微信小程序的页面生命周期函数onLoad只会执行一次？',
        yourAnswer: '错误',
        correctAnswer: '正确'
      }
    ];

    // 模拟全部错题数据（5道，包含今日2道）
    const allErrors = [
      ...todayErrors,
      {
        type: '填空题',
        time: '2025-10-29',
        question: '微信小程序的视图层文件后缀是______',
        yourAnswer: '.html',
        correctAnswer: '.wxml'
      },
      {
        type: '选择题',
        time: '2025-10-28',
        question: '小程序页面间跳转最多能传递多少层级？',
        yourAnswer: '5层',
        correctAnswer: '10层'
      },
      {
        type: '判断题',
        time: '2025-10-27',
        question: '小程序可以直接操作DOM元素？',
        yourAnswer: '正确',
        correctAnswer: '错误'
      }
    ];

    this.setData({
      todayErrors,
      allErrors,
      currentCount: todayErrors.length // 初始显示今日错题数量
    });
  },

  /**
   * 切换标签（今日/全部）
   */
  switchTab(e) {
    // 从data-tab中获取切换参数（today/all）
    const tab = e.currentTarget.dataset.tab;
    console.log('切换到：', tab);

    // 更新选中状态和错题数量
    this.setData({
      activeTab: tab,
      currentCount: tab === 'today' ? this.data.todayErrors.length : this.data.allErrors.length
    });
  },

  // 以下方法无修改，沿用之前的
  goChoice: function () {
    console.log('点击选择题');
    wx.navigateTo({
      url: '/pages/index2/choicePractice/choicePractice',
      fail: (err) => {
        console.error('跳转选择题页面失败:', err);
        wx.showToast({
          title: '页面不存在或路径错误',
          icon: 'none'
        });
        // 调试信息
        console.log('尝试跳转的路径:', '/pages/index2/choicePractice/choicePractice');
      }
    })
  },

  /**
   * 跳转到填空题练习页面
   */
  goBlank: function () {
    console.log('点击填空题');
    wx.navigateTo({
      url: '/pages/index2/blankPractice/blankPractice',
      fail: (err) => {
        console.error('跳转填空题页面失败:', err);
        wx.showToast({
          title: '页面不存在或路径错误',
          icon: 'none'
        });
        console.log('尝试跳转的路径:', '/pages/index2/blankPractice/blankPractice');
      }
    })
  },

  /**
   * 跳转到判断题练习页面
   */
  goJudge: function () {
    console.log('点击判断题');
    wx.navigateTo({
      url: '/pages/index2/judgePractice/judgePractice',
      fail: (err) => {
        console.error('跳转判断题页面失败:', err);
        wx.showToast({
          title: '页面不存在或路径错误',
          icon: 'none'
        });
        console.log('尝试跳转的路径:', '/pages/index2/judgePractice/judgePractice');
      }
    })
  },
  goHome: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  goArticle: function () {
    wx.switchTab({
      url: '/pages/article/article',
    })
  },
  goRank: function () {
    wx.switchTab({
      url: '/pages/rank/rank',
    })
  },
  goMine: function () {
    wx.switchTab({
      url: '/pages/mine/mine',
    })
  },
})