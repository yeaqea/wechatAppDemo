Page({
  data: {
    favoritesList: [], // 收藏列表数据
    isEditing: false,  // 是否处于编辑模式
    selectedItems: [], // 当前选中的项
  },

  onLoad() {
    this.loadFavorites();
  },

  onShow() {
    this.loadFavorites();
  },

  loadFavorites() {
    const favorites = wx.getStorageSync('favorites') || [];
    const favoritesList = favorites.map(item => ({
      ...item,
      isSelected: false
    }));
    this.setData({
      favoritesList: favorites,
      selectedItems: []
    });
  },

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

  navigateBack() {
    wx.navigateBack({ delta: 1 });
  },

  // 切换编辑模式
  toggleEdit() {
    const { isEditing } = this.data;
    if (!isEditing) {
      // 进入编辑模式：重置所有 isSelected
      const favoritesList = this.data.favoritesList.map(item => ({
        ...item,
        isSelected: false
      }));
      this.setData({
        isEditing: true,
        favoritesList,
        selectedItems: []
      });
    } else {
      // 退出编辑模式
      this.setData({
        isEditing: false,
        selectedItems: []
      });
    }
  },

  // 👇 选中/取消选中
  toggleSelect(e) {
    const index = e.currentTarget.dataset.index;
    const favoritesList = [...this.data.favoritesList];
    const item = favoritesList[index];

    // 切换选中状态
    item.isSelected = !item.isSelected;

    // 同步 selectedItems
    const selectedItems = favoritesList
      .filter(i => i.isSelected)
      .map(i => i.id);

    this.setData({
      favoritesList,
      selectedItems
    });
  },

  // 👇 全选/取消全选
  toggleSelectAll() {
    const { favoritesList } = this.data;
    const allSelected = favoritesList.every(item => item.isSelected);

    const newFavoritesList = favoritesList.map(item => ({
      ...item,
      isSelected: !allSelected // 如果全选则取消，否则全选
    }));

    const selectedItems = newFavoritesList
      .filter(i => i.isSelected)
      .map(i => i.id);

    this.setData({
      favoritesList: newFavoritesList,
      selectedItems
    });
  },

  // 👇 删除选中项
  deleteSelected() {
    const { selectedItems, favoritesList } = this.data;

    if (selectedItems.length === 0) {
      wx.showToast({
        title: '请先选择要删除的题目',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    wx.showModal({
      title: '确认删除',
      content: `确定要删除 ${selectedItems.length} 个收藏吗？`,
      success: (res) => {
        if (res.confirm) {
          const newFavorites = favoritesList
            .filter(item => !selectedItems.includes(item.id))
            .map(item => ({ ...item, isSelected: false })); // 重置 isSelected

          wx.setStorageSync('favorites', newFavorites);
          this.setData({
            favoritesList: newFavorites,
            selectedItems: [],
            isEditing: false
          });
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 1500
          });
        }
      }
    });
  }
});