// pages/index/exercise/single/single.js
Page({
  data: {
    // 题目相关
    questionList: [], // 题目列表
    currentIndex: 0, // 当前题目索引
    currentQuestion: {}, // 当前题目
    
    // 答题状态
    selectedIndex: -1, // 选中选项索引
    isSubmitted: false, // 是否已提交
    showFeedback: false, // 是否显示反馈
    isCorrect: false, // 是否正确
    
    // 界面设置
    isNightMode: false, // 夜间模式
    isCollected: false, // 是否收藏
    fontSize: 32, // 字体大小
    showFontModal: false, // 字体弹窗
    showTimer: false, // 显示计时器
    formatTime: '00:00', // 格式化时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('单选题页面加载');
    
    // 初始化题目数据
    this.initQuestionData();
  },

  /**
   * 初始化题目数据
   */
  initQuestionData() {
    // 模拟数据：单选题
    const questions = [
      {
        id: 1,
        type: 'single',
        title: '微信小程序的页面生命周期函数onLoad在什么时候执行？',
        options: ['页面创建时', '页面显示时', '页面渲染时', '页面隐藏时'],
        answer: 0,
        analysis: 'onLoad在页面创建时执行，且只会执行一次。',
        isCollected: false 
      },
      {
        id: 2,
        type: 'single',
        title: '以下哪个不是微信小程序的配置文件？',
        options: ['app.json', 'page.json', 'project.config.json', 'main.json'],
        answer: 3,
        analysis: '微信小程序没有main.json配置文件。',
        isCollected: false 
      }
    ];
    
    this.setData({
      questionList: questions,
      currentQuestion: questions[0] || {},
      currentIndex: 0
    });
    
    console.log('题目数据初始化完成', this.data.questionList);
  },

  /**
   * 选择选项
   */
  selectOption: function(e) {
    if (this.data.isSubmitted) return;
    
    const index = e.currentTarget.dataset.index;
    console.log('选择选项:', index);
    
    this.setData({
      selectedIndex: index
    });
  },

  /**
   * 提交答案
   */
  submitAnswer: function() {
    if (this.data.selectedIndex === -1) {
      wx.showToast({
        title: '请先选择答案',
        icon: 'none'
      });
      return;
    }

    const { currentQuestion, selectedIndex } = this.data;
    const isCorrect = selectedIndex === currentQuestion.answer;
    
    this.setData({
      isSubmitted: true,
      showFeedback: true,
      isCorrect: isCorrect
    });

    // 显示反馈
    wx.showToast({
      title: isCorrect ? '回答正确！' : '回答错误',
      icon: isCorrect ? 'success' : 'none'
    });
  },

  /**
   * 下一题
   */
  nextQuestion: function() {
    const nextIndex = this.data.currentIndex + 1;
    if (nextIndex < this.data.questionList.length) {
      const nextQuestion = this.data.questionList[nextIndex];
      this.setData({
        currentIndex: nextIndex,
        currentQuestion: nextQuestion,
        selectedIndex: -1,
        isSubmitted: false,
        showFeedback: false
      });
    } else {
      wx.showToast({ title: '已经是最后一题', icon: 'none' });
    }
  },

  /**
   * 上一题
   */
  prevQuestion() {
    if (this.data.currentIndex > 0) {
      const prevIndex = this.data.currentIndex - 1;
      const prevQuestion = this.data.questionList[prevIndex];
      this.setData({
        currentIndex: prevIndex,
        currentQuestion: prevQuestion,
        selectedIndex: -1,
        isSubmitted: false,
        showFeedback: false
      });
    }
  },

  /**
   * 切换字体大小弹窗
   */
  toggleFontSize: function() {
    this.setData({
      showFontModal: !this.data.showFontModal
    });
  },

  /**
   * 设置字体大小
   */
  setFontSize: function(e) {
    const size = e.currentTarget.dataset.size;
    this.setData({
      fontSize: parseInt(size),
      showFontModal: false
    });
  },

  /**
   * 关闭字体弹窗
   */
  closeFontModal: function() {
    this.setData({
      showFontModal: false
    });
  },

  /**
   * 切换夜间模式
   */
  toggleNightMode: function() {
    this.setData({
      isNightMode: !this.data.isNightMode
    });
  },

  /**
   * 收藏题目
   */
  collectQuestion() {
    const { currentQuestion, questionList, currentIndex } = this.data;
    const newQuestionList = [...questionList];
    
    // 切换当前题目的收藏状态
    newQuestionList[currentIndex] = {
      ...currentQuestion,
      isCollected: !currentQuestion.isCollected
    };
    
    this.setData({
      questionList: newQuestionList,
      currentQuestion: newQuestionList[currentIndex]
    });
    
    wx.showToast({ 
      title: currentQuestion.isCollected ? '取消收藏' : '收藏成功', 
      icon: 'none' 
    });
  }
})