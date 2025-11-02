Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 当前激活的导航项（全部真题/历年真题）
    activeNav: 0, 
    // 真题列表数据（按导航分类，0:全部真题，1:历年真题）
    paperList: [
      // 全部真题数据
      [
        {
          id: 'national1',
          title: '全国卷I',
          info: '包含年份：2023-2018',
          count: '共23套'
        },
        {
          id: 'national2',
          title: '全国卷II',
          info: '包含年份：2023-2018',
          count: '共20套'
        },
        {
          id: 'national3',
          title: '全国卷III',
          info: '包含年份：2023-2018',
          count: '共22套'
        },
        {
          id: 'beijing',
          title: '北京卷',
          info: '包含年份：2023-2019',
          count: '共10套'
        },
        {
          id: 'shanghai',
          title: '上海卷',
          info: '包含年份：2023-2019',
          count: '共17套'
        },
        {
          id: 'zhejiang',
          title: '浙江卷',
          info: '包含年份：2023-2020',
          count: '共23套'
        }
      ],
      // 历年真题数据（可根据实际需求调整，此处简化为相同数据）
      [
        {
          id: '2023',
          title: '2023年真题',
          info: '包含全国卷及各省市卷',
          count: '共32套'
        },
        {
          id: '2022',
          title: '2022年真题',
          info: '包含全国卷及各省市卷',
          count: '共30套'
        },
        {
          id: '2021',
          title: '2021年真题',
          info: '包含全国卷及各省市卷',
          count: '共28套'
        }
      ]
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 页面加载时的初始化操作（如请求真题数据）
    // 实际项目中可替换为接口请求：
    // wx.request({
    //   url: 'https://api.example.com/papers',
    //   success: (res) => {
    //     this.setData({ paperList: res.data })
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 页面显示时的操作（如刷新数据）
  },

  /**
   * 切换导航栏（全部真题/历年真题）
   */
  onNavTap(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ activeNav: index });
  },

  /**
   * 点击真题条目，跳转至对应真题详情页
   */
  goToPaperDetail(e) {
    // 获取当前点击条目的数据
    const { paperid, title } = e.currentTarget.dataset;
    
    // 跳转至真题详情页，携带参数
    wx.navigateTo({
      url: `/pages/index/paperDetail/paperDetail?paperId=${paperid}&title=${title}`,
      fail: (err) => {
        console.error('跳转真题详情页失败：', err);
        wx.showToast({
          title: '跳转失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    // 下拉刷新逻辑（如重新加载真题数据）
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 1000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 上拉加载更多真题（如果有分页需求）
  }
});