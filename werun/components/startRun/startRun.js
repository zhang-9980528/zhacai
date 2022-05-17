// components/startRun/startRun.js
import {MapMethods} from '../model.js'
const MapModel = new MapMethods();
const app = getApp();
//导入地图选点
const chooseLocation = requirePlugin('chooseLocation');
Component({
  properties: {},
  data: {
    img:"./images/running.png",
    timegoal:0,
    distancegoal:0,
    timeList:['s','min','h'],
    distanceList:['m','hm','km'],
    timeUnit:'min',
    distanceUnit:'hm',
    touchOrNot:false,
    latitude:0,
    longitude:0,
    hide:false,
    lastPos:{}
  },

  /**
   * 组件的方法列表
   */
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show:async function () {
      //导入选点中使用的获取点的方法
      const location =  chooseLocation.getLocation();
      if(location){
        this.data.latitude = location.latitude
        this.data.longitude = location.longitude
      }
      let hide = this.data.hide
      if(hide){
        let latitude = this.data.latitude
        let longitude = this.data.longitude
        MapModel.routeNavigate(latitude,longitude)
        this.data.hide = null
        console.log(this.data.hide);
      }
      if(hide == null){
        console.log(this.data.hide);
        const lastPos = await MapModel.getPos();
        let latitude = this.data.latitude
        let longitude = this.data.longitude
        let lastLatitude = lastPos.latitude
        let LastLongitude = lastPos.longitude
        //console.log(lastPos);
        this.setData({
          lastPos : lastPos,
          //hide:false
        })
        console.log(this.data.lastPos);
        if(lastLatitude==latitude && LastLongitude==longitude){
          wx.showToast({
            title: '您已到达了终点',
          })
        }
      }
    },
  },
  lifetimes:{
    attached: function () {
      console.log('attached');
      let hide = this.data.hide
      console.log(hide);
    },
  },
  methods: {
    onGettunit:function(e){
      this.setData({
        timeUnit:e.detail
      })
    },
    onGetdunit:function(e){
      this.setData({
        distanceUnit:e.detail
      })
    },
    tapMinus:function(e){
      if(e.type=='tap'){
        this.minus(e)
      }
      if(e.type=='longpress'){
        let longPress = setInterval(() => {
          this.minus(e)
        }, 100);
        this.data.longPress = longPress
      }
    },
    tapPlus:function(e){
      if(e.type=='tap'){
        this.plus(e)
      }
      // 长指压改变数字
      if(e.type=='longpress'){
        let longPress = setInterval(() => {
          console.log(e)
          this.plus(e)
        }, 100);
        this.data.longPress = longPress
      }
    },
    //手指松开清除定时器
    tapEnd:function(e){
      clearInterval(this.data.longPress)
    },
    // 通过minus控制减数
    minus:function(e){
      if(e.target.dataset.tag == 'tminus'){
        if(this.data.timegoal>0){
          this.setData({
            timegoal:this.data.timegoal-1
          })
        }
      }
      if(e.target.dataset.tag == 'dminus'){
        if(this.data.distancegoal>0){
          this.setData({
            distancegoal:this.data.distancegoal-1
          })
        }
      }
    },
    //通过plus方法控制加数
    plus:function(e){
      if(e.target.dataset.tag == 'tplus'){
        this.setData({
          timegoal : this.data.timegoal+1
        })
      }
      if(e.target.dataset.tag == 'dplus'){
        this.setData({
          distancegoal: this.data.distancegoal+1
        })
      }
    },
    //手指触摸在屏幕上改变样式
    touchScreen(){
      this.setData({
        touchOrNot:!this.data.touchOrNot
      })
      let position = MapModel.getFirpos()
      this.setData({
        hide:!this.data.hide
      })
    }
  }
})
