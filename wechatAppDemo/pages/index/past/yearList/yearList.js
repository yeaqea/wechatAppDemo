Page({
  /**
   * 页面的初始数据
   */
  data: {
    categoryId: '',       // 分类ID
    categoryName: '',     // 分类名称（如“全国卷Ⅰ”）
    years: []             // 年份列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 接收从真题主页面传递的参数
    if (options) {
      this.setData({
        categoryId: options.categoryId || '',
        categoryName: options.categoryName || '历年真题',
        years: options.years ? JSON.parse(options.years) : []
      });
    }
  },

  /**
   * 选择年份，跳转到对应真题试卷
   */
  selectYear(e) {
    const year = e.currentTarget.dataset.year;
    if (!year) return;

    wx.navigateTo({
      url: `/pages/index/past/examPaper/examPaper?categoryId=${this.data.categoryId}&categoryName=${this.data.categoryName}&year=${year}`,
      fail: (err) => {
        console.error('跳转真题试卷失败：', err);
        wx.showToast({ title: '跳转失败', icon: 'none' });
      }
    });
  },

  /**
   * 返回上一页
   */
  navigateBack() {
    wx.navigateBack({ delta: 1 });
  }
})