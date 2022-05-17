// pages/article/index.js
const app = getApp();
import {
  Actionsheet
} from "../../dist/wexUI/wexUI.js";
Page(Object.assign({}, Actionsheet,{

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    article:'',
    fake:false,
    exClass:['tags-primary','tags-success','tags-warn'],
    defaultVal:['希 望','情 感','方 法'],
    lables:{},
    arrlables:[],
    imagePath:'',
    storageOrNot:false,
    log:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let log = app.globalData.log;
    this.setData({
      log:log
    })
    if(log){
      this.data.imagePath = log.image_url
      this.data.title = log.title
    }
  },
  // 获取标题
  getInputValue:function(e){
    this.setData({
      title:e.detail.value
    })
    wx.setStorageSync('title', this.data.title)
  },
  // 获取文本域
  getTextareaValue:function(e){
    this.setData({
      article:e.detail.value
    })
    wx.setStorageSync('article', this.data.article)
  },
  tagChange:function(){
    this.setData({
      fake: true
    });
  },
  getLables(e){
    let lable = e.detail;
    if(this.data.arrlables.length == 0){
      this.data.arrlables.push(lable);
    }else{
      if(this.data.arrlables.length == 3){
        this.data.arrlables.length = 3;
      }else if(this.data.arrlables.length > 3){
        wx.showToast({
          title: '长度超出',
        })
      }else{
        this.data.arrlables.forEach((item,index) => {
          console.log(item);
          if(item == lable){
            wx.showToast({
              title: '属性值重复',
            })
            this.data.arrlables.pop()
          }else{
            if(this.data.arrlables.length < 3){
              this.data.arrlables.push(lable);
            }
          }
        })
      }
    }
    this.data.lables.lables = this.data.arrlables;
    wx.setStorageSync('lables', this.data.lables)
  },
  //添加图片
  addImage(){
    wx.chooseMedia({
      mediaType: ['image','video'],
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      success : res => {
        const tempFilePaths = res.tempFiles[0];
        this.data.imagePath = tempFilePaths;
        wx.setStorageSync('imagePath', this.data.imagePath);
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  saveContent(){
    wx.setStorageSync('storageOrNot', 'true')
  },
  clearContent(){
    wx.clearStorage({
      success: (res) => {
        console.log(res)
      },
    })
  },
  uploadFiles(){
    const userid = app.globalData.userInfo._id || wx.getStorageSync('userMessage')._id;
    const filepath = this.data.imagePath.tempFilePath || wx.getStorageSync('imagePath').tempFilePath;
    let arr =[];
    arr = this.data.lables;
    const token = app.globalData.token || wx.getStorageSync('token');
    
    wx.uploadFile({
      url: `http://localhost:3000/users/${userid}/logs`,
      name: 'file',
      header:{
        'Content-Type':'application/x-www-form-urlencoded;charset=utf-8',
        'Authorization':`Bearer ${token}`
      },
      filePath: filepath,
      formData: {
        'title': this.data.title || wx.getStorageSync('title'),
        'article':this.data.article || wx.getStorageSync('article'),
        'lables':['a','b']
      },
      success : res => {
        console.log(res);
      },
      fail : err => {
        console.log(err);
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let storageOrNot = wx.getStorageSync('storageOrNot');
    console.log(app.globalData);
    if(storageOrNot){
      this.setData({
        title : app.globalData.log.title || wx.getStorageSync('title'),
        article:wx.getStorageSync('article'),
        lables:wx.getStorageSync('lables'),
        imagePath:wx.getStorageSync('imagePath')
      })
    }
  },
  tapShowActionsheet() {
    this.showActionsheet({
      shareText: "", //定义分享按钮文字
      showCancel: true, //是否显示关闭按钮
      cancelText: "关  闭", //定义关闭按钮的文字
      actions: [{
        name: "保  存", //自定义名称
        callback:e =>{
          console.log(e)
          this.saveContent();
          wx.showModal({
            title: "保存成功",
            showCancel: false
          });
        } //点击回调函数
      }, {
        name: "清  空", //自定义名称
        callback:e=> {
          this.clearContent();
          wx.showModal({
            title: "清空完成",
            showCancel: false
          });
        } //点击回调函数
      },
      {
        name: "确  认", //自定义名称
        callback:e=> {
          this.uploadFiles();
          wx.showModal({
            title: "上传成功",
            showCancel: false
          });
        } //点击回调函数
      }]
    });
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
}))