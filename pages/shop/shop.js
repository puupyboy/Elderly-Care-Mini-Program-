// pages/shop/shop.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      bannerList: [
        '/image/shop_ad1.png',
        '/image/shop_ad2.png',
        '/image/shop_ad3.png'
      ],
      hotProducts: [
        {
          id: 1,
          name: '时尚休闲运动鞋',
          price: '299',
          sales: '已售1.2万',
          tag: '热卖',
          image: '/image/shop_product1.png'
        },
        {
          id: 2,
          name: '智能蓝牙耳机',
          price: '199',
          sales: '已售8560',
          tag: '新品',
          image: '/image/shop_product2.png'
        },
        {
          id: 3,
          name: '简约双肩背包',
          price: '159',
          sales: '已售6.8万',
          tag: '爆款',
          image: '/image/shop_product3.png'
        },
        {
          id: 4,
          name: '潮流时尚手表',
          price: '459',
          sales: '已售3456',
          tag: '推荐',
          image: '/image/shop_product4.png'
        }
      ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },

    /**
     * 跳转到商城页面
     */
    navigateToMiniProgram() {
      wx.navigateToMiniProgram({
        appId: 'wxc4fc148a8d5c4c4b', 
        success(res) {
          console.log('跳转成功', res);
        },
        fail(err) {
          console.error('跳转失败', err);
          wx.showToast({
            title: '跳转失败',
            icon: 'none'
          });
        }
      });
    }
})