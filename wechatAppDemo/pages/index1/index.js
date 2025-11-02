// wechatAppDemo/pages/index1/list/list.js
Page({
  data: {
    articles: [
      {
        id: 1,
        title: "我重生了",
        tags: ["考研", "自律"],
        desc: "重生回了考研前一年，上一世我因为沉迷原神，每天肝到深夜...",
        thumbnail: "/images/article1.jpg",
        authorAvatar: "/images/avatar.png",
        authorName: "学习糕手",
        publishTime: "12月13日 23:22",
        viewCount: 5692
      },
      {
        id: 2,
        title: "考研英语高频词汇速记法",
        tags: ["英语", "词汇"],
        desc: "考研英语词汇是基础，掌握以下3个速记技巧，让记忆效率翻倍...",
        thumbnail: "/images/article2.jpg",
        authorAvatar: "/images/avatar2.png",
        authorName: "英语学霸",
        publishTime: "12月12日 15:40",
        viewCount: 3289
      },
      {
        id: 3,
        title: "考研政治主观题答题模板",
        tags: ["政治", "答题技巧"],
        desc: "主观题想拿高分？记住这5个模板，直接套用...",
        thumbnail: "/images/article3.jpg",
        authorAvatar: "/images/avatar3.png",
        authorName: "政治名师",
        publishTime: "12月11日 10:15",
        viewCount: 2856
      }
    ]
  },

  // 跳转到详情页
  goToDetail(e) {
    const articleId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/index1/detail/detail?id=" + articleId,
      success: () => {
        console.log("跳转成功，目标页面：/pages/index1/detail/detail");
      },
      fail: (err) => {
        console.error("跳转失败原因：", err);
        wx.showModal({
          title: "跳转失败",
          content: "请检查页面路径是否正确：" + err.errMsg,
          showCancel: false
        });
      }
    });
  },

  // 新增：跳转到搜索页面
  goToSearch() {
    wx.navigateTo({
      url: "/pages/sousuo/index",
      success: () => {
        console.log("跳转搜索页面成功");
      },
      fail: (err) => {
        console.error("搜索页面跳转失败：", err);
        wx.showToast({
          title: "跳转失败",
          icon: "none"
        });
      }
    });
  }
});