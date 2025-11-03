// wechatAppDemo/pages/index1/list/list.js
Page({
  data: {
    // 原始文章数据，保持不变
    articles: [
      {
        id: 1,
        title: "我重生了",
        tags: ["考研", "自律"],
        desc: "重生回了考研前一年，上一世我因为沉迷原神，每天肝到深夜...",
        thumbnail: "/images/article_icons/article1.jpg",
        authorAvatar: "/images/article_icons/avatar.jpg",
        authorName: "学习糕手",
        publishTime: "12月13日 23:22",
        viewCount: 5692,
        timestamp: 1702488122000
      },
      {
        id: 2,
        title: "考研英语高频词汇速记法",
        tags: ["英语", "词汇"],
        desc: "考研英语词汇是基础，掌握以下3个速记技巧，让记忆效率翻倍...",
        thumbnail: "/images/article_icons/article2.jpg",
        authorAvatar: "/images/article_icons/avatar1.jpg",
        authorName: "英语学霸",
        publishTime: "12月12日 15:40",
        viewCount: 3289,
        timestamp: 1702366800000
      },
      {
        id: 3,
        title: "考研政治主观题答题模板",
        tags: ["政治", "答题技巧"],
        desc: "主观题想拿高分？记住这5个模板，直接套用...",
        thumbnail: "/images/article_icons/article3.jpg",
        authorAvatar: "/images/article_icons/avatar2.jpg",
        authorName: "政治名师",
        publishTime: "12月11日 10:15",
        viewCount: 12856,
        timestamp: 1702253700000
      }
    ],
    // 显示状态
    showCategory: false,
    showSort: false,
    // 选中项
    selectedCategory: '',
    selectedSort: 'time',
    // 显示的文章列表（重要：初始化为空数组）
    filteredArticles: []
  },

  onLoad() {
    console.log('页面加载');
    // 安全地初始化数据
    this.safeSetData({
      filteredArticles: this.validateArticleData(this.data.articles)
    });
  },

  onReady() {
    console.log('页面就绪');
  },

  /**
   * 安全的数据设置方法，避免渲染错误
   */
  safeSetData(data) {
    return new Promise((resolve) => {
      try {
        this.setData(data, () => {
          console.log('setData 成功', Object.keys(data));
          resolve(true);
        });
      } catch (error) {
        console.error('setData 错误:', error);
        // 降级处理：延迟重试
        setTimeout(() => {
          try {
            this.setData(data, resolve);
          } catch (e) {
            console.error('第二次 setData 也失败:', e);
            resolve(false);
          }
        }, 50);
      }
    });
  },

  /**
   * 验证文章数据完整性
   */
  validateArticleData(articles) {
    if (!Array.isArray(articles)) {
      console.warn('articles 不是数组', articles);
      return [];
    }
    
    return articles.map((article, index) => {
      // 确保每个对象都有必需的字段和唯一ID
      return {
        id: article.id || index + 1,
        title: article.title || '无标题',
        tags: Array.isArray(article.tags) ? article.tags : [],
        desc: article.desc || '',
        thumbnail: article.thumbnail || '',
        authorAvatar: article.authorAvatar || '/images/default-avatar.png',
        authorName: article.authorName || '匿名',
        publishTime: article.publishTime || '',
        viewCount: article.viewCount || 0,
        timestamp: article.timestamp || Date.now()
      };
    });
  },

  /**
   * 切换分类下拉框
   */
  toggleCategory() {
    console.log('切换分类下拉框');
    this.safeSetData({
      showCategory: !this.data.showCategory,
      showSort: false
    });
  },

  /**
   * 切换排序下拉框
   */
  toggleSort() {
    console.log('切换排序下拉框');
    this.safeSetData({
      showSort: !this.data.showSort,
      showCategory: false
    });
  },

  /**
   * 选择分类
   */
  selectCategory(e) {
    const category = e.currentTarget.dataset.value;
    console.log('选择分类:', category);
    
    this.safeSetData({
      selectedCategory: category,
      showCategory: false
    }).then(() => {
      this.filterAndSortArticles();
    });
  },

  /**
   * 选择排序方式
   */
  selectSort(e) {
    const sort = e.currentTarget.dataset.value;
    console.log('选择排序:', sort);
    
    this.safeSetData({
      selectedSort: sort,
      showSort: false
    }).then(() => {
      this.filterAndSortArticles();
    });
  },

  /**
   * 关闭所有下拉菜单
   */
  closeDropdowns() {
    console.log('关闭下拉菜单');
    this.safeSetData({
      showCategory: false,
      showSort: false
    });
  },

  /**
   * 过滤和排序文章（核心方法）
   */
  filterAndSortArticles() {
    console.log('开始过滤排序文章');
    const { articles, selectedCategory, selectedSort } = this.data;
    
    // 1. 验证数据
    const validatedArticles = this.validateArticleData(articles);
    
    // 2. 过滤文章 - 使用新数组
    let filtered = validatedArticles.filter(article => {
      if (!selectedCategory) return true;
      return article.tags.includes(selectedCategory);
    });

    // 3. 排序文章 - 创建新数组避免引用问题
    let sorted = [...filtered].sort((a, b) => {
      if (selectedSort === 'time') {
        return b.timestamp - a.timestamp;
      } else if (selectedSort === 'views') {
        return b.viewCount - a.viewCount;
      }
      return 0;
    });

    // 4. 安全更新数据
    this.safeSetData({
      filteredArticles: sorted
    }).then((success) => {
      if (success) {
        console.log('文章列表更新成功，数量:', sorted.length);
      } else {
        console.error('文章列表更新失败');
      }
    });
  },

  /**
   * 跳转到详情页
   */
  goToDetail(e) {
    const articleId = e.currentTarget.dataset.id;
    console.log('跳转到详情页:', articleId);
    
    wx.navigateTo({
      url: "/pages/index1/detail/detail?id=" + articleId,
      success: () => {
        console.log("跳转成功");
      },
      fail: (err) => {
        console.error("跳转失败:", err);
        wx.showModal({
          title: "跳转失败",
          content: "请检查页面路径是否正确",
          showCancel: false
        });
      }
    });
  },

  /**
   * 跳转到搜索页面
   */
  goToSearch() {
    console.log('跳转到搜索页面');
    
    wx.navigateTo({
      url: "/pages/index1/sousuo/index",
      success: () => {
        console.log("跳转搜索页面成功");
      },
      fail: (err) => {
        console.error("搜索页面跳转失败:", err);
        wx.showToast({
          title: "跳转失败",
          icon: "none"
        });
      }
    });
  }
});