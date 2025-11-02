// wechatAppDemo/pages/sousuo/index.js
Page({
  data: {
    searchHistory: ["考研英语", "政治技巧", "自律方法"], // 模拟搜索历史
    searchResult: [], // 搜索结果
    showHistory: true, // 显示历史记录
    showResult: false // 显示搜索结果
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  // 取消搜索，返回上一页
  cancelSearch() {
    wx.navigateBack();
  },

  // 跳转到文章详情页
  goToDetail(e) {
    const articleId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/index1/detail/detail?id=" + articleId
    });
  }
});