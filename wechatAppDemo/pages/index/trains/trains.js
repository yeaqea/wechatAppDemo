Page({
  /**
   * 页面的初始数据
   */
  data: {
    trainingList: [
      { id: 1, title: '第一章：函数、极限与连续', total: 50, completed: 12, selected: false },
      { id: 2, title: '第二章：导数与微分', total: 45, completed: 0, selected: false },
      { id: 3, title: '第三章：微分中值定理与导数的应用', total: 60, completed: 0, selected: false },
      { id: 4, title: '第四章：不定积分', total: 40, completed: 0, selected: false }
    ],
    allSelected: false,
    hasSelected: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 切换选择状态
   */
  toggleItem(e) {
    const index = e.currentTarget.dataset.index;
    const trainingList = [...this.data.trainingList];
    
    trainingList[index].selected = !trainingList[index].selected;
    
    // 检查是否全选
    const allSelected = trainingList.every(item => item.selected);
    // 检查是否有选中项
    const hasSelected = trainingList.some(item => item.selected);
    
    this.setData({
      trainingList,
      allSelected,
      hasSelected
    });
  },

  /**
   * 全选/取消全选
   */
  toggleSelectAll() {
    const allSelected = !this.data.allSelected;
    const trainingList = this.data.trainingList.map(item => ({
      ...item,
      selected: allSelected
    }));
    
    this.setData({
      trainingList,
      allSelected,
      hasSelected: allSelected
    });
  },

  /**
   * 开始练习
   */
  startTraining() {
    if (!this.data.hasSelected) {
      wx.showToast({
        title: '请选择练习章节',
        icon: 'none'
      });
      return;
    }
    
    // 获取选中的章节
    const selectedItems = this.data.trainingList.filter(item => item.selected);
    
    // 跳转到练习页面
    wx.navigateTo({
      url: `/pages/index/trains/practice?chapters=${JSON.stringify(
        selectedItems.map(item => item.id)
      )}`
    });
  }
})