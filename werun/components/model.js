const app = getApp();
class MapMethods{
    routeNavigate(latitude,longitude){
      let plugin = requirePlugin('routePlan');
      let key = 'WHSBZ-IVGC6-4J3SR-MT54W-G6IVE-FBFVC';  //使用在腾讯位置服务申请的key
      let referer = '移动应用开发';
      console.log(latitude);
      console.log(longitude);
      let endPoint = JSON.stringify({  //终点
        'name': '终点',
        'latitude': latitude,
        'longitude': longitude
      });
      let mode = "walking";
      wx.navigateTo({
        url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint + '&mode=' + mode
      })
    }
    getFirpos(){
      const key = 'WHSBZ-IVGC6-4J3SR-MT54W-G6IVE-FBFVC'; //使用在腾讯位置服务申请的key
      const referer = '移动应用开发'; //调用插件的app的名称
      const category = '运动跑步，健身生活';
      wx.navigateTo({
        url: `plugin://chooseLocation/index?key=${key}&referer=${referer}&category=${category}`
      });
    }
    mapDirection({qqmapsdk,latitude,longtitude}) {
      return new Promise((resolve,reject)=>{
        this._mapDirection(qqmapsdk,resolve,reject,latitude,longtitude)
      })
    }
    _mapDirection(qqmapsdk,resolve,reject,latitude,longitude){
    console.log(app.globalData.firstPos)
    var _this = this;
    //调用距离计算接口
    qqmapsdk.direction({
      mode: 'walking',//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
      //from参数不填默认当前地址
      from:latitude+','+longitude,
      to: latitude+','+longitude,
      success: function (res) {
        resolve(res)
        var ret = res;
        var coors = ret.result.routes[0].polyline, pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({ latitude: coors[i], longitude: coors[i + 1] })
        }
        console.log(pl)
        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        _this.setData({
          latitude:pl[0].latitude,
          longitude:pl[0].longitude,
          polyline: [{
            points: pl,
            color: '#FF0000DD',
            width: 4
          }]
        })
      },
      fail: function (error) {
        reject(error)
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  }
  mapDistance(e){
    var _this = this;
    //调用距离计算接口
    qqmapsdk.calculateDistance({
        mode: 'walking',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
        //from参数不填默认当前地址
        //获取表单提交的经纬度并设置from和to参数（示例为string格式）
        from: e.detail.value.start || '', //若起点有数据则采用起点坐标，若为空默认当前地址
        to: e.detail.value.dest, //终点坐标
        success: function(res) {//成功后的回调
          console.log(res);
          var res = res.result;
          var dis = [];
          for (var i = 0; i < res.elements.length; i++) {
            dis.push(res.elements[i].distance); //将返回数据存入dis数组，
          }
          _this.setData({ //设置并更新distance数据
            distance: dis
          });
        },
        fail: function(error) {
          console.error(error);
        },
        complete: function(res) {
          console.log(res);
        }
    });
  }
  getPos(){
    return new Promise((resolve,reject)=>{
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success:res=> {
          resolve(res)
        },
        fail:err=>{
          reject(err)
        }
      })
    })
    
  }
}
export {MapMethods}