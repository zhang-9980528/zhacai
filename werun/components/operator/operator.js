// components/operator/operator.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  options:{
    addGlobalClass:true
  },
  properties: {
    like_count:String,
    like_status:String,
    comment_id:String,
    answer:Boolean
  },
  data: {
    treadSrc:"../../images/tread.png",
    likeSrc:"../../images/like.png",
    collect:"../../images/collect.png",
    altreadSrc:"../../images/tread-al.png",
    allikeSrc:"../../images/like-al.png",
    collected:"../../images/collected.png",
    message:"../../images/message.png",
    like_status:'1',
    currentComment:{},
    msgStatus:'',
    like:true
  },
  /**
   * 组件的方法列表
   */
  pageLifetimes:{
  },
  methods: {
    clickOrNot: function(e) {
      const type = e.target.dataset.id;
      console.log(e)
      if(type == "like"){
        this.setData({
          likeStatus:!this.data.likeStatus,
          like_status : '1'
        })
        this.shakeAnimate(e);
      }
      if(type == "msg"){
        this.setData({
          msgStatus:!this.data.msgStatus
        })
      }
      if(type == "tread"){
        this.setData({
          treadStatus:!this.data.treadStatus,
          like_status : '0'
        })
        this.pulseAnimate(e);
      }
      this.statusChange(this.data.like_status)
      // 动画执行后移除
    },
    shakeAnimate: function (e) {
      var that = this;
      this.setData({
        shake: true
      });
      // 动画执行后移除
      setTimeout(function () {
        that.setData({
          shake: false
        });
      }, 3000);
    },
    pulseAnimate: function (e) {
      console.log(e)
      var that = this;
      this.setData({
        pulse: true
      });
      // 动画执行后移除
      setTimeout(function () {
        that.setData({
          pulse: false
        });
      }, 3000);
    },
    commentMsg:function(e){
      console.log(e);
      let likeChance = app.globalData.likeChance
      let id = this.data.comment_id;
      let token = app.globalData.token;
      if(likeChance){
        wx.request({
          url: "http://localhost:3000/comment/"+id,
          method:'GET',
          header:{
            'Authorization':`Bearer ${token}`
          },
          success:res=>{
            console.log(res);
            app.globalData.currentComment = res.data
            likeChance = !likeChance
            app.globalData.likeChance = likeChance
            wx.navigateTo({
              url: '/components/sendMsg/sendMsg',
            })
          }
        })
      }
    },
    statusChange:function(val){
      let status = parseInt(val);
      let token = app.globalData.token;
      let _id = this.data.comment_id;
      wx.request({
        url: `http://localhost:3000/comment/${_id}`,
        method:'PUT',
        header:{
          'Authorization':`Bearer ${token}`
        },
        data:{
          like_status:status
        },
        success:res=>{
          wx.showToast({
            title: '请刷新页面',
          })
        },
        fail:err=>{
          wx.showToast({
            title: '修改失败',
          })
        }
      })
    }
  }
})
