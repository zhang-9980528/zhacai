// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nLoignHead:"/images/nlogin.png",
    yLoginHead:"",
    touchOrNot:false,
    userInfo: {},
    hasUserInfo: false,
    sendUserMsg:{},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    showUserMsg:false,
    token:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserInfo:function(){
    if(!this.data.showUserMsg){
      wx.getUserProfile({
        desc: '展示用户信息', 
        success: res => {
          console.log(res);
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            sendUserMsg:{encryptedData:res.encryptedData,iv:res.iv}
          })
          wx.request({
            url: 'http://localhost:3000/users/login',
            data:{'code':app.globalData.code,'encryptedData':this.data.sendUserMsg.encryptedData,'iv':this.data.sendUserMsg.iv},
            method:'POST',
            success:res=>{
              console.log(res);
              wx.setStorageSync('userMessage', res.data.hasUserMsg);
              app.globalData.userInfo = res.data.hasUserMsg;
              wx.setStorageSync('token', res.data.token);
              app.globalData.token = res.data.token;
              console.log(app.globalData);
              wx.showLoading({
                title: '登录成功'
              })
              setTimeout(function () {
                wx.hideLoading()
              }, 2000)
              console.log(res);
              this.setData({
                showUserMsg:true,
                yLoginHead:res.data.hasUserMsg.avatar_url ||app.globalData.userInfo.avatar_url
              })
            },
            fail: err => {
              console.log(err);
              wx.showToast({
                title: '登录失败',
              })
            }
          })
        },
        fail: err => {
          console.log(err);
        }
      })
    }
    if(this.data.showUserMsg){
      wx.navigateTo({
        url: '/pages/user/index'
      })
    }
  },
  getMylogs:function(){
    wx.switchTab({
      url: '/pages/logs/logs',
    })
  },
  getMycomment:function(){
    console.log('aaa');
    wx.navigateTo({
      url: '/components/comments/comments',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  navigetoFed:function(){
    console.log('aaa');
    wx.navigateTo({
      url: '/pages/feedback/index',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})