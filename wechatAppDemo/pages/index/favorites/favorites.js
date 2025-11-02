Page({
  data: {
    favoritesList: [] // 收藏列表数据
  },

  /**
   * 页面加载时获取收藏数据
   */
  onLoad() {
    this.loadFavorites();
  },

  /**
   * 加载本地缓存的收藏数据
   */
  loadFavorites() {
    const favorites = wx.getStorageSync('favorites') || [];
    this.setData({
      favoritesList: favorites
    });
  },

  /**
   * 点击搜索栏跳转到搜索页面
   */
  goToSearchPage() {
    wx.navigateTo({
      url: '/pages/index/favorites/search/search',
      fail: (err) => {
        console.error('跳转搜索页失败：', err);
        wx.showToast({
          title: '跳转失败，请检查路径',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  /**
   * 返回上一页
   */
  navigateBack() {
    wx.navigateBack({ delta: 1 });
  },

  /**
   * 页面显示时刷新数据
   */
  onShow() {
    this.loadFavorites();
  }
});