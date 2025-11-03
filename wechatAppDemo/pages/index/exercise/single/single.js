// pages/index/exercise/single/single.js
Page({
  data :{
   // 题目相关
   questionList: [], // 题目列表
   currentIndex: 0, // 当前题目索引
   currentQuestion: {}, // 当前题目
   
   // 答题状态
   selectedIndex: -1, // 选中选项索引
   isSubmitted: false, // 是否已提交
   showFeedback: false, // 是否显示反馈
   isCorrect: false, // 是否正确
   correctAnswerText: '', // 正确答案文本
   
   // 界面设置
   isNightMode: false, // 夜间模式
   fontSize: 32, // 字体大小
   showFontModal: false, // 字体弹窗
   timer: null,
   showTimer: false, // 显示计时器
   formatTime: '00:00', // 格式化时间
   startTime: 0, // 计时开始时间
 },

 /**
  * 生命周期函数--监听页面加载
  */
 onLoad: function (options) {
   console.log('单选题页面加载');
   
   // 初始化题目数据
   this.initQuestionData();
   this.startTimer();
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
     currentIndex: 0,
     correctAnswerText: '' // 初始化正确答案文本
   });
   
   console.log('题目数据初始化完成', this.data.questionList);
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
   
   // 生成正确答案文本
   const correctAnswerText = this.getAnswerText(currentQuestion.answer);
   
   this.setData({
     isSubmitted: true,
     showFeedback: true,
     isCorrect: isCorrect,
     correctAnswerText: correctAnswerText
   });

   // 显示反馈
   wx.showToast({
     title: isCorrect ? '回答正确！' : '回答错误',
     icon: isCorrect ? 'success' : 'none'
   });
 },
 
 /**
  * 生成答案文本（将数字索引转为A、B、C等）
  */
 getAnswerText: function(answerIndex) {
   return String.fromCharCode(65 + parseInt(answerIndex));
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
       showFeedback: false,
       correctAnswerText: '' // 重置正确答案文本
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
       showFeedback: false,
       correctAnswerText: '' // 重置正确答案文本
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
         // 只保存必要字段，避免数据过大
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

 onUnload() {
   if (this.timer) {
     clearInterval(this.timer);
     this.timer = null;
   }
 }
})