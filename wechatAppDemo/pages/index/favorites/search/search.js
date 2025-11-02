Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchKey: '',
    allFavorites: [],
    filteredList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取所有收藏数据
    const allFavorites = wx.getStorageSync('favorites') || [];
    
    this.setData({
      allFavorites,
      filteredList: allFavorites
    });
  },

  /**
   * 搜索输入处理
   */
  onSearchInput(e) {
    const searchKey = e.detail.value.trim();
    const allFavorites = this.data.allFavorites;
    
    // 根据搜索关键词过滤
    const filteredList = searchKey 
      ? allFavorites.filter(item => 
          item.question.toLowerCase().includes(searchKey.toLowerCase())
        )
      : allFavorites;
    
    this.setData({
      searchKey,
      filteredList
    });
  },

  /**
   * 清除搜索内容
   */
  clearSearch() {
    this.setData({
      searchKey: '',
      filteredList: this.data.allFavorites
    });
  },

  /**
   * 点击搜索结果
   */
  onResultTap(e) {
    const id = e.currentTarget.dataset.id;
    // 跳转到题目详情页
    wx.navigateTo({
      url: `/pages/index/question/detail?id=${id}`
    });
  }
})