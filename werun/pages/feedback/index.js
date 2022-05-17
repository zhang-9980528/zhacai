// pages/feedback/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    trtext:'',
    feedbackContent:'暂无内容',
    textarea:'',
    feedback:[],
    delete:'/images/delete.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //提交反馈
  submitFed(e){
    console.log(app.globalData);
    console.log(e);
    const userid = app.globalData.userInfo._id;
    console.log(userid);
    this.setData({
      textarea:e.detail.value.trtext
    })
    console.log(this.data.textarea);
    wx.request({
      url: `http://localhost:3000/users/${userid}/feedback/`,
      data:{
        content:this.data.textarea
      },
      method:'post',
      success:res=>{
        this.data.feedback.push(res.data)
        wx.showToast({
          title: '请刷新页面',
        })
      },
      fail:err=>{
        console.log(err);
        wx.showToast({
          title: '请求失败',
        })
      }
    })
    console.log(this.data.feedback);
  },
  //获取反馈
  getFeds:async function(){
    console.log('检测');
    const userid = app.globalData.userInfo._id;
    return new Promise((resolve,reject)=>{
      wx.request({
        url: `http://localhost:3000/users/${userid}/feedback`,
        success:res=>{resolve(res)},
        fail:err=>{reject(err)}
      })
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
  regular:async function(){
    console.log(this);
    let array = await this.getFeds();
    console.log(array.data);
    array.data.forEach(e => {
      let time = e.updatedAt
      time = this.formatTime(time)
      e.updatedAt = time
      console.log(e);
    });
    this.setData({
      feedback:array.data
    })
    console.log(this.data.feedback);
  },
  delete:function(e){
    const userid = app.globalData.userInfo._id;
    const id = e.currentTarget.dataset.id
    wx.request({
      url: `http://localhost:3000/users/${userid}/feedback/${id}`,
      method:'DELETE',
      success:res=>{
        console.log(this.data.feedback);
        this.data.feedback.forEach((e,i)=>{
          if(id==e._id){
            this.data.feedback.splice(i,1)
          }
        })
        wx.showToast({
          title: '请刷新页面',
        })
      },
      fail:err=>{
        console.log(err);
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.regular();
    console.log(this.data.feedback._id);
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