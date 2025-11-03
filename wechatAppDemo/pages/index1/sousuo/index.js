// wechatAppDemo/pages/sousuo/index.js
Page({
  data: {
    searchText: '', // 搜索输入内容
    searchHistory: [], // 搜索历史
    searchResult: [], // 搜索结果
    showHistory: true, // 显示历史记录
    showResult: false // 显示搜索结果
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 从本地存储加载搜索历史
    this.loadSearchHistory();
  },

  // 从本地存储加载搜索历史
  loadSearchHistory() {
    try {
      const history = wx.getStorageSync('searchHistory') || [];
      this.setData({
        searchHistory: history
      });
    } catch (error) {
      console.error('加载搜索历史失败:', error);
      // 如果加载失败，使用空数组
      this.setData({
        searchHistory: []
      });
    }
  },

  // 输入框输入事件
  onInput(e) {
    const value = e.detail.value;
    this.setData({
      searchText: value
    });
    
    // 如果输入框内容被清空，自动回到历史记录界面
    if (!value.trim()) {
      this.setData({
        showHistory: true,
        showResult: false
      });
    }
  },

  // 搜索事件 - 点击搜索按钮或键盘搜索
  onSearch() {
    const keyword = this.data.searchText.trim();
    if (!keyword) {
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none'
      });
      return;
    }

    // 执行搜索
    this.performSearch(keyword);
    
    // 添加到搜索历史
    this.addToSearchHistory(keyword);
  },

  // 添加到搜索历史
  addToSearchHistory(keyword) {
    let history = [...this.data.searchHistory];
    
    // 移除重复的关键词
    const index = history.indexOf(keyword);
    if (index > -1) {
      history.splice(index, 1);
    }
    
    // 添加到数组开头
    history.unshift(keyword);
    
    // 限制历史记录数量（最多10条）
    if (history.length > 10) {
      history = history.slice(0, 10);
    }
    
    // 更新数据和本地存储
    this.setData({
      searchHistory: history
    });
    
    // 保存到本地存储
    try {
      wx.setStorageSync('searchHistory', history);
    } catch (error) {
      console.error('保存搜索历史失败:', error);
    }
  },

  // 清空搜索历史
  clearHistory() {
    wx.showModal({
      title: '提示',
      content: '确定要清空搜索历史吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            searchHistory: []
          });
          // 同时清空本地存储
          try {
            wx.setStorageSync('searchHistory', []);
          } catch (error) {
            console.error('清空搜索历史失败:', error);
          }
        }
      }
    });
  },

  // 点击历史记录项
  onHistoryItemTap(e) {
    const keyword = e.currentTarget.dataset.keyword;
    
    // 设置搜索框内容
    this.setData({
      searchText: keyword
    });
    
    // 执行搜索
    this.performSearch(keyword);
  },

  // 执行搜索
  performSearch(keyword) {
    // 获取搜索结果 - 与文章详情页数据匹配
    const searchResults = this.getSearchResults(keyword);
    
    this.setData({
      searchResult: searchResults,
      showHistory: false,
      showResult: true
    });
  },

  // 获取搜索结果 - 修改此函数以匹配文章详情页数据
  getSearchResults(keyword) {
    // 定义与文章详情页匹配的文章数据库
    const articleDatabase = [
      {
        id: 1, // 数字类型，与详情页一致
        title: "我重生了",
        authorName: "学习糕手",
        publishTime: "12月13日 23:22",
        viewCount: 5692,
        desc: "重生回了考研前一年，上一世我因为沉迷原神...这一世我决定痛改前非..."
      },
      {
        id: 2,
        title: "考研英语高频词汇速记法",
        authorName: "英语学霸",
        publishTime: "12月12日 15:40",
        viewCount: 3289,
        desc: "考研英语词汇是基础，掌握以下3个速记技巧，让记忆效率翻倍..."
      },
      {
        id: 3,
        title: "考研政治主观题答题模板",
        authorName: "政治名师",
        publishTime: "12月11日 10:15",
        viewCount: 2856,
        desc: "主观题想拿高分？记住这5个模板，直接套用..."
      }
    ];

    // 根据关键词过滤文章
    const lowerKeyword = keyword.toLowerCase();
    const results = articleDatabase.filter(article => 
      article.title.toLowerCase().includes(lowerKeyword) || 
      article.desc.toLowerCase().includes(lowerKeyword) ||
      article.authorName.toLowerCase().includes(lowerKeyword)
    );

    // 如果找到匹配结果，返回结果
    if (results.length > 0) {
      return results;
    }

    // 如果没有找到匹配结果，返回通用提示
    return [
      {
        id: 0,
        title: `未找到"${keyword}"的精确匹配`,
        authorName: "系统提示",
        publishTime: new Date().toLocaleDateString(),
        viewCount: 0,
        desc: "请尝试使用其他关键词搜索，如'英语'、'政治'、'自律'等"
      }
    ];
  },

  // 取消搜索，返回上一页
  cancelSearch() {
    wx.navigateBack();
  },

  // 跳转到文章详情页 - 保持不变
  goToDetail(e) {
    const articleId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/index1/detail/detail?id=" + articleId
    });
  }
});