// pages/settings/settings.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: '张三',
    signature: '',
    avatar: '/images/mine_icons/default_photo.png',
    originalData: {},
    hasChanges: false,
    showSuccess: false,
    isSaving: false // 防止重复保存
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadUserSettings();
  },

  /**
   * 加载用户设置
   */
  loadUserSettings: function() {
    const app = getApp();
    const userInfo = app.globalData.userInfo || {};
    
    const settings = {
      username: userInfo.username || '张三',
      signature: userInfo.signature || '',
      avatar: userInfo.avatar || '/images/mine_icons/default_photo.png'
    };

    this.setData({
      ...settings,
      originalData: { ...settings }
    });

    this.checkForChanges();
  },

  /**
   * 选择头像
   */
  chooseAvatar: function() {
    if (this.data.isSaving) return;
    
    const that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        const tempFilePath = res.tempFilePaths[0];
        that.setData({
          avatar: tempFilePath
        }, () => {
          that.checkForChanges();
        });
      }
    });
  },

  /**
   * 用户名输入
   */
  onUsernameInput: function(e) {
    this.setData({
      username: e.detail.value
    }, () => {
      this.checkForChanges();
    });
  },

  /**
   * 签名输入
   */
  onSignatureInput: function(e) {
    this.setData({
      signature: e.detail.value
    }, () => {
      this.checkForChanges();
    });
  },

  /**
   * 检查是否有更改
   */
  checkForChanges: function() {
    const { username, signature, avatar, originalData } = this.data;
    const hasChanges = 
      username !== originalData.username ||
      signature !== originalData.signature ||
      avatar !== originalData.avatar;

    this.setData({ hasChanges });
  },

  /**
   * 保存设置
   */
  saveSettings: function() {
    if (this.data.isSaving || !this.data.hasChanges) return;
    
    this.setData({ isSaving: true });

    const { username, signature, avatar } = this.data;
    
    // 验证数据
    if (!username.trim()) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      });
      this.setData({ isSaving: false });
      return;
    }

    // 保存到全局数据和本地存储
    this.saveToGlobalData();
    this.saveToStorage();

    // 更新原始数据
    this.setData({
      originalData: { username, signature, avatar },
      hasChanges: false,
      showSuccess: true
    });

    // 显示成功提示（只显示一个）
    setTimeout(() => {
      this.setData({ 
        showSuccess: false,
        isSaving: false
      });
    }, 1500);

    // 通知首页更新数据
    this.notifyIndexPage();
  },

  /**
   * 保存到全局数据
   */
  saveToGlobalData: function() {
    const app = getApp();
    app.globalData.userInfo = {
      username: this.data.username,
      signature: this.data.signature,
      avatar: this.data.avatar,
      updateTime: new Date().getTime()
    };
  },

  /**
   * 保存到本地存储
   */
  saveToStorage: function() {
    const app = getApp();
    wx.setStorage({
      key: 'userSettings',
      data: app.globalData.userInfo
    });
  },

  /**
   * 通知首页更新数据
   */
  notifyIndexPage: function() {
    const userData = {
      username: this.data.username,
      signature: this.data.signature,
      avatar: this.data.avatar
    };

    // 获取页面栈并通知首页
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2]; // 上一个页面（首页）
    
    if (prevPage && prevPage.route && prevPage.route.includes('index')) {
      if (prevPage.updateUserInfo) {
        prevPage.updateUserInfo(userData);
      }
    }
  },

  /**
   * 恢复默认设置
   */
  resetSettings: function() {
    wx.showModal({
      title: '恢复默认设置',
      content: '确定要恢复默认设置吗？所有更改将丢失。',
      confirmColor: '#ff4d4f',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            username: '张三',
            signature: '',
            avatar: '/images/mine_icons/default_photo.png',
            hasChanges: false
          }, () => {
            this.checkForChanges();
            // 同时更新首页
            this.saveToGlobalData();
            this.saveToStorage();
            this.notifyIndexPage();
          });
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.loadUserSettings();
  }
});