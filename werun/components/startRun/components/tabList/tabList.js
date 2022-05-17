// components/startRun/components/tabList/tabList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    typeList:{
      type:Array,
      value:()=>[]
    },
    unit:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    dropdown:true,
    default:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    chooseType:function(){
      this.setData({
        dropdown : !this.data.dropdown
      })
    },
    chooseUnit1:function(options){
      //let currentUnit = options.target.dataset.class
      //let currentUnit = wx.createSelectorQuery().select('.me')
      this.setData({
        default:1,
        unit:options.target.dataset.text,
        dropdown : !this.data.dropdown
      })
      this.triggerEvent('myEvent',this.data.unit)
    },
    chooseUnit2:function(options){
      this.setData({
        default:2,
        unit:options.target.dataset.text,
        dropdown : !this.data.dropdown
      })
      this.triggerEvent('myEvent',this.data.unit)
    },
    chooseUnit3:function(options){
      this.setData({
        default:3,
        unit:options.target.dataset.text,
        dropdown : !this.data.dropdown
      })
      this.triggerEvent('myEvent',this.data.unit)
    }
  }
})
