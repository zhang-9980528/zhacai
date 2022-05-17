// components/feedback/feedback.js
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
    trtext:'',
    feedbackContent:'暂无内容',
    textarea:'',
    feedback:[],
    delete:'/images/delete.png'
  },
  created:function(){
    this.regular();
    console.log(this.data.feedback._id);
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
    
    
    
    
  }
})
