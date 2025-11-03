// pages/index/exercise/exercise.js
Page({
  data: {
    selectedType: '', // 当前选中的题型
    typeOptions: [
      { value: 'single', label: '单选题' },
      { value: 'multiple', label: '多选题' },
      { value: 'judge', label: '判断题' },
      { value: 'fill', label: '填空题' } 
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('题型选择主界面加载');
  },

  /**
   * 选择题型
   */
  selectType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      selectedType: type
    });

    // 跳转到对应子页面
    wx.navigateTo({
      url: `/pages/index/exercise/${type}/${type}`
    });
  }
});