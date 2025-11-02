// pages/medal/medal.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    totalMedals: 12,
    earnedMedals: 5,
    progress: 42,
    medalList: [
      {
        id: 1,
        name: "学习先锋",
        description: "连续学习7天",
        icon: "/images/mine_icons/medal/learning_pioneer.png",
        earned: true,
        earnedDate: "2024-01-15",
        hint: "连续学习7天即可获得"
      },
      {
        id: 2,
        name: "考试达人",
        description: "完成10次考试",
        icon: "/images/mine_icons/medal/exam_master.png",
        earned: true,
        earnedDate: "2024-01-20",
        hint: "完成10次考试即可获得"
      },
      {
        id: 3,
        name: "满分王者",
        description: "获得一次满分",
        icon: "/images/mine_icons/medal/full_score_king.png",
        earned: false,
        hint: "任何一次考试获得满分"
      },
      {
        id: 4,
        name: "坚持不懈",
        description: "连续学习30天",
        icon: "/images/mine_icons/medal/persistent.png",
        earned: true,
        earnedDate: "2024-02-01",
        hint: "连续学习30天即可获得"
      },
      {
        id: 5,
        name: "知识收藏家",
        description: "收藏50个知识点",
        icon: "/images/mine_icons/medal/knowledge_collector.png",
        earned: false,
        hint: "收藏50个知识点"
      },
      {
        id: 6,
        name: "早起鸟儿",
        description: "早上6点前学习",
        icon: "/images/mine_icons/medal/early_bird.png",
        earned: true,
        earnedDate: "2024-01-18",
        hint: "早上6点前开始学习"
      },
      {
        id: 7,
        name: "夜猫子",
        description: "晚上11点后学习",
        icon: "/images/mine_icons/medal/night_owl.png",
        earned: false,
        hint: "晚上11点后仍在学习"
      },
      {
        id: 8,
        name: "社交达人",
        description: "邀请5位好友",
        icon: "/images/mine_icons/medal/social_butterfly.png",
        earned: true,
        earnedDate: "2024-01-25",
        hint: "成功邀请5位好友"
      }
    ]
  },

  /**
   * 点击勋章事件
   */
  onMedalTap: function(e) {
    const medal = e.currentTarget.dataset.medal;
    
    if (medal.earned) {
      // 已获得的勋章，显示详情
      wx.showModal({
        title: medal.name,
        content: `描述: ${medal.description}\n获得时间: ${medal.earnedDate}`,
        showCancel: false,
        confirmText: '知道了'
      });
    } else {
      // 未获得的勋章，显示获取条件
      wx.showModal({
        title: medal.name,
        content: `获取条件: ${medal.hint}`,
        showCancel: false,
        confirmText: '去完成'
      });
    }
  },

  /**
   * 跳转到任务页面
   */
  goToTasks: function() {
    wx.showToast({
      title: '跳转到任务页面',
      icon: 'none'
    });
    // 实际使用时取消注释下面的代码
    // wx.navigateTo({
    //   url: '/pages/tasks/tasks'
    // });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.calculateProgress();
  },

  /**
   * 计算勋章进度
   */
  calculateProgress: function() {
    const earnedCount = this.data.medalList.filter(medal => medal.earned).length;
    const totalCount = this.data.medalList.length;
    const progress = Math.round((earnedCount / totalCount) * 100);
    
    this.setData({
      earnedMedals: earnedCount,
      totalMedals: totalCount,
      progress: progress
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 可以在这里更新勋章数据
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '我的勋章墙',
      path: '/pages/medal/medal'
    };
  }
});