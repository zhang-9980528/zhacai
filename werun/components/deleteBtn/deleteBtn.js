// components/deleteBtn/index.js
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
    selectUrl:"/images/select.png",
    selectedUrl:"../../images/selected.png",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selected:function(e){
      this.setData({
        selectOrNot:!this.data.selectOrNot
      })
    }
  }
})
