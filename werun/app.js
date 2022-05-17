// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.login({
      success: res => {
        this.globalData.code = res.code
      }
    })
  },
  globalData: {
    code:'',
    token:'',
    userInfo: null,
    firstPos:{latitude:'',longtitude:''},
    lastPos:{latitude:'',longtitude:''},
    currentComment:{},
    likeChance:true,
    like:true,
    log:{},
    deleteOption:[]
  }
})
