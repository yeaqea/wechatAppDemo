Page({
  data: {
    article: {}
  },

  onLoad(options) {
    // 强制转换为数字类型，与articles中的id类型一致
    const articleId = parseInt(options.id); 
    console.log("接收的文章ID（数字类型）：", articleId);

    const articleDatabase = [
      {
        id: 1, // 数字类型，与列表页一致
        title: "我重生了",
        authorAvatar: "/images/avatar.png",
        authorName: "学习糕手",
        publishTime: "12月13日 23:22",
        viewCount: 5692,
        content: "重生回了考研前一年，上一世我因为沉迷原神，每天肝到深夜，导致学习效率低下，最终考研失败。这一世，我决定痛改前非，制定了详细的学习计划：\n\n1. 每天早上6点起床，背诵英语单词1小时；\n2. 上午专注专业课复习，结合真题梳理考点；\n3. 下午做英语阅读，总结错题原因；\n4. 晚上整理笔记，复盘当天学习内容。\n\n经过一年的坚持，我成功考上了目标院校的研究生，这也让我明白：自律才是改变命运的关键！"
      },
      {
        id: 2,
        title: "考研英语高频词汇速记法",
        authorAvatar: "/images/avatar2.png",
        authorName: "英语学霸",
        publishTime: "12月12日 15:40",
        viewCount: 3289,
        content: "考研英语词汇是基础，掌握以下3个速记技巧，让记忆效率翻倍：\n\n一、词根词缀记忆法\n例如：前缀un-表示“否定”，happy（开心）→ unhappy（不开心）；后缀-tion表示“名词”，act（行动）→ action（行动）。\n\n二、语境记忆法\n不要孤立背单词，结合真题例句记忆，比如在阅读中遇到“abandon”，通过句子理解其用法，更容易记住。\n\n三、间隔重复记忆法\n每天复习前一天的单词，每周进行一次汇总复习，避免遗忘。\n\n建议搭配背单词APP，利用碎片时间巩固，坚持3个月就能掌握核心词汇！"
      },
      {
        id: 3,
        title: "考研政治主观题答题模板",
        authorAvatar: "/images/avatar3.png",
        authorName: "政治名师",
        publishTime: "12月11日 10:15",
        viewCount: 2856,
        content: "主观题想拿高分？记住这5个模板，直接套用：\n\n一、“是什么”类题目\n答题结构：定义+核心观点\n示例：xxx（结合材料）\n\n二、“为什么”类题目\n答题结构：原因+意义+必要性\n示例：xxx（结合材料）\n\n三、“怎么做”类题目\n答题结构：主体+措施+具体做法\n示例：xxx（结合材料）\n\n四、启示类题目\n答题结构：总结经验+结合实际\n示例：xxx（结合材料）\n\n五、评价类题目\n答题结构：正反两面+结论\n示例：xxx（结合材料）\n\n注意：所有模板需结合材料内容填充，避免空泛，字迹工整可加分！"
      }
    ];

    // 严格匹配数字类型的id
    const currentArticle = articleDatabase.find(item => item.id === articleId);
    if (currentArticle) {
      this.setData({ article: currentArticle });
      console.log("匹配成功，文章标题：", currentArticle.title);
    } else {
      wx.showToast({ title: "文章不存在", icon: "none" });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  }
});