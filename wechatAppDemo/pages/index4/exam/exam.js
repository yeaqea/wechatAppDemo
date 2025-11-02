Page({
  /**
   * 页面的初始数据
   */
  data: {
    examList: [
      {
        id: 1,
        title: '2024年第一季度业务能力考试',
        status: 'completed',
        score: 85,
        totalScore: 100,
        date: '2024-03-15',
        time: '09:00-11:00',
        duration: '120分钟'
      },
      {
        id: 2,
        title: '安全生产知识专项考试',
        status: 'ongoing',
        score: null,
        totalScore: 100,
        date: '2024-03-20',
        time: '14:00-15:30',
        duration: '90分钟'
      },
      {
        id: 3,
        title: '专业技能等级认证考试',
        status: 'upcoming',
        score: null,
        totalScore: 100,
        date: '2024-04-01',
        time: '10:00-12:00',
        duration: '120分钟'
      },
      {
        id: 4,
        title: '法律法规基础知识考试',
        status: 'completed',
        score: 92,
        totalScore: 100,
        date: '2024-02-10',
        time: '09:30-11:00',
        duration: '90分钟'
      }
    ],
    activeTab: 'all',
    // 添加一个字段来存储筛选后的列表
    filteredExamList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('我的考试页面加载');
    // 初始化时显示全部考试
    this.filterExamList('all');
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
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 1000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('触底加载更多');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '我的考试',
      path: '/pages/index/exam/exam'
    };
  },

  /**
   * 切换标签页并筛选考试列表
   */
  switchTab: function (e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab
    });
    this.filterExamList(tab);
  },

  /**
   * 筛选考试列表
   */
  filterExamList: function(tab) {
    const { examList } = this.data;
    let filteredList = [];
    
    switch(tab) {
      case 'all':
        filteredList = examList;
        break;
      case 'ongoing':
        filteredList = examList.filter(item => item.status === 'ongoing');
        break;
      case 'completed':
        filteredList = examList.filter(item => item.status === 'completed');
        break;
      case 'upcoming':
        filteredList = examList.filter(item => item.status === 'upcoming');
        break;
      default:
        filteredList = examList;
    }
    
    this.setData({
      filteredExamList: filteredList
    });
  },

  /**
   * 查看考试详情
   */
  viewExamDetail: function (e) {
    const examId = e.currentTarget.dataset.id;
    // 从原始数据中查找考试信息，确保能找到所有状态的数据
    const exam = this.data.examList.find(item => item.id === examId);
    
    if (!exam) return;
    
    if (exam.status === 'completed') {
      wx.showModal({
        title: exam.title,
        content: `考试成绩：${exam.score}分\n考试时间：${exam.date}`,
        showCancel: false
      });
    } else if (exam.status === 'ongoing') {
      wx.showModal({
        title: '继续考试',
        content: '确定要继续进行考试吗？',
        success: (res) => {
          if (res.confirm) {
            wx.showToast({
              title: '进入考试中...',
              icon: 'loading'
            });
          }
        }
      });
    } else {
      wx.showModal({
        title: exam.title,
        content: `考试时间：${exam.date} ${exam.time}\n考试时长：${exam.duration}`,
        showCancel: false
      });
    }
  },

  /**
   * 开始考试
   */
  startExam: function (e) {
    const examId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '开始考试',
      content: '确定要开始考试吗？考试开始后计时将不会停止。',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '考试准备中...',
            icon: 'loading'
          });
        }
      }
    });
  },

  /**
   * 阻止事件冒泡
   */
  stopPropagation: function (e) {
    // 阻止事件冒泡
  }
})