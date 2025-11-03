// pages/index/trains/result/result.js
Page({
  data: {
    score: 0,
    total: 0,
    scoreRatio: 0,
    accuracy: '0.0'
  },

  onLoad: function(options) {
    const score = parseInt(options.score) || 0;
    const total = parseInt(options.total) || 1;
    const scoreRatio = total > 0 ? score / total : 0;
    const accuracy = (scoreRatio * 100).toFixed(1);
    
    this.setData({
      score: score,
      total: total,
      scoreRatio: scoreRatio,
      accuracy: accuracy
    });
  },
  
  // 查看错题 - 使用 navigateTo 跳转到新页面
  reviewQuestions: function() {
    console.log('点击了查看错题按钮');
    
    wx.switchTab({
      url: '/pages/index2/index',
      success: (res) => {
        console.log('跳转成功', res);
      },
      fail: (err) => {
        console.log('跳转失败', err);
        wx.showToast({
          title: '跳转失败: ' + (err.errMsg || '未知错误'),
          icon: 'none',
          duration: 3000
        });
      }
    });
  },

  restartPractice: function() {
    wx.redirectTo({
      url: '/pages/index/trains/trains'
    });
  },

  returnToChapter: function() {
    wx.navigateBack({
      delta: 2
    });
  }
})