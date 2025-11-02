Page({
  data: {
    activeTab: 'rank',
    rankList: [
      { userId: 'user001', name: '张三', score: 777 },
      { userId: 'user002', name: '李四', score: 666 },
      { userId: 'user003', name: '王五', score: 555 },
      { userId: 'user004', name: '赵六', score: 333 },
      { userId: 'user005', name: '钱七', score: 222 },
      { userId: 'user006', name: '孙八', score: 111 },
      { userId: 'user007', name: '周九', score: 0 },
      { userId: 'user008', name: '张三', score: 777 },
      { userId: 'user009', name: '李四', score: 666 },
      { userId: 'user010', name: '王五', score: 555 },
      { userId: 'user011', name: '赵六', score: 333 },
      { userId: 'user012', name: '钱七', score: 222 },
      { userId: 'user013', name: '孙八', score: 111 },
      { userId: 'user014', name: '周九', score: 0 },
      { userId: 'user015', name: '张三', score: 777 }
    ],
    myScore: {
      score: 444,
      rank: '-', // 初始化为 '-'，待更新
      questionNum: 50,
      accuracy: '88%'
    }
  },

  onLoad() {
    this.sortRankList();
  },

  sortRankList() {
    const list = this.data.rankList.map(item => ({ ...item }));

    // 插入“我”的数据
    const myUser = {
      userId: 'myself',
      name: '我',
      score: this.data.myScore.score,
      avatar: '/images/empty.png',
      rank: 0
    };
    list.push(myUser);

    // 按 score 从高到低排序
    list.sort((a, b) => b.score - a.score);

    // 重新计算 rank
    let currentRank = 1;
    list.forEach((item, index) => {
      if (index > 0 && item.score < list[index - 1].score) {
        currentRank = index + 1;
      }
      item.rank = currentRank;
    });

    // 👇 关键：找到“我”的记录，更新 myScore.rank
    const myItem = list.find(item => item.userId === 'myself');
    if (myItem) {
      this.setData({
        'myScore.rank': myItem.rank
      });
    }

    // 更新数据
    this.setData({
      rankList: list
    });
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab
    });
  },

  // 点击排行榜条目跳转到错题页面
  goToMistakes(e) {
    const userId = e.currentTarget.dataset.userid;
    wx.navigateTo({
      url: '/pages/index2/index?userId=' + userId
    });
  }
});