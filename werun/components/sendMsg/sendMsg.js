// components/sendMsg/sendMsg.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    likeStatus:{
      type:Boolean,
      value:false
    },
    msgStatus:{
      type:Boolean,
      value:false
    },
    treadStatus:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentComment:{},
    likeClick:true,
    userInfo:{
      avatar_url:'../../images/nlogin.png',
      name:'用户名'
    }
  },
  lifetimes:{
    attached:function () {
      this.setData({
        userInfo:app.globalData.userInfo,
        currentComment:app.globalData.currentComment
      })
    },
   detached:function(){
     let like = app.globalData.likeChance
     like = !like
     app.globalData.likeChance = like;
   } 
  },
  /**
   * 组件的方法列表
   */
  methods: {
    changeLike(){
      let likeChance = app.globalData.likeChance;
      let mount = app.globalData.currentComment.like_count + 1;
      let token = app.globalData.token;
      let _id = app.globalData.currentComment._id;
      if(!likeChance){
        wx.request({
          url: `http://localhost:3000/comment/${_id}`,
          header:{
            'Authorization':`Bearer ${token}`
          },
          method:'PUT',
          data:{
            like_count : mount
          },
          success:res=>{
            this.setData({
              like_count : res.data.like_count,
              likeClick:!this.data.likeClick
            })
            wx.showToast({
              title: '修改点赞成功'
            })
          }
        })
      }
    }
  }

})
