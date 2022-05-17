// components/lable/lable.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    lable:String,
    value:String,
    lablefake:Boolean,
    fake:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    lablefake:true,
    fake:false,
    lables:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    createLables:function(e){
      this.data.lables.push(e.detail.value);
      if(this.data.lables.length > 0){
        e.detail.value = this.data.lables.shift();
      }
      this.setData({
        lablefake: false
      });
      this.triggerEvent('sendLables',e.detail.value)
    }
  }
})
