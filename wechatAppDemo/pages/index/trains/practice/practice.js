// pages/index/trains/practice/practice.js
Page({
  data: {
    questions: [
      {
        id: 1,
        chapter: "第一章：函数、极限与连续",
        content: "函数 f(x) = x² 在 x=2 处的极限是多少？",
        options: [
          { id: 1, label: "A", text: "2", correct: false },
          { id: 2, label: "B", text: "4", correct: true },
          { id: 3, label: "C", text: "6", correct: false },
          { id: 4, label: "D", text: "8", correct: false }
        ],
        explanation: "当 x 趋近于 2 时，x² 趋近于 4。"
      },
      {
        id: 2,
        chapter: "第一章：函数、极限与连续",
        content: "下列哪个函数在 x=0 处连续？",
        options: [
          { id: 1, label: "A", text: "f(x) = 1/x", correct: false },
          { id: 2, label: "B", text: "f(x) = |x|", correct: true },
          { id: 3, label: "C", text: "f(x) = sin(1/x)", correct: false },
          { id: 4, label: "D", text: "f(x) = 1/x²", correct: false }
        ],
        explanation: "函数 f(x) = |x| 在 x=0 处连续，因为左右极限相等且等于函数值。"
      }
    ],
    currentIndex: 0,
    currentAnswer: null,
    showAnswer: false,
    isCorrect: false,
    score: 0,
    currentQuestion: {}
  },

  onLoad: function(options) {
    console.log('页面加载开始');
    
    // 初始化数据，添加 selected 字段
    const questions = this.data.questions.map(question => {
      return {
        ...question,
        options: question.options.map(option => ({
          ...option,
          selected: false
        }))
      };
    });
    
    this.setData({
      questions: questions,
      currentQuestion: questions[0]
    });
    
    console.log('数据设置完成', this.data.currentQuestion);
  },

  selectOption: function(e) {
    if (this.data.showAnswer) return; // 已经显示答案时不能选择
    
    const index = e.currentTarget.dataset.index;
    console.log('选中选项:', index);
    
    // 创建新的选项数组，重置所有选项的选中状态
    const newOptions = this.data.currentQuestion.options.map((option, i) => {
      return {
        ...option,
        selected: i === index
      };
    });
    
    // 更新当前题目
    const updatedQuestion = {
      ...this.data.currentQuestion,
      options: newOptions
    };
    
    this.setData({
      currentQuestion: updatedQuestion,
      currentAnswer: index
    });
  },

  submitAnswer: function() {
    if (this.data.currentAnswer === null) {
      wx.showToast({
        title: '请选择一个答案',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    const selectedOption = this.data.currentQuestion.options[this.data.currentAnswer];
    const isCorrect = selectedOption.correct;
    
    console.log('提交答案，是否正确:', isCorrect);
    
    // 更新得分
    if (isCorrect) {
      this.setData({
        score: this.data.score + 1
      });
    }
    
    // 显示答案
    this.setData({
      showAnswer: true,
      isCorrect: isCorrect
    });
  },

  nextQuestion: function() {
    const nextIndex = this.data.currentIndex + 1;
    
    if (nextIndex < this.data.questions.length) {
      this.setData({
        currentIndex: nextIndex,
        currentAnswer: null,
        showAnswer: false,
        currentQuestion: this.data.questions[nextIndex]
      });
    } else {
      // 所有题目完成，跳转到结果页面
      wx.redirectTo({
        url: `/pages/index/trains/result/result?score=${this.data.score}&total=${this.data.questions.length}`
      });
    }
  },

  getCorrectAnswer: function() {
    const correctOption = this.data.currentQuestion.options.find(option => option.correct);
    return correctOption ? `${correctOption.label}. ${correctOption.text}` : '';
  }
})