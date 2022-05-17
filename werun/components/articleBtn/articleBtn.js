// components/articleBtn/articleBtn.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },
  /**
   * 组件的初始数据
   */
  data: {
    multibtn:"/images/multiSelect.png",
    addbtn:"/images/add.png",
    selectedbtn:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addArticle:function(){
      app.globalData.log = {};
      let  save = wx.getStorageSync('storageOrNot')
      wx.setStorageSync('storageOrNot',true)
      //缓存数据清空
      if(!save){
        wx.setStorageSync('title','')
        wx.setStorageSync('article','')
        wx.setStorageSync('imagePath','')
      }
      wx.navigateTo({
        url: '../../pages/article/index',
      })
    },
    editArticle:function(){
      this.setData({
        selectedbtn:!this.data.selectedbtn
      })
      this.triggerEvent('editArticle',this.data.selectedbtn)
    },

  }
})