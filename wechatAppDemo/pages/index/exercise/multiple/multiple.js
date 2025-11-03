// pages/index/exercise/multiple/multiple.js
Page({
  data: {
   // 题目相关
   questionList: [], // 题目列表
   currentIndex: 0, // 当前题目索引
   currentQuestion: {}, // 当前题目
   
   // 答题状态
   selectedIndexes: [], // 选中选项索引数组
   isSubmitted: false, // 是否已提交
   showFeedback: false, // 是否显示反馈
   isCorrect: false, // 是否正确
   optionSelectedStatus: [], // 每个选项的选中状态
   correctAnswerText: '', // 正确答案文本
   
   // 界面设置
   isNightMode: false, // 夜间模式
   fontSize: 32, // 字体大小
   showFontModal: false, // 字体弹窗
   timer: null,
   showTimer: true, // 显示计时器
   formatTime: '00:00', // 格式化时间
   startTime: 0, // 计时开始时间
 },

 /**
  * 生命周期函数--监听页面加载
  */
 onLoad: function (options) {
   console.log('多选题页面加载');
   this.initQuestionData();
   this.startTimer();
 },

 /**
  * 初始化题目数据
  */
 initQuestionData() {
   // 模拟数据：多选题
   const questions = [
     {
       id: 1,
       type: 'multiple',
       title: '下列哪些是微信小程序的页面生命周期函数？',
       options: ['onLoad', 'onShow', 'onReady', 'onHide'],
       answer: [0, 1, 2, 3],
       analysis: '微信小程序的页面生命周期函数包括 onLoad, onShow, onReady, onHide。',
       isCollected: false 
     },
     {
       id: 2,
       type: 'multiple',
       title: '以下哪些是JavaScript的基本数据类型？',
       options: ['String', 'Object', 'Number', 'Boolean', 'Null', 'Undefined'],
       answer: [0, 2, 3, 4, 5],
       analysis: 'JavaScript的基本数据类型包括：String, Number, Boolean, Null, Undefined。Object是引用类型。',
       isCollected: false 
     },
     {
       id: 3,
       type: 'multiple',
       title: 'CSS Flexbox布局中，以下哪些是有效的align-items属性值？',
       options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch', 'space-between'],
       answer: [0, 1, 2, 3, 4],
       analysis: 'align-items属性的有效值包括：flex-start, flex-end, center, baseline, stretch。space-between是justify-content的属性值。',
       isCollected: false 
     }
   ];
   
   this.setData({
     questionList: questions,
     currentQuestion: questions[0] || {},
     currentIndex: 0,
     selectedIndexes: [],
     optionSelectedStatus: new Array(questions[0]?.options?.length || 0).fill(false),
     correctAnswerText: ''
   });
   
   console.log('题目数据初始化完成', this.data.questionList);
 },

 /**
  * 更新选项选中状态
  */
 updateOptionStatus: function() {
   const { currentQuestion, selectedIndexes } = this.data;
   const status = new Array(currentQuestion.options.length).fill(false);
   
   selectedIndexes.forEach(index => {
     if (index >= 0 && index < status.length) {
       status[index] = true;
     }
   });
   
   this.setData({ optionSelectedStatus: status });
 },

 startTimer() {
   const startTime = Date.now();
   this.setData({ startTime, showTimer: true });
   
   this.timer = setInterval(() => {
     const elapsed = Date.now() - this.data.startTime;
     const minutes = Math.floor(elapsed / 60000);
     const seconds = Math.floor((elapsed % 60000) / 1000);
     this.setData({
       formatTime: `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
     });
   }, 1000);
 },

 /**
  * 选择/取消选择选项
  */
 toggleOption: function(e) {
   if (this.data.isSubmitted) return;
   
   const index = parseInt(e.currentTarget.dataset.index);
   const selectedIndexes = [...this.data.selectedIndexes];
   
   const selectedIndex = selectedIndexes.indexOf(index);
   if (selectedIndex > -1) {
     selectedIndexes.splice(selectedIndex, 1);
   } else {
     selectedIndexes.push(index);
   }
   
   console.log('选中索引:', index, '当前选中:', selectedIndexes);
   
   this.setData({
     selectedIndexes: selectedIndexes
   });
   
   // 更新选项状态
   this.updateOptionStatus();
 },

 /**
  * 提交答案
  */
 submitAnswer: function() {
   if (this.data.selectedIndexes.length === 0) {
     wx.showToast({
       title: '请至少选择一个答案',
       icon: 'none'
     });
     return;
   }

   const { currentQuestion, selectedIndexes } = this.data;
   const isCorrect = this.checkMultiAnswer(selectedIndexes, currentQuestion.answer);
   
   // 生成正确答案文本
   const correctAnswerText = this.getAnswerText(currentQuestion.answer);
   
   this.setData({
     isSubmitted: true,
     showFeedback: true,
     isCorrect: isCorrect,
     correctAnswerText: correctAnswerText
   });

   wx.showToast({
     title: isCorrect ? '回答正确！' : '回答错误',
     icon: isCorrect ? 'success' : 'none'
   });
   
   console.log('答案验证结果:', {
     selected: selectedIndexes,
     correct: currentQuestion.answer,
     isCorrect: isCorrect
   });
 },
 
 /**
  * 检查多选题答案是否正确
  */
 checkMultiAnswer(selected, correctAnswer) {
   if (selected.length !== correctAnswer.length) {
     return false;
   }
   
   const sortedSelected = [...selected].sort();
   const sortedCorrect = [...correctAnswer].sort();
   
   return sortedSelected.every((val, index) => val === sortedCorrect[index]);
 },
 
 /**
  * 生成答案文本（将数字索引转为A、B、C等）
  */
 getAnswerText: function(answerIndexes) {
   if (!Array.isArray(answerIndexes)) {
     return String.fromCharCode(65 + answerIndexes);
   }
   
   return answerIndexes
     .map(index => String.fromCharCode(65 + parseInt(index)))
     .join('、');
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
       selectedIndexes: [],
       optionSelectedStatus: new Array(nextQuestion.options.length).fill(false),
       isSubmitted: false,
       showFeedback: false,
       correctAnswerText: ''
     });
   } else {
     wx.showToast({
       title: '已经是最后一题',
       icon: 'none'
     });
   }
 },

 /**
  * 上一题
  */
 prevQuestion: function() {
   if (this.data.currentIndex > 0) {
     const prevIndex = this.data.currentIndex - 1;
     const prevQuestion = this.data.questionList[prevIndex];
     this.setData({
       currentIndex: prevIndex,
       currentQuestion: prevQuestion,
       selectedIndexes: [],
       optionSelectedStatus: new Array(prevQuestion.options.length).fill(false),
       isSubmitted: false,
       showFeedback: false,
       correctAnswerText: ''
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
 collectQuestion: function() {
   const { currentQuestion, questionList, currentIndex } = this.data;
   
   // 创建新题目对象（切换收藏状态）
   const updatedQuestion = {
     ...currentQuestion,
     isCollected: !currentQuestion.isCollected
   };
   
   // 1. 更新本地存储的收藏
   let favorites = wx.getStorageSync('favorites') || [];
   
   if (updatedQuestion.isCollected) {
     // 添加到收藏
     if (!favorites.some(item => item.id === updatedQuestion.id)) {
       favorites.push({
         id: updatedQuestion.id,
         question: updatedQuestion.title,
         // 只保存必要字段
         options: updatedQuestion.options,
         answer: updatedQuestion.answer,
         analysis: updatedQuestion.analysis,
         addTime: new Date().toLocaleString(),
         type: updatedQuestion.type
       });
     }
   } else {
     // 从收藏移除
     favorites = favorites.filter(item => item.id !== updatedQuestion.id);
   }
   
   // 2. 保存到Storage
   wx.setStorageSync('favorites', favorites);
   
   // 3. 更新页面状态
   const newQuestionList = [...questionList];
   newQuestionList[currentIndex] = updatedQuestion;
   
   this.setData({
     questionList: newQuestionList,
     currentQuestion: updatedQuestion
   });
   
   wx.showToast({ 
     title: updatedQuestion.isCollected ? '收藏成功' : '取消收藏', 
     icon: 'none',
     duration: 1500
   });
 },
 
 /**
  * 页面卸载时清理定时器
  */
 onUnload() {
   if (this.timer) {
     clearInterval(this.timer);
     this.timer = null;
   }
 }
})