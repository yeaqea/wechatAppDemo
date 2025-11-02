Page({
  data: {
    paperId: '',    // 从列表页传递的真题标识（如national1）
    title: '',      // 真题标题（如“全国卷I”）
    yearList: []    // 该真题包含的年份列表
  },

  onLoad(options) {
    // 接收从真题列表页传递的参数
    this.setData({
      paperId: options.paperId,
      title: options.title
    });
    
    // 加载该真题包含的年份数据（实际项目中替换为接口请求）
    this.loadYearData();
  },

  // 加载年份数据（示例：模拟数据）
  loadYearData() {
    // 根据paperId返回对应年份数据（实际项目中通过接口获取）
    const mockYearData = {
      national1: [
        { year: 2023, questionCount: 30 },
        { year: 2022, questionCount: 30 },
        { year: 2021, questionCount: 30 }
      ],
      national2: [
        { year: 2023, questionCount: 30 },
        { year: 2022, questionCount: 30 }
      ],
      beijing: [
        { year: 2023, questionCount: 25 },
        { year: 2022, questionCount: 25 }
      ]
      // 其他真题的年份数据...
    };

    this.setData({
      yearList: mockYearData[this.data.paperId] || []
    });
  },

  // 点击年份，进入具体真题答题页面（跳转至exercise或自定义答题页）
  goToQuestion(e) {
    const year = e.currentTarget.dataset.year; // 可在wxml中通过data-year绑定年份
    wx.navigateTo({
      url: `/pages/index/exercise/exercise?paperId=${this.data.paperId}&year=${year}`
    });
  }
});