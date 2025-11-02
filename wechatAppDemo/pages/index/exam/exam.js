Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTime: '00:00:00',
    currentQuestionIndex: 0,
    currentQuestion: {},
    totalQuestions: 0,
    showAnalysis: false,
    timer: null,
    elapsedSeconds: 0,
    questions: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 模拟试题数据
    this.setData({
      questions: [
        {
          id: 1,
          index: 1,
          content: '下列函数中，在x=0处连续的是？',
          options: [
            { value: 'A', text: 'f(x) = 1/x', correct: false, selected: false },
            { value: 'B', text: 'f(x) = sinx/x', correct: false, selected: false },
            { value: 'C', text: 'f(x) = |x|', correct: true, selected: false },
            { value: 'D', text: 'f(x) = sign(x)', correct: false, selected: false }
          ],
          analysis: '本题可根据函数连续性的定义判断。选项C中f(x)=|x|在x=0处的左极限等于右极限等于函数值0，故连续。',
          favorited: false
        },
        {
          id: 2,
          index: 2,
          content: '函数f(x) = x³-3x的单调递增区间是？',
          options: [
            { value: 'A', text: '(-∞,-1]', correct: true, selected: false },
            { value: 'B', text: '[-1,1]', correct: false, selected: false },
            { value: 'C', text: '[1,+∞)', correct: true, selected: false },
            { value: 'D', text: '(-∞,+∞)', correct: false, selected: false }
          ],
          analysis: '对f(x)求导得f\'(x)=3x²-3，令f\'(x)≥0，解得x≤-1或x≥1，故单调递增区间为(-∞,-1]和[1,+∞)。',
          favorited: false
        }
      ]
    }, () => {
      // 初始化显示第一题
      this.setData({
        currentQuestion: this.data.questions[0],
        totalQuestions: this.data.questions.length
      });
      
      // 开始计时
      this.startTimer();
    });
  },

  /**
   * 开始计时器
   */
  startTimer() {
    const timer = setInterval(() => {
      this.setData({
        elapsedSeconds: this.data.elapsedSeconds + 1
      });
      
      // 格式化时间
      const hours = Math.floor(this.data.elapsedSeconds / 3600)
        .toString()
        .padStart(2, '0');
      const minutes = Math.floor((this.data.elapsedSeconds % 3600) / 60)
        .toString()
        .padStart(2, '0');
      const seconds = (this.data.elapsedSeconds % 60)
        .toString()
        .padStart(2, '0');
      
      this.setData({
        currentTime: `${hours}:${minutes}:${seconds}`
      });
    }, 1000);
    
    this.setData({ timer });
  },

  /**
   * 选择答案
   */
  selectOption(e) {
    if (this.data.showAnalysis) return;
    
    const selectedOption = e.currentTarget.dataset.option;
    const questions = [...this.data.questions];
    const currentQuestion = { ...questions[this.data.currentQuestionIndex] };
    
    // 更新选项状态
    currentQuestion.options = currentQuestion.options.map(option => {
      if (option.value === selectedOption.value) {
        return {
          ...option,
          selected: true,
          wrong: !option.correct
        };
      } else if (option.correct) {
        return {
          ...option,
          selected: false,
          correct: true
        };
      }
      return { ...option, selected: false };
    });
    
    questions[this.data.currentQuestionIndex] = currentQuestion;
    
    this.setData({
      questions,
      currentQuestion,
      showAnalysis: true
    });
  },

  /**
   * 上一题
   */
  prevQuestion() {
    if (this.data.currentQuestionIndex <= 0) return;
    
    const currentQuestionIndex = this.data.currentQuestionIndex - 1;
    
    this.setData({
      currentQuestionIndex,
      currentQuestion: this.data.questions[currentQuestionIndex],
      showAnalysis: false
    });
  },

  /**
   * 下一题
   */
  nextQuestion() {
    if (this.data.currentQuestionIndex >= this.data.totalQuestions - 1) return;
    
    const currentQuestionIndex = this.data.currentQuestionIndex + 1;
    
    this.setData({
      currentQuestionIndex,
      currentQuestion: this.data.questions[currentQuestionIndex],
      showAnalysis: false
    });
  },

  /**
   * 切换收藏状态
   */
  toggleFavorite() {
    const questions = [...this.data.questions];
    const currentQuestion = { ...questions[this.data.currentQuestionIndex] };
    
    // 切换收藏状态
    currentQuestion.favorited = !currentQuestion.favorited;
    questions[this.data.currentQuestionIndex] = currentQuestion;
    
    // 如果是收藏，保存到本地
    if (currentQuestion.favorited) {
      const favorites = wx.getStorageSync('favorites') || [];
      // 检查是否已存在
      const exists = favorites.some(item => item.id === currentQuestion.id);
      
      if (!exists) {
        favorites.push({
          id: currentQuestion.id,
          question: currentQuestion.content,
          addTime: new Date().toLocaleString()
        });
        wx.setStorageSync('favorites', favorites);
        wx.showToast({ title: '收藏成功' });
      }
    } else {
      // 取消收藏
      let favorites = wx.getStorageSync('favorites') || [];
      favorites = favorites.filter(item => item.id !== currentQuestion.id);
      wx.setStorageSync('favorites', favorites);
      wx.showToast({ title: '已取消收藏' });
    }
    
    this.setData({
      questions,
      currentQuestion
    });
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // 清除计时器
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }
  }
})