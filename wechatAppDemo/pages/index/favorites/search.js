Page({
  data: {
    searchKey: '',
    allFavorites: [],
    filteredList: []
  },

  onLoad() {
    this.loadAllFavorites();
  },

  // 加载所有收藏数据
  loadAllFavorites() {
    const allFavorites = wx.getStorageSync('favorites') || [];
    this.setData({
      allFavorites: allFavorites,
      filteredList: allFavorites
    });
  },

  // 实时搜索
  onSearchInput(e) {
    const searchKey = e.detail.value.trim();
    this.setData({ searchKey });

    // 过滤逻辑
    const filtered = this.data.allFavorites.filter(item => 
      item.question.toLowerCase().includes(searchKey.toLowerCase())
    );
    this.setData({ filteredList: filtered });
  },

  // 清空搜索
  clearSearch() {
    this.setData({
      searchKey: '',
      filteredList: this.data.allFavorites
    });
  },

  // 点击搜索结果
  onResultTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({ title: `题目ID: ${id}`, icon: 'none' });
  }
})