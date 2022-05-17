// index.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    start:true
  },
  // 事件处理函数
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onPullDownRefresh:function(e){
    //启动下拉
    wx.showNavigationBarLoading({
      success: (res) => {
        //停止下拉刷新
        setTimeout(function(){
          wx.hideNavigationBarLoading()
          wx.stopPullDownRefresh()
        },1500)
      },
    })
  },
  runStart:function(){
    // 开始跑步栏
    this.setData({
      start:true
    })
  },
  commentStart:function(){
    // 评论专区
    this.setData({
      start:false
    })
  }
})
