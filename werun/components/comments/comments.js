// components/comments/comments.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userInfo:Object,
    start:false,
    comments:Array
  },
  data:{
    userInfo:{
      name:"傻可",
      avatar_url:""
    },
    name:'',
    avatarSrc:"/images/logs1.png",
    comment:'',
    position:'',
    commentor:'',
    token:'',
    comment_id:''
  },
  lifetimes:{
    attached:function(){}    
  },
  pageLifetimes:{
    show:function(){
      let start = this.data.start
      if(!start){
        if(app.globalData.userInfo){
          this.setData({
            start:!start,
            userInfo:app.globalData.userInfo,
            name:app.globalData.userInfo.name,
            avatarSrc:app.globalData.userInfo.avatar_url,
            position:app.globalData.userInfo.location,
            commentor:app.globalData.userInfo._id,
            token:app.globalData.token
          })
          this.sendCommentReq()
        }
        console.log(this.data.token);
        
      }
    }
  },
  methods: {
    getComment:function(e){
      let token = this.data.token
      console.log(app.globalData.userInfo);
      this.data.comment = e.detail.value.input
      
      wx.request({
        url: 'http://localhost:3000/comment',
        method:'POST',
        header:{
          'Authorization':`Bearer ${token}`
        },
        data:{
          content:this.data.comment,
          position:this.data.position,
          commentor:this.data.commentor
        },
        success:res=>{
          console.log(res);
          wx.startPullDownRefresh({
            success:res=>{
              this.sendCommentReq()
            },
            fail:err=>{
              wx.showToast({
                title: '添加失败，请检查网络'
              })
              console.log(err);
            }
          })
        },
        fail:err=>{
          wx.showToast({
            title: '请求失败',
          })
          console.log(err);
        }
      })
    },
    sendCommentReq:function(){
      wx.request({
        url: 'http://localhost:3000/comment',
        method:'GET',
        success:res=>{
          res.data.filter(item=>{
            item.updatedAt = this.formatTime(item.updatedAt)
          })
          this.setData({
            comments:res.data
          })
          console.log(this.data.comments);
        },
        fail:err=>{
          console.log(err);
        }
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
    openUser:function(){
      wx.navigateTo({
        url: '/pages/user/index'
      })
    }
  }
})
