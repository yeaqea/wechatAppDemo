// pages/collection/collection.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 'all',
    totalCount: 0,
    isEditMode: false,
    isAllSelected: false,
    selectedCount: 0,
    categories: [
      { id: 'tech', name: '技术' },
      { id: 'life', name: '生活' },
      { id: 'study', name: '学习' },
      { id: 'news', name: '资讯' }
    ],
    articles: [],
    filteredArticles: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 从本地存储加载收藏的文章
    const collectedArticles = wx.getStorageSync('collectedArticles') || [];
    if (collectedArticles.length > 0) {
      this.setData({
        articles: collectedArticles
      });
    }
    this.filterArticles();
    this.updateTotalCount();
  },

  /**
   * 切换标签
   */
  switchTab: function(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      currentTab: tab
    }, () => {
      this.filterArticles();
    });
  },

  /**
   * 筛选文章
   */
  filterArticles: function() {
    const { currentTab, articles } = this.data;
    let filtered = articles;

    if (currentTab === 'unread') {
      filtered = articles.filter(article => !article.isRead);
    } else if (currentTab === 'read') {
      filtered = articles.filter(article => article.isRead);
    } else if (currentTab !== 'all') {
      filtered = articles.filter(article => article.category === currentTab);
    }

    this.setData({
      filteredArticles: filtered.map(article => ({
        ...article,
        selected: false
      }))
    });
  },

  /**
   * 查看文章详情
   */
  viewArticle: function(e) {
    if (this.data.isEditMode) return;
    
    const article = e.currentTarget.dataset.article;
    
    // 标记为已读
    this.markAsRead(article.id);
    
    wx.navigateTo({
      url: `/pages/index1/detail/detail?id=${article.id}`,
      success: () => {
        // 可以在这里添加阅读统计
        console.log('查看文章:', article.title);
      }
    });
  },

  /**
   * 标记文章为已读
   */
  markAsRead: function(articleId) {
    const articles = this.data.articles.map(article => {
      if (article.id === articleId) {
        return { ...article, isRead: true };
      }
      return article;
    });

    this.setData({ articles }, () => {
      this.filterArticles();
      this.updateTotalCount();
    });
  },

  /**
   * 取消收藏
   */
  toggleCollect: function(e) {
    const article = e.currentTarget.dataset.article; 
    wx.showModal({
      title: '取消收藏',
      content: `确定要取消收藏"${article.title}"吗？`,
      confirmColor: '#ff4d4f',
      success: (res) => {
        if (res.confirm) {
          this.removeFromCollection(article.id);
        }
      }
    });
  },

  /**
   * 从收藏中移除
   */
  removeFromCollection: function(articleId) {
    const articles = this.data.articles.filter(article => article.id !== articleId);
    
    this.setData({ articles }, () => {
      this.filterArticles();
      this.updateTotalCount();
      wx.showToast({
        title: '已取消收藏',
        icon: 'success'
      });
    });
  },

  /**
   * 切换编辑模式
   */
  toggleEditMode: function() {
    const isEditMode = !this.data.isEditMode;
    
    this.setData({
      isEditMode: isEditMode,
      isAllSelected: false,
      selectedCount: 0
    });

    if (isEditMode) {
      // 进入编辑模式，为每篇文章添加选择状态
      const filteredArticles = this.data.filteredArticles.map(article => ({
        ...article,
        selected: false
      }));
      
      this.setData({ filteredArticles });
    }
  },

  /**
   * 选择/取消选择文章
   */
  toggleSelect: function(e) {
    const articleId = e.currentTarget.dataset.id;
    const filteredArticles = this.data.filteredArticles.map(article => {
      if (article.id === articleId) {
        return { ...article, selected: !article.selected };
      }
      return article;
    });

    const selectedCount = filteredArticles.filter(article => article.selected).length;
    const isAllSelected = selectedCount === filteredArticles.length && filteredArticles.length > 0;

    this.setData({
      filteredArticles,
      selectedCount,
      isAllSelected
    });
  },

  /**
   * 全选/取消全选
   */
  selectAll: function() {
    const isAllSelected = !this.data.isAllSelected;
    const filteredArticles = this.data.filteredArticles.map(article => ({
      ...article,
      selected: isAllSelected
    }));

    this.setData({
      filteredArticles,
      isAllSelected,
      selectedCount: isAllSelected ? filteredArticles.length : 0
    });
  },

  /**
   * 批量删除
   */
  batchDelete: function() {
    if (this.data.selectedCount === 0) {
      wx.showToast({
        title: '请选择要删除的文章',
        icon: 'none'
      });
      return;
    }

    wx.showModal({
      title: '批量删除',
      content: `确定要删除选中的 ${this.data.selectedCount} 篇文章吗？`,
      confirmColor: '#ff4d4f',
      success: (res) => {
        if (res.confirm) {
          this.performBatchDelete();
        }
      }
    });
  },

  /**
   * 执行批量删除
   */
  performBatchDelete: function() {
    const selectedIds = this.data.filteredArticles
      .filter(article => article.selected)
      .map(article => article.id);

    const articles = this.data.articles.filter(article => !selectedIds.includes(article.id));

    this.setData({ articles }, () => {
      this.filterArticles();
      this.updateTotalCount();
      this.toggleEditMode(); // 退出编辑模式
      
      wx.showToast({
        title: `已删除${selectedIds.length}篇文章`,
        icon: 'success'
      });
    });
  },

  /**
   * 更新总计数
   */
  updateTotalCount: function() {
    this.setData({
      totalCount: this.data.articles.length
    });
  },

  /**
   * 去发现页面
   */
  goToDiscover: function() {
    wx.switchTab({
      url: '/pages/index1/index'
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 可以在这里更新收藏状态
    this.filterArticles();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '我的文章收藏',
      path: '/pages/index4/star/star'
    };
  }
});