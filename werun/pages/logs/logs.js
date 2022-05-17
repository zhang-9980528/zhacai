// logs.js
const util = require('../../utils/util.js')
const app = getApp();
Page({
  data: {
    thumbnailImg:"../../images/noneimg.png",
    keyword:'cpdd',
    article:'暂无相关内容',
    pubdate:'2021-11-14 00:00:00',
    selectEdit:'',
    selectOrNot:false,
    logs:[{
      article:'',
      updatedAt:'',
      title:'',
      image_url:'',
    }],
    deleteID:[]
  },
  onPullDownRefresh:function(e){
    this.getLogs();
    wx.showNavigationBarLoading({
      success: (res) => {
        setTimeout(function(){
          wx.hideNavigationBarLoading()
          wx.showToast({
            title: '刷新成功',
          })
          wx.stopPullDownRefresh();
          
        },1500)
      },
    })
  },
  onLoad() {
    console.log(app.globalData);
    let userid = app.globalData.userInfo._id;
    let token = app.globalData.token;
    console.log(userid);
    console.log(token);
    if(userid == null){
      wx.showToast({
        title: '用户未登录',
      })
    }
    this.getLogsTwice();
  },
  editArticle:function(e){
    this.setData({
      selectEdit:e.detail
    })
  },
  formatTime(val){
    let time = new Date(val);
    let y = time.getFullYear()
    let m = time.getMonth()+1
    let d = time.getDate()
    let h = time.getHours()
    let M = time.getMinutes()
    let s = time.getSeconds()
    return y+'-'+m+'-'+d+' '+h+':'+M+':'+s;
  },
  getLogsTwice:function(){
    wx.startPullDownRefresh(res=>{
      console.log(res);
      this.getLogs();
    })
  },
  getLogs:function(){
    let userid = app.globalData.userInfo._id;
    let token = app.globalData.token;
    wx.request({
      url: `http://localhost:3000/users/${userid}/logs`,
      method:'GET',
      header:{
        'Authorization':`Bearer ${token}`
      },
      success:res=>{
        console.log(res);
        res.data.filter(item=>{
          item.updatedAt = this.formatTime(item.updatedAt)
        })
        this.setData({
          logs:res.data
        })
        console.log(this.data.logs);
        
      },
      fail:err=>{
        console.log(err);
      }
    })
  },
  editLog:function(e){
    const id = e.currentTarget.dataset.id;
    const userid = app.globalData.userInfo._id;
    const token = app.globalData.token;
    wx.request({
      url: `http://localhost:3000/users/${userid}/logs/${id}`,
      method:'GET',
      header:{
        'Authorization':`Bearer ${token}`
      },
      success:res=>{
        app.globalData.log = res.data
        wx.setStorageSync('storageOrNot', true)
        console.log(wx.getStorageSync('storageOrNot'));
        wx.navigateTo({
          url: '/pages/article/index',
        })
      },
      fail:err=>{
        console.error(err);
      }
    })
  },
  deleteLogs:function(e){
    console.log(e);
  }
})
